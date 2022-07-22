import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { PeliculaResponse } from 'src/interfaces/pelicula-response';
import { Cast } from 'src/interfaces/cast-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: PeliculaResponse | undefined;
  public actores: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    combineLatest([
      this.peliculasService.cargarPelicula(id),
      this.peliculasService.getActores(id)
    ]).subscribe( ( [ movie, actores ]) => {

      if ( !movie ) {
        this.router.navigateByUrl('/home')
        return;
      }
      this.movie = movie;
      this.actores = actores.filter( actor => actor.profile_path != null);

    });

    // this.peliculasService.cargarPelicula(id)
    // .subscribe( movie => {
    //   if ( !movie ) {
    //     this.router.navigateByUrl('/home')
    //     return;
    //   }
    //   this.movie = movie;
    // });

    // this.peliculasService.getActores(id)
    // .subscribe ( actores => {
    //   this.actores = actores.filter( actor => actor.profile_path != null);
    //   // console.log(this.actores)
    // });
  }

  regresar() {
    this.location.back();
  }
}
