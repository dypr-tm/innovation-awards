import { MdKeyboardArrowDown } from 'react-icons/md';

export default function SubmitPIAPage() {
  return (
    <div className="pt-12 pb-24 bg-gray-50/50 min-h-screen">
      <section className="container mx-auto px-6 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-pegadaian-green tracking-tight mb-4">
            Kirimkan Ide Inovasi Anda
          </h1>
          <p className="text-gray-600">
            Pastikan Anda mengisi detail dengan jelas agar AI kami dapat memberikan evaluasi awal yang akurat.
          </p>
        </div>

        <div className="bg-white rounded-[12px] pegadaian-shadow p-8 md:p-12">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Judul Inovasi</label>
                <input 
                  type="text" 
                  placeholder="Misal: Sistem Appraisal AI" 
                  className="w-full px-6 py-4 rounded-[6px] bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Kategori Inovasi</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 pr-12 rounded-[6px] bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800 appearance-none">
                    <option value="">Pilih Kategori</option>
                    <option value="teknologi">Teknologi</option>
                    <option value="layanan">Layanan & Produk</option>
                    <option value="proses">Proses Bisnis</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                    <MdKeyboardArrowDown size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Abstrak / Ringkasan Ide</label>
              <textarea 
                rows={4} 
                placeholder="Jelaskan secara singkat apa ide inovasi Anda, masalah yang diselesaikan, dan solusinya..." 
                className="w-full px-6 py-4 rounded-[6px] bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800 resize-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Dampak Bisnis (Business Value)</label>
              <textarea 
                rows={3} 
                placeholder="Jelaskan potensi keuntungan finansial atau efisiensi yang didapat..." 
                className="w-full px-6 py-4 rounded-[6px] bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800 resize-none"
              ></textarea>
            </div>

            <div className="border-t border-gray-100 pt-8 mt-8 flex justify-end gap-4">
              <button 
                type="button" 
                className="px-6 py-4 rounded-[6px] bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all text-sm"
              >
                Simpan Draft
              </button>
              <button 
                type="button" 
                className="px-8 py-4 rounded-[6px] bg-pegadaian-yellow text-pegadaian-green hover:opacity-90 font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
              >
                Kirim & Evaluasi AI ✨
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
