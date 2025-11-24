<template>
  <div
    :class="{ 'this-manager': isThisManager, 'drafting-manager': isDrafting }"
    class="manager"
  >
    <span class="star" v-if="isDrafting">☆</span>
    <span class="star" v-else></span>
    <h3>
      {{ manager.name }}
      <span v-show="isThisManager">(You)</span>
      <span>:</span>
    </h3>
    <div
      class="manager-player-container"
    >
      <div
        class="manager-player"
        v-for="player in manager.players"
      >
        <span class="player-name">
          {{ player.name }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps({  
  manager: {
    type: Object,
    required: true,
  },
  isThisManager: {
    type: Boolean,
    required: true,
  },
  isDrafting: {
    type: Boolean,
    required: true,
  }
});
onMounted(() => {
  console.log('Hi!');
});
</script>

<style scoped>
.manager {
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 10px;
  padding-left: 30px;
  width: 100%;
  height: 100px;
  background-color: #5599ee;
  border: 1px solid black;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.drafting-manager {
  background-color: #3377cc
}
h3 {
  width: 200px;
  max-width: 200px;
}
.star {
  font-size: 2.25rem;
  width: 30px;
  height: 50px;
}
.manager-player-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
}
.manager-player {
  padding: 2px 5px;
  background: #66aaff;
  border-radius: 15px;
  border: 1px solid black;
  width: 100px;
}
</style>
