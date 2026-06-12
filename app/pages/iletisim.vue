<script setup>
import { ref, computed } from 'vue'
const { t } = useTranslate()
const toast = useToast()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)

const handleSubmit = async () => {
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
      message: ''
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
  <div class="app-layout min-h-screen text-slate-800 dark:text-slate-100 font-sans antialiased bg-slate-50 dark:bg-slate-900/98">
    <BgMesh />
    <AppHeader />
    
    <main class="pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <!-- Contact Info -->
          <div class="contact-header flex flex-col items-start text-left pt-4">
            <span class="section-tagline text-xs font-bold uppercase tracking-widest text-[#00bed6] mb-3 block">{{ t('contact.tagline') }}</span>
            <h1 class="text-4xl font-bold font-heading mb-6 text-slate-800 dark:text-slate-50 tracking-tight">
              {{ t('contact.title') }}
            </h1>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 text-base md:text-lg">
              {{ t('contact.desc') }}
            </p>
            
            <div class="contact-details flex flex-col gap-6 w-full">
              <div class="contact-detail-item flex items-center gap-4 text-base">
                <div class="w-12 h-12 rounded-2xl bg-[#00bed6]/10 flex items-center justify-center text-[#00bed6] shrink-0">
                  <UIcon name="i-heroicons-envelope-20-solid" class="w-6 h-6" />
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ t('contact.emailLabel') }}</span>
                  <a href="mailto:contact@kristalteknoloji.com" class="text-slate-700 dark:text-slate-300 font-medium hover:text-[#00bed6] transition-colors duration-200">
                    contact@kristalteknoloji.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <form @submit.prevent="handleSubmit" class="contact-form flex flex-col gap-5 bg-white/60 dark:bg-slate-900/40 border border-slate-800/10 dark:border-slate-200/10 backdrop-blur-md p-6 md:p-10 rounded-[28px] shadow-sm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="form-group flex flex-col gap-2">
                <label for="name" class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('contact.name') }}</label>
                <UInput id="name" v-model="form.name" name="name" required :placeholder="t('contact.namePlaceholder')" autocomplete="name" size="lg" class="rounded-xl" />
              </div>
              <div class="form-group flex flex-col gap-2">
                <label for="email" class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('contact.email') }}</label>
                <UInput id="email" v-model="form.email" type="email" name="email" required :placeholder="t('contact.emailPlaceholder')" autocomplete="email" size="lg" class="rounded-xl" />
              </div>
            </div>
            
            <div class="form-group flex flex-col gap-2">
              <label for="subject" class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('contact.subject') }}</label>
              <UInput id="subject" v-model="form.subject" name="subject" required :placeholder="t('contact.subjectPlaceholder')" autocomplete="off" size="lg" class="rounded-xl" />
            </div>
            
            <div class="form-group flex flex-col gap-2">
              <label for="message" class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('contact.message') }}</label>
              <UTextarea id="message" v-model="form.message" name="message" :rows="5" required :placeholder="t('contact.messagePlaceholder')" autocomplete="off" size="lg" class="rounded-xl" />
            </div>
            
            <UButton 
              type="submit" 
              :label="loading ? t('contact.sending') : t('contact.sendBtn')" 
              :loading="loading"
              size="lg" 
              class="rounded-full shadow-md mt-2 justify-center bg-[#00bed6] hover:bg-[#00d2ec] text-slate-900 font-semibold" 
            />
          </form>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>
