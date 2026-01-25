import TestCard from "../components/TestCard";

export default function Math() {
  return (
    <section className="max-w-7xl mx-auto pt-40 px-8">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold">Matematika testlari</h2>
          <p className="text-gray-600 mt-2">
            Milliy sertifikat uchun tuzilgan bepul testlar.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <TestCard
          subject="math"
          id={1}
          title="MS Dekabr"
          type="Dekabr savollar"
          attempts={1248}
        />
      </div>
    </section>
  );
}
