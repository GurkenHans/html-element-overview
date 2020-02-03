<template>
  <div class="element-overview-element-group" :style="{ order: group.order }">
    <span>{{ group.title }}</span>
  </div>
</template>

<script>
export default {
  name: 'element-overview-element-group',
  props: {
    group: Object,
  },
}
</script>

<style>
.element-overview-element-group {
  flex: 0 0 100%;
  padding: 0 .25rem;
  margin: .75rem 0 .25rem;
}

@media (min-width: 1200px) {
  .element-overview-element-group {
    display: none;
  }
}
</style>