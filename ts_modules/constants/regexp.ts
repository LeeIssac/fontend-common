/**
 * Created by LIHUA on 2017-08-04.
 *  正则表达式集合
 */

export class RegExgConstant {
    // IP地址
    static ip = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/i;

    // 整数
    static integer = /^[-\+]?\d+$/;

    // 非零正整数
    static positiveInterger = /^[1-9]\d*$/;

    // 中文
    static chinese = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
}
