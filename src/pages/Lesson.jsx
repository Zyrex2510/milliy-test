import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lessonsBySubject, learnSubjects } from "../data/lessons";
import { motion } from "framer-motion";

export default function SubjectLessons() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const meta = learnSubjects.find((x) => x.key === subject) || null;

  const lessons = useMemo(() => {
    return lessonsBySubject?.[subject] || [];
  }, [subject]);

  if (!meta) {
    return (
      <section className="max-w-7xl mx-auto pt-40 px-8">
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/40 shadow-xl p-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Fan topilmadi</h2>
          <button
            onClick={() => navigate("/learn")}
            className="mt-6 px-6 py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-600 to-blue-600"
          >
            O‘rganishga qaytish
          </button>
        </div>
      </section>
    );
  }

  // aktiv emas bo‘lsa — “tez orada”
  if (!meta.enabled) {
    return (
      <section className="max-w-7xl mx-auto pt-40 px-8">
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/40 shadow-2xl p-16 text-center">
          <div className="text-5xl mb-6">⏳</div>
          <h2 className="text-4xl font-extrabold mb-4">{meta.title} darslari</h2>
          <p className="text-gray-600 text-lg">Bu bo‘lim hozir tayyorlanmoqda.</p>
          <div className="mt-6 text-indigo-600 font-bold text-xl">TEZ ORADA DARSlar QO‘SHILADI</div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto pt-40 px-8">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold">{meta.title} darslari</h2>
          <p className="text-gray-600 mt-2">Darslarni ketma-ket o‘ting.</p>
        </div>

        <button
          onClick={() => navigate("/tests")}
          className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg
          bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 transition"
        >
          Test ishlash
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {lessons.map((l, idx) => (
          <motion.button
            key={l.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(idx * 0.05, 0.2) }}
            onClick={() => navigate(`/learn/${subject}/${l.id}`)}
            className="text-left rounded-[32px] p-10 shadow-xl border transition
            bg-linear-to-br from-white to-indigo-50 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-sm text-gray-500">Dars #{l.id}</div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900">{l.title}</div>
            <div className="mt-4 text-gray-600 line-clamp-3 whitespace-pre-wrap">
              {l.description}
            </div>

            <div className="mt-8">
              <span className="inline-flex px-8 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-blue-600 to-indigo-600">
                Darsni ochish →
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {lessons.length === 0 && (
        <div className="mt-10 text-center text-slate-500">
          Hozircha dars yo‘q.
        </div>
      )}
    </section>
  );
}
