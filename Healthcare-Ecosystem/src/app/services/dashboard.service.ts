import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
 private doctorUrl = 'http://localhost:8080/api/doctors';

 private statsUrl = 'http://localhost:8080/api/v1/dashboard/stats';

  http:HttpClient;
  constructor(http:HttpClient){
    this.http = http;
  }

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.doctorUrl);
  }
    getSummary(): Observable<any>{
      return this.http.get<any>(this.doctorUrl);
  }
}
