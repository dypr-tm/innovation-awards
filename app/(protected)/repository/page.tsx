import InnovationCard from '@/components/ui/InnovationCard';
import SearchFilterBar from '@/components/ui/SearchFilterBar';

export default function RepositoryPage() {
  const dummyInnovations = [
    { title: "Sistem Gadai Digital Cepat", category: "Layanan", team: "Digital Transform", summary: "Memungkinkan nasabah menggadaikan barang secara digital dengan appraisal AI." },
    { title: "Optimalisasi Rantai Pasok Emas", category: "Proses Bisnis", team: "Supply Chain", summary: "Sistem automasi untuk distribusi dan pencatatan pergerakan emas antar cabang." },
    { title: "Deteksi Fraud dengan GenAI", category: "Teknologi", team: "Risk Management", summary: "Penggunaan model GenAI untuk mendeteksi anomali pada transaksi harian secara real-time." },
    { title: "Layanan Jemput Bola Prioritas", category: "Layanan", team: "Customer Success", summary: "Layanan pick-up dan delivery barang gadai khusus nasabah prioritas." },
    { title: "Modul HR Cerdas", category: "Proses Bisnis", team: "Human Capital", summary: "Chatbot internal untuk melayani kebutuhan administratif karyawan secara otomatis." },
    { title: "Integrasi Pembayaran Blockchain", category: "Teknologi", team: "IT Infrastructure", summary: "Eksplorasi penggunaan blockchain untuk transparansi dan kecepatan settlement transaksi." }
  ];

  return (
    <div className="pt-12 pb-24 bg-gray-50/50 min-h-screen">
      <section className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-pegadaian-green mb-4 tracking-tight">Galeri Inovasi</h1>
          <p className="text-gray-600 text-lg">Eksplorasi ide-ide brilian dari seluruh penjuru Pegadaian.</p>
        </div>

        <div className="mb-10">
          <SearchFilterBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyInnovations.map((inv, idx) => (
            <InnovationCard
              key={idx}
              title={inv.title}
              category={inv.category}
              team={inv.team}
              summary={inv.summary}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white border border-gray-200 text-pegadaian-green font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Muat Lebih Banyak
          </button>
        </div>
      </section>
    </div>
  );
}
