import { barrett } from './';

export function ReportPageView(data: any) {
  barrett.forEach((b: any) => {
    b.sendPageview(data);
  });
}

export function ReportMaterial(event: string, data: any) {
  barrett.forEach((b: any) => {
    b.sendMaterial(event, data);
  });
}
