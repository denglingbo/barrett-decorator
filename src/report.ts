import { barrett } from './';
import BarrettSensors from './middleware/BarrettSensors';
import BarrettFbq from './middleware/BarrettFbq';
import BarrettGtag from './middleware/BarrettGtag';
import { isPlainObject, isPlainArray } from './util';

export type IReportType = 'sensors' | 'fbq' | 'gtag';

interface IReportClass {
  sendPageview: (...args: any[]) => void;
  sendMaterial: (...args: any[]) => void;
}

export function ReportPageView(data: any, meta: any) {
  barrett.forEach((b: BarrettSensors | BarrettFbq) => {
    b.sendPageview(data, meta);
  });
}

// export function ReportMaterial(event: string, data: any) {
//   const fn: BarrettSensors = barrett.find((b: any) => b.name === 'sensors');

//   if (!fn) {
//     return;
//   }

//   fn.sendMaterial(event, data);
// }

// export function ReportFbq(event: string, data: any) {
//   const fn: BarrettFbq = barrett.find((b: any) => b.name === 'fbq');

//   if (!fn) {
//     return;
//   }

//   fn.sendMaterial(event, data);
// }

// export function ReportGtag(event: string, data: any) {
//   const fn: any = barrett.find((b: any) => b.name === 'gtag');

//   if (!fn) {
//     return;
//   }

//   fn.sendMaterial(event, data);
// }

export function ReportEntry(reportType: IReportType, res: any) {
  // 上报实例
  const report: IReportClass = barrett.find((b: any) => b.name === reportType);

  if (!report) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('上报实例未找到');
    }
    return;
  }

  // 非预设的上报方式，由 inject 到middlware 的上报实例进行转发
  if (['sensors', 'fbq', 'gtag'].indexOf(reportType) === -1) {
    report.sendMaterial(res);
    return;
  }

  if (reportType === 'fbq') {
    if (isPlainObject(res)) {
      report.sendMaterial(res.event, res.data);
    }

    if (isPlainArray(res)) {
      res.forEach((r: any) => {
        report.sendMaterial(r.event, r.data);
      });
    }
  }

  if (reportType === 'sensors') {
    report.sendMaterial(res.event, res.data);
  }

  if (reportType === 'gtag') {
    report.sendMaterial(res.event, res.data);
  }
}
