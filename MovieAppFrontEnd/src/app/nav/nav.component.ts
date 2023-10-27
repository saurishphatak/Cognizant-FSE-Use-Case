import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    username: any;
    constructor(public service: UserService, private router: Router) { }

    ngOnInit(): void {
        this.username = localStorage.getItem('username');
    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigateByUrl('/login');
    }
}
