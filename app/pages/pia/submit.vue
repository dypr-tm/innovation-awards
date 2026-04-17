<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

// Load jsPDF from CDN for instant PDF generation
useHead({
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js' }
  ]
})

interface Step {
  question: string
  answer: string
  aiResponse: string
  isLoading: boolean
}

// 9-step guiding questions starting with a custom greeting
const QUESTION_SEQUENCE = [
  'Semangat Pagi Insan Pegadaian! Inovasi atau ide strategis apa yang ingin Anda ajukan untuk memperkuat lini bisnis kita hari ini?', // Q1: Opening
  'Siapa target pengguna utama inovasi ini? Jelaskan satu segmen spesifik beserta karakteristik dan kebutuhan mereka yang belum terpenuhi.', // Q2: Profil Target
  'Jelaskan secara konkret kesulitan yang dialami target pengguna saat ini. Mengapa permasalahan ini mendesak untuk diselesaikan dalam waktu dekat?', // Q3: Masalah & Urgensi
  'Identifikasi risiko teknis/operasional bagi nasabah. Bagaimana langkah mitigasi dan mekanisme penanganan keluhan yang Anda siapkan?', // Q4: Risiko & Keamanan
  'Jelaskan solusi Anda secara ringkas. Apa keunggulan utamanya dibanding kompetitor dan aspek apa yang mencerminkan kapabilitas unik Pegadaian?', // Q5: Nilai & Diferensiasi
  'Uraikan tahapan penggunaan solusi dari sisi nasabah. Berapa estimasi waktu yang dibutuhkan dan apa konfirmasi output yang akan mereka terima?', // Q6: Alur Pengalaman
  'Unit kerja mana yang perlu dilibatkan? Sebutkan ketergantungan pihak eksternal jika ada, serta tiga langkah awal eksekusi proyek Anda.', // Q7: Sumber Daya
  'Sebutkan target kuantitatif dan kualitatif dalam 6 bulan pertama. Metode pengukuran apa yang akan digunakan untuk memantau keberhasilannya?', // Q8: Indikator Keberhasilan
  'Terakhir, rangkum dalam satu kalimat penutup: Mengapa inovasi ini sangat layak untuk dikembangkan dan segera diimplementasikan?' // Q9: Kesimpulan Eksekutif
]

const steps = ref<Step[]>([
  { 
    question: QUESTION_SEQUENCE[0], 
    answer: '', 
    aiResponse: '', 
    isLoading: false 
  }
])

const isFinished = computed(() => {
  return steps.value.length === QUESTION_SEQUENCE.length && steps.value[steps.value.length - 1].aiResponse !== ''
})

const autoResize = (event: Event) => {
  const el = event.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

const submitAnswer = async (index: number) => {
  const step = steps.value[index]
  if (!step.answer) return

  step.isLoading = true
  
  try {
    const conversation = steps.value.flatMap(s => [
      { role: 'assistant', content: s.question },
      { role: 'user', content: s.answer }
    ])

    const res = await $fetch('/api/chat-evaluator', { 
      method: 'POST', 
      body: { messages: conversation } 
    })
    
    step.aiResponse = (res as any).content

    // Save progress to Supabase
    try {
      if (user.value) {
        await supabase.from('innovation_steps').insert({
          user_id: user.value.id,
          question: step.question,
          user_answer: step.answer,
          ai_response: step.aiResponse,
          step_number: index + 1
        })
      }
    } catch (dbError) {
      console.error('Database save error:', dbError)
    }

    // Add next question if available
    if (index < QUESTION_SEQUENCE.length - 1) {
      steps.value.push({
        question: QUESTION_SEQUENCE[index + 1],
        answer: '',
        aiResponse: '',
        isLoading: false
      })
    }

  } catch (error) {
    step.aiResponse = 'Maaf, terjadi gangguan server. Harap coba lagi.'
  } finally {
    step.isLoading = false
  }
}

const downloadProposalPDF = () => {
  // @ts-ignore
  const { jsPDF } = window.jspdf
  const doc = new jsPDF()
  
  // Header
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(0, 51, 102) // Pegadaian Blue
  doc.text('DRAFT PROPOSAL INOVASI', 105, 20, { align: 'center' })
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 28, { align: 'center' })
  
  doc.line(20, 35, 190, 35)
  
  let yPos = 45
  const margin = 20
  const pageWidth = 210
  const maxWidth = pageWidth - (margin * 2)

  steps.value.forEach((s, i) => {
    // Check page overflow
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    // Question
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(0, 51, 102)
    const qLines = doc.splitTextToSize(`${i + 1}. ${s.question}`, maxWidth)
    doc.text(qLines, margin, yPos)
    yPos += (qLines.length * 5) + 2

    // Answer
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(50)
    const aLines = doc.splitTextToSize(`Jawaban: ${s.answer}`, maxWidth - 10)
    doc.text(aLines, margin + 5, yPos)
    yPos += (aLines.length * 5) + 5

    // AI Insight (Optional inclusion)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(120)
    const aiLines = doc.splitTextToSize(`Analisis Agent: ${s.aiResponse}`, maxWidth - 10)
    doc.text(aiLines, margin + 5, yPos)
    yPos += (aiLines.length * 5) + 10
  })

  doc.save(`Proposal_Inovasi_${new Date().getTime()}.pdf`)
}
</script>

