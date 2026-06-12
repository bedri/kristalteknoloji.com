<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <article 
    class="project-card grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 bg-white/60 dark:bg-slate-900/30 border border-slate-800/8 dark:border-slate-200/10 backdrop-blur-md rounded-[32px] p-6 md:p-12 items-center transition-all duration-300 hover:border-[#00bed6] hover:shadow-[0_15px_45px_rgba(0,190,214,0.12)] reveal"
  >
    <!-- Alternate layouts: info order -->
    <div 
      class="project-info flex flex-col items-start"
      :class="{ 'md:order-1': index % 2 === 0, 'md:order-2': index % 2 !== 0 }"
    >
      <div class="project-category text-xs font-bold uppercase tracking-wider text-[#00bed6] mb-3">
        {{ project.category }}
      </div>
      <h3 class="text-2xl md:text-3xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-4">
        {{ project.title }}
      </h3>
      <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
        {{ project.text }}
      </p>
      
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
        <li 
          v-for="feature in project.features" 
          :key="feature"
          class="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-3"
        >
          <span class="text-[#00bed6]">✦</span>
          {{ feature }}
        </li>
      </ul>
      
      <div class="project-links flex flex-wrap gap-4">
        <a 
          v-for="link in project.links" 
          :key="link.href"
          :href="link.href"
          :target="link.target ? '_blank' : '_self'"
          class="project-btn inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full border border-slate-800/10 dark:border-slate-200/10 bg-slate-800/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-[#00bed6]/10 hover:border-[#00bed6] hover:text-[#00bed6] hover:-translate-y-[1px] transition-all duration-200 min-h-[40px]"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
    
    <!-- Visual block -->
    <div 
      class="project-visual w-full aspect-[1.3] flex items-center justify-center"
      :class="{ 'md:order-2': index % 2 === 0, 'md:order-1': index % 2 !== 0 }"
    >
      <div class="project-visual-box w-full h-full bg-white/[0.01] border border-dashed border-slate-800/10 dark:border-slate-200/10 rounded-3xl relative overflow-hidden flex items-center justify-center">
        <!-- KristaTech Visual -->
        <template v-if="project.id === 'kristatech'">
          <div class="kristatech-box absolute inset-0 bg-gradient-to-br from-[#00bed6]/5 to-transparent flex items-center justify-center">
            <div class="crypto-node-sphere w-[60px] h-[60px] rounded-full bg-gradient-to-br from-white via-[#00bed6] to-[#080d16] shadow-[0_0_30px_rgba(0,190,214,0.5)] z-10 animate-pulse-node"></div>
            <div class="crypto-node-ring absolute w-[140px] h-[140px] border-[1.5px] border-[#00bed6]/30 rounded-full z-0 transform rotate-x-[65deg] rotate-y-[20deg] animate-rotate-ring"></div>
          </div>
        </template>
        
        <!-- Block Explorer Visual -->
        <template v-else-if="project.id === 'explorer'">
          <div class="explorer-box absolute inset-0 bg-gradient-to-br from-[#00bed6]/5 to-transparent flex items-center justify-center gap-4">
            <div class="block-box w-12 h-12 rounded-xl border border-[#00bed6]/30 bg-white/5 dark:bg-slate-800/40 flex items-center justify-center animate-explorer-block-1">
              <span class="text-[10px] font-bold text-slate-400">#98</span>
            </div>
            <div class="block-connector w-8 h-[2px] bg-gradient-to-r from-[#00bed6]/20 to-[#00bed6]/80 animate-pulse"></div>
            <div class="block-box w-14 h-14 rounded-xl border border-[#00bed6] bg-white/10 dark:bg-slate-800/80 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,190,214,0.25)] animate-explorer-block-2">
              <span class="text-[8px] font-bold text-[#00bed6] uppercase">New</span>
              <span class="text-[11px] font-bold text-slate-700 dark:text-slate-200">#99</span>
            </div>
            <div class="block-connector w-8 h-[2px] bg-gradient-to-r from-[#00bed6]/80 to-[#00bed6]/20 animate-pulse"></div>
            <div class="block-box w-12 h-12 rounded-xl border border-[#00bed6]/30 bg-white/5 dark:bg-slate-800/40 flex items-center justify-center animate-explorer-block-3">
              <span class="text-[10px] font-bold text-slate-400">#100</span>
            </div>
          </div>
        </template>
        
        <!-- Velvet Visual -->
        <template v-else-if="project.id === 'velvet'">
          <div class="velvet-box absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent flex items-center justify-center">
            <div class="velvet-card w-[100px] h-[140px] rounded-2xl bg-gradient-to-br from-[#f472b6] via-[#ec4899] to-[#d946ef] shadow-[0_10px_30px_rgba(236,72,153,0.3)] border border-white/20 flex flex-col justify-between p-4 transform animate-velvet-card">
              <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] text-white">♠</div>
              <div class="text-xs font-bold text-white tracking-widest text-center uppercase font-heading">Velvet</div>
              <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] text-white self-end">♠</div>
            </div>
          </div>
        </template>
        
        <!-- NudeArts Visual -->
        <template v-else-if="project.id === 'nudearts'">
          <div class="nudearts-box absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent flex items-center justify-center">
            <div class="nudearts-canvas w-[110px] h-[110px] rounded-[20px] bg-gradient-to-br from-pink-500 to-blue-500 opacity-70 blur-[5px] animate-morph-blob"></div>
            <div class="nudearts-brush absolute w-5 h-5 border-2 border-white rounded-full animate-draw-brush"></div>
          </div>
        </template>
        
        <!-- FastChange Visual -->
        <template v-else-if="project.id === 'fastchange'">
          <div class="fastchange-box absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent flex items-center justify-center">
            <div class="swap-orbit relative w-[130px] h-[130px] border border-dashed border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center animate-spin-slow">
              <div class="coin-1 absolute -top-5 w-10 h-10 rounded-full bg-[#f26531] border border-white/10 flex items-center justify-center shadow-md">
                <span class="text-xs font-bold text-white">BTC</span>
              </div>
              <div class="coin-2 absolute -bottom-5 w-10 h-10 rounded-full bg-[#204397] border border-white/10 flex items-center justify-center shadow-md">
                <span class="text-xs font-bold text-white">ETH</span>
              </div>
            </div>
            <!-- Swap center arrows -->
            <div class="absolute w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow">
              <svg class="w-4 h-4 text-[#f26531] animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
        </template>
        
        <!-- QuickyBet Visual -->
        <template v-else-if="project.id === 'quickybet'">
          <div class="quickybet-box absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent flex items-center justify-center gap-6">
            <div class="lucky-die w-12 h-12 bg-emerald-500 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)] text-white font-bold text-xl animate-quicky-die-1">
              7
            </div>
            <div class="lucky-die w-12 h-12 bg-emerald-600 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)] text-white font-bold text-xl animate-quicky-die-2">
              7
            </div>
            <div class="lucky-die w-12 h-12 bg-emerald-700 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)] text-white font-bold text-xl animate-quicky-die-3">
              7
            </div>
          </div>
        </template>
        
        <!-- Alicante Visual -->
        <template v-else-if="project.id === 'alicante'">
          <div class="alicante-box absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent flex flex-col items-center justify-center overflow-hidden">
            <!-- Sun shape -->
            <div class="alicante-sun w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-bounce-sun"></div>
            <!-- Waves -->
            <div class="wave-lines absolute bottom-4 flex flex-col gap-1 w-full opacity-60">
              <div class="wave-line h-[3px] bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent w-[140%] animate-wave-1"></div>
              <div class="wave-line h-[3px] bg-gradient-to-r from-transparent via-[#0891b2] to-transparent w-[140%] animate-wave-2"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Scoped Animations */
