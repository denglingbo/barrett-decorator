import BarrettMaterialAutoReport from './components/BarrettMaterialAutoReport';
import BarrettMaterialReport from './components/BarrettMaterialReport';
import BarrettMaterialDistribute from './components/BarrettMaterialDistribute';
import BarrettPageView from './components/BarrettPageView';
import barrettList, { InjectReportMethod } from './middleware';

// 实际工作的上报, 由 report.ts 调用函数的上报方法
const barrett: any = [];

// 配置哪些上报系统
function BarrettInit(configArr: any) {
  configArr.forEach((item: any) => {
    const fn: any = barrettList[item.name];

    if (fn) {
      const b = new fn(item.config, item.uid);
      barrett.push(b);
    }
  });
}

export {
  barrett,
  InjectReportMethod,
  BarrettMaterialAutoReport,
  BarrettMaterialReport,
  BarrettMaterialDistribute,
  BarrettPageView,
};

export default BarrettInit;
