@universal-canvas/engine/
│
├─ src/
│   ├─ index.ts          # 对外统一暴露接口
│   ├─ adapters/
│   │   ├─ fabric.ts
│   │   └─ skyline.ts
│   ├─ types/
│   │   ├─ shape.ts
│   │   └─ schema.ts     # 新增：@universal-canvas/schema 类型定义
│   └─ plugins/
│       └─ plugin.ts
│
├─ dist/                 # 编译后的文件
│   ├─ index.js
│   ├─ adapters/
│   ├─ types/
│   └─ plugins/
│
├─ docs/                 # 文档目录
│   ├─ getting-started.md # 快速开始指南
│   ├─ api-reference.md   # API 参考文档
│   └─ advanced-guide.md  # 高级使用指南
│
├─ examples/             # 示例代码
│   ├─ basic-example.html # 基础使用示例
│   ├─ plugin-example.html # 插件系统示例
│   └─ layer-example.html # 图层操作示例
│
├─ package.json
├─ tsconfig.json
├─ README.md
└─ .npmignore

# @universal-canvas/engine

设计一套统一的Canvas API，支持多种Canvas实现，如Fabric.js和Skyline.js。

## 安装

```bash
npm install @universal-canvas/engine
```

## 文档

- [快速开始指南](./docs/getting-started.md) - 帮助您快速上手使用
- [API 参考文档](./docs/api-reference.md) - 详细的API说明
- [高级使用指南](./docs/advanced-guide.md) - 高级特性和最佳实践

## 示例

- [基础使用示例](./examples/basic-example.html) - 展示基本的图形操作
- [插件系统示例](./examples/plugin-example.html) - 演示如何创建和使用插件
- [图层操作示例](./examples/layer-example.html) - 演示按图层绘制功能

## 使用 @universal-canvas/schema

从版本 0.1.0 开始，我们集成了 `@universal-canvas/schema` 包来提供标准化的类型定义。

### 安装

```bash
npm install @universal-canvas/schema
```

### 使用示例

```typescript
import { CanvasSchema, CanvasElement, validateCanvas } from '@universal-canvas/engine';

// 创建符合Schema的画布数据
const canvasData: CanvasSchema = {
  canvas: {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff'
  },
  metadata: {
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  },
  elements: [
    {
      id: 'rect1',
      type: 'rectangle',
      x: 100,
      y: 100,
      width: 200,
      height: 150,
      color: '#ff0000'
    }
  ]
};

// 验证数据是否符合Schema
const validationResult = validateCanvas(canvasData);
if (validationResult.success) {
  console.log('数据验证通过');
} else {
  console.error('数据验证失败:', validationResult.error);
}
```

## 接口定义

```typescript
interface ICanvasEngine {
    // 基础操作
    addShape(shape: Shape | ExtendedShape): void;
    removeShape(id: string): void;
    moveShape(id: string, x: number, y: number): void;
    resizeShape(id: string, width: number, height: number): void;
    setColor(id: string, color: string): void;

    // 绘制接口（按图层顺序绘制）
    draw(layers: (Shape[] | ExtendedShape[])[]): void;

    // 事件代理
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;

    // 序列化 / 反序列化
    serialize(): string;
    deserialize(json: string): void;
}
```