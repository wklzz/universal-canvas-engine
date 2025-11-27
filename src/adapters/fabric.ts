import type { ICanvasEngine } from '../index.ts';
import { Shape } from '../types/shape';

export class FabricAdapter implements ICanvasEngine {
  private canvas: any; // Fabric.js canvas instance
  private shapes: Map<string, any> = new Map();

  constructor(canvas: any) {
    this.canvas = canvas;
  }

  addShape(shape: Shape): void {
    // 实现添加形状到Fabric.js画布的逻辑
    // 这里只是一个示例实现
    console.log(`Adding shape ${shape.id} to Fabric canvas`);
    // const fabricObject = new fabric.Object({
    //   id: shape.id,
    //   left: shape.x,
    //   top: shape.y,
    //   width: shape.width,
    //   height: shape.height,
    //   fill: shape.color
    // });
    // this.canvas.add(fabricObject);
    // this.shapes.set(shape.id, fabricObject);
  }

  removeShape(id: string): void {
    // 实现从Fabric.js画布移除形状的逻辑
    console.log(`Removing shape ${id} from Fabric canvas`);
    // const fabricObject = this.shapes.get(id);
    // if (fabricObject) {
    //   this.canvas.remove(fabricObject);
    //   this.shapes.delete(id);
    // }
  }

  moveShape(id: string, x: number, y: number): void {
    // 实现移动Fabric.js画布上形状的逻辑
    console.log(`Moving shape ${id} to (${x}, ${y})`);
    // const fabricObject = this.shapes.get(id);
    // if (fabricObject) {
    //   fabricObject.set({ left: x, top: y });
    //   this.canvas.renderAll();
    // }
  }

  resizeShape(id: string, width: number, height: number): void {
    // 实现调整Fabric.js画布上形状大小的逻辑
    console.log(`Resizing shape ${id} to ${width}x${height}`);
    // const fabricObject = this.shapes.get(id);
    // if (fabricObject) {
    //   fabricObject.set({ width, height });
    //   this.canvas.renderAll();
    // }
  }

  setColor(id: string, color: string): void {
    // 实现设置Fabric.js画布上形状颜色的逻辑
    console.log(`Setting color of shape ${id} to ${color}`);
    // const fabricObject = this.shapes.get(id);
    // if (fabricObject) {
    //   fabricObject.set({ fill: color });
    //   this.canvas.renderAll();
    // }
  }

  draw(layers: Shape[][]): void {
    // 实现按图层顺序绘制的逻辑
    console.log(`Drawing ${layers.length} layers`);
    // 清空画布
    // this.canvas.clear();
    // 按图层顺序绘制
    // layers.forEach(layer => {
    //   layer.forEach(shape => {
    //     this.addShape(shape);
    //   });
    // });
    // this.canvas.renderAll();
  }

  on(event: string, callback: Function): void {
    // 实现事件监听
    console.log(`Adding event listener for ${event}`);
    // this.canvas.on(event, callback);
  }

  off(event: string, callback: Function): void {
    // 实现事件取消监听
    console.log(`Removing event listener for ${event}`);
    // this.canvas.off(event, callback);
  }

  serialize(): string {
    // 实现序列化逻辑
    console.log('Serializing canvas');
    // return JSON.stringify(this.canvas.toJSON());
    return '{}'; // 示例返回
  }

  deserialize(json: string): void {
    // 实现反序列化逻辑
    console.log('Deserializing canvas');
    // const data = JSON.parse(json);
    // this.canvas.loadFromJSON(data, () => {
    //   this.canvas.renderAll();
    // });
  }
}