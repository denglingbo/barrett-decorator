/* tslint:disable */
export default class {
  private readonly name: string = 'gtag';
  private config: any = {};

  constructor(config: any) {
    this.config = config;
    this.init();
  }

  public sendPageview(data: any, meta?: any): void {
    (window as any).gtag('config', this.config.id, {
      page_path: data.$url,
      page_title: meta && meta.barrett ? meta.barrett.amber : 'unknow',
    });
  }

  public sendMaterial(event: string, data: any): void {
    (window as any).gtag('event', event, data);
  }

  private init() {
    const t = document.createElement('script');
    t.async = !0;
    t.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.id}`;
    const s: any = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag() {
      (window as any).dataLayer.push(arguments);
    }

    (window as any).gtag = gtag;

    (window as any).gtag('js', new Date());
  }
}
