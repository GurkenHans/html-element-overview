<template>
  <div class="table-container">
    <strong>{{ title }}</strong>

    <div class="table-scrollable">
      <table class="table">
        <tr>
          <th v-for="(browser, index) in browserList" :key="index" :style="{width: `${cellWidth}%`}">
            {{ browser.name }}
          </th>
        </tr>
        <tr>
          <td v-for="(browser, index) in browserList" :key="index" :class="{support: true, supported: browser.support.supported, nodata: browser.support.nodata}">
            {{ browser.support.text }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'element-overview-element-support-table',
  props: {
    title: String,
    browserList: Array,
  },
  computed: {
    cellWidth() {
      return Math.round(100 / this.browserList.length * 100000) / 100000;
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