<template>
  <div class="sidebar-item">
    <div class="sidebar-item-header">
      <h4>{{ title }}</h4>
    </div>

    <div class="sidebar-item-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  props: {
    title: String,
  },
}
</script>

<style>
.sidebar-item {
  margin: 0 0 1.5rem;
}

.sidebar-item-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.sidebar-item-header h4 {
  margin: 0;
  font-size: 1.2rem;
}

.sidebar-item-header button {
  background: none;
  border: none;
  margin: 0;
  padding: .25rem .5rem;
  font-size: 1.2rem;

}
</style>