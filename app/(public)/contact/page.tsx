import { MdLocationOn, MdEmail, MdMessage } from "react-icons/md";

export default function ContactPage() {
  return (
    <div className="pt-12 pb-24 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <section className="container mx-auto px-6 max-w-5xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pegadaian-green tracking-tight leading-tight mb-4">
          Mari Berkolaborasi!
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Punya pertanyaan lebih lanjut atau ingin mengeksplorasi potensi kerja sama? Tim kami siap mendengarkan.
        </p>
      </section>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Informasi Kontak (Cards) */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-2xl pegadaian-shadow border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <MdLocationOn size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Kantor Pusat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Jl. Kramat Raya No.162, Kenari, Senen, Jakarta Pusat 10430</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl pegadaian-shadow border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <MdEmail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                <a href="mailto:innovation@pegadaian.co.id" className="text-gray-600 text-sm hover:text-pegadaian-green hover:underline">innovation@pegadaian.co.id</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl pegadaian-shadow border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
                <MdMessage size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-gray-600 text-sm">+62 811 1500 569</p>
                <span className="text-xs text-green-500 font-medium mt-1 inline-block">Jam Kerja: 08:00 - 17:00</span>
              </div>
            </div>
          </div>

          {/* Formulir Kontak */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-8 rounded-3xl pegadaian-shadow border border-gray-100">
            <h2 className="text-2xl font-bold text-pegadaian-green mb-8">Kirim Pesan Langsung</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama Anda" 
                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                  <input 
                    type="email" 
                    placeholder="nama@pegadaian.co.id" 
                    className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tujuan (Kategori)</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800 appearance-none pr-10" defaultValue="">
                    <option value="" disabled>Pilih Tujuan...</option>
                    <option value="ide">Punya Ide Inovasi</option>
                    <option value="pertanyaan">Pertanyaan Umum</option>
                    <option value="kolaborasi">Potensi Kolaborasi</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan Anda</label>
                <textarea 
                  rows={5} 
                  placeholder="Tuliskan pesan, pertanyaan, atau ide Anda di sini..." 
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800 resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full py-4 bg-pegadaian-green hover:opacity-90 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
