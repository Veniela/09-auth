import api from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

// Типи даних для авторизації
interface AuthCredentials {
  email: string;
  password: string;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Реєстрація
export async function register(data: AuthCredentials) {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
}

// Авторизація
export async function login(data: AuthCredentials) {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
}

// Вихід з акаунта
export async function logout() {
  await api.post('/auth/logout');
}

// Перевірка сесії
export async function checkSession() {
  const response = await api.get<User | null>('/auth/session');
  return response.data;
}

// Отримання профілю
export async function getMe() {
  const response = await api.get<User>('/users/me');
  return response.data;
}

// Оновлення профілю
export async function updateMe(data: { username: string }) {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
}

// Отримання списку нотаток
export async function fetchNotes(params?: FetchNotesParams) {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params,
  });
  return response.data;
}

// Отримання однієї нотатки
export async function fetchNoteById(id: string) {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

// Створення нотатки
export async function createNote(data: {
  title: string;
  content: string;
  tag: string;
}) {
  const response = await api.post<Note>('/notes', data);
  return response.data;
}

// Видалення нотатки
export async function deleteNote(id: string) {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}