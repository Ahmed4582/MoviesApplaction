import { Link } from 'react-router-dom'; // استيراد Link للتنقل بين الصفحات بدون إعادة تحميل الصفحة
import { useWishlist } from '../context/WishlistContext'; // استيراد الدالة التي تدير حالة المفضلة من السياق
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // استيراد أيقونات القلب من مكتبة react-icons

function MovieCard({ movie }) { 
  // استدعاء وظائف إدارة المفضلة من الـ context
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // التحقق مما إذا كان الفيلم موجودًا بالفعل في قائمة المفضلة
  const inWishlist = isInWishlist(movie.id);

  // وظيفة لتبديل حالة الفيلم في المفضلة عند النقر على زر القلب
  const toggleWishlist = (e) => {
    e.preventDefault(); // منع السلوك الافتراضي للرابط (Link) حتى لا ينتقل فور الضغط على القلب
    
    if (inWishlist) {
      removeFromWishlist(movie.id); // إزالة الفيلم من المفضلة إذا كان موجودًا
    } else {
      addToWishlist(movie); // إضافة الفيلم إلى المفضلة إذا لم يكن موجودًا
    }
  };

  return (
    // رابط ينقل المستخدم إلى صفحة تفاصيل الفيلم عند النقر على البطاقة
    <Link to={`/movie/${movie.id}`} className="relative group">
      
      {/* غلاف بطاقة الفيلم مع تأثير التحريك عند التمرير */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
        
        {/* صورة غلاف الفيلم */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // رابط الصورة المستضاف على TMDB
          alt={movie.title} // نص بديل للصورة
          className="w-full h-96 object-cover" // جعل الصورة تغطي الحاوية بالكامل
        />

        {/* تفاصيل الفيلم: العنوان وسنة الإصدار */}
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3> {/* عنوان الفيلم */}
          <p className="text-gray-400">{new Date(movie.release_date).getFullYear()}</p> {/* سنة الإصدار */}
        </div>
        <div className="absolute bottom-24  left-2 w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-400 flex items-center justify-center">
            <span className="text-sm font-bold text-white">{Math.round(movie.vote_average * 10)}</span>
          </div>

        {/* زر إضافة أو إزالة الفيلم من المفضلة */}
        <button
          onClick={toggleWishlist} // استدعاء الوظيفة عند النقر
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full" // تنسيق الزر ليكون دائريًا في أعلى اليمين
        >
          {inWishlist ? ( // التحقق مما إذا كان الفيلم في المفضلة
            <FaHeart className="text-red-500" /> // إظهار قلب ممتلئ إذا كان في المفضلة
          ) : (
            <FaRegHeart className="text-white" /> // إظهار قلب فارغ إذا لم يكن في المفضلة
          )}
        </button>

      </div>
    </Link>
  );
}

export default MovieCard; // تصدير المكون لاستخدامه في أماكن أخرى
