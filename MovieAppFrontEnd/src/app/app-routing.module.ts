import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { RegisterComponent } from './register/register.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'movies',component:MoviesComponent,canActivate:[AuthGuard]},
  {path:'ticketbooking',component:TicketBookingComponent,canActivate:[AuthGuard]},
  {path:'ticketdetails',component:TicketdetailsComponent,canActivate:[AuthGuard]},
  {path:'mytickets',component:MyticketsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
