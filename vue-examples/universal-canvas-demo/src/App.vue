<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="app">
    <nav class="navbar">
      <h1>Universal Canvas Engine - Vue 示例</h1>
      <ul>
        <li><RouterLink to="/basic">基础示例</RouterLink></li>
        <li><RouterLink to="/layer">图层示例</RouterLink></li>
        <li><RouterLink to="/plugin">插件示例</RouterLink></li>
      </ul>
    </nav>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.navbar h1 {
  margin: 0 0 1rem 0;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navbar li {
  margin-right: 1rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar a:hover,
.navbar a.router-link-active {
  background-color: #007acc;
}

main {
  padding: 20px;
}
</style>
