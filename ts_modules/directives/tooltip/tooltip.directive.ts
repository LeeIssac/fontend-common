/**
 * Created by LIHUA on 2017-08-14.
 * tooltip 文字提示
 */

import {Directive, ElementRef, OnInit, Renderer2} from "@angular/core";

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {

    position: any;

    size: any;

    ele: any;

    constructor(private element: ElementRef,
                private render: Renderer2) {
    }

    ngOnInit() {
        this.position = this.element.nativeElement.getAttribute('position') || 'bottom';

        this.render.listen(this.element.nativeElement, 'mouseenter', () => {
            this.size = this.getSize();
            this.createTip();
            console.log(this.size);
        });

        this.render.listen(this.element.nativeElement, 'mouseleave', () => {
            this.removeTip();
        });
    }

    getSize() {
        let size = {};
        size['offsetWidth'] = this.element.nativeElement.offsetWidth;
        size['offsetHeight'] = this.element.nativeElement.offsetHeight;
        size['offsetTop'] = this.element.nativeElement.offsetTop;
        size['offsetLeft'] = this.element.nativeElement.offsetLeft;

        return size;
    }

    createTip() {
        this.ele = document.createElement('div');
        this.ele.className = 'tooltip-container ' + this.position;
        this.ele.innerHTML = this.element.nativeElement.getAttribute('tooltip');

        let left, top;
        if (this.position === 'bottom') {
            left = this.size['offsetLeft'] + this.size['offsetWidth'] / 2;
            this.ele.style.left = left + 'px';
            this.ele.style.transform = 'translateX(-50%)';

            top = this.size['offsetTop'] + this.size['offsetHeight'] + 10;
            this.ele.style.top = top + 'px';
        }
        if (this.position === 'top') {
            left = this.size['offsetLeft'] + this.size['offsetWidth'] / 2;
            this.ele.style.left = left + 'px';

            top = this.size['offsetTop'] - 10;
            this.ele.style.top = top + 'px';

            this.ele.style.transform = 'translate(-50%, -100%)';
        }
        if (this.position === 'right') {
            left = this.size['offsetLeft'] + this.size['offsetWidth'] + 10;
            this.ele.style.left = left + 'px';

            top = this.size['offsetTop'] + this.size['offsetHeight'] / 2;
            this.ele.style.top = top + 'px';

            this.ele.style.transform = 'translateY(-50%)';
        }
        if (this.position === 'left') {
            left = this.size['offsetLeft'] - 10;
            this.ele.style.left = left + 'px';

            top = this.size['offsetTop'] + this.size['offsetHeight'] / 2;
            this.ele.style.top = top + 'px';

            this.ele.style.transform = 'translate(-100%, -50%)';
        }

        document.body.appendChild(this.ele);
    }

    removeTip() {
        document.body.removeChild(this.ele);
    }
}
