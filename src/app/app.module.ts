import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoggedOutComponent } from './navbar/logged-out/logged-out.component';
import { LoggedInComponent } from './navbar/logged-in/logged-in.component';
import { LoginBoxComponent } from './login-box/login-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoggedOutComponent,
    LoggedInComponent,
    LoginBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
