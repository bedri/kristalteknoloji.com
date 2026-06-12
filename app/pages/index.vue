<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const { t } = useTranslate()

useHead({
  title: computed(() => `Kristal Teknoloji | ${t('about.title')}`),
  meta: [
    { name: 'description', content: computed(() => t('about.desc')) }
  ]
})

// Hero 3D Crystal Canvas Logic
const heroCanvasEl = ref(null)
let heroFrameId = null
let rotX = 0.5
let rotY = 0.3
let rotZ = 0.1

const rotatePoint = (p, angleX, angleY, angleZ) => {
  let x = p[0], y = p[1], z = p[2]
  let cosY = Math.cos(angleY), sinY = Math.sin(angleY)
  let x1 = x * cosY + z * sinY
  let z1 = -x * sinY + z * cosY
  
  let cosX = Math.cos(angleX), sinX = Math.sin(angleX)
  let y2 = y * cosX - z1 * sinX
  let z2 = y * sinX + z1 * cosX
  
  let cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ)
  let x3 = x1 * cosZ - y2 * sinZ
  let y3 = x1 * sinZ + y2 * cosZ
  return [x3, y3, z2]
}

const renderHeroCrystal = () => {
  const canvas = heroCanvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  
  ctx.clearRect(0, 0, width, height)
  
  const scale = 85
  const heightScale = scale * 1.5
  const radiusScale = scale
  const facets = 6
  
  // Vertices
  const vertices = [[0, heightScale, 0], [0, -heightScale, 0]]
  for (let i = 0; i < facets; i++) {
    const a = (2 * Math.PI * i) / facets
    vertices.push([radiusScale * Math.cos(a), 0, radiusScale * Math.sin(a)])
  }
  
  const rotated = vertices.map(v => rotatePoint(v, rotX, rotY, rotZ))
  
  const focalLength = 320
  const zOffset = 300
  const project = (v) => {
    return [
      (v[0] * focalLength) / (v[2] + zOffset) + width / 2,
      (v[1] * focalLength) / (v[2] + zOffset) + height / 2,
      v[2]
    ]
  }
  const projected = rotated.map(project)
  
  // Faces
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
      const len = Math.sqrt(nx*nx + ny*ny + nz*nz)
      const norm = len > 0 ? [nx/len, ny/len, nz/len] : [0, 0, -1]
      const intensity = Math.max(0.12, (norm[0]*L[0] + norm[1]*L[1] + norm[2]*L[2] + 1) / 2)
      processed.push({ proj: [proj1, proj2, proj3], intensity, avgZ: (proj1[2]+proj2[2]+proj3[2])/3 })
    }
  })
  
  processed.sort((a, b) => b.avgZ - a.avgZ)
  
  const baseColorRGB = { r: 0, g: 190, b: 214 } // brand cyan
  processed.forEach(f => {
    const points = f.proj
    const intensity = f.intensity
    let fill
    if (intensity > 0.5) {
      const factor = (intensity - 0.5) * 2 * 0.4
      fill = `rgba(${Math.round(baseColorRGB.r + (255 - baseColorRGB.r) * factor)}, ${Math.round(baseColorRGB.g + (255 - baseColorRGB.g) * factor)}, ${Math.round(baseColorRGB.b + (255 - baseColorRGB.b) * factor)}, 0.72)`
    } else {
      const factor = (0.5 - intensity) * 2 * 0.5
      fill = `rgba(${Math.round(baseColorRGB.r * (1 - factor))}, ${Math.round(baseColorRGB.g * (1 - factor))}, ${Math.round(baseColorRGB.b * (1 - factor))}, 0.75)`
    }
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    ctx.lineTo(points[1][0], points[1][1])
    ctx.lineTo(points[2][0], points[2][1])
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.fill()
    ctx.lineWidth = 1.0
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + (intensity * 0.2)})`
    ctx.stroke()
  })

  // Draw inner refraction wireframe
  const innerScale = 0.58 / 1.5
  const innerRotated = vertices.map(v => {
    const scaled = [v[0] * innerScale, v[1] * innerScale, v[2] * innerScale]
    return rotatePoint(scaled, rotX * 0.9, rotY * 1.1, rotZ)
  })
  const innerProjected = innerRotated.map(project)
  ctx.lineWidth = 0.8
  ctx.strokeStyle = `rgba(${baseColorRGB.r}, ${baseColorRGB.g}, ${baseColorRGB.b}, 0.45)`
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
  rotY += 0.006
  rotZ += 0.002
  renderHeroCrystal()
  heroFrameId = requestAnimationFrame(animateHero)
}

onMounted(() => {
  animateHero()
  
  // Trigger intersection reveals for browsers that don't support scroll driven CSS
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.15 })
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  }
})

onUnmounted(() => {
  if (heroFrameId) cancelAnimationFrame(heroFrameId)
})
</script>

<template>
  <div class="app-layout min-h-screen text-slate-800 dark:text-slate-100 font-sans antialiased bg-slate-50 dark:bg-slate-900/98">
    <BgMesh />
    <AppHeader />
    
    <main>
      <!-- Hero Section -->
      <section id="home" class="hero-section min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div class="hero-content flex flex-col items-start text-left">
            <div class="hero-badge text-xs font-semibold text-[#00bed6] bg-[#00bed6]/8 border border-[#00bed6]/25 px-4 py-1.5 rounded-full mb-6 shadow-sm">
              {{ t('home.heroBadge') }}
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight leading-none text-slate-800 dark:text-slate-50">
              {{ t('home.heroTitleStart') }} <br/>
              <span class="bg-gradient-to-r from-[#00bed6] to-violet-400 bg-clip-text text-fill-transparent text-transparent">{{ t('home.heroTitleSpan') }}</span> {{ t('home.heroTitleEnd') }}
            </h1>
            <p class="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              {{ t('home.heroDesc') }}
            </p>
            <div class="hero-actions flex gap-4 flex-wrap">
              <UButton 
                :label="t('home.exploreProjectsBtn')" 
                to="/projeler" 
                size="lg" 
                class="rounded-full bg-[#00bed6] hover:bg-[#00d2ec] text-slate-900 font-semibold px-6 py-3" 
              />
              <UButton 
                :label="t('home.sandboxLabBtn')" 
                to="/laboratuvar" 
                size="lg" 
                variant="outline" 
                class="rounded-full border-slate-800/10 dark:border-slate-200/20 text-slate-700 dark:text-slate-300 px-6 py-3" 
              />
            </div>
          </div>
          
          <div class="hero-visual flex items-center justify-center relative aspect-square w-full max-w-[420px] mx-auto">
            <!-- Rotating 3D crystal canvas inside glowing glow wrapper -->
            <div class="crystal-container relative w-[320px] height-[320px] flex items-center justify-center">
              <div class="crystal-glowing-backdrop absolute w-[250px] h-[250px] rounded-full bg-radial from-[#00bed6]/15 to-transparent blur-xl z-0 animate-pulse"></div>
              <canvas ref="heroCanvasEl" width="320" height="320" class="z-10 relative cursor-grab active:cursor-grabbing"></canvas>
            </div>
          </div>
        </div>
      </section>

      <!-- Teaser Cards Section -->
      <section class="teaser-section py-24 border-t border-slate-800/10 dark:border-slate-200/10">
        <div class="max-w-7xl mx-auto px-6">
          <div class="section-header text-center max-w-2xl mx-auto mb-16">
            <span class="section-tagline text-xs font-bold uppercase tracking-widest text-[#00bed6] mb-3 block">{{ t('home.teaserTagline') }}</span>
            <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-800 dark:text-slate-50">{{ t('home.teaserTitle') }}</h2>
            <p class="text-slate-500 dark:text-slate-400">
              {{ t('home.teaserSubtitle') }}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <!-- About Us Teaser -->
            <div class="teaser-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00bed6] hover:shadow-[0_10px_30px_rgba(0,190,214,0.06)] flex flex-col justify-between reveal">
              <div>
                <div class="teaser-icon w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
                  <UIcon name="i-heroicons-user-group-20-solid" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-3">{{ t('home.teaserAboutTitle') }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {{ t('home.teaserAboutDesc') }}
                </p>
              </div>
              <div>
                <UButton 
                  :label="t('home.teaserAboutBtn')" 
                  to="/biz-kimiz" 
                  variant="link" 
                  icon="i-heroicons-arrow-right-20-solid"
                  trailing
                  class="p-0 text-[#00bed6] hover:text-[#00d2ec] font-semibold"
                />
              </div>
            </div>
            
            <!-- Projects Teaser -->
            <div class="teaser-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00bed6] hover:shadow-[0_10px_30px_rgba(0,190,214,0.06)] flex flex-col justify-between reveal">
              <div>
                <div class="teaser-icon w-12 h-12 rounded-2xl bg-[#00bed6]/10 flex items-center justify-center text-[#00bed6] mb-6">
                  <UIcon name="i-heroicons-squares-2x2-20-solid" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-3">{{ t('home.teaserProjectsTitle') }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {{ t('home.teaserProjectsDesc') }}
                </p>
              </div>
              <div>
                <UButton 
                  :label="t('home.teaserProjectsBtn')" 
                  to="/projeler" 
                  variant="link" 
                  icon="i-heroicons-arrow-right-20-solid"
                  trailing
                  class="p-0 text-[#00bed6] hover:text-[#00d2ec] font-semibold"
                />
              </div>
            </div>
            
            <!-- Lab Teaser -->
            <div class="teaser-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00bed6] hover:shadow-[0_10px_30px_rgba(0,190,214,0.06)] flex flex-col justify-between reveal">
              <div>
                <div class="teaser-icon w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6">
                  <UIcon name="i-heroicons-beaker-20-solid" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-3">{{ t('home.teaserLabTitle') }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {{ t('home.teaserLabDesc') }}
                </p>
              </div>
              <div>
                <UButton 
                  :label="t('home.teaserLabBtn')" 
                  to="/laboratuvar" 
                  variant="link" 
                  icon="i-heroicons-arrow-right-20-solid"
                  trailing
                  class="p-0 text-[#00bed6] hover:text-[#00d2ec] font-semibold"
                />
              </div>
            </div>
            
            <!-- Contact Teaser -->
            <div class="teaser-card bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00bed6] hover:shadow-[0_10px_30px_rgba(0,190,214,0.06)] flex flex-col justify-between reveal">
              <div>
                <div class="teaser-icon w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500 mb-6">
                  <UIcon name="i-heroicons-envelope-20-solid" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-3">{{ t('home.teaserContactTitle') }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {{ t('home.teaserContactDesc') }}
                </p>
              </div>
              <div>
                <UButton 
                  :label="t('home.teaserContactBtn')" 
                  to="/iletisim" 
                  variant="link" 
                  icon="i-heroicons-arrow-right-20-solid"
                  trailing
                  class="p-0 text-[#00bed6] hover:text-[#00d2ec] font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <AppFooter />
  </div>
</template>

<style scoped>
/* Scoped keyframe logic for native CSS animations */
.hero-badge {
  box-shadow: 0 0 15px rgba(0, 190, 214, 0.05);
}

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
