var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    BarrettSensors.prototype.sendPageview = function (data, meta, pageKey) {
        var amber = meta.barrett && meta.barrett.amber;
        var def = {
            page_type: pageKey ? amber[pageKey] : amber,
        };
        sensors.quick('autoTrackSinglePage', __assign({}, data, def));
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
