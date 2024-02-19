import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  addData(data: any): Observable<any> {
    return this.http.post(
      'https://job-portal-3b40c-default-rtdb.firebaseio.com/JobData.json',
      data
    );
  }

  updateData(id: string, newData: any): Observable<any> {
    console.log(newData);
    return this.http.put<void>(
      `https://job-portal-3b40c-default-rtdb.firebaseio.com/JobData/${id}.json`,
      newData
    );
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete<void>(
      `https://job-portal-3b40c-default-rtdb.firebaseio.com/JobData/${id}.json`
    );
  }

  getAllData(): Observable<any> {
    return this.http.get(
      'https://job-portal-3b40c-default-rtdb.firebaseio.com/.json'
    );
  }
}
