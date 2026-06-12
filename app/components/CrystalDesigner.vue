<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const { t } = useTranslate()

const facets = ref(6)
const refraction = ref(1.5)
const rotationSpeed = ref(1.0)

const colors = [
  { name: 'Cyan', hex: '#00bed6', rgb: { r: 0, g: 190, b: 214 } },
  { name: 'Amber', hex: '#f59e0b', rgb: { r: 245, g: 158, b: 11 } },
  { name: 'Rose', hex: '#ec4899', rgb: { r: 236, g: 72, b: 153 } },
  { name: 'Violet', hex: '#8b5cf6', rgb: { r: 139, g: 92, b: 246 } }
]

const activeColor = ref(colors[0])

const canvasEl = ref(null)
let animationFrameId = null

let rotX = 0.5
let rotY = 0.3
let rotZ = 0.1
let isDragging = false
let previousMousePosition = { x: 0, y: 0 }

// Helper to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 190, b: 214 }
}

const selectColor = (color) => {
  activeColor.value = color
}

const crystallize = () => {
  // Momentarily speed up rotation to simulate crystallization energy
  const origSpeed = rotationSpeed.value
  rotationSpeed.value = 8.0
  setTimeout(() => {
    rotationSpeed.value = origSpeed
  }, 800)
}

// 3D Point Rotation Matrix
const rotatePoint = (p, angleX, angleY, angleZ) => {
  let x = p[0], y = p[1], z = p[2]
  
  // Rotate Y (yaw)
  let cosY = Math.cos(angleY), sinY = Math.sin(angleY)
  let x1 = x * cosY + z * sinY
  let z1 = -x * sinY + z * cosY
  
  // Rotate X (pitch)
  let cosX = Math.cos(angleX), sinX = Math.sin(angleX)
  let y2 = y * cosX - z1 * sinX
  let z2 = y * sinX + z1 * cosX
  
  // Rotate Z (roll)
  let cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ)
  let x3 = x1 * cosZ - y2 * sinZ
  let y3 = x1 * sinZ + y2 * cosZ
  
  return [x3, y3, z2]
}

