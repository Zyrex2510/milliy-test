import { Link } from "react-router-dom";

export default function LessonCard({ title, desc, to, index }) {
  return (
    <Link
      to={to}
      className="rounded-3xl bg-white/60 backdrop-blur border border-white/40 shadow-xl p-6 hover:bg-white/75 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-500">Dars {index}</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{title}</div>
          <div className="text-sm text-slate-600 mt-2 leading-relaxed">{desc}</div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/10 border border-indigo-200 text-indigo-800">
          Video
        </span>
      </div>

      <div className="mt-6 text-sm font-bold text-indigo-700 hover:underline">
        Darsni ochish →
      </div>
    </Link>
  );
}
