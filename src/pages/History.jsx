import { motion } from "framer-motion";

export default function History() {
  return (
    <section className="max-w-7xl mx-auto pt-40 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl p-16 text-center"
      >
        <div className="text-5xl mb-6">📜</div>

        <h2 className="text-4xl font-extrabold mb-4">
          Tarix testlari
        </h2>

        <p className="text-gray-600 text-lg">
          Bu bo‘lim hozir ishlab chiqilmoqda.
        </p>

        <div className="mt-6 text-indigo-600 font-bold text-xl">
          TEZ ORADA TESTLAR QO'SHILADI
        </div>
      </motion.div>
    </section>
  );
}
