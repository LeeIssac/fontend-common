/**
 * Created by LIHUA on 2017-08-12.
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
    option: any; // 当前被选中的option

    @Input()     // options列表
    options: any;

    @Input()
    label: any;  // 显示的key

    @Output()
    callback: EventEmitter<any> = new EventEmitter(); // 确定点击回调

    showDown = false; // 是否显示下拉

    backgroundClickRef: any; // 背景点击引用

    constructor(private render: Renderer2) {}

    ngOnInit() {
        this.label = this.label || 'name';
    }

    /**
     * 下拉切换
     * @param $event
     */
    toggleShowDown($event: MouseEvent) {
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
        this.callback.emit(option);

        $event.stopPropagation();
    }

}

