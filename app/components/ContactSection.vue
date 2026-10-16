<script setup lang="ts">
const { t } = useI18n()
const { profile } = useContent()
const { public: { formspreeUrl } } = useRuntimeConfig()

const form = reactive({ name: '', email: '', message: '', _gotcha: '' })
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const submit = async () => {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    if (!response.ok) throw new Error(String(response.status))
    status.value = 'sent'
    Object.assign(form, { name: '', email: '', message: '', _gotcha: '' })
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container-x">
      <SectionHeader
        index="06"
        :eyebrow="t('contact.eyebrow')"
        :title="t('contact.heading')"
        :subtitle="t('contact.subtitle')"
      />

      <div class="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div data-reveal>
          <p class="leading-relaxed">{{ t('contact.intro') }}</p>

          <dl class="mt-10 space-y-6">
            <div>
              <dt class="eyebrow mb-1.5">{{ t('contact.email_label') }}</dt>
              <dd>
                <a :href="`mailto:${profile.email}`" class="text-zinc-950 transition-colors duration-300 hover:text-accent dark:text-white">
                  {{ profile.email }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="eyebrow mb-1.5">{{ t('contact.location_label') }}</dt>
              <dd class="text-zinc-950 dark:text-white">{{ profile.location }}</dd>
            </div>
          </dl>

          <div class="-ml-2.5 mt-8"><SocialLinks /></div>
        </div>

        <div data-reveal style="--reveal-delay: 150ms">
          <div
            v-if="status === 'sent'"
            role="status"
            class="flex items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6"
          >
            <svg class="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
            </svg>
            <p class="text-zinc-900 dark:text-zinc-100">{{ t('contact.success') }}</p>
          </div>

          <form v-else class="space-y-5" @submit.prevent="submit">
            <div>
              <label for="name" class="eyebrow mb-2 block">{{ t('contact.name_placeholder') }}</label>
              <input id="name" v-model="form.name" type="text" name="name" autocomplete="name" required class="field" />
            </div>
            <div>
              <label for="email" class="eyebrow mb-2 block">{{ t('contact.email_placeholder') }}</label>
              <input id="email" v-model="form.email" type="email" name="email" autocomplete="email" required class="field" />
            </div>
            <div>
              <label for="message" class="eyebrow mb-2 block">{{ t('contact.message_placeholder') }}</label>
              <textarea id="message" v-model="form.message" name="message" rows="5" required class="field resize-y"></textarea>
            </div>

            <!-- Honeypot anti-spam: invisible para personas -->
            <input
              v-model="form._gotcha"
              type="text"
              name="_gotcha"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div class="flex flex-wrap items-center gap-4 pt-1">
              <button type="submit" class="btn btn-primary disabled:opacity-50" :disabled="status === 'sending'">
                {{ status === 'sending' ? t('contact.submitting') : t('contact.submit') }}
              </button>
              <p v-if="status === 'error'" role="alert" class="text-sm text-red-600 dark:text-red-400">
                {{ t('contact.error') }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
