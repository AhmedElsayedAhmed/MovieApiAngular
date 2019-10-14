import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../Services/user.service';
import { Router } from "@angular/router"
import { User } from '../Models/user.model';
@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  formData;
  user: User;
  constructor(private http: UserService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.formData = new FormGroup({
      Email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])),
      Password: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
  }

  Login(data: any) {
    this.user.Email = data.Email;
    this.user.Password = data.Password;

    this.http.Login(this.user).subscribe(data => {
      if (data != null) {
        if (data != "410") {
          var returnData = data.toString().split(" ");
          localStorage.setItem("token", returnData[0]);
          localStorage.setItem("Id", returnData[1]);
          this.router.navigate(["/Movie"]);
        }
        else {
          alert("Login Invalid , Try again")
          this.router.navigate(["/Login"]);
        }
      }
      
    })

  }
}
