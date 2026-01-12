
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  apiUrl = "http://localhost:8000/api/";
  // http://localhost:8000/api/search?page=1&limit=10

  constructor(private http: HttpClient) {}

  postIndustryData(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}industry`, data);
  }
  updateIndustry(id: any, data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}industry/${id}`, data);
  }
  // GET all industry list
   getIndustries(params: any) {
    return this.http.get<any>( `${this.apiUrl}search`, { params });
    }

    getDataById(id: string){
      return this.http.get<any>( `${this.apiUrl}${id}`);
    }

    //det dashboard details
    getDashboardDetails(){
      return this.http.get<any>(`${this.apiUrl}dblist`)
    }

    getCategoryCountDetails(){
      return this.http.get<any>(`${this.apiUrl}category-count`)
    }

    getFirstSectionTotalCount(){
      return this.http.get<any>(`${this.apiUrl}total-count`);
    }
}
