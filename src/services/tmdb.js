import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY, // ✅ مفتاح API من `.env`
    language: 'en-US', // ✅ يمكن تغييره ديناميكيًا لاحقًا
  },
});

/**
 * ✅ جلب الأفلام الشهيرة من TMDB
 * @returns {Promise<Array>} قائمة الأفلام الشهيرة أو مصفوفة فارغة عند الخطأ
 */
export const getPopularMovies = async () => {
  try {
    const { data } = await API.get('/movie/popular', { params: { page: 1 } });
    return data.results || [];
  } catch (error) {
    handleApiError('جلب الأفلام الشهيرة', error);
    return [];
  }
};

/**
 * ✅ البحث عن فيلم معين عبر الاسم
 * @param {string} query - اسم الفيلم المطلوب البحث عنه
 * @returns {Promise<Array>} قائمة نتائج البحث أو مصفوفة فارغة عند الخطأ
 */
export const searchMovies = async (query) => {
  if (!query.trim()) return [];

  try {
    const { data } = await API.get('/search/movie', { params: { query, page: 1 } });
    return data.results || [];
  } catch (error) {
    handleApiError('البحث عن الأفلام', error);
    return [];
  }
};

/**
 * ✅ جلب تفاصيل فيلم معين عبر الـ ID
 * @param {number} movieId - رقم تعريف الفيلم في TMDB
 * @returns {Promise<Object|null>} بيانات الفيلم أو null عند الخطأ
 */
export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await API.get(`/movie/${movieId}`);
    return data || null;
  } catch (error) {
    handleApiError(`جلب تفاصيل الفيلم (ID: ${movieId})`, error);
    return null;
  }
};

/**
 * ✅ دالة موحدة لمعالجة الأخطاء
 * @param {string} action - وصف العملية التي حدث فيها الخطأ
 * @param {Error} error - كائن الخطأ
 */
const handleApiError = (action, error) => {
  console.error(`❌ خطأ أثناء ${action}: ${error.message}`);
};

/**
 * ✅ تجربة استدعاء البيانات تلقائيًا عند تشغيل المشروع
 * ⚠️ يفضل تشغيل هذا داخل `useEffect` في React بدلًا من التنفيذ الفوري هنا
 */
(async () => {
  console.log('🔥 جاري تحميل الأفلام الشهيرة...');
  const movies = await getPopularMovies();
  console.log('🎬 أشهر 5 أفلام:', movies.slice(0, 5));
})();
