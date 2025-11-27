# 快速开始指南

本文档将指导您如何快速上手使用 universal-canvas-engine。

## 目录

- [安装](#安装)
- [基本概念](#基本概念)
- [创建第一个画布引擎](#创建第一个画布引擎)
- [基础操作](#基础操作)
- [使用适配器](#使用适配器)
- [插件系统](#插件系统)
- [序列化与反序列化](#序列化与反序列化)

## 安装

使用 npm 安装：

```bash
npm install universal-canvas-engine
```

或者使用 yarn：

```bash
yarn add universal-canvas-engine
```

## 基本概念

universal-canvas-engine 提供了一套统一的 Canvas API，支持多种 Canvas 实现。核心概念包括：

1. **ICanvasEngine 接口**：定义了所有画布操作的标准接口
2. **适配器模式**：为不同的 Canvas 实现提供统一接口
3. **Shape 类型**：表示画布上的图形元素
4. **插件系统**：允许扩展引擎功能

## 创建第一个画布引擎

### 使用 Fabric.js 适配器

```typescript
import { FabricAdapter } from 'universal-canvas-engine';

// 假设你已经有了一个 Fabric.js 画布实例
const fabricCanvas = new fabric.Canvas('canvas');

// 创建适配器实例
const canvasEngine = new FabricAdapter(fabricCanvas);
```

### 使用 Skyline 适配器

```typescript
import { SkylineAdapter } from 'universal-canvas-engine';

// 假设你已经有了一个 Skyline 画布实例
const skylineCanvas = new Skyline.Canvas('canvas');

// 创建适配器实例
const canvasEngine = new SkylineAdapter(skylineCanvas);
```

## 基础操作

### 添加图形

```typescript
// 添加一个矩形
canvasEngine.addShape({
  id: 'rect1',
  type: 'rectangle',
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  color: '#ff0000'
});

// 添加一个圆形
canvasEngine.addShape({
  id: 'circle1',
  type: 'circle',
  x: 200,
  y: 200,
  width: 30,
  height: 30,
  color: '#00ff00'
});
```

### 移除图形

```typescript
canvasEngine.removeShape('rect1');
```

### 移动图形

```typescript
canvasEngine.moveShape('circle1', 300, 300);
```

### 调整图形大小

```typescript
canvasEngine.resizeShape('circle1', 50, 50);
```

### 设置图形颜色

```typescript
canvasEngine.setColor('circle1', '#0000ff');
```

## 使用适配器

### FabricAdapter

FabricAdapter 是针对 Fabric.js 的适配器实现：

```typescript
import { FabricAdapter } from 'universal-canvas-engine';

const fabricCanvas = new fabric.Canvas('canvas');
const fabricEngine = new FabricAdapter(fabricCanvas);

// 现在可以使用统一接口操作 Fabric.js 画布
fabricEngine.addShape({
  id: 'my-shape',
  type: 'rectangle',
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  color: '#333'
});
```

### SkylineAdapter

SkylineAdapter 是针对 Skyline.js 的适配器实现：

```typescript
import { SkylineAdapter } from 'universal-canvas-engine';

const skylineCanvas = new Skyline.Canvas('canvas');
const skylineEngine = new SkylineAdapter(skylineCanvas);

// 使用统一接口操作 Skyline 画布
skylineEngine.addShape({
  id: 'my-shape',
  type: 'rectangle',
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  color: '#333'
});
```

## 插件系统

universal-canvas-engine 提供了灵活的插件系统，允许您扩展引擎功能。

### 创建自定义插件

```typescript
import { BasePlugin } from 'universal-canvas-engine';

class MyCustomPlugin extends BasePlugin {
  constructor() {
    super('MyCustomPlugin', '1.0.0');
  }

  install(engine: any): void {
    console.log(`Installing ${this.name} v${this.version}`);
    // 在这里添加插件安装逻辑
    // 例如：向引擎添加新方法
    engine.customMethod = () => {
      console.log('Custom method called');
    };
  }

  uninstall(engine: any): void {
    console.log(`Uninstalling ${this.name} v${this.version}`);
    // 在这里添加插件卸载逻辑
    delete engine.customMethod;
  }
}

// 使用插件
const plugin = new MyCustomPlugin();
const engine = new FabricAdapter(fabricCanvas);

// 安装插件
plugin.install(engine);

// 使用插件添加的方法
engine.customMethod(); // 输出: Custom method called

// 卸载插件
plugin.uninstall(engine);
```

## 序列化与反序列化

### 序列化画布状态

```typescript
// 获取画布的序列化表示
const serializedData = canvasEngine.serialize();
console.log(serializedData);
```

### 反序列化画布状态

```typescript
// 从序列化数据恢复画布状态
const jsonData = '{"shapes":[{"id":"rect1","type":"rectangle","x":100,"y":100,"width":50,"height":50,"color":"#ff0000"}]}';
canvasEngine.deserialize(jsonData);
```

## 事件处理

```typescript
// 监听事件
canvasEngine.on('shapeAdded', (shape) => {
  console.log('Shape added:', shape);
});

// 取消监听事件
const callback = (shape) => {
  console.log('Shape removed:', shape);
};
canvasEngine.on('shapeRemoved', callback);
canvasEngine.off('shapeRemoved', callback);
```

## 按图层绘制

```typescript
// 创建图层数据
const layers = [
  // 第一层
  [
    { id: 'bg1', type: 'rectangle', x: 0, y: 0, width: 800, height: 600, color: '#ffffff' }
  ],
  // 第二层
  [
    { id: 'rect1', type: 'rectangle', x: 100, y: 100, width: 50, height: 50, color: '#ff0000' },
    { id: 'circle1', type: 'circle', x: 200, y: 200, width: 30, height: 30, color: '#00ff00' }
  ]
];

// 按图层顺序绘制
canvasEngine.draw(layers);
```

## 完整示例

```typescript
import { FabricAdapter } from 'universal-canvas-engine';

// 初始化 Fabric.js 画布
const fabricCanvas = new fabric.Canvas('canvas');
const canvasEngine = new FabricAdapter(fabricCanvas);

// 添加一些图形
canvasEngine.addShape({
  id: 'background',
  type: 'rectangle',
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  color: '#f0f0f0'
});

canvasEngine.addShape({
  id: 'my-rect',
  type: 'rectangle',
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  color: '#ff0000'
});

// 移动图形
canvasEngine.moveShape('my-rect', 200, 200);

// 监听事件
canvasEngine.on('shapeMoved', (shape, newX, newY) => {
  console.log(`Shape ${shape.id} moved to (${newX}, ${newY})`);
});

// 序列化保存
const savedState = canvasEngine.serialize();
localStorage.setItem('canvasState', savedState);

// 反序列化恢复
const loadedState = localStorage.getItem('canvasState');
if (loadedState) {
  canvasEngine.deserialize(loadedState);
}
```

通过以上指南，您应该能够快速上手使用 universal-canvas-engine。更多高级功能请参考 API 文档。