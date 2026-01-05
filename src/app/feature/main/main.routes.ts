import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './component/main';

export const route: Routes = [{ path: '', component: Main }];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
