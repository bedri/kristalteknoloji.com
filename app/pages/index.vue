<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const { t } = useTranslate()

useHead({
  title: computed(() => `Kristal Teknoloji | ${t('home.title')}`),
  meta: [
    { name: 'description', content: computed(() => t('home.description')) }
  ]
})

// Interactive 3D Crystalline Core Canvas
const heroSectionEl = ref(null)
const heroCanvasEl = ref(null)
let heroFrameId = null
let isHeroRunning = false
let rotX = 0.45
let rotY = 0.35
let rotZ = 0.1
let isDragging = false
let prevPointer = { x: 0, y: 0 }

const rotatePoint = (p, angleX, angleY, angleZ) => {
  const [x, y, z] = p
  const cosY = Math.cos(angleY), sinY = Math.sin(angleY)
  const x1 = x * cosY + z * sinY
  const z1 = -x * sinY + z * cosY

  const cosX = Math.cos(angleX), sinX = Math.sin(angleX)
  const y2 = y * cosX - z1 * sinX
  const z2 = y * sinX + z1 * cosX

  const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ)
  const x3 = x1 * cosZ - y2 * sinZ
  const y3 = x1 * sinZ + y2 * cosZ
  return [x3, y3, z2]
}

const renderHeroCrystal = () => {
  const canvas = heroCanvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  const scale = 92
  const heightScale = scale * 1.48
  const radiusScale = scale
  const facets = 6

  const vertices = [[0, heightScale, 0], [0, -heightScale, 0]]
  for (let i = 0; i < facets; i++) {
    const a = (2 * Math.PI * i) / facets
    vertices.push([radiusScale * Math.cos(a), 0, radiusScale * Math.sin(a)])
  }

  const rotated = vertices.map(v => rotatePoint(v, rotX, rotY, rotZ))

  const focalLength = 340
  const zOffset = 310
  const project = (v) => [
    (v[0] * focalLength) / (v[2] + zOffset) + width / 2,
    (v[1] * focalLength) / (v[2] + zOffset) + height / 2,
    v[2]
  ]
  const projected = rotated.map(project)

  const faces = []
  for (let i = 0; i < facets; i++) {
    faces.push({ indices: [0, 2 + i, 2 + ((i + 1) % facets)] })
    faces.push({ indices: [1, 2 + ((i + 1) % facets), 2 + i] })
  }

  const L = [0.379, 0.53, -0.758]
  const processed = []

  faces.forEach(face => {
    const p1 = rotated[face.indices[0]]
    const p2 = rotated[face.indices[1]]
    const p3 = rotated[face.indices[2]]
    const proj1 = projected[face.indices[0]]
    const proj2 = projected[face.indices[1]]
    const proj3 = projected[face.indices[2]]

    const signedArea = (proj2[0] - proj1[0]) * (proj3[1] - proj1[1]) - (proj2[1] - proj1[1]) * (proj3[0] - proj1[0])
    if (signedArea < 0) {
      const v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]]
      const v2 = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]]
      const nx = v1[1] * v2[2] - v1[2] * v2[1]
      const ny = v1[2] * v2[0] - v1[0] * v2[2]
      const nz = v1[0] * v2[1] - v1[1] * v2[0]
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
      const norm = len > 0 ? [nx / len, ny / len, nz / len] : [0, 0, -1]
      const intensity = Math.max(0.15, (norm[0] * L[0] + norm[1] * L[1] + norm[2] * L[2] + 1) / 2)
      processed.push({ proj: [proj1, proj2, proj3], intensity, avgZ: (proj1[2] + proj2[2] + proj3[2]) / 3 })
    }
  })

  processed.sort((a, b) => b.avgZ - a.avgZ)

  // Brand Cyan (#00bed6 -> r:0, g:190, b:214) & Titanium (#808284)
  const baseColorRGB = { r: 0, g: 190, b: 214 }
  processed.forEach(f => {
    const points = f.proj
    const intensity = f.intensity
    let fill
    if (intensity > 0.5) {
      const factor = (intensity - 0.5) * 2 * 0.42
      fill = `rgba(${Math.round(baseColorRGB.r + (255 - baseColorRGB.r) * factor)}, ${Math.round(baseColorRGB.g + (255 - baseColorRGB.g) * factor)}, ${Math.round(baseColorRGB.b + (255 - baseColorRGB.b) * factor)}, 0.74)`
    } else {
      const factor = (0.5 - intensity) * 2 * 0.52
      fill = `rgba(${Math.round(baseColorRGB.r * (1 - factor))}, ${Math.round(baseColorRGB.g * (1 - factor))}, ${Math.round(baseColorRGB.b * (1 - factor))}, 0.78)`
    }
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    ctx.lineTo(points[1][0], points[1][1])
    ctx.lineTo(points[2][0], points[2][1])
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.fill()
    ctx.lineWidth = 1.1
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 + intensity * 0.25})`
    ctx.stroke()
  })

  // Inner Crystalline Lattice Wireframe
  const innerScale = 0.54
  const innerRotated = vertices.map(v => {
    const scaled = [v[0] * innerScale, v[1] * innerScale, v[2] * innerScale]
    return rotatePoint(scaled, rotX * 0.9, rotY * 1.15, rotZ)
  })
  const innerProjected = innerRotated.map(project)
  ctx.lineWidth = 0.9
  ctx.strokeStyle = 'rgba(151, 209, 220, 0.55)'
  for (let i = 0; i < facets; i++) {
    const idx1 = 2 + i
    const idx2 = 2 + ((i + 1) % facets)
    ctx.beginPath()
    ctx.moveTo(innerProjected[0][0], innerProjected[0][1])
    ctx.lineTo(innerProjected[idx1][0], innerProjected[idx1][1])
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(innerProjected[idx1][0], innerProjected[idx1][1])
    ctx.lineTo(innerProjected[idx2][0], innerProjected[idx2][1])
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(innerProjected[1][0], innerProjected[1][1])
    ctx.lineTo(innerProjected[idx1][0], innerProjected[idx1][1])
    ctx.stroke()
  }
}

const animateHero = () => {
  if (!isHeroRunning) return
  if (!isDragging) {
    rotY += 0.0055
    rotZ += 0.0018
  }
  renderHeroCrystal()
  heroFrameId = requestAnimationFrame(animateHero)
}

const startHeroLoop = () => {
  if (isHeroRunning) return
  isHeroRunning = true
  animateHero()
}

const stopHeroLoop = () => {
  isHeroRunning = false
  if (heroFrameId) {
    cancelAnimationFrame(heroFrameId)
    heroFrameId = null
  }
}

const onPointerDown = (e) => {
  isDragging = true
  prevPointer = { x: e.clientX, y: e.clientY }
}

const onPointerMove = (e) => {
  if (!isDragging) return
  const dx = e.clientX - prevPointer.x
  const dy = e.clientY - prevPointer.y
  rotY += dx * 0.007
  rotX += dy * 0.007
  prevPointer = { x: e.clientX, y: e.clientY }
}

const onPointerUp = () => {
  isDragging = false
}

const handleVisibilityState = (event) => {
  if (event.skipped) {
    stopHeroLoop()
  } else {
    startHeroLoop()
  }
}

const networkMetrics = computed(() => [
  {
    code: 'METRIC // 01',
    value: '210M',
    unit: 'KRISTA',
    label: t('home.circulatingSupply'),
    sub: t('home.hardcap')
  },
  {
    code: 'METRIC // 02',
    value: '11 + 1',
    unit: 'NODES',
    label: t('home.masternodes'),
    sub: t('home.masternodeCollateral')
  },
  {
    code: 'METRIC // 03',
    value: '30s',
    unit: 'FINALITY',
    label: t('home.tps'),
    sub: t('home.blockSpacing')
  },
  {
    code: 'METRIC // 04',
    value: '0.00',
    unit: 'GAS FEE',
    label: t('home.mescal.title'),
    sub: t('home.tagline')
  }
])

const coreTechnologies = computed(() => [
  {
    code: 'ARCH // 01',
    tag: 'VRF + X11KVS (13 ALGO)',
    title: t('home.adam.title'),
    desc: t('home.adam.desc'),
    to: '/laboratuvar'
  },
  {
    code: 'ARCH // 02',
    tag: 'BLS12-381 / SECP256K1',
    title: t('home.pobls.title'),
    desc: t('home.pobls.desc'),
    to: '/laboratuvar'
  },
  {
    code: 'ARCH // 03',
    tag: 'GASLESS CSCRIPT SANDBOX',
    title: t('home.mescal.title'),
    desc: t('home.mescal.desc'),
    to: '/laboratuvar'
  }
])

const divisions = computed(() => [
  {
    code: '01',
    title: t('home.teaserAboutTitle'),
    desc: t('home.teaserAboutDesc'),
    btn: t('home.teaserAboutBtn'),
    to: '/biz-kimiz',
    icon: 'about'
  },
  {
    code: '02',
    title: t('home.teaserProjectsTitle'),
    desc: t('home.teaserProjectsDesc'),
    btn: t('home.teaserProjectsBtn'),
    to: '/projeler',
    icon: 'projects'
  },
  {
    code: '03',
    title: t('home.teaserLabTitle'),
    desc: t('home.teaserLabDesc'),
    btn: t('home.teaserLabBtn'),
    to: '/laboratuvar',
    icon: 'lab'
  },
  {
    code: '04',
    title: t('home.teaserContactTitle'),
    desc: t('home.teaserContactDesc'),
    btn: t('home.teaserContactBtn'),
    to: '/iletisim',
    icon: 'contact'
  }
])

let revealObserver = null
let heroVisibilityObserver = null

onMounted(() => {
  startHeroLoop()
  window.addEventListener('pointerup', onPointerUp)

  if (heroSectionEl.value) {
    heroSectionEl.value.addEventListener('contentvisibilityautostatechange', handleVisibilityState)
    if (!('contentVisibility' in document.documentElement.style)) {
      heroVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) startHeroLoop()
          else stopHeroLoop()
        })
      }, { rootMargin: '200px' })
      heroVisibilityObserver.observe(heroSectionEl.value)
    }
  }

  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
  }
})

onUnmounted(() => {
  stopHeroLoop()
  window.removeEventListener('pointerup', onPointerUp)
  if (heroSectionEl.value) {
    heroSectionEl.value.removeEventListener('contentvisibilityautostatechange', handleVisibilityState)
  }
  if (revealObserver) revealObserver.disconnect()
  if (heroVisibilityObserver) heroVisibilityObserver.disconnect()
})
</script>

<template>
  <div class="app-layout min-h-dvh text-[#0f141a] dark:text-[#f2f5f8] font-sans antialiased">
    <BgMesh />
    <AppHeader />

    <main id="main-content" tabindex="-1">
      <!-- ================================================================
           1. EXECUTIVE HERO SECTION
           ================================================================ -->
      <section
        id="home"
        ref="heroSectionEl"
        class="hero-section relative min-h-dvh flex items-center pt-28 pb-16 overflow-hidden"
      >
        <div class="max-w-7xl mx-auto px-6 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <!-- Hero Corporate Narrative -->
            <div class="flex flex-col items-start text-left">
              <div class="kt-badge mb-6">
                <span class="w-2 h-2 rounded-full bg-[#00bed6]" aria-hidden="true"></span>
                <span>{{ t('home.heroBadge') }}</span>
                <span class="text-[#808284]">|</span>
                <span class="text-[#808284] dark:text-[#c4c7cc]">{{ t('home.tagline') }}</span>
              </div>

              <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#0f141a] dark:text-white mb-6">
                {{ t('home.heroTitleStart') }}
                <span class="text-[#00bed6] block sm:inline">
                  {{ t('home.heroTitleSpan') }}
                </span>
                {{ t('home.heroTitleEnd') }}
              </h1>

              <p class="text-base sm:text-lg text-[#52565b] dark:text-[#9ea2a8] mb-4 max-w-2xl leading-relaxed">
                {{ t('home.heroDesc') }}
              </p>

              <p class="text-sm text-[#808284] dark:text-[#808284] mb-9 max-w-xl leading-relaxed border-s-2 border-[#00bed6]/50 ps-4">
                {{ t('home.description') }}
              </p>

              <div class="flex flex-wrap items-center gap-4">
                <NuxtLink to="/projeler" class="kt-btn-primary">
                  <span>{{ t('home.exploreProjectsBtn') }}</span>
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </NuxtLink>

                <NuxtLink to="/laboratuvar" class="kt-btn-secondary">
                  <BrandEmblem className="w-5 h-5" />
                  <span>{{ t('home.sandboxLabBtn') }}</span>
                </NuxtLink>
              </div>
            </div>

            <!-- Hero Architectural Crystalline Telemetry Frame -->
            <div class="hero-visual relative w-full max-w-[460px] mx-auto">
              <div class="kt-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <!-- Technical Frame Header -->
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-[#808284]/15 font-mono text-[11px] text-[#808284]">
                  <span class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#00bed6]" aria-hidden="true"></span>
                    KRISTAL // LATTICE-CORE
                  </span>
                  <span class="text-[#00bed6]">SHA-256 DETERMINISTIC</span>
                </div>

                <!-- 3D Interactive Canvas Container -->
                <div class="relative aspect-square w-full flex items-center justify-center">
                  <!-- Subtle Concentric Technical Rings -->
                  <div class="absolute w-[82%] h-[82%] rounded-full border border-dashed border-[#808284]/25 pointer-events-none"></div>
                  <div class="absolute w-[62%] h-[62%] rounded-full border border-[#00bed6]/20 pointer-events-none"></div>
                  <div class="absolute w-[220px] h-[220px] rounded-full bg-[#00bed6]/10 blur-2xl pointer-events-none"></div>

                  <canvas
                    ref="heroCanvasEl"
                    width="340"
                    height="340"
                    class="relative z-10 max-w-full h-auto cursor-grab active:cursor-grabbing touch-none"
                    aria-label="3D Kristal Mimari Modeli"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove"
                  ></canvas>
                </div>

                <!-- Technical Frame Footer -->
                <div class="flex items-center justify-between pt-4 mt-4 border-t border-[#808284]/15 font-mono text-[11px] text-[#808284]">
                  <span>PROTOCOL: ADAM + PoBLS</span>
                  <span class="text-[#0f141a] dark:text-[#c4c7cc]">360° INTERACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ============================================================
               2. INSTITUTIONAL & NETWORK METRICS BAR
               ============================================================ -->
          <div class="mt-16 pt-10 border-t border-[#808284]/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div
              v-for="metric in networkMetrics"
              :key="metric.code"
              class="kt-panel rounded-2xl p-6 flex flex-col justify-between gap-3"
            >
              <div class="flex items-center justify-between font-mono text-[11px] text-[#808284]">
                <span>{{ metric.code }}</span>
                <span class="px-2 py-0.5 rounded bg-[#00bed6]/10 text-[#00bed6] font-semibold">{{ metric.unit }}</span>
              </div>
              <div class="text-3xl font-bold tracking-tight text-[#0f141a] dark:text-white font-mono tabular-nums">
                {{ metric.value }}
              </div>
              <div>
                <div class="text-xs font-bold uppercase tracking-wider text-[#0f141a] dark:text-[#f2f5f8]">
                  {{ metric.label }}
                </div>
                <div class="text-xs text-[#808284] mt-0.5">
                  {{ metric.sub }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================
           3. CORE ENGINEERING & BLOCKCHAIN ARCHITECTURE SECTION
           ================================================================ -->
      <section class="py-24 border-t border-[#808284]/20 cv-auto">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div class="max-w-2xl">
              <div class="kt-badge mb-4">
                <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
                {{ t('home.coreTechTitle') }}
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-[#0f141a] dark:text-white">
                {{ t('home.title') }}
              </h2>
              <p class="text-base text-[#52565b] dark:text-[#9ea2a8] mt-3">
                {{ t('home.coreTechSubtitle') }}
              </p>
            </div>
            <NuxtLink to="/laboratuvar" class="kt-btn-secondary self-start md:self-auto shrink-0">
              <span>{{ t('home.viewTechBtn') }}</span>
              <svg class="w-4 h-4 text-[#00bed6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NuxtLink>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article
              v-for="tech in coreTechnologies"
              :key="tech.code"
              class="kt-panel kt-panel-interactive rounded-2xl p-8 flex flex-col justify-between reveal"
            >
              <div>
                <div class="flex items-center justify-between pb-5 mb-6 border-b border-[#808284]/15 font-mono text-xs">
                  <span class="text-[#808284]">{{ tech.code }}</span>
                  <span class="text-[#00bed6] font-semibold">{{ tech.tag }}</span>
                </div>

                <h3 class="text-xl font-bold text-[#0f141a] dark:text-white mb-4 flex items-center gap-3">
                  <span class="w-2 h-5 bg-[#00bed6] rounded-xs shrink-0" aria-hidden="true"></span>
                  {{ tech.title }}
                </h3>

                <p class="text-sm text-[#52565b] dark:text-[#9ea2a8] leading-relaxed mb-8">
                  {{ tech.desc }}
                </p>
              </div>

              <div class="pt-4 border-t border-[#808284]/15 flex items-center justify-between">
                <NuxtLink
                  :to="tech.to"
                  class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00bed6] hover:underline"
                >
                  <span>{{ t('home.viewTechBtn') }}</span>
                  <span aria-hidden="true">→</span>
                </NuxtLink>
                <BrandEmblem className="w-6 h-6 opacity-60" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ================================================================
           4. CORPORATE DIVISIONS & ECOSYSTEM NAVIGATION
           ================================================================ -->
      <section class="py-24 border-t border-[#808284]/20 cv-auto">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <div class="kt-badge mb-4">
              <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
              {{ t('home.teaserTagline') }}
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-[#0f141a] dark:text-white mb-4">
              {{ t('home.teaserTitle') }}
            </h2>
            <p class="text-base text-[#52565b] dark:text-[#9ea2a8]">
              {{ t('home.teaserSubtitle') }}
            </p>
          </div>

          <div class="divisions-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <NuxtLink
              v-for="item in divisions"
              :key="item.code"
              :to="item.to"
              class="kt-panel kt-panel-interactive rounded-2xl p-8 flex flex-col justify-between group reveal"
            >
              <div>
                <div class="flex items-center justify-between mb-6">
                  <!-- Strictly On-Brand Cyan & Titanium Icon Box -->
                  <div class="w-12 h-12 rounded-xl bg-[#00bed6]/10 border border-[#00bed6]/25 flex items-center justify-center text-[#00bed6] group-hover:bg-[#00bed6] group-hover:text-[#061014] transition-colors duration-200">
                    <!-- About Icon -->
                    <svg v-if="item.icon === 'about'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <!-- Projects Icon -->
                    <svg v-else-if="item.icon === 'projects'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <!-- Lab Icon -->
                    <svg v-else-if="item.icon === 'lab'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <!-- Contact Icon -->
                    <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <span class="font-mono text-xs font-bold text-[#808284] group-hover:text-[#00bed6] transition-colors">
                    BÖLÜM // {{ item.code }}
                  </span>
                </div>

                <h3 class="text-xl font-bold text-[#0f141a] dark:text-white mb-3 group-hover:text-[#00bed6] transition-colors">
                  {{ item.title }}
                </h3>

                <p class="text-sm text-[#52565b] dark:text-[#9ea2a8] leading-relaxed mb-6">
                  {{ item.desc }}
                </p>
              </div>

              <div class="pt-4 border-t border-[#808284]/15 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#00bed6]">
                <span>{{ item.btn }}</span>
                <span class="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
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
      animation-range: entry 8% entry 40%;
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
