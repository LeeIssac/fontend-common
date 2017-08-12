/**
 * Created by LIHUA on 2017-08-12.
 * 动画函数
 */

import {Injectable} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

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

}
