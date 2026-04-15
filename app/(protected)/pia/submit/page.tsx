"use client";

import { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

type ChatTurn = {
  stage: number;
  question: string;
  answer: string;
  constructiveResponse: string;
};

export default function SubmitAIPage() {
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
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isLoading]);

  const saveToSupabase = async (finalTurns: ChatTurn[]) => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );
      const { data: { user } } = await supabase.auth.getUser();
      
      // Save it (even if user is null, it'll fail gracefully or RLS will catch it)
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
    if (!currentInput.trim()) return;

    const currentStageIndex = turns.length - 1;
    const currentTurn = turns[currentStageIndex];
    if (currentTurn.answer !== "") return; // Already answered

    setIsLoading(true);

    // 1. Update the answer locally
    const updatedTurns = [...turns];
    updatedTurns[currentStageIndex].answer = currentInput;
    setTurns(updatedTurns);
    setCurrentInput('');

    // Prepare API request
    const history = updatedTurns.flatMap(t => {
      const msgs = [];
      msgs.push({ role: 'ai', content: t.question });
      if (t.answer) {
        msgs.push({ role: 'user', content: t.answer });
      }
      return msgs;
    });

    try {
      const nextStage = currentTurn.stage + 1;
      
      const response = await fetch('/api/chat-evaluator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          history, 
          stage: nextStage 
        }),
      });

      const data = await response.json();

      if (data.success || data.isFinished) {
        // Apply constructive response to CURRENT turn
        if (data.constructiveResponse) {
          updatedTurns[currentStageIndex].constructiveResponse = data.constructiveResponse;
        }

        if (data.isFinished) {
          // It's stage 13, finish the loop
          setIsFinished(true);
          setTurns([...updatedTurns]); // Just save current with constructive
          await saveToSupabase(updatedTurns);
        } else {
          // Push next question
          setTurns([
            ...updatedTurns,
            {
              stage: nextStage,
              question: data.question,
              answer: "",
              constructiveResponse: ""
            }
          ]);
        }
      } else {
        alert("Error from AI: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-12 pb-32 bg-gray-50/50 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-pegadaian-green tracking-tight mb-4">
            AI Evaluator Inovasi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jawab pertanyaan secara bertahap untuk membedah potensi ide Anda.
            Evaluator ini memproses 12 tahap 5W1H dan analisis DFV (Desirability, Feasibility, Viability).
          </p>
        </div>

        {/* Desktop Header Row (Hidden on mobile) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 px-4 font-bold text-gray-400 text-sm tracking-wider uppercase">
          <div className="text-center">Pertanyaan</div>
          <div className="text-center">Jawaban</div>
          <div className="text-center">Masukan dari Agent</div>
        </div>

        <div className="space-y-8 mb-24">
          {turns.map((turn, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
              {/* Box 1: Pertanyaan */}
              <div className="bg-white border border-gray-200 rounded-[12px] p-6 text-gray-800">
                <div className="text-xs font-bold text-pegadaian-green mb-2 opacity-50 md:hidden">PERTANYAAN</div>
                <div className="text-sm md:text-base">{turn.question}</div>
              </div>

              {/* Box 2: Jawaban Inovator */}
              <div className={\`border rounded-[12px] p-6 \${turn.answer ? "bg-white border-gray-200 text-gray-800" : "bg-transparent border-dashed border-gray-300 text-gray-400"}\`}>
                <div className="text-xs font-bold text-pegadaian-yellow mb-2 opacity-80 md:hidden">JAWABAN</div>
                <div className="text-sm md:text-base">
                  {turn.answer || (idx === turns.length - 1 && !isFinished ? (
                    <span className="animate-pulse">Menunggu jawaban Anda...</span>
                  ) : "-")}
                </div>
              </div>

              {/* Box 3: Respon Konstruktif */}
              <div className={\`rounded-[12px] p-6 \${turn.constructiveResponse ? "bg-gray-200 border border-gray-300 text-gray-700" : "bg-gray-100/50 border border-transparent text-gray-400"}\`}>
                <div className="text-xs font-bold text-gray-500 mb-2 opacity-80 md:hidden">MASUKAN DARI AGENT</div>
                <div className="text-sm md:text-base">
                  {turn.constructiveResponse || (idx === turns.length - 1 && turn.answer && isLoading ? (
                    <span className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Menganalisis...
                    </span>
                  ) : turn.answer ? "Menunggu respon evaluator..." : "-")}
                </div>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area Fixed at Bottom */}
        {!isFinished ? (
          <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-50">
            <div className="container mx-auto max-w-4xl flex gap-4 items-end">
               <textarea
                 value={currentInput}
                 onChange={(e) => setCurrentInput(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSend();
                   }
                 }}
                 disabled={isLoading}
                 placeholder="Ketik jawaban Anda di sini... (Shift + Enter untuk baris baru)"
                 className="flex-1 w-full px-6 py-4 rounded-[12px] bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pegadaian-yellow transition-all text-gray-800 resize-none disabled:opacity-50"
                 rows={2}
               />
               <button
                 onClick={handleSend}
                 disabled={isLoading || !currentInput.trim()}
                 className="px-8 py-4 h-[58px] mb-[2px] rounded-[10px] bg-pegadaian-green text-white font-bold hover:bg-pegadaian-green/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
               >
                 {isLoading ? 'Mengirim...' : 'Kirim'}
               </button>
            </div>
          </div>
        ) : (
          <div className="fixed bottom-0 left-0 right-0 bg-pegadaian-green text-white text-center p-6 z-50 font-bold border-t border-pegadaian-green">
             🎉 Terima kasih telah men-submit ide inovasi Anda. Sesi evaluasi telah selesai.
          </div>
        )}
      </div>
    </div>
  );
}
