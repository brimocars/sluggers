<template>
  <button id="toggleButton" @click="emit('toggleShowStats')">{{ buttonText }}</button>
  <div
    v-if="player && showStats"
    class="player-card"
  >
    <h4>{{player.name}}</h4>
    <stat stat-name="Batting" :stat-value="player.battingStat" />
    <stat stat-name="Pitching" :stat-value="player.pitchingStat" />
    <stat stat-name="Fielding" :stat-value="player.fieldingStat" />
    <stat stat-name="Speed" :stat-value="player.speedStat" />
    <div id="abilities">
      <span>Abilities: </span>
      <span id="ability" v-for="ability in player.abilities">{{ ability }}; </span>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import Stat from './Stat.vue';;

const emit = defineEmits(['toggleShowStats'])
const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
  showStats: {
    type: Boolean,
    required: true,
  }
});
const buttonText = computed(() => {
  return props.showStats ? '-' : '+';
})
</script>

<style scoped>
h4 {
  margin: 5px;
}
#abilities {
  margin-top: 5px;
}
#toggleButton {
  position: absolute;
  width: 24px;
  height: 24px;
  left: 0px;
  margin: 4px;
}
</style>
