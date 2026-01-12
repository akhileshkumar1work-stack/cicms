import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenStoreService } from './core/services/token-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('cicms');
  constructor(private tokenStoreService: TokenStoreService) {}
  ngOnInit() {
    this.tokenStoreService.restoreToken();
  }
}
