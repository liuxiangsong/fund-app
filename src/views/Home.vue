<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div @click="handleClick">{{ts}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { getFundData } from '@/renderer/ipcRenderer';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const ts = ref(2);
    const handleClick = () => {
      getFundData('1111');
      console.log('object');
    };
    return { ts, handleClick };
  },
});
</script>
