import { IBarrettMaterialViewConfig } from './config';

interface IDefaultArt {
  inview: boolean;
  report: boolean;
  ety_num: number;
  out_num: number;
}

/**
 * @param inview, in view: 当前是否在可视区域
 * @param report, report: 是否需要进行上报，如果没有从可视区域退出再进入，则不认定为上报动作
 * @param ety_num, entry number: 进入的次数
 * @param out_num, out number: 退出的次数
 */
const defaultArt: IDefaultArt = {
  inview: false,
  report: false,
  ety_num: 0,
  out_num: 0,
};

export function isPlainObject(data: any): boolean {
  return Object.prototype.toString.apply(data) === '[object Object]';
}

export function isPlainArray(data: any): boolean {
  return Object.prototype.toString.apply(data) === '[object Array]';
}

// 判断是否在可视区域
function inView(rect: any, offset: any) {
  return rect.y + rect.height - offset.top > 0
    && rect.y < window.innerHeight - offset.bottom
    // 判断元素的左右是否在可是区域
    && rect.x >= 0
    && rect.x + rect.width <= window.innerWidth;
}

/**
 * 使用滚动判断是否在可视区域 判断元素是否进行上报，没有划出可视区域，则不进行上报
 */
export function isReportAndSetART($target: any, { scrollSelector, offset }: IBarrettMaterialViewConfig): boolean {
  let isReport = false;

  if (scrollSelector && $target) {
    const rect: any = $target.getBoundingClientRect();

    if (!$target.getAttribute('bt-art')) {
      $target.setAttribute('bt-art', JSON.stringify(defaultArt));
    }

    // 当前 element 信息
    const str = $target.getAttribute('bt-art');
    const art: IDefaultArt = JSON.parse(str);

    // 进入可视区域
    if (inView(rect, offset)) {
      if (!art.inview) { // 进入可视区域 and 上一次不在可视区域
        art.report = true;
        art.ety_num = art.ety_num + 1;
      } else { // 进入可视区域 and 上一次依旧在可视区域
        art.report = false;
      }

      art.inview = true;
    } else {
      if (art.inview) { // 退出可视区域 and 上一次在可视区域
        art.out_num = art.out_num + 1;
      }

      art.inview = false;
      art.report = false;
    }

    isReport = art.report;
    $target.setAttribute('bt-art', JSON.stringify(art));
  }

  return isReport;
}

/**
 * 直接判断元素是否在可视区域
 */
export function isInViewArea($target: any, offset: any): boolean {
  let isReport = false;

  if ($target) {
    const rect: any = $target.getBoundingClientRect();

    isReport = inView(rect, offset);
  }

  return isReport;
}

/**
 * get multiple elements
 * @public
 */
function all(selector: any, contextElement: any) {
  let nodeList;
  let list = [];

  if (contextElement) {
    nodeList = contextElement.querySelectorAll(selector);
  } else {
    nodeList = document.querySelectorAll(selector);
  }
  if (nodeList && nodeList.length > 0) {
    list = Array.prototype.slice.call(nodeList);
  }
  return list;
}

/**
 * delegate an event to a parent element
 * @public
 * @param  array     $el        parent element
 * @param  string    eventType  name of the event
 * @param  string    selector   target's selector
 * @param  function  fn
 */
export function delegate($el: any, eventType: any, selector: any, fn: any) {
  if (!$el) { return; }
  $el.addEventListener(eventType, (e: any) => {
    const targets = all(selector, $el);
    if (!targets) {
      return;
    }
    findTarget:
    for (const target of targets) {
      let $node = e.target;
      while ($node) {
        if ($node === target) {
          fn.call($node, e);
          break findTarget;
        }
        $node = $node.parentNode;
        if ($node === $el) {
          break;
        }
      }
    }
  }, false);
}
