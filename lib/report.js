import { barrett } from './';
import { isPlainObject, isPlainArray } from './util';
export function ReportPageView(data, meta) {
    barrett.forEach(function (b) {
        b.sendPageview(data, meta);
    });
}
export function ReportEntry(reportType, res) {
    var report = barrett.find(function (b) { return b.name === reportType; });
    if (!report) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('上报实例未找到');
        }
        return;
    }
    if (['sensors', 'fbq', 'gtag'].indexOf(reportType) === -1) {
        report.sendMaterial(res);
        return;
    }
    if (reportType === 'fbq') {
        if (isPlainObject(res)) {
            report.sendMaterial(res.event, res.data);
        }
        if (isPlainArray(res)) {
            res.forEach(function (r) {
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
