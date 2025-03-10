// استيراد Link لإنشاء روابط داخلية بدون إعادة تحميل الصفحة
import { Link } from 'react-router-dom'; 

// استيراد مكون البحث SearchBar
import SearchBar from './SearchBar';

// استيراد أيقونة القلب من مكتبة react-icons
import { FaHeart } from 'react-icons/fa';

// استيراد `useWishlist` للوصول إلى قائمة المفضلة
import { useWishlist } from '../context/WishlistContext';

function Navbar() {
  // جلب قائمة الأفلام المحفوظة في المفضلة
  const { wishlist } = useWishlist();

  return (
    <nav className="bg-gray-800 py-4"> {/* شريط التنقل بلون رمادي داكن */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* رابط شعار الموقع، يؤدي إلى الصفحة الرئيسية */}
        <Link to="/" className="text-2xl font-bold text-white mb-4 md:mb-0">
          Movie App
        </Link>

        {/* ✅ قسم البحث وأيقونة المفضلة */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          
          {/* مكون البحث عن الأفلام */}
          <SearchBar />

          {/* رابط صفحة المفضلة يحتوي على أيقونة القلب مع عداد الأفلام */}
          <Link to="/wishlist" className="relative text-white hover:text-gray-300">
            <FaHeart size={"35px"} /> 
 

            {/* ✅ إضافة دائرة صغيرة تحتوي على عدد الأفلام */}
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {wishlist.length}
              </span>
            )}
          
          </Link>
        

        </div>
      </div>
    </nav>
  );
}

export default Navbar; // تصدير المكون لاستخدامه في التطبيق
