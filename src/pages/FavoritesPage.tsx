import { Heart } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites, useRemoveFavorite } from '../hooks/useFavorites';

export function FavoritesPage() {
  const favorites = useFavorites();
  const removeFavorite = useRemoveFavorite();
  const { refetch } = favorites;

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return (
    <main className="favorites-page">
      <section className="page-heading">
        <h1>Favorites</h1>
        <p>Your saved breeds stay on this browser with an anonymous device id.</p>
      </section>

      {favorites.isLoading ? <p className="state-text">Loading favorites...</p> : null}
      {!favorites.isLoading && (favorites.data ?? []).length === 0 ? <p className="state-text">No favorites saved yet.</p> : null}

      <section className="favorites-list" aria-label="Favorite breeds">
        {(favorites.data ?? []).map((favorite) => (
          <article className="favorite-row" key={favorite.breedId}>
            <div>
              <h2>{favorite.breedName}</h2>
              <Link to={`/breeds/${favorite.breedId}`}>View details</Link>
            </div>
            <button
              className="icon-button icon-button--active"
              type="button"
              aria-label={`Unfavorite ${favorite.breedName}`}
              onClick={() => removeFavorite.mutate(favorite.breedId)}
            >
              <Heart aria-hidden="true" fill="currentColor" size={18} />
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
