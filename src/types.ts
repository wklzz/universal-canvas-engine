export interface Shape {
  id: string;
  type: 'image'|'text';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  src?: string;
}

export interface CanvasDocument {
  width: number;
  height: number;
  objects: Shape[];
}
