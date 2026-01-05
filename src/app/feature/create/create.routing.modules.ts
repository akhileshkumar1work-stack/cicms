import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Create } from './component/create';
import { Industyform } from './industyform/industyform';

const routes: Routes = [
  // { path: '', component: Create },
  { path: '', component: Industyform },
  { path: ':id', component: Industyform }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
