import { cookies } from 'next/headers';
import api from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import type { FetchNotesParams, FetchNotesResponse } from './clientApi';

// Отримання cookies для запитів
async function getHeaders() {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
}

// Отримання списку нотаток
export async function fetchNotes(params?: FetchNotesParams) {
  const headers = await getHeaders();

  const response = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers,
  });

  return response.data;
}

// Отримання однієї нотатки
export async function fetchNoteById(id: string) {
  const headers = await getHeaders();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers,
  });

  return response.data;
}

// Перевірка сесії
export async function checkSession(cookieString?: string) {
  const headers = cookieString ? { Cookie: cookieString } : await getHeaders();

  return api.get<User | null>('/auth/session', { headers });
}

// Отримання профілю
export async function getMe() {
  const headers = await getHeaders();

  const response = await api.get<User>('/users/me', {
    headers,
  });

  return response.data;
}