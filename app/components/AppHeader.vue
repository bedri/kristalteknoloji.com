<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: entry)')) {
    isScrolled.value = window.scrollY > 50
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const { locale, setLocale } = useLocale()
const { t } = useTranslate()

const navLinks = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.about'), to: '/biz-kimiz' },
  { label: t('nav.ecosystem'), to: '/projeler' },
  { label: t('nav.lab'), to: '/laboratuvar' },
  { label: t('nav.contact'), to: '/iletisim' }
])

const route = useRoute()
const activeLink = computed(() => route.path)
</script>

<template>
  <header 
    id="main-header"
    class="main-header fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 border-b border-transparent"
    :class="{ 'scrolled bg-white/92 dark:bg-slate-900/92 backdrop-blur-xl border-slate-800/10 dark:border-slate-200/10 py-3 shadow-sm': isScrolled }"
  >
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <NuxtLink to="/" class="logo-link flex items-center h-9 transition-transform duration-200 hover:scale-[1.02]" aria-label="Kristal Teknoloji Anasayfa">
        <!-- Brand SVG Logo -->
        <svg class="h-full w-auto max-w-[200px]" xmlns="http://www.w3.org/2000/svg" viewBox="125 100 345 62">
          <!-- "kristal" in brand cyan -->
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 144.34375 146.726562 L 134.59375 133.300781 L 144.34375 119.875 L 150.746094 119.875 L 141 133.300781 L 150.746094 146.726562 Z M 132.574219 146.726562 L 127.410156 146.726562 L 127.410156 112.648438 L 132.574219 112.648438 Z M 132.574219 146.726562 "/>
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 161.488281 128.21875 L 161.488281 146.726562 L 156.324219 146.726562 L 156.324219 119.835938 L 161.488281 119.835938 L 161.488281 120.910156 C 163.609375 119.53125 166.015625 118.84375 168.714844 118.84375 L 168.714844 124.007812 C 166.429688 124.007812 164.488281 124.804688 162.890625 126.402344 C 162.3125 126.980469 161.84375 127.585938 161.488281 128.21875 "/>
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 179.042969 146.726562 L 173.878906 146.726562 L 173.878906 119.875 L 179.042969 119.875 Z M 179.042969 116.777344 L 173.878906 116.777344 L 173.878906 111.613281 L 179.042969 111.613281 Z M 179.042969 116.777344 "/>
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 188.871094 141.148438 C 191.1875 142.113281 193.320312 142.59375 195.273438 142.59375 C 197.203125 142.59375 198.683594 142.320312 199.714844 141.769531 C 200.75 141.21875 201.265625 140.515625 201.265625 139.664062 C 201.265625 138.917969 201.011719 138.277344 200.5 137.742188 C 199.992188 137.203125 199.308594 136.824219 198.457031 136.605469 L 192.878906 135.117188 C 190.675781 134.539062 188.96875 133.550781 187.757812 132.144531 C 186.546875 130.738281 185.941406 129.046875 185.941406 127.0625 C 185.941406 124.804688 186.835938 122.886719 188.625 121.300781 C 190.414062 119.71875 192.742188 118.898438 195.605469 118.84375 C 199.296875 118.84375 202.683594 119.917969 205.765625 122.066406 L 202.339844 125.988281 C 200.082031 124.667969 197.863281 124.007812 195.6875 124.007812 C 194.3125 124.035156 193.210938 124.34375 192.382812 124.9375 C 191.558594 125.527344 191.144531 126.25 191.144531 127.105469 C 191.144531 127.847656 191.425781 128.460938 191.425781 128.941406 C 192.554688 129.425781 193.347656 129.816406 194.367188 130.121094 L 200.148438 131.691406 C 202.132812 132.214844 203.710938 133.171875 204.878906 134.5625 C 206.050781 135.953125 206.632812 137.679688 206.632812 139.746094 C 206.632812 142.03125 205.707031 143.9375 203.847656 145.464844 C 201.988281 146.996094 199.144531 147.757812 195.316406 147.757812 C 192.148438 147.757812 188.941406 146.917969 185.691406 145.238281 Z M 188.871094 141.148438 "/>
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 213.121094 112.648438 L 218.285156 112.648438 L 218.285156 119.875 L 222.414062 119.875 L 222.414062 125.039062 L 218.285156 125.039062 L 218.285156 146.726562 L 213.121094 146.726562 Z M 213.121094 112.648438 "/>
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 248.230469 137.597656 L 248.230469 129.003906 C 247.789062 128.179688 247.226562 127.421875 246.539062 126.734375 C 244.71875 124.914062 242.53125 124.007812 239.972656 124.007812 C 237.410156 124.007812 235.21875 124.914062 233.402344 126.734375 C 231.585938 128.550781 230.675781 130.738281 230.675781 133.300781 C 230.675781 135.863281 231.585938 138.050781 233.402344 139.867188 C 235.21875 141.6875 237.410156 142.597656 239.972656 142.597656 C 242.53125 142.597656 244.71875 141.6875 246.539062 139.867188 C 247.226562 139.179688 247.789062 138.421875 248.230469 137.597656 M 248.230469 145.195312 C 245.835938 146.902344 243.082031 147.757812 239.972656 147.757812 C 235.976562 147.757812 232.570312 146.347656 229.746094 143.523438 C 226.921875 140.703125 225.511719 137.292969 225.511719 133.300781 C 225.511719 129.308594 226.921875 125.902344 229.746094 123.078125 C 232.570312 120.253906 235.976562 118.84375 239.972656 118.84375 C 243.082031 118.84375 245.835938 119.695312 248.230469 121.40625 L 248.230469 119.875 L 253.394531 119.875 L 253.394531 146.726562 L 248.230469 146.726562 Z M 248.230469 145.195312 "/>
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 266.820312 146.726562 L 261.65625 146.726562 L 261.65625 112.648438 L 266.820312 112.648438 Z M 266.820312 146.726562 "/>
          
          <!-- "teknoloji" in brand gray/white -->
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 275.082031 112.648438 L 278.179688 112.648438 L 278.179688 119.875 L 282.308594 119.875 L 282.308594 122.972656 L 278.179688 122.972656 L 278.179688 146.726562 L 275.082031 146.726562 Z M 275.082031 112.648438 "/>
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 306.761719 124.253906 C 304.78125 122.710938 302.480469 121.941406 299.867188 121.941406 C 296.726562 121.941406 294.046875 123.050781 291.828125 125.265625 C 289.613281 127.484375 288.503906 130.164062 288.503906 133.300781 C 288.503906 135.917969 289.273438 138.214844 290.820312 140.199219 Z M 293.007812 142.386719 C 294.992188 143.902344 297.277344 144.660156 299.867188 144.660156 C 303.003906 144.660156 305.6875 143.542969 307.917969 141.3125 L 310.109375 143.503906 C 307.273438 146.339844 303.855469 147.757812 299.867188 147.757812 C 295.871094 147.757812 292.464844 146.347656 289.640625 143.523438 C 286.816406 140.703125 285.40625 137.292969 285.40625 133.300781 C 285.40625 129.308594 286.816406 125.902344 289.640625 123.078125 C 292.464844 120.253906 295.871094 118.84375 299.867188 118.84375 C 303.855469 118.84375 307.273438 120.246094 310.109375 123.054688 C 310.464844 123.441406 310.8125 123.839844 311.144531 124.253906 Z M 293.007812 142.386719 "/>
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 335.96875 119.875 L 326.21875 133.300781 L 335.96875 146.726562 L 332.125 146.726562 L 322.378906 133.300781 L 332.125 119.875 Z M 320.515625 146.726562 L 317.417969 146.726562 L 317.417969 112.648438 L 320.515625 112.648438 Z M 320.515625 146.726562 "/>
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 345.300781 127.683594 L 345.300781 146.726562 L 342.203125 146.726562 L 342.203125 119.875 L 345.300781 119.875 L 345.300781 122.5625 C 347.890625 120.082031 350.988281 118.84375 354.597656 118.84375 C 358.3125 118.84375 361.480469 120.152344 364.097656 122.765625 C 366.710938 125.382812 368.019531 128.550781 368.019531 132.265625 L 368.019531 146.726562 L 364.921875 146.726562 L 364.921875 132.265625 C 364.921875 129.40625 363.917969 126.96875 361.90625 124.957031 C 359.898438 122.945312 357.460938 121.941406 354.597656 121.941406 C 351.730469 121.941406 349.296875 122.945312 347.285156 124.957031 C 346.457031 125.785156 345.796875 126.691406 345.300781 127.683594 "/>
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 411.390625 146.726562 L 408.292969 146.726562 L 408.292969 112.648438 L 411.390625 112.648438 Z M 411.390625 146.726562 "/>
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 455.796875 115.746094 L 452.699219 115.746094 L 452.699219 111.613281 L 455.796875 111.613281 Z M 452.699219 146.726562 L 452.699219 119.875 L 455.796875 119.875 L 455.796875 146.726562 C 455.796875 150.441406 454.488281 153.609375 451.875 156.226562 C 449.253906 158.84375 446.089844 160.152344 442.371094 160.152344 L 442.371094 157.054688 C 445.234375 157.054688 447.675781 156.046875 449.683594 154.035156 C 451.695312 152.027344 452.699219 149.589844 452.699219 146.726562 "/>
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 467.152344 146.726562 L 464.054688 146.726562 L 464.054688 119.875 L 467.152344 119.875 Z M 467.152344 115.746094 L 464.054688 115.746094 L 464.054688 111.613281 L 467.152344 111.613281 Z M 467.152344 115.746094 "/>
          
          <!-- First 'o' in "teknoloji" -->
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 397.863281 123.078125 C 395.5625 120.777344 392.867188 119.429688 389.789062 119.003906 L 389.789062 122.171875 C 392.015625 122.574219 393.988281 123.578125 395.675781 125.265625 C 397.890625 127.484375 399 130.164062 399 133.300781 C 399 136.441406 397.890625 139.121094 395.675781 141.335938 C 393.457031 143.550781 390.78125 144.660156 387.640625 144.660156 C 384.5 144.660156 381.820312 143.550781 379.609375 141.335938 C 377.390625 139.121094 376.28125 136.441406 376.28125 133.300781 C 376.28125 130.164062 377.390625 127.484375 379.609375 125.265625 C 381.292969 123.578125 383.269531 122.574219 385.492188 122.171875 L 385.492188 119.003906 C 382.414062 119.429688 379.71875 120.777344 377.417969 123.078125 C 374.59375 125.902344 373.183594 129.308594 373.183594 133.300781 C 373.183594 137.292969 374.59375 140.703125 377.417969 143.523438 C 380.238281 146.347656 383.648438 147.757812 387.640625 147.757812 C 391.632812 147.757812 395.042969 146.347656 397.863281 143.523438 C 400.6875 140.703125 402.097656 137.292969 402.097656 133.300781 C 402.097656 129.308594 400.6875 125.902344 397.863281 123.078125 "/>
          
          <!-- Second 'o' in "teknoloji" -->
          <path class="fill-[#808284] dark:fill-[#d1d5db] transition-colors duration-300" fill-rule="nonzero" d="M 442.269531 123.078125 C 439.96875 120.777344 437.269531 119.429688 434.195312 119.003906 L 434.195312 122.171875 C 436.417969 122.574219 438.390625 123.578125 440.078125 125.265625 C 442.292969 127.484375 443.402344 130.164062 443.402344 133.300781 C 443.402344 136.441406 442.292969 139.121094 440.078125 141.335938 C 437.863281 143.550781 435.183594 144.660156 432.042969 144.660156 C 428.90625 144.660156 426.226562 143.550781 424.011719 141.335938 C 421.792969 139.121094 420.683594 136.441406 420.683594 133.300781 C 420.683594 130.164062 421.792969 127.484375 424.011719 125.265625 C 425.699219 123.578125 427.671875 122.574219 429.894531 122.171875 L 429.894531 119.003906 C 426.816406 119.429688 424.121094 120.777344 421.820312 123.078125 C 419 125.902344 417.585938 129.308594 417.585938 133.300781 C 417.585938 137.292969 419 140.703125 421.820312 143.523438 C 424.644531 146.347656 428.050781 147.757812 432.042969 147.757812 C 436.035156 147.757812 439.445312 146.347656 442.269531 143.523438 C 445.089844 140.703125 446.503906 137.292969 446.503906 133.300781 C 446.503906 129.308594 445.089844 125.902344 442.269531 123.078125 "/>
          
          <!-- First 'o' tree circuit details in cyan -->
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 397.753906 109.609375 L 394.363281 109.609375 L 394.363281 112.195312 L 392.949219 113.628906 L 388.328125 113.632812 L 388.328125 111.550781 C 388.328125 111.394531 388.269531 111.25 388.160156 111.136719 L 384.820312 107.792969 L 384.820312 105.3125 L 385.964844 105.3125 L 385.964844 101.921875 L 382.570312 101.921875 L 382.570312 105.3125 L 383.652344 105.3125 L 383.652344 108.035156 C 383.652344 108.1875 383.710938 108.335938 383.824219 108.449219 L 387.160156 111.792969 L 387.160156 115.835938 L 384.148438 112.832031 C 384.042969 112.722656 383.894531 112.664062 383.734375 112.664062 L 381.289062 112.679688 L 381.289062 111.59375 L 377.894531 111.59375 L 377.894531 114.988281 L 381.289062 114.988281 L 381.289062 113.851562 L 383.496094 113.835938 L 387.160156 117.492188 L 387.160156 131.878906 C 386.515625 132.117188 386.050781 132.730469 386.050781 133.460938 C 386.050781 134.394531 386.808594 135.148438 387.746094 135.148438 C 388.679688 135.148438 389.4375 134.394531 389.4375 133.460938 C 389.4375 132.730469 388.972656 132.117188 388.328125 131.878906 L 388.328125 114.804688 L 393.195312 114.800781 C 393.347656 114.800781 393.492188 114.742188 393.609375 114.628906 L 395.210938 113 L 397.753906 113 Z M 397.753906 109.609375 "/>
          
          <!-- Second 'o' tree circuit details in cyan -->
          <path class="fill-[#00bed6]" fill-rule="nonzero" d="M 442.15625 109.609375 L 438.765625 109.609375 L 438.765625 112.195312 L 437.351562 113.628906 L 432.734375 113.632812 L 432.734375 111.550781 C 432.734375 111.394531 432.671875 111.25 432.5625 111.136719 L 429.226562 107.792969 L 429.226562 105.3125 L 430.367188 105.3125 L 430.367188 101.921875 L 426.976562 101.921875 L 426.976562 105.3125 L 428.054688 105.3125 L 428.054688 108.035156 C 428.054688 108.1875 428.113281 108.335938 428.226562 108.449219 L 431.5625 111.792969 L 431.5625 115.835938 L 428.550781 112.832031 C 428.445312 112.722656 428.296875 112.664062 428.136719 112.664062 L 425.691406 112.679688 L 425.691406 111.59375 L 422.296875 111.59375 L 422.296875 114.988281 L 425.691406 114.988281 L 425.691406 113.851562 L 427.898438 113.835938 L 431.5625 117.492188 L 431.5625 131.878906 C 430.917969 132.117188 430.457031 132.730469 430.457031 133.460938 C 430.457031 134.394531 431.214844 135.148438 432.148438 135.148438 C 433.082031 135.148438 433.839844 134.394531 433.839844 133.460938 C 433.839844 132.730469 433.378906 132.117188 432.734375 131.878906 L 432.734375 114.804688 L 437.597656 114.800781 C 437.753906 114.800781 437.898438 114.742188 438.011719 114.628906 L 439.613281 113 L 442.15625 113 Z M 442.15625 109.609375 "/>
        </svg>
      </NuxtLink>
      
      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center">
        <ul class="flex gap-8 items-center">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink 
              :to="link.to" 
              class="nav-link text-sm font-medium relative py-1 transition-colors duration-300"
              :class="activeLink === link.to ? 'text-[#00bed6]' : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'"
            >
              {{ link.label }}
              <span 
                class="absolute bottom-0 left-0 h-[2px] bg-[#00bed6] transition-all duration-300"
                :class="activeLink === link.to ? 'w-full' : 'w-0'"
              ></span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      
      <!-- Actions -->
      <div class="flex items-center gap-4">
        <!-- Language Switcher -->
        <div class="flex bg-slate-200/50 dark:bg-slate-800/40 rounded-full p-0.5 border border-slate-300/40 dark:border-slate-700/30 text-[10px] font-extrabold uppercase tracking-wide">
          <button 
            class="px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer"
            :class="locale === 'tr' ? 'bg-white dark:bg-slate-700 text-[#00bed6] shadow-sm' : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
            @click="setLocale('tr')"
          >
            TR
          </button>
          <button 
            class="px-2 py-0.5 rounded-full transition-all duration-200 cursor-pointer"
            :class="locale === 'en' ? 'bg-white dark:bg-slate-700 text-[#00bed6] shadow-sm' : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>

        <!-- Theme Toggle -->
        <ClientOnly>
          <button
            :aria-label="t('nav.lang')"
            class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 border border-slate-300/60 dark:border-slate-700 bg-white/20 dark:bg-slate-800/60 hover:bg-white/40 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm"
            @click="isDark = !isDark"
          >
            <!-- Sun Icon (when isDark is true / Dark Mode) -->
            <svg v-if="isDark" class="w-5 h-5 text-amber-500 fill-amber-500/25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- Moon Icon (when isDark is false / Light Mode) -->
            <svg v-else class="w-5 h-5 text-cyan-500 fill-cyan-500/25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <template #fallback>
            <div class="w-10 h-10 rounded-full border border-slate-300/60 dark:border-slate-700 bg-white/20 dark:bg-slate-800/60 shadow-sm animate-pulse"></div>
          </template>
        </ClientOnly>
        
        <!-- Mobile Toggle Button -->
        <button
          aria-label="Menüyü Aç"
          class="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 border border-slate-300/60 dark:border-slate-700 bg-white/20 dark:bg-slate-800/60 hover:bg-white/40 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm"
          @click="isMobileMenuOpen = true"
        >
          <svg class="w-5 h-5 text-slate-600 dark:text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer using Nuxt UI USlideover -->
    <USlideover v-model:open="isMobileMenuOpen" side="right" class="z-[100]">
      <template #content>
        <div class="p-6 flex flex-col h-full bg-white dark:bg-slate-900 backdrop-blur-md">
          <div class="flex justify-between items-center mb-10">
            <div class="text-lg font-bold text-slate-800 dark:text-slate-100 font-heading">{{ t('nav.menu') }}</div>
            <button
              :aria-label="t('nav.close')"
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              @click="isMobileMenuOpen = false"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav class="flex-grow">
            <ul class="flex flex-col gap-6">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink 
                  :to="link.to" 
                  class="block text-lg font-semibold py-2 transition-colors duration-300"
                  :class="activeLink === link.to ? 'text-[#00bed6]' : 'text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'"
                  @click="isMobileMenuOpen = false"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
          
          <div class="pt-6 border-t border-slate-800/10 dark:border-slate-200/10 text-xs text-slate-400">
            &copy; 2026 Kristal Teknoloji. [A28]
          </div>
        </div>
      </template>
    </USlideover>
  </header>
</template>

<style scoped>
/* Scoped custom logic for CSS scroll Timeline shrink, if supported */
@supports ((animation-timeline: scroll()) and (animation-range: entry)) {
  .main-header {
    animation: shrink-nav-dark linear both;
    animation-timeline: scroll(y);
    animation-range: 0 80px;
  }

  :global(html.light) .main-header {
    animation: shrink-nav-light linear both;
    animation-timeline: scroll(y);
    animation-range: 0 80px;
  }
}

@keyframes shrink-nav-dark {
  to {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    background-color: rgba(15, 23, 42, 0.92);
    backdrop-filter: blur(24px);
    border-bottom-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
}

@keyframes shrink-nav-light {
  to {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(24px);
    border-bottom-color: rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
}
</style>
