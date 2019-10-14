import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MovieService } from 'src/app/Services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {
protected id : string;
  constructor(private router : ActivatedRoute,private http : MovieService, private route : Router) {
    
   }

  ngOnInit() {
    this.router.paramMap.pipe(
      switchMap((param: ParamMap)=>
      this.id = param.get('id'))
    );
    this.id = this.router.snapshot.paramMap.get('id');
    this.http.Delete(this.id).subscribe(data=>{
      this.route.navigate(["/Movie"]);
    },
    error=>{
      if (error instanceof HttpErrorResponse && error.status == 410) {
        alert("please sign in first")
        this.route.navigate(["/Login"]);
    }
    }
    
    );
    
  }
}
