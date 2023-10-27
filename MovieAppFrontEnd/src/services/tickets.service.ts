import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {


  // readonly baseURL = 'http://localhost:5222/api/v1.0/moviebooking';
  readonly baseURL = environment.MOVIE_BOOKING_API_BASE_URL + `/api/v1.0/moviebooking`;

  constructor(private http: HttpClient) {
  }

  bookTickets(data: any) {
    return this.http.post(`${this.baseURL}/${data.movieName}/add`, data);
  }

  updateStatus(val1: any, val2: any) {
    return this.http.put(this.baseURL + val1 + '/update/' + val2, null);
  }

  getBookingInfo(val1: any, val2: any) {
    return this.http.get(`${this.baseURL}/${val1}/getbookinginfo/` + val2);
  }

  getTickets(val: any) {
    return this.http.get(this.baseURL + "/getticketsbyuser/" + val);
  }
}
