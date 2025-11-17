<template>
  <div class="container">
    <h1>You: {{ managerName }}</h1>
    <div>Waiting for others to join, such as:</div>
    <div v-for="manager in otherManagers" :key="manager.name">
      {{ manager.name }}
    </div>
    <button
      v-if="managerName.toLowerCase() === 'briguy' || managerName.toLowerCase() === 'brian'"
      @click="startDraftClick"
    >
      Start draft
    </button>
    <button
      v-if="managerName.toLowerCase() === 'briguy' || managerName.toLowerCase() === 'brian'"
      @click="clearManagers"
    >
      Clear
    </button>
  </div>
</template>
<script setup>
import { inject, computed } from 'vue';
import * as api from '../api';

const socket = inject('socket');

const props = defineProps({
  managerName: {
    type: String,
    required: true,
  },
  managers: {
    type: Array,
    required: true,
  }
});
const otherManagers = computed(() => {
  return props.managers.filter((manager) => manager.name !== props.managerName) ?? [];
})

const startDraftClick = async () => {
  await api.startDraft()
}

const clearManagers = async () => {
  await api.clearManagers()
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 20%;
  box-sizing: border-box;
}
div {
  font-size: 1.5rem;
}
</style>
