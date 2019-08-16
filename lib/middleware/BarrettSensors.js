import sensors from 'sa-sdk-javascript';
export var sensorsConfig = {
    send_type: 'ajax',
    server_url: '',
    heatmap_url: '',
    use_client_time: true,
};
var BarrettSensors = (function () {
    function BarrettSensors(config, uid) {
        this.name = 'sensors';
        this.config = sensorsConfig;
        this.uid = null;
        this.config = config;
        this.uid = uid;
        this.init();
    }
    BarrettSensors.prototype.sendPageview = function (data, meta) {
        sensors.quick('autoTrackSinglePage', data);
    };
    BarrettSensors.prototype.sendMaterial = function (event, data) {
        sensors.track(event, data);
    };
    BarrettSensors.prototype.init = function () {
        sensors.init(this.config);
        if (this.uid) {
            sensors.login(this.uid);
        }
    };
    return BarrettSensors;
}());
export default BarrettSensors;
