import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  
  const { url, campaign } = req.body;
  const id = Math.random().toString(36).substring(2, 8);
  
  const data = { url, campaign: campaign || 'general', clicks: 0, created_at: new Date().toISOString() };
  await redis.set(`link:${id}`, JSON.stringify(data));
  
  res.status(200).json({ shortUrl: `${req.headers.host}/api/${id}` });
}