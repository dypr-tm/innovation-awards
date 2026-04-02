'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    { q: "Apa itu Pegadaian Innovation Center?", a: "Pusat inkubasi ide-ide kreatif untuk kemajuan Pegadaian." },
    { q: "Siapa saja yang bisa bergabung?", a: "Seluruh Insan Pegadaian yang memiliki ide brilian." },
    { q: "Bagaimana cara mengajukan ide?", a: "Anda dapat login menggunakan email Pegadaian Anda, lalu masuk ke menu PIA dan pilih 'Kirim Inovasimu Sekarang'." }
  ];

  const showcase = [
    { title: "Sistem Gadai Digital Cepat", desc: "Appraisal AI untuk barang elektronik", status: "Live" },
    { title: "Optimalisasi Rantai Pasok", desc: "Automasi distribusi emas", status: "Beta" },
    { title: "Deteksi Fraud GenAI", desc: "Model AI untuk keamanan transaksi harian", status: "Beta" },
    { title: "Modul HR Cerdas", desc: "Chatbot internal untuk karyawan", status: "Live" },
  ];

  return (
    <div className="w-full relative bg-gray-50/30 overflow-x-hidden">
      {/* 1. Hero Banner */}
      <section className="pt-20 pb-24 px-6 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-pegadaian-green tracking-tight leading-tight mb-6">
            Wujudkan Ide, <br className="hidden md:block" />
            <span className="text-pegadaian-yellow">Ciptakan Solusi Masa Depan.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Pegadaian Innovation Center adalah wadah inovasi dan kolaborasi untuk solusi nyata.
          </p>
          <a href="/repository" className="inline-block px-8 py-4 bg-pegadaian-green text-white font-bold rounded-[6px] shadow-xl hover:shadow-2xl hover:opacity-90 transition-all transform hover:-translate-y-1 active:scale-95 text-lg">
            Lihat Inovasi
          </a>
        </div>
      </section>

      {/* 2. Statistik Inovasi (Grid Layout) */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[12px] pegadaian-shadow text-center transform transition-transform hover:-translate-y-2">
            <div className="text-5xl font-extrabold text-pegadaian-green mb-4">50+</div>
            <div className="text-gray-500 font-semibold text-lg">Inovasi</div>
          </div>
          <div className="bg-white p-8 rounded-[12px] pegadaian-shadow text-center transform transition-transform hover:-translate-y-2">
            <div className="text-5xl font-extrabold text-pegadaian-yellow mb-4">120+</div>
            <div className="text-gray-500 font-semibold text-lg">Inovator</div>
          </div>
          <div className="bg-white p-8 rounded-[12px] pegadaian-shadow text-center transform transition-transform hover:-translate-y-2">
            <div className="text-5xl font-extrabold text-pegadaian-green mb-4">15+</div>
            <div className="text-gray-500 font-semibold text-lg">Proyek Nasional</div>
          </div>
        </div>
      </section>

      {/* 3. Showcase Inovasi (Horizontal Scroll / Carousel) */}
      <section className="mb-24 px-6 md:px-0">
        <div className="container mx-auto md:px-6 mb-8">
          <h2 className="text-3xl font-extrabold text-pegadaian-green">Showcase Inovasi Terbaik</h2>
          <p className="text-gray-500 mt-2">Geser untuk melihat lebih banyak inovasi yang sedang berjalan.</p>
        </div>
        
        <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-6 px-6 md:px-[calc(50vw-36rem)] min-w-max">
            {showcase.map((item, idx) => (
              <div key={idx} className="w-80 bg-white rounded-[12px] overflow-hidden pegadaian-shadow flex flex-col shrink-0 group hover:-translate-y-2 transition-transform cursor-pointer">
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 relative p-4 flex items-end">
                  <div className={`absolute top-4 left-4 px-4 py-2 text-xs font-bold rounded-full text-white shadow-sm ${item.status === 'Live' ? 'bg-pegadaian-green' : 'bg-pegadaian-yellow'}`}>
                    {item.status}
                  </div>
                  {/* Image Placeholder Symbol */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg className="w-16 h-16 text-pegadaian-green" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" opacity=".2"/><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 20V4h16l.002 16H4zm4-4.532l2.968 2.036L16 11.232 20 16.5V20H4v-5.595l4-2.937z"/></svg>
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-pegadaian-green mb-2 group-hover:text-pegadaian-yellow transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ Section (Accordion) */}
      <section className="container mx-auto px-6 mb-24 max-w-3xl">
        <h2 className="text-3xl font-extrabold text-pegadaian-green text-center mb-8">Tanya Jawab (FAQ)</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-[12px] border border-gray-100 pegadaian-shadow overflow-hidden">
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:bg-gray-50"
              >
                <span className="font-bold text-pegadaian-green pr-8">{faq.q}</span>
                <span className={`text-pegadaian-yellow transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}>
                  <MdKeyboardArrowDown size={28} />
                </span>
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600 border-t border-gray-50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
      
      {/* Hide Scrollbar style */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
