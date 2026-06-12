<script setup>
import { computed } from 'vue'
const { t } = useTranslate()

useHead({
  title: computed(() => `${t('nav.projects')} | Kristal Teknoloji`),
  meta: [
    { name: 'description', content: computed(() => t('ecosystem.projectsDesc')) }
  ]
})

const projects = computed(() => [
  {
    id: 'kristatech',
    category: t('ecosystem.kristatech.category'),
    title: t('ecosystem.kristatech.title'),
    text: t('ecosystem.kristatech.text'),
    features: [
      t('ecosystem.kristatech.feature1'),
      t('ecosystem.kristatech.feature2'),
      t('ecosystem.kristatech.feature3')
    ],
    links: [
      { label: t('ecosystem.kristatech.link1'), href: 'https://krista.kristalteknoloji.com', target: true }
    ]
  },
  {
    id: 'explorer',
    category: t('ecosystem.explorer.category'),
    title: t('ecosystem.explorer.title'),
    text: t('ecosystem.explorer.text'),
    features: [
      t('ecosystem.explorer.feature1'),
      t('ecosystem.explorer.feature2'),
      t('ecosystem.explorer.feature3')
    ],
    links: [
      { label: t('ecosystem.explorer.link1'), href: 'https://explorer.kristalteknoloji.com', target: true }
    ]
  },
  {
    id: 'velvet',
    category: t('ecosystem.velvet.category'),
    title: t('ecosystem.velvet.title'),
    text: t('ecosystem.velvet.text'),
    features: [
      t('ecosystem.velvet.feature1'),
      t('ecosystem.velvet.feature2'),
      t('ecosystem.velvet.feature3')
    ],
    links: [
      { label: t('ecosystem.velvet.link1'), href: 'https://velvet.nudearts.studio', target: true }
    ]
  },
  {
    id: 'nudearts',
    category: t('ecosystem.nudearts.category'),
    title: t('ecosystem.nudearts.title'),
    text: t('ecosystem.nudearts.text'),
    features: [
      t('ecosystem.nudearts.feature1'),
      t('ecosystem.nudearts.feature2'),
      t('ecosystem.nudearts.feature3')
    ],
    links: [
      { label: t('ecosystem.nudearts.link1'), href: 'https://nudearts.studio', target: true }
    ]
  },
  {
    id: 'fastchange',
    category: t('ecosystem.fastchange.category'),
    title: t('ecosystem.fastchange.title'),
    text: t('ecosystem.fastchange.text'),
    features: [
      t('ecosystem.fastchange.feature1'),
      t('ecosystem.fastchange.feature2'),
      t('ecosystem.fastchange.feature3')
    ],
    links: [
      { label: t('ecosystem.fastchange.link1'), href: 'https://fastchange.exchange', target: true }
    ]
  },
  {
    id: 'quickybet',
    category: t('ecosystem.quickybet.category'),
    title: t('ecosystem.quickybet.title'),
    text: t('ecosystem.quickybet.text'),
    features: [
      t('ecosystem.quickybet.feature1'),
      t('ecosystem.quickybet.feature2'),
      t('ecosystem.quickybet.feature3')
    ],
    links: [
      { label: t('ecosystem.quickybet.link1'), href: 'https://quickybet.net', target: true }
    ]
  },
  {
    id: 'alicante',
    category: t('ecosystem.alicante.category'),
    title: t('ecosystem.alicante.title'),
    text: t('ecosystem.alicante.text'),
    features: [
      t('ecosystem.alicante.feature1'),
      t('ecosystem.alicante.feature2'),
      t('ecosystem.alicante.feature3')
    ],
    links: [
      { label: t('ecosystem.alicante.link1'), href: 'https://alicante.guide', target: true }
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
        <div class="section-header text-center max-w-3xl mx-auto mb-20">
          <span class="section-tagline text-xs font-bold uppercase tracking-widest text-[#00bed6] mb-3 block">{{ t('ecosystem.activeProjects') }}</span>
          <h1 class="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-800 dark:text-slate-50 tracking-tight">
            {{ t('ecosystem.title') }}
          </h1>
          <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('ecosystem.projectsDesc') }}
          </p>
        </div>
        
        <!-- Projects List -->
        <div class="projects-list flex flex-col gap-16">
          <ProjectCard 
            v-for="(project, index) in projects" 
            :key="project.id" 
            :project="project" 
            :index="index" 
          />
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>
