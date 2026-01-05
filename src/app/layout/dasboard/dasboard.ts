import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  imports: [Sidebar, RouterModule],
  templateUrl: './dasboard.html',
  styleUrl: './dasboard.css',
})
export class Dasboard {
  constructor() {}
}
