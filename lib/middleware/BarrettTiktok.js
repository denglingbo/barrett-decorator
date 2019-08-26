var default_1 = (function () {
    function default_1(config) {
        this.name = 'tiktok';
        this.config = {};
        this.config = config;
        this.init();
    }
    default_1.prototype.sendPageview = function (data, meta, pageKey) {
    };
    default_1.prototype.sendMaterial = function (event, data) {
    };
    default_1.prototype.init = function () {
        var ids = this.config.id;
        var idsList = ids.split(',');
        idsList.forEach(function (id) {
            var t = document.createElement('script');
            t.type = 'text/javascript';
            t.async = !0;
            t.src = document.location.protocol + "//static.bytedance.com/pixel/sdk.js?sdkid=" + id;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(t, s);
        });
    };
    return default_1;
}());
export default default_1;
