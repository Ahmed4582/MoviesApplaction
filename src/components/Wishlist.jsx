import { useState } from 'react'; // استيراد useState لإدارة الحالة المحلية
import { useWishlist } from '../context/WishlistContext'; // استيراد الـ Context للوصول إلى قائمة المفضلة
import MovieCard from './MovieCard'; // استيراد مكون عرض الأفلام

function Wishlist() {
  // جلب قائمة الأفلام المحفوظة في المفضلة من الـ Context
  const { wishlist } = useWishlist();

  // حالة للتحكم في طريقة الفرز (العنوان أو تاريخ الإصدار)
  const [sortBy, setSortBy] = useState('title');

  // حالة لتخزين نص البحث لتصفية الأفلام
  const [filterQuery, setFilterQuery] = useState('');

  /**
   * ✅ تصفية وفرز قائمة الأفلام المحفوظة في المفضلة
   * - أولًا: يتم تصفية الأفلام بناءً على العنوان المدخل في حقل البحث
   * - ثانيًا: يتم فرز الأفلام إما حسب العنوان أو حسب تاريخ الإصدار
   */
  const sortedAndFilteredWishlist = wishlist
    .filter((movie) =>
      movie.title.toLowerCase().includes(filterQuery.toLowerCase()) // تصفية الأفلام بناءً على البحث
    )
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title); // فرز حسب الترتيب الأبجدي للعنوان
      }
      return new Date(b.release_date) - new Date(a.release_date); // فرز حسب تاريخ الإصدار (الأحدث أولًا)
    });

  return (
    <div>
      {/* ✅ عنوان الصفحة */}
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {/* ✅ مدخل البحث واختيار الترتيب */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* حقل البحث عن الأفلام حسب العنوان */}
        <input
          type="text"
          placeholder="Filter by title..."
          value={filterQuery} // ربط القيمة بالحالة
          onChange={(e) => setFilterQuery(e.target.value)} // تحديث حالة البحث عند الكتابة
          className="px-4 py-2 rounded-lg text-gray-900"
        />

        {/* قائمة منسدلة لاختيار نوع الفرز */}
        <select
          value={sortBy} // ربط القيمة بالحالة
          onChange={(e) => setSortBy(e.target.value)} // تحديث طريقة الفرز عند الاختيار
          className="px-4 py-2 rounded-lg text-gray-900"
        >
          <option value="title">Sort by Title</option>
          <option value="date">Sort by Release Date</option>
        </select>
      </div>

      {/* ✅ عرض الأفلام المحفوظة في المفضلة */}
      {sortedAndFilteredWishlist.length === 0 ? (
        // في حال لم يكن هناك أفلام في القائمة
        <p className="text-center text-gray-400">No movies in wishlist</p>
      ) : (
        // عرض الأفلام باستخدام `MovieCard`
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedAndFilteredWishlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> // تمرير بيانات الفيلم إلى مكون `MovieCard`
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist; // تصدير المكون لاستخدامه في أماكن أخرى
