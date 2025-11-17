<template>
  <login v-if="!isLoggedIn" @connected="loggedIn" />
  <lobby v-else-if="!draftStarted" :manager-name="managerName" :managers="managers" />
  <draft v-else :manager-name="managerName" :managers="managers" />
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import Draft from './components/Draft.vue';
import Lobby from './components/Lobby.vue';
import Login from './components/Login.vue';

const socket = inject('socket');

const isLoggedIn = ref(false);
const draftStarted = ref(false);
const managerName = ref('');
const managers = ref([]);

watch(
  () => socket.started,
  (newValue, oldValue) => {
    draftStarted.value = true;
  },
);
watch(
  () => socket.managers,
  (newValue, oldValue) => {
    managers.value = newValue;
  },
);

const loggedIn = (name) => {
  isLoggedIn.value = true;
  managerName.value = name;
};
</script>

<style scoped>
</style>
