<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FabricAdapter } from '@universal-canvas/engine'

interface Shape {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  color?: string
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasEngine = ref<any>(null)

// 生成随机颜色
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// 绘制图层
function drawLayers() {
  if (!canvasEngine.value) return
  
  // 创建图层数据
  const layers: Shape[][] = [
    // 第一层 - 背景图形
    [
      { id: 'bg-rect-1', type: 'rectangle', x: 50, y: 50, width: 200, height: 100, color: '#e0e0e0' },
      { id: 'bg-circle-1', type: 'circle', x: 300, y: 100, width: 80, height: 80, color: '#d0d0d0' }
    ],
    // 第二层 - 中景图形
    [
      { id: 'mid-rect-1', type: 'rectangle', x: 100, y: 150, width: 150, height: 150, color: '#a0a0a0' },
      { id: 'mid-circle-1', type: 'circle', x: 400, y: 200, width: 60, height: 60, color: '#b0b0b0' }
    ],
    // 第三层 - 前景图形
    [
      { id: 'fg-rect-1', type: 'rectangle', x: 200, y: 250, width: 100, height: 100, color: '#808080' },
      { id: 'fg-circle-1', type: 'circle', x: 500, y: 300, width: 40, height: 40, color: '#909090' }
    ]
  ]
  
  // 按图层顺序绘制
  canvasEngine.value.draw(layers)
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
    <h1>图层示例 - Universal Canvas Engine</h1>
    <p>这是一个图层示例，展示如何使用 @universal-canvas/engine 按图层顺序绘制图形。</p>
    
    <div class="controls">
      <button @click="drawLayers">绘制图层</button>
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