import BarrettSensors from './BarrettSensors';
import BarrettFbq from './BarrettFbq';
import BarrettGtag from './BarrettGtag';
import BarrettTiktok from './BarrettTiktok';
var middle = {
    sensors: BarrettSensors,
    fbq: BarrettFbq,
    gtag: BarrettGtag,
    tiktok: BarrettTiktok,
};
export function InjectReportMethod(name, methodClass) {
    middle[name] = methodClass;
}
export default middle;
