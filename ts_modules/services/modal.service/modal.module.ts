/**
 * Created by LIHUA on 2017-08-03.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModalService} from "./modal.service";
import {ModalAlertComponent} from "./components/alert/modal.alert.component";
import {ModalBasicComponent} from "./components/basic/modal.basic.component";
import {ModalConfrimComponent} from "./components/confrim/modal.confirm.component";
import {ModalLoadingComponent} from "./components/loading/modal.loading.component";
import {ModalSlotComponent} from "./components/slot/modal.slot.component";

@NgModule({
    imports: [CommonModule],
    declarations: [
        ModalAlertComponent,
        ModalBasicComponent,
        ModalConfrimComponent,
        ModalLoadingComponent,
        ModalSlotComponent
    ],
    providers: [ModalService],
    entryComponents: [
        ModalAlertComponent,
        ModalBasicComponent,
        ModalConfrimComponent,
        ModalLoadingComponent
    ],
    exports: [
        ModalSlotComponent
    ]
})
export class ModalModule {}
