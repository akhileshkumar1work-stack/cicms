import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material-module';

@Component({
  selector: 'app-reports',
  imports: [MaterialModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  foods: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
}
