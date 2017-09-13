/**
 * Created by LIHUA on 2017-08-12.
 * 单选下拉框
 */

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from "@angular/core";
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
    type: string;     // 序号类型

    @Input()
    fixed: boolean;    // 是否固定 所谓固定是点击选择的时候不主动隐藏下拉框 true 不隐藏， 默认隐藏

    @Output()
    callback: EventEmitter<any> = new EventEmitter(); // 确定点击回调

    @Input()
    position: string;  // 下拉位置 默认底部， top 顶部

    @Input()
    placeholder: string; // 空白描述

    @Input()
    single = false;      // 是否为单一源选择，单一源就是 源不拷贝

    @Input()
    clear = false;      // 是否显示清除按钮

    @Input()
    search = false;     // 是否显示搜索按钮
    @Input()
    searchs: any;       // 待搜索数组
    @Output()
    searchCallback: EventEmitter<any> = new EventEmitter();  // 搜索回调
    @ViewChild('searchInput')
    searchInput: ElementRef;                                 // 搜索绑定

    showDown = false;  // 是否显示下拉

    backgroundClickRef: any; // 背景点击引用

    constructor(private render: Renderer2) {}

    ngOnInit() {
        this.label = this.label || 'name';
        this.position = this.position || 'bottom';

        // 非单一源 数据拷贝
        if (!this.single) {
            this.options = JSON.parse(JSON.stringify(this.options));
        }
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

        this.deleteSearchInput();

        $event.stopPropagation();
    }

    /**
     * 选中点击
     * @param option
     * @param $event
     */
    optionClick(option: any, $event: MouseEvent) {

        // 如果是single状态
        if (this.single) {
            // 点击已经选中的option直接返回
            if (option.checked) {
                $event.stopPropagation();
                return;
            }

            // 如果存在原来的选中数据 就把原来的选中置空
            if (this.option) {
                this.options.forEach(op => {
                    if (op[this.label] === this.option[this.label]) {
                        op.checked = false;
                    }
                });
            }

        } else {
            // 非single状态就全部清除选中状态
            this.options.forEach(op => op.checked = false);
        }

        // 选中本身
        option.checked = true;

        let temp = (this.index !== undefined) ? { checked: option, index: this.index, type: this.type  } : option;
        this.callback.emit(temp);

        this.deleteSearchInput();

        if (this.fixed) {
            // 固定 就是点击选项框的时候不隐藏下拉菜单
            $event.stopPropagation();
        }
    }

    /**
     * 清除选中
     * @param {MouseEvent} $event
     */
    clearClick($event: MouseEvent) {
        this.options.forEach(op => op.checked = false);

        let temp = this.index ? { checked: null, index: this.index, type: this.type } : null;
        this.callback.emit(temp);

        this.deleteSearchInput();

        $event.stopPropagation();
    }

    /**
     * 搜索点击
     * @param {string} search
     */
    searchKeyup(search: string) {
        this.searchCallback.emit(search);

        if (this.searchs && this.searchs.length) {
            if (search) {
                let temp = [];
                this.searchs.forEach(s => {
                    if (s[this.label].indexOf(search) !== -1) {
                        temp.push(s);
                    }
                });
                this.options = temp;
            } else {
                this.options = this.searchs;
            }
        }
    }

    /**
     * 搜索点击
     * @param {string} search
     */
    searchClick($event: MouseEvent) {
        $event.stopPropagation();
    }

    /**
     * 清除搜索框内容
     */
    deleteSearchInput() {
        if (this.search) {
            if (this.searchInput && this.searchInput.nativeElement) {
                this.searchInput.nativeElement.value = '';
            }

            if (this.searchs && this.searchs.length) {
                this.options = this.searchs;
            }
        }
    }

}

