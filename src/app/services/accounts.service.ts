import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post('http://localhost:4201/api/auth', { email, password }, { headers })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
