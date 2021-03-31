import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  currentUser: { id: string; username: string; token: string } | null = null;
  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post(
        'http://localhost:4201/api/users',
        {
          username,
          email,
          password,
        },
        { headers }
      )
      .subscribe((response) => console.log(response));
  }

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
