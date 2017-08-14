/**
 * Created by LIHUA on 2017-08-14.
 */

import {Component} from "@angular/core";

@Component({
    selector: 'media-component',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent {

    // 地址
    src: string;

    // 媒体类型
    type: string;

    /**
     * 关闭点击
     */
    closeClick() {}
}
