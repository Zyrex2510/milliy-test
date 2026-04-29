export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-xl font-extrabold">Milliy Sertifikat</div>
          <p className="text-slate-400 mt-3 leading-relaxed">
            Online test ishlash platformasi: Milliy sertifikat (hozir),
            kelajakda Ona tili va Fizika bo‘limlari kengayadi.
          </p>
          <p className="text-slate-400 mt-4">bahodirovmuhammadamin3@gmail.com</p>
          <p className="text-slate-400 mt-4">burhonovamerozihon@gmail.com</p>
        </div>

        <div>
          <div className="font-extrabold mb-3">Bo‘limlar</div>
          <ul className="space-y-2 text-slate-400">
            <li>Matematika</li>
            <li>Fizika</li>
            <li>Ona tili</li>
            <li>Tarix</li>
          </ul>
        </div>

        <div>
          <div className="font-extrabold mb-3">Aloqa</div>
          <ul className="space-y-2 text-slate-400">
            <li>+998 33 123 21 13</li>
            <li>Telegram: @IT_ZYREX</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © 2026 Milliy Sertifikat Test Platformasi. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
