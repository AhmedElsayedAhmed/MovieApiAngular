import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MovieService } from 'src/app/Services/movie.service';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Movie } from 'src/app/Models/movie.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {
  protected id : string;
  model : Movie;
formdata : any;
  constructor(private router : ActivatedRoute,private http : MovieService, private route : Router,
    private authentication : AuthenticationService) {
  }

 ngOnInit() {
  var authenticated = this.authentication.checkAuthentication();
  if (authenticated == 410) {
    this.route.navigate(["/Login"]);
  }

  this.model = new Movie();
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

   this.router.paramMap.pipe(
     switchMap((param: ParamMap)=>
     this.id = param.get('id'))
   );
   this.id = this.router.snapshot.paramMap.get('id');
   this.http.GetMovie(this.id).subscribe(data=>{
     this.model = data[0];
     this.model.Title = data[0].title;
     this.model.Description = data[0].description;
     this.model.ImageName = data[0].imageName;
   },
   error=>{
     if (error instanceof HttpErrorResponse && error.status == 410) {
       alert("please sign in first")
       this.route.navigate(["/Login"]);
   }
  });
 }
 uploadFile(files : any) {
  const formData = new FormData();
  for (let file of files)
    formData.append(file.name, file);

  const uploadReq = new HttpRequest('POST', 'api/UploadFile', formData, {
    reportProgress: true,
  });
  this.http.Upload(formData).subscribe(data=>{
    this.model.ImageName = data.toString();
  });
  
}
 Update(){
   this.model.UserId = localStorage.getItem("Id");
   console.log(localStorage.getItem("Id"));
   if(this.model.UserId == null){
     this.route.navigate(["/Login"]);
   }
   this.http.Put(this.model).subscribe(data=> {
    this.route.navigate(["/Movie"]);
   })
 }
}
