import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/services/tickets.service';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.css']
})
export class MyticketsComponent implements OnInit {

  constructor(private ticketService:TicketsService) { }
  ticketsByuser:any=[];

  ngOnInit(): void {
    this.getTickets();
  }
  getTickets(){
    this.ticketService.getTickets(localStorage.getItem('username')).subscribe(
      data=>{
        this.ticketsByuser=data;
      }
    )
  }

}
