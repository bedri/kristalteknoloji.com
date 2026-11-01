<script setup>
const { t } = useTranslate()
</script>

<template>
  <footer class="main-footer relative border-t border-[#808284]/20 bg-white/60 dark:bg-[#05080c]/90 backdrop-blur-md pt-16 pb-12 overflow-hidden">
    <!-- Subtle Top Cyan Accent Line -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00bed6]/45 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-[#808284]/15">
        <!-- Brand Column -->
        <div class="flex flex-col items-start gap-5">
          <NuxtLink to="/" aria-label="Kristal Teknoloji Anasayfa" class="inline-flex items-center">
            <BrandLogo className="h-9 w-auto" />
          </NuxtLink>
          <p class="text-sm text-[#52565b] dark:text-[#9ea2a8] max-w-sm leading-relaxed">
            {{ t('footer.tagline') }} {{ t('home.tagline') }}.
          </p>
          <div class="flex items-center gap-3 pt-1">
            <a
              href="mailto:contact@kristalteknoloji.com"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#808284]/25 bg-[#808284]/5 text-xs font-mono text-[#52565b] dark:text-[#c4c7cc] hover:border-[#00bed6] hover:text-[#00bed6] transition-colors duration-200"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-[#00bed6]" aria-hidden="true"></span>
              contact@kristalteknoloji.com
            </a>
          </div>
        </div>

        <!-- Corporate Column -->
        <div class="flex flex-col gap-4">
          <h4 class="text-xs font-bold uppercase tracking-widest text-[#0f141a] dark:text-white flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
            {{ t('footer.corporate') }}
          </h4>
          <ul class="flex flex-col gap-2.5">
            <li>
              <NuxtLink to="/" class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200">
                {{ t('nav.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/biz-kimiz" class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200">
                {{ t('nav.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projeler" class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200">
                {{ t('nav.ecosystem') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/iletisim" class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200">
                {{ t('nav.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Developer & R&D Lab Column -->
        <div class="flex flex-col gap-4">
          <h4 class="text-xs font-bold uppercase tracking-widest text-[#0f141a] dark:text-white flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
            {{ t('footer.developer') }}
          </h4>
          <ul class="flex flex-col gap-2.5">
            <li>
              <NuxtLink to="/laboratuvar" class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200">
                {{ t('lab.designerTab') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/laboratuvar" class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200">
                {{ t('lab.lotteryTab') }}
              </NuxtLink>
            </li>
            <li>
              <a
                href="https://github.com/bedri/KristaTech-KRISTA/blob/develop/doc/ADAM_Consensus.md"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200"
              >
                ADAM Consensus Docs
              </a>
            </li>
            <li>
              <a
                href="https://github.com/bedri/KristaTech-KRISTA/blob/develop/doc/MESCAL.md"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200"
              >
                MESCAL Docs
              </a>
            </li>
          </ul>
        </div>

        <!-- Ecosystem Direct Links Column -->
        <div class="flex flex-col gap-4">
          <h4 class="text-xs font-bold uppercase tracking-widest text-[#0f141a] dark:text-white flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#00bed6]" aria-hidden="true"></span>
            {{ t('ecosystem.title') }}
          </h4>
          <ul class="flex flex-col gap-2.5">
            <li>
              <a
                href="https://krista.kristalteknoloji.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200"
              >
                KristaTech Coin (KRISTA)
              </a>
            </li>
            <li>
              <a
                href="https://explorer.kristalteknoloji.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200"
              >
                {{ t('common.explorer') }}
              </a>
            </li>
            <li>
              <a
                href="https://fastchange.exchange"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[#52565b] dark:text-[#9ea2a8] hover:text-[#00bed6] transition-colors duration-200"
              >
                FastChange Exchange
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Institutional Bar -->
      <div class="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#808284]">
        <div class="flex items-center gap-3">
          <BrandEmblem className="w-6 h-6" />
          <span>&copy; {{ new Date().getFullYear() }} Kristal Teknoloji. {{ t('footer.copyright') }}</span>
        </div>
        <div class="flex items-center gap-4 font-mono text-[11px]">
          <span class="inline-flex items-center gap-1.5 text-[#52565b] dark:text-[#9ea2a8]">
            <span class="w-2 h-2 rounded-full bg-[#00bed6]" aria-hidden="true"></span>
            ADAM + PoBLS + MESCAL
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
