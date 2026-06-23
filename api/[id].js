import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { id } = req.query;
  const data = await redis.get(`link:${id}`);

  if (!data) return res.status(404).send('Not found');

  data.clicks += 1;
  await redis.set(`link:${id}`, JSON.stringify(data));

  res.redirect(data.url);
}