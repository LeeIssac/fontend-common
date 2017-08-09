/**
 * Created by LIHUA on 2017-08-03.
 */

import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {ModalAlertComponent} from "./components/alert/modal.alert.component";
import {ModalBasicComponent} from "./components/basic/modal.basic.component";
import {ModalConfrimComponent} from "./components/confrim/modal.confirm.component";

export interface ModalOptions {
    /**
     * 给content容器增加class
     */
    contentClass?: string;

    overlayClass?: string;

    /**
     * 给container容器增加class
     */
    containerClass?: string;

    /**
     * 是否显示背景层
     * true 或者 null 显示背景，并点击背景消失
     * false 不显示背景
     * static 显示背景 但是点击背景不消失
     */
    backdrop?: boolean | 'static';

    /**
     * 是否显示title
     * true 显示标题个关闭按钮
     */
    showTitle?: boolean;

    /**
     * 标题
     */
    title?: string;
}

@Injectable()
export class ModalService {
    // 层级
    private zIndex = 10;

    constructor(private applicationRef: ApplicationRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector) {}

    /**
     * 弹出模态框
     * @param content 自定义的模态框组件
     * @param options 配置
     * @returns {any} 自定义模态框组件的引用
     */
    open(content: any, options: ModalOptions = {}) {

        // 初始化根组件
        let [contentRef, modalComponentRef] = this.getModalComponentRef(options, ModalBasicComponent);

        // 初始化内容组件
        return this.getContentInstance(content, contentRef, modalComponentRef, options);
    }

    // open(content: any, options: ModalOptions = {}) {
    //     let factory = this.componentFactoryResolver.resolveComponentFactory(ModalBasicComponent);
    //
    //     let newNode = document.createElement(factory.selector);
    //     document.body.appendChild(newNode);
    //
    //     let ref = factory.create(this.injector, [], newNode);
    //     let ins = ref.instance;
    //     Object.assign(ins, options);
    //
    //     this.applicationRef.attachView(ref.hostView);
    //     ref.changeDetectorRef.detectChanges();
    //
    //     // 这里调用Render2 的方法修改样式
    //     ins['render'].setStyle(ins['containerRef']['element']['nativeElement'], 'z-index', this.zIndex);
    //     this.zIndex++;
    //
    //     let contentRef = ins['contentRef'];
    //     const contentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
    //     let contentComponent = contentRef.createComponent(contentFactory);
    //     let contentInstance = contentComponent.instance;
    //
    //     // 绑定一个destroy给外部调用 删除模态组件
    //     contentInstance['destroy'] = () => {
    //         this.destroy(contentComponent, ref);
    //     };
    //
    //     // 获取根组件实例
    //     let modalComponentInstance = ref.instance;
    //     // 给背景层增加点击事件
    //     modalComponentInstance['overlayClick'] = () => {
    //         options.backdrop !== false &&
    //         options.backdrop !== 'static' &&
    //         this.destroy(contentComponent, ref);
    //     };
    //     // 给关闭按钮增加点击事件
    //     modalComponentInstance['closeClick'] = () => {
    //         this.destroy(contentComponent, ref);
    //     };
    //
    //     return contentInstance;
    // }

    /**
     * 弹出提示pop
     * @param message 显示的消息
     * @param time 保留时间，超过时间自动小时
     */
    // alert(message: string, time: number = 1000) {
    //
    //     // 初始化根组件
    //     let [contentRef, modalComponentRef] = this.getModalComponentRef({
    //         message
    //     }, ModalAlertComponent);
    //
    //     setTimeout(() => {
    //         this.destroy(contentRef, modalComponentRef);
    //     }, time);
    // }

    /**
     * 弹出提示pop
     * @param message 显示的消息
     * @param time 保留时间，超过时间自动小时
     */
    alert(message: string, time: number = 4000) {
        let factory = this.componentFactoryResolver.resolveComponentFactory(ModalAlertComponent);
        let newNode = document.createElement(factory.selector);

        document.body.appendChild(newNode);

        let ref = factory.create(this.injector, [], newNode);
        let ins = ref.instance;
        ins.message = message;
        ins.isShow = true;

        this.applicationRef.attachView(ref.hostView);
        ref.changeDetectorRef.detectChanges();

        setTimeout(() => {
            ins.isShow = false;
            setTimeout(() => {
                ref.destroy();
            }, 200);
        }, time);
    }

    /**
     * 确认框
     * @param message
     * @param options
     * @returns {C}
     */
    confrim(message: string, options: ModalOptions = {}) {
        options.title = options.title || '提示';

        let ins = this.open(ModalConfrimComponent, options);

        Object.assign(ins, {
            message: message
        });

        return ins;
    }

    /**
     * 初始化根组件实例
     */
    getModalComponentRef(options: any, modalBaseComponent: any) {
        // 初始化根组件
        let modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(modalBaseComponent);
        // 插入根组件的dom
        document.body.insertBefore(document.createElement(modalComponentFactory.selector), document.body.firstChild);

        // 最重要的这里 把组件插入到根应用
        let modalComponentRef = this.applicationRef.bootstrap(modalComponentFactory);
        // 获取实例
        let modalComponentInstance = modalComponentRef.instance;
        // 赋值操作
        Object.assign(modalComponentInstance, options);

        // 设置根组件z-index层级
        modalComponentInstance['render'].setStyle(modalComponentInstance['containerRef']['element']['nativeElement'], 'z-index', this.zIndex);
        this.zIndex++;

        // 返回动态组件引用和根组件引用
        return [modalComponentInstance['contentRef'], modalComponentRef];
    }

    /**
     * 动态初始化模态组件
     * @param content 动态组件
     */
    getContentInstance(content: any, contentRef: any, modalComponentRef: any, options: any) {

        const contentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        let contentComponent = contentRef.createComponent(contentFactory);
        let contentInstance = contentComponent.instance;

        // 绑定一个destroy给外部调用 删除模态组件
        contentInstance['destroy'] = () => {
            this.destroy(contentComponent, modalComponentRef);
        };

        // 获取根组件实例
        let modalComponentInstance = modalComponentRef.instance;
        // 给背景层增加点击事件 这个根组件不一定具备点击层 比如alert
        modalComponentInstance['overlayClick'] = () => {
            options.backdrop !== false &&
            options.backdrop !== 'static' &&
            this.destroy(contentComponent, modalComponentRef);
        };
        // 给关闭按钮增加点击事件，这个根组件不一定具备关闭按钮 比如alert
        modalComponentInstance['closeClick'] = () => {
            this.destroy(contentComponent, modalComponentRef);
        };

        return contentInstance;
    }

    /**
     * 销毁
     */
    private destroy(contentComponent: any, modalComponentRef: any) {
        modalComponentRef.instance.isShow = false;

        setTimeout(() => {
            // contentComponent 可能为null， 比如alert组件就没有
            contentComponent && contentComponent.destroy();
            modalComponentRef.destroy();
        }, 200);
    }

}
