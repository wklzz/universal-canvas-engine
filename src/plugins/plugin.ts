export interface IPlugin {
  name: string;
  version: string;
  install(engine: any): void;
  uninstall(engine: any): void;
}

export abstract class BasePlugin implements IPlugin {
  name: string;
  version: string;

  constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
  }

  abstract install(engine: any): void;
  abstract uninstall(engine: any): void;
}

// 示例插件
export class ExamplePlugin extends BasePlugin {
  constructor() {
    super('ExamplePlugin', '1.0.0');
  }

  install(engine: any): void {
    console.log(`Installing ${this.name} v${this.version}`);
    // 插件安装逻辑
  }

  uninstall(engine: any): void {
    console.log(`Uninstalling ${this.name} v${this.version}`);
    // 插件卸载逻辑
  }
}