/**
 * Created by LIHUA on 2017-08-03.
 */


import {
    AfterViewChecked, AfterViewInit,
    ApplicationRef, ChangeDetectorRef, Component, ComponentFactoryResolver, Injectable, Injector, OnDestroy, Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {animate, style, trigger, transition} from '@angular/animations';

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
    private zIndex: number = 0;

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
        let [contentRef, modalComponentRef] = this.getModalComponentRef(options, ModalComponent);

        // 初始化内容组件
        return this.getContentInstance(content, contentRef, modalComponentRef, options);
    }

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

@Component({
    selector: 'app-modal-component',
    template: `
        <div class="app-modal-container {{ containerClass }}" [@fadeInOut] *ngIf="isShow" #container>
            <div class="app-modal-overlay {{ overlayClass }}" (click)="overlayClick()" *ngIf="backdrop!==false"></div>
            <div class="app-modal-content {{ contentClass }}">
                <div class="app-modal-content-title" *ngIf="showTitle">
                    <span class="title">{{ title }}</span>
                    <span class="close" (click)="closeClick()"></span>
                </div>
                <div class="app-modal-content-inner">
                    <ng-template #content></ng-template>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .app-modal-container {
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
        }
        .app-modal-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.3;
        }
        .app-modal-content {
            background: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 2px;
            overflow: auto;
            box-shadow: 3px 0 10px rgba(0,0,0,0.1),
            -3px 0 10px rgba(0,0,0,0.1),
            0 3px 10px rgba(0,0,0,0.1),
            0 -3px 10px rgba(0,0,0,0.1);
        }
        .app-modal-content-title {
            line-height: 35px;
            background: #F4F4F4;
        }
        .app-modal-content-title .title {
            margin-left: 10px;
        }
        .app-modal-content-title .close {
            float: right;
            margin-right: 10px;
            margin-top: 10px;
            background: url("./close.png");
            padding: 0 10px;
            height: 18px;
            cursor: pointer;
        }
        .app-modal-content-inner {
            overflow-x: hidden;
            overflow-y: auto;
        }
    `],
    animations: [
        trigger('fadeInOut', [
            transition('void => *', [
                style({opacity: '0.3'}),
                animate(50)
            ]),
            transition('* => void', [
                animate(50, style({opacity: '0'}))
            ])
        ])
    ]
})
export class ModalComponent {

    // 控制动画显示
    isShow: boolean = true;

    // 是否显示背景 及 背景点击
    backdrop: boolean | 'static';
    // 额外传递的content class
    contentClass: string;
    // 额外传递的overlay class
    overlayClass: string;
    // 额外传递的container class
    containerClass: string;

    // 是否显示title
    showTitle: boolean = true;
    // 模态框title
    title: string;

    // 背景层点击
    overlayClick() {

    }
    // 关闭按钮点击
    closeClick() {

    }

    // 容器节点引用 动态改变z-index的时候需要
    @ViewChild('container', {read: ViewContainerRef}) containerRef;
    // 内容节点引用
    @ViewChild('content', {read: ViewContainerRef}) contentRef;

    constructor(private render: Renderer2) {

    }

}

@Component({
    selector: 'app-modal-alert-component',
    template: `
        <div class="app-modal-alert-container" #container [@slideInOut] *ngIf="isShow">
            <div class="app-modal-alert-content">
                <span>{{ message }}</span>
            </div>
        </div>
    `,
    styles: [`
        .app-modal-alert-container {
            position: absolute;
            bottom: 10px;
            max-width: 500px;
            line-height: 40px;
            background: rgba(0, 0, 0, 0.7);
            text-align: center;
            color: #fff;
            left: 50%;
            transform: translate(-50%, 0);
            min-width: 200px;
            z-index: 11;
        }
        .app-modal-alert-content {
            padding: 0 10px;
        }
    `],
    animations: [
        trigger('slideInOut', [
            transition('void => *', [
                style({transform: 'translate(-50%, 100%)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'translate(-50%, 100%)'}))
            ])
        ])
    ]
})
export class ModalAlertComponent {
    // 控制动画显示
    isShow: boolean;

    // 显示的消息内容
    message: string;

    // 消失毫秒数
    time: number;

    // 容器节点引用 动态改变z-index的时候需要
    @ViewChild('container', {read: ViewContainerRef}) containerRef;

    constructor() {}
}
