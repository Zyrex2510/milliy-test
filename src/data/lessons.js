export const lessonsBySubject = {
    math: [
      {
        id: 1,
        title: "1-dars: Kirish va asoslar",
        // YouTube linkni shu yerga qo‘yasiz (oddiy watch link ham bo‘ladi)
        youtube: "https://youtu.be/v50Q5_LvZXk?si=CEiQtIFEYjiLDqwZ",
        // Shu yerga hozircha uzunroq matn
        description: `
          Bu dars Milliy sertifikat matematika tayyorgarligi uchun kirish darsi hisoblanadi.
          
          Nimalarni o‘rganasiz:
          — Test formati qanday ishlaydi
          — Vaqtni boshqarish bo‘yicha asosiy taktika
          — Eng ko‘p uchraydigan xatolar va ularni oldini olish
          
          Tavsiya:
          Videoni ko‘rish jarayonida muhim joylarni yozib boring. Keyin “Test ishlash” bo‘limida shu mavzu bo‘yicha amaliy savollarni ishlang.
          
          Keyingi darsda: misollar bilan mustahkamlash va tezkor yechish usullari.
                `.trim(),
              },
            ],
          
            // keyin qo‘shamiz
            physics: [],
            uzbek: [],
            history: [],
          };
          
          // 4 ta fan ro‘yxati (o‘rganish uchun)
          export const learnSubjects = [
            { key: "math", title: "Matematika", desc: "Darslar va video izohlar", enabled: true },
            { key: "physics", title: "Fizika", desc: "Tez orada qo‘shiladi", enabled: false },
            { key: "uzbek", title: "Ona tili", desc: "Tez orada qo‘shiladi", enabled: false },
            { key: "history", title: "Tarix", desc: "Tez orada qo‘shiladi", enabled: false },
          ];
  