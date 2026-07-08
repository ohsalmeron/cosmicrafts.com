<template>
  <div class="fixed inset-0 h-screen w-screen overflow-hidden bg-[#05050f] text-white font-sans flex flex-col justify-between p-6 md:p-10 select-none">
    <!-- Starfield Animated Background -->
    <Starfield class="absolute inset-0 z-0 pointer-events-none" />

    <!-- Ambient glow orbs in background -->
    <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

    <!-- Header -->
    <header class="w-full max-w-7xl mx-auto flex justify-between items-center z-10">
      <img src="/logo.svg" alt="Cosmicrafts Logo" class="h-8 md:h-10 opacity-90" />
      <div class="flex items-center space-x-2 text-[10px] md:text-xs text-cyan-400 font-mono tracking-widest uppercase bg-cyan-950/20 border border-cyan-500/20 px-3 py-1.5 rounded-full">
        <span class="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>MVP STANDBY</span>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="w-full max-w-7xl mx-auto flex-1 flex items-center justify-between z-10 gap-10">
      <!-- Left: Text/Glassmorphic Card -->
      <div class="w-full lg:max-w-xl flex flex-col justify-center">
        <div class="backdrop-blur-md bg-slate-950/30 border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(15,185,253,0.1)] relative overflow-hidden">
          <!-- Card corner accents -->
          <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl"></div>
          <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr"></div>
          <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br"></div>

          <!-- Title -->
          <h1 class="text-3xl md:text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent uppercase mb-6 animate-pulse-slow">
            Working On It.
          </h1>

          <!-- English Statement -->
          <p class="text-sm md:text-base text-slate-300 font-light leading-relaxed mb-6 text-justify">
            We are still in Web3. We have been compromised with seed investors, and there is no way out right now other than to shrink to a minimum viable project fully Web3 so we can launch the token and give them a real chance to make their money back.
          </p>

          <!-- Spanish Statement -->
          <p class="text-xs md:text-sm text-slate-400 font-light italic leading-relaxed border-t border-white/10 pt-6 text-justify">
            Seguimos en Web3. Nos hemos visto comprometidos con inversores semilla y no hay otra salida en este momento más que reducirnos a un proyecto mínimo viable totalmente Web3 para poder lanzar el token y darles una oportunidad real de recuperar su inversión.
          </p>
        </div>
      </div>

      <!-- Right: Floating Spaceship & Planet (Desktop Only) -->
      <div class="hidden lg:flex flex-1 justify-center items-center relative h-full min-h-[400px]">
        <!-- Ambient Orbit Ring -->
        <div class="absolute w-[350px] h-[350px] border border-white/5 rounded-full rotate-12 pointer-events-none"></div>
        <div class="absolute w-[450px] h-[450px] border border-dashed border-cyan-500/5 rounded-full -rotate-12 pointer-events-none"></div>

        <!-- Planet Background -->
        <img 
          src="@/assets/webp/map/planet.webp" 
          alt="Planet" 
          class="absolute w-48 h-48 opacity-40 blur-[1px] -top-10 -right-10 animate-spin-slow pointer-events-none"
        />

        <!-- Main Spaceship -->
        <img 
          src="@/assets/webp/ships/starter-ship.webp" 
          alt="Starter Ship" 
          class="w-[380px] h-auto drop-shadow-[0_10px_30px_rgba(15,185,253,0.3)] animate-float pointer-events-none z-10"
        />
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center z-10 gap-4">
      <p class="text-[10px] md:text-xs text-slate-500 font-mono tracking-wider">
        &copy; 2026 COSMICRAFTS. ALL RIGHTS RESERVED.
      </p>
      
      <!-- Social links -->
      <div class="flex items-center space-x-3">
        <a href="https://x.com/cosmicrafts" target="_blank" class="p-2 md:p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300">
          <img src="@/assets/icons/x.svg" alt="X/Twitter" class="w-4 h-4 md:w-5 md:h-5 opacity-80" />
        </a>
        <a href="https://discord.com/invite/cosmicrafts-884272584491941888" target="_blank" class="p-2 md:p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300">
          <img src="@/assets/icons/discord.svg" alt="Discord" class="w-4 h-4 md:w-5 md:h-5 opacity-80" />
        </a>
        <a href="https://www.youtube.com/@cosmicrafts" target="_blank" class="p-2 md:p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300">
          <img src="@/assets/icons/youtube.svg" alt="YouTube" class="w-4 h-4 md:w-5 md:h-5 opacity-80" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Starfield from '@/components/media/Starfield.vue';
</script>

<style scoped>
/* Disable scrolling completely */
:global(body) {
  overflow: hidden !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Custom smooth float animation for spaceship */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-15px) rotate(2deg) scale(1.02);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Slow rotate for background planet */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 120s linear infinite;
}

/* Slow elegant pulse for title */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.2));
  }
  50% {
    opacity: 0.8;
    filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.4));
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>
