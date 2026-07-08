<template>
  <div class="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#0a0a16] text-white font-sans px-4 py-8 select-none">
    <!-- Starfield Animated Background -->
    <Starfield class="absolute inset-0 z-0 pointer-events-none" />

    <!-- Top Spacer or minimal header -->
    <div class="w-full max-w-6xl flex justify-between items-center z-10">
      <img src="/logo.svg" alt="Cosmicrafts Logo" class="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity duration-300" />
      <div class="flex items-center space-x-2 text-xs text-slate-400 font-mono tracking-widest uppercase">
        <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>MVP STANDBY</span>
      </div>
    </div>

    <!-- Main Glassmorphism Card Container -->
    <div class="w-full max-w-xl my-auto z-10 transform transition-all duration-500">
      <div class="relative backdrop-blur-xl bg-slate-950/40 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(15,185,253,0.15)] flex flex-col items-center text-center">
        <!-- Floating Ambient Glows -->
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Section Title -->
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent uppercase animate-pulse mb-6">
          Working On It.
        </h1>

        <!-- The Statement (English) -->
        <p class="text-sm md:text-base text-slate-300 font-light leading-relaxed mb-6 text-justify">
          We are still in Web3. We have been compromised with seed investors, and there is no way out right now other than to shrink to a minimum viable project fully Web3 so we can launch the token and give them a real chance to make their money back.
        </p>

        <!-- The Statement (Spanish) -->
        <p class="text-xs md:text-sm text-slate-400 font-light italic leading-relaxed border-t border-white/5 pt-6 text-justify">
          Seguimos en Web3. Nos hemos visto comprometidos con inversores semilla y no hay otra salida en este momento más que reducirnos a un proyecto mínimo viable totalmente Web3 para poder lanzar el token y darles una oportunidad real de recuperar su inversión.
        </p>
      </div>
    </div>

    <!-- Bottom Socials Panel -->
    <div class="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center z-10 gap-4 mt-auto">
      <p class="text-xs text-slate-500 font-mono tracking-wide">
        &copy; 2026 COSMICRAFTS. ALL RIGHTS RESERVED.
      </p>
      
      <!-- Social links -->
      <div class="flex items-center space-x-4">
        <a href="https://x.com/cosmicrafts" target="_blank" class="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <img src="@/assets/icons/x.svg" alt="X/Twitter" class="w-5 h-5 opacity-80 hover:opacity-100" />
        </a>
        <a href="https://discord.com/invite/cosmicrafts-884272584491941888" target="_blank" class="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <img src="@/assets/icons/discord.svg" alt="Discord" class="w-5 h-5 opacity-80 hover:opacity-100" />
        </a>
        <a href="https://www.youtube.com/@cosmicrafts" target="_blank" class="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <img src="@/assets/icons/youtube.svg" alt="YouTube" class="w-5 h-5 opacity-80 hover:opacity-100" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import Starfield from '@/components/media/Starfield.vue';
</script>

<style scoped>
/* Glassmorphism effects and custom animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .7; }
}
.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
