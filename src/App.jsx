import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import TestsHome from "./pages/TestsHome";
import SubjectTests from "./pages/SubjectTests";

import LearnHome from "./pages/LearnHome";
import SubjectLessons from "./pages/SubjectLessons";
import Lesson from "./pages/Lesson";



import Test from "./pages/Test";

export default function App() {
  return (
    <>
      <Header />
      <div className="pt-28">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* TESTS FLOW */}
          <Route path="/tests" element={<TestsHome />} />
          <Route path="/tests/:subject" element={<SubjectTests />} />
          <Route path="/test/:subject/:id" element={<Test />} />

          {/* LEARN FLOW */}
          <Route path="/learn" element={<LearnHome />} />
          <Route path="/learn/:subject" element={<SubjectLessons />} />
          <Route path="/learn/:subject/:lessonId" element={<Lesson />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
