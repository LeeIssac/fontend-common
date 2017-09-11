/**
 * Created by LIHUA on 2017-08-12.
 * 单选下拉框
 */

import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from "@angular/core";
import {Animations} from "../../animations/animations";

@Component({
    selector: 'select-component',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    animations: [Animations.slideUpDwon]
})
export class SelectComponent implements OnInit {

    @Input()
    option: any;       // 当前被选中的option

    @Input()           // options列表
    options: any;

    @Input()
    label: any;        // 显示的key

    @Input()
    disabled: boolean; // 是否禁用

    @Input()
    index: number;     // 序号，主要是循环出现的时候 区分序列

    @Input()
    fixed: boolean;    // 是否固定 所谓固定是点击选择的时候不主动隐藏下拉框 true 不隐藏， 默认隐藏

    @Output()
    callback: EventEmitter<any> = new EventEmitter(); // 确定点击回调

    @Input()
    position: string;  // 下拉位置 默认底部， top 顶部

    @Input()
    placeholder: string; // 空白描述

    showDown = false;  // 是否显示下拉

    backgroundClickRef: any; // 背景点击引用

    constructor(private render: Renderer2) {}

    ngOnInit() {
        this.label = this.label || 'name';
        this.position = this.position || 'bottom';
    }

    /**
     * 下拉切换
     * @param $event
     */
    toggleShowDown($event: MouseEvent) {
        if (this.disabled) {
            return;
        }
        this.showDown = !this.showDown;

        if (this.showDown) {
            this.backgroundClickRef = this.render.listen('document', 'click', () => {
                this.showDown = false;
                this.backgroundClickRef();
                this.backgroundClickRef = null;
            });
        } else {
            this.backgroundClickRef && this.backgroundClickRef();
            this.backgroundClickRef = null;
        }

        $event.stopPropagation();
    }

    /**
     * 选中点击
     * @param option
     * @param $event
     */
    optionClick(option: any, $event: MouseEvent) {
        if (this.index !== undefined) {
            this.callback.emit({
                checked: option,
                index: this.index
            });
        } else {
            this.callback.emit(option);
        }

        if (this.fixed) {
            // 固定 就是点击选项框的时候不隐藏下拉菜单
            $event.stopPropagation();
        }
    }

}

