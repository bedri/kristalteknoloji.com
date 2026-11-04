<script setup>
import { ref, computed } from 'vue'

const { t, locale } = useTranslate()
const toast = useToast()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '' // Honeypot field for bot spam protection
})

const loading = ref(false)

const updateAriaInvalid = (input) => {
  if (!input || typeof input.matches !== 'function') return
  let isUserInvalid = false
  try {
    isUserInvalid = input.matches(':user-invalid')
  } catch {
    isUserInvalid = Boolean(input.validity && !input.validity.valid)
  }

  if (isUserInvalid) {
    input.setAttribute('aria-invalid', 'true')
  } else {
    input.removeAttribute('aria-invalid')
  }
}

// Validate on blur to avoid premature warnings while typing
const handleFieldBlur = (event) => {
  updateAriaInvalid(event.target)
}

// Reset error states on input as soon as the user corrects a previously invalid field
const handleFieldInput = (event) => {
  const input = event.target
  if (!input || typeof input.hasAttribute !== 'function') return
  if (input.hasAttribute('aria-invalid') && input.getAttribute('aria-invalid') === 'true') {
    updateAriaInvalid(input)
  }
}

const handleSubmit = async (event) => {
  const formEl = event.target
  if (formEl && typeof formEl.checkValidity === 'function' && !formEl.checkValidity()) {
    const firstInvalid = formEl.querySelector(':invalid')
    if (firstInvalid) {
      firstInvalid.setAttribute('aria-invalid', 'true')
      firstInvalid.focus()
    }
    return
  }

  loading.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })

    toast.add({
      title: t('contact.successTitle'),
      description: t('contact.success'),
      color: 'success',
      icon: 'i-heroicons-check-circle-20-solid'
    })

    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      website: ''
    }
  } catch (error) {
    toast.add({
      title: t('contact.errorTitle'),
      description: t('contact.errorDesc'),
      color: 'danger',
      icon: 'i-heroicons-x-circle-20-solid'
    })
  } finally {
    loading.value = false
  }
}

useHead({
  title: computed(() => `${t('nav.contact')} | Kristal Teknoloji`),
  meta: [
    { name: 'description', content: computed(() => t('contact.desc')) }
  ]
})
</script>

