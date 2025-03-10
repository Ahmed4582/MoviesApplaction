import {  FadeLoader } from "react-spinners";

function LoaderPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <FadeLoader color="#36d7b7" size={60} speedMultiplier={1.2} />
    </div>
  );
}

export default LoaderPage;
