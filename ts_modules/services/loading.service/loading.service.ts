/**
 * Created by LIHUA on 2017-08-18.
 */
import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from "@angular/core";
import {LoadingComponent} from "./components/loading/loading.component";

@Injectable()
export class LoadingService {

    ref: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                private applicationRef: ApplicationRef) {}

    /**
     * 显示loading
     * @param {number} delay 配置时间内隐藏loading
     */
    show(delay?: number) {
        // 当前存在动画就直接返回
        if (this.ref) {
            return;
        }

        let factory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
        let newNode = document.createElement(factory.selector);

        document.body.appendChild(newNode);

        this.ref = factory.create(this.injector, [], newNode);
        this.applicationRef.attachView(this.ref.hostView);
        this.ref.changeDetectorRef.detectChanges();

        if (delay) {
            setTimeout(() => {
                this.ref.destroy();
                this.ref = null;
            }, delay);
        }
    }

    /**
     * 隐藏loading
     */
    hide() {
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }
    }
}
