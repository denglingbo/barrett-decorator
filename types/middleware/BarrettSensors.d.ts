export declare const sensorsConfig: {
    send_type: string;
    server_url: string;
    heatmap_url: string;
    use_client_time: boolean;
};
declare class BarrettSensors {
    private readonly name;
    private config;
    private uid;
    constructor(config: any, uid: string);
    sendPageview(data: any, meta?: any): void;
    sendMaterial(event: string, data: any): void;
    private init;
}
export default BarrettSensors;
