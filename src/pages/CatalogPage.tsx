import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BreedCard } from '../components/BreedCard';
import { useBreeds } from '../hooks/useBreeds';
import { useAddFavorite, useFavoriteIds, useRemoveFavorite } from '../hooks/useFavorites';
import type { BreedSummary } from '../types/api';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const breeds = useBreeds(query);
  const favoriteIds = useFavoriteIds();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const sortedBreeds = useMemo(() => {
    return [...(breeds.data ?? [])].sort((a, b) => a.name.localeCompare(b.name));
  }, [breeds.data]);

  function handleFavorite(breed: BreedSummary) {
    if (favoriteIds.has(breed.id)) {
      removeFavorite.mutate(breed.id);
      return;
    }

    addFavorite.mutate(breed);
  }

  return (
    <main className="catalog-page">
      <section className="catalog-toolbar" aria-labelledby="catalog-title">
        <div>
          <h1 id="catalog-title">PawPedia</h1>
          <p>Searchable cat breed intelligence, tuned for quick comparisons.</p>
        </div>

        <label className="search-field">
          <Search aria-hidden="true" size={18} />
          <span className="sr-only">Search breeds</span>
          <input
            aria-label="Search breeds"
            type="search"
            value={query}
            placeholder="Search breeds"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </section>

      {breeds.isLoading ? <p className="state-text">Loading breeds...</p> : null}
      {breeds.isError ? <p className="state-text state-text--error">Could not load breeds. Try again in a moment.</p> : null}
      {!breeds.isLoading && !breeds.isError && sortedBreeds.length === 0 ? (
        <p className="state-text">No breeds matched that search.</p>
      ) : null}

      <section className="breed-grid" aria-label="Cat breeds">
        {sortedBreeds.map((breed) => (
          <BreedCard
            key={breed.id}
            breed={breed}
            isFavorite={favoriteIds.has(breed.id)}
            onFavorite={handleFavorite}
          />
        ))}
      </section>
    </main>
  );
}
