<template>
  <a-select
    show-search
    v-model:value="value"
    placeholder="请输入要查询的基金"
    style="width: 500px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :allowClear="true"
    @search="handleSearch"
    @change="handleChange"
  >
    <a-select-option v-for="d in data" :key="d.value">
     <div class="option-item1"> {{ `${d.text}(${d.value})` }}</div>
     <div class="option-item2">近一年收益率：{{d.item.yieldOfLastYear}}</div>
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getSearchFundData } from '@/renderer/ipcRenderer';

export default defineComponent({
  name: 'Search',
  emits: ['search'],
  setup(props, context) {
    const data = ref<any[]>([]);
    let timeout: any;
    async function fetchData(queryString: string) {
      if (!queryString) {
        data.value = [];
        return;
      }
      console.log(queryString);
      const result = await getSearchFundData(queryString);
      if (result) {
        data.value = result.map((m: any) => ({ value: m.code, text: m.name, item: m }));
      }
    }

    async function handleSearch(queryString: string) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => fetchData(queryString), 1000);
    }

    function handleChange(value: string) {
      // console.log('value>>', value);
      context.emit('search', value);
    }

    return { data, handleSearch, handleChange };
  },
});
// export default {
//   data() {
//     return {
//       data: [],
//       value: undefined,
//     };
//   },
//   methods: {
//     async handleSearch(queryString: string) {
//       if (!queryString) {
//         this.data = [];
//         return;
//       }
//       console.log(queryString);
//       const result = await getSearchFundData(queryString);
//       if (result) {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         this.data = result.map((m: any) => ({ value: m.code, text: m.name }));
//       }
//       // fetch(value, (data) => (this.data = data));
//     },
//     handleChange(value: string) {
//       console.log(value);
//       // this.value = value;
//       // fetch(value, (data) => (this.data = data));
//     },
//   },
// };
</script>

<style scoped>
.option-item1{
  color: #333;
  font-size: 14px;
}
.option-item2{
  color: #999;
}
</style>
