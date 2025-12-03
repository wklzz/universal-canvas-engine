import * as fabric  from 'fabric';
import { Shape, CanvasDocument } from '../types';

export class FabricRenderer {
  private canvas!: fabric.Canvas;

  async init(container: HTMLCanvasElement, doc: CanvasDocument) {
    this.canvas = new fabric.Canvas(container, {
      width: doc.width,
      height: doc.height,
      preserveObjectStacking: true,
    });
  }

  addObject(obj: Shape) {
    if (obj.type === 'image' && obj.src) {
      const image = new fabric.FabricImage(obj.src, {
        left: obj.x,
        top: obj.y,
      });
      this.canvas.add(image);
    } else if (obj.type === 'text' && obj.text) {
      const text = new fabric.FabricText(obj.text, {
        left: obj.x,
        top: obj.y,
        fontSize: 24,
        fill: '#000'
      });
      this.canvas.add(text);
    }
  }
}
