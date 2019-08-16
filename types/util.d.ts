import { IBarrettMaterialViewConfig } from './config';
export declare function isPlainObject(data: any): boolean;
export declare function isPlainArray(data: any): boolean;
export declare function isReportAndSetART($target: any, { scrollSelector, offset }: IBarrettMaterialViewConfig): boolean;
export declare function isInViewArea($target: any, offset: any): boolean;
export declare function delegate($el: any, eventType: any, selector: any, fn: any): void;
