import BarrettMaterialAutoReport from './components/BarrettMaterialAutoReport';
import BarrettMaterialReport from './components/BarrettMaterialReport';
import BarrettPageView from './components/BarrettPageView';
import barrettList from './middleware';
var barrett = [];
function BarrettInit(configArr) {
    var whiteString = process.env.VUE_APP_BARRETT_WHITE_LIST || '';
    var whiteList = whiteString.split(',');
    if (whiteList) {
        whiteList.forEach(function (key) {
            var finder = configArr.find(function (conf) { return conf.name === key; });
            if (finder) {
                var Barrett = barrettList[key];
                var b = new Barrett(finder.config, finder.uid);
                barrett.push(b);
            }
        });
    }
}
export { barrett, BarrettMaterialAutoReport, BarrettMaterialReport, BarrettPageView, };
export default BarrettInit;
