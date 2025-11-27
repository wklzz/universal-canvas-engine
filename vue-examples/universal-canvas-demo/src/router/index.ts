import { createRouter, createWebHistory } from 'vue-router'
import BasicExample from '../views/BasicExample.vue'
import LayerExample from '../views/LayerExample.vue'
import PluginExample from '../views/PluginExample.vue'

const routes = [
  { path: '/', redirect: '/basic' },
  { path: '/basic', component: BasicExample },
  { path: '/layer', component: LayerExample },
  { path: '/plugin', component: PluginExample }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router