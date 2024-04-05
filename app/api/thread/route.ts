import { NextRequest, NextResponse } from "next/server";
import { createThread, getThread } from "../../utils/openai";

export async function GET(req: NextRequest) {
	const threadId = req.nextUrl.searchParams.get("threadId");
	if (!threadId) {
		return NextResponse.json(
			{ message: "threadId is required" },
			{ status: 400 }
		);
	}
	const thread = await getThread(threadId);
	return NextResponse.json(thread);
}

export async function POST() {
	const thread = await createThread();
	return NextResponse.json(thread);
}
