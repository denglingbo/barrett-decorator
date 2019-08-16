import BarrettSensors from './BarrettSensors';
import BarrettFbq from './BarrettFbq';
import BarrettGtag from './BarrettGtag';

const middle: any = {
  sensors: BarrettSensors,
  fbq: BarrettFbq,
  gtag: BarrettGtag,
  // inject others ...
};

/**
 * 注入新的上报方式
 * @param name 类名
 * @param methodClass 上报类
 */
export function InjectReportMethod(name: string, methodClass: any) {
  middle[name] = methodClass;
}

export default middle;
