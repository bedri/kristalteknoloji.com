<script setup>
import { ref, computed } from 'vue'

const { t } = useTranslate()

useHead({
  title: computed(() => t('lab.seoTitle')),
  meta: [
    { name: 'description', content: computed(() => t('lab.seoDesc')) }
  ]
})

const activeTab = ref('crystal')

const technologies = computed(() => [
  {
    id: 'mescal',
    code: 'SPEC // 01',
    name: 'MESCAL Smart Contract Language',
    acronym: 'MESCAL',
    tagline: t('lab.tech.mescal.tagline'),
    description: t('lab.tech.mescal.desc'),
    docUrl: 'https://github.com/bedri/KristaTech-KRISTA/blob/develop/doc/MESCAL.md',
    specs: [
      { name: t('lab.tech.mescal.spec1Name'), value: t('lab.tech.mescal.spec1Val') },
      { name: t('lab.tech.mescal.spec2Name'), value: t('lab.tech.mescal.spec2Val') },
      { name: t('lab.tech.mescal.spec3Name'), value: t('lab.tech.mescal.spec3Val') }
    ]
  },
  {
    id: 'adam',
    code: 'SPEC // 02',
    name: 'A Decentralized Approach Model',
    acronym: 'ADAM',
    tagline: t('lab.tech.adam.tagline'),
    description: t('lab.tech.adam.desc'),
    docUrl: 'https://github.com/bedri/KristaTech-KRISTA/blob/develop/doc/ADAM_Consensus.md',
    specs: [
      { name: t('lab.tech.adam.spec1Name'), value: t('lab.tech.adam.spec1Val') },
      { name: t('lab.tech.adam.spec2Name'), value: t('lab.tech.adam.spec2Val') },
      { name: t('lab.tech.adam.spec3Name'), value: t('lab.tech.adam.spec3Val') }
    ]
  },
  {
    id: 'pobls',
    code: 'SPEC // 03',
    name: 'Proof of BLS Consensus',
    acronym: 'PoBLS',
    tagline: t('lab.tech.pobls.tagline'),
    description: t('lab.tech.pobls.desc'),
    docUrl: 'https://github.com/bedri/KristaTech-KRISTA/blob/develop/doc/PoBLS_Consensus_TR.md',
    specs: [
      { name: t('lab.tech.pobls.spec1Name'), value: t('lab.tech.pobls.spec1Val') },
      { name: t('lab.tech.pobls.spec2Name'), value: t('lab.tech.pobls.spec2Val') },
      { name: t('lab.tech.pobls.spec3Name'), value: t('lab.tech.pobls.spec3Val') }
    ]
  },
  {
    id: 'model-d',
    code: 'SPEC // 04',
    name: 'Model D Reward Distribution',
    acronym: 'Model D',
    tagline: t('lab.tech.modelD.tagline'),
    description: t('lab.tech.modelD.desc'),
    docUrl: 'https://github.com/bedri/KristaTech-KRISTA/blob/develop/doc/Tokenomics_Study_TR.md',
    specs: [
      { name: t('lab.tech.modelD.spec1Name'), value: t('lab.tech.modelD.spec1Val') },
      { name: t('lab.tech.modelD.spec2Name'), value: t('lab.tech.modelD.spec2Val') },
      { name: t('lab.tech.modelD.spec3Name'), value: t('lab.tech.modelD.spec3Val') }
    ]
  }
])
</script>

