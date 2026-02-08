import { useNavigate } from "react-router-dom";
import { learnSubjects } from "../data/lessons";
import { motion } from "framer-motion";

export default function LearnHome() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto pt-40 px-8">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold">O‘rganish</h2>
          <p className="text-gray-600 mt-2">
            Fan tanlang va darslarni ketma-ket o‘rganing.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {learnSubjects.map((s, idx) => (
          <motion.button
            key={s.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(idx * 0.05, 0.2) }}
            onClick={() => {
              if (!s.enabled) return;
              navigate(`/learn/${s.key}`);
            }}
            className={`text-left rounded-[32px] p-10 shadow-xl border transition
              bg-linear-to-br from-white to-indigo-50
              hover:shadow-2xl hover:-translate-y-1
              ${s.enabled ? "cursor-pointer" : "opacity-70 cursor-not-allowed"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">{s.title}</h3>
                <p className="text-gray-500 mt-2">{s.desc}</p>
              </div>

              {!s.enabled && (
                <span className="px-4 py-2 rounded-full text-xs font-extrabold
                  bg-slate-900/5 border border-slate-200 text-slate-700"
                >
                  Tez orada
                </span>
              )}
            </div>

            <div className="mt-8">
              <span
                className={`inline-flex px-8 py-3 rounded-xl font-semibold text-white
                bg-linear-to-r from-blue-600 to-indigo-600
                ${s.enabled ? "" : "opacity-60"}`}
              >
                {s.enabled ? "Darslarni ko‘rish →" : "Yaqinda qo‘shiladi"}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
