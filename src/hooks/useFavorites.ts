import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, getFavorites, removeFavorite } from '../api/client';
import type { BreedSummary, Favorite } from '../types/api';

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: false,
    staleTime: 1000 * 60
  });
}

export function useFavoriteIds() {
  const favorites = useFavorites();
  return new Set((favorites.data ?? []).map((favorite) => favorite.breedId));
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (breed: BreedSummary) => addFavorite({
      breedId: breed.id,
      breedName: breed.name,
      imageUrl: null
    }),
    onSuccess: (favorite) => {
      queryClient.setQueryData<Favorite[]>(['favorites'], (current = []) => {
        if (current.some((item) => item.breedId === favorite.breedId)) {
          return current;
        }
        return [favorite, ...current];
      });
    }
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: (_, breedId) => {
      queryClient.setQueryData<Favorite[]>(['favorites'], (current = []) => current.filter((favorite) => favorite.breedId !== breedId));
    }
  });
}
