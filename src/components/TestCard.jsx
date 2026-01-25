import { useNavigate } from "react-router-dom";

export default function TestCard({ subject, id, title, type, attempts }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-linear-to-br from-white to-indigo-50
      rounded-[32px] p-10 shadow-xl
      hover:shadow-2xl hover:-translate-y-1 transition"
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500">{type}</p>
      <p className="text-sm text-gray-400 mt-1">
        {attempts}+ ishtirokchi
      </p>

      <button
        onClick={() => navigate(`/test/${subject}/${id}`)}
        className="mt-8 px-8 py-3 rounded-xl
        bg-linear-to-r from-blue-600 to-indigo-600
        text-white font-semibold"
      >
        Testni boshlash →
      </button>
    </div>
  );
}
