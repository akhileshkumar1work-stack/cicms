import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })

export class CaptchaService {
  constructor(private http: HttpClient) {}

  getCaptcha() {
    return this.http.get<any>('http://localhost:8000/api/captcha');
  }

  login(data: any){
    return this.http.post<any>('http://localhost:8000/api/login', data);
  }
}
