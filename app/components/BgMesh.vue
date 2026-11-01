<template>
  <div class="kt-bg-architecture fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none" aria-hidden="true">
    <!-- Precision Architectural Grid Overlay -->
    <div class="kt-bg-grid absolute inset-0"></div>
    <!-- Top Optical Cyan Horizon Line -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00bed6]/35 to-transparent"></div>
    <!-- Subtle Ambient Cyan & Titanium Diffusions (Strictly Brand Palette) -->
    <div class="kt-glow-primary"></div>
    <div class="kt-glow-secondary"></div>
  </div>
</template>

<style scoped>
.kt-bg-architecture {
  background-color: var(--bg-page);
  transition: background-color 0.35s ease;
}

.kt-bg-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right, rgba(128, 130, 132, 0.065) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(128, 130, 132, 0.065) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse 85% 65% at 50% 15%, #000 25%, transparent 100%);
}

.kt-glow-primary,
.kt-glow-secondary {
  position: absolute;
  border-radius: 9999px;
  filter: blur(130px);
  pointer-events: none;
}

.kt-glow-primary {
  inline-size: 62vmax;
  block-size: 48vmax;
  inset-block-start: -18%;
  inset-inline-start: -10%;
  background: radial-gradient(circle, rgba(0, 190, 214, 0.11) 0%, rgba(151, 209, 220, 0.04) 45%, transparent 72%);
}

.kt-glow-secondary {
  inline-size: 55vmax;
  block-size: 45vmax;
  inset-block-end: -15%;
  inset-inline-end: -10%;
  background: radial-gradient(circle, rgba(128, 130, 132, 0.1) 0%, rgba(0, 190, 214, 0.05) 50%, transparent 72%);
}

:global(html.light) .kt-glow-primary {
  background: radial-gradient(circle, rgba(0, 190, 214, 0.08) 0%, rgba(151, 209, 220, 0.03) 45%, transparent 72%);
}

:global(html.light) .kt-glow-secondary {
  background: radial-gradient(circle, rgba(128, 130, 132, 0.07) 0%, rgba(0, 190, 214, 0.03) 50%, transparent 72%);
}
</style>
