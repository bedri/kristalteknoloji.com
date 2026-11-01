<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { t, locale } = useTranslate()

const facets = ref(6)
const refraction = ref(1.5)
const rotationSpeed = ref(1.0)

// Strictly aligned to the Kristal Teknoloji logo & optical crystal spectrum
const colors = [
  { name: 'Kristal Cyan (#00BED6)', hex: '#00bed6', rgb: { r: 0, g: 190, b: 214 } },
  { name: 'Buzul Cyan (#97D1DC)', hex: '#97d1dc', rgb: { r: 151, g: 209, b: 220 } },
  { name: 'Derin Spektrum (#008FA3)', hex: '#008fa3', rgb: { r: 0, g: 143, b: 163 } },
  { name: 'Titanyum Gri (#808284)', hex: '#808284', rgb: { r: 128, g: 130, b: 132 } }
]

const activeColor = ref(colors[0])

const canvasEl = ref(null)
const containerEl = ref(null)
let animationFrameId = null
let isLoopRunning = false
let intersectionObserver = null

let rotX = 0.5
let rotY = 0.3
let rotZ = 0.1
let isDragging = false
let previousMousePosition = { x: 0, y: 0 }

const selectColor = (color) => {
  activeColor.value = color
  if (!isLoopRunning) render()
}

const crystallize = () => {
  const origSpeed = rotationSpeed.value
  rotationSpeed.value = 8.0
  setTimeout(() => {
    rotationSpeed.value = origSpeed
  }, 800)
}

