@universal-canvas/engine/
│
├─ src/
│   ├─ index.ts          # 对外统一暴露接口
│   ├─ engine.ts         # 核心引擎实现
│   ├─ adapters/
│   │   ├─ fabric.ts     # Fabric适配器
│   │   └─ skyline.ts    # Skyline适配器
│   ├─ types/
│   │   └─ schema.ts     # @universal-canvas/schema 类型定义
│   └─ plugins/
│       └─ plugin.ts     # 插件系统
│
├─ dist/                 # 编译后的文件
│   ├─ index.js
│   ├─ adapters/
│   ├─ types/
│   └─ plugins/
│
├─ examples/             # 示例代码
│   ├─ index.html        # 示例导航页面
│   ├─ basic-example.html # 基础使用示例
│   ├─ plugin-example.html # 插件系统示例
│   └─ layer-example.html # 图层操作示例
│
├─ package.json
├─ tsconfig.json
├─ rollup.config.js
└─ README.md

# @universal-canvas/engine

设计一套统一的Canvas API，支持多种Canvas实现，如Fabric.js和Skyline.js。

## 特性

- 🔄 **适配器模式** - 支持多种Canvas实现（Fabric.js、Skyline.js等）
- 🎨 **统一接口** - 提供一致的API，屏蔽底层实现差异
- 🧩 **插件系统** - 可扩展的插件机制，方便功能扩展
- 📦 **类型安全** - 使用TypeScript编写，完整的类型定义
- 📄 **标准Schema** - 集成@universal-canvas/schema，提供标准化的数据结构
- 🌐 **跨平台** - 支持浏览器环境使用

## 安装

```bash
npm install @universal-canvas/engine
```

## 开发

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 构建项目
npm run build

# 开发模式（监听文件变化并启动本地服务器）
npm run dev
```

访问 [http://localhost:5175](http://localhost:5175) 查看示例页面。

## 示例

- [基础使用示例](./examples/basic-example.html) - 展示基本的图形操作
- [插件系统示例](./examples/plugin-example.html) - 演示如何创建和使用插件
- [图层操作示例](./examples/layer-example.html) - 演示按图层绘制功能

## 文档

- [快速开始指南](./docs/getting-started.md) - 帮助您快速上手使用
- [API 参考文档](./docs/api-reference.md) - 详细的API说明
- [高级使用指南](./docs/advanced-guide.md) - 高级特性和最佳实践

## 示例

- [基础使用示例](./examples/basic-example.html) - 展示基本的图形操作
- [插件系统示例](./examples/plugin-example.html) - 演示如何创建和使用插件
- [图层操作示例](./examples/layer-example.html) - 演示按图层绘制功能

## 使用示例

### 基础使用

```typescript
import { UniversalCanvasEngine } from '@universal-canvas/engine';

// 获取canvas元素
const canvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;

// 创建引擎实例（默认使用Fabric适配器）
const engine = new UniversalCanvasEngine(canvasElement);

// 添加一个矩形
const rectangle = {
  id: 'rect1',
  type: 'rectangle',
  x: 100,
  y: 100,
  width: 200,
  height: 150,
  color: '#ff0000'
};

engine.addShape(rectangle);

// 移动图形
engine.moveShape('rect1', 200, 200);

// 序列化画布状态
const serialized = engine.serialize();
console.log(serialized);
```

### 使用不同适配器

```typescript
// 使用Skyline适配器
const engine = new UniversalCanvasEngine(canvasElement, 'skyline');
```

### 插件系统

```typescript
import { IPlugin } from '@universal-canvas/engine';

// 创建一个插件
class MyPlugin implements IPlugin {
  name = 'my-plugin';
  version = '1.0.0';
  
  install(engine: any) {
    console.log('MyPlugin installed');
  }
  
  uninstall(engine: any) {
    console.log('MyPlugin uninstalled');
  }
}

// 注册插件
const pluginManager = engine.getPluginManager();
const myPlugin = new MyPlugin();
pluginManager.register(myPlugin);
```

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