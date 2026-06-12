<template>
  <div class="bg-mesh fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-500 bg-slate-50 dark:bg-slate-900"></div>
</template>

<style>
.bg-mesh::before,
.bg-mesh::after {
  content: "";
  position: absolute;
  width: 80vmax;
  height: 80vmax;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  will-change: transform;
}

html.dark .bg-mesh::before {
  background: radial-gradient(circle, rgba(0, 190, 214, 0.15) 0%, transparent 70%);
  top: -20%;
  left: -20%;
  animation: float-mesh 25s infinite alternate ease-in-out;
}

html.dark .bg-mesh::after {
  background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
  bottom: -20%;
  right: -20%;
  animation: float-mesh 30s infinite alternate-reverse ease-in-out;
}

html.light .bg-mesh::before {
  background: radial-gradient(circle, rgba(0, 190, 214, 0.08) 0%, transparent 70%);
  top: -20%;
  left: -20%;
  animation: float-mesh 25s infinite alternate ease-in-out;
}

html.light .bg-mesh::after {
  background: radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%);
  bottom: -20%;
  right: -20%;
  animation: float-mesh 30s infinite alternate-reverse ease-in-out;
}

@keyframes float-mesh {
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  50% { transform: translate(5%, 10%) rotate(180deg) scale(1.1); }
  100% { transform: translate(0, 0) rotate(360deg) scale(1); }
}
</style>
