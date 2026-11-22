import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { db } from './db/index.js';
import { museums } from './db/schema.js';
import { eq } from 'drizzle-orm';


const app = new Hono();
app.use('*', cors());

app.post('/api/auth/login', async (c) => {
  const { username, password } = await c.req.json();
  if (username === 'web1' && password === '1') {
    return c.json({ ok: true });
  }
  return c.json({ ok: false }, 401);
});

app.get('/api/museums', async (c) => {
  const rows = await db.select().from(museums).orderBy(museums.id);
  return c.json(rows);
});

app.post('/api/museums', async (c) => {
  const body = await c.req.json();
  const [inserted] = await db.insert(museums).values(body).returning();
  return c.json(inserted);
});

app.delete('/api/museums/:id', async (c) => {
  await db.delete(museums).where(eq(museums.id, Number(c.req.param('id'))));
  return c.json({ ok: true });
});

app.put('/api/museums/:id', async (c) => {
  const body = await c.req.json();
  await db.update(museums).set(body).where(eq(museums.id, Number(c.req.param('id'))));
  return c.json({ ok: true });
});

serve({ fetch: app.fetch, port: Number(process.env.PORT) || 3000 });