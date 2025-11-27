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
        @mouseenter="() => {console.log('hoverStart!'); emit('hoverStart', player)}"
      >
        <span class="captain" :class="{ 'show': player.isCaptain }" ></span>
        <span class="player-name">
          {{ player.name }}
        </span>
        <span class="chemistry" :class="{ 'show': hoverPlayer?.chemistry?.includes(player.name) }" >♪</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const emit = defineEmits(['hoverStart']);

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
  },
  hoverPlayer: {
    type: Object,
    required: false
  },
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
  display: grid;
  grid-template-columns: 16px 1fr 16px;
  grid-template-rows: 16px 1fr 16px;
  justify-content: center;
  align-items: center;
  cursor: context-menu;
}

.chemistry {
  width: 10px;
  height: 10px;
  background-color: #55cc99;
  color: #222222;
  grid-row: 3 / 4;
  grid-column: 3 / 4;
  margin: 3px;
  padding-bottom: 4px;
  visibility: hidden;
}
.player-name {
  grid-row: 1 / 4;
  grid-column: 1 / 4;
}
.captain {
  width: 10px;
  height: 10px;
  background-color: #eedd33;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin: 3px;
  visibility: hidden;
}
.show {
  visibility: visible;
}
</style>
