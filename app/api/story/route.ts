import { OpenAIStream, OpenAIStreamPayload } from './helper';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
};

export async function POST(req: Request): Promise<Response> {
  const { prompt, genre } = (await req.json()) as {
    prompt?: string;
    genre?: string;
  };

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const content = `Create a short ${genre} story, no more than 120 words, in the voice of philosoper Nietzsche based on the following topic: ${prompt}.`;

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    temperature: 0.8,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
