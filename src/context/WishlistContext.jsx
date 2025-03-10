import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // ✅ تحميل المفضلة من localStorage عند بدء التشغيل
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (error) {
      console.error('❌ خطأ في قراءة المفضلة من localStorage:', error);
      console.log("المفضلة الحالية:", wishlist);
      return [];
    }
  });

  // ✅ تحديث localStorage تلقائيًا عند تغيّر المفضلة
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ تحسين كفاءة البحث باستخدام Set
  const wishlistIds = useMemo(() => new Set(wishlist.map(movie => movie.id)), [wishlist]);

  // ✅ إضافة فيلم إلى المفضلة
  const addToWishlist = (movie) => {
    setWishlist(prev => (wishlistIds.has(movie.id) ? prev : [...prev, movie]));
  };

  // ✅ إزالة فيلم من المفضلة
  const removeFromWishlist = (movieId) => {
    setWishlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  // ✅ التحقق من وجود الفيلم في المفضلة بكفاءة عالية
  const isInWishlist = (movieId) => wishlistIds.has(movieId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// ✅ هوك لاستخدام سياق المفضلة بسهولة
export function useWishlist() {
  return useContext(WishlistContext);
}
