import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";

function ErrorPage({ message = "حدث خطأ ما!" }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
      <BounceLoader color="#ff0000" size={80} />
      <h1 className="text-6xl font-bold text-red-500 mt-6">404</h1>
      <p className="text-xl mt-4">{message}</p>
      <button
        className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-lg"
        onClick={() => navigate("/")}
      >
        العودة إلى الصفحة الرئيسية
      </button>
    </div>
  );
}

export default ErrorPage;