@keyframes pulse-node {
  0% { transform: scale(0.95); }
  100% { transform: scale(1.05); }
}
.animate-pulse-node {
  animation: pulse-node 4s infinite alternate ease-in-out;
}

@keyframes rotate-ring {
  0% { transform: rotateX(65deg) rotateY(20deg) rotateZ(0deg); }
  100% { transform: rotateX(65deg) rotateY(20deg) rotateZ(360deg); }
}
.animate-rotate-ring {
  animation: rotate-ring 12s infinite linear;
}

@keyframes explorer-block {
  0% { transform: translateY(-5px); }
  100% { transform: translateY(5px); }
}
.animate-explorer-block-1 { animation: explorer-block 3s infinite alternate ease-in-out; }
.animate-explorer-block-2 { animation: explorer-block 3s infinite 0.5s alternate ease-in-out; }
.animate-explorer-block-3 { animation: explorer-block 3s infinite 1s alternate ease-in-out; }

@keyframes velvet-card {
  0% { transform: translateY(-8px) rotate(-3deg); }
  100% { transform: translateY(8px) rotate(3deg); }
}
.animate-velvet-card {
  animation: velvet-card 5s infinite alternate ease-in-out;
}

@keyframes morph-blob {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  100% { border-radius: 70% 30% 50% 50% / 50% 60% 40% 60%; }
}
.animate-morph-blob {
  animation: morph-blob 8s infinite alternate ease-in-out;
}

@keyframes draw-brush {
  0% { transform: translate(-40px, -40px); }
  33% { transform: translate(40px, -20px); }
  66% { transform: translate(-20px, 40px); }
  100% { transform: translate(-40px, -40px); }
}
.animate-draw-brush {
  animation: draw-brush 6s infinite ease-in-out;
}

.animate-spin-slow {
  animation: spin 16s infinite linear;
}

@keyframes quicky-die {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}
.animate-quicky-die-1 { animation: quicky-die 4s infinite 0.2s ease-in-out; }
.animate-quicky-die-2 { animation: quicky-die 4s infinite 0.6s ease-in-out; }
.animate-quicky-die-3 { animation: quicky-die 4s infinite 1s ease-in-out; }

@keyframes bounce-sun {
  0% { transform: translateY(-4px) scale(0.98); }
  100% { transform: translateY(4px) scale(1.02); }
}
.animate-bounce-sun {
  animation: bounce-sun 4s infinite alternate ease-in-out;
}

@keyframes wave {
  0% { transform: translateX(-20%); }
  100% { transform: translateX(0%); }
}
.animate-wave-1 { animation: wave 6s infinite linear; }
.animate-wave-2 { animation: wave 8s infinite linear reverse; }

/* Fallback entry reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
:global(.reveal.visible) {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Scroll timelines (if supported) */
@supports ((animation-timeline: view()) and (animation-range: entry)) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
    animation: reveal-in linear both;
    animation-timeline: view();
    animation-range: entry 10% entry 45%;
  }

  @keyframes reveal-in {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
}
</style>
