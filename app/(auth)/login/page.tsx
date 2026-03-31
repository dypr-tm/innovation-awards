export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl pegadaian-shadow p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-pegadaian-navy mb-2">Masuk Akun</h1>
          <p className="text-gray-500">Gunakan kredensial Pegadaian Anda</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Pegadaian</label>
            <input 
              type="email" 
              placeholder="nama.anda@pegadaian.co.id" 
              className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-gold transition-all text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-gold transition-all text-gray-800"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-pegadaian-gold border-gray-300 rounded focus:ring-pegadaian-gold" />
              <span className="text-sm text-gray-600">Ingat Saya</span>
            </label>
            <a href="#" className="text-sm font-semibold text-pegadaian-navy hover:text-pegadaian-gold transition-colors">Lupa sandi?</a>
          </div>

          <button 
            type="button"
            className="w-full py-4 mt-6 bg-pegadaian-navy hover:bg-pegadaian-dark text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
