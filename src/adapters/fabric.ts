import { ICanvasEngine } from '../index';
import { CanvasEventType, EventCallback } from '../types/events';

// 为了在浏览器和Node.js环境中都能正常工作，我们需要动态获取fabric对象
// 在Node.js环境中导入fabric
import * as fabric from 'fabric';

export class FabricAdapter implements ICanvasEngine {
  private canvas: fabric.Canvas;
  private shapes: Map<string, any> = new Map();

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasElement);
  }

  addShape(shape: any): void {
    // 添加形状到fabric画布
    const fabricShape = this.createFabricShape(shape);
    this.canvas.add(fabricShape);
    this.shapes.set(shape.id, fabricShape);
  }

  removeShape(id: string): void {
    const shape = this.shapes.get(id);
    if (shape) {
      this.canvas.remove(shape);
      this.shapes.delete(id);
    }
  }

  moveShape(id: string, x: number, y: number): void {
    const shape = this.shapes.get(id);
    if (shape) {
      shape.set({ left: x, top: y });
      this.canvas.renderAll();
    }
  }

  resizeShape(id: string, width: number, height: number): void {
    const shape = this.shapes.get(id);
    if (shape) {
      shape.set({ width, height });
      this.canvas.renderAll();
    }
  }

  setColor(id: string, color: string): void {
    const shape = this.shapes.get(id);
    if (shape) {
      shape.set({ fill: color });
      this.canvas.renderAll();
    }
  }

  addText(text: string, x: number, y: number, options?: any): void {
    const textObj = new fabric.Text(text, {
      left: x,
      top: y,
      ...options
    });
    
    this.canvas.add(textObj);
    // 为文本对象生成一个唯一ID并存储
    const id = `text_${Date.now()}`;
    this.shapes.set(id, textObj);
  }

  addImage(src: string, x: number, y: number, options?: any): void {
    // 简化实现，创建一个图片元素并添加到画布
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.onload = () => {
      const img = new fabric.Image(imgElement, {
        left: x,
        top: y,
        ...options
      });
      
      this.canvas.add(img);
      // 为图片对象生成一个唯一ID并存储
      const id = `image_${Date.now()}`;
      this.shapes.set(id, img);
    };
  }

  draw(layers: any[][]): void {
    // 清除画布
    this.canvas.clear();
    
    // 按图层顺序绘制
    layers.forEach(layer => {
      layer.forEach(shape => {
        this.addShape(shape);
      });
    });
    
    this.canvas.renderAll();
  }

  on(event: CanvasEventType, callback: EventCallback): void {
    this.canvas.on(event, callback as any);
  }

  off(event: CanvasEventType, callback: EventCallback): void {
    this.canvas.off(event, callback as any);
  }

  emit(event: CanvasEventType, ...args: any[]): void {
    // Fabric适配器不直接实现emit方法
    // 事件通过canvas触发
  }

  serialize(): string {
    return JSON.stringify(this.canvas.toJSON());
  }

  deserialize(json: string): void {
    this.canvas.loadFromJSON(json, () => {
      this.canvas.renderAll();
    });
  }

  private createFabricShape(shape: any): any {
    // 根据形状类型创建对应的fabric对象
    switch (shape.type) {
      case 'rectangle':
        return new fabric.Rect({
          id: shape.id,
          left: shape.x,
          top: shape.y,
          width: shape.width,
          height: shape.height,
          fill: shape.color || '#000000'
        });
      case 'circle':
        return new fabric.Circle({
          id: shape.id,
          left: shape.x,
          top: shape.y,
          radius: shape.radius,
          fill: shape.color || '#000000'
        });
      default:
        throw new Error(`Unsupported shape type: ${shape.type}`);
    }
  }
}