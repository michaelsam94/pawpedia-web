import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/app/App';

const breed = {
  id: 'abys',
  name: 'Abyssinian',
  temperament: ['Active', 'Energetic'],
  origin: 'Egypt',
  description: 'A highly curious cat.',
  lifeSpan: '14 - 15',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Abyssinian_cat',
  referenceImageId: null,
  weight: { imperial: '7 - 10', metric: '3 - 5' },
  ratings: {
    affection: 5,
    childFriendly: 3,
    dogFriendly: 4,
    energy: 5,
    grooming: 1,
    healthIssues: 2,
    intelligence: 5,
    shedding: 2,
    socialNeeds: 5,
    strangerFriendly: 5,
    vocalisation: 1
  }
};

describe('PawPedia web app', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders breeds from the API on the catalog screen', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify([breed])));

    render(<App />);

    expect(await screen.findByRole('heading', { name: 'PawPedia' })).toBeInTheDocument();
    expect(await screen.findByText('Abyssinian')).toBeInTheDocument();
    expect(screen.getByText('Egypt')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('searches breeds with the query endpoint', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify([breed])))
      .mockResolvedValueOnce(new Response(JSON.stringify([])));

    render(<App />);

    await screen.findByText('Abyssinian');
    await userEvent.type(screen.getByRole('searchbox', { name: /search breeds/i }), 'siamese');

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        'http://localhost:8787/api/breeds/search?q=siamese',
        expect.any(Object)
      );
    });
  });

  it('sends X-Device-Id when adding a favorite', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify([breed])))
      .mockResolvedValueOnce(new Response(JSON.stringify([])))
      .mockResolvedValueOnce(new Response(JSON.stringify({ breedId: 'abys', breedName: 'Abyssinian' }), { status: 201 }));

    render(<App />);

    await screen.findByText('Abyssinian');
    await userEvent.click(screen.getByRole('button', { name: /favorite abyssinian/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenLastCalledWith(
        'http://localhost:8787/api/favorites',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'X-Device-Id': expect.stringMatching(/^pawpedia-/)
          })
        })
      );
    });
  });
});
