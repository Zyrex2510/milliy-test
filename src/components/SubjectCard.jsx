import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "px-4 py-2 rounded-xl font-semibold transition";
  const active =
    "bg-white/80 border border-white/60 shadow-sm";
  const inactive =
    "text-slate-700 hover:bg-white/60";

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`transition-all duration-300 rounded-2xl border border-white/40
        ${scrolled ? "bg-white/70 backdrop-blur-xl shadow-xl px-6 py-3" : "bg-transparent px-2 py-2"}`}
      >
        <nav className="flex items-center gap-2">
          <div className="mr-2 font-extrabold text-slate-900">
            Milliy Sertifikat
          </div>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Bosh sahifa
          </NavLink>

          <NavLink
            to="/tests"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Test ishlash
          </NavLink>

          <NavLink
            to="/learn"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            O‘rganish
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
