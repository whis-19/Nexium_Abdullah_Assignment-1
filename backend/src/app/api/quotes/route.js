import { promises as fs } from 'fs';
import path from 'path';

const quotesFile = path.join(process.cwd(), 'src/app/api/quotes/quotes.json');
const API_KEY = 'demo-key'; // Change for real use

async function getQuotes() {
  return JSON.parse(await fs.readFile(quotesFile, 'utf-8'));
}
async function saveQuotes(quotes) {
  await fs.writeFile(quotesFile, JSON.stringify(quotes, null, 2));
}

export async function GET(request) {
  const { searchParams, pathname } = new URL(request.url);
  let quotes = await getQuotes();

  // /random endpoint
  if (pathname.endsWith('/random')) {
    if (quotes.length === 0) return new Response('No quotes', { status: 404 });
    const topic = searchParams.get('topic');
    let filtered = quotes;
    if (topic) filtered = quotes.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
    if (filtered.length === 0) return new Response('No quotes for topic', { status: 404 });
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    return new Response(JSON.stringify(random), { headers: { 'Content-Type': 'application/json' } });
  }

  // Search
  const topic = searchParams.get('topic');
  const search = searchParams.get('search');
  if (topic) {
    quotes = quotes.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
  }
  if (search) {
    quotes = quotes.filter(q =>
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      q.author.toLowerCase().includes(search.toLowerCase())
    );
  }
  // Pagination
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '3', 10);
  const start = (page - 1) * limit;
  const paginated = quotes.slice(start, start + limit);
  return new Response(JSON.stringify(paginated), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  // Simple API key check
  if (request.headers.get('x-api-key') !== API_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const body = await request.json();
    const { topic, text, author } = body;
    if (!topic || !text || !author) {
      return new Response(JSON.stringify({ error: 'Missing topic, text, or author.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const quotes = await getQuotes();
    const newId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1;
    const newQuote = { id: newId, topic, text, author };
    quotes.push(newQuote);
    await saveQuotes(quotes);
    return new Response(JSON.stringify(newQuote), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request or server error.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(request) {
  if (request.headers.get('x-api-key') !== API_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id'), 10);
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  let quotes = await getQuotes();
  const idx = quotes.findIndex(q => q.id === id);
  if (idx === -1) return new Response(JSON.stringify({ error: 'Quote not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  const [deleted] = quotes.splice(idx, 1);
  await saveQuotes(quotes);
  return new Response(JSON.stringify(deleted), { headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(request) {
  if (request.headers.get('x-api-key') !== API_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const body = await request.json();
    const { id, topic, text, author } = body;
    if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    let quotes = await getQuotes();
    const idx = quotes.findIndex(q => q.id === id);
    if (idx === -1) return new Response(JSON.stringify({ error: 'Quote not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    if (topic) quotes[idx].topic = topic;
    if (text) quotes[idx].text = text;
    if (author) quotes[idx].author = author;
    await saveQuotes(quotes);
    return new Response(JSON.stringify(quotes[idx]), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request or server error.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PATCH(request) {
  // PATCH behaves like PUT but only updates provided fields
  return PUT(request);
} 