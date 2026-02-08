import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { InlineMath } from "react-katex";
import ProgressBar from "../components/ProgressBar";
import { getTest } from "../data/tests";

// Gemini ba’zan \( \) yoki \[ \] bilan qaytaradi — buni $...$ ga o‘tkazamiz
function normalizeMathDelimiters(text) {
  return String(text)
    .replace(/\\\(/g, "$")
    .replace(/\\\)/g, "$")
    .replace(/\\\[/g, "$$")
    .replace(/\\\]/g, "$$");
}

function RichText({ text }) {
  const parts = String(text).split(/(\$[^$]+\$)/g);

  return (
    <span className="whitespace-pre-wrap break-words leading-relaxed">
      {parts.map((p, i) => {
        const isMath = p.startsWith("$") && p.endsWith("$");
        if (!isMath) return <span key={i}>{p}</span>;
        const math = p.slice(1, -1);
        return (
          <span key={i} className="mx-1 inline-block align-middle">
            <InlineMath math={math} />
          </span>
        );
      })}
    </span>
  );
}

export default function Test() {
  const { subject, id } = useParams();
  const navigate = useNavigate();

  const test = useMemo(() => getTest(subject, id), [subject, id]);

  // Test topilmasa
  if (!test) {
    return (
      <section className="w-full max-w-6xl mx-auto pt-40 px-6">
        <div className="rounded-3xl p-8 bg-white/60 backdrop-blur border border-white/40 shadow-xl">
          <h2 className="text-2xl font-extrabold text-slate-900">Test topilmadi</h2>
          <p className="text-slate-600 mt-2">
            Manzil noto‘g‘ri yoki test data ulanmagan: <b>{subject}</b> / <b>{id}</b>
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-600 to-blue-600"
          >
            Bosh sahifa
          </button>
        </div>
      </section>
    );
  }

  // STATE
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(test.questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // AI cache: { [questionId]: { status, text } }
  const [aiMap, setAiMap] = useState({});

  async function fetchExplainFor(item) {
    const key = String(item.id);
    if (aiMap[key]?.status === "loading" || aiMap[key]?.status === "done") return;

    setAiMap((m) => ({ ...m, [key]: { status: "loading", text: "" } }));

    try {
      const resp = await fetch("http://localhost:8787/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectName:
            subject === "math" ? "Matematika" : subject === "uzbek" ? "Ona tili" : "Fan",
          question: item.question,
          options: item.options,
          userIndex: item.userIndex,
          correctIndex: item.correctIndex,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "Xatolik");

      const fixed = normalizeMathDelimiters(data?.text || "");
      setAiMap((m) => ({ ...m, [key]: { status: "done", text: fixed } }));
    } catch {
      setAiMap((m) => ({
        ...m,
        [key]: { status: "error", text: "AI server ishlamayapti yoki xatolik yuz berdi." },
      }));
    }
  }

  // TIMER (45 daqiqa)
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [finished]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const answeredCount = answers.filter((x) => x !== null).length;

  const gradedTotal = test.questions.filter(
    (q) => q.correct !== null && q.correct !== undefined
  ).length;

  const correctCount = test.questions.reduce((acc, q, i) => {
    if (q.correct === null || q.correct === undefined) return acc;
    return acc + (answers[i] === q.correct ? 1 : 0);
  }, 0);

  const percent = gradedTotal > 0 ? Math.round((correctCount / gradedTotal) * 100) : 0;
  const grade =
    gradedTotal === 0
      ? "C"
      : percent >= 90
      ? "A+"
      : percent >= 80
      ? "A"
      : percent >= 65
      ? "B"
      : "C";

  const analysis = test.questions.map((q, i) => {
    const userIndex = answers[i];
    const correctIndex = q.correct;
    return {
      id: q.id,
      question: q.question,
      options: q.options,
      userIndex,
      correctIndex,
      isCorrect: userIndex === correctIndex,
    };
  });

  // FINISHED (RESULT + REVIEW)
  if (finished) {
    const gradeConfig = {
      "A+": { color: "from-emerald-400 to-green-600", text: "Mukammal natija!" },
      A: { color: "from-blue-500 to-indigo-600", text: "Ajoyib natija!" },
      B: { color: "from-yellow-400 to-orange-500", text: "Yaxshi natija." },
      C: { color: "from-red-400 to-rose-600", text: "Ko‘proq mashq tavsiya etiladi." },
    };
    const config = gradeConfig[grade] || gradeConfig.C;

    return (
      <section className="min-h-screen px-6 py-12 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 md:p-12"
        >
          {/* TOP */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Test yakunlandi</h2>

            <div className="mt-8 flex justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="80" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#grad)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 80}
                    strokeDashoffset={2 * Math.PI * 80}
                    animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - percent / 100) }}
                    transition={{ duration: 1.0 }}
                  />
                  <defs>
                    <linearGradient id="grad">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-slate-900">
                  {percent}%
                </div>
              </div>
            </div>

            <div
              className={`mt-7 text-7xl font-extrabold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
            >
              {grade}
            </div>

            <p className="mt-4 text-lg text-slate-700">
              To‘g‘ri javoblar:{" "}
              <span className="font-extrabold text-slate-900">
                {correctCount} / {gradedTotal}
              </span>
            </p>

            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{config.text}</p>
          </div>

          {/* REVIEW */}
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">Savollar bo‘yicha tahlil</h3>
                <p className="text-slate-600 mt-1">
                  Har bir savolda: siz tanlagan javob, to‘g‘ri javob va variantlar ko‘rsatiladi.
                </p>
              </div>

              <div className="text-sm text-slate-500">
                Xatolar:{" "}
                <span className="font-bold text-slate-900">
                  {analysis.filter((a) => !a.isCorrect).length}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4 max-h-[520px] overflow-y-auto pr-2">
              {analysis.map((item, idx) => {
                const unanswered = item.userIndex === null;
                const aiState = aiMap[String(item.id)] || { status: "idle", text: "" };

                return (
                  <motion.details
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.2) }}
                    className={`group rounded-2xl border shadow-sm overflow-hidden
                    ${item.isCorrect ? "border-emerald-200 bg-emerald-50/60" : "border-rose-200 bg-rose-50/60"}`}
                  >
                    <summary className="cursor-pointer list-none select-none">
                      <div className="flex items-center justify-between gap-4 px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold
                            ${item.isCorrect ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}
                          >
                            {idx + 1}
                          </div>

                          <div>
                            <div className="text-sm text-slate-600">Savol {idx + 1}</div>
                            <div className="font-extrabold text-slate-900">
                              {item.isCorrect ? "To‘g‘ri" : unanswered ? "Javob berilmagan" : "Noto‘g‘ri"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {!item.isCorrect && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/70 border border-white/60 text-slate-700">
                              To‘g‘ri javob: {String.fromCharCode(65 + item.correctIndex)}
                            </span>
                          )}

                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/70 border border-white/60 text-slate-700">
                            Siz: {unanswered ? "—" : String.fromCharCode(65 + item.userIndex)}
                          </span>

                          <span className="text-slate-500 group-open:rotate-180 transition">▼</span>
                        </div>
                      </div>
                    </summary>

                    <div className="px-6 pb-6">
                      {/* QUESTION */}
                      <div className="rounded-2xl bg-white/70 border border-white/60 p-5">
                        <div className="text-sm text-slate-500 mb-2">Savol matni</div>
                        <div className="text-base md:text-lg font-semibold text-slate-900 leading-relaxed">
                          <RichText text={item.question} />
                        </div>
                      </div>

                      {/* OPTIONS */}
                      <div className="mt-4 grid gap-3">
                        {item.options.map((opt, oi) => {
                          const isCorrect = oi === item.correctIndex;
                          const isUser = oi === item.userIndex;

                          let cls = "bg-white/70 border-white/60";
                          if (isCorrect) cls = "bg-emerald-50 border-emerald-300";
                          if (isUser && !isCorrect) cls = "bg-rose-100 border-rose-300";
                          if (isUser && isCorrect) cls = "bg-emerald-100 border-emerald-300";

                          return (
                            <div key={oi} className={`rounded-2xl border p-4 ${cls}`}>
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm
                                  ${isCorrect ? "bg-emerald-600 text-white" : "bg-slate-900/10 text-slate-800"}`}
                                >
                                  {String.fromCharCode(65 + oi)}
                                </div>

                                <div className="flex-1 text-slate-900 leading-relaxed">
                                  <RichText text={opt} />
                                </div>

                                {isCorrect && (
                                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                                    To‘g‘ri
                                  </span>
                                )}
                                {isUser && !isCorrect && (
                                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white">
                                    Siz tanladingiz
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* AI PANEL */}
                      <div className="mt-5 rounded-2xl bg-white/70 border border-white/60 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="font-extrabold text-slate-900">AI tushuntirish</div>
                            <div className="text-sm text-slate-600 mt-1">
                              Savolni 0 dan, bosqichma-bosqich yechib tushuntiradi.
                            </div>
                          </div>

                          <button
                            onClick={() => fetchExplainFor(item)}
                            className="px-4 py-2 rounded-xl text-white font-semibold
                            bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 transition"
                          >
                            {aiState.status === "loading" ? "Yuklanmoqda..." : "Tushuntirib ber"}
                          </button>
                        </div>

                        {aiState.status === "loading" && (
                          <div className="mt-4 text-sm text-slate-600">AI javobi tayyorlanmoqda...</div>
                        )}

                        {aiState.status === "error" && (
                          <div className="mt-4 text-rose-700 font-semibold">{aiState.text}</div>
                        )}

                        {aiState.status === "done" && (
                          <div className="mt-4 text-slate-900 leading-relaxed whitespace-pre-wrap">
                            <RichText text={aiState.text} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.details>
                );
              })}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 rounded-xl text-white font-semibold shadow-lg
              bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95 transition"
            >
              Qayta ishlash
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-xl border border-slate-300 font-semibold
              bg-white/70 hover:bg-white transition"
            >
              Bosh sahifa
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  // TEST UI
  const q = test.questions[current];

  return (
    <section className="w-full max-w-none mx-auto pt-40 px-4 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="text-blue-700 font-semibold hover:underline">
            ← Orqaga
          </button>

          <div className="text-right">
            <div className="text-sm text-gray-500">{test.type}</div>
            <div className="text-xl font-extrabold">{test.title}</div>
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white/55 backdrop-blur-xl border border-white/40 shadow">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="text-sm text-gray-600">
              Savol: <span className="font-semibold">{current + 1}</span> / {test.questions.length}
              <span className="mx-2">•</span>
              Javob berilgan: <span className="font-semibold">{answeredCount}</span>
            </div>

            <div
              className={`px-4 py-2 rounded-xl font-bold border
              ${timeLeft <= 60 ? "bg-red-100 border-red-300 text-red-700" : "bg-white/70 border-white/50 text-slate-900"}`}
              title="Vaqt"
            >
              {formatTime(timeLeft)}
            </div>
          </div>

          <ProgressBar value={answeredCount} max={test.questions.length} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="min-h-[72vh] rounded-3xl p-6 md:p-10 bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[48vh] overflow-y-auto pr-2 mb-6"
          >
            <div className="text-sm text-gray-500">
              Savol {current + 1} / {test.questions.length}
            </div>

            <div className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">
              <RichText text={q.question} />
            </div>
          </motion.div>

          <div className="grid gap-3">
            {q.options.map((opt, i) => {
              const selected = answers[current] === i;

              return (
                <button
                  key={i}
                  onClick={() => {
                    const next = [...answers];
                    next[current] = i;
                    setAnswers(next);
                  }}
                  className={`text-left w-full px-5 py-4 md:py-5 rounded-2xl border transition
                  text-lg md:text-xl whitespace-pre-wrap break-words leading-relaxed
                  ${selected ? "bg-green-200 border-green-400" : "bg-white/70 border-white/60 hover:bg-white"}`}
                >
                  <RichText text={opt} />
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-8">
            <button
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="px-7 py-3 rounded-2xl border border-white/50 bg-white/60 disabled:opacity-50"
            >
              Orqaga
            </button>

            {current === test.questions.length - 1 ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-7 py-3 rounded-2xl text-white font-semibold
                bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Testni yakunlash
              </button>
            ) : (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="px-7 py-3 rounded-2xl text-white font-semibold
                bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Keyingi
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-10">
            {test.questions.map((_, i) => {
              const done = answers[i] !== null;
              const active = i === current;

              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full font-bold transition border
                  ${active ? "scale-110 border-indigo-500" : "border-white/50"}
                  ${done ? "bg-green-500 text-white" : "bg-white/70 text-slate-800 hover:bg-white"}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative z-10 w-full max-w-md mx-4 bg-white/80 backdrop-blur-3xl border border-white/40 shadow-2xl rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-extrabold text-slate-900">Testni yakunlaysizmi?</h3>
            <p className="text-slate-600 mt-3">Yakunlasangiz natijalar hisoblanadi.</p>

            <div className="mt-8 flex gap-5 justify-center">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setFinished(true);
                }}
                className="px-6 py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 transition shadow-md"
              >
                HA
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 transition"
              >
                YO‘Q
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