<template>
  <div class="pt-28 pb-32 bg-[#F9FAFB] min-h-screen font-nunito">
    <div class="container mx-auto px-6 max-w-7xl">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-black text-[#003366] mb-4">Innovation Ideation Builder</h1>
        <p class="text-gray-500 max-w-2xl mx-auto font-bold">Selesaikan 9 langkah pemandu berikut untuk memvalidasi ide inovasimu secara profesional.</p>
      </div>

      <!-- Column Labels -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 px-4">
        <div class="text-left font-black text-[#003366] text-xl uppercase tracking-widest opacity-80">Pertanyaan</div>
        <div class="text-left font-black text-[#003366] text-xl uppercase tracking-widest opacity-80">Jawaban Inovator</div>
        <div class="text-left font-black text-[#003366] text-xl uppercase tracking-widest opacity-80">Respon Agent</div>
      </div>

      <!-- Interaction Area -->
      <div class="space-y-8">
        <div v-for="(step, index) in steps" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start animate-fade-in">
          
          <!-- Left: Question Card -->
          <div class="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm flex items-start text-left">
            <p class="text-gray-500 font-bold text-[16px] leading-relaxed">
              {{ step.question }}
            </p>
          </div>

          <!-- Middle: User Input/Answer Card -->
          <div class="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-4 relative">
            <textarea 
              v-model="step.answer"
              :disabled="index < steps.length - 1 || step.aiResponse !== ''"
              maxlength="1000"
              @input="autoResize"
              rows="1"
              class="w-full bg-transparent border-none focus:ring-0 text-gray-700 font-bold placeholder:text-gray-300 resize-none overflow-hidden"
              placeholder="Tulis jawabanmu di sini..."
            ></textarea>
            
            <div v-if="index === steps.length - 1 && !step.aiResponse" class="flex justify-between items-center mt-2">
              <div class="text-[10px] font-black tracking-widest text-[#003366] opacity-30">
                <span :class="{ 'text-red-500 opacity-100': step.answer.length >= 900 }">
                  {{ step.answer.length }}
                </span>
                / 1000
              </div>
              
              <button 
                v-if="!step.isLoading"
                @click="submitAnswer(index)"
                :disabled="step.answer.trim().length === 0"
                class="btn-primary px-6 py-2 rounded-xl text-sm shadow-md hover:shadow-irish-green/20 disabled:opacity-50 disabled:cursor-not-allowed font-black"
              >
                Kirim
              </button>
            </div>
          </div>

          <!-- Right: AI Response Card -->
          <div class="p-4 rounded-[24px] flex flex-col justify-start transition-all duration-500" 
               :class="step.aiResponse ? 'bg-[#D1D5DB] shadow-inner' : 'bg-gray-50 border-2 border-dashed border-gray-200'">
            
            <div v-if="step.isLoading" class="flex flex-col items-center gap-3">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-irish-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div class="w-2 h-2 bg-irish-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div class="w-2 h-2 bg-irish-green rounded-full animate-bounce"></div>
              </div>
              <span class="text-[10px] font-bold text-irish-green uppercase tracking-widest">Agent Berpikir...</span>
            </div>

            <div v-else-if="step.aiResponse" class="text-gray-700 font-bold leading-relaxed whitespace-pre-wrap">
              {{ step.aiResponse }}
            </div>

            <div v-else class="text-left font-black opacity-30">
              <span class="text-gray-400 text-xs italic">Menunggu respon...</span>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="isFinished" class="mt-12 bg-white p-12 rounded-[48px] text-center border border-gray-100 shadow-xl animate-fade-in-up">
           <div class="w-20 h-20 bg-irish-green rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl shadow-lg font-nunito">✓</div>
           <h2 class="text-3xl font-black text-[#003366] mb-4">Draft Proposal Selesai!</h2>
           <p class="text-gray-500 mb-8 max-w-lg mx-auto font-bold">Selamat, ide kamu telah tervalidasi oleh sistem. Kamu bisa mengunduh ringkasan atau melanjutkan ke dashboard.</p>
           <div class="flex gap-4 justify-center">
             <button @click="downloadProposalPDF" class="px-8 py-3 bg-[#E5E7EB] text-[#003366] font-bold rounded-2xl hover:bg-gray-200 transition-colors">Unduh Proposal (PDF)</button>
             <button @click="navigateTo('/pia')" class="px-8 py-3 bg-[#003366] text-white font-bold rounded-2xl hover:bg-[#002244] transition-colors">Kembali ke Portal</button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&display=swap');

.font-nunito {
  font-family: 'Nunito Sans', sans-serif;
}

.shadow-inner {
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>




