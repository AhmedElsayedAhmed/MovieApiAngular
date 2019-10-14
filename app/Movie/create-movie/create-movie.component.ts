import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Movie } from 'src/app/Models/movie.model';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { MovieService } from 'src/app/Services/movie.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  formdata: any;
  movie: Movie;
  constructor(private http: MovieService, private router: Router, private httpClient : HttpClient,
    private authentication : AuthenticationService) {

  }

  ngOnInit() {
    var authenticated = this.authentication.checkAuthentication();
    if (authenticated == 410) {
      this.router.navigate(["/Login"]);
    }
    this.movie = new Movie();
    this.formdata = new FormGroup({
      Title: new FormControl("", Validators.compose([
        Validators.required
      ])),
      Image: new FormControl("", Validators.compose([
        Validators.required
      ])),
      Description: new FormControl("", Validators.compose([
      ]))
    })
  }

  uploadFile(files : any) {
    const formData = new FormData();
    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', 'api/UploadFile', formData, {
      reportProgress: true,
    });
    this.http.Upload(formData).subscribe(data=>{
      this.movie.ImageName = data.toString();
    });
    
  }

  Create() {
    this.http.Create(this.movie).subscribe(data => {
      this.router.navigate(["/Movie"]);
    },
      error => {
        if (error instanceof HttpErrorResponse && error.status == 410) {
          alert("please sign in first")
          this.router.navigate(["/Login"]);
        }
      });

  }

}
