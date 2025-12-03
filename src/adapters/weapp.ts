export class WeappRenderer {
  private ctx: any;
  private doc: any;
  private canvas: any;
  private offscreen: any;
  private container: any;

  async init(container: any, doc: any) {
    this.container = container;
    this.doc = doc;

    // 小程序 OffscreenCanvas 初始化
    await new Promise<void>((resolve, reject) => {
      const query = wx.createSelectorQuery();
      query.select('#' + container.id).fields({ node: true, size: true }).exec((res: any) => {
        if (!res || !res[0]) return reject('Canvas not found');

        const canvas = res[0].node;
        const dpr = wx.getSystemInfoSync().pixelRatio;

        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;

        this.canvas = canvas;
        this.offscreen = canvas.transferControlToOffscreen();
        this.ctx = this.offscreen.getContext('2d');
        this.ctx.scale(dpr, dpr);

        resolve(); // ✅ 这里 resolve 就有作用了
      });
    });

    this.draw();
  }

  addObject(obj: any) {
    this.doc.objects.push(obj);
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.doc.width, this.doc.height);

    this.doc.objects.forEach((obj: any) => {
      if (obj.type === 'image') {
        ctx.drawImage(obj.src, obj.x, obj.y, obj.width, obj.height);
      } else if (obj.type === 'text') {
        ctx.setFontSize(24);
        ctx.setFillStyle('black');
        ctx.fillText(obj.text, obj.x, obj.y);
      }
    });

    ctx.draw();
  }
}