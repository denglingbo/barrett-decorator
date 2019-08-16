import BarrettSensors from './BarrettSensors';
import BarrettFbq from './BarrettFbq';
import BarrettGtag from './BarrettGtag';
var middle = {
    sensors: BarrettSensors,
    fbq: BarrettFbq,
    gtag: BarrettGtag,
};
export function InjectReportMethod(name, methodClass) {
    middle[name] = methodClass;
}
export default middle;
