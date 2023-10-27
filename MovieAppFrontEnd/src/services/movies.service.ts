import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // readonly baseURL = 'http://localhost:5222/api/v1.0/moviebooking';
  readonly baseURL = environment.MOVIE_BOOKING_API_BASE_URL + `/api/v1.0/moviebooking`;

  constructor(private http: HttpClient) {
  }

  getAllMovies(): Observable<any[]> {
    return this.http.get<any>(this.baseURL + '/all');
  }

  getMovieByName(val: any): Observable<any[]> {
    return this.http.get<any>(this.baseURL + '/search/' + val);
  }

  deleteMovie(val1: any, val2: any) {
    return this.http.delete(this.baseURL + "/" + val1 + '/delete/' + val2);
  }
}
