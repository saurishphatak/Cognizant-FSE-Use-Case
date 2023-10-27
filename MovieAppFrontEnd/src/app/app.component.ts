import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public service: UserService) { }
  title = 'MovieAppFrontEnd';

  ngOnInit() {
    this.userExists();
  }

  userExists() {
    if (localStorage.getItem('token') != null) {
      return;
    }
  }
}
