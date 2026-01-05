import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndustryDetails } from "./component/industry-details/industry-details";
export const routes: Routes = [
    {path: '', component: IndustryDetails}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class IndusryRoutingModule{}