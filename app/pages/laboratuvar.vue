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
    name: 'Proof of BLS consensus',
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
  <div class="app-layout min-h-screen text-slate-800 dark:text-slate-100 font-sans antialiased bg-slate-50 dark:bg-slate-900/98">
    <BgMesh />
    <AppHeader />
    
    <main class="pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Section Header -->
        <div class="section-header text-center max-w-3xl mx-auto mb-16">
          <span class="section-tagline text-xs font-bold uppercase tracking-widest text-[#00bed6] mb-3 block">{{ t('lab.tagline') }}</span>
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-800 dark:text-slate-50 tracking-tight">
            {{ t('lab.title') }}
          </h1>
          <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('lab.desc') }}
          </p>
        </div>
        
        <!-- Interactive Widget Container -->
        <div class="lab-tabs-container bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md rounded-[32px] p-6 md:p-12">
          <!-- Tabs Selection -->
          <div class="flex justify-center gap-4 border-b border-slate-800/10 dark:border-slate-200/10 pb-6 mb-10">
            <button 
              class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300"
              :class="activeTab === 'crystal' ? 'bg-[#00bed6]/10 text-[#00bed6]' : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'"
              @click="activeTab = 'crystal'"
            >
              {{ t('lab.designerTab') }}
            </button>
            <button 
              class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300"
              :class="activeTab === 'simulator' ? 'bg-[#00bed6]/10 text-[#00bed6]' : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'"
              @click="activeTab = 'simulator'"
            >
              {{ t('lab.lotteryTab') }}
            </button>
          </div>
          
          <!-- Tab Panes -->
          <div v-if="activeTab === 'crystal'">
            <CrystalDesigner />
          </div>
          <div v-else-if="activeTab === 'simulator'">
            <ConsensusSimulator />
          </div>
        </div>

        <!-- Core Technologies Section -->
        <div class="mt-24">
          <div class="section-header text-center max-w-3xl mx-auto mb-16">
            <span class="section-tagline text-xs font-bold uppercase tracking-widest text-[#00bed6] mb-3 block">{{ t('lab.techTitle') }}</span>
            <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-800 dark:text-slate-50 tracking-tight">
              {{ t('lab.techSubtitle') }}
            </h2>
            <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ t('lab.techDesc') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              v-for="tech in technologies" 
              :key="tech.id"
              class="tech-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/8 dark:border-slate-200/10 backdrop-blur-md rounded-[24px] p-8 hover:border-[#00bed6] hover:shadow-[0_10px_35px_rgba(0,190,214,0.08)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3 py-1 rounded-md bg-[#00bed6]/10 text-[#00bed6] text-xs font-bold tracking-wider uppercase">
                    {{ tech.acronym }}
                  </span>
                  <div class="w-2 h-2 rounded-full bg-[#00bed6] group-hover:animate-ping"></div>
                </div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#00bed6] transition-colors duration-200 mb-2">
                  {{ tech.name }}
                </h3>
                <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">
                  {{ tech.tagline }}
                </p>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {{ tech.description }}
                </p>
              </div>
              
              <div class="border-t border-slate-800/5 dark:border-slate-200/5 pt-4 mt-6 flex flex-col gap-4">
                <div class="grid grid-cols-1 gap-2">
                  <div 
                    v-for="spec in tech.specs" 
                    :key="spec.name"
                    class="flex justify-between items-center text-xs"
                  >
                    <span class="text-slate-400 dark:text-slate-500 font-medium">{{ spec.name }}:</span>
                    <span class="text-slate-700 dark:text-slate-300 font-bold text-right">{{ spec.value }}</span>
                  </div>
                </div>

                <a 
                  v-if="tech.docUrl"
                  :href="tech.docUrl"
                  target="_blank"
                  class="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-full border border-slate-800/10 dark:border-slate-200/10 bg-slate-800/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-[#00bed6]/10 hover:border-[#00bed6] hover:text-[#00bed6] hover:-translate-y-[1px] transition-all duration-200"
                >
                  <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  {{ t('lab.viewDoc') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>
