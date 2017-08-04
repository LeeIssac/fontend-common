/**
 * Created by LIHUA on 2017-08-03.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalAlertComponent, ModalComponent, ModalService} from "./modal.service";

@NgModule({
    imports: [CommonModule],
    declarations: [ModalComponent, ModalAlertComponent],
    providers: [ModalService],
    entryComponents: [ModalComponent, ModalAlertComponent]
})
export class ModalModule {}
