import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixService {

  constructor(private http: HttpClient) { }

  processarPix(pixData: any): Observable<any> {
    return this.http.post("http://localhost:8080/movimentacao/pix", pixData);
  }
}
