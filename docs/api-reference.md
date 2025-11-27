# API 参考文档

## 目录

- [ICanvasEngine 接口](#icanvasengine-接口)
- [类型定义](#类型定义)
- [适配器](#适配器)
- [插件系统](#插件系统)

## ICanvasEngine 接口

ICanvasEngine 是 universal-canvas-engine 的核心接口，定义了所有画布操作的标准方法。

### addShape(shape: Shape): void

添加一个图形到画布。

**参数:**
- `shape`: 要添加的图形对象

**示例:**
```typescript
engine.addShape({
  id: 'rect1',
  type: 'rectangle',
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  color: '#ff0000'
});
```

### removeShape(id: string): void

从画布中移除指定ID的图形。

**参数:**
- `id`: 要移除的图形ID

**示例:**
```typescript
engine.removeShape('rect1');
```

### moveShape(id: string, x: number, y: number): void

移动指定ID的图形到新位置。

**参数:**
- `id`: 图形ID
- `x`: 新的X坐标
- `y`: 新的Y坐标

**示例:**
```typescript
engine.moveShape('rect1', 200, 200);
```

### resizeShape(id: string, width: number, height: number): void

调整指定ID图形的大小。

**参数:**
- `id`: 图形ID
- `width`: 新的宽度
- `height`: 新的高度

**示例:**
```typescript
engine.resizeShape('rect1', 100, 100);
```

### setColor(id: string, color: string): void

设置指定ID图形的颜色。

**参数:**
- `id`: 图形ID
- `color`: 新的颜色值（支持十六进制、RGB等格式）

**示例:**
```typescript
engine.setColor('rect1', '#00ff00');
```

### draw(layers: Shape[][]): void

按图层顺序绘制图形。

**参数:**
- `layers`: 二维数组，每个子数组代表一个图层

**示例:**
```typescript
const layers = [
  // 背景层
  [
    { id: 'bg', type: 'rectangle', x: 0, y: 0, width: 800, height: 600, color: '#ffffff' }
  ],
  // 内容层
  [
    { id: 'rect1', type: 'rectangle', x: 100, y: 100, width: 50, height: 50, color: '#ff0000' }
  ]
];

engine.draw(layers);
```

### on(event: string, callback: Function): void

注册事件监听器。

**参数:**
- `event`: 事件名称
- `callback`: 回调函数

**支持的事件:**
- `shapeAdded`: 图形添加时触发
- `shapeRemoved`: 图形移除时触发
- `shapeMoved`: 图形移动时触发
- `shapeResized`: 图形调整大小时触发
- `shapeColored`: 图形颜色改变时触发

**示例:**
```typescript
engine.on('shapeAdded', (shape) => {
  console.log('Added shape:', shape);
});
```

### off(event: string, callback: Function): void

移除事件监听器。

**参数:**
- `event`: 事件名称
- `callback`: 要移除的回调函数

**示例:**
```typescript
const handler = (shape) => {
  console.log('Added shape:', shape);
};

engine.on('shapeAdded', handler);
// ... later
engine.off('shapeAdded', handler);
```

### serialize(): string

序列化当前画布状态为JSON字符串。

**返回值:**
- `string`: 序列化的JSON字符串

**示例:**
```typescript
const state = engine.serialize();
localStorage.setItem('canvasState', state);
```

### deserialize(json: string): void

从JSON字符串反序列化画布状态。

**参数:**
- `json`: 序列化的JSON字符串

**示例:**
```typescript
const state = localStorage.getItem('canvasState');
if (state) {
  engine.deserialize(state);
}
```

## 类型定义

### Shape

表示画布上的图形元素。

**属性:**
- `id`: string - 图形唯一标识符
- `type`: string - 图形类型（如 'rectangle', 'circle' 等）
- `x`: number - X坐标
- `y`: number - Y坐标
- `width`: number - 宽度
- `height`: number - 高度
- `color`: string (可选) - 颜色
- `[key: string]: any` - 其他自定义属性

**示例:**
```typescript
const shape: Shape = {
  id: 'rect1',
  type: 'rectangle',
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  color: '#ff0000',
  customProperty: 'value'
};
```

### Layer

表示图层。

**属性:**
- `id`: string - 图层唯一标识符
- `shapes`: Shape[] - 图层中的图形数组
- `visible`: boolean - 图层是否可见
- `opacity`: number - 图层透明度 (0-1)

## 适配器

### FabricAdapter

Fabric.js 适配器实现。

**构造函数:**
```typescript
new FabricAdapter(fabricCanvasInstance)
```

**参数:**
- `fabricCanvasInstance`: Fabric.js 画布实例

**示例:**
```typescript
import { FabricAdapter } from 'universal-canvas-engine';

const fabricCanvas = new fabric.Canvas('canvas');
const adapter = new FabricAdapter(fabricCanvas);
```

### SkylineAdapter

Skyline.js 适配器实现。

**构造函数:**
```typescript
new SkylineAdapter(skylineCanvasInstance)
```

**参数:**
- `skylineCanvasInstance`: Skyline.js 画布实例

**示例:**
```typescript
import { SkylineAdapter } from 'universal-canvas-engine';

const skylineCanvas = new Skyline.Canvas('canvas');
const adapter = new SkylineAdapter(skylineCanvas);
```

## 插件系统

### IPlugin 接口

插件接口定义。

**属性:**
- `name`: string - 插件名称
- `version`: string - 插件版本

**方法:**
- `install(engine: any): void` - 安装插件
- `uninstall(engine: any): void` - 卸载插件

### BasePlugin 抽象类

插件基类，实现了 IPlugin 接口。

**构造函数:**
```typescript
new BasePlugin(name: string, version: string)
```

**参数:**
- `name`: 插件名称
- `version`: 插件版本

### ExamplePlugin

示例插件实现。

**构造函数:**
```typescript
new ExamplePlugin()
```

**示例:**
```typescript
import { ExamplePlugin } from 'universal-canvas-engine';

const plugin = new ExamplePlugin();
plugin.install(engine);
// ... 使用插件功能
plugin.uninstall(engine);
```