// 3D Point Rotation Matrix
const rotatePoint = (p, angleX, angleY, angleZ) => {
  const x = p[0], y = p[1], z = p[2]

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

const render = () => {
  const canvas = canvasEl.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  const scale = 104
  const heightScale = scale * 1.5
  const radiusScale = scale
  const facetsVal = facets.value
  const refractionVal = refraction.value

  // Create Vertices
  const vertices = []
  const topVertex = [0, heightScale, 0]
  const bottomVertex = [0, -heightScale, 0]

  vertices.push(topVertex) // 0
  vertices.push(bottomVertex) // 1

  for (let i = 0; i < facetsVal; i++) {
    const a = (2 * Math.PI * i) / facetsVal
    vertices.push([radiusScale * Math.cos(a), 0, radiusScale * Math.sin(a)])
  }

  // Rotate and Project Vertices
  const rotatedVertices = vertices.map(v => rotatePoint(v, rotX, rotY, rotZ))

  const focalLength = 320
  const zOffset = 300
  const project = (v) => {
    const x = v[0]
    const y = v[1]
    const z = v[2]
    const projX = (x * focalLength) / (z + zOffset) + width / 2
    const projY = (y * focalLength) / (z + zOffset) + height / 2
    return [projX, projY, z]
  }

  const projectedVertices = rotatedVertices.map(project)

  // Generate Faces (Triangles)
  const faces = []
  for (let i = 0; i < facetsVal; i++) {
    const idx1 = 2 + i
    const idx2 = 2 + ((i + 1) % facetsVal)
    faces.push({ indices: [0, idx1, idx2] })
  }
  for (let i = 0; i < facetsVal; i++) {
    const idx1 = 2 + i
    const idx2 = 2 + ((i + 1) % facetsVal)
    faces.push({ indices: [1, idx2, idx1] })
  }

  // Lighting calculations
  const L = [0.379, 0.53, -0.758]
  const processedFaces = []

  faces.forEach(face => {
    const p1 = rotatedVertices[face.indices[0]]
    const p2 = rotatedVertices[face.indices[1]]
    const p3 = rotatedVertices[face.indices[2]]

    const proj1 = projectedVertices[face.indices[0]]
    const proj2 = projectedVertices[face.indices[1]]
    const proj3 = projectedVertices[face.indices[2]]

    const signedArea = (proj2[0] - proj1[0]) * (proj3[1] - proj1[1]) - (proj2[1] - proj1[1]) * (proj3[0] - proj1[0])
    const isVisible = signedArea < 0

    if (isVisible) {
      const v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]]
      const v2 = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]]

      const nx = v1[1] * v2[2] - v1[2] * v2[1]
      const ny = v1[2] * v2[0] - v1[0] * v2[2]
      const nz = v1[0] * v2[1] - v1[1] * v2[0]

      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
      const norm = len > 0 ? [nx / len, ny / len, nz / len] : [0, 0, -1]

      const dotProduct = norm[0] * L[0] + norm[1] * L[1] + norm[2] * L[2]
      const intensity = Math.max(0.14, (dotProduct + 1) / 2)
      const avgZ = (proj1[2] + proj2[2] + proj3[2]) / 3

      processedFaces.push({
        proj: [proj1, proj2, proj3],
        intensity,
        avgZ
      })
    }
  })

  processedFaces.sort((a, b) => b.avgZ - a.avgZ)

  // Draw Solid Glass Faces
  processedFaces.forEach(f => {
    const points = f.proj
    const intensity = f.intensity
    const rgb = activeColor.value.rgb

    let finalColor
    if (intensity > 0.5) {
      const factor = (intensity - 0.5) * 2 * 0.42
      const r = Math.round(rgb.r + (255 - rgb.r) * factor)
      const g = Math.round(rgb.g + (255 - rgb.g) * factor)
      const b = Math.round(rgb.b + (255 - rgb.b) * factor)
      finalColor = `rgba(${r}, ${g}, ${b}, 0.74)`
    } else {
      const factor = (0.5 - intensity) * 2 * 0.48
      const r = Math.round(rgb.r * (1 - factor))
      const g = Math.round(rgb.g * (1 - factor))
      const b = Math.round(rgb.b * (1 - factor))
      finalColor = `rgba(${r}, ${g}, ${b}, 0.78)`
    }

    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    ctx.lineTo(points[1][0], points[1][1])
    ctx.lineTo(points[2][0], points[2][1])
    ctx.closePath()

    ctx.fillStyle = finalColor
    ctx.fill()

    ctx.lineWidth = 1.0
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 + (intensity * 0.25)})`
    ctx.stroke()
  })

  // Draw Inner Refracted Crystal (Wireframe Outline)
  const innerScale = 0.58 / refractionVal
  const rotatedInnerVertices = vertices.map(v => {
    const scaledV = [v[0] * innerScale, v[1] * innerScale, v[2] * innerScale]
    return rotatePoint(scaledV, rotX * 0.9, rotY * 1.1, rotZ)
  })
  const projectedInnerVertices = rotatedInnerVertices.map(project)

  ctx.lineWidth = 0.9
  ctx.strokeStyle = `rgba(${activeColor.value.rgb.r}, ${activeColor.value.rgb.g}, ${activeColor.value.rgb.b}, 0.5)`

  for (let i = 0; i < facetsVal; i++) {
    const idx1 = 2 + i
    const idx2 = 2 + ((i + 1) % facetsVal)

    ctx.beginPath()
    ctx.moveTo(projectedInnerVertices[0][0], projectedInnerVertices[0][1])
    ctx.lineTo(projectedInnerVertices[idx1][0], projectedInnerVertices[idx1][1])
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(projectedInnerVertices[idx1][0], projectedInnerVertices[idx1][1])
    ctx.lineTo(projectedInnerVertices[idx2][0], projectedInnerVertices[idx2][1])
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(projectedInnerVertices[1][0], projectedInnerVertices[1][1])
    ctx.lineTo(projectedInnerVertices[idx1][0], projectedInnerVertices[idx1][1])
    ctx.stroke()
  }
}

const handleMouseDown = (e) => {
  isDragging = true
  previousMousePosition = { x: e.clientX, y: e.clientY }
}

const handleTouchStart = (e) => {
  if (e.touches.length === 1) {
    isDragging = true
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
}

const handleMouseMove = (e) => {
  if (!isDragging) return
  const deltaX = e.clientX - previousMousePosition.x
  const deltaY = e.clientY - previousMousePosition.y
  rotY += deltaX * 0.007
  rotX += deltaY * 0.007
  previousMousePosition = { x: e.clientX, y: e.clientY }
}

const handleTouchMove = (e) => {
  if (!isDragging || e.touches.length !== 1) return
  const deltaX = e.touches[0].clientX - previousMousePosition.x
  const deltaY = e.touches[0].clientY - previousMousePosition.y
  rotY += deltaX * 0.007
  rotX += deltaY * 0.007
  previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
}

const handleMouseUpOrEnd = () => {
  isDragging = false
}

const animate = () => {
  if (!isLoopRunning) return
  if (!isDragging) {
    rotY += 0.006 * rotationSpeed.value
    rotZ += 0.002 * rotationSpeed.value
  }
  render()
  animationFrameId = requestAnimationFrame(animate)
}

const startLoop = () => {
  if (isLoopRunning) return
  isLoopRunning = true
  animationFrameId = requestAnimationFrame(animate)
}

const stopLoop = () => {
  isLoopRunning = false
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const handleVisibilityAutoState = (e) => {
  if (e.skipped) stopLoop()
  else startLoop()
}

onMounted(() => {
  window.addEventListener('mouseup', handleMouseUpOrEnd)
  window.addEventListener('touchend', handleMouseUpOrEnd)
  startLoop()

  if (containerEl.value) {
    containerEl.value.addEventListener('contentvisibilityautostatechange', handleVisibilityAutoState)
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) startLoop()
          else stopLoop()
        })
      })
      intersectionObserver.observe(containerEl.value)
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('mouseup', handleMouseUpOrEnd)
  window.removeEventListener('touchend', handleMouseUpOrEnd)
  stopLoop()
  if (containerEl.value) {
    containerEl.value.removeEventListener('contentvisibilityautostatechange', handleVisibilityAutoState)
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }
})
</script>

<template>
  <div ref="containerEl" class="designer-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
    <!-- CAD / Optical Viewport -->
    <div class="lg:col-span-7 relative flex flex-col justify-between bg-slate-900/[0.03] dark:bg-[#050911] border border-slate-300/70 dark:border-slate-800/80 rounded-2xl aspect-square sm:aspect-[4/3] overflow-hidden p-5">
      <!-- Top Telemetry Bar -->
      <div class="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#808284] border-b border-slate-200/70 dark:border-slate-800/80 pb-3">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#00bed6]"></span>
          <span class="font-bold text-slate-700 dark:text-slate-300">VIEWPORT // BIPYRAMID-LATTICE</span>
        </div>
        <span>HEX: <strong class="text-[#00bed6]">{{ activeColor.hex.toUpperCase() }}</strong></span>
      </div>

      <!-- Canvas -->
      <div class="relative flex-1 flex items-center justify-center my-2">
        <canvas
          ref="canvasEl"
          width="400"
          height="400"
          class="max-w-full max-h-[340px] w-auto h-auto cursor-grab active:cursor-grabbing select-none"
          @mousedown="handleMouseDown"
          @touchstart.passive="handleTouchStart"
          @mousemove="handleMouseMove"
          @touchmove.passive="handleTouchMove"
        ></canvas>
      </div>

      <!-- Bottom Telemetry Readout -->
      <div class="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 font-mono text-[11px]">
        <div>
          <span class="text-[#808284] block text-[9px] uppercase">VERTICES / FACES</span>
          <span class="font-bold text-slate-800 dark:text-slate-200">{{ facets + 2 }}V / {{ facets * 2 }}F</span>
        </div>
        <div>
          <span class="text-[#808284] block text-[9px] uppercase">REFRACTION (n)</span>
          <span class="font-bold text-[#00bed6]">{{ refraction.toFixed(2) }}</span>
        </div>
        <div class="text-right">
          <span class="text-[#808284] block text-[9px] uppercase">ANGULAR VEL.</span>
          <span class="font-bold text-slate-800 dark:text-slate-200">{{ rotationSpeed.toFixed(1) }} rad/s</span>
        </div>
      </div>
    </div>

    <!-- Parameter Controls -->
    <div class="lg:col-span-5 designer-controls flex flex-col gap-6">
      <div class="border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00bed6] block mb-1.5">
          OPTICAL CAD CONTROLS
        </span>
        <h3 class="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
          {{ t('lab.designer.paramsTitle') }}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {{ t('lab.designer.paramsDesc') }}
        </p>
      </div>

      <!-- Facets Slider -->
      <div class="control-group flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{{ t('lab.designer.facetsLabel') }}</span>
          <span class="font-mono font-bold px-2 py-0.5 rounded bg-[#00bed6]/10 text-[#00bed6]">{{ facets }}</span>
        </div>
        <USlider v-model="facets" :min="3" :max="12" color="primary" />
      </div>

      <!-- Refraction Slider -->
      <div class="control-group flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{{ t('lab.designer.refractionLabel') }}</span>
          <span class="font-mono font-bold px-2 py-0.5 rounded bg-[#00bed6]/10 text-[#00bed6]">{{ refraction.toFixed(1) }}</span>
        </div>
        <USlider v-model="refraction" :min="1.0" :max="2.5" :step="0.1" color="primary" />
      </div>

      <!-- Rotation Speed Slider -->
      <div class="control-group flex flex-col gap-2">
        <div class="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{{ t('lab.designer.rotationSpeedLabel') }}</span>
          <span class="font-mono font-bold px-2 py-0.5 rounded bg-[#00bed6]/10 text-[#00bed6]">{{ rotationSpeed.toFixed(1) }}</span>
        </div>
        <USlider v-model="rotationSpeed" :min="0" :max="3" :step="0.2" color="primary" />
      </div>

      <!-- Corporate Brand Spectrum Selectors -->
      <div class="control-group flex flex-col gap-2.5 pt-1">
        <div class="flex justify-between items-center">
          <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('lab.designer.colorLabel') }}</span>
          <span class="text-[11px] font-mono text-[#808284]">{{ activeColor.name }}</span>
        </div>
        <div class="color-palette-selectors grid grid-cols-4 gap-2.5">
          <button
            v-for="color in colors"
            :key="color.hex"
            type="button"
            class="h-10 rounded-xl cursor-pointer border-2 transition-all duration-200 flex items-center justify-center"
            :class="activeColor.hex === color.hex ? 'border-slate-900 dark:border-white scale-[1.03] shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
            :aria-label="color.name"
            @click="selectColor(color)"
          >
            <span v-if="activeColor.hex === color.hex" class="w-2 h-2 rounded-full bg-white shadow"></span>
          </button>
        </div>
      </div>

      <button
        type="button"
        class="kt-btn-primary w-full mt-2"
        @click="crystallize"
      >
        <UIcon name="i-heroicons-sparkles-20-solid" class="w-4 h-4" />
        <span>{{ t('lab.designer.crystallizeBtn') }}</span>
      </button>
    </div>
  </div>
</template>
