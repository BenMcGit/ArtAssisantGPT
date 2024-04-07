import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    prompt: string;
  } = await req.json();
  const res = await openai.images.generate({
    model: 'dall-e-2',
    prompt: input.prompt,
    n: 1,
    size: '256x256',
  });

  return NextResponse.json(res);
}
