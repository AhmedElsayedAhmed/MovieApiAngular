import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { MovieComponentComponent } from './Movie/movie-component/movie-component.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthenticationService } from './Services/authentication.service';
import { MovieService } from './Services/movie.service';
import { UserService } from './Services/user.service';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMovieComponent } from './Movie/create-movie/create-movie.component';
import { UpdateMovieComponent } from './Movie/update-movie/update-movie.component';
import { DeleteMovieComponent } from './Movie/delete-movie/delete-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponentComponent,
    MovieComponentComponent,
    CreateMovieComponent,
    UpdateMovieComponent,
    DeleteMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    MovieService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
