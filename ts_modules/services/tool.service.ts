/**
 * Created by LIHUA on 2017-08-17.
 *  辅助工具类
 */

import {Injectable} from "@angular/core";

@Injectable()
export class ToolService {

    /**
     * 单次执行方法，resolve解除锁定
     * @type {(func) => () => any}
     */
    single = (function() {
        return function(func) {

            let resolve = function() {
                func['running'] = false;
            };

            return function() {
                if (func['running']) {
                    return;
                } else {
                    func['running'] = true;
                    let args = Array.prototype.slice.call(arguments);
                    args.push(resolve);
                    func.apply(this, args);
                }
            };
        };
    })();

    /**
     * http://www.cnblogs.com/zztt/p/4098657.html 参考
     * 频率控制函数， fn执行次数不超过 1 次/delay
     * @param fn{Function}     传入的函数
     * @param delay{Number}    时间间隔
     * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
     *                         如果想忽略结束边界上的调用则传入 {trailing:false},
     * @returns {Function}     返回调用函数
     */

    throttle = function (fn, delay, options?) {
        let wait = false;
        options = options || {};

        return function () {
            let that = this,
                args = arguments;

            if (!wait) {
                if (!(options.leading === false)) {
                    fn.apply(that, args);
                }

                wait = true;
                setTimeout(function () {
                    if (!(options.trailing === false)) {
                        fn.apply(that, args);
                    }
                    wait = false;
                }, delay);
            }
        };
    };

    /**
     * http://www.cnblogs.com/zztt/p/4098657.html 参考
     * 空闲控制函数，fn仅执行一次
     * @param fn{Function}     传入的函数
     * @param delay{Number}    时间间隔
     * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
     *                         如果想忽略结束边界上的调用则传入 {trailing:false},
     * @returns {Function}     返回调用函数
     */
    debounce = function(fn, delay, option?) {
        let timeoutId, leadingExc = false;
        option = option || {};

        return function () {
            let that = this,
                args = arguments;
            if (!leadingExc && !(option.leading === false)) {
                fn.apply(that, args);
            }

            leadingExc = true;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(function () {
                if (!(option.trailing === false)) {
                    fn.apply(that, args);
                }
                leadingExc = false;
            }, delay);
        };
    };

    /**
     * 滚动到顶部
     */
    scrollTop = function () {
        if (document.documentElement) {
            document.documentElement.scrollTop = 0;
        }
        if (document.body.scrollTop) {
            document.body.scrollTop = 0;
        }
    };

    /**
     * 获取32位uuid
     * @param len 长度
     * @param radix 基数
     * @returns {string}
     */
    getUuid = function (len = 32, radix?) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix]
            }
        } else {
            let r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    };
}
