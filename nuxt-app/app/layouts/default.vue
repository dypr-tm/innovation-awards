<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main>
      <slot />
    </main>
    <footer class="py-12 px-6 border-t border-gray-100 mt-24">
      <div class="container mx-auto text-center">
        <div class="text-[#003366] font-bold text-xl mb-4">Pegadaian Innovation Center</div>
        <p class="text-gray-400 text-sm">© 2026 PT Pegadaian. Seluruh Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  </div>
</template>
