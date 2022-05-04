import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import INotice from '../model/INotice';

@Injectable({
  providedIn: 'root',
})
export class NoticesService {
  apiUrl: string = environment.baseUrl + environment.apis.notices;
  constructor(private http: HttpClient) {}

  getAll(): Observable<INotice[]> {
    return this.http.get<INotice[]>(this.apiUrl);
  }

  get(id: string): Observable<INotice> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<INotice>(url);
  }

  create(notice: any) {
    return this.http.post(this.apiUrl, notice);
  }

  edit(id: string, updatedNotice: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch(url, updatedNotice);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
