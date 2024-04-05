// app/api/assistant/route.ts
import { experimental_AssistantResponse } from "ai";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const ASSISTANT_NAME = "Math Tutor";
const ASSISTANT_INSTRUCTIONS =
	"You are a personal math tutor. When asked a question, write and run Python code to answer the question.";
const ASSISTANT_MODEL = "gpt-4";

const getAssistant = async () => {
	if (process.env.OPENAI_ASSISTANT_ID) {
		return await openai.beta.assistants.retrieve(
			process.env.OPENAI_ASSISTANT_ID
		);
	}
	return await createAssistant();
};

const listAssistants = async () => {
	return await openai.beta.assistants.list({
		order: "desc",
		limit: 20,
	});
};
const createAssistant = async () => {
	const assistants = await listAssistants();

	const assistant = assistants.data.find(
		(assistant) => assistant.instructions === ASSISTANT_INSTRUCTIONS
	);

	if (assistant) {
		return assistant;
	}

	return await openai.beta.assistants.create({
		instructions: ASSISTANT_INSTRUCTIONS,
		name: ASSISTANT_NAME,
		tools: [{ type: "code_interpreter" }],
		model: ASSISTANT_MODEL,
	});
};

export async function POST(req: Request) {
	// Parse the request body
	const input: {
		threadId: string | null;
		message: string;
	} = await req.json();

	// Create a thread if needed
	const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

	// Add a message to the thread
	const createdMessage = await openai.beta.threads.messages.create(threadId, {
		role: "user",
		content: input.message,
	});

	return experimental_AssistantResponse(
		{ threadId, messageId: createdMessage.id },
		async ({ threadId, sendMessage }) => {
			// Run the assistant on the thread
			const run = await openai.beta.threads.runs.create(threadId, {
				assistant_id:
					process.env.ASSISTANT_ID ??
					(() => {
						throw new Error("ASSISTANT_ID is not set");
					})(),
			});

			async function waitForRun(run: Run) {
				// Poll for status change
				while (run.status === "queued" || run.status === "in_progress") {
					// delay for 500ms:
					await new Promise((resolve) => setTimeout(resolve, 500));

					run = await openai.beta.threads.runs.retrieve(threadId!, run.id);
				}

				// Check the run status
				if (
					run.status === "cancelled" ||
					run.status === "cancelling" ||
					run.status === "failed" ||
					run.status === "expired"
				) {
					throw new Error(run.status);
				}
			}

			await waitForRun(run);

			// Get new thread messages (after our message)
			const responseMessages = (
				await openai.beta.threads.messages.list(threadId, {
					after: createdMessage.id,
					order: "asc",
				})
			).data;

			// Send the messages
			for (const message of responseMessages) {
				// sendMessage({
				//   id: message.id,
				//   role: "assistant",
				//   content: message.content.filter(
				//     (content) => content.type === "text"
				//   ) as Array<MessageContentText>,
				// });
			}
		}
	);
}
