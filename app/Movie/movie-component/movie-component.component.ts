import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/Services/movie.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-component',
  templateUrl: './movie-component.component.html',
  styleUrls: ['./movie-component.component.css']
})
export class MovieComponentComponent implements OnInit {

  movies;
  constructor(private movieService: MovieService, private authentication: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    var authenticated = this.authentication.checkAuthentication();
    if (authenticated == 410) {
      this.router.navigate(["/Login"]);
    }
    var id = localStorage.getItem('Id');
    this.movieService.GetAllMovie(id).subscribe(data => {
      if (data != null) {
        this.movies = data;
        console.log(this.movies);
      }
      else {
        this.movies = "No Movies"
      }
    });
  }
}
