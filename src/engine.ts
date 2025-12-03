import { CanvasDocument, Shape } from './types';

export class Engine {
  private renderer: any;
  private document!: CanvasDocument;

  async init(container: any, renderer: any, doc: CanvasDocument) {
    this.renderer = new renderer();
    this.document = doc;
    await this.renderer.init(container, doc);
  }

  addObject(shape: Shape) {
    this.document.objects.push(shape);
    this.renderer.addObject(shape);
  }
}
