import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  public getPatients(): Observable<any> {
    return this.http.get('/users?limit=10&skip=10');
  }

  public updatePatient(requestBody: any, id: number): Observable<any> {
    return this.http.put(`/users/${id}`, requestBody);
  }

  public addPatient(requestBody: any): Observable<any> {
    return this.http.post('/users/add', requestBody);
  }

  public deletePatient(id: number): Observable<any> {
    return this.http.delete(`/users/${id}`);
  }

  public search(searchValue: String): Observable<any> {
    return this.http.get(`/users/filter?key=firstName&value=${searchValue}`);
  }
}
