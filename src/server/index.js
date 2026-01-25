import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY topilmadi. server/.env ni tekshiring.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

function buildPrompt({ subjectName, question, options, userIndex, correctIndex }) {
  const userLabel = userIndex === null ? "Javob berilmagan" : String.fromCharCode(65 + userIndex);
  const correctLabel = String.fromCharCode(65 + correctIndex);

  return `
Siz Milliy Sertifikat test platformasi uchun o‘qituvchisiz.
Vazifa: quyidagi savolni 0 dan, juda sodda va tushunarli qilib yechib tushuntiring.
Shartlar:
- Izoh Uzbek tilida bo‘lsin.
- Qadam-baqadam yechim bering.
- Eng muhim formulasini/qoidasini qisqa ajrating.
- Matematika ifodalarini LaTeX ko‘rinishda $...$ bilan yozing (masalan: $\\sqrt{3}$, $\\frac{a}{b}$).
- Yakunda “Nega to‘g‘ri javob shu?” degan qisqa xulosa yozing.

Fan: ${subjectName}

Savol:
${question}

Variantlar:
${options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join("\n")}

Foydalanuvchi javobi: ${userLabel}
To‘g‘ri javob: ${correctLabel}
`;
}

app.post("/api/explain", async (req, res) => {
  try {
    const { subjectName, question, options, userIndex, correctIndex } = req.body || {};

    if (!question || !Array.isArray(options) || options.length < 2 || correctIndex === undefined) {
      return res.status(400).json({ error: "Noto‘g‘ri payload" });
    }

    const prompt = buildPrompt({ subjectName, question, options, userIndex, correctIndex });

    // Model nomlari o‘zgarishi mumkin, ammo docs’da generateContent oqimi shu tarzda beriladi.
    // Amaliyotda tez va arzon model tanlash tavsiya etiladi.
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const text = result?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";
    return res.json({ text });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "AI xatolik" });
  }
});

app.listen(8787, () => {
  console.log("AI proxy running: http://localhost:8787");
});
