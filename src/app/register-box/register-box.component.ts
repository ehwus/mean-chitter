import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-register-box',
  templateUrl: './register-box.component.html',
  styleUrls: ['./register-box.component.css'],
})
export class RegisterBoxComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private accountService: AccountsService) {}

  ngOnInit(): void {}

  onSubmit() {
    const { username, email, password } = this.registerForm.value;
    this.accountService.register(username, email, password);
  }
}
