import { ArrowLeft, ExternalLink, Heart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useBreed, useBreedImages } from '../hooks/useBreeds';
import { useAddFavorite, useFavoriteIds, useRemoveFavorite } from '../hooks/useFavorites';
import { usePageMeta } from '../hooks/usePageMeta';

export function BreedDetailPage() {
  const { breedId } = useParams();
  const breed = useBreed(breedId);
  const images = useBreedImages(breedId);
  const favoriteIds = useFavoriteIds();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  usePageMeta({
    title: breed.data ? `${breed.data.name} Cat Breed | PawPedia` : 'Cat Breed Details | PawPedia',
    description: breed.data
      ? `Review ${breed.data.name} cat breed temperament, origin, life span, weight, energy, grooming, and images on PawPedia.`
      : 'Review cat breed temperament, origin, life span, weight, energy, grooming, and images on PawPedia.',
    canonicalPath: breedId ? `/breeds/${breedId}` : '/breeds'
  });

  if (breed.isLoading) {
    return <main className="detail-page"><p className="state-text">Loading breed...</p></main>;
  }

  if (breed.isError || !breed.data) {
    return <main className="detail-page"><p className="state-text state-text--error">Breed not found.</p></main>;
  }

  const isFavorite = favoriteIds.has(breed.data.id);

  return (
    <main className="detail-page">
      <Link className="back-link" to="/">
        <ArrowLeft aria-hidden="true" size={18} />
        Catalog
      </Link>

      <section className="detail-hero">
        <div>
          <h1>{breed.data.name}</h1>
          <p>{breed.data.description}</p>
        </div>
        <button
          className={`primary-button ${isFavorite ? 'primary-button--active' : ''}`}
          type="button"
          onClick={() => isFavorite ? removeFavorite.mutate(breed.data.id) : addFavorite.mutate(breed.data)}
        >
          <Heart aria-hidden="true" size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          {isFavorite ? 'Saved' : 'Save breed'}
        </button>
      </section>

      <section className="detail-layout">
        <div className="image-gallery" aria-label={`${breed.data.name} images`}>
          {(images.data ?? []).map((image) => (
            <img key={image.id} src={image.url} alt={breed.data.name} />
          ))}
          {!images.isLoading && (images.data ?? []).length === 0 ? <p className="state-text">No images available.</p> : null}
        </div>

        <aside className="facts-panel">
          <h2>Breed facts</h2>
          <dl>
            <div><dt>Origin</dt><dd>{breed.data.origin || 'Unknown'}</dd></div>
            <div><dt>Life span</dt><dd>{breed.data.lifeSpan || 'Unknown'}</dd></div>
            <div><dt>Weight</dt><dd>{breed.data.weight.metric} kg</dd></div>
            <div><dt>Energy</dt><dd>{breed.data.ratings.energy ?? 'n/a'} / 5</dd></div>
            <div><dt>Affection</dt><dd>{breed.data.ratings.affection ?? 'n/a'} / 5</dd></div>
          </dl>
          {breed.data.wikipediaUrl ? (
            <a href={breed.data.wikipediaUrl} target="_blank" rel="noreferrer">
              Wikipedia <ExternalLink aria-hidden="true" size={16} />
            </a>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
