import { NextRequest, NextResponse } from "next/server";
import { runAssistant } from "@/app/utils/openai";

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const threadId = formData.get("threadId") as string;
	const assistantId = formData.get("assistantId") as string;
	const instructions = formData.get("instructions") as string;
	if (!assistantId || !threadId || !instructions) {
		return NextResponse.json(
			{ message: "fields are required" },
			{ status: 400 }
		);
	}
	const assistant = await runAssistant(assistantId, threadId, instructions);
	return NextResponse.json(assistant);
}
