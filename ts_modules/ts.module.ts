/**
 * Created by LIHUA on 2017-08-14.
 * 默认导出ts_modules下的全部模块
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {PaginationComponent} from "./components/pagination/pagination.component";
import {SelectComponent} from "./components/select/select.component";
import {MultiSelectComponent} from "./components/multi.select/multi.select.component";
import {DatePipe} from "./pipe/date.pipe";
import {HttpService} from "./services/http.service";
import {ModalModule} from "./services/modal.service/modal.module";
import {MediaModule} from "./services/media.service/media.module";
import {TooltipDirective} from "./directives/tooltip/tooltip.directive";
import {ShowDirective} from "./directives/show/show.directive";
import {ToolService} from "./services/tool.service";
import {SizePipe} from "./pipe/size.pipe";
import {SubstrPipe} from "./pipe/string.pipe";

@NgModule({
    imports: [
        CommonModule,
        ModalModule,
        MediaModule,
    ],
    declarations: [
        PaginationComponent,
        SelectComponent,
        MultiSelectComponent,
        DatePipe,
        SizePipe,
        SubstrPipe,
        TooltipDirective,
        ShowDirective
    ],
    providers: [
        HttpService,
        ToolService
    ],
    exports: [
        PaginationComponent,
        SelectComponent,
        DatePipe,
        SizePipe,
        SubstrPipe,
        TooltipDirective,
        ShowDirective
    ]
})
export class TsModule {

}
