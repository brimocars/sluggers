<template>
  <div class="container">
    <div id="roundInfo">
      <h2>Round {{ roundNumber }}</h2>
      <h2>Draft {{ draftNumber }}</h2>
      <h2>Currently drafting: {{ nextDrafter.name }}</h2>
    </div>
    <div id="managerContainer">
      <div
        v-for="manager in managers"
        :key="manager.name"
        :class="{'this-manager': manager.name === managerName, 'drafting-manager': manager.name === nextDrafter.name}"
      >
        <h3>
          {{ manager.name }}
        </h3>
        <div
          class="manager-player-contaienr"
        >
          <div
            v-for="player in manager.players"
          >
            {{ player.name }}
          </div>
        </div>
      </div>
    </div>
    <div
      id="playerContainer"
    >
      <div
        v-for="player in players"
        @click="() => draftPlayer(player)" 
        class="player"
        :class="{ 'drafted': player.isDrafted }"
      >
        {{ player.name }}
      </div>
    </div>
    <div
      id="hoveredInfo"
    >
      <player-card
        :player="hoverPlayer"
        @hover-start="hoverStart"
        @hover-end="hoverEnd"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, computed, watch } from 'vue';
import * as api from '../api';
import PlayerCard from './PlayerCard.vue';

const socket = inject('socket');

const players = ref([]);
const roundNumber = ref(0);
const draftNumber = ref(0);
const nextDrafter = ref(null);
const hoverPlayer = ref(null);

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
const isCurrentDrafter = computed(() => {
  return managerName === nextDrafter.name;
})
onMounted(async () => {
  players.value = await api.getAllPlayers();
});

// just need one watcher for all the playerDrafted data. draft number will always change 
watch(
  () => socket.newDraftNumber,
  (newValue, oldValue) => {
    draftStarted = true;
    draftNumber.value = newValue;
    roundNumber.value = socket.newRoundNumber;
    nextDrafter.value = socket.nextDrafter;
    const draftedPlayer = players.find((player) => player.name === socket.draftedPlayer);
    draftedPlayer.isDrafted = true;
    // manager will be updated by prop
  },
);
watch(
  () => socket.ended,
  (newValue, oldValue) => {
    console.log('draft over');
    // TODO: do crud when it's over. Probably show another component.
  }
)

const hoverStart = (player) => {
  hoverPlayer.value = player;
}
const hoverEnd = (player) => {
  if (hoverPlayer === player) {
    hoverPlayer.value = null;
  }
}
const draftPlayer = async (player) => {
  if (!isCurrentDrafter) {
    console.log('It\'s not your turn to draft');
    return
  }
  if (player.isDrafted) {
    console.log(`Player ${player.name} was already drafted`);
    return
  }
  await api.draftPlayer(player.name, managerName);
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.player {
  background-color: #dddddd;
}
.drafted {
  background-color: #666666
}
</style>
