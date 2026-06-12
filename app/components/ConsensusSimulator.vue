<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const currentBlockHeight = ref(350)
const currentTargetSeed = ref('0x762ee7ab...')
const simStep = ref(0)
const logs = ref([])
const logContainer = ref(null)

const nodeNames = [
  'KristalNode-Alpha', 'Nebula-Base', 'Velvet-Gate-03',
  'KristaNode-Delta', 'Iceberg-MN', 'Prism-Düğüm-06',
  'Quantum-V', 'Horizon-Valid', 'Aurora-MN',
  'Cobalt-Link-10', 'Vertex-Validator'
]

const validators = ref(
  nodeNames.map((name, i) => ({
    id: i,
    name,
    role: 'Masternode',
    ticket: 'Uptime: OK',
    distance: null,
    isActive: false,
    isWinner: false
  }))
)

const steps = [
  { id: 0, label: '1. ADAM Seçim Katmanı' },
  { id: 1, label: '2. PoBLS Biletleri Dağıtımı' },
  { id: 2, label: '3. XOR Mesafeleri Ölçümü' },
  { id: 3, label: '4. Blok Proposer Belirlenmesi' }
]

let simInterval = null

const generateRandomSeed = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return '0x' + result + '...'
}

const addLog = (message, type = 'system') => {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.push({
    time: timeStr,
    message,
    type
  })
}

// Watch logs to auto-scroll console
watch(() => logs.value.length, async () => {
  await nextTick()
  if (logContainer.value) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
})

const runSimulationStep = () => {
  switch (simStep.value) {
    case 0:
      // Reset winner state and generate new active validators
      validators.value.forEach(v => {
        v.isActive = false
        v.isWinner = false
        v.role = 'Masternode'
        v.ticket = 'Uptime: OK'
        v.distance = null
      })
      
      // Select 5 random nodes
      const selectedIndices = []
      while (selectedIndices.length < 5) {
        const idx = Math.floor(Math.random() * validators.value.length)
        if (!selectedIndices.includes(idx)) {
          selectedIndices.push(idx)
        }
      }
      
      selectedIndices.forEach(idx => {
        const v = validators.value[idx]
        v.isActive = true
        v.role = 'ADAM Doğrulayıcı'
        v.ticket = 'Bilet bekliyor...'
      })
      
      addLog('Mutabakat Çerçevesi: Uygun masternode havuzundan 5 aktif doğrulayıcı seçildi (ADAM Protokolü).', 'alert')
      simStep.value = 1
      break
      
    case 1:
      // Ephemeral ticket generation
      validators.value.forEach(v => {
        if (v.isActive) {
          const ticketVal = '0x' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0') + '...'
          v.ticket = ticketVal
        }
      })
      addLog('PoBLS Loterisi: Aktif doğrulayıcılar için ephemeral BLS loteri biletleri dağıtıldı.', 'system')
      simStep.value = 2
      break
      
    case 2:
      // Target hash and distance calculation
      currentTargetSeed.value = generateRandomSeed()
      const targetVal = parseInt(currentTargetSeed.value.replace('0x', '').replace('...', ''), 16) || 12345
      
      validators.value.forEach(v => {
        if (v.isActive) {
          const ticketNum = parseInt(v.ticket.replace('0x', '').replace('...', ''), 16) || 54321
          // Compute XOR distance
          const xorVal = ticketNum ^ targetVal
          v.distance = xorVal
        }
      })
      addLog(`Hedef Tohum T_target = ${currentTargetSeed.value} oluşturuldu. XOR mesafeleri hesaplanıyor...`, 'system')
      simStep.value = 3
      break
      
    case 3:
      // Proposer winner selection
      let winnerNode = null
      let minDistance = Infinity
      
      validators.value.forEach(v => {
        if (v.isActive && v.distance !== null) {
          if (v.distance < minDistance) {
            minDistance = v.distance
            winnerNode = v
          }
        }
      })
      
      if (winnerNode) {
        winnerNode.isWinner = true
        winnerNode.role = 'BLOK PROPOSER (KAZANAN)'
        currentBlockHeight.value++
        
        addLog(`Kazanan doğrulayıcı: <strong>${winnerNode.name}</strong> (Mesafe: 0x${minDistance.toString(16).toUpperCase()})`, 'winner')
        addLog(`Blok #${currentBlockHeight.value} başarıyla zincire eklendi. Ödüller dağıtıldı (Model D).`, 'system')
      }
      
      simStep.value = 0
      break
  }
}

