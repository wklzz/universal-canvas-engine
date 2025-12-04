import { InitConfig } from "./types";

// 定义engin接口
export interface IEngine {
  init(config: InitConfig): void;
}
