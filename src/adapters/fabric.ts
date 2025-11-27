import type { ICanvasEngine } from '../index.ts';
import { Shape } from '../types/shape';

declare const fabric: any;

export class FabricAdapter implements ICanvasEngine {
  private canvas: any; // Fabric.js canvas instance
  private shapes: Map<string, any> = new Map();

  constructor(canvas: any) {
    this.canvas = canvas;
  }

  addShape(shape: Shape): void {
    // 实现添加形状到Fabric.js画布的逻辑
    console.log(`Adding shape ${shape.id} to Fabric canvas`);
    
    let fabricObject: any;
    
    switch (shape.type) {
      case 'rectangle':
        fabricObject = new fabric.Rect({
          left: shape.x,
          top: shape.y,
          width: shape.width,
          height: shape.height,
          fill: shape.color || '#000000'
        });
        break;
        
      case 'circle':
        fabricObject = new fabric.Circle({
          left: shape.x,
          top: shape.y,
          radius: Math.min(shape.width, shape.height) / 2,
          fill: shape.color || '#000000'
        });
        break;
        
      case 'image':
        // 对于图片类型，我们稍后会通过特殊方法处理
        console.warn('Image type should be handled through special method, not addShape directly');
        return;
        
      default:
        // 默认创建一个矩形
        fabricObject = new fabric.Rect({
          left: shape.x,
          top: shape.y,
          width: shape.width,
          height: shape.height,
          fill: shape.color || '#000000'
        });
    }
    
    // 添加自定义属性
    fabricObject.id = shape.id;
    
    this.canvas.add(fabricObject);
    this.shapes.set(shape.id, fabricObject);
  }

  removeShape(id: string): void {
    // 实现从Fabric.js画布移除形状的逻辑
    console.log(`Removing shape ${id} from Fabric canvas`);
    const fabricObject = this.shapes.get(id);
    if (fabricObject) {
      this.canvas.remove(fabricObject);
      this.shapes.delete(id);
    }
  }

  moveShape(id: string, x: number, y: number): void {
    // 实现移动Fabric.js画布上形状的逻辑
    console.log(`Moving shape ${id} to (${x}, ${y})`);
    const fabricObject = this.shapes.get(id);
    if (fabricObject) {
      fabricObject.set({ left: x, top: y });
      this.canvas.renderAll();
    }
  }

  resizeShape(id: string, width: number, height: number): void {
    // 实现调整Fabric.js画布上形状大小的逻辑
    console.log(`Resizing shape ${id} to ${width}x${height}`);
    const fabricObject = this.shapes.get(id);
    if (fabricObject) {
      fabricObject.set({ width, height });
      this.canvas.renderAll();
    }
  }

  setColor(id: string, color: string): void {
    // 实现设置Fabric.js画布上形状颜色的逻辑
    console.log(`Setting color of shape ${id} to ${color}`);
    const fabricObject = this.shapes.get(id);
    if (fabricObject) {
      fabricObject.set({ fill: color });
      this.canvas.renderAll();
    }
  }

  /**
   * 添加图片到画布
   * @param id 图片标识
   * @param url 图片URL
   * @param options 图片选项（可选）
   */
  addImage(id: string, url: string, options?: any): Promise<void> {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(url, (img: any) => {
        if (!img) {
          reject(new Error('Failed to load image'));
          return;
        }

        // 应用选项
        if (options) {
          img.set(options);
        }

        // 添加自定义属性
        img.id = id;

        // 添加到画布
        this.canvas.add(img);
        this.canvas.renderAll();

        // 保存到shapes映射中
        this.shapes.set(id, img);
        
        resolve();
      }, {
        crossOrigin: 'anonymous',
        ...options
      });
    });
  }

  draw(layers: Shape[][]): void {
    // 实现按图层顺序绘制的逻辑
    console.log(`Drawing ${layers.length} layers`);
    // 清空画布
    this.canvas.clear();
    this.shapes.clear();
    
    // 按图层顺序绘制
    layers.forEach(layer => {
      layer.forEach(shape => {
        this.addShape(shape);
      });
    });
    
    this.canvas.renderAll();
  }

  on(event: string, callback: Function): void {
    // 实现事件监听
    console.log(`Adding event listener for ${event}`);
    this.canvas.on(event, callback);
  }

  off(event: string, callback: Function): void {
    // 实现事件取消监听
    console.log(`Removing event listener for ${event}`);
    this.canvas.off(event, callback);
  }

  serialize(): string {
    // 实现序列化逻辑
    console.log('Serializing canvas');
    return JSON.stringify(this.canvas.toJSON());
  }

  deserialize(json: string): void {
    // 实现反序列化逻辑
    console.log('Deserializing canvas');
    const data = JSON.parse(json);
    this.canvas.loadFromJSON(data, () => {
      this.canvas.renderAll();
      // 重新建立shapes映射
      this.canvas.getObjects().forEach((obj: any) => {
        if (obj.id) {
          this.shapes.set(obj.id, obj);
        }
      });
    });
  }
}