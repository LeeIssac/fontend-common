/**
 * Created by LIHUA on 2017-08-03.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModalService} from "./modal.service";
import {ModalAlertComponent} from "./components/alert/modal.alert.component";
import {ModalBasicComponent} from "./components/basic/modal.basic.component";
import {ModalConfrimComponent} from "./components/confrim/modal.confirm.component";

@NgModule({
    imports: [CommonModule],
    declarations: [ModalAlertComponent, ModalBasicComponent, ModalConfrimComponent],
    providers: [ModalService],
    entryComponents: [ModalAlertComponent, ModalBasicComponent, ModalConfrimComponent]
})
export class ModalModule {}
