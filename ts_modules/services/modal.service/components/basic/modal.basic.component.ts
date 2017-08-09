/**
 * Created by LIHUA on 2017-08-09.
 */

import {Component, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, style, trigger, transition} from '@angular/animations';

@Component({
    selector: 'modal-basci-component',
    templateUrl: './modal.basci.component.html',
    styleUrls: ['./modal.basci.component.scss'],
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
export class ModalBasicComponent {
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
    overlayClick() {}
    // 关闭按钮点击
    closeClick() {}

    // 容器节点引用 动态改变z-index的时候需要
    @ViewChild('container', {read: ViewContainerRef}) containerRef;
    // 内容节点引用
    @ViewChild('content', {read: ViewContainerRef}) contentRef;

    constructor(private render: Renderer2) {
        // render 用于样式修改
    }
}
