import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PawPrint } from 'lucide-react';
import { useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { BreedDetailPage } from '../pages/BreedDetailPage';
import { CatalogPage } from '../pages/CatalogPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { MaineCoonGuidePage } from '../pages/MaineCoonGuidePage';
import '../styles/app.css';

export function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-shell">
          <header className="app-header">
            <Link className="brand" to="/">
              <PawPrint aria-hidden="true" size={24} />
              PawPedia
            </Link>
            <nav aria-label="Primary navigation">
              <NavLink to="/">Catalog</NavLink>
              <NavLink to="/favorites">Favorites</NavLink>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/breeds/maine-coon-cat-guide" element={<MaineCoonGuidePage />} />
            <Route path="/breeds/:breedId" element={<BreedDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>

          <footer className="app-footer">
            Developed by{' '}
            <a href="https://michaelsam94.tech/" target="_blank" rel="noreferrer">
              michaelsam94
            </a>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
