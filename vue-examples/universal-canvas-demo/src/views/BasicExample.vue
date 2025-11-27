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
let shapeCounter = 0
let lastAddedShapeId: string | null = null

// 生成随机颜色
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// 添加矩形
function addRectangle() {
  if (!canvasEngine.value) return
  
  const id = `rect-${shapeCounter++}`
  canvasEngine.value.addShape({
    id: id,
    type: 'rectangle',
    x: Math.random() * 600,
    y: Math.random() * 400,
    width: 50 + Math.random() * 100,
    height: 50 + Math.random() * 100,
    color: getRandomColor()
  })
  lastAddedShapeId = id
}

// 添加圆形
function addCircle() {
  if (!canvasEngine.value) return
  
  const id = `circle-${shapeCounter++}`
  canvasEngine.value.addShape({
    id: id,
    type: 'circle',
    x: Math.random() * 600,
    y: Math.random() * 400,
    width: 30 + Math.random() * 70,
    height: 30 + Math.random() * 70,
    color: getRandomColor()
  })
  lastAddedShapeId = id
}

// 添加图片
function addImage() {
  if (!canvasEngine.value) return
  
  // 使用本地图片来避免CORS问题
  const imageUrl = '../../images/sample.png'
  const id = `image-${shapeCounter++}`
  
  // 使用canvasEngine的addImage方法添加图片
  canvasEngine.value.addImage(id, imageUrl, {
    left: Math.random() * 600,
    top: Math.random() * 400,
    scaleX: 0.5,
    scaleY: 0.5
  }).then(() => {
    lastAddedShapeId = id
    console.log('Image added successfully')
  }).catch((error: Error) => {
    console.error('Failed to add image:', error)
    alert('添加图片失败: ' + error.message)
  })
}

// 移动图形
function moveShape() {
  if (!canvasEngine.value || !lastAddedShapeId) {
    alert('请先添加一个图形')
    return
  }
  
  canvasEngine.value.moveShape(lastAddedShapeId, 
    Math.random() * 600, 
    Math.random() * 400)
}

// 改变颜色
function changeColor() {
  if (!canvasEngine.value || !lastAddedShapeId) {
    alert('请先添加一个图形')
    return
  }
  
  canvasEngine.value.setColor(lastAddedShapeId, getRandomColor())
}

// 删除图形
function removeShape() {
  if (!canvasEngine.value || !lastAddedShapeId) {
    alert('请先添加一个图形')
    return
  }
  
  canvasEngine.value.removeShape(lastAddedShapeId)
  lastAddedShapeId = null
}

// 序列化画布
function serializeCanvas() {
  if (!canvasEngine.value) return
  
  const serializedData = canvasEngine.value.serialize()
  console.log('Serialized data:', serializedData)
  alert('序列化数据已输出到控制台')
}

// 反序列化画布
function deserializeCanvas() {
  if (!canvasEngine.value) return
  
  const serializedData = prompt('请输入序列化数据:')
  if (serializedData) {
    canvasEngine.value.deserialize(serializedData)
  } else {
    alert('请输入序列化数据')
  }
}

onMounted(() => {
  if (canvasRef.value) {
    // 初始化 Fabric.js 画布
    const fabricCanvas = new (window as any).fabric.Canvas(canvasRef.value)
    
    // 创建适配器实例
    canvasEngine.value = new FabricAdapter(fabricCanvas)
    
    // 添加事件监听器示例
    canvasEngine.value.on('shapeAdded', (shape: Shape) => {
      console.log('图形已添加:', shape)
    })
    
    canvasEngine.value.on('shapeRemoved', (id: string) => {
      console.log('图形已删除:', id)
    })
  }
})
</script>

<template>
  <div class="app">
    <h1>基础示例 - Universal Canvas Engine</h1>
    <p>这是一个基础示例，展示如何使用 @universal-canvas/engine 的 FabricAdapter。</p>
    
    <div class="controls">
      <button @click="addRectangle">添加矩形</button>
      <button @click="addCircle">添加圆形</button>
      <button @click="addImage">增加图片</button>
      <button @click="moveShape">移动图形</button>
      <button @click="changeColor">改变颜色</button>
      <button @click="removeShape">删除图形</button>
      <button @click="serializeCanvas">序列化</button>
      <button @click="deserializeCanvas">反序列化</button>
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
