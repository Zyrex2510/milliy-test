import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HeroIllustration() {
  // External rasm kerak emas — inline SVG (tez va xatosiz)
  return (
    <svg viewBox="0 0 640 420" className="w-full h-auto">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2563eb" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="640" height="420" rx="28" fill="url(#g1)" />
      <rect x="70" y="85" width="500" height="250" rx="22" fill="#fff" fillOpacity="0.75" />
      <rect x="100" y="120" width="220" height="18" rx="9" fill="#4f46e5" fillOpacity="0.85" />
      <rect x="100" y="155" width="320" height="12" rx="6" fill="#94a3b8" fillOpacity="0.8" />
      <rect x="100" y="180" width="280" height="12" rx="6" fill="#94a3b8" fillOpacity="0.65" />
      <rect x="100" y="220" width="160" height="44" rx="14" fill="#4f46e5" fillOpacity="0.92" />
      <rect x="280" y="220" width="120" height="44" rx="14" fill="#0f172a" fillOpacity="0.08" />

      <circle cx="468" cy="190" r="42" fill="#4f46e5" fillOpacity="0.12" />
      <circle cx="468" cy="190" r="26" fill="#4f46e5" fillOpacity="0.18" />
      <rect x="420" y="250" width="150" height="14" rx="7" fill="#94a3b8" fillOpacity="0.7" />
      <rect x="420" y="272" width="120" height="14" rx="7" fill="#94a3b8" fillOpacity="0.55" />

      <rect x="70" y="350" width="500" height="18" rx="9" fill="#0f172a" fillOpacity="0.05" />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
              Qulay, oson va samarali
              <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                tayyorgarlik
              </span>
            </h1>

            <p className="mt-4 text-slate-600 text-base md:text-lg max-w-xl">
              Attestatsiya, Milliy sertifikat va kelajakda boshqa fanlar bo‘yicha professional
              tayyorgarlik platformasi.
            </p>

            <div className="mt-7 flex gap-4">
              <button
                onClick={() => navigate("/math")}
                className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg
                bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Test ishlash
              </button>

              <button
                onClick={() => navigate("/math")}
                className="px-6 py-3 rounded-xl font-semibold
                bg-white/60 backdrop-blur border border-white/40 hover:bg-white/80 transition"
              >
                Bo‘limlarni ko‘rish
              </button>
            </div>

            {/* 3 mini features */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { t: "Tez va samarali", d: "Vaqtingizni tejang, tez yeching." },
                { t: "Professional", d: "Tayyorlangan materiallar va format." },
                { t: "Natijani kuzatish", d: "Progress va natijalarni ko‘ring." },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl bg-white/55 backdrop-blur border border-white/40 p-4"
                >
                  <div className="text-sm font-extrabold text-slate-900">{x.t}</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{x.d}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-white/55 backdrop-blur border border-white/40 shadow-2xl p-6"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </section>

      {/* YUTUQLAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Bizning yutuqlarimiz
          </h2>
          <p className="text-slate-600 mt-2">
            Minglab o‘quvchi va o‘qituvchilar biz bilan natijaga erishadi.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-5">
          {[
            { big: "0", small: "Ro‘yxatdan o‘tgan foydalanuvchilar" },
            { big: "0", small: "Test savollari bazasi" },
            { big: "0", small: "Muvaffaqiyat ko‘rsatkichi" },
            { big: "0", small: "Yillik tajriba" },
          ].map((x) => (
            <div
              key={x.big}
              className="rounded-2xl bg-indigo-50/70 border border-white/50 p-6 text-center"
            >
              <div className="text-3xl font-extrabold text-indigo-700">{x.big}</div>
              <div className="text-sm text-slate-600 mt-2">{x.small}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { t: "Milliy sertifikat fanlar", d: "Asosiy fanlar bo‘yicha testlar (bosqichma-bosqich kengayadi)" },
            { t: "24/7 ishlash", d: "Istalgan vaqtda test ishlash" },
            { t: "Sifat kafolati", d: "Tartibli, zamonaviy va qulay interfeys" },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl bg-white/55 backdrop-blur border border-white/40 p-6"
            >
              <div className="font-extrabold text-slate-900">{x.t}</div>
              <div className="text-slate-600 mt-2">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QANDAY FOYDALANISH */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-16 mb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Qanday foydalanish kerak?
            </h2>

            <div className="mt-8 space-y-5">
              {[
                {
                  n: "1",
                  t: "Bo‘limni tanlang",
                  d: "Matematika / Fizika / Ona tili bo‘limidan birini tanlang.",
                },
                {
                  n: "2",
                  t: "Testni boshlang",
                  d: "Test kartasidan “Boshlash” tugmasini bosing.",
                },
                {
                  n: "3",
                  t: "Natijani oling",
                  d: "Yakunida to‘g‘ri javoblar soni va darajangiz chiqadi.",
                },
              ].map((x) => (
                <div key={x.n} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center">
                    {x.n}
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">{x.t}</div>
                    <div className="text-slate-600 mt-1">{x.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-8 px-6 py-3 rounded-xl text-white font-semibold shadow-lg
              bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Hozir boshlash
            </button>

          </div>

          <div className="rounded-3xl bg-white/55 backdrop-blur border border-white/40 shadow-xl p-8 min-h-[260px] flex items-center justify-center text-slate-500">
            Demo video tez orada qo‘shiladi
          </div>
        </div>
      </section>
    </main>
  );
}
