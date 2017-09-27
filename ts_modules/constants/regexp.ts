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

    // 字母开头的数字或字母
    static numberAlphabet = /^[a-zA-Z][0-9a-zA-Z]{0,}$/;

    // 仅为数字且不以0开头
    static positiveInteger = /^[1-9][0-9]*$/;

    // 手机号验证
    static phoneReg = /^1\d{10}$/g;

}
