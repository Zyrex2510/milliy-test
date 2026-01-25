import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300
      ${scrolled ? "backdrop-blur-xl bg-white/20 px-50 py-5 rounded-4xl shadow-lg" : "bg-transparent py-6"}`}
    >
      <nav className="flex gap-10 font-semibold">
        <Link to="/">Bosh sahifa</Link>
        <Link to="/math">Matematika</Link>
        <Link to="/physics">Fizika</Link>
        <Link to="/uzbek">Ona tili</Link>
        <Link to="/history">Tarix</Link>

      </nav>
    </header>
  );
}
