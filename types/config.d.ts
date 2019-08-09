export interface IBarrettMaterialOffset {
    top: number;
    bottom: number;
}
export interface IBarrettMaterialViewConfig {
    id?: string;
    locked?: boolean;
    viewLocked?: boolean;
    clickLocked?: boolean;
    scrollSelector?: string | null | Window;
    targetSelector: string | null;
    offset: IBarrettMaterialOffset;
    params?: any;
}
export declare const defaultBarrettMaterialViewConfig: IBarrettMaterialViewConfig;
