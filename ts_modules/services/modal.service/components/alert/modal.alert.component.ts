/**
 * Created by LIHUA on 2017-08-09.
 */

import {Component, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, style, trigger, transition} from '@angular/animations';

@Component({
    selector: 'modal-alert-component',
    templateUrl: './modal.alert.component.html',
    styleUrls: ['./modal.alert.component.scss'],
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

    constructor(private render: Renderer2) {}
}
