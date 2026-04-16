<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

interface Step {
  question: string
  answer: string
  aiResponse: string
  isLoading: boolean
}

const steps = ref<Step[]>([
  { 
    question: 'Kamu punya ide apa untuk Pegadaian?', 
    answer: '', 
    aiResponse: '', 
    isLoading: false 
  }
])

const canProceedToNext = computed(() => {
  const lastStep = steps.value[steps.value.length - 1]
  return lastStep.answer.trim() !== '' && lastStep.aiResponse !== '' && !lastStep.isLoading
})

const currentStepIndex = computed(() => steps.value.length - 1)

const submitAnswer = async (index: number) => {
  const step = steps.value[index]
  if (!step.answer) return

  step.isLoading = true
  
  try {
    // 1. Get AI Interaction
    // We pass the whole conversation to the evaluator
    const conversation = steps.value.flatMap(s => [
      { role: 'assistant', content: s.question },
      { role: 'user', content: s.answer }
    ])

    const res = await $fetch('/api/chat-evaluator', { 
      method: 'POST', 
      body: { messages: conversation } 
    })
    
    step.aiResponse = (res as any).content

    // 2. Save to Supabase (Optional/Background)
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
      console.error('Database save failed:', dbError)
    }

    // 3. Prepare Next Question
    if (index === 0) {
      steps.value.push({
        question: 'Siapa yang akan kamu bantu?',
        answer: '',
        aiResponse: '',
        isLoading: false
      })
    } else {
      // Logic for 3rd question and beyond (Implicit DFV)
      steps.value.push({
        question: 'Bagaimana ide ini akan memberdayakan target yang kamu sebutkan dan mengapa ini penting bagi Pegadaian?',
        answer: '',
        aiResponse: '',
        isLoading: false
      })
    }

  } catch (error) {
    step.aiResponse = 'Maaf, terjadi gangguan koneksi. Harap coba beberapa saat lagi.'
  } finally {
    step.isLoading = false
  }
}
</script>

<template>
  <div class="pt-28 pb-20 bg-[#F9FAFB] min-h-screen">
    <div class="container mx-auto px-6 max-w-7xl">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-black text-[#003366] mb-4">Mulai Perjalanan Inovasimu</h1>
        <p class="text-gray-500 max-w-2xl mx-auto">Kami akan membimbingmu langkah demi langkah untuk menyempurnakan ide hebatmu.</p>
      </div>

      <!-- Column Labels -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 px-4">
        <div class="text-center font-black text-[#003366] text-xl uppercase tracking-widest opacity-80">Pertanyaan</div>
        <div class="text-center font-black text-[#003366] text-xl uppercase tracking-widest opacity-80">Jawaban Inovator</div>
        <div class="text-center font-black text-[#003366] text-xl uppercase tracking-widest opacity-80">Respon Agent</div>
      </div>

      <!-- Interaction Area -->
      <div class="space-y-8">
        <div v-for="(step, index) in steps" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          <!-- Left: Question Card -->
          <div class="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-center text-center">
            <p class="text-gray-400 font-medium text-lg italic leading-relaxed">
              {{ step.question }}
            </p>
          </div>

          <!-- Middle: User Input/Answer Card -->
          <div class="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-4 relative">
            <textarea 
              v-model="step.answer"
              :disabled="index < steps.length - 1 || step.aiResponse !== ''"
              maxlength="500"
              class="w-full h-full min-h-[140px] bg-transparent border-none focus:ring-0 text-gray-700 font-bold placeholder:text-gray-300 resize-none p-2"
              placeholder="Tulis jawabanmu di sini..."
            ></textarea>
            
            <!-- Character Counter -->
            <div v-if="index === steps.length - 1 && !step.aiResponse" class="absolute bottom-20 right-8 text-[10px] font-black tracking-widest text-[#003366] opacity-30">
              <span :class="{ 'text-red-500 opacity-100': step.answer.length >= 450 }">
                {{ step.answer.length }}
              </span>
              / 500
            </div>
            
            <button 
              v-if="index === steps.length - 1 && !step.aiResponse && !step.isLoading"
              @click="submitAnswer(index)"
              :disabled="step.answer.length === 0"
              class="btn-primary w-full py-3 rounded-2xl shadow-lg hover:shadow-irish-green/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kirim Jawaban
            </button>
          </div>

          <!-- Right: AI Response Card -->
          <div class="p-6 rounded-[32px] flex flex-col justify-center transition-all duration-500" 
               :class="step.aiResponse ? 'bg-[#D1D5DB] shadow-inner' : 'bg-gray-50 border-2 border-dashed border-gray-200'">
            
            <div v-if="step.isLoading" class="flex flex-col items-center gap-3">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-irish-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div class="w-2 h-2 bg-irish-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div class="w-2 h-2 bg-irish-green rounded-full animate-bounce"></div>
              </div>
              <span class="text-[10px] font-bold text-irish-green uppercase tracking-widest">Agent Berpikir...</span>
            </div>

            <div v-else-if="step.aiResponse" class="text-gray-600 font-medium leading-relaxed">
              {{ step.aiResponse }}
            </div>

            <div v-else class="text-center">
              <span class="text-gray-300 text-sm italic">Menunggu respon kamu...</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.shadow-inner {
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
}
</style>
