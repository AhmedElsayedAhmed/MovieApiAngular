import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Movie } from '../Models/movie.model';
import {  ViewChild } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient, private aut : AuthenticationService) { }
  private readonly url = "https://localhost:44334/api/Movie";
  private file : any;
  public GetAllMovie(userId : string){
    return this.aut.get("https://localhost:44334/Movie/GetMovies/" + userId);
  }
  public Create(movieModel : Movie){
    movieModel.UserId = localStorage.getItem('Id');
    return this.aut.post(this.url,movieModel);
  }

  public Delete(id : string){
    return this.aut.delete(this.url+"/"+id);
  }

  public Upload(data : any){
    return this.http.post("https://localhost:44334/api/UploadFile", data);
  }

  public GetMovie(id : string){
    return this.aut.get(this.url + "/" + id);
  }

  public Put(movie : any){
    movie.userId = movie.UserId;
    return this.aut.put(this.url, movie);
  }
}
