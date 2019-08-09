import { barrett } from './';
export function ReportPageView(data) {
    barrett.forEach(function (b) {
        b.sendPageview(data);
    });
}
export function ReportMaterial(event, data) {
    barrett.forEach(function (b) {
        b.sendMaterial(event, data);
    });
}
