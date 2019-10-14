import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponentComponent } from './Movie/movie-component/movie-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { CreateMovieComponent } from './Movie/create-movie/create-movie.component';
import { DeleteMovieComponent } from './Movie/delete-movie/delete-movie.component';
import { UpdateMovieComponent } from './Movie/update-movie/update-movie.component';

const routes: Routes = [
  {path : "Movie", component : MovieComponentComponent },
  {path : "Login", component : UserComponentComponent},
  {path: "Create" , component : CreateMovieComponent},
  {path: "Delete/:id" , component : DeleteMovieComponent},
  {path: "Edit/:id" , component : UpdateMovieComponent},
  {path: "" , component : UserComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