const render = () => {
  const canvas = canvasEl.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  
  ctx.clearRect(0, 0, width, height)
  
  const scale = 100
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
  
  // Projection helper
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
  // Top pyramid faces
  for (let i = 0; i < facetsVal; i++) {
    const idx1 = 2 + i
    const idx2 = 2 + ((i + 1) % facetsVal)
    faces.push({ indices: [0, idx1, idx2] })
  }
  // Bottom pyramid faces
  for (let i = 0; i < facetsVal; i++) {
    const idx1 = 2 + i
    const idx2 = 2 + ((i + 1) % facetsVal)
    faces.push({ indices: [1, idx2, idx1] }) // reversed to point normal outward
  }

  // Lighting calculations
  const L = [0.379, 0.53, -0.758] // Normalized light direction
  const processedFaces = []
  
  faces.forEach(face => {
    const p1 = rotatedVertices[face.indices[0]]
    const p2 = rotatedVertices[face.indices[1]]
    const p3 = rotatedVertices[face.indices[2]]
    
    const proj1 = projectedVertices[face.indices[0]]
    const proj2 = projectedVertices[face.indices[1]]
    const proj3 = projectedVertices[face.indices[2]]
    
    // 2D Signed Area check for Backface Culling
    const signedArea = (proj2[0] - proj1[0]) * (proj3[1] - proj1[1]) - (proj2[1] - proj1[1]) * (proj3[0] - proj1[0])
    const isVisible = signedArea < 0
    
    if (isVisible) {
      // Calculate 3D normal
      const v1 = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]]
      const v2 = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]]
      
      const nx = v1[1] * v2[2] - v1[2] * v2[1]
      const ny = v1[2] * v2[0] - v1[0] * v2[2]
      const nz = v1[0] * v2[1] - v1[1] * v2[0]
      
      const len = Math.sqrt(nx*nx + ny*ny + nz*nz)
      const norm = len > 0 ? [nx/len, ny/len, nz/len] : [0, 0, -1]
      
      const dotProduct = norm[0] * L[0] + norm[1] * L[1] + norm[2] * L[2]
      const intensity = Math.max(0.12, (dotProduct + 1) / 2)
      const avgZ = (proj1[2] + proj2[2] + proj3[2]) / 3
      
      processedFaces.push({
        proj: [proj1, proj2, proj3],
        intensity,
        avgZ
      })
    }
  })
  
  // Painter's sorting algorithm (back to front)
  processedFaces.sort((a, b) => b.avgZ - a.avgZ)
  
  // Draw Solid Glass Faces
  processedFaces.forEach(f => {
    const points = f.proj
    const intensity = f.intensity
    const rgb = activeColor.value.rgb
    
    let finalColor
    if (intensity > 0.5) {
      const factor = (intensity - 0.5) * 2 * 0.4
      const r = Math.round(rgb.r + (255 - rgb.r) * factor)
      const g = Math.round(rgb.g + (255 - rgb.g) * factor)
      const b = Math.round(rgb.b + (255 - rgb.b) * factor)
      finalColor = `rgba(${r}, ${g}, ${b}, 0.72)`
    } else {
      const factor = (0.5 - intensity) * 2 * 0.5
      const r = Math.round(rgb.r * (1 - factor))
      const g = Math.round(rgb.g * (1 - factor))
      const b = Math.round(rgb.b * (1 - factor))
      finalColor = `rgba(${r}, ${g}, ${b}, 0.75)`
    }
    
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    ctx.lineTo(points[1][0], points[1][1])
    ctx.lineTo(points[2][0], points[2][1])
    ctx.closePath()
    
    ctx.fillStyle = finalColor
    ctx.fill()
    
    ctx.lineWidth = 1.0
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + (intensity * 0.2)})`
    ctx.stroke()
  })

  // Draw Inner Refracted Crystal (Wireframe Outline)
  const innerScale = 0.58 / refractionVal
  const rotatedInnerVertices = vertices.map(v => {
    const scaledV = [v[0] * innerScale, v[1] * innerScale, v[2] * innerScale]
    return rotatePoint(scaledV, rotX * 0.9, rotY * 1.1, rotZ)
  })
  const projectedInnerVertices = rotatedInnerVertices.map(project)
  
  ctx.lineWidth = 0.8
  ctx.strokeStyle = `rgba(${activeColor.value.rgb.r}, ${activeColor.value.rgb.g}, ${activeColor.value.rgb.b}, 0.45)`
  
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

// Mouse / Touch drag handlers
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
  if (!isDragging) {
    rotY += 0.006 * rotationSpeed.value
    rotZ += 0.002 * rotationSpeed.value
  }
  render()
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mouseup', handleMouseUpOrEnd)
  window.addEventListener('touchend', handleMouseUpOrEnd)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mouseup', handleMouseUpOrEnd)
  window.removeEventListener('touchend', handleMouseUpOrEnd)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div class="designer-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
    <div class="designer-canvas-wrapper flex items-center justify-center bg-slate-800/5 dark:bg-black/20 border border-slate-800/10 dark:border-slate-200/10 rounded-3xl aspect-square overflow-hidden p-6">
      <canvas 
        ref="canvasEl" 
        width="400" 
        height="400"
        class="max-w-full h-auto rounded-xl cursor-grab active:cursor-grabbing"
        @mousedown="handleMouseDown"
        @touchstart="handleTouchStart"
        @mousemove="handleMouseMove"
        @touchmove="handleTouchMove"
      ></canvas>
    </div>
    
    <div class="designer-controls flex flex-col gap-6">
      <div>
        <h3 class="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-2">{{ t('lab.designer.paramsTitle') }}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('lab.designer.paramsDesc') }}</p>
      </div>
      
      <!-- Sliders using Nuxt UI USlider -->
      <div class="control-group flex flex-col gap-2">
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{{ t('lab.designer.facetsLabel') }}</span>
          <span class="text-[#00bed6]">{{ facets }}</span>
        </div>
        <USlider v-model="facets" :min="3" :max="12" color="primary" />
      </div>
      
      <div class="control-group flex flex-col gap-2">
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{{ t('lab.designer.refractionLabel') }}</span>
          <span class="text-[#00bed6]">{{ refraction.toFixed(1) }}</span>
        </div>
        <USlider v-model="refraction" :min="1.0" :max="2.5" :step="0.1" color="primary" />
      </div>
      
      <div class="control-group flex flex-col gap-2">
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{{ t('lab.designer.rotationSpeedLabel') }}</span>
          <span class="text-[#00bed6]">{{ rotationSpeed.toFixed(1) }}</span>
        </div>
        <USlider v-model="rotationSpeed" :min="0" :max="3" :step="0.2" color="primary" />
      </div>
      
      <!-- Color Palette selectors -->
      <div class="control-group flex flex-col gap-2">
        <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('lab.designer.colorLabel') }}</span>
        <div class="color-palette-selectors flex gap-3">
          <button 
            v-for="color in colors" 
            :key="color.hex"
            class="color-dot w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-200 hover:scale-110"
            :class="activeColor.hex === color.hex ? 'border-slate-800 dark:border-slate-100 scale-105' : 'border-transparent'"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
            @click="selectColor(color)"
          ></button>
        </div>
      </div>
      
      <UButton 
        :label="t('lab.designer.crystallizeBtn')" 
        size="lg"
        class="rounded-full shadow-md mt-4 justify-center bg-[#00bed6] hover:bg-[#00d2ec] text-slate-900 font-semibold"
        @click="crystallize"
      />
    </div>
  </div>
</template>
