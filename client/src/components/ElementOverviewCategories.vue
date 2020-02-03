<template>
  <div class="element-overview-categories">
    <div
      v-for="(category, index) in categories"
      :key="index"
      @mouseenter.passive="emitMouseIn(category)"
      @mouseleave.passive="emitMouseOut(category)"
      @focus.passive="emitMouseIn(category)"
      @blur.passive="emitMouseOut(category)"
      class="category"
      tabindex="0"
    >
      <div class="color-box" :style="{backgroundColor: getCategoryColor(category)}"></div>

      <span>{{ category }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'element-overview-categories',
  props: {
    categories: Array,
    colors: Array,
  },
  methods: {
    getCategoryColor(category) {
      const color = this.colors.find(color => color.category === category);

      if(typeof color === 'undefined') return '';

      return color.color;
    },
    emitMouseIn(category) {
      this.$emit('pt-mouse-in', category);
    },
    emitMouseOut(category) {
      this.$emit('pt-mouse-out', category);
    },
  },
}
</script>

<style scoped>
.element-overview-categories {
  display: flex;
  flex-wrap: wrap;
}

.category {
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  padding: .25rem .5rem;
  cursor: default;
}

.category:hover, .category:focus {
  text-decoration: underline;
}

.color-box {
  height: 1rem;
  flex: 0 0 1rem;
  margin: 0 .5rem 0 0;
}

@media (min-width: 768px) {
  .category {
    flex: 0 0 33.333333%;
  }
}

@media (min-width: 992px) {
  .category {
    flex: 0 0 25%;
  }
}

@media (min-width: 1200px) {
  .category {
    flex: 0 0 100%;
  }
}
</style>