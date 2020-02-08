<template>
  <div class="element-overview-element" :style="{ order }">
    <button
      :class="getElementClasses()"
      :style="{ backgroundColor: color, opacity: visibility }"
      @click="emitClick"
    >
      <span>&lt;{{ element.tag }}&gt;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'element-overview-element',
  props: {
    element: Object,
    color: String,
    visibility: Number,
    orderIndex: Number,
  },
  computed: {
    order() {
      return (this.orderIndex + 1) * 10;
    }
  },
  methods: {
    getElementClasses() {
      let classes = ['element'];

      if(this.element.tag.length > 6) {
        classes = [...classes, 'small-text'];
      }
      if(this.element.tag.length > 8) {
        classes = [...classes, 'smaller-text'];
      }

      return classes;
    },
    emitClick() {
      this.$emit('pt-click', this.element);
    },
  },
}
</script>

<style scoped>
.element-overview-element {
  flex: 0 0 33.333333%;
  padding: .25rem;
  overflow: hidden;
}

.element {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem .5rem;
  font-size: 1rem;
  line-height: 1.4rem;
  cursor: pointer;
  border: none;
  width: 100%;
  font-family: inherit;
  color: inherit;
  transition: opacity .3s ease, transform .3s ease;
}

.element:hover, .element:focus {
  transform: scale(1.05);
}

.element.small-text {
  font-size: .9rem;
}

.element.smaller-text {
  font-size: .85rem;
}

@media (min-width: 425px) {
  .element-overview-element {
    flex: 0 0 25%;
  }
}

@media (min-width: 576px) {
  .element-overview-element {
    flex: 0 0 16.666666%;
  }
}

@media (min-width: 768px) {
  .element-overview-element {
    flex: 0 0 12.5%;
  }
}

@media (min-width: 992px) {
  .element-overview-element {
    flex: 0 0 10%;
  }
}

@media (min-width: 1400px) {
  .element-overview-element {
    flex: 0 0 8.333333%;
  }
}
</style>