<template>
  <div class="app-layout min-h-screen font-sans antialiased">
    <BgMesh />
    <AppHeader />

    <main id="main-content" tabindex="-1" class="pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="kt-badge mb-5">
            <span class="kt-badge-dot"></span>
            <span>{{ t('lab.tagline') }}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-5 text-slate-900 dark:text-white tracking-tight">
            {{ t('lab.title') }}
          </h1>
          <p class="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ t('lab.desc') }}
          </p>
        </div>

        <!-- Interactive R&D Workbench Container -->
        <div class="kt-panel rounded-3xl p-6 sm:p-8 lg:p-12">
          <!-- Workbench Header & Tabs -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6 mb-8">
            <div class="flex items-center gap-3">
              <BrandEmblem :size="28" />
              <div>
                <span class="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#808284] block">
                  KRISTAL LAB // WORKBENCH v2.4
                </span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">
                  {{ activeTab === 'crystal' ? t('lab.designerTab') : t('lab.lotteryTab') }}
                </span>
              </div>
            </div>

            <div class="inline-flex items-center p-1 rounded-xl bg-slate-900/[0.04] dark:bg-slate-950/80 border border-slate-200/70 dark:border-slate-800/80">
              <button
                type="button"
                class="px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                :class="activeTab === 'crystal'
                  ? 'bg-[#00bed6] text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                @click="activeTab = 'crystal'"
              >
                {{ t('lab.designerTab') }}
              </button>
              <button
                type="button"
                class="px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                :class="activeTab === 'simulator'
                  ? 'bg-[#00bed6] text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                @click="activeTab = 'simulator'"
              >
                {{ t('lab.lotteryTab') }}
              </button>
            </div>
          </div>

          <!-- Active Simulation Module -->
          <div v-if="activeTab === 'crystal'">
            <CrystalDesigner />
          </div>
          <div v-else-if="activeTab === 'simulator'">
            <ConsensusSimulator />
          </div>
        </div>

        <!-- Core Technologies Documentation Matrix -->
        <section class="cv-auto mt-24">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div class="max-w-2xl">
              <span class="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#00bed6] block mb-3">
                {{ t('lab.techTitle') }}
              </span>
              <h2 class="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                {{ t('lab.techSubtitle') }}
              </h2>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              {{ t('lab.techDesc') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article
              v-for="tech in technologies"
              :key="tech.id"
              class="kt-panel kt-panel-interactive rounded-2xl p-7 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                <div class="flex items-center justify-between mb-5">
                  <div class="flex items-center gap-2.5">
                    <span class="px-3 py-1 rounded-md bg-[#00bed6]/10 border border-[#00bed6]/25 text-[#00bed6] font-mono text-xs font-bold tracking-wider uppercase">
                      {{ tech.acronym }}
                    </span>
                    <span class="text-[11px] font-mono text-[#808284]">{{ tech.code }}</span>
                  </div>
                  <span class="w-2 h-2 rounded-full bg-[#00bed6]"></span>
                </div>

                <h3 class="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#00bed6] transition-colors mb-1.5">
                  {{ tech.name }}
                </h3>
                <p class="text-xs font-mono font-semibold text-[#808284] mb-4 uppercase tracking-wider">
                  {{ tech.tagline }}
                </p>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {{ tech.description }}
                </p>
              </div>

              <div class="border-t border-slate-200/80 dark:border-slate-800/80 pt-5 mt-2 flex flex-col gap-4">
                <dl class="grid grid-cols-1 gap-2.5">
                  <div
                    v-for="spec in tech.specs"
                    :key="spec.name"
                    class="flex justify-between items-center text-xs py-1 border-b border-slate-200/40 dark:border-slate-800/40 last:border-0"
                  >
                    <dt class="text-[#808284] font-mono">{{ spec.name }}</dt>
                    <dd class="text-slate-900 dark:text-slate-200 font-mono font-bold text-right">{{ spec.value }}</dd>
                  </div>
                </dl>

                <a
                  v-if="tech.docUrl"
                  :href="tech.docUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-300/80 dark:border-slate-700/80 bg-slate-900/[0.02] dark:bg-white/[0.03] text-slate-800 dark:text-slate-200 hover:bg-[#00bed6]/10 hover:border-[#00bed6] hover:text-[#00bed6] transition-all duration-200"
                >
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  <span>{{ t('lab.viewDoc') }}</span>
                </a>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