onMounted(() => {
  addLog('Simülatör başlatılıyor...', 'system')
  addLog('PoBLS Kripto Loterisi simülasyonu çalışıyor.', 'system')
  runSimulationStep() // initial run
  simInterval = setInterval(runSimulationStep, 4000)
})

onUnmounted(() => {
  if (simInterval) clearInterval(simInterval)
})
</script>

<template>
  <div class="simulator-wrapper flex flex-col gap-8">
    <div class="sim-header flex justify-between items-center bg-slate-800/5 dark:bg-black/20 border border-slate-800/10 dark:border-slate-200/10 p-5 rounded-2xl font-mono text-sm flex-wrap gap-4">
      <div class="sim-block-height">
        Blok Yüksekliği: <span class="text-[#00bed6] font-bold">{{ currentBlockHeight }}</span>
      </div>
      <div class="sim-target-hash">
        Hedef Tohum (T_target): <span class="text-violet-400 font-semibold">{{ currentTargetSeed }}</span>
      </div>
    </div>
    
    <!-- Validators grid -->
    <div class="sim-nodes-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="node in validators" 
        :key="node.id"
        class="sim-node-card bg-slate-800/5 dark:bg-slate-900/20 border border-slate-800/10 dark:border-slate-200/10 rounded-2xl p-5 font-mono flex flex-col gap-2 transition-all duration-300"
        :class="{ 
          'border-amber-500/40 bg-amber-500/5': node.isActive && !node.isWinner,
          'border-[#00bed6] bg-[#00bed6]/10 shadow-[0_0_15px_rgba(0,190,214,0.2)] scale-[1.02]': node.isWinner 
        }"
      >
        <div class="node-name font-sans font-bold text-slate-800 dark:text-slate-100">{{ node.name }}</div>
        
        <div 
          class="node-role text-[10px] uppercase tracking-wider"
          :class="node.isActive ? 'text-amber-500 font-semibold' : 'text-slate-500'"
        >
          {{ node.role }}
        </div>
        
        <div class="node-ticket text-xs text-slate-400">
          <span v-if="node.isActive">
            Bilet: <span class="text-[#00bed6]">{{ node.ticket }}</span>
          </span>
          <span v-else>Uptime: OK</span>
        </div>
        
        <div 
          v-if="node.isActive && node.distance !== null" 
          class="node-distance text-xs text-slate-400 border-t border-slate-800/10 dark:border-slate-200/10 pt-2 mt-1"
        >
          XOR Mesafe: 
          <span :class="node.isWinner ? 'text-[#00bed6] font-bold' : 'text-violet-400'">
            0x{{ node.distance.toString(16).toUpperCase() }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Timeline progress -->
    <div class="sim-timeline flex justify-between gap-4 border-y border-slate-800/10 dark:border-slate-200/10 py-4 overflow-x-auto">
      <div 
        v-for="step in steps" 
        :key="step.id"
        class="timeline-step text-xs font-semibold px-4 py-2 rounded-xl border border-transparent whitespace-nowrap transition-all duration-300 text-slate-400"
        :class="{ 'bg-[#00bed6]/10 text-[#00bed6] border-[#00bed6]/20': simStep === step.id || (simStep === 0 && step.id === 3) }"
      >
        {{ step.label }}
      </div>
    </div>
    
    <!-- Log console -->
    <div class="sim-log-wrapper flex flex-col gap-3">
      <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 font-heading">Simülasyon Günlüğü</h4>
      <div 
        ref="logContainer" 
        class="sim-log bg-[#05070c] border border-slate-800/10 dark:border-slate-200/10 rounded-2xl p-6 h-[180px] overflow-y-auto font-mono text-xs text-emerald-400 flex flex-col gap-2.5"
      >
        <p 
          v-for="(log, i) in logs" 
          :key="i"
          class="log-entry leading-relaxed"
          :class="{ 
            'text-slate-400': log.type === 'system', 
            'text-amber-500': log.type === 'alert',
            'text-[#00bed6] font-bold': log.type === 'winner'
          }"
        >
          [{{ log.time }}] <span v-html="log.message"></span>
        </p>
      </div>
    </div>
  </div>
</template>
