<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
const { t } = useTranslate()

useHead({
  title: computed(() => `${t('nav.ecosystem')} | Kristal Teknoloji`),
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
  /*
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
  */
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

let revealObserver = null
onMounted(() => {
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
  }
})

onUnmounted(() => {
  if (revealObserver) revealObserver.disconnect()
})
</script>

<template>
  <div class="app-layout min-h-dvh text-[#0f141a] dark:text-[#f2f5f8] font-sans antialiased">
    <BgMesh />
    <AppHeader />

    <main id="main-content" tabindex="-1" class="pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-10 border-b border-[#808284]/20 gap-8">
          <div class="max-w-3xl">
            <div class="kt-badge mb-5">
              <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
              {{ t('ecosystem.activeProjects') }}
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold text-[#0f141a] dark:text-white tracking-tight mb-5">
              {{ t('ecosystem.title') }}
            </h1>
            <p class="text-base sm:text-lg text-[#52565b] dark:text-[#9ea2a8] leading-relaxed">
              {{ t('ecosystem.projectsDesc') }}
            </p>
          </div>

          <div class="kt-panel rounded-2xl px-5 py-4 flex items-center gap-4 shrink-0 self-start md:self-auto">
            <BrandEmblem className="w-8 h-8" />
            <div class="font-mono text-xs">
              <div class="text-[#808284]">ACTIVE VENTURES</div>
              <div class="text-base font-bold text-[#0f141a] dark:text-white tabular-nums">
                0{{ projects.length }} // LIVE
              </div>
            </div>
          </div>
        </div>

        <!-- Projects List -->
        <div class="projects-list flex flex-col gap-10">
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
