export interface IPlugin {
  name: string;
  version: string;
  install(engine: any): void;
  uninstall(engine: any): void;
}

export class PluginManager {
  private plugins: Map<string, IPlugin> = new Map();
  private engine: any;

  constructor(engine: any) {
    this.engine = engine;
  }

  register(plugin: IPlugin): void {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin ${plugin.name} is already registered`);
    }
    
    this.plugins.set(plugin.name, plugin);
    plugin.install(this.engine);
  }

  unregister(name: string): void {
    const plugin = this.plugins.get(name);
    if (plugin) {
      plugin.uninstall(this.engine);
      this.plugins.delete(name);
    }
  }

  getPlugin(name: string): IPlugin | undefined {
    return this.plugins.get(name);
  }

  getAllPlugins(): IPlugin[] {
    return Array.from(this.plugins.values());
  }
}