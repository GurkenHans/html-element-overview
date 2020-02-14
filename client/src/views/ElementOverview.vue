<template>
  <div class="element-overview">
    <div class="container grid">
      <aside class="sidebar">
        <div class="sidebar-sticky-content">
          <sidebar-item title="Search">
            <element-overview-filter @pt-search="onSearch" @pt-sort="onSort" />
          </sidebar-item>

          <sidebar-item title="Legend">
            <loading-spinner v-if="categories.length === 0" :height="30" title="legend" />

            <element-overview-categories :categories="categories" :colors="colors" @pt-mouse-in="onCategoryMouseIn" @pt-mouse-out="onCategoryMouseOut" />
          </sidebar-item>
        </div>
      </aside>

      <div class="content">
        <loading-spinner v-if="elements.length === 0" :height="75" title="elements" />

        <div v-else class="element-overview-elements">
          <element-overview-element
            v-for="(element, index) in elements"
            :key="`element-${index}`"
            :element="element"
            :color="getColorForElement(element)"
            :visibility="getVisibilityForElement(element)"
            :orderIndex="index"
            @pt-click="openElementModal"
          />

          <element-overview-element-group
            v-for="(group, index) in elementGroups"
            :key="`group-${index}`"
            :group="group"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <h1>HTML Element Overview</h1>

      <p>
        This tool gives you a short overview of all HTML elements sorted by their function in the DOM.
        You can search, sort and filter all elements or click on a single one to show its details.
      </p>
    </div>

    <element-overview-element-modal :element="activeElement" @pt-hide="activeElement = {}" />
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SidebarItem from '@/components/SidebarItem.vue';
import ElementOverviewCategories from '@/components/ElementOverviewCategories.vue';
import ElementOverviewFilter from '@/components/ElementOverviewFilter.vue';
import ElementOverviewElement from '@/components/ElementOverviewElement.vue';
import ElementOverviewElementModal from '@/components/ElementOverviewElementModal.vue';
import ElementOverviewElementGroup from '@/components/ElementOverviewElementGroup.vue';
import Api from '@/services/Api.js';
import ElementSorter from '@/services/ElementSorter.js';
import ElementGrouper from '@/services/ElementGrouper.js';

const api = new Api();
const elementSorter = new ElementSorter();
const elementGrouper = new ElementGrouper();
const colors = [
  '#ef5350',
  '#ec407a',
  '#ab47bc',
  '#7e57c2',
  '#7986cb',
  '#1e88e5',
  '#03a9f4',
  '#26c6da',
  '#26a69a',
  '#66bb6a',
  '#9ccc65',
  '#d4e157',
  '#ffee58',
  '#ffca28',
  '#ffa726',
  '#ff7043',
  '#8d6e63',
];

export default {
  name: 'element-overview',
  components: {
    LoadingSpinner,
    SidebarItem,
    ElementOverviewCategories,
    ElementOverviewFilter,
    ElementOverviewElement,
    ElementOverviewElementModal,
    ElementOverviewElementGroup,
  },
  data() {
    return {
      categories: [],
      elements: [],
      colors: [],
      searchTag: '',
      hoverCategory: '',
      activeElement: {},
      elementGroups: [],
    };
  },
  methods: {
    onCategoryMouseIn(category) {
      this.hoverCategory = category;
    },
    onCategoryMouseOut(category) {
      this.hoverCategory = '';
    },
    onSearch(search) {
      this.searchTag = search;
    },
    onSort(sortBy, sortDirection) {
      this.elements = elementSorter.by(sortBy).dir(sortDirection);

      this.elementGroups = elementGrouper.from(this.elements, this.categories).by(sortBy);
    },
    getColorForElement(element) {
      const color = this.colors.find(color => color.category === element.category);

      if(typeof color === 'undefined') return '';

      return color.color;
    },
    getVisibilityForElement(element) {
      if(this.searchTag !== '' && !element.tag.includes(this.searchTag)) return 0.4;
      if(this.hoverCategory === '' || this.hoverCategory === element.category) return 1;

      return 0.4;
    },
    openElementModal(element) {
      this.activeElement = element;
    },
  },
  created() {
    api.getCategories()
      .then(categories => {
        categories.forEach((category, index) => {
          const color = index < colors.length ? colors[index] : colors[index % colors.length];

          this.colors = [
            ...this.colors,
            { color, category },
          ];
        });

        this.categories = categories;

        api.getElements()
          .then(elements => {
            elementSorter.from(elements, categories);

            this.elements = elements;
            this.onSort('category', 'asc');
          });
      });
  },
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.sidebar {
  position: relative;
  flex: 0 0 100%;
}

.content {
  flex: 0 0 100%;
}

.element-overview-elements {
  display: flex;
  flex-wrap: wrap;
  margin: -.25rem;
}

@media (min-width: 1200px) {
  .sidebar {
    flex: 0 0 20%;
    padding: 0 .75rem 0 0;
  }

  .sidebar-sticky-content {
    position: sticky;
    top: 5.5rem;
  }

  .content {
    flex: 0 0 80%;
    padding: 0 0 0 .75rem;
  }
}
</style>