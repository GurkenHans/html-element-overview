<template>
  <div class="element-overview-filter">
    <div class="field">
      <label for="search">Search:</label>

      <div class="input">
        <input id="search" type="text" name="search" v-model="search">
      </div>
    </div>

    <div class="field">
      <label for="sort">Sort:</label>

      <div class="input">
        <select id="sort" name="sort" v-model="sort">
          <option :value="{by: 'category', direction: 'asc'}">Category asc</option>
          <option :value="{by: 'category', direction: 'desc'}">Category desc</option>
          <option :value="{by: 'name', direction: 'asc'}">Name asc</option>
          <option :value="{by: 'name', direction: 'desc'}">Name desc</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'element-overview-filter',
  data() {
    return {
      search: '',
      sort: {
        by: 'category',
        direction: 'asc',
      },
    };
  },
  watch: {
    search(val) {
      this.$emit('pt-search', val.toLowerCase());
    },
    sort(val) {
      this.$emit('pt-sort', val.by, val.direction);
    }
  }
}
</script>

<style scoped>
.field {
  display: flex;
  margin: 0 0 .5rem;
}

.field label {
  flex: 0 0 25%;
  display: flex;
  align-items: center;
}

.field .input {
  flex: 0 0 75%;
  display: flex;
  align-items: center;
}

.field .input input, .field .input select {
  color: #0D1B1E;
  background: #fff;
  border: none;
  border-bottom: 2px solid #0D1B1E;
  font-size: 1rem;
  font-family: inherit;
  padding: .25rem .5rem;
  width: 100%;
}

@media (min-width: 1200px) and (max-width: 1399px) {
  .field label {
    flex: 0 0 35%;
  }

  .field .input {
    flex: 0 0 65%;
  }
}
</style>