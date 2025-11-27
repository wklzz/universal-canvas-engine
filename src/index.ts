import { Shape, Layer } from './types/shape';
import { FabricAdapter } from './adapters/fabric';
import { SkylineAdapter } from './adapters/skyline';
import { IPlugin, BasePlugin, ExamplePlugin } from './plugins/plugin';

// 导入新的Schema类型定义
import { 
  CanvasSchema, 
  CanvasDocument,
  BaseElement,
  CanvasElement,
  CanvasProperties,
  CanvasMetadata,
  ExtendedShape,
  ExtendedLayer
} from './types/schema';

export interface ICanvasEngine {
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

// 为了在浏览器环境中使用，将接口和类添加到全局window对象
if (typeof window !== 'undefined') {
  (window as any).FabricAdapter = FabricAdapter;
  (window as any).SkylineAdapter = SkylineAdapter;
  (window as any).BasePlugin = BasePlugin;
  (window as any).ExamplePlugin = ExamplePlugin;
}

export type { Shape, Layer };
export { FabricAdapter, SkylineAdapter };
export type { IPlugin, BasePlugin, ExamplePlugin };

// 导出新的Schema类型
export type { 
  CanvasSchema, 
  CanvasDocument,
  BaseElement,
  CanvasElement,
  CanvasProperties,
  CanvasMetadata,
  ExtendedShape,
  ExtendedLayer
};