import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  uploadData(file: any, id: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    return this.http.post<string>('http://127.0.0.1:5000/upload', formData);
  }

  retrieveID(): Observable<string> {
    return this.http.get<string>('http://127.0.0.1:5000/retrieve');
  }

  verify(file: any, id: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    return this.http.post<string>('http://127.0.0.1:5000/verify', formData);
  }
}
