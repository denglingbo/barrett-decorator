import { ReportEntry } from '../report';

/**
 * 用于点击事件触发
 * @BarrettShoot({ ...parmas })
 * @param params object | fn
 */
export default function BarrettMaterialReport(params: any = {}, event: string = 'click_material', filterFn?: any) {
  return (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;
    let ret;

    descriptor.value = async function(...arg: any[]) {
      ret = await method.apply(this, arg);
      let report = true;

      if (filterFn) {
        // 改变装饰器的上下文环境，进行一些 上报规则 过滤
        report = filterFn.apply(this, arg);
      }

      if (report && ret !== false) {
        const res = { ...ret, ...params };

        if (Object.prototype.toString.apply(params) === '[object Function]') {
          const fn = params;
          const data = fn.apply(this, arg);
          Object.assign(res, data);
        }

        // ReportMaterial(event, res);
        ReportEntry('sensors', {
          event,
          data: res,
        });
      }

      return ret;
    };

    return descriptor;
  };
}
