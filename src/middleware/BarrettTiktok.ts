/* tslint:disable */
export default class {
  private readonly name: string = 'tiktok';
  private config: any = {};

  constructor(config: any) {
    this.config = config;
    this.init();
  }

  // tiktok没有手动上报，上报事件是在后台设置
  public sendPageview(data: any, meta?: any, pageKey?: string | null): void {
    // 
  }

  // tiktok没有手动上报，上报事件是在后台设置
  public sendMaterial(event: string, data: any): void {
    // 
  }

  private init() {
    const ids = this.config.id;
    // tiktok一个网页可以上报多个id，所以这里可能是数组
    const idsList = ids.split(',');
    idsList.forEach((id: string) => {
      const t = document.createElement('script');
      t.type = 'text/javascript';
      t.async = !0;
      t.src = `${document.location.protocol}//static.bytedance.com/pixel/sdk.js?sdkid=${id}`;
      const s: any = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(t, s);
    });
  }
}
