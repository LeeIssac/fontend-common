/**
 * Created by LIHUA on 2017-08-03.
 */

import {
    NgModule,
    Component,
    Injectable,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    ApplicationRef,
} from '@angular/core';
import {CommonModule} from "@angular/common";

@Injectable()
export class AlertModalService {

    message: string;
    action?: string;

    private alertContainerComponent;
    private alertContainerRef;
    private alertContainerInstance;

    private alertModalComponentRef;
    private alertModalComponentInstance;

    constructor(
        private componentFactoryResolover: ComponentFactoryResolver,
        private applicationRef: ApplicationRef
    ){}

    open(alertContainer: any) {
        console.log(alertContainer);
        let alertComponentFactory = this.componentFactoryResolover.resolveComponentFactory(AlertModalComponent);
        document.body.insertBefore(document.createElement(alertComponentFactory.selector), document.body.lastChild);
        this.alertModalComponentRef = this.applicationRef.bootstrap(alertComponentFactory);
        console.log(this.alertModalComponentRef);
        this.alertModalComponentInstance = this.alertModalComponentRef.instance;
        this.alertContainerRef = this.alertModalComponentInstance.alertContainerRef;

        const alertContainerFactory = this.componentFactoryResolover.resolveComponentFactory(alertContainer);
        this.alertContainerComponent = this.alertContainerRef.createComponent(alertContainerFactory);
        this.alertContainerInstance = this.alertContainerComponent.instance;

        this.alertContainerInstance['destroy'] = () => {
            this.destroy();
        }
    }

    destroy() {
        this.alertModalComponentInstance.isShow = false;

        setTimeout(() => {
            this.alertContainerComponent.destroy();
            this.alertModalComponentRef.destroy;

            this.clear();
        }, 200);
    }

    private clear() {
        this.alertModalComponentRef = null;
        this.alertModalComponentInstance = null;
        this.alertContainerComponent = null;
        this.alertContainerInstance = null;
        this.alertContainerRef = null;
    }

}

@Component({
    selector: 'alert-modal-component',
    template: `
        <div class="alert">
            <ng-template #alertContainer></ng-template>
        </div>
    `,
    styles: [
            `.alert {
            display: block;
            transform: translateY(0%);
            background: #323232;
            min-width: 288px;
            padding: 14px 24px 14px 24px;
        }`
    ]
})

export class AlertModalComponent {

    @ViewChild('alertContainer', { read: ViewContainerRef }) alertContainerRef;
    constructor() {

    }
}



@NgModule({
    imports: [CommonModule],
    declarations: [AlertModalComponent],
    providers: [AlertModalService],
    entryComponents: [AlertModalComponent]
})

export class ModalAlertModule {}
