import { ReportPageView } from '../report';
export default function BarrettPageView(fullPath, meta, pageKey, fixParams) {
    if (pageKey === void 0) { pageKey = null; }
    if (fixParams === void 0) { fixParams = {}; }
    var data = {};
    if (meta && meta.barrett) {
        data.$url = /^http/.test(fullPath)
            ? fullPath
            : "" + window.location.origin + fullPath;
        var p = Object.assign({}, data, fixParams || {});
        ReportPageView(p, meta, pageKey);
    }
}
