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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { defaultBarrettMaterialViewConfig } from '../config';
import { isReportAndSetART, isInViewArea } from '../util';
import { ReportEntry } from '../report';
import { barrett } from '../';
function autoClickMethod(event) {
    var _this = this;
    if (!this) {
        return;
    }
    loopSendData(this, function (err, reportType, data) {
        if (!err) {
            var params = _this.__barrett_params__;
            ReportEntry(reportType, {
                event: 'click_material',
                data: __assign({}, params, data),
            });
        }
    });
}
function loopSendData($target, callback) {
    if (!$target) {
        return;
    }
    var dataArr = [
        {
            name: 'sensors',
            data: $target.getAttribute('bt-data'),
        },
        {
            name: 'gtag',
            data: $target.getAttribute('bt-gtag'),
        },
    ];
    dataArr.forEach(function (d) {
        if (d.data) {
            try {
                var data = JSON.parse(d.data);
                callback(false, d.name, data);
            }
            catch (ex) {
                callback(true, ex);
            }
        }
    });
}
var barrettLocked = function () { return barrett.length === 0; };
var taskQueue = [];
function tastRegister(config, taskId) {
    var finder = taskQueue.find(function (task) { return task.id === taskId; });
    if (finder || barrettLocked() || !config.targetSelector) {
        return;
    }
    var $targets = document.querySelectorAll(config.targetSelector);
    if (!$targets || $targets.length === 0) {
        return;
    }
    var fn = function () {
        var arr = [];
        $targets.forEach(function ($target) {
            var isReport = isReportAndSetART($target, __assign({}, config));
            if (isReport) {
                arr.push($target);
            }
        });
        return arr;
    };
    taskQueue.push({
        id: taskId,
        params: config.params || {},
        fn: fn,
    });
}
function tastRunner() {
    taskQueue.forEach(function (task) {
        var targets = task.fn() || [];
        targets.forEach(function ($target) {
            loopSendData($target, function (err, reportType, data) {
                if (!err) {
                    ReportEntry(reportType, {
                        event: 'view_material',
                        data: __assign({}, task.params, data),
                    });
                }
            });
        });
    });
}
var timer = null;
function start() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        tastRunner();
    }, 1000);
}
export default function BarrettMaterialAutoReport(configArr) {
    return function (target, name, descriptor) {
        var method = descriptor.value;
        var ret;
        descriptor.value = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, method.apply(this, arg)];
                        case 1:
                            ret = _a.sent();
                            configArr.forEach(function (conf, index) {
                                var config = Object.assign({}, defaultBarrettMaterialViewConfig, conf);
                                var scrollSelector = config.scrollSelector, targetSelector = config.targetSelector, locked = config.locked, viewLocked = config.viewLocked, clickLocked = config.clickLocked;
                                if (locked || barrettLocked()) {
                                    return;
                                }
                                if (!clickLocked) {
                                    var $targets = document.querySelectorAll(targetSelector);
                                    if (!$targets || $targets.length === 0) {
                                        return;
                                    }
                                    $targets.forEach(function ($target) {
                                        if (!$target.__barrett_params__) {
                                            $target.__barrett_params__ = config.params || {};
                                        }
                                        $target.removeEventListener('click', autoClickMethod);
                                        $target.addEventListener('click', autoClickMethod, false);
                                    });
                                }
                                if (!viewLocked) {
                                    if (scrollSelector) {
                                        var tid = conf.id || window.location.pathname + "-" + index;
                                        tastRegister(config, tid);
                                        var $scroll = Object.prototype.toString.apply(scrollSelector) === '[object String]'
                                            ? document.querySelector(scrollSelector)
                                            : scrollSelector;
                                        if ($scroll) {
                                            $scroll.addEventListener('scroll', function () {
                                                start();
                                            });
                                            start();
                                        }
                                    }
                                    else {
                                        var $targets = document.querySelectorAll(targetSelector);
                                        $targets.forEach(function ($target) {
                                            var isReport = isInViewArea($target, config.offset);
                                            loopSendData($target, function (err, reportType, data) {
                                                if (!err && isReport) {
                                                    ReportEntry(reportType, {
                                                        event: 'view_material',
                                                        data: __assign({}, ret, config.params, data),
                                                    });
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                            return [2, ret];
                    }
                });
            });
        };
        return descriptor;
    };
}
