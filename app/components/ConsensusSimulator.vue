<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { computeXorDistance, findWinningValidator } from '~/utils/consensusLogic'

const currentBlockHeight = ref(350)
const currentTargetSeed = ref('0x762ee7ab...')
const simStep = ref(0)
const logs = ref([])
const logContainer = ref(null)
const wrapperEl = ref(null)

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
  { id: 0, code: '01', label: 'ADAM Seçim Katmanı' },
  { id: 1, code: '02', label: 'PoBLS Bilet Dağıtımı' },
  { id: 2, code: '03', label: 'XOR Mesafe Ölçümü' },
  { id: 3, code: '04', label: 'Blok Proposer Seçimi' }
]

let simInterval = null
let intersectionObserver = null

const generateRandomSeed = () => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return '0x' + result + '...'
}

const addLog = (message, type = 'system', highlight = '', suffix = '') => {
  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.push({
    time: timeStr,
    message,
    highlight,
    suffix,
    type
  })
  if (logs.value.length > 40) {
    logs.value.shift()
  }
}

watch(() => logs.value.length, async () => {
  await nextTick()
  if (logContainer.value) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
})

const runSimulationStep = () => {
  switch (simStep.value) {
    case 0: {
      validators.value.forEach(v => {
        v.isActive = false
        v.isWinner = false
        v.role = 'Masternode'
        v.ticket = 'Uptime: OK'
        v.distance = null
      })

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
    }

    case 1: {
      validators.value.forEach(v => {
        if (v.isActive) {
          const ticketVal = '0x' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0') + '...'
          v.ticket = ticketVal
        }
      })
      addLog('PoBLS Loterisi: Aktif doğrulayıcılar için ephemeral BLS loteri biletleri dağıtıldı.', 'system')
      simStep.value = 2
      break
    }

    case 2: {
      currentTargetSeed.value = generateRandomSeed()

      validators.value.forEach(v => {
        if (v.isActive) {
          v.distance = computeXorDistance(v.ticket, currentTargetSeed.value)
        }
      })
      addLog(`Hedef Tohum T_target = ${currentTargetSeed.value} oluşturuldu. XOR mesafeleri hesaplanıyor...`, 'system')
      simStep.value = 3
      break
    }

    case 3: {
      const winnerNode = findWinningValidator(validators.value)

      if (winnerNode && winnerNode.distance !== null) {
        winnerNode.isWinner = true
        winnerNode.role = 'BLOK PROPOSER (KAZANAN)'
        currentBlockHeight.value++

        addLog(
          'Kazanan doğrulayıcı: ',
          'winner',
          winnerNode.name,
          ` (Mesafe: 0x${winnerNode.distance.toString(16).toUpperCase()})`
        )
        addLog(`Blok #${currentBlockHeight.value} başarıyla zincire eklendi. Ödüller dağıtıldı (Model D).`, 'system')
      }

      simStep.value = 0
      break
    }
  }
}

const startTimer = () => {
  if (simInterval) return
  simInterval = setInterval(runSimulationStep, 4000)
}

const stopTimer = () => {
  if (simInterval) {
    clearInterval(simInterval)
    simInterval = null
  }
}

const handleVisibilityAutoState = (e) => {
  if (e.skipped) stopTimer()
  else startTimer()
}

onMounted(() => {
  addLog('Simülatör başlatılıyor...', 'system')
  addLog('PoBLS Kripto Loterisi simülasyonu çalışıyor.', 'system')
  runSimulationStep()
  startTimer()

  if (wrapperEl.value) {
    wrapperEl.value.addEventListener('contentvisibilityautostatechange', handleVisibilityAutoState)
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) startTimer()
          else stopTimer()
        })
      })
      intersectionObserver.observe(wrapperEl.value)
    }
  }
})

onUnmounted(() => {
  stopTimer()
  if (wrapperEl.value) {
    wrapperEl.value.removeEventListener('contentvisibilityautostatechange', handleVisibilityAutoState)
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }
})
</script>

