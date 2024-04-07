import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const input: {
    prompt: string;
  } = await req.json();
  //TODO:Test
  const res = await openai.images.generate({
    model: 'dall-e-2',
    prompt: input.prompt,
    n: 1,
    size: '256x256',
  });

  return NextResponse.json(res);

  // return NextResponse.json({
  //   data: [
  //     {
  //       url: 'https://img.freepik.com/free-psd/freshly-baked-pizza-with-cut-slice-isolated-transparent-background_191095-9041.jpg?w=996&t=st=1712510930~exp=1712511530~hmac=58ae217e0cc2583d8e95f19c387bfe20046460e5c2a67b7d7c16d43a713f1a59',
  //     },
  //   ],
  // });
}
