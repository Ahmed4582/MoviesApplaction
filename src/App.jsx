import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Wishlist from './components/Wishlist';
import MovieDetails from './components/MovieDetails';
import { WishlistProvider } from './context/WishlistContext';
import './App.css';

function App() {
  return (
    <WishlistProvider>
      <Router>
        <div className=" text-white ">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WishlistProvider>
  );
}

export default App;