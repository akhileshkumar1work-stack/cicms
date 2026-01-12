import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStoreService {
  private accessToken: string | null = null;

  setToken(token: string): void {
    this.accessToken = token;
    sessionStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return this.accessToken;
  }

  restoreToken() {
    this.accessToken = sessionStorage.getItem('accessToken');
  }

  clear(): void {
    this.accessToken = null;
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}
