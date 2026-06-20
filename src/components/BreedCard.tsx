import { Heart, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BreedSummary } from '../types/api';

type BreedCardProps = {
  breed: BreedSummary;
  isFavorite: boolean;
  onFavorite: (breed: BreedSummary) => void;
};

export function BreedCard({ breed, isFavorite, onFavorite }: BreedCardProps) {
  const topTraits = breed.temperament.slice(0, 3);

  return (
    <article className="breed-card">
      <div className="breed-card__header">
        <div>
          <h2>{breed.name}</h2>
          <p className="breed-card__origin">
            <MapPin aria-hidden="true" size={16} />
            {breed.origin || 'Unknown origin'}
          </p>
        </div>
        <button
          className={`icon-button ${isFavorite ? 'icon-button--active' : ''}`}
          type="button"
          aria-label={`${isFavorite ? 'Unfavorite' : 'Favorite'} ${breed.name}`}
          onClick={() => onFavorite(breed)}
        >
          <Heart aria-hidden="true" fill={isFavorite ? 'currentColor' : 'none'} size={18} />
        </button>
      </div>

      <p className="breed-card__description">{breed.description}</p>

      <div className="trait-list" aria-label={`${breed.name} temperament`}>
        {topTraits.map((trait) => (
          <span key={trait}>{trait}</span>
        ))}
      </div>

      <div className="breed-card__footer">
        <span>
          <Sparkles aria-hidden="true" size={16} />
          Energy {breed.ratings.energy ?? 'n/a'}
        </span>
        <Link to={`/breeds/${breed.id}`}>View details</Link>
      </div>
    </article>
  );
}
