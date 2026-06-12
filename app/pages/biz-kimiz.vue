<script setup>
import { computed } from 'vue'
const { t } = useTranslate()

useHead({
  title: computed(() => `${t('nav.about')} | Kristal Teknoloji`),
  meta: [
    { name: 'description', content: computed(() => t('about.desc')) }
  ]
})
</script>

<template>
  <div class="app-layout min-h-screen text-slate-800 dark:text-slate-100 font-sans antialiased bg-slate-50 dark:bg-slate-900/98">
    <BgMesh />
    <AppHeader />
    
    <main class="pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Section Header -->
        <div class="section-header text-center max-w-3xl mx-auto mb-20">
          <span class="section-tagline text-xs font-bold uppercase tracking-widest text-[#00bed6] mb-3 block">{{ t('nav.about') }}</span>
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-800 dark:text-slate-50 tracking-tight">
            {{ t('about.title') }}
          </h1>
          <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('about.desc') }}
          </p>
        </div>
        
        <!-- Pillars Grid -->
        <div class="about-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div class="about-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00bed6] hover:shadow-[0_10px_30px_rgba(0,190,214,0.1)]">
            <div class="about-card-icon w-12 h-12 rounded-2xl bg-[#00bed6]/20 flex items-center justify-center text-[#00bed6] mb-6">
              <UIcon name="i-heroicons-squares-2x2-20-solid" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-3">{{ t('about.pillar1Title') }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ t('about.pillar1Desc') }}
            </p>
          </div>
          
          <div class="about-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00bed6] hover:shadow-[0_10px_30px_rgba(0,190,214,0.1)]">
            <div class="about-card-icon w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
              <UIcon name="i-heroicons-shield-check-20-solid" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-3">{{ t('about.pillar2Title') }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ t('about.pillar2Desc') }}
            </p>
          </div>
          
          <div class="about-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00bed6] hover:shadow-[0_10px_30px_rgba(0,190,214,0.1)]">
            <div class="about-card-icon w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-500 mb-6">
              <UIcon name="i-heroicons-user-group-20-solid" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-3">{{ t('about.pillar3Title') }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ t('about.pillar3Desc') }}
            </p>
          </div>
        </div>

        <!-- Vision / Philosophy Section -->
        <div class="bg-white/40 dark:bg-slate-900/30 border border-slate-800/5 dark:border-slate-200/5 backdrop-blur-sm rounded-[32px] p-8 md:p-12 max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold font-heading mb-6 text-slate-800 dark:text-slate-100 text-center">{{ t('about.philosophyTitle') }}</h2>
          <div class="space-y-6 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            <p>
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
    </main>
    
    <AppFooter />
  </div>
</template>
