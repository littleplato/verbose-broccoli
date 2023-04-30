import { OpenAIStream, OpenAIStreamPayload, calculateToken } from './helper';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
};

export async function POST(req: Request): Promise<Response> {
  const { params } = (await req.json()) as {
    params: {
      role: string;
      industry: string;
      product: string;
    };
  };

  const { role, industry, product } = params;
  if (!role || !industry || !product) {
    return new Response('Params incomplete in the request', { status: 400 });
  }

  const content = `You are a salesperson selling your ${product} and are writing a sales email to a client: ${role} who works in ${industry}. Write a 100 word email pitching the product. Start the email with a joke about the client's industry.`;

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: calculateToken(content),
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
