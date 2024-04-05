import { NextResponse } from "next/server";
import { getAssistant } from "../../utils/openai";

export async function GET() {
	const assistant = await getAssistant();
	return NextResponse.json({ assistant });
}
