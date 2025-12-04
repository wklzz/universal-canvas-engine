// 实现engine接口
import { IEngine } from '../engine'
import { InitConfig } from '../types'

export class WeappAdapter implements IEngine {
  private canvas: any = null
  async init(config: InitConfig) {
    // 通过小程序的选择器，获得container的树形
    const container = await this.getContainerRect(config.containerId)
    console.log('weapp adapter init', container)
  }
  getContainerRect(id: string) {
    return new Promise(resolve => {
      wx.createSelectorQuery()
        .select(id)
        .fields({ node: true, rect: true })
        .exec(res => resolve(res[0]));
    });
  }
}
