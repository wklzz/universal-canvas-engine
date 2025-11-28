export interface ICanvasEngine {
  // 基础操作
  addShape(shape: any): void;
  removeShape(id: string): void;
  moveShape(id: string, x: number, y: number): void;
  resizeShape(id: string, width: number, height: number): void;
  setColor(id: string, color: string): void;
  
  // 特殊形状操作
  addText(text: string, x: number, y: number, options?: any): void;
  addImage(src: string, x: number, y: number, options?: any): void;

  // 绘制接口（按图层顺序绘制）
  draw(layers: any[][]): void;

  // 事件代理
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;

  // 序列化 / 反序列化
  serialize(): string;
  deserialize(json: string): void;
}

// 导出适配器
export { FabricAdapter } from './adapters/fabric';
export { SkylineAdapter } from './adapters/skyline';

// 导出类型定义
export * from './types/schema';

// 导出核心引擎
export { UniversalCanvasEngine } from './engine';

// 导出插件系统
export { PluginManager } from './plugins/plugin';
export type { IPlugin } from './plugins/plugin';