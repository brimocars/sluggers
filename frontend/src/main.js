import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { socketService } from './socket.js';

const app = createApp(App);
app.provide('socket', socketService);
app.mount('#app');
