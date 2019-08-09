import BarrettMaterialAutoReport from './components/BarrettMaterialAutoReport';
import BarrettMaterialReport from './components/BarrettMaterialReport';
import BarrettPageView from './components/BarrettPageView';
import barrettList from './middleware';

// 实际工作的上报, 由 report.ts 调用函数的上报方法
const barrett: any = [];

// 配置哪些上报系统
function BarrettInit(configArr: any) {
  const whiteString = process.env.VUE_APP_BARRETT_WHITE_LIST || '';
  const whiteList = whiteString.split(',');

  // 判断开启哪些埋点功能 - from .env
  if (whiteList) {
    whiteList.forEach((key: string) => {
      // 判断是否在白名单中
      const finder = configArr.find((conf: any) => conf.name === key);

      if (finder) {
        const Barrett: any = barrettList[key];
        const b = new Barrett(finder.config, finder.uid);

        barrett.push(b);
      }
    });
  }
}

export {
  barrett,
  BarrettMaterialAutoReport,
  BarrettMaterialReport,
  BarrettPageView,
};

export default BarrettInit;
