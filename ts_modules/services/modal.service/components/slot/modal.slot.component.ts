/**
 * Created by LIHUA on 2017-09-05.
 *  带插槽性质的模态框
 */
import {Component} from "@angular/core";
import {animate, style, trigger, transition} from '@angular/animations';

@Component({
    selector: 'modal-slot-component',
    templateUrl: './modal.slot.component.html',
    styleUrls: ['./modal.slot.component.scss']
    // animations: [
    //     trigger('fadeInOut', [
    //         transition('void => *', [
    //             style({opacity: '.3'}),
    //             animate(50)
    //         ]),
    //         transition('* => void', [
    //             animate(50, style({opacity: '0'}))
    //         ])
    //     ])
    // ]
})
export class ModalSlotComponent {

    show = false;

    closeClick() {
        this.show = false;
    }

}
