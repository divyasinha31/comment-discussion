import { Injectable } from '@angular/core';
import { iCallAPIReq, iCallAPIResp } from './model';
import { API_URL, GET_BINS_ROUTE, MASTER_KEY } from './constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append("Content-Type", "application/json");
    this.headers = this.headers.append("X-Master-Key", MASTER_KEY);
  }

  getComments(): Observable<iCallAPIResp> {
    const url: string = API_URL.concat(GET_BINS_ROUTE);
    return this.http.get<iCallAPIResp>(url, {headers: this.headers});
  }

  updateComment(payload: iCallAPIReq): Observable<iCallAPIResp> {
    const url: string = API_URL.concat(GET_BINS_ROUTE);
    return this.http.put<iCallAPIResp>(url, payload, {headers: this.headers});
  }
}
