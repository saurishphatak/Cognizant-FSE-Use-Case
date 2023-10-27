import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent implements OnInit {

  ticketDetails:any;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      params=>{
        this.ticketDetails={
          movieName:params.get('movieName'),
          theatreName:params.get('theatreName'),
          noOfSeats:params.get('noOfSeats'),
          bookedSeats:params.getAll('bookedSeats')
        }
      }
    )
  }

}
