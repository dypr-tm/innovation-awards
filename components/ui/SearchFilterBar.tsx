'use client';
import { useState } from 'react';

export default function SearchFilterBar({ onSearch }: { onSearch?: (val: string, cat: string) => void }) {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    if(onSearch) onSearch(term, category);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[12px] pegadaian-shadow border border-gray-100 items-center">
      <input 
        type="text" 
        placeholder="Cari inovasi (cth: Layanan Gadai Digital)..." 
        className="flex-grow px-6 py-4 rounded-[6px] bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow focus:bg-white transition-all w-full text-gray-800 placeholder-gray-400"
        value={term} onChange={(e) => setTerm(e.target.value)}
      />
      <select 
        className="w-full md:w-64 p-4 rounded-[6px] bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-700 cursor-pointer"
        value={category} onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Semua Kategori</option>
        <option value="teknologi">Teknologi</option>
        <option value="layanan">Layanan</option>
        <option value="proses-bisnis">Proses Bisnis</option>
      </select>
      <button 
        onClick={handleSearch}
        className="w-full md:w-auto px-8 py-4 bg-pegadaian-green hover:opacity-90 text-white font-semibold rounded-[6px] shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 whitespace-nowrap shrink-0"
      >
        Cari Ide
      </button>
    </div>
  );
}
