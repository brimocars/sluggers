<template>
  <h1>Mario Sluggers CPU Drafting</h1>
  <div class="container">
    <div class="input-container">
      <label for="nameInput">Name</label>
      <input id="nameInput" type="text" value="Brian">
    </div>
    <div class="input-container">
      <label for="passwordInput">Password</label>
      <input id="passwordInput" type="text" value="sluggersInTub1234">
    </div>
    <button @click="login">Log in</button>
  </div>
  <div 
    id="error"
    v-show="showError"
  >
    Failed to login
  </div>
</template>
<script setup>
import { ref } from 'vue';
import * as api from '../api.js';

const emit = defineEmits(['connected']);

const showError = ref(false);

const login = async () => {
  const name = document.querySelector('#nameInput').value;
  const password = document.querySelector('#passwordInput').value;
  const isSuccessful = await api.connectManager(name, password);
  if (isSuccessful) {
    showError.value = false;
    emit('connected', name);
  } else {
    showError.value = true;
  }
};
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
.input-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
}
label {
  width: 30%;
  text-align: left;
  font-size: 1.5em;
}
</style>
