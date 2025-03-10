import { useState } from 'react'; // استيراد useState لإدارة حالة البحث
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate للتنقل بين الصفحات

function SearchBar() {
  // إنشاء حالة `query` لتخزين نص البحث وإعداد وظيفة لتحديثه
  const [query, setQuery] = useState('');

  // `useNavigate` هي دالة تُستخدم للتنقل البرمجي بين الصفحات
  const navigate = useNavigate();

  /**
   * ✅ التعامل مع إرسال نموذج البحث
   * - منع التحديث الافتراضي للصفحة
   * - التأكد من أن حقل البحث غير فارغ
   * - توجيه المستخدم إلى صفحة البحث مع إضافة الكلمة في الـ URL
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة عند الإرسال

    if (query.trim()) {
      // إضافة الكلمة إلى الـ URL مع ترميزها بشكل صحيح
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-96">
      {/* ✅ حقل الإدخال الذي يأخذ نص البحث */}
      <input
        type="text"
        value={query} // ربط القيمة بالحالة `query`
        onChange={(e) => setQuery(e.target.value)} // تحديث `query` عند الكتابة
        placeholder="Search movies..." // نص توضيحي داخل الحقل
        className="w-full px-4 py-2 rounded-lg text-gray-900" // أنماط Tailwind CSS
      />
    </form>
  );
}

export default SearchBar; // تصدير المكون لاستخدامه في أماكن أخرى
