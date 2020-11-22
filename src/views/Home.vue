<template>
  <div class="home">
    <search @search="handleSearch"/>
    <!-- <a-button type="primary" @click="handleClick">Primary</a-button> -->
    <fund-info :fundBaseInfo="state.fundBaseInfo" :fundPostion="state.fundPostion"
    :fundManagers="state.fundManagers"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Search from '@/components/Search.vue';
import FundInfo from '@/components/FundInfo.vue';
import { getFundData, findDataFromDb } from '@/renderer/ipcRenderer';

export default defineComponent({
  name: 'Home',
  components: {
    Search,
    FundInfo,
  },
  setup() {
    const state = reactive({ fundBaseInfo: {}, fundPostion: {}, fundManagers: {} });
    const handleClick = async () => {
      const result = await findDataFromDb();
      console.log('db :>> ', result);
      state.fundBaseInfo = result ? result[0] : {};
      state.fundPostion = result ? result[1] : {};
      state.fundManagers = result ? result[2] : {};
      // console.log('data :>> ', state.fundBaseInfo);
    };
    const handleSearch = async (fundCode: string) => {
      console.log('fundCode :>> ', fundCode);
      // const results= await getFundData(fundCode);
    };
    return { state, handleClick, handleSearch };
  },
});
</script>

<style scoped>
 .home{
   margin:0 auto;
   width :665px;
 }
</style>
