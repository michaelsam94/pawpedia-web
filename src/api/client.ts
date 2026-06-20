import type { BreedImage, BreedSummary, Favorite } from '../types/api';
import { getDeviceId } from './deviceId';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8787').replace(/\/$/, '');

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      accept: 'application/json',
      ...init.headers
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.error?.message ?? 'PawPedia API request failed.';
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getBreeds() {
  return request<BreedSummary[]>('/api/breeds');
}

export function searchBreeds(query: string) {
  return request<BreedSummary[]>(`/api/breeds/search?q=${encodeURIComponent(query)}`);
}

export function getBreed(breedId: string) {
  return request<BreedSummary>(`/api/breeds/${encodeURIComponent(breedId)}`);
}

export function getBreedImages(breedId: string, limit = 10) {
  return request<BreedImage[]>(`/api/breeds/${encodeURIComponent(breedId)}/images?limit=${limit}`);
}

export function getFavorites() {
  return request<Favorite[]>('/api/favorites', {
    headers: {
      'X-Device-Id': getDeviceId()
    }
  });
}

export function addFavorite(favorite: Pick<Favorite, 'breedId' | 'breedName' | 'imageUrl'>) {
  return request<Favorite>('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Id': getDeviceId()
    },
    body: JSON.stringify(favorite)
  });
}

export function removeFavorite(breedId: string) {
  return request<void>(`/api/favorites/${encodeURIComponent(breedId)}`, {
    method: 'DELETE',
    headers: {
      'X-Device-Id': getDeviceId()
    }
  });
}
