import { mount } from 'svelte';
import App from '../App.svelte';

const app = document.getElementById('app');
if (app != null) {
  mount(App, {
    target: app,
  });
}
