import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdb';
import { useWishlist } from '../context/WishlistContext';
import { FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import { IoMdList } from 'react-icons/io';
import { BsFillBookmarkFill } from 'react-icons/bs';
import ErrorMessage from '../pages/ErrorMessage';
import LoaderPage from '../pages/Loader';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(`خطأ: ${err.message || 'تعذر جلب تفاصيل الفيلم. حاول مرة أخرى لاحقًا.'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <LoaderPage />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return null;
  }

  const toggleWishlist = () => {
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  // Format release year from full date
  const releaseYear = movie.release_date ? `(${movie.release_date.split('-')[0]})` : '';

  // Calculate runtime in hours and minutes
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const formattedRuntime = `${hours}h ${minutes}m`;

  return (
    <div className=" text-white">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(45, 41, 74, 0.7), rgba(45, 41, 74, 1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 ">
            {/* Movie Poster */}
            <div className="md:w-1/3 lg:w-1/4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            {/* Movie Details */}
            <div className="md:w-2/3 lg:w-3/4 ">
              {/* Title and Year */}
              <h1 className="text-4xl font-bold flex items-center gap-3">
                {movie.title} <span className="text-gray-400">{releaseYear}</span>
              </h1>
              
              {/* Movie Info Line */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300 my-3">
                <span className="border border-gray-500 rounded px-2 py-1">PG-13</span>
                <span>{movie.release_date}</span>
                <span>•</span>
                <span>{formattedRuntime}</span>
                <span>•</span>
                <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
              </div>
              
              {/* Rating Circle */}
              <div className="flex items-center gap-6 my-6">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-14 h-14">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#444"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={`hsl(${movie.vote_average * 10}, 100%, 50%)`}
                      strokeWidth="3"
                      strokeDasharray={`${movie.vote_average * 10}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold">{Math.round(movie.vote_average * 10)}</span>
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold text-sm">User Score</p>
                  <div className="flex mt-1">
                    <span className="text-2xl">😍</span>
                    <span className="text-2xl">😊</span>
                    <span className="text-2xl">😐</span>
                  </div>
                </div>
                
                <div className="border-r border-gray-700 h-14"></div>
                
                <div>
                  <p className="text-sm font-semibold">What's your Vibe? <span className="text-blue-400">?</span></p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 my-6">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-3">
                  <IoMdList className="text-xl" />
                </button>
                <button 
                  onClick={toggleWishlist} 
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-3"
                >
                  {isInWishlist(movie.id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-xl" />
                  )}
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-3">
                  <BsFillBookmarkFill className="text-xl" />
                </button>
                {movie.video && (
  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-3 ml-3">
    <FaPlay className="text-lg" />
    <span>Play Trailer</span>
  </button>
)}

              </div>
              
              {/* Tagline */}
              <p className="text-gray-400 italic my-4">{movie.tagline || "The world's most dangerous secret lies between them."}</p>
              
              {/* Overview */}
              <div className="my-4">
                <h3 className="text-xl font-bold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              </div>
              
              {/* Cast & Crew */}
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <p className="font-bold">Director</p>
                  <p className="text-gray-300">Scott Derrickson</p>
                </div>
                <div>
                  <p className="font-bold">Writer</p>
                  <p className="text-gray-300">زاك دين</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}

export default MovieDetails;