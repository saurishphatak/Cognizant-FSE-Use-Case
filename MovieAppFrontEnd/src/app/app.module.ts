import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AccordionModule} from 'primeng/accordion';
import { RegisterComponent } from './register/register.component';     
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {PanelModule} from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component'
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { MoviesComponent } from './movies/movies.component';
import {CardModule} from 'primeng/card';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { MyticketsComponent } from './mytickets/mytickets.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    ForgotpasswordComponent,
    MoviesComponent,
    TicketBookingComponent,
    TicketdetailsComponent,
    MyticketsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    CardModule,
    DividerModule,
    ButtonModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar:true
    }), 
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
