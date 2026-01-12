import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenStoreService } from '../../core/services/token-store.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(
    public tokenStoreService: TokenStoreService,
    public router: Router
  ) {}
  logout() {
    console.log('logout')
    this.tokenStoreService.clear();
    sessionStorage.clear();
    this.router.navigate(['login'])
  }
}
