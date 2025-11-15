
<template>
  <h1>{{ message }}</h1>

  <div>
    <button @click="count++">count is {{ count }}</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const count = ref(0)
const props = defineProps({
  message: {
    type: String,
    required: true,
  }
  
})
onMounted(() => {
  console.log('Hi!');
})
</script>

<style scoped>
</style>
