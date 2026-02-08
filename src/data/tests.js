import { msDekabrMath } from "./ms_dekabr_math";
import { msDekabrUzbek } from "./ms_dekabr_uzbek";

// Barcha testlar shu yerda ro‘yxatda turadi.
// Keyin yangi test qo‘shish: shu arrayga yana bitta item qo‘shasiz.
export const TESTS = [
  { subject: "math", id: 1, data: msDekabrMath },
  { subject: "uzbek", id: 1, data: msDekabrUzbek },
  // physics, history keyin qo‘shiladi
];

export function getTest(subject, id) {
  const found = TESTS.find(
    (t) => t.subject === String(subject) && String(t.id) === String(id)
  );
  return found?.data || null;
}

export function getTestsBySubject(subject) {
  return TESTS.filter((t) => t.subject === String(subject)).map((t) => t.data);
}

// UI uchun fanlar ro‘yxati (Test ishlash / O‘rganish uchun)
export const SUBJECTS = [
  {
    key: "math",
    title: "Matematika",
    desc: "Milliy sertifikat matematika testlari.",
    enabled: true,
  },
  {
    key: "physics",
    title: "Fizika",
    desc: "Tez orada qo‘shiladi.",
    enabled: false,
  },
  {
    key: "uzbek",
    title: "Ona tili",
    desc: "Milliy sertifikat ona tili testlari.",
    enabled: true,
  },
  {
    key: "history",
    title: "Tarix",
    desc: "Tez orada qo‘shiladi.",
    enabled: false,
  },
];
