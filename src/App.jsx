import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Math from "./pages/Math";
import Physics from "./pages/Physics";
import Uzbek from "./pages/Uzbek";
import Test from "./pages/Test";
import History from "./pages/History";

export default function App() {
  return (
    <>
      <Header />
      <div className="pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/math" element={<Math />} />
          <Route path="/physics" element={<Physics />} />
          <Route path="/uzbek" element={<Uzbek />} />
          <Route path="/history" element={<History />} />
          <Route path="/test/:subject/:id" element={<Test />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
