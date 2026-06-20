import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BreedCard } from '../components/BreedCard';
import { useBreeds } from '../hooks/useBreeds';
import { useAddFavorite, useFavoriteIds, useRemoveFavorite } from '../hooks/useFavorites';
import { usePageMeta } from '../hooks/usePageMeta';
import type { BreedSummary } from '../types/api';

export function CatalogPage() {
  usePageMeta({
    title: 'PawPedia Cat Breed Explorer | Compare Temperament and Care',
    description: 'Browse and compare cat breeds by temperament, origin, energy, grooming, weight, and family fit with PawPedia.',
    canonicalPath: '/'
  });

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
          <p className="eyebrow">Cat Breed Explorer</p>
          <h1 id="catalog-title">PawPedia</h1>
          <p>
            Compare cat breeds by temperament, origin, energy, grooming, weight, and family fit.
            PawPedia turns structured breed data into quick answers for people choosing a cat.
          </p>
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

      <section className="seo-section" aria-labelledby="compare-breeds">
        <div>
          <p className="eyebrow">How to use PawPedia</p>
          <h2 id="compare-breeds">Compare cat breeds before choosing one</h2>
          <p>
            PawPedia helps you narrow the cat breed catalog by practical traits: sociability,
            grooming effort, energy level, size, origin, and temperament. Use the search field for
            a specific breed, then open a breed card to review its weight range, life span, images,
            and care-related ratings.
          </p>
        </div>
        <div className="answer-card">
          <h3>What is PawPedia?</h3>
          <p>
            PawPedia is a cat breed explorer for people comparing breeds by temperament, care needs,
            and home fit. It uses TheCatAPI-sourced breed data and presents it in a searchable,
            mobile-friendly interface.
          </p>
        </div>
      </section>

      <section className="seo-section seo-section--split" aria-labelledby="popular-questions">
        <div>
          <h2 id="popular-questions">Popular cat breed questions</h2>
          <ul className="question-list">
            <li>Which cat breeds are good with kids?</li>
            <li>Which cats are best for apartments?</li>
            <li>How much grooming does a long-haired cat need?</li>
            <li>What cat breed has an affectionate temperament?</li>
          </ul>
        </div>
        <div className="answer-card">
          <h3>Featured guide</h3>
          <p>
            Start with the Maine Coon guide if you are comparing large, social, family-friendly
            cats and want a plain-English care overview.
          </p>
          <a href="/breeds/maine-coon-cat-guide">Read the Maine Coon cat guide</a>
        </div>
      </section>
    </main>
  );
}
