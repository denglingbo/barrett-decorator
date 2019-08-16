/*
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${fbId}');
fbq('track', 'PageView');
*/

/* tslint:disable */
export default class {
  private readonly name: string = 'fbq';
  private config: any = {};

  constructor(config: any) {
    this.config = config;
    this.init();
  }

  public sendPageview(data: any, meta?: any): void {
    if (!(window as any).fbq) {
      return;
    }

    (window as any).fbq('track', 'ViewContent', {
      content_name: data.page_type
    });
  }

  public sendMaterial(event: string, data: any): void {
    if (!(window as any).fbq) {
      return;
    }

    (window as any).fbq(event, ...data);
  }

  private init() {
    void (function(f: any, b, e, v, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    (window as any).fbq('init', this.config.id);
    (window as any).fbq('track', 'PageView');
  }
}
