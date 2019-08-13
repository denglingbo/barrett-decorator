var defaultArt = {
    inview: false,
    report: false,
    ety_num: 0,
    out_num: 0,
};
function inView(rect, offset) {
    return rect.y + rect.height - offset.top > 0
        && rect.y < window.innerHeight - offset.bottom
        && rect.x >= 0
        && rect.x + rect.width <= window.innerWidth;
}
export function isReportAndSetART($target, _a) {
    var scrollSelector = _a.scrollSelector, offset = _a.offset;
    var isReport = false;
    if (scrollSelector && $target) {
        var rect = $target.getBoundingClientRect();
        if (!$target.getAttribute('bt-art')) {
            $target.setAttribute('bt-art', JSON.stringify(defaultArt));
        }
        var str = $target.getAttribute('bt-art');
        var art = JSON.parse(str);
        if (inView(rect, offset)) {
            if (!art.inview) {
                art.report = true;
                art.ety_num = art.ety_num + 1;
            }
            else {
                art.report = false;
            }
            art.inview = true;
        }
        else {
            if (art.inview) {
                art.out_num = art.out_num + 1;
            }
            art.inview = false;
            art.report = false;
        }
        isReport = art.report;
        $target.setAttribute('bt-art', JSON.stringify(art));
    }
    return isReport;
}
export function isInViewArea($target, offset) {
    var isReport = false;
    if ($target) {
        var rect = $target.getBoundingClientRect();
        isReport = inView(rect, offset);
    }
    return isReport;
}
function all(selector, contextElement) {
    var nodeList;
    var list = [];
    if (contextElement) {
        nodeList = contextElement.querySelectorAll(selector);
    }
    else {
        nodeList = document.querySelectorAll(selector);
    }
    if (nodeList && nodeList.length > 0) {
        list = Array.prototype.slice.call(nodeList);
    }
    return list;
}
export function delegate($el, eventType, selector, fn) {
    if (!$el) {
        return;
    }
    $el.addEventListener(eventType, function (e) {
        var targets = all(selector, $el);
        if (!targets) {
            return;
        }
        findTarget: for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            var $node = e.target;
            while ($node) {
                if ($node === target) {
                    fn.call($node, e);
                    break findTarget;
                }
                $node = $node.parentNode;
                if ($node === $el) {
                    break;
                }
            }
        }
    }, false);
}
