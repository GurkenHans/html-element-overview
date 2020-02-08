<template>
  <div class="element-overview-element-support">
    <element-overview-element-support-table :browserList="desktopBrowser" title="Desktop browser support" />

    <element-overview-element-support-table :browserList="mobileBrowser" title="Mobile browser support" />
  </div>
</template>

<script>
import ElementOverviewElementSupportTable from '@/components/ElementOverviewElementSupportTable.vue';

export default {
  name: 'element-overview-element-support',
  components: {
    ElementOverviewElementSupportTable,
  },
  props: {
    supportData: Array,
  },
  computed: {
    desktopBrowser() {
      return this.supportData
        .filter(browser => !browser.mobile)
        .map(browser => ({ ...browser, support: this.getBrowserSupport(browser) }));
    },
    mobileBrowser() {
      return this.supportData
        .filter(browser => browser.mobile)
        .map(browser => ({ ...browser, support: this.getBrowserSupport(browser) }));
    },
  },
  methods: {
    getBrowserSupport(browser) {
      const supported = !!browser.version_added;
      let text = browser.version_added;

      switch(text) {
        case true:
          text = 'Yes';
          break;
        case false:
          text = 'No';
          break;
        case null:
          text = '?';
      }

      return { supported, text, nodata: browser.version_added === null };
    },
  },
}
</script>

<style scoped>

</style>