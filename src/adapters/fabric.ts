import { ICanvasEngine } from '../index';
import * as fabric from 'fabric';

export class FabricAdapter implements ICanvasEngine {
  private canvas: fabric.Canvas;
  private shapes: Map<string, any> = new Map();

  constructor(canvasElement: HTMLCanvasElement) {
    // 这里应该初始化fabric.Canvas，但由于我们不想让使用方安装fabric，
    // 我们会在构建时将其作为外部依赖处理
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
    const textObj = new fabric.FabricText(text, {
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
      const img = new fabric.FabricImage(imgElement, {
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

  on(event: string, callback: Function): void {
    this.canvas.on(event as keyof fabric.CanvasEvents, callback as any);
  }

  off(event: string, callback: Function): void {
    this.canvas.off(event as keyof fabric.CanvasEvents, callback as any);
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