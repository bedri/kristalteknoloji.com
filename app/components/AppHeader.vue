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
  if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
    isScrolled.value = window.scrollY > 40
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const { locale, setLocale } = useLocale()
const { t } = useTranslate()

const navLinks = computed(() => [
  { label: t('nav.home'), to: '/', code: '01' },
  { label: t('nav.about'), to: '/biz-kimiz', code: '02' },
  { label: t('nav.ecosystem'), to: '/projeler', code: '03' },
  { label: t('nav.lab'), to: '/laboratuvar', code: '04' },
  { label: t('nav.contact'), to: '/iletisim', code: '05' }
])

const route = useRoute()
const activeLink = computed(() => route.path)
</script>

<template>
  <header
    id="main-header"
    class="main-header fixed inset-x-0 top-0 z-50 transition-all duration-300 py-5 border-b border-transparent"
    :class="{
      'scrolled bg-white/90 dark:bg-[#070b10]/90 backdrop-blur-xl border-[#808284]/20 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]': isScrolled
    }"
  >
    <a href="#main-content" class="skip-link visually-hidden">
      {{ locale === 'tr' ? 'Ana içeriğe geç' : 'Skip to main content' }}
    </a>
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center gap-6">
      <!-- Brand Identity Wordmark -->
      <NuxtLink
        to="/"
        class="logo-link flex items-center gap-3 py-1 transition-opacity duration-200 hover:opacity-90"
        aria-label="Kristal Teknoloji Anasayfa"
      >
        <BrandLogo className="h-8 md:h-9 w-auto max-w-[210px]" />
      </NuxtLink>

      <!-- Desktop Architectural Navigation -->
      <nav :aria-label="locale === 'tr' ? 'Birincil' : 'Primary'" class="hidden lg:flex items-center bg-white/70 dark:bg-[#0e1520]/80 border border-[#808284]/20 backdrop-blur-md rounded-full px-2 py-1.5 shadow-xs">
        <ul class="flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="nav-link relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
              :class="
                activeLink === link.to
                  ? 'bg-[#00bed6]/12 text-[#00bed6] shadow-[inset_0_0_0_1px_rgba(0,190,214,0.3)]'
                  : 'text-[#52565b] dark:text-[#9ea2a8] hover:text-[#0f141a] dark:hover:text-white hover:bg-[#808284]/8'
              "
            >
              <span
                v-if="activeLink === link.to"
                class="w-1.5 h-1.5 rounded-full bg-[#00bed6]"
                aria-hidden="true"
              ></span>
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Right Controls: Language, Theme, Corporate Action & Mobile Drawer -->
      <div class="flex items-center gap-3">
        <!-- Language Switcher -->
        <div
          role="group"
          :aria-label="t('nav.lang')"
          class="flex items-center bg-white/70 dark:bg-[#0e1520]/80 rounded-lg p-0.5 border border-[#808284]/25 text-[11px] font-bold tracking-wider uppercase"
        >
          <button
            type="button"
            :aria-pressed="locale === 'tr'"
            class="px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer min-h-[28px]"
            :class="
              locale === 'tr'
                ? 'bg-[#00bed6] text-[#061014] shadow-xs'
                : 'text-[#808284] hover:text-[#0f141a] dark:hover:text-white'
            "
            @click="setLocale('tr')"
          >
            TR
          </button>
          <button
            type="button"
            :aria-pressed="locale === 'en'"
            class="px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer min-h-[28px]"
            :class="
              locale === 'en'
                ? 'bg-[#00bed6] text-[#061014] shadow-xs'
                : 'text-[#808284] hover:text-[#0f141a] dark:hover:text-white'
            "
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>

        <!-- Theme Toggle (Strictly Brand Cyan & Titanium Gray) -->
        <ClientOnly>
          <button
            type="button"
            :aria-label="isDark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'"
            class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border border-[#808284]/25 bg-white/70 dark:bg-[#0e1520]/80 hover:border-[#00bed6] text-[#52565b] dark:text-[#c4c7cc] hover:text-[#00bed6] cursor-pointer"
            @click="isDark = !isDark"
          >
            <!-- Sun Icon -->
            <svg
              v-if="isDark"
              class="w-4 h-4 text-[#00bed6]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
            </svg>
            <!-- Moon Icon -->
            <svg
              v-else
              class="w-4 h-4 text-[#00bed6]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <template #fallback>
            <div class="w-9 h-9 rounded-lg border border-[#808284]/25 bg-white/50 dark:bg-[#0e1520]/50"></div>
          </template>
        </ClientOnly>

        <!-- Desktop Quick Explorer Link -->
        <a
          href="https://explorer.kristalteknoloji.com"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-[#00bed6]/35 bg-[#00bed6]/10 text-[#00bed6] hover:bg-[#00bed6] hover:text-[#061014] transition-all duration-200"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true"></span>
          {{ t('common.explorer') }}
        </a>

        <!-- Mobile Menu Trigger -->
        <button
          type="button"
          :aria-label="t('nav.menu')"
          class="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border border-[#808284]/25 bg-white/70 dark:bg-[#0e1520]/80 hover:border-[#00bed6] text-[#0f141a] dark:text-[#f2f5f8]"
          @click="isMobileMenuOpen = true"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M10 17h10" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <USlideover v-model:open="isMobileMenuOpen" side="right" class="z-[100]">
      <template #content>
        <div class="p-6 flex flex-col h-full bg-[#f7f9fb] dark:bg-[#070b10] border-s border-[#808284]/20">
          <div class="flex justify-between items-center pb-6 border-b border-[#808284]/15 mb-8">
            <BrandLogo className="h-7 w-auto" />
            <button
              type="button"
              :aria-label="t('nav.close')"
              class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border border-[#808284]/25 hover:border-[#00bed6] text-[#52565b] dark:text-[#c4c7cc]"
              @click="isMobileMenuOpen = false"
            >
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav :aria-label="locale === 'tr' ? 'Mobil' : 'Mobile'" class="flex-grow">
            <ul class="flex flex-col gap-2">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200"
                  :class="
                    activeLink === link.to
                      ? 'bg-[#00bed6]/12 text-[#00bed6] border border-[#00bed6]/30'
                      : 'text-[#52565b] dark:text-[#9ea2a8] hover:text-[#0f141a] dark:hover:text-white hover:bg-[#808284]/10 border border-transparent'
                  "
                  @click="isMobileMenuOpen = false"
                >
                  <span>{{ link.label }}</span>
                  <span class="font-mono text-xs text-[#808284]">{{ link.code }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="pt-6 border-t border-[#808284]/15 flex flex-col gap-4">
            <a
              href="https://explorer.kristalteknoloji.com"
              target="_blank"
              rel="noopener noreferrer"
              class="kt-btn-primary w-full"
            >
              {{ t('common.explorer') }}
            </a>
            <div class="flex items-center justify-between text-xs text-[#808284]">
              <span>&copy; {{ new Date().getFullYear() }} Kristal Teknoloji</span>
              <span class="font-mono text-[#00bed6]">KRISTA L1</span>
            </div>
          </div>
        </div>
      </template>
    </USlideover>
  </header>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  @supports ((animation-timeline: scroll()) and (animation-range: 0% 100%)) {
    .main-header {
      animation: shrink-header-dark auto linear both;
      animation-timeline: scroll(block root);
      animation-range: 0px 90px;
    }

    :global(html.light) .main-header {
      animation: shrink-header-light auto linear both;
      animation-timeline: scroll(block root);
      animation-range: 0px 90px;
    }
  }
}

@keyframes shrink-header-dark {
  to {
    padding-block: 0.75rem;
    background-color: rgba(7, 11, 16, 0.9);
    backdrop-filter: blur(20px);
    border-bottom-color: rgba(128, 130, 132, 0.22);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.45);
  }
}

@keyframes shrink-header-light {
  to {
    padding-block: 0.75rem;
    background-color: rgba(247, 249, 251, 0.92);
    backdrop-filter: blur(20px);
    border-bottom-color: rgba(128, 130, 132, 0.22);
    box-shadow: 0 10px 30px -10px rgba(15, 20, 26, 0.08);
  }
}
</style>
