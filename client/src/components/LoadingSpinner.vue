<template>
  <div class="loading-spinner" :style="{height: `${height}vh`}">
    <i class="la la-circle-notch"></i>
    
    <span>Loading {{ title }}...</span>
  </div>
</template>

<script>
export default {
  name: 'loading-spinner',
  props: {
    height: Number,
    title: String,
  },
}
</script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading-spinner i {
  line-height: 3rem;
  font-size: 3rem;
  animation-name: spinning;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

@keyframes spinning {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>