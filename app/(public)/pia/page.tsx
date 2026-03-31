import { CheckCircle2, Zap, Settings, ShieldCheck } from "lucide-react";

export default function PIAPage() {
  return (
    <div className="pt-12 pb-24 bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-5xl text-center mb-20">
        <div className="inline-block px-5 py-2 bg-yellow-50 text-pegadaian-navy font-bold text-sm rounded-full mb-6 border border-yellow-200 shadow-sm">
          🏆 Penghargaan Bergengsi
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-pegadaian-navy tracking-tight leading-tight mb-6">
          Pegadaian Innovation Awards (PIA) 2026
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Ajang apresiasi tertinggi bagi para inovator Pegadaian yang bertujuan mendorong budaya perbaikan berkesinambungan.
        </p>
      </section>

      <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Kategori Penghargaan */}
        <div>
          <h2 className="text-3xl font-bold text-pegadaian-navy mb-8">Kategori Penghargaan</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pegadaian-navy mb-2">Teknologi</h3>
                <p className="text-gray-600">Inovasi berbasis IT, digitalisasi, atau otomatisasi yang meningkatkan efisiensi dan keamanan.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pegadaian-navy mb-2">Layanan & Produk</h3>
                <p className="text-gray-600">Terobosan yang langsung dirasakan oleh nasabah, meningkatkan kepuasan dan loyalitas.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shrink-0">
                <Settings size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pegadaian-navy mb-2">Proses Bisnis</h3>
                <p className="text-gray-600">Perbaikan alur kerja internal, efisiensi waktu, atau penurunan biaya operasional secara sistematis.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Pendaftaran */}
        <div className="bg-pegadaian-navy text-white rounded-3xl p-10 pegadaian-shadow relative">
          <h2 className="text-2xl font-bold mb-10 text-pegadaian-gold">Timeline Kegiatan</h2>
          
          <div className="relative pl-8 border-l-2 border-white/20 space-y-10">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-pegadaian-gold rounded-full border-4 border-pegadaian-navy shadow-lg" />
              <h3 className="text-xl font-bold mb-1">1. Pendaftaran & Submit Ide</h3>
              <p className="text-gray-300 text-sm">1 Mei - 30 Juni 2026</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white rounded-full border-4 border-pegadaian-navy shadow-lg" />
              <h3 className="text-xl font-bold mb-1">2. Seleksi Tahap Awal</h3>
              <p className="text-gray-300 text-sm">Juli 2026</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white rounded-full border-4 border-pegadaian-navy shadow-lg" />
              <h3 className="text-xl font-bold mb-1">3. Inkubasi & Pitching</h3>
              <p className="text-gray-300 text-sm">Agustus - September 2026</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white rounded-full border-4 border-pegadaian-navy shadow-lg" />
              <h3 className="text-xl font-bold mb-1">4. Malam Penganugerahan</h3>
              <p className="text-gray-300 text-sm">Bulan Inklusi Keuangan (Oktober 2026)</p>
            </div>
          </div>

          <a href="/pia/submit" className="block w-full text-center mt-12 py-4 bg-pegadaian-gold text-pegadaian-navy font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg">
            Daftar Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
