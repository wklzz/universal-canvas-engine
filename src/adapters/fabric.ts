import { ICanvasEngine } from '../index';
import { CanvasEventType, EventCallback } from '../types/events';
import { CanvasSchema } from '../types/schema';
import { convertSchemaToFabric, convertFabricToSchema } from '../utils/schema-converter';

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
      console.log('图片宽度:', imgElement.width);
      console.log('图片高度:', imgElement.height);

      if (x === 0) {
        x = imgElement.width;
      }

      if (y === 0) {
        y = imgElement.height;
      }

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

  /**
   * 添加事件监听器
   * @param event 事件类型
   * @param callback 事件回调函数
 // 鼠标事件
  | 'mouse:down'
  | 'mouse:move'
  | 'mouse:up'
  | 'mouse:over'
  | 'mouse:out'
  | 'mouse:enter'
  | 'mouse:leave'
  | 'mouse:wheel'
   */

  on(event: CanvasEventType, callback: EventCallback): void {
    switch (event) {
      case 'object:added':
        this.canvas.on('object:added', callback as any);
        break;
      case 'object:removed':
        this.canvas.on('object:removed', callback as any);
        break;
      case 'object:modified':
        this.canvas.on('object:modified', callback as any);
        break;
      case 'object:moving':
        this.canvas.on('object:moving', callback as any);
        break;
      case 'object:scaling':
        this.canvas.on('object:scaling', callback as any);
        break;
      case 'object:rotating':
        this.canvas.on('object:rotating', callback as any);
        break;
      default:
        throw new Error(`Unsupported event: ${event}`);
    }
  }

  off(event: CanvasEventType, callback: EventCallback): void {
    switch (event) {
      case 'shape:added':
        this.canvas.off('object:added', callback as any);
        break;
      default:
        throw new Error(`Unsupported event: ${event}`);
    }
  }

  emit(event: CanvasEventType, ...args: any[]): void {
    // Fabric适配器不直接实现emit方法
    throw new Error('FabricAdapter does not support emit method.' + event + args.join(','));
    // 事件通过canvas触发
  }

  serialize(): string {
    // 将Fabric数据转换为标准Schema格式
    const fabricData = this.canvas.toJSON();
    const schema = convertFabricToSchema(fabricData);
    return JSON.stringify(schema);
  }

  deserialize(json: string): void {
    // 将标准Schema格式转换为Fabric数据
    const schema: CanvasSchema = JSON.parse(json);
    const fabricData = convertSchemaToFabric(schema);
    this.canvas.loadFromJSON(fabricData, () => {
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