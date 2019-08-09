export interface IBarrettMaterialOffset {
  top: number;
  bottom: number;
}

export interface IBarrettMaterialViewConfig {
  // default: window.location.pathname
  id?: string;
  // 用于整个上报控制，第一优先级
  locked?: boolean;
  // 用于进入可视区域上报控制
  viewLocked?: boolean;
  // 用于点击上报关闭
  clickLocked?: boolean;
  // 有 scroll selector 则表示使用 滚动判断是否在可视区域进行上报
  scrollSelector?: string | null | Window;
  // 用于判断元素，同时 bt-art, @click 等也会自动附加到该 元素上
  targetSelector: string | null;
  // 用于可视区域判断的偏移量
  offset?: IBarrettMaterialOffset;
  params?: any;
}

export const defaultBarrettMaterialViewConfig: IBarrettMaterialViewConfig = {
  locked: false,
  viewLocked: false,
  clickLocked: false,
  scrollSelector: null,
  targetSelector: null,
  offset: {
    top: 0,
    bottom: 0,
  },
  params: {},
};
