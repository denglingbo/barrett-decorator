var default_1 = (function () {
    function default_1(config) {
        this.name = 'fbq';
        this.config = {};
        this.config = config;
        this.init();
    }
    default_1.prototype.sendPageview = function (data, meta) {
        if (!window.fbq) {
            return;
        }
        window.fbq('track', 'ViewContent', {
            content_name: data.page_type
        });
    };
    default_1.prototype.sendMaterial = function (event, data) {
        var _a;
        if (!window.fbq) {
            return;
        }
        (_a = window).fbq.apply(_a, [event].concat(data));
    };
    default_1.prototype.init = function () {
        void (function (f, b, e, v, n, t, s) {
            if (f.fbq)
                return;
            n = f.fbq = function () {
                n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
            };
            if (!f._fbq)
                f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', this.config.id);
        window.fbq('track', 'PageView');
    };
    return default_1;
}());
export default default_1;
