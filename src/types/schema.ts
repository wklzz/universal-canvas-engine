import { CanvasSchema, CanvasDocument } from '@universal-canvas/schema';
import { BaseElement, CanvasElement } from '@universal-canvas/schema/src/types/elements';
import { CanvasProperties, CanvasMetadata } from '@universal-canvas/schema/src/types/canvas';
import { BorderStyle, ShadowStyle, GradientStyle } from '@universal-canvas/schema/src/types/styles';

// 重新导出所有类型定义
export type { 
  CanvasSchema, 
  CanvasDocument,
  BaseElement,
  CanvasElement,
  CanvasProperties,
  CanvasMetadata,
  BorderStyle,
  ShadowStyle,
  GradientStyle
};

// 扩展Shape接口以兼容新的Schema
export interface ExtendedShape extends BaseElement {
  color?: string;
  [key: string]: any; // 允许其他属性
}

// 扩展Layer接口以兼容新的Schema
export interface ExtendedLayer {
  id: string;
  shapes: ExtendedShape[];
  visible: boolean;
  opacity: number;
}