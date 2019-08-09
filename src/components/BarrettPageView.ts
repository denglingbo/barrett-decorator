import { ReportPageView } from '../report';

interface IAnyObject {
  [prop: string]: string;
}

interface IPageViewMetaBarrett {
  amber: any;
}

interface IPageViewMeta {
  barrett: IPageViewMetaBarrett;
}

/**
 * Vue Router 切换的时候进行上报 pageview，或者某些tab 页面
 * @param fullPath
 * @param meta, 一些附加信息, 从config.json 配置而来
 * @param pageKey, 当amber 为 obejct 的时候则需要使用该字段，例如一些 tab 页面需要做映射
 * @param fixParams，如果有没有 config.json 例如 tab 页面，则需要进行传入修正
 */
export default function BarrettPageView(
  fullPath: string,
  meta: IPageViewMeta,
  pageKey: string | null = null,
  fixParams: any = {},
) {
  const data: any = {};

  if (meta && meta.barrett && meta.barrett.amber) {
    data.page_type = pageKey ? meta.barrett.amber[pageKey] : meta.barrett.amber;
    data.$url = /^http/.test(fullPath)
      ? fullPath
      : `${window.location.origin}${fullPath}`;

    ReportPageView(Object.assign({}, data, fixParams || {}));
  }
}
