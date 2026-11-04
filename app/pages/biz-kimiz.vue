<script setup>
import { computed } from 'vue'
const { t } = useTranslate()

useHead({
  title: computed(() => `${t('nav.about')} | Kristal Teknoloji`),
  meta: [
    { name: 'description', content: computed(() => t('about.desc')) }
  ]
})

const pillars = computed(() => [
  {
    code: '01',
    tag: 'CLARITY // ARCHITECTURE',
    title: t('about.pillar1Title'),
    desc: t('about.pillar1Desc'),
    icon: 'clarity'
  },
  {
    code: '02',
    tag: 'SECURITY // CRYPTOGRAPHY',
    title: t('about.pillar2Title'),
    desc: t('about.pillar2Desc'),
    icon: 'security'
  },
  {
    code: '03',
    tag: 'GOVERNANCE // ECOSYSTEM',
    title: t('about.pillar3Title'),
    desc: t('about.pillar3Desc'),
    icon: 'community'
  }
])
</script>

<template>
  <div class="app-layout min-h-dvh text-[#0f141a] dark:text-[#f2f5f8] font-sans antialiased">
    <BgMesh />
    <AppHeader />

    <main id="main-content" tabindex="-1" class="pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6">
        <!-- ================================================================
             1. CORPORATE PROFILE HEADER
             ================================================================ -->
        <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center mb-20">
          <div>
            <div class="kt-badge mb-5">
              <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
              {{ t('about.tagline') }}
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold text-[#0f141a] dark:text-white tracking-tight mb-6">
              {{ t('about.title') }}
            </h1>
            <p class="text-base sm:text-lg text-[#52565b] dark:text-[#9ea2a8] leading-relaxed">
              {{ t('about.desc') }}
            </p>
          </div>

          <!-- Corporate Identity Emblem Showcase -->
          <div class="kt-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div class="w-full flex items-center justify-between font-mono text-[11px] text-[#808284] pb-4 mb-6 border-b border-[#808284]/15">
              <span>IDENTITY // SPEC</span>
              <span class="text-[#00bed6]">#00BED6 &bull; #808284</span>
            </div>
            <div class="relative py-6 flex flex-col items-center gap-6">
              <div class="w-24 h-24 rounded-2xl bg-[#00bed6]/8 border border-[#00bed6]/25 flex items-center justify-center shadow-[0_0_40px_rgba(0,190,214,0.12)]">
                <BrandEmblem className="w-16 h-16" />
              </div>
              <BrandLogo className="h-8 w-auto" />
            </div>
            <div class="w-full pt-4 mt-4 border-t border-[#808284]/15 flex items-center justify-between font-mono text-[11px] text-[#808284]">
              <span>KRISTAL TEKNOLOJİ LABS</span>
              <span class="text-[#00bed6]">WEB3 &amp; LAYER-1 R&amp;D</span>
            </div>
          </div>
        </div>

        <!-- ================================================================
             2. VISION & MISSION EXECUTIVE SPLIT
             ================================================================ -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div class="kt-panel kt-panel-interactive rounded-2xl p-8 md:p-10 border-s-4 border-s-[#00bed6]">
            <div class="flex items-center justify-between mb-4 font-mono text-xs text-[#808284]">
              <span>DIRECTIVE // 01</span>
              <span class="text-[#00bed6] font-bold">VISION</span>
            </div>
            <h2 class="text-2xl font-bold text-[#0f141a] dark:text-white mb-3">
              {{ t('about.visionTitle') }}
            </h2>
            <p class="text-base text-[#52565b] dark:text-[#9ea2a8] leading-relaxed">
              {{ t('about.visionDesc') }}
            </p>
          </div>

          <div class="kt-panel kt-panel-interactive rounded-2xl p-8 md:p-10 border-s-4 border-s-[#808284]">
            <div class="flex items-center justify-between mb-4 font-mono text-xs text-[#808284]">
              <span>DIRECTIVE // 02</span>
              <span class="text-[#00bed6] font-bold">MISSION</span>
            </div>
            <h2 class="text-2xl font-bold text-[#0f141a] dark:text-white mb-3">
              {{ t('about.missionTitle') }}
            </h2>
            <p class="text-base text-[#52565b] dark:text-[#9ea2a8] leading-relaxed">
              {{ t('about.missionDesc') }}
            </p>
          </div>
        </div>

        <!-- ================================================================
             3. CORE ARCHITECTURAL PILLARS (Strictly Brand Palette)
             ================================================================ -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div
            v-for="pillar in pillars"
            :key="pillar.code"
            class="kt-panel kt-panel-interactive rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between pb-4 mb-6 border-b border-[#808284]/15 font-mono text-xs">
                <span class="text-[#00bed6] font-bold">PILLAR // {{ pillar.code }}</span>
                <span class="text-[#808284] text-[10px]">{{ pillar.tag }}</span>
              </div>

              <div class="w-12 h-12 rounded-xl bg-[#00bed6]/10 border border-[#00bed6]/25 flex items-center justify-center text-[#00bed6] mb-6">
                <!-- Clarity Icon -->
                <svg v-if="pillar.icon === 'clarity'" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <!-- Security Icon -->
                <svg v-else-if="pillar.icon === 'security'" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <!-- Community Icon -->
                <svg v-else class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <h3 class="text-xl font-bold text-[#0f141a] dark:text-white mb-3">
                {{ pillar.title }}
              </h3>
              <p class="text-sm text-[#52565b] dark:text-[#9ea2a8] leading-relaxed">
                {{ pillar.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- ================================================================
             4. ENGINEERING PHILOSOPHY & MANIFESTO
             ================================================================ -->
        <div class="kt-panel rounded-3xl p-8 md:p-14">
          <div class="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
            <div class="flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-e border-[#808284]/20 pb-8 lg:pb-0 lg:pe-12">
              <div>
                <div class="kt-badge mb-4">
                  <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
                  MANIFESTO // R&amp;D
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-[#0f141a] dark:text-white mb-4">
                  {{ t('about.philosophyTitle') }}
                </h2>
                <p class="text-sm text-[#808284] leading-relaxed">
                  {{ t('about.teamSubtitle') }}
                </p>
              </div>

              <div class="mt-8 pt-6 border-t border-[#808284]/15 flex items-center gap-4">
                <BrandEmblem className="w-10 h-10 shrink-0" />
                <div class="font-mono text-xs text-[#52565b] dark:text-[#9ea2a8]">
                  <div class="font-bold text-[#0f141a] dark:text-white">KRISTAL LATTICE TOPOLOGY</div>
                  <div class="text-[#00bed6]">ADAM &bull; PoBLS &bull; MESCAL &bull; MODEL D</div>
                </div>
              </div>
            </div>

            <div class="space-y-5 text-[#52565b] dark:text-[#c4c7cc] text-sm md:text-base leading-relaxed">
              <p class="border-s-2 border-[#00bed6] ps-4 text-[#0f141a] dark:text-white font-medium">
                {{ t('about.philosophyP1') }}
              </p>
              <p>
                {{ t('about.philosophyP2') }}
              </p>
              <p>
                {{ t('about.philosophyP3') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