<template>
  <div class="app-layout min-h-screen font-sans antialiased">
    <BgMesh />
    <AppHeader />

    <main id="main-content" tabindex="-1" class="pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <!-- Corporate Contact & Partnership Channels -->
          <div class="lg:col-span-5 flex flex-col items-start text-left">
            <div class="kt-badge mb-5">
              <span class="kt-badge-dot" aria-hidden="true"></span>
              <span>{{ t('contact.tagline') }}</span>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900 dark:text-white tracking-tight">
              {{ t('contact.title') }}
            </h1>

            <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-base md:text-lg">
              {{ t('contact.desc') }}
            </p>

            <!-- Direct Corporate Channels -->
            <div class="w-full flex flex-col gap-4">
              <a
                href="mailto:contact@kristalteknoloji.com"
                class="kt-panel kt-panel-interactive rounded-2xl p-5 flex items-center gap-4 group"
              >
                <div class="w-12 h-12 rounded-xl bg-[#00bed6]/10 border border-[#00bed6]/25 flex items-center justify-center text-[#00bed6] shrink-0 group-hover:bg-[#00bed6] group-hover:text-slate-950 transition-colors">
                  <UIcon name="i-heroicons-envelope-20-solid" class="w-5 h-5" />
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-[11px] font-mono font-bold text-[#808284] uppercase tracking-wider">
                    {{ t('contact.emailLabel') }}
                  </span>
                  <span class="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#00bed6] transition-colors truncate">
                    contact@kristalteknoloji.com
                  </span>
                </div>
              </a>

              <div class="kt-panel rounded-2xl p-6 flex flex-col gap-4">
                <div class="flex items-center gap-3">
                  <BrandEmblem :size="32" />
                  <div>
                    <span class="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#00bed6] block">
                      KURUMSAL İŞ BİRLİĞİ
                    </span>
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">
                      {{ locale === 'tr' ? 'Ar-Ge & Ekosistem Entegrasyonu' : 'R&D & Ecosystem Integration' }}
                    </h2>
                  </div>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {{
                    locale === 'tr'
                      ? 'KRISTA blokzincir altyapısı, MESCAL akıllı sözleşme entegrasyonu, kurumsal doğrulayıcı düğüm (Masternode) kurulumu ve stratejik teknoloji ortaklıkları için doğrudan mühendislik ekibimizle iletişime geçebilirsiniz.'
                      : 'Connect directly with our engineering team for KRISTA blockchain infrastructure, MESCAL smart contract integration, institutional validator node deployment, and strategic technology partnerships.'
                  }}
                </p>
                <div class="pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-[#808284]">
                  <span>SLA // RESPONSE</span>
                  <span class="text-[#00bed6] font-bold">&lt; 24 HOURS</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Corporate Contact Form -->
          <div class="lg:col-span-7">
            <form
              method="POST"
              action="/api/contact"
              class="kt-panel rounded-3xl p-6 sm:p-10 flex flex-col gap-6"
              @submit.prevent="handleSubmit"
            >
              <!-- Honeypot field hidden from human users to trap automated spam bots -->
              <div class="visually-hidden" aria-hidden="true">
                <label for="website">Website</label>
                <input
                  id="website"
                  v-model="form.website"
                  type="text"
                  name="website"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <div class="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
                <div>
                  <span class="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#00bed6] block">
                    DIRECT DISPATCH // FORM
                  </span>
                  <h2 class="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    {{ locale === 'tr' ? 'Kurumsal İletişim Formu' : 'Corporate Inquiry Form' }}
                  </h2>
                </div>
                <BrandLogo height-class="h-6" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="form-group flex flex-col">
                  <label for="name" class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {{ t('contact.name') }} <span class="text-[#00bed6]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    name="name"
                    type="text"
                    required
                    minlength="2"
                    maxlength="100"
                    :placeholder="t('contact.namePlaceholder')"
                    autocomplete="name"
                    aria-describedby="name-error"
                    class="kt-input"
                    @blur="handleFieldBlur"
                    @input="handleFieldInput"
                  />
                  <span id="name-error" class="kt-field-error" aria-live="polite">
                    <span aria-hidden="true">⚠</span>
                    <span>{{ locale === 'tr' ? 'Lütfen adınızı ve soyadınızı girin (2-100 karakter).' : 'Please enter your full name (2-100 characters).' }}</span>
                  </span>
                </div>

                <div class="form-group flex flex-col">
                  <label for="email" class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {{ t('contact.email') }} <span class="text-[#00bed6]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    name="email"
                    type="email"
                    required
                    maxlength="254"
                    :placeholder="t('contact.emailPlaceholder')"
                    autocomplete="email"
                    aria-describedby="email-error"
                    class="kt-input"
                    @blur="handleFieldBlur"
                    @input="handleFieldInput"
                  />
                  <span id="email-error" class="kt-field-error" aria-live="polite">
                    <span aria-hidden="true">⚠</span>
                    <span>{{ locale === 'tr' ? 'Lütfen geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.' }}</span>
                  </span>
                </div>
              </div>

              <div class="form-group flex flex-col">
                <label for="subject" class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {{ t('contact.subject') }} <span class="text-[#00bed6]" aria-hidden="true">*</span>
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  name="subject"
                  type="text"
                  required
                  minlength="3"
                  maxlength="160"
                  :placeholder="t('contact.subjectPlaceholder')"
                  autocomplete="off"
                  aria-describedby="subject-error"
                  class="kt-input"
                  @blur="handleFieldBlur"
                  @input="handleFieldInput"
                />
                <span id="subject-error" class="kt-field-error" aria-live="polite">
                  <span aria-hidden="true">⚠</span>
                  <span>{{ locale === 'tr' ? 'Lütfen mesajınızın konusunu belirtin (3-160 karakter).' : 'Please specify a subject (3-160 characters).' }}</span>
                </span>
              </div>

              <div class="form-group flex flex-col">
                <label for="message" class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {{ t('contact.message') }} <span class="text-[#00bed6]" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  rows="5"
                  required
                  minlength="10"
                  maxlength="4000"
                  :placeholder="t('contact.messagePlaceholder')"
                  autocomplete="off"
                  aria-describedby="message-error"
                  class="kt-input resize-y"
                  @blur="handleFieldBlur"
                  @input="handleFieldInput"
                ></textarea>
                <span id="message-error" class="kt-field-error" aria-live="polite">
                  <span aria-hidden="true">⚠</span>
                  <span>{{ locale === 'tr' ? 'Lütfen en az 10 karakterlik mesajınızı yazın.' : 'Please enter a message of at least 10 characters.' }}</span>
                </span>
              </div>

              <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span class="text-xs text-[#808284] font-mono">
                  TLS 1.3 // DIRECT RELAY
                </span>
                <button
                  type="submit"
                  :disabled="loading"
                  class="kt-btn-primary min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{{ loading ? t('contact.sending') : t('contact.sendBtn') }}</span>
                  <UIcon name="i-heroicons-paper-airplane-20-solid" class="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
