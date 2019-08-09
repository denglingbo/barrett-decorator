interface IPageViewMetaBarrett {
    amber: any;
}
interface IPageViewMeta {
    barrett: IPageViewMetaBarrett;
}
export default function BarrettPageView(fullPath: string, meta: IPageViewMeta, pageKey?: string | null, fixParams?: any): void;
export {};
