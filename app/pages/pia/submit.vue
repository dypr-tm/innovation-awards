<script setup lang="ts">
import { jsPDF } from 'jspdf'
const title = ref('')
const description = ref('')
const messages = ref([{ role: 'assistant', content: 'Halo! Ceritakan ide inovasimu...' }])
const isEvaluating = ref(false)

const handleSend = async () => {
  if (!description.value) return
  messages.value.push({ role: 'user', content: description.value })
  isEvaluating.value = true
  try {
    const res = await $fetch('/api/chat-evaluator', { method: 'POST', body: { messages: messages.value } })
    messages.value.push({ role: 'assistant', content: res.content })
  } catch (e) {
    messages.value.push({ role: 'assistant', content: 'Terjadi kesalahan sistem.' })
  }
  isEvaluating.value = false
}

const generatePDF = () => {
  const doc = new jsPDF()
  doc.text(`Inovasi: ${title.value}`, 10, 10)
  doc.text(`Deskripsi: ${description.value}`, 10, 20)
  doc.save('inovasi.pdf')
}
</script>

<template>
  <div class="pt-24 pb-12 px-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
      <h1 class="text-3xl font-bold text-[#003366] mb-8">Kirim Inovasimu</h1>
      <input v-model="title" class="w-full p-4 mb-4 border rounded-xl" placeholder="Judul Inovasi" />
      <div class="h-96 overflow-y-auto mb-4 border p-4 rounded-xl space-y-4">
        <div v-for="m in messages" :class="m.role === 'user' ? 'text-right' : 'text-left'">
          <span :class="m.role === 'user' ? 'bg-[#003366] text-white' : 'bg-gray-100 text-gray-800'" class="inline-block p-3 rounded-2xl max-w-[80%]">
            {{ m.content }}
          </span>
        </div>
      </div>
      <div class="flex gap-2">
        <input v-model="description" @keyup.enter="handleSend" class="flex-grow p-4 border rounded-xl" placeholder="Ketik ide..." />
        <button @click="handleSend" class="bg-[#003366] text-white px-6 rounded-xl font-bold">Kirim</button>
      </div>
      <button @click="generatePDF" class="mt-8 w-full py-4 bg-green-600 text-white rounded-xl font-bold">Download Draft PDF</button>
    </div>
  </div>
</template>
