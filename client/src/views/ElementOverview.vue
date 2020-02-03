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
        <loading-spinner v-if="elements.length === 0" :height="90" title="elements" />

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
import APIService from '@/APIService.js';

const API = new APIService();
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
    onSort(sort) {
      switch(sort.by) {
        case 'category':
          this.sortByCategory(sort.direction);
          break;
        case 'name':
          this.sortByName(sort.direction);
          break;
      }
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
    sortByCategory(direction = 'asc') {
      let sortFunc = (elA, elB) => {
        return this.categories.findIndex(category => category === elA.category) - this.categories.findIndex(category => category === elB.category);
      };

      if(direction === 'desc') {
        sortFunc = (elA, elB) => {
          return this.categories.findIndex(category => category === elB.category) - this.categories.findIndex(category => category === elA.category);
        };
      }

      this.elements = this.elements.sort(sortFunc);
      this.calculateElementGroups('category');
    },
    sortByName(direction = 'asc') {
      let sortFunc = (elA, elB) => {
        if(elA.tag < elB.tag) return -1;
        if(elB.tag < elA.tag) return 1;

        return 0;
      };

      if(direction === 'desc') {
        sortFunc = (elA, elB) => {
          if(elA.tag < elB.tag) return 1;
          if(elB.tag < elA.tag) return -1;

          return 0;
        }
      }

      this.elements = this.elements.sort(sortFunc);
      this.calculateElementGroups('name');
    },
    calculateElementGroups(sortBy) {
      let elementGroups;

      switch(sortBy) {
        case 'category':
          elementGroups = this.categories.map(category => {
            return {
              order: this.elements.findIndex(element => element.category === category),
              title: category,
            };
          });
          break;
        case 'name':
          elementGroups = 'abcdefghijklmnopqrstuvwxyz'.split('').map(char => {
            return {
              order: this.elements.findIndex(element => element.tag.startsWith(char)),
              title: char.toUpperCase(),
            };
          });
          break;
      }

      this.setElementGroups(elementGroups);
    },
    setElementGroups(elementGroups) {
      this.elementGroups = elementGroups
        .filter(group => group.order !== -1)
        .map(group => {
          group.order = group.order * 10 + 5;

          return group;
        });
    }
  },
  mounted() {
    API.getCategories()
      .then(categories => {
        categories.forEach((category, index) => {
          const color = index < colors.length ? colors[index] : colors[index % colors.length];

          this.colors = [
            ...this.colors,
            { color, category },
          ];
        });

        this.categories = categories;

        API.getElements()
          .then(elements => {
            this.elements = elements;

            this.sortByCategory();
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