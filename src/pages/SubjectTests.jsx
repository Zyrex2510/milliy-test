import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TestCard from "../components/TestCard";
import { SUBJECTS, getTestsBySubject } from "../data/tests";

export default function SubjectTests() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const meta = SUBJECTS.find((s) => s.key === subject);

  const tests = useMemo(() => getTestsBySubject(subject), [subject]);

  if (!meta) {
    return (
      <section className="max-w-7xl mx-auto pt-40 px-8">
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/40 shadow-2xl p-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Fan topilmadi</h2>
          <p className="text-slate-600 mt-2">Manzil noto‘g‘ri: {String(subject)}</p>
          <button
            onClick={() => navigate("/tests")}
            className="mt-6 px-6 py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-600 to-blue-600"
          >
            Test ishlash
          </button>
        </div>
      </section>
    );
  }

  // Fizika/Tarix hozir o‘chiq bo‘lsa
  if (!meta.enabled) {
    return (
      <section className="max-w-7xl mx-auto pt-40 px-8">
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/40 shadow-2xl p-16 text-center">
          <div className="text-5xl mb-6">⏳</div>
          <h2 className="text-4xl font-extrabold mb-4">{meta.title} testlari</h2>
          <p className="text-gray-600 text-lg">{meta.desc}</p>
          <div className="mt-6 text-indigo-600 font-bold text-xl">
            TEZ ORADA TESTLAR QO‘SHILADI
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto pt-40 px-8">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold">{meta.title} testlari</h2>
          <p className="text-gray-600 mt-2">
            Milliy sertifikat uchun tuzilgan bepul testlar.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {tests.map((t) => (
          <TestCard
            key={t.title}
            subject={subject}
            id={t.id ?? 1}
            title={t.title}
            type={t.type}
            attempts={t.attempts ?? 0}
          />
        ))}
      </div>
    </section>
  );
}
