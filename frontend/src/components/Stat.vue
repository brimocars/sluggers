<template>
  <div class="stat">
    {{statName}}: {{statValue}}
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const count = ref(0);
const props = defineProps({
  statName: {
    type: String,
    required: true,
  },
  statValue: {
    type: Number,
    required: true,
  }
});
</script>

<style scoped>
.stat {
  display: inline-block;
}
</style>
