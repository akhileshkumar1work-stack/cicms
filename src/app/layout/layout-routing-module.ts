import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dasboard } from './dasboard/dasboard';
import { Main } from '../feature/main/component/main';
import { MasterData } from '../feature/master-data/master-data';
import { Complaince } from '../feature/complaince/complaince';
import { Ocems } from '../feature/ocems/ocems';
import { IndustryDetails } from '../feature/industry-list/component/industry-details/industry-details';

const routes: Routes = [
  {
    path: '',
    component: Dasboard,
    children: [
      { path: '', component: Main, pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () => import('../feature/main/main.module').then((m) => m.MainModules),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('../feature/industry-list/industry.module').then((x) => x.IndustryModule),
      },
      {
        path: 'inspection',
        loadChildren: () => import('../feature/create/create.modules').then((m) => m.CreateModules),
      },
      {
        path: 'reports',
        loadChildren: () => import('../feature/reports/reports.module').then((m) => m.ReportModule),
      },
      { path: 'industry', component: IndustryDetails },
      { path: 'ocems', component: Ocems },
      { path: 'complaince', component: Complaince },
      { path: 'master-data', component: MasterData },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
