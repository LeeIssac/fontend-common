/**
 * Created by LIHUA on 2017-08-02.
 * 基础请求服务
 */
import {Headers, Http, RequestOptionsArgs, URLSearchParams, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpService {

    // 基本服务器地址
    serverUrl = '';

    // http token
    token: string;




    // post 请求默认参数
    defaultOption: RequestOptionsArgs = {
        responseType: 1,
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Token': this.token })
    };

    // post 请求默认参数
    jsonOption: RequestOptionsArgs = {
        responseType: 1,
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8', 'Token': this.token})
    };

    constructor(private http: Http) {}

    /**
     * get请求
     * @param url
     * @param option
     * @returns {Observable<Response>}
     */
    get(url: string, option?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.getRealUrl(url), option);
    }

    /**
     * post请求
     * @param url
     * @param body
     * @param option
     * @returns {Observable<Response>}
     */
    post(url: string, body?: any, option?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.getRealUrl(url), this.parseToURLSearchParams(body), option ? option : this.defaultOption);
    }

    /**
     * post请求
     * @param url
     * @param body
     * @param option
     * @returns {Observable<Response>}
     */
    postByJSON(url: string, body?: any, option?: RequestOptionsArgs): Observable<Response> {
        let jsonOption: RequestOptionsArgs = {
            responseType: 1,
            headers: new Headers({'Content-Type': 'application/json; charset=UTF-8', 'Token': this.token})
        };
        return this.http.post(this.getRealUrl(url), JSON.stringify(body), option ? option : jsonOption);
    }

    /**
     * 异步 get请求
     * @param url
     * @param option
     * @returns {Promise<T>}
     */
    async getByPromise(url: string, option?: RequestOptionsArgs): Promise<any> {
        return await this.http.get(this.getRealUrl(url), option).toPromise();
    }

    /**
     * 异步 post请求
     * @param url
     * @param body
     * @param option
     * @returns {Promise<T>}
     */
    async postByPromise(url: string, body?: any, option?: RequestOptionsArgs): Promise<any> {
        return await this.http.post(this.getRealUrl(url),
            this.parseToURLSearchParams(body), option ? option : this.defaultOption).toPromise();
    }

    /**
     * 把对象变成查询参数
     * @param data
     * @returns {URLSearchParams}
     */
    parseToURLSearchParams(data: Object): URLSearchParams {
        const searchParams = new URLSearchParams();

        Object.keys(data).forEach(key => {
            searchParams.set(key, data[key]);
        });

        return searchParams;
    }

    /**
     * 给url加上一个单层对象数据 辅助方法
     * @param url
     * @param data
     * @returns {string}
     */
    getDataUrl(url: string, data: any): string {
        if (data) {
            const temp = [];
            for (const i in data) {
                if (data.hasOwnProperty(i) && data[i]) {
                    temp.push('&' + i + '=' + data[i]);
                }
            }
            if (url.indexOf('?') !== -1) {
                url = url + temp.join('');
            } else {
                url = url + '?' + temp.join('');
            }
        }
        return url;
    }

    /**
     * 获取真实请求地址
     * @param url
     * @returns {string}
     */
    getRealUrl(url: string) {
        // 本身是绝对地址就不继续判定了
        if (url.indexOf('http') !== -1) {
            return url;
        } else {
            return this.getServerUrl() + url;
        }
    }

    /**
     * 获取服务器地址 优先查找window上的BASICHTTPSERVER
     * @returns {string|any}
     */
    getServerUrl() {
        return window['BASICHTTPSERVER'] ? window['BASICHTTPSERVER'] : this.serverUrl;
    }
}
