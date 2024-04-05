import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

const ASSISTANT_NAME = "Math Tutor";
const ASSISTANT_INSTRUCTIONS =
	"You are a personal math tutor. When asked a question, write and run Python code to answer the question.";
const ASSISTANT_MODEL = "gpt-4";

export const getAssistant = async () => {
	if (process.env.OPENAI_ASSISTANT_ID) {
		return await openai.beta.assistants.retrieve(
			process.env.OPENAI_ASSISTANT_ID
		);
	}
	return await createAssistant();
};

export const listAssistants = async () => {
	return await openai.beta.assistants.list({
		order: "desc",
		limit: 20,
	});
};

export const createAssistant = async () => {
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

export const runAssistant = async (
	assistantId: string,
	threadId: string,
	instructions: string
) => {
	return await openai.beta.threads.runs.create(threadId, {
		assistant_id: assistantId,
		instructions: instructions,
	});
};

export const createThread = async () => {
	return await openai.beta.threads.create();
};

export const getThread = async (threadId: string) => {
	return await openai.beta.threads.retrieve(threadId);
};
