export declare type IReportType = 'sensors' | 'fbq' | 'gtag';
export declare function ReportPageView(data: any, meta: any, pageKey?: string | null): void;
export declare function ReportEntry(reportType: IReportType, res: any): void;
