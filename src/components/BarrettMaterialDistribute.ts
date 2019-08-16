import { ReportEntry } from '../report';

/**
 * 用于点击事件触发
 * @BarrettShoot({ ...parmas })
 * @param params object | fn
 */
export default function BarrettMaterialDistribute(dataMapping: any) {
  return (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;
    let ret;

    descriptor.value = async function(...arg: any[]) {
      ret = await method.apply(this, arg);

      if (ret !== false) {
        Object.keys(dataMapping).forEach((key: any) => {
          const callback = dataMapping[key];
          const res = callback.apply(this, arg);

          ReportEntry(key, res);
        });
      }

      return ret;
    };

    return descriptor;
  };
}
