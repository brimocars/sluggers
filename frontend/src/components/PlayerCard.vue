<template>
  <div
    @mouseenter="hoverStart"
    @mouseleave="hoverEnd"
    class="player"
  >
    <h4>{{player.name}}</h4>
    <stat stat-name="Batting" :stat-value="player.battingStat" />
    <stat stat-name="Pitching" :stat-value="player.pitchingStat" />
    <stat stat-name="Fielding" :stat-value="player.fieldingStat" />
    <stat stat-name="Speed" :stat-value="player.speedStat" />

  </div>
</template>
<script setup>
import Stat from './Stat.vue';

const emit = defineEmits(['hoverStart', 'hoverEnd', 'select']);

const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
});
const hoverStart = () => {  
  emit('hoverStart', player)
}
const hoverEnd = () => {  
  emit('hoverEnd', player)
}
</script>

<style scoped>
</style>
