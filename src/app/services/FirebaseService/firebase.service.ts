import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private apiUrl = environment.apiUrl;

  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  addData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/JobData.json`, data);
  }

  updateData(id: string, newData: any): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/JobData/${id}.json`, newData);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/JobData/${id}.json`);
  }

  getAllData(): Observable<any> {
    return this.http.get(`${this.apiUrl}.json`);
  }
}
