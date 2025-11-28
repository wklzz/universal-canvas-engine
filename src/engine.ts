import { ICanvasEngine } from './index';
import { FabricAdapter } from './adapters/fabric';
import { SkylineAdapter } from './adapters/skyline';
import { PluginManager } from './plugins/plugin';

export class UniversalCanvasEngine implements ICanvasEngine {
  private adapter: ICanvasEngine;
  private pluginManager: PluginManager;

  constructor(canvasElement: HTMLCanvasElement, adapterType: 'fabric' | 'skyline' = 'fabric') {
    if (adapterType === 'fabric') {
      this.adapter = new FabricAdapter(canvasElement);
    } else {
      this.adapter = new SkylineAdapter(canvasElement);
    }
    
    this.pluginManager = new PluginManager(this);
  }

  addShape(shape: any): void {
    this.adapter.addShape(shape);
  }

  removeShape(id: string): void {
    this.adapter.removeShape(id);
  }

  moveShape(id: string, x: number, y: number): void {
    this.adapter.moveShape(id, x, y);
  }

  resizeShape(id: string, width: number, height: number): void {
    this.adapter.resizeShape(id, width, height);
  }

  setColor(id: string, color: string): void {
    this.adapter.setColor(id, color);
  }

  addText(text: string, x: number, y: number, options?: any): void {
    this.adapter.addText(text, x, y, options);
  }

  addImage(src: string, x: number, y: number, options?: any): void {
    this.adapter.addImage(src, x, y, options);
  }

  draw(layers: any[][]): void {
    this.adapter.draw(layers);
  }

  on(event: string, callback: Function): void {
    this.adapter.on(event, callback);
  }

  off(event: string, callback: Function): void {
    this.adapter.off(event, callback);
  }

  serialize(): string {
    return this.adapter.serialize();
  }

  deserialize(json: string): void {
    this.adapter.deserialize(json);
  }

  getPluginManager(): PluginManager {
    return this.pluginManager;
  }
}