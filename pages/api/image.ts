import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { industry, product } = req.query;

  if (!industry || !product) {
    return res.status(400).json({ error: 'Params missing' });
  }

  const response = await openai.createImage({
    prompt: `The future of ${industry} after integrating ${product}`,
    n: 1,
    size: '1024x1024',
  });

  const url = response.data.data[0].url;

  res.status(200).json({ url });
}