<template>
  <div ref="wrapperEl" class="simulator-wrapper flex flex-col gap-7">
    <!-- Top Telemetry Bar -->
    <div class="sim-header flex justify-between items-center bg-slate-900/[0.03] dark:bg-[#050911] border border-slate-300/70 dark:border-slate-800/80 p-4 sm:p-5 rounded-2xl font-mono text-xs sm:text-sm flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <span class="w-2.5 h-2.5 rounded-full bg-[#00bed6] animate-pulse" aria-hidden="true"></span>
        <div>
          <span class="text-[#808284] mr-2">BLOK YÜKSEKLİĞİ:</span>
          <span class="text-[#00bed6] font-bold">#{{ currentBlockHeight }}</span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div>
          <span class="text-[#808284] mr-2">HEDEF TOHUM (T_target):</span>
          <span class="text-slate-800 dark:text-[#97d1dc] font-bold">{{ currentTargetSeed }}</span>
        </div>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg bg-[#00bed6]/10 border border-[#00bed6]/30 text-[#00bed6] hover:bg-[#00bed6]/20 text-xs font-bold transition-colors cursor-pointer"
          @click="runSimulationStep"
        >
          Sonraki Adım →
        </button>
      </div>
    </div>

    <!-- Timeline Progress -->
    <div class="sim-timeline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div
        v-for="step in steps"
        :key="step.id"
        class="timeline-step flex items-center gap-3 px-4 py-3 rounded-xl border font-mono text-xs transition-all duration-300"
        :class="simStep === step.id || (simStep === 0 && step.id === 3)
          ? 'bg-[#00bed6]/12 text-[#00bed6] border-[#00bed6]/40 font-bold shadow-[0_0_20px_rgba(0,190,214,0.1)]'
          : 'bg-slate-900/[0.02] dark:bg-slate-900/40 text-[#808284] border-slate-200/70 dark:border-slate-800/80'"
      >
        <span class="px-1.5 py-0.5 rounded bg-[#00bed6]/10 text-[#00bed6] text-[10px] font-bold">{{ step.code }}</span>
        <span class="truncate">{{ step.label }}</span>
      </div>
    </div>

    <!-- Validators Grid -->
    <div class="sim-nodes-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
      <div
        v-for="node in validators"
        :key="node.id"
        class="sim-node-card rounded-2xl p-4 font-mono flex flex-col gap-2 transition-all duration-300 border"
        :class="[
          node.isWinner
            ? 'border-[#00bed6] bg-[#00bed6]/12 shadow-[0_0_24px_rgba(0,190,214,0.18)] scale-[1.01]'
            : node.isActive
              ? 'border-[#97d1dc]/60 dark:border-[#00bed6]/40 bg-[#00bed6]/[0.04] dark:bg-[#00bed6]/[0.06]'
              : 'border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/30 opacity-75'
        ]"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="node-name font-sans font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
            {{ node.name }}
          </div>
          <span
            class="w-2 h-2 rounded-full shrink-0"
            :class="node.isWinner ? 'bg-[#00bed6] animate-ping' : node.isActive ? 'bg-[#00bed6]' : 'bg-[#808284]/40'"
            aria-hidden="true"
          ></span>
        </div>

        <div
          class="node-role text-[10px] uppercase tracking-wider font-bold"
          :class="node.isWinner ? 'text-[#00bed6]' : node.isActive ? 'text-slate-700 dark:text-[#97d1dc]' : 'text-[#808284]'"
        >
          {{ node.role }}
        </div>

        <div class="node-ticket text-xs text-[#808284]">
          <span v-if="node.isActive">
            Bilet: <span class="text-slate-800 dark:text-slate-200 font-semibold">{{ node.ticket }}</span>
          </span>
          <span v-else>Durum: <span class="text-slate-600 dark:text-slate-400">Uptime OK</span></span>
        </div>

        <div
          v-if="node.isActive && node.distance !== null"
          class="node-distance text-xs text-[#808284] border-t border-slate-200/70 dark:border-slate-800/80 pt-2 mt-1 flex justify-between items-center"
        >
          <span>XOR:</span>
          <span :class="node.isWinner ? 'text-[#00bed6] font-bold' : 'text-slate-700 dark:text-[#97d1dc]'">
            0x{{ node.distance.toString(16).toUpperCase() }}
          </span>
        </div>
      </div>
    </div>

    <!-- Telemetry Log Console (Safe Text Interpolation — No v-html / innerHTML) -->
    <div class="sim-log-wrapper flex flex-col gap-2.5">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#808284]">
          TELEMETRY STREAM // POBLS CONSENSUS LOG
        </span>
        <span class="text-[11px] font-mono text-[#00bed6]">INTERVAL: 4000ms</span>
      </div>
      <div
        ref="logContainer"
        role="log"
        aria-live="polite"
        class="sim-log bg-[#05080f] border border-slate-800 rounded-2xl p-5 h-[180px] overflow-y-auto font-mono text-xs flex flex-col gap-2"
      >
        <p
          v-for="(log, i) in logs"
          :key="i"
          class="log-entry leading-relaxed"
          :class="{
            'text-slate-400': log.type === 'system',
            'text-[#97d1dc]': log.type === 'alert',
            'text-[#00bed6] font-bold': log.type === 'winner'
          }"
        >
          <span class="text-[#808284] mr-1.5">[{{ log.time }}]</span>
          <span>{{ log.message }}</span>
          <strong v-if="log.highlight" class="text-white">{{ log.highlight }}</strong>
          <span v-if="log.suffix">{{ log.suffix }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
