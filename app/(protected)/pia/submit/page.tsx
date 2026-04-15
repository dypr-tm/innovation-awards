"use client";

import { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const MAX_CHARS = 500;

type ChatTurn = {
  stage: number;
  question: string;
  answer: string;
  constructiveResponse: string;
};

// ─── PDF Generator ────────────────────────────────────────────
async function downloadPDF(turns: ChatTurn[]) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = margin;

  const addText = (text: string, opts?: { bold?: boolean; size?: number; color?: string; indent?: number }) => {
    const size = opts?.size ?? 11;
    const color = opts?.color ?? '#1a1a1a';
    doc.setFontSize(size);
    doc.setTextColor(color);
    if (opts?.bold) doc.setFont('helvetica', 'bold');
    else doc.setFont('helvetica', 'normal');

    const x = margin + (opts?.indent ?? 0);
    const lines = doc.splitTextToSize(text, contentW - (opts?.indent ?? 0));
    lines.forEach((line: string) => {
      if (y > 275) { doc.addPage(); y = margin; }
      doc.text(line, x, y);
      y += size * 0.45 + 1.5;
    });
    y += 2;
  };

  const addDivider = () => {
    if (y > 275) { doc.addPage(); y = margin; }
    doc.setDrawColor('#d1d5db');
    doc.line(margin, y, pageW - margin, y);
    y += 6;
  };

  // Header
  doc.setFillColor('#006633');
  doc.rect(0, 0, pageW, 28, 'F');
  doc.setTextColor('#ffffff');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('MAKALAH INOVASI', pageW / 2, 12, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PT Pegadaian — Pegadaian Innovation Center', pageW / 2, 20, { align: 'center' });
  y = 36;

  // Meta
  addText(`Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, { size: 9, color: '#6b7280' });
  addText(`Jumlah Tahap: ${turns.length} dari 12`, { size: 9, color: '#6b7280' });
  y += 4;
  addDivider();

  // Ringkasan Ide
  addText('RINGKASAN IDE INOVASI', { bold: true, size: 13, color: '#006633' });
  y += 2;
  if (turns[0]?.answer) {
    addText(turns[0].answer, { size: 11, indent: 4 });
  }
  y += 4;
  addDivider();

  // Detail per tahap
  addText('DETAIL EVALUASI PER TAHAP', { bold: true, size: 13, color: '#006633' });
  y += 2;

  turns.forEach((turn, i) => {
    if (y > 260) { doc.addPage(); y = margin; }

    addText(`Tahap ${i + 1}`, { bold: true, size: 12, color: '#1a4731' });
    addText('Pertanyaan:', { bold: true, size: 10, color: '#374151', indent: 4 });
    addText(turn.question, { size: 10, indent: 8, color: '#374151' });

    addText('Jawaban:', { bold: true, size: 10, color: '#374151', indent: 4 });
    addText(turn.answer || '-', { size: 10, indent: 8, color: '#1f2937' });

    if (turn.constructiveResponse) {
      addText('Catatan Agent:', { bold: true, size: 10, color: '#374151', indent: 4 });
      addText(turn.constructiveResponse, { size: 10, indent: 8, color: '#4b5563' });
    }

    y += 3;
    if (i < turns.length - 1) addDivider();
  });

  // Footer on each page
  const totalPages = (doc.internal as any).getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setTextColor('#9ca3af');
    doc.setFont('helvetica', 'normal');
    doc.text(`Dokumen dibuat oleh Pegadaian Innovation Center AI Evaluator • Halaman ${p} dari ${totalPages}`, pageW / 2, 292, { align: 'center' });
  }

  doc.save(`makalah-inovasi-pegadaian-${Date.now()}.pdf`);
}

// ─── Main Component ────────────────────────────────────────────
export default function SubmitAIPage() {
  const router = useRouter();

  const [turns, setTurns] = useState<ChatTurn[]>([
    {
      stage: 1,
      question: "Kamu punya ide/inovasi apa untuk PT Pegadaian?",
      answer: "",
      constructiveResponse: ""
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isLoading]);

  const charCount = currentInput.length;
  const charRemaining = MAX_CHARS - charCount;
  const isOverLimit = charCount > MAX_CHARS;

  const saveToSupabase = async (finalTurns: ChatTurn[]) => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('ai_evaluations').insert([{
        user_id: user?.id,
        session_id: Date.now().toString(),
        chat_history: finalTurns,
        status: 'completed'
      }]);
    } catch (e) {
      console.error("Failed saving to Supabase", e);
    }
  };

  const handleSend = async () => {
    if (!currentInput.trim() || isOverLimit) return;

    const currentStageIndex = turns.length - 1;
    const currentTurn = turns[currentStageIndex];
    if (currentTurn.answer !== "") return;

    setIsLoading(true);

    const updatedTurns = [...turns];
    updatedTurns[currentStageIndex].answer = currentInput;
    setTurns(updatedTurns);
    setCurrentInput('');

    const history = updatedTurns.flatMap(t => {
      const msgs: { role: string; content: string }[] = [];
      msgs.push({ role: 'ai', content: t.question });
      if (t.answer) msgs.push({ role: 'user', content: t.answer });
      return msgs;
    });

    try {
      const nextStage = currentTurn.stage + 1;

      const response = await fetch('/api/chat-evaluator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, stage: nextStage }),
      });

      const data = await response.json();

      if (data.success || data.isFinished) {
        const finalTurns = updatedTurns.map((t, i) =>
          i === currentStageIndex && data.constructiveResponse
            ? { ...t, constructiveResponse: data.constructiveResponse }
            : { ...t }
        );

        if (data.isFinished) {
          setIsFinished(true);
          setTurns([...finalTurns]);
          await saveToSupabase(finalTurns);
        } else {
          setTurns([
            ...finalTurns,
            {
              stage: nextStage,
              question: data.question,
              answer: "",
              constructiveResponse: ""
            }
          ]);
        }
      } else {
        alert("Error dari AI: " + data.error);
        // Rollback answer on error
        const rolledBack = updatedTurns.map((t, i) =>
          i === currentStageIndex ? { ...t, answer: "" } : t
        );
        setTurns(rolledBack);
        setCurrentInput(updatedTurns[currentStageIndex].answer);
      }
    } catch (error) {
      console.error(error);
      alert("Koneksi gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await downloadPDF(turns);
    } catch (e) {
      console.error(e);
      alert("Gagal membuat PDF. Silakan coba lagi.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleResubmit = () => {
    setTurns([{
      stage: 1,
      question: "Kamu punya ide/inovasi apa untuk PT Pegadaian?",
      answer: "",
      constructiveResponse: ""
    }]);
    setCurrentInput('');
    setIsFinished(false);
  };

  return (
    <div className="pt-10 pb-36 bg-gray-50/50 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header with Back Button aligned with Title */}
        <div className="mb-10 relative flex items-center justify-center min-h-[48px]">
          <button
            onClick={() => router.push('/pia')}
            className="absolute left-0 flex items-center gap-2 text-gray-500 hover:text-pegadaian-green font-medium transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline text-sm">Kembali</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-extrabold text-pegadaian-green tracking-tight">
            Submit Ide Kamu
          </h1>
        </div>

        {/* Full Width Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-center text-xs text-gray-400 mb-2 font-bold tracking-widest">
            {Math.round((turns.length / 12) * 100)}%
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
            <div
              className="h-full bg-pegadaian-green rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(turns.length / 12) * 100}%` }}
            />
          </div>
        </div>

        {/* Column Headers */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-4 px-4 font-bold text-gray-400 text-xs tracking-widest uppercase">
          <div className="text-center">Pertanyaan</div>
          <div className="text-center">Jawaban Anda</div>
          <div className="text-center">Masukan dari Agent</div>
        </div>

        {/* Turns */}
        <div className="space-y-6 mb-28">
          {turns.map((turn, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up">

              {/* Box 1: Pertanyaan */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-xs font-bold text-pegadaian-green mb-2 opacity-60 uppercase tracking-wider md:hidden">Pertanyaan</div>
                <div className="text-xs font-semibold text-pegadaian-green/60 mb-1">Tahap {turn.stage}</div>
                <div className="text-sm text-gray-800">{turn.question}</div>
              </div>

              {/* Box 2: Jawaban */}
              <div className={`rounded-xl p-5 border ${turn.answer ? "bg-white border-gray-200" : "bg-transparent border-dashed border-gray-300"}`}>
                <div className="text-xs font-bold text-pegadaian-yellow mb-2 uppercase tracking-wider md:hidden">Jawaban Anda</div>
                <div className="text-sm text-gray-800">
                  {turn.answer || (idx === turns.length - 1 && !isFinished ? (
                    <span className="text-gray-400 animate-pulse">Menunggu jawaban Anda...</span>
                  ) : <span className="text-gray-400">-</span>)}
                </div>
                {turn.answer && (
                  <div className="text-xs text-gray-400 mt-2">{turn.answer.length} karakter</div>
                )}
              </div>

              {/* Box 3: Masukan Agent */}
              <div className={`rounded-xl p-5 border ${turn.constructiveResponse ? "bg-teal-50 border-teal-200 text-gray-700" : "bg-gray-100/50 border-transparent text-gray-400"}`}>
                <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider md:hidden">Masukan dari Agent</div>
                <div className="text-sm">
                  {turn.constructiveResponse || (idx === turns.length - 1 && turn.answer && isLoading ? (
                    <span className="flex items-center gap-2 text-gray-500">
                      <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Menunggu respon evaluator...
                    </span>
                  ) : turn.answer ? <span className="text-gray-400">Menunggu respon evaluator...</span> : <span>-</span>)}
                </div>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* ─── Fixed Bottom: Input Area ─── */}
      {!isFinished ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value.slice(0, MAX_CHARS))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={isLoading}
                  placeholder="Ketik jawaban Anda di sini... (Shift+Enter untuk baris baru, max 500 karakter)"
                  className={`w-full px-5 py-3.5 rounded-xl bg-gray-50 border focus:outline-none focus:ring-2 transition-all text-gray-800 resize-none disabled:opacity-50 text-sm ${isOverLimit
                    ? 'border-red-400 focus:ring-red-300'
                    : charRemaining <= 50
                      ? 'border-yellow-400 focus:ring-yellow-300'
                      : 'border-gray-200 focus:ring-pegadaian-yellow'
                    }`}
                  rows={2}
                />
                {/* Character counter */}
                <div className={`absolute bottom-2 right-3 text-xs font-medium ${isOverLimit ? 'text-red-500' : charRemaining <= 50 ? 'text-yellow-500' : 'text-gray-400'
                  }`}>
                  {charCount}/{MAX_CHARS}
                </div>
              </div>

              <button
                onClick={handleSend}
                disabled={isLoading || !currentInput.trim() || isOverLimit}
                className="px-7 py-3.5 h-[56px] mb-[1px] rounded-xl bg-pegadaian-green text-white font-bold text-sm hover:bg-pegadaian-green/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mengirim...
                  </span>
                ) : 'Kirim'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ─── Finished Banner + Actions ─── */
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            <p className="text-center text-pegadaian-green font-bold text-base mb-3">
              🎉 Evaluasi selesai! Unduh makalah Anda di bawah ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-pegadaian-green text-white font-bold rounded-xl hover:bg-pegadaian-green/90 disabled:opacity-60 transition-all text-sm"
              >
                {isGeneratingPDF ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Membuat PDF...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Makalah (PDF)
                  </>
                )}
              </button>

              <button
                onClick={handleResubmit}
                className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-pegadaian-green text-pegadaian-green font-bold rounded-xl hover:bg-pegadaian-green/5 transition-all text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Re-Submit Baru
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
