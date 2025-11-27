# 高级使用指南

本文档介绍了 universal-canvas-engine 的高级特性和使用技巧。

## 目录

- [自定义适配器](#自定义适配器)
- [高级插件开发](#高级插件开发)
- [性能优化](#性能优化)
- [错误处理](#错误处理)
- [扩展 Shape 类型](#扩展-shape-类型)

## 自定义适配器

除了内置的 FabricAdapter 和 SkylineAdapter，您还可以创建自己的适配器来支持其他 Canvas 实现。

### 创建自定义适配器

```typescript
import type { ICanvasEngine } from 'universal-canvas-engine';
import { Shape } from 'universal-canvas-engine/types/shape';

export class CustomCanvasAdapter implements ICanvasEngine {
  private canvas: any;
  private shapes: Map<string, any> = new Map();

  constructor(canvasInstance: any) {
    this.canvas = canvasInstance;
  }

  addShape(shape: Shape): void {
    // 实现添加图形的逻辑
    const customShape = new CustomShape(shape);
    this.canvas.add(customShape);
    this.shapes.set(shape.id, customShape);
  }

  removeShape(id: string): void {
    // 实现移除图形的逻辑
    const customShape = this.shapes.get(id);
    if (customShape) {
      this.canvas.remove(customShape);
      this.shapes.delete(id);
    }
  }

  moveShape(id: string, x: number, y: number): void {
    // 实现移动图形的逻辑
    const customShape = this.shapes.get(id);
    if (customShape) {
      customShape.setPosition(x, y);
      this.canvas.render();
    }
  }

  resizeShape(id: string, width: number, height: number): void {
    // 实现调整大小的逻辑
    const customShape = this.shapes.get(id);
    if (customShape) {
      customShape.setSize(width, height);
      this.canvas.render();
    }
  }

  setColor(id: string, color: string): void {
    // 实现设置颜色的逻辑
    const customShape = this.shapes.get(id);
    if (customShape) {
      customShape.setColor(color);
      this.canvas.render();
    }
  }

  draw(layers: Shape[][]): void {
    // 实现按图层绘制的逻辑
    this.canvas.clear();
    layers.forEach(layer => {
      layer.forEach(shape => {
        this.addShape(shape);
      });
    });
    this.canvas.render();
  }

  on(event: string, callback: Function): void {
    // 实现事件监听
    this.canvas.addEventListener(event, callback);
  }

  off(event: string, callback: Function): void {
    // 实现事件取消监听
    this.canvas.removeEventListener(event, callback);
  }

  serialize(): string {
    // 实现序列化逻辑
    const data = {
      shapes: Array.from(this.shapes.values()).map(shape => shape.toJSON())
    };
    return JSON.stringify(data);
  }

  deserialize(json: string): void {
    // 实现反序列化逻辑
    const data = JSON.parse(json);
    this.canvas.clear();
    this.shapes.clear();
    
    data.shapes.forEach((shapeData: any) => {
      const shape = new CustomShape(shapeData);
      this.canvas.add(shape);
      this.shapes.set(shapeData.id, shape);
    });
    
    this.canvas.render();
  }
}
```

## 高级插件开发

### 插件生命周期管理

```typescript
import { BasePlugin } from 'universal-canvas-engine';

class AdvancedPlugin extends BasePlugin {
  private disposers: Function[] = [];

  constructor() {
    super('AdvancedPlugin', '1.0.0');
  }

  install(engine: any): void {
    // 添加方法到引擎
    engine.advancedFeature = this.advancedFeature.bind(this);
    
    // 注册事件监听器
    const disposeHandler = () => {
      console.log('Shape added in advanced plugin');
    };
    engine.on('shapeAdded', disposeHandler);
    this.disposers.push(() => engine.off('shapeAdded', disposeHandler));
    
    // 修改现有方法
    const originalAddShape = engine.addShape;
    engine.addShape = (shape: any) => {
      console.log('Intercepting addShape call');
      return originalAddShape.call(engine, shape);
    };
    this.disposers.push(() => {
      engine.addShape = originalAddShape;
    });
  }

  uninstall(engine: any): void {
    // 清理资源
    this.disposers.forEach(disposer => disposer());
    this.disposers = [];
    
    // 移除添加的方法
    delete engine.advancedFeature;
  }

  private advancedFeature(): void {
    console.log('Advanced feature executed');
  }
}
```

### 插件配置选项

```typescript
interface PluginOptions {
  enabledFeatures: string[];
  themeColor: string;
  maxHistory: number;
}

class ConfigurablePlugin extends BasePlugin {
  private options: PluginOptions;

  constructor(options: Partial<PluginOptions> = {}) {
    super('ConfigurablePlugin', '1.0.0');
    
    this.options = {
      enabledFeatures: ['feature1', 'feature2'],
      themeColor: '#007acc',
      maxHistory: 50,
      ...options
    };
  }

  install(engine: any): void {
    // 根据配置应用不同功能
    if (this.options.enabledFeatures.includes('history')) {
      this.setupHistoryFeature(engine);
    }
    
    if (this.options.enabledFeatures.includes('theme')) {
      this.applyTheme(engine, this.options.themeColor);
    }
  }

  private setupHistoryFeature(engine: any): void {
    // 实现历史记录功能
    console.log(`Setting up history with max ${this.options.maxHistory} entries`);
  }

  private applyTheme(engine: any, color: string): void {
    // 应用主题颜色
    console.log(`Applying theme color: ${color}`);
  }
}

// 使用带配置的插件
const plugin = new ConfigurablePlugin({
  enabledFeatures: ['theme'],
  themeColor: '#ff5733'
});
```

## 性能优化

### 批量操作

```typescript
// 不推荐：逐个添加多个图形
shapes.forEach(shape => {
  engine.addShape(shape);
});

// 推荐：使用draw方法批量绘制
engine.draw([shapes]);
```

### 避免频繁重绘

```typescript
// 不推荐：连续多次修改导致频繁重绘
engine.moveShape('shape1', 100, 100);
engine.resizeShape('shape1', 200, 200);
engine.setColor('shape1', '#ff0000');

// 推荐：批量操作后统一渲染
engine.batch(() => {
  engine.moveShape('shape1', 100, 100);
  engine.resizeShape('shape1', 200, 200);
  engine.setColor('shape1', '#ff0000');
});
```

### 懒加载大型资源

```typescript
class LazyLoadingPlugin extends BasePlugin {
  private loadedResources = new Map<string, any>();

  async loadResource(resourceId: string): Promise<any> {
    if (!this.loadedResources.has(resourceId)) {
      // 模拟异步加载资源
      const resource = await this.fetchResource(resourceId);
      this.loadedResources.set(resourceId, resource);
    }
    return this.loadedResources.get(resourceId);
  }

  private async fetchResource(resourceId: string): Promise<any> {
    // 实际的资源获取逻辑
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: resourceId, data: 'resource-data' });
      }, 1000);
    });
  }
}
```

## 错误处理

### 优雅的错误处理

```typescript
try {
  engine.addShape(invalidShape);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Invalid shape data:', error.message);
    // 提供友好的错误提示给用户
    showUserNotification('图形数据无效，请检查输入');
  } else {
    console.error('Unexpected error:', error);
    showUserNotification('发生未知错误，请稍后重试');
  }
}
```

### 自定义错误类型

```typescript
class CanvasEngineError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'CanvasEngineError';
  }
}

class ShapeNotFoundError extends CanvasEngineError {
  constructor(shapeId: string) {
    super(`Shape with id "${shapeId}" not found`, 'SHAPE_NOT_FOUND');
    this.name = 'ShapeNotFoundError';
  }
}

// 在适配器中使用自定义错误
class RobustAdapter implements ICanvasEngine {
  removeShape(id: string): void {
    if (!this.shapes.has(id)) {
      throw new ShapeNotFoundError(id);
    }
    // 实际移除逻辑
  }
}
```

## 扩展 Shape 类型

### 创建自定义 Shape 类型

```typescript
// 扩展 Shape 接口
interface TextShape extends Shape {
  text: string;
  fontSize: number;
  fontFamily: string;
}

interface ImageShape extends Shape {
  src: string;
  alt: string;
}

// 在适配器中处理自定义类型
class ExtendedAdapter implements ICanvasEngine {
  addShape(shape: Shape): void {
    switch (shape.type) {
      case 'text':
        this.addTextShape(shape as TextShape);
        break;
      case 'image':
        this.addImageShape(shape as ImageShape);
        break;
      default:
        this.addBasicShape(shape);
    }
  }

  private addTextShape(shape: TextShape): void {
    // 处理文本图形的特殊逻辑
    console.log(`Adding text shape: ${shape.text}`);
  }

  private addImageShape(shape: ImageShape): void {
    // 处理图像图形的特殊逻辑
    console.log(`Adding image shape: ${shape.src}`);
  }

  private addBasicShape(shape: Shape): void {
    // 处理基本图形的逻辑
    console.log(`Adding basic shape: ${shape.type}`);
  }
}
```

### Shape 工厂模式

```typescript
class ShapeFactory {
  static create(type: string, options: any): Shape {
    const baseShape = {
      id: options.id || this.generateId(),
      type,
      x: options.x || 0,
      y: options.y || 0,
      width: options.width || 100,
      height: options.height || 100
    };

    switch (type) {
      case 'rectangle':
        return { ...baseShape, color: options.color || '#000000' };
      
      case 'circle':
        return { ...baseShape, radius: Math.min(baseShape.width, baseShape.height) / 2 };
      
      case 'text':
        return { 
          ...baseShape, 
          text: options.text || '', 
          fontSize: options.fontSize || 16,
          fontFamily: options.fontFamily || 'Arial'
        };
      
      default:
        throw new Error(`Unsupported shape type: ${type}`);
    }
  }

  private static generateId(): string {
    return 'shape_' + Math.random().toString(36).substr(2, 9);
  }
}

// 使用工厂创建图形
const rectangle = ShapeFactory.create('rectangle', {
  id: 'rect1',
  x: 100,
  y: 100,
  width: 200,
  height: 100,
  color: '#ff0000'
});
```

通过掌握这些高级特性，您可以充分发挥 universal-canvas-engine 的潜力，构建功能强大且高效的 Canvas 应用程序。