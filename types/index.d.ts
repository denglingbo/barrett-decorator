import BarrettMaterialAutoReport from './components/BarrettMaterialAutoReport';
import BarrettMaterialReport from './components/BarrettMaterialReport';
import BarrettMaterialDistribute from './components/BarrettMaterialDistribute';
import BarrettPageView from './components/BarrettPageView';
import { InjectReportMethod } from './middleware';
declare const barrett: any;
declare function BarrettInit(configArr: any): void;
export { barrett, InjectReportMethod, BarrettMaterialAutoReport, BarrettMaterialReport, BarrettMaterialDistribute, BarrettPageView, };
export default BarrettInit;
