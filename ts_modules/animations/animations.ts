/**
 * Created by LIHUA on 2017-08-12.
 * 动画函数
 */

import {AnimationEntryMetadata, Injectable} from "@angular/core";
import {animate, group, query, state, style, transition, trigger} from "@angular/animations";

@Injectable()
export class Animations {

    /**
     * 高度收缩
     * @type {AnimationTriggerMetadata}
     */
    static slideUpDwon = trigger('slideUpDwon', [
        transition('void => *', [
            style({height: 0}),
            animate(120)
        ]),
        transition('* => void', [
            style({height: '*'}),
            animate(120, style({height: 0}))
        ])
    ]);

    /**
     * 淡入淡出
     * @type {AnimationTriggerMetadata}
     */
    static fadeInOut = trigger('fadeInOut', [
        transition('void => *', [
            style({opacity: '0.3'}),
            animate(50)
        ]),
        transition('* => void', [
            animate(50, style({opacity: '0'}))
        ])
    ]);

    /**
     * 也是淡入淡出 可以自定义参数
     * @param options
     */
    static fadeInOutFun(options: any) {
        return trigger('fadeInOut', [
            transition('void => *', [
                style({opacity: options.opacity}),
                animate(options.time)
            ]),
            transition('* => void', [
                animate(options.time, style({opacity: '0'}))
            ])
        ]);
    }

    static routeAnimation: AnimationEntryMetadata = trigger('routerAnimation', [
        transition(':enter', [
            style({ opacity: 0.5 }),
            animate('0.4s ease', style({ opacity: 1 }))
        ])
    ]);


}
