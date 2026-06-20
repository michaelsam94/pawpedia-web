import { useQuery } from '@tanstack/react-query';
import { getBreed, getBreedImages, getBreeds, searchBreeds } from '../api/client';

export function useBreeds(query: string) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: ['breeds', normalizedQuery],
    queryFn: () => normalizedQuery ? searchBreeds(normalizedQuery) : getBreeds(),
    staleTime: 1000 * 60 * 15
  });
}

export function useBreed(breedId: string | undefined) {
  return useQuery({
    queryKey: ['breed', breedId],
    queryFn: () => getBreed(String(breedId)),
    enabled: Boolean(breedId),
    staleTime: 1000 * 60 * 60
  });
}

export function useBreedImages(breedId: string | undefined) {
  return useQuery({
    queryKey: ['breed-images', breedId],
    queryFn: () => getBreedImages(String(breedId), 8),
    enabled: Boolean(breedId),
    staleTime: 1000 * 60 * 30
  });
}
