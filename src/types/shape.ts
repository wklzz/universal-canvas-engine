export interface Shape {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  [key: string]: any; // 允许其他属性
}

export interface Layer {
  id: string;
  shapes: Shape[];
  visible: boolean;
  opacity: number;
}