import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBoxComponent } from './login-box/login-box.component';
import { HomeComponent } from './home/home.component';
import { RegisterBoxComponent } from './register-box/register-box.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginBoxComponent },
  { path: 'register', component: RegisterBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
