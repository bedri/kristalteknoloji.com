<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const formattedIndex = computed(() => String(props.index + 1).padStart(2, '0'))

const primaryDomain = computed(() => {
  const firstHref = props.project.links?.[0]?.href || ''
  try {
    return new URL(firstHref).hostname
  } catch {
    return firstHref
  }
})
</script>

<template>
  <article
    class="project-card kt-panel kt-panel-interactive rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-center reveal"
  >
    <!-- Project Architectural Specification Content -->
    <div class="project-info flex flex-col items-start">
      <div class="w-full flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#808284]/15 font-mono text-xs">
        <div class="flex items-center gap-2.5">
          <span class="px-2.5 py-0.5 rounded bg-[#00bed6]/12 text-[#00bed6] font-bold">
            SYS // {{ formattedIndex }}
          </span>
          <span class="text-[#808284] uppercase tracking-wider font-semibold">
            {{ project.category }}
          </span>
        </div>
        <span v-if="primaryDomain" class="text-[#808284] text-[11px] flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#00bed6]" aria-hidden="true"></span>
          {{ primaryDomain }}
        </span>
      </div>

      <h2 class="text-2xl sm:text-3xl font-bold text-[#0f141a] dark:text-white mb-4">
        {{ project.title }}
      </h2>

      <p class="text-sm sm:text-base text-[#52565b] dark:text-[#9ea2a8] mb-8 leading-relaxed">
        {{ project.text }}
      </p>

      <!-- Technical Feature Matrix -->
      <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8">
        <li
          v-for="(feature, fIdx) in project.features"
          :key="feature"
          class="bg-[#808284]/6 dark:bg-[#070b10]/60 border border-[#808284]/20 rounded-xl p-3.5 flex flex-col gap-1.5"
        >
          <span class="font-mono text-[10px] text-[#00bed6] font-bold">
            SPEC.0{{ fIdx + 1 }}
          </span>
          <span class="text-xs font-semibold text-[#0f141a] dark:text-[#f2f5f8] leading-snug">
            {{ feature }}
          </span>
        </li>
      </ul>

      <!-- Action Links -->
      <div class="project-links flex flex-wrap gap-4 w-full pt-2">
        <a
          v-for="link in project.links"
          :key="link.href"
          :href="link.href"
          :target="link.target ? '_blank' : '_self'"
          :rel="link.target ? 'noopener noreferrer' : undefined"
          class="kt-btn-primary"
        >
          <span>{{ link.label }}</span>
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Decorative Engineering Schematic Viewport (Strictly Brand Cyan #00bed6 & Titanium #808284) -->
    <div
      class="project-visual w-full aspect-[1.35] flex items-center justify-center"
      aria-hidden="true"
    >
      <div class="w-full h-full bg-[#0b1017] border border-[#808284]/25 rounded-2xl relative overflow-hidden flex flex-col justify-between p-5 text-[#c4c7cc]">
        <!-- Top Schematic Telemetry Bar -->
        <div class="flex items-center justify-between font-mono text-[10px] text-[#808284] z-10 border-b border-[#808284]/15 pb-2.5">
          <span class="uppercase tracking-widest text-[#97d1dc]">MODULE // {{ project.id }}</span>
          <span class="text-[#00bed6]">ONLINE</span>
        </div>

        <!-- Subtle Grid Backdrop inside Schematic -->
        <div class="schematic-grid absolute inset-0 pointer-events-none opacity-25"></div>

        <!-- 1. KristaTech L1 Core Visual -->
        <div v-if="project.id === 'kristatech'" class="relative z-10 my-auto flex items-center justify-center">
          <div class="relative w-36 h-36 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full border border-dashed border-[#808284]/40 animate-spin-slow"></div>
            <div class="absolute inset-3 rounded-full border border-[#00bed6]/40"></div>
            <div class="w-16 h-16 rounded-2xl bg-[#00bed6]/15 border border-[#00bed6] flex items-center justify-center shadow-[0_0_30px_rgba(0,190,214,0.3)]">
              <BrandEmblem className="w-10 h-10" />
            </div>
          </div>
        </div>

        <!-- 2. Block Explorer Ledger Visual -->
        <div v-else-if="project.id === 'explorer'" class="relative z-10 my-auto flex items-center justify-center gap-3 px-2">
          <div class="w-16 h-16 rounded-xl border border-[#808284]/40 bg-[#111823] flex flex-col items-center justify-center font-mono">
            <span class="text-[9px] text-[#808284]">BLK</span>
            <span class="text-xs font-bold text-[#c4c7cc]">#998</span>
          </div>
          <div class="w-6 h-[2px] bg-[#00bed6]/60"></div>
          <div class="w-20 h-20 rounded-xl border-2 border-[#00bed6] bg-[#00bed6]/12 flex flex-col items-center justify-center font-mono shadow-[0_0_25px_rgba(0,190,214,0.22)]">
            <span class="text-[9px] text-[#00bed6] font-bold">VERIFIED</span>
            <span class="text-sm font-bold text-white">#999</span>
            <span class="text-[8px] text-[#97d1dc]">0x8f...2a</span>
          </div>
          <div class="w-6 h-[2px] bg-[#00bed6]/60"></div>
          <div class="w-16 h-16 rounded-xl border border-[#808284]/40 bg-[#111823] flex flex-col items-center justify-center font-mono">
            <span class="text-[9px] text-[#808284]">NEXT</span>
            <span class="text-xs font-bold text-[#c4c7cc]">#1000</span>
          </div>
        </div>

        <!-- 3. Velvet Interactive Engine Visual -->
        <div v-else-if="project.id === 'velvet'" class="relative z-10 my-auto flex items-center justify-center gap-4">
          <div class="w-24 h-32 rounded-xl bg-[#111823] border border-[#808284]/40 p-3 flex flex-col justify-between -rotate-6">
            <div class="w-5 h-5 rounded bg-[#808284]/20 flex items-center justify-center text-[10px] text-[#97d1dc] font-mono">AI</div>
            <div class="h-1.5 w-full bg-[#808284]/30 rounded"></div>
            <div class="h-1.5 w-2/3 bg-[#00bed6]/40 rounded"></div>
          </div>
          <div class="w-24 h-32 rounded-xl bg-gradient-to-br from-[#00bed6]/25 to-[#111823] border border-[#00bed6] p-3 flex flex-col justify-between rotate-3 shadow-[0_0_25px_rgba(0,190,214,0.2)]">
            <div class="flex justify-between items-center">
              <span class="w-2 h-2 rounded-full bg-[#00bed6]"></span>
              <span class="font-mono text-[9px] text-[#97d1dc]">WEB3</span>
            </div>
            <div class="text-center font-mono text-xs font-bold text-white tracking-widest">VELVET</div>
            <div class="h-1 w-full bg-[#00bed6] rounded"></div>
          </div>
        </div>

        <!-- 4. NudeArts AI Synthesis Studio Visual -->
        <div v-else-if="project.id === 'nudearts'" class="relative z-10 my-auto flex items-center justify-center">
          <div class="w-44 h-28 rounded-xl border border-[#00bed6]/50 bg-[#111823]/90 p-3.5 flex flex-col justify-between relative overflow-hidden">
            <div class="flex items-center justify-between font-mono text-[9px] text-[#97d1dc]">
              <span>SYNTHESIS // 4K</span>
              <span class="text-[#00bed6]">LICENSED</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5 my-1">
              <div class="h-8 rounded bg-[#00bed6]/20 border border-[#00bed6]/40"></div>
              <div class="h-8 rounded bg-[#00bed6]/35 border border-[#00bed6]"></div>
              <div class="h-8 rounded bg-[#808284]/20 border border-[#808284]/40"></div>
              <div class="h-8 rounded bg-[#97d1dc]/20 border border-[#97d1dc]/40"></div>
            </div>
            <div class="h-1.5 w-full bg-[#808284]/25 rounded-full overflow-hidden">
              <div class="h-full w-3/4 bg-[#00bed6]"></div>
            </div>
          </div>
        </div>

        <!-- 5. FastChange Cross-Chain Swap Visual -->
        <div v-else-if="project.id === 'fastchange'" class="relative z-10 my-auto flex items-center justify-center">
          <div class="flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-[#111823] border border-[#808284]/50 flex flex-col items-center justify-center font-mono">
              <span class="text-[9px] text-[#808284]">CHAIN A</span>
              <span class="text-xs font-bold text-white">KRISTA</span>
            </div>
            <div class="w-11 h-11 rounded-full bg-[#00bed6]/15 border border-[#00bed6] flex items-center justify-center text-[#00bed6] shadow-[0_0_20px_rgba(0,190,214,0.25)]">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-[#111823] border border-[#00bed6]/50 flex flex-col items-center justify-center font-mono">
              <span class="text-[9px] text-[#97d1dc]">CHAIN B</span>
              <span class="text-xs font-bold text-[#00bed6]">L1/L2</span>
            </div>
          </div>
        </div>

        <!-- 6. Alicante Digital Guide Geospatial Visual -->
        <div v-else class="relative z-10 my-auto flex items-center justify-center">
          <div class="relative w-32 h-32 rounded-full border border-[#808284]/40 flex items-center justify-center">
            <div class="absolute inset-3 rounded-full border border-dashed border-[#00bed6]/40"></div>
            <div class="w-3 h-3 rounded-full bg-[#00bed6] shadow-[0_0_15px_#00bed6]"></div>
            <div class="absolute top-4 right-5 px-1.5 py-0.5 rounded bg-[#00bed6]/20 border border-[#00bed6]/50 font-mono text-[8px] text-[#97d1dc]">
              38.3452° N
            </div>
          </div>
        </div>

        <!-- Bottom Schematic Telemetry Bar -->
        <div class="flex items-center justify-between font-mono text-[10px] text-[#808284] z-10 border-t border-[#808284]/15 pt-2.5">
          <span>KRISTAL ECOSYSTEM</span>
          <span class="text-[#c4c7cc]">VERIFIED ARCHITECTURE</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.schematic-grid {
  background-size: 24px 24px;
  background-image:
    linear-gradient(to right, rgba(128, 130, 132, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(128, 130, 132, 0.2) 1px, transparent 1px);
}

.animate-spin-slow {
  animation: spin 22s linear infinite;
}

.reveal {
  opacity: 0;
  translate: 0 24px;
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              translate 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

:global(.reveal.visible) {
  opacity: 1;
  translate: 0 0;
}

@media (prefers-reduced-motion: no-preference) {
  @supports ((animation-timeline: view()) and (animation-range: entry)) {
    .reveal {
      opacity: 1;
      translate: none;
      transition: none;
      animation: reveal-in auto linear backwards;
      animation-timeline: view();
      animation-range: entry 8% entry 38%;
    }

    @keyframes reveal-in {
      from {
        opacity: 0;
        translate: 0 28px;
      }
      to {
        opacity: 1;
        translate: 0 0;
      }
    }
  }
}
</style>
