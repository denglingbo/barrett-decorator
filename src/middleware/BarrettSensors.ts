import sensors from 'sa-sdk-javascript';

export const sensorsConfig = {
  send_type: 'ajax',
  // server_url: process.env.VUE_APP_SENSORS_API,
  // heatmap_url: 'https://static.sensorsdata.cn/sdk/1.14.2/sensorsdata.min.js',
  server_url: '',
  heatmap_url: '',
  use_client_time: true,
};

class BarrettSensors {
  private readonly name: string = 'sensors';
  private config: any = sensorsConfig;
  private uid: string | null = null;

  constructor(config: any, uid: string) {
    this.config = config;
    this.uid = uid;

    this.init();
  }

  public sendPageview(data: any, meta?: any, pageKey?: string | null): void {
    const amber = meta.barrett && meta.barrett.amber;

    const def = {
      page_type: pageKey ? amber[pageKey] : amber,
    };

    sensors.quick('autoTrackSinglePage', {
      ...data,
      ...def,
    });
  }

  public sendMaterial(event: string, data: any): void {
    sensors.track(event, data);
  }

  private init() {
    sensors.init(this.config);

    if (this.uid) {
      sensors.login(this.uid);
    }
  }
}

export default BarrettSensors;
