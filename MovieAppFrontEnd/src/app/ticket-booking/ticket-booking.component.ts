import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketsService } from 'src/services/tickets.service';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements OnInit {

  movieName: any;
  theatreName: any;
  totalSeats!: number[];
  bookedSeats!: number[];
  selectedSeats!: number[];
  numberOfSeatsSelect = [1, 2, 3, 4, 5, 6];
  noOfSeats!: number;
  availableSeats!: number;
  bookingInfo: any;
  status: string = "BOOK ASAP";


  constructor(private ticketservice: TicketsService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.movieName = params.get('movieName'),
        this.theatreName = params.get('theatreName')
    });
    this.bookingInfo = this.getBookingInfo(this.movieName, this.theatreName);
    this.selectedSeats = [];
    this.noOfSeats = 0;
  }

  isSeatBooked(seatNumber: number): boolean {
    return this.bookedSeats.includes(seatNumber);
  }

  isSeatSelected(seatNumber: number): boolean {
    return this.selectedSeats.includes(seatNumber);
  }

  toggleSeatSelection(seatNumber: number) {
    if (this.isSeatBooked(seatNumber)) {
      return;
    }
    if (this.isSeatSelected(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(s => s != seatNumber);
    }
    else {
      this.selectedSeats.push(seatNumber);
    }
  }
  onChangeOfNoOfSeats() {
    this.selectedSeats = [];
  }

  getBookingInfo(moviename: any, theatrename: any) {
    this.ticketservice.getBookingInfo(moviename, theatrename).subscribe(data => {
      this.bookingInfo = data;
      this.totalSeats = new Array(this.bookingInfo.totalSeatsAvailable).fill(0).map((_, i) => i + 1);
      this.bookedSeats = this.bookingInfo.bookedTickets;
      this.availableSeats = this.totalSeats.length - this.bookedSeats.length;
      if (this.availableSeats == 0) {
        this.status = "SOLD OUT"
      }
    })
  }

  bookSeats() {
    const bookingInfo = {
      loginId: localStorage.getItem("username"),
      movieName: this.movieName,
      theatreName: this.theatreName,
      numberOfTickets: this.noOfSeats,
      seatNumbers: this.selectedSeats
    }

    this.ticketservice.bookTickets(bookingInfo).subscribe(succ => {
      console.log(succ);
    },
      err => {
        if (err.status == 200) {
          const data = {
            movieName: this.movieName,
            theatreName: this.theatreName,
            noOfSeats: this.noOfSeats,
            bookedSeats: this.selectedSeats
          }
          this.toastr.success("Tickets Booked Successfully")
          this.router.navigate(['/ticketdetails'], { queryParams: data })
        }
      }
    )
  }
}
