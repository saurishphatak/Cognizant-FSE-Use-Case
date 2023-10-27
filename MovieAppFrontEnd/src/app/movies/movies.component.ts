import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from 'src/services/movies.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  moviesList: any = [];
  searchMovie: string = "";
  constructor(public service: UserService, private movieService: MoviesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMovies();
    this.service.status();
  }

  getMovies() {
    this.movieService.getAllMovies().subscribe(data => {
      // console.log("data", data);
      this.moviesList = data;
    });
  }

  findMovieBySearch(searchMovie: any) {
    this.movieService.getMovieByName(searchMovie).subscribe(data => {
      this.moviesList = data;
    })
  }

  bookTickectsNavigation(movie: any) {
    // console.log(movie);
    const data = {
      movieName: movie.movieName,
      theatreName: movie.theatreName
    }
    this.router.navigate(['/ticketbooking'], { queryParams: data });
  }


  deleteMovie(movie: any) {
    let result = confirm("Are you sure want to delete?");
    if (result) {
      this.movieService.deleteMovie(movie.movieName, movie.theatreName).subscribe(nxt => {
        // this.toastr.success("Deleted Successfully.")
        //this.router.navigateByUrl('/movies')
      }, err => {

        this.toastr.success("Deleted Successfully.")

      },
        () => {
          this.router.navigateByUrl('/movies');
        })
    }
  }

}
