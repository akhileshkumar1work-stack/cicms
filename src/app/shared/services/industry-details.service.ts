
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndustryDetailsService {
  apiUrl = "http://localhost:8000/api/industries";

  constructor(private http: HttpClient) {}

  // GET all industry details
    // getIndustries(params: any) {
    // return this.http.get<any>(this.apiUrl, { params });
    // }

}
