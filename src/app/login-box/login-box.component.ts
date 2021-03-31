import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css'],
})
export class LoginBoxComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private accountsService: AccountsService) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.accountsService.authenticate(email, password);
  }

  ngOnInit(): void {}
}
