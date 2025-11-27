<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FabricAdapter, BasePlugin } from '@universal-canvas/engine'

interface Shape {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  color?: string
}

// 创建一个示例插件
class ExamplePlugin extends BasePlugin {
  name = 'ExamplePlugin'
  
  install(engine: any) {
    console.log('ExamplePlugin installed')
    // 在这里可以添加插件的初始化逻辑
  }
  
  uninstall(engine: any) {
    console.log('ExamplePlugin uninstalled')
    // 在这里可以添加插件的清理逻辑
  }
  
  // 插件特有的功能
  doSomething() {
    console.log('ExamplePlugin doing something')
    alert('插件功能已执行')
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasEngine = ref<any>(null)
const pluginInstance = ref<any>(null)
let shapeCounter = 0

// 生成随机颜色
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// 添加图形
function addShape() {
  if (!canvasEngine.value) return
  
  const id = `shape-${shapeCounter++}`
  const shapeTypes = ['rectangle', 'circle']
  const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
  
  canvasEngine.value.addShape({
    id: id,
    type: randomType,
    x: Math.random() * 600,
    y: Math.random() * 400,
    width: 30 + Math.random() * 70,
    height: 30 + Math.random() * 70,
    color: getRandomColor()
  })
}

// 安装插件
function installPlugin() {
  if (!canvasEngine.value || pluginInstance.value) return
  
  pluginInstance.value = new ExamplePlugin()
  pluginInstance.value.install(canvasEngine.value)
  console.log('插件已安装')
  alert('插件已安装')
}

// 卸载插件
function uninstallPlugin() {
  if (!pluginInstance.value) {
    alert('请先安装插件')
    return
  }
  
  pluginInstance.value.uninstall(canvasEngine.value)
  pluginInstance.value = null
  console.log('插件已卸载')
  alert('插件已卸载')
}

// 使用插件功能
function usePluginFeature() {
  if (!pluginInstance.value) {
    alert('请先安装插件')
    return
  }
  
  pluginInstance.value.doSomething()
}

onMounted(() => {
  if (canvasRef.value) {
    // 初始化 Fabric.js 画布
    const fabricCanvas = new (window as any).fabric.Canvas(canvasRef.value)
    
    // 创建适配器实例
    canvasEngine.value = new FabricAdapter(fabricCanvas)
  }
})
</script>

<template>
  <div class="app">
    <h1>插件示例 - Universal Canvas Engine</h1>
    <p>这是一个插件示例，展示如何使用 @universal-canvas/engine 的插件系统。</p>
    
    <div class="controls">
      <button @click="addShape">添加图形</button>
      <button @click="installPlugin">安装插件</button>
      <button @click="uninstallPlugin">卸载插件</button>
      <button @click="usePluginFeature">使用插件功能</button>
    </div>
    
    <div id="canvas-container">
      <canvas ref="canvasRef" width="800" height="600"></canvas>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  margin: 20px;
}

#canvas-container {
  border: 1px solid #ccc;
  margin: 20px 0;
}

.controls {
  margin: 20px 0;
}

button {
  margin: 5px;
  padding: 10px 15px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005a9e;
}
</style>