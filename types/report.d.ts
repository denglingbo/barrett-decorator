export declare type IReportType = 'sensors' | 'fbq' | 'gtag';
export declare function ReportPageView(data: any, meta: any): void;
export declare function ReportEntry(reportType: IReportType, res: any): void;
