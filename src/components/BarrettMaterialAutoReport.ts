import { IBarrettMaterialViewConfig, defaultBarrettMaterialViewConfig } from '../config';
import { isReportAndSetART, isInViewArea , delegate } from '../util';
import { ReportEntry, IReportType } from '../report';
import { barrett } from '../';

/**
 * 循环发送数据
 * @param $target element 元素
 * @param callback 回调
 */
function loopSendData($target: any, callback: any) {
  if (!$target) {
    return;
  }

  const dataArr: any = [
    {
      name: 'sensors',
      data: $target.getAttribute('bt-data'),
    },
    {
      name: 'gtag',
      data: $target.getAttribute('bt-gtag'),
    },
  ];

  dataArr.forEach((d: any) => {
    if (d.data) {
      try {
        const data = JSON.parse(d.data);
        callback(false, d.name, data);
      } catch (ex) {
        callback(true, ex);
      }
    }
  });
}

const barrettLocked = () => barrett.length === 0;

/**
 * 任务队列
 */
const taskQueue: any = [];

/**
 * 注册 scroll in view 的监听任务
 */
function tastRegister(config: IBarrettMaterialViewConfig, taskId: string | number) {
  const finder = taskQueue.find((task: any) => task.id === taskId);

  // 如果存在该 runner 则不继续注册
  // barrettWhiteList 如果没有开启任何埋点开启也不注册
  if (finder || barrettLocked()) {
    return;
  }

  const fn = () => {
    if (!config.targetSelector) {
      return [];
    }

    const $targets = document.querySelectorAll(config.targetSelector);
    const arr: any = [];

    $targets.forEach(($target: any) => {
      const isReport = isReportAndSetART($target, { ...config });

      if (isReport) {
        arr.push($target);
      }
    });

    return arr;
  };

  taskQueue.push({
    id: taskId,
    params: config.params || {},
    fn,
  });
}

/**
 * 任务执行器
 */
function tastRunner() {
  taskQueue.forEach((task: any) => {
    const targets = task.fn();
    targets.forEach(($target: any) => {
      // const data = JSON.parse($target.getAttribute('bt-data'));
      // ReportMaterial('view_material', { ...task.params, ...data });
      loopSendData($target, (err: boolean, reportType: IReportType, data: any) => {
        if (!err) {
          ReportEntry(reportType, {
            event: 'view_material',
            data: { ...task.params, ...data },
          });
        }
      });
    });
  });
}

let timer: any = null;

/**
 * 任务开始
 */
function start() {
  // 一秒后进行任务注册和上报准备
  clearTimeout(timer);
  timer = setTimeout(() => {
    tastRunner();
  }, 1000);
}

/**
 * 素材 view 逻辑，由某些方法主动触发
 * @param configArr, 配置信息
 */
export default function BarrettMaterialAutoReport(configArr: IBarrettMaterialViewConfig[]) {
  return (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;
    let ret: any;

    descriptor.value = async function(...arg: any[]) {
      ret = await method.apply(this, arg);

      configArr.forEach((conf: any, index: number) => {
        const config = Object.assign({}, defaultBarrettMaterialViewConfig, conf);
        const { scrollSelector, targetSelector, locked, viewLocked, clickLocked } = config;

        if (locked || barrettLocked()) {
          return;
        }

        // 自动注册点击触发器
        if (!clickLocked) {
          const $ts: any = document.querySelectorAll(targetSelector);

          if (!$ts || $ts.length === 0) {
            return;
          }

          $ts.forEach(($t: any) => {
            $t.onclick = (event: any) => {
              if (!event.target) {
                return;
              }

              loopSendData(event.target, (err: boolean, reportType: IReportType, data: any) => {
                if (!err) {
                  ReportEntry(reportType, {
                    event: 'click_material',
                    data: { ...config.params, ...data },
                  });
                }
              });
            };
          });
        }

        // 注册 outer scroll 任务执行器
        if (!viewLocked) {
          // 长列表适用，根据外层容器滚动的时候判定是否上报
          if (scrollSelector) {
            const tid = conf.id || `${window.location.pathname}-${index}`;
            tastRegister(config, tid);

            const $scroll: any = Object.prototype.toString.apply(scrollSelector) === '[object String]'
              ? document.querySelector(scrollSelector)
              : scrollSelector;

            if ($scroll) {
              $scroll.addEventListener('scroll', () => {
                start();
              });

              start();
            }
          } else {
            // 适用于一定在第一屏的上报规则，不需要添加到任务队列进行判定
            const $targets = document.querySelectorAll(targetSelector);

            $targets.forEach(($target) => {
              const isReport = isInViewArea($target, config.offset);

              loopSendData($target, (err: boolean, reportType: IReportType, data: any) => {
                if (!err && isReport) {
                  ReportEntry(reportType, {
                    event: 'view_material',
                    data: { ...ret, ...config.params, ...data },
                  });
                }
              });
            });
          }
        }
      });

      return ret;
    };

    return descriptor;
  };
}
