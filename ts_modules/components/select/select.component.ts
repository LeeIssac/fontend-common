import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
/**
 * Created by LIHUA on 2017-08-12.
 */

@Component({
    selector: 'app-demo-component',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

    @Input()
    options: any;

    @Input()
    label: any;

    @Output()
    callback: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.label = this.label || 'name';
    }

    optionClick(option: any) {
        console.log(option);
        this.callback.emit(option);
    }
}
