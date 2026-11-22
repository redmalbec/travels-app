import type { Museum } from '../../entities/museum/model/types';

const BASE = '/api';

export async function fetchMuseums(): Promise<Museum[]> {
  const res = await fetch(`${BASE}/museums`);
  return res.json();
}

export async function createMuseum(data: Omit<Museum, 'id'>): Promise<Museum> {
  const res = await fetch(`${BASE}/museums`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteMuseum(id: number): Promise<void> {
  await fetch(`${BASE}/museums/${id}`, { method: 'DELETE' });
}

export async function updateMuseum(id: number, data: Partial<Museum>): Promise<void> {
  await fetch(`${BASE}/museums/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}