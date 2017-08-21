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

    static routeAnimation: AnimationEntryMetadata =
        trigger('routeAnimation', [
            transition(':enter', [
                style({
                    // position: 'absolute',
                    opacity: 0
                }),
                animate('0.3s ease-in-out')
            ]),
            transition('* => *', [
                // query(':leave', style({ transform: 'translateX(0)', position: 'absolute'}), { optional: true }),
                // query(':enter', style({ transform: 'translateX(100%)', position: 'absolute'}), { optional: true }),
                //
                // group([
                //     query(':leave', animate('.5s ease-in-out', style({transform: 'translateX(-100%)'})), { optional: true }),
                //     query(':enter', animate('.5s ease-in-out', style({transform: 'translateX(0)'})), { optional: true })
                // ])

                query(':leave', [animate('0.5s', style({ opacity: 0 })), style({ display: 'none' })], { optional: true }),
                query(':enter', style({opacity: 0}), { optional: true }),

                group([
                    query(':leave', animate('.5s ease-in-out', style({opacity: 0})), { optional: true }),
                    query(':enter', animate('.5s ease-in-out', style({opacity: 1})), { optional: true })
                ])
            ])
        ]);



}
