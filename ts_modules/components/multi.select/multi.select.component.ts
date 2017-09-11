/**
 * Created by LIHUA on 2017-09-05.
 *  多选下拉框
 */

import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from "@angular/core";
import {Animations} from "../../animations/animations";

@Component({
    selector: 'multi-select-component',
    templateUrl: './multi.select.component.html',
    styleUrls: ['./multi.select.component.scss'],
    animations: [Animations.slideUpDwon]
})
export class MultiSelectComponent implements OnInit {
    @Input()
    option: any;       // 当前被选中的options

    @Input()           // options列表
    options: any;

    @Input()
    label: any;        // 显示的key

    @Input()
    disabled: boolean; // 是否禁用

    @Input()
    index: number;     // 序号，主要是循环出现的时候 区分序列

    @Output()
    callback: EventEmitter<any> = new EventEmitter(); // 确定点击回调

    @Input()
    position: string;    // 下拉位置 默认底部， top 顶部

    @Input()
    placeholder: string; // 空白描述

    showDown = false;    // 是否显示下拉

    backgroundClickRef: any; // 背景点击引用

    constructor(private render: Renderer2) {}

    ngOnInit() {
        this.label = this.label || 'name';
        this.options = JSON.parse(JSON.stringify(this.options)); // 数据源重拷贝
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
        if (!option.checked) {
            option.checked = true;
            this.option.push(option);
            this.sendEmit();
        }

        $event.stopPropagation();
    }

    /**
     * 删除选择
     * @param option
     * @param {number} index
     * @param {MouseEvent} event
     */
    deleteClick(option: any, index: number, $event: MouseEvent) {

        this.options.forEach(op => {
            if (op[this.label] === option[this.label]) {
                op.checked = false;
            }
        });
        this.option.splice(index, 1);
        this.sendEmit();

        $event.stopPropagation();
    }

    sendEmit() {
        if (this.index !== undefined) {
            this.callback.emit({
                checked: this.option,
                index: this.index
            });
        } else {
            this.callback.emit(this.option);
        }
    }
}