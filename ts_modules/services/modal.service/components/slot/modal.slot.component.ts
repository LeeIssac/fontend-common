/**
 * Created by LIHUA on 2017-09-05.
 *  带插槽性质的模态框
 */
import {AfterContentChecked, Component, ElementRef, OnChanges, SimpleChange, ViewChild} from "@angular/core";
import {animate, style, trigger, transition} from '@angular/animations';

@Component({
    selector: 'modal-slot-component',
    templateUrl: './modal.slot.component.html',
    styleUrls: ['./modal.slot.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition('void => *', [
                style({opacity: '.3'}),
                animate(50)
            ]),
            transition('* => void', [
                animate(50, style({opacity: '0'}))
            ])
        ])
    ]
})
export class ModalSlotComponent implements AfterContentChecked {

    show = false;  // 是否显示

    width: number; // 宽度

    @ViewChild('container') container: ElementRef;

    ngAfterContentChecked() {
        // 模态框暂时放弃 transform: translate(-40%, -50%); 布局方式，原因是使子容器模糊了
        if (this.container && this.container.nativeElement) {
            let container = this.container.nativeElement;
            let content = container.querySelector('.app-modal-content');
            this.width = content.clientWidth;
        }
    }

    closeClick() {
        this.show = false;
    }

}
