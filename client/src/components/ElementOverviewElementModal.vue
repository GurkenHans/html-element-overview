<template>
  <div :class="getModalClasses()">
    <div class="modal">
      <div class="modal-head">
        <h3>{{ element.tag }}-Element</h3>
        
        <button class="close" @click="hideModal()" aria-label="close">
          <i class="la la-close"></i>
        </button>
      </div>

      <div class="modal-body">
        <loading-spinner v-if="!loaded" :height="40" title="element data" />

        <div v-else>
          <blockquote v-if="elementData.description" :cite="elementData.quote_url">
            <p>
              <span class="quotation-mark">&ldquo;</span>{{ elementData.description }}<span class="quotation-mark">&rdquo;</span>

              <span class="quotation-source">&mdash; <a :href="elementData.quote_url" target="_blank" rel="noreferrer">MDN</a></span>
            </p>
          </blockquote>
          
          <p v-if="elementData.category">
            <strong>Category:</strong> {{ elementData.category }}
          </p>

          <p v-if="getElementStatus()">
            <strong>Status:</strong> {{ getElementStatus() }}
          </p>

          <element-overview-element-support v-if="elementData.support" :supportData="elementData.support" />
          
          <p v-if="elementData.mdn_url">
            <a :href="elementData.mdn_url" target="_blank" rel="noreferrer">Complete documentation</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ElementOverviewElementSupport from '@/components/ElementOverviewElementSupport.vue';
import Api from '@/services/Api.js';

const api = new Api();

export default {
  name: 'element-overview-element-modal',
  components: {
    LoadingSpinner,
    ElementOverviewElementSupport,
  },
  props: {
    element: Object,
  },
  watch: {
    element(newElement, oldElement) {
      if(typeof newElement.tag !== 'undefined') {
        this.loadElementData(newElement); 
      }
    },
  },
  data() {
    return {
      visible: false,
      elementData: {},
      loaded: false,
    };
  },
  methods: {
    hideModal() {
      document.body.style.overflow = '';
      this.visible = false;
      this.loaded = false;
      this.elementData = {};

      this.$emit('pt-hide');
    },
    getModalClasses() {
      let classes = ['element-overview-element-modal'];

      if(this.visible) {
        classes = [...classes, 'open'];
      }

      return classes;
    },
    loadElementData(element) {
      document.body.style.overflow = 'hidden';
      this.visible = true;

      api.getElement(element.tag)
        .then(elementData => {
          this.elementData = elementData;
          this.loaded = true;
        });
    },
    getElementStatus() {
      const status = this.elementData.status;
      let stati = [];

      if(typeof status !== 'undefined') {
        if(status.experimental) {
          stati = [...stati, 'Experimental'];
        }
        
        if(!status.standard_track) {
          stati = [...stati, 'Non-standard'];
        }
        
        if(status.deprecated) {
          stati = [...stati, 'Deprecated'];
        }

        return stati.join(', ');
      }

    }
  },
}
</script>

<style scoped>
.element-overview-element-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: rgba(13, 27, 30, .4);
  padding: 1.5rem;
  z-index: -1;
  opacity: 0;
  visibility: hidden;
  transition: opacity .3s ease;
}

.element-overview-element-modal.open {
  overflow-y: auto;
  z-index: 100;
  opacity: 1;
  visibility: visible;
}

.modal {
  background: #fff;
  max-width: 100%;
  padding: 1.5rem;
  box-shadow: 0 0 12px 10px rgba(0, 0, 0, .15);
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-head h3 {
  margin: 0;
}

.modal-head .close {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 1.4rem;
  cursor: pointer;
}

.modal-body p {
  margin: 0 0 1rem;
}

.modal-body blockquote {
  font-style: italic;
}

.modal-body blockquote .quotation-mark,
.modal-body blockquote .quotation-source {
  font-style: normal;
}

@media (min-width: 768px) {
  .modal {
    max-width: 640px;
  }
}
</style>