<template>
  <div class="element-overview-element-support">
    <div class="table-container">
      <strong>Desktop browser support</strong>

      <div class="table-scrollable">
        <table class="table">
          <tr>
            <th v-for="(browser, index) in desktopBrowser" :key="index" :style="{width: `${getCellWidth(desktopBrowser)}%`}">
              {{ browser.name }}
            </th>
          </tr>
          <tr>
            <td v-for="(browser, index) in desktopBrowser" :key="index" :class="{support: true, supported: getBrowserSupport(browser).supported, nodata: getBrowserSupport(browser).nodata}">
              {{ getBrowserSupport(browser).text }}
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="table-container">
      <strong>Mobile browser support</strong>

      <div class="table-scrollable">
        <table class="table">
          <tr>
            <th v-for="(browser, index) in mobileBrowser" :key="index" :style="{width: `${getCellWidth(mobileBrowser)}%`}">
              {{ browser.name }}
            </th>
          </tr>
          <tr>
            <td v-for="(browser, index) in mobileBrowser" :key="index" :class="{support: true, supported: getBrowserSupport(browser).supported, nodata: getBrowserSupport(browser).nodata}">
              {{ getBrowserSupport(browser).text }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'element-overview-element-support',
  props: {
    supportData: Array,
  },
  computed: {
    desktopBrowser() {
      return this.supportData.filter(browser => !browser.mobile);
    },
    mobileBrowser() {
      return this.supportData.filter(browser => browser.mobile);
    },
  },
  methods: {
    getCellWidth(browserList) {
      return Math.round(100 / browserList.length * 100000) / 100000;
    },
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
.table-container {
  margin: 0 0 1rem;
}

.table-scrollable {
  overflow-x: auto;
}

.table {
  width: 100%;
}

.table th, .table td {
  padding: .5rem;
  line-height: 1.2;
  font-weight: normal;
}

.table th {
  min-width: 5rem;
  padding: .25rem;
}

.table .support {
  background: #f44336;
  text-align: center;
  justify-content: center;
}

.table .support.supported {
  background: #8bc34a;
}

.table .support.nodata {
  background: #9e9e9e;
}
</style>