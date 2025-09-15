import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private url = 'https://apivaccine.info:1001/vaccine_v1/user/';
  private token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJUZXN0IVYxIiwidW5hbWUiOiJCaVNlblRvIiwidWVtYWlsIjoic21hcnR2YWNjaW5lbGFvc0BnbWFpbC5jb20iLCJ1c3RhdHVzIjoic3RvcCIsInJ1bGUiOiJhY3RpdmUiLCJpYXQiOjE2MjM5NTQwMzQsImV4cCI6MTkzOTMxNDAzNCwiYXVkIjoiaHR0cDovL0F0Y29kZWxhby5jbyIsImlzcyI6IkF0Y29kZSBMdGQiLCJzdWIiOiJBdGNvZGVsYW9AZ21haWwuY29tIn0.mYPFmXy4cmG5ggvYw7Thxi2NSRm2fDXD9J5gXq43hentLqp-qiCwOiFQhEWVIUFiSV30LlFVtekLayQIc0zmuPhmuYj7_Z0wVKokz7FjjyBJpmKpaOtsF1USKhReiAoIyV6TscqP6HC_PzFuHWQWnTKMPLcvbUfHLtz8qokYg_U';

  private headers = new HttpHeaders().set('x-access-token', this.token);
  constructor(private http: HttpClient) {}

  getrequest_leave(user: any): Observable<any> {
    const url = this.url + 'form_insert';
    return this.http.post(url, user, { headers: this.headers });
  }

  getDis(id: any) {
    const url = this.url + 'get_district_id?id=' + id;
    return this.http.get<any>(url, { headers: this.headers });
  }

  getPro() {
    const url = this.url + 'get_province';
    return this.http.get<any>(url, { headers: this.headers });
  }

  getVac() {
    const url = this.url + 'get_vaccine';
    return this.http.get<any>(url, { headers: this.headers });
  }

  getHospital() {
    const url = this.url + 'get_hospital';
    return this.http.get<any>(url, { headers: this.headers });
  }
  getjob() {
    const url = this.url + 'get_job';
    return this.http.get<any>(url, { headers: this.headers });
  }

  getvillage(id: any) {
    const url = this.url + 'get_village_id?id=' + id;
    return this.http.get<any>(url, { headers: this.headers });
  }
  getdisease() {
    const url = this.url + 'get_disease';
    return this.http.get<any>(url, { headers: this.headers });
  }
  getticket(id: any) {
    const url = this.url + 'get_ticket?id=' + id;
    return this.http.get<any>(url, { headers: this.headers });
  }

  webstatus() {
    const url = this.url + 'get_web_status';
    return this.http.get<any>(url, { headers: this.headers });
  }

  insert_from(data: any): Observable<any> {
    const url = this.url + 'form_insert';
    return this.http.post(url, data, { headers: this.headers });
  }

  get_vaccine(): Observable<any> {
    const url = this.url + 'get_vaccine';
    return this.http.get(url);
  }
}
