import BarrettMaterialAutoReport from './components/BarrettMaterialAutoReport';
import BarrettMaterialReport from './components/BarrettMaterialReport';
import BarrettMaterialDistribute from './components/BarrettMaterialDistribute';
import BarrettPageView from './components/BarrettPageView';
import barrettList, { InjectReportMethod } from './middleware';
var barrett = [];
function BarrettInit(configArr) {
    configArr.forEach(function (item) {
        var fn = barrettList[item.name];
        if (fn) {
            var b = new fn(item.config, item.uid);
            barrett.push(b);
        }
    });
}
export { barrett, InjectReportMethod, BarrettMaterialAutoReport, BarrettMaterialReport, BarrettMaterialDistribute, BarrettPageView, };
export default BarrettInit;
