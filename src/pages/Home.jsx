import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPopularMovies, searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import ErrorMessage from './ErrorMessage';
import LoaderPage from './Loader';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = searchQuery
          ? await searchMovies(searchQuery)
          : await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError(`خطأ: ${err.message || 'تعذر جلب تفاصيل الفيلم. حاول مرة أخرى لاحقًا.'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  if (loading) {
    return <LoaderPage/>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {searchQuery ? 'Search Results' : 'Popular Movies'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;