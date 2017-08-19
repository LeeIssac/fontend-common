/**
 * Created by LIHUA on 2017-08-18.
 */
import {NgModule} from "@angular/core";
import {LoadingComponent} from "./components/loading/loading.component";
import {LoadingService} from "./loading.service";

@NgModule({
    declarations: [LoadingComponent],
    providers: [LoadingService],
    entryComponents: [LoadingComponent]
})
export class LoadingModule {}
