import { ReportPageView } from '../report';
export default function BarrettPageView(fullPath, meta, pageKey, fixParams) {
    if (pageKey === void 0) { pageKey = null; }
    if (fixParams === void 0) { fixParams = {}; }
    var data = {};
    if (meta && meta.barrett && meta.barrett.amber) {
        data.page_type = pageKey ? meta.barrett.amber[pageKey] : meta.barrett.amber;
        data.$url = /^http/.test(fullPath)
            ? fullPath
            : "" + window.location.origin + fullPath;
        ReportPageView(Object.assign({}, data, fixParams || {}), meta);
    }
}
