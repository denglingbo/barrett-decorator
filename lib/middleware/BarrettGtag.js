var default_1 = (function () {
    function default_1(config) {
        this.name = 'gtag';
        this.config = {};
        this.config = config;
        this.init();
    }
    default_1.prototype.sendPageview = function (data, meta, pageKey) {
        window.gtag('config', this.config.id, {
            page_path: data.$url,
            page_title: meta && meta.barrett ? meta.barrett.amber : 'unknow',
        });
    };
    default_1.prototype.sendMaterial = function (event, data) {
        window.gtag('event', event, data);
    };
    default_1.prototype.init = function () {
        var t = document.createElement('script');
        t.async = !0;
        t.src = "https://www.googletagmanager.com/gtag/js?id=" + this.config.id;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(t, s);
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        window.gtag('js', new Date());
    };
    return default_1;
}());
export default default_1;
