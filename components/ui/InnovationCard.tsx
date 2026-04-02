'use client';
import { motion } from 'framer-motion';

export default function InnovationCard({ title = "Untitled", category = "Kategori", team = "Team", summary = "" }: any) {
  return (
    <motion.div 
      whileHover={{ y: -6, boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 pegadaian-shadow transition-all cursor-pointer flex flex-col h-full group"
    >
      <div className="p-2">
        <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
           <div className="absolute top-4 left-4 bg-pegadaian-yellow text-pegadaian-green text-[11px] uppercase tracking-wider font-bold px-4 py-2 rounded-full shadow-sm z-10">
             {category}
           </div>
           {/* Placeholder Icon */}
           <div className="w-16 h-16 rounded-full bg-white opacity-50 flex items-center justify-center">
             P
           </div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-pegadaian-green mb-2 line-clamp-2 group-hover:text-pegadaian-yellow transition-colors leading-tight">{title}</h3>
        <p className="text-xs text-gray-500 font-medium mb-4 flex items-center gap-2 uppercase tracking-wider">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
          {team}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {summary}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-50">
          <button className="text-pegadaian-green text-sm font-semibold flex items-center gap-2 group-hover:gap-4 transition-all group-hover:text-pegadaian-yellow">
            Pelajari Detail <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
