import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from 'src/interfaces/cartelera-response';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  public movies: Movie[] = [];
  public titulo: string = '';

  constructor( private activtedRoute: ActivatedRoute,
               private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.activtedRoute.params.subscribe( params => {
      this.titulo = params['texto'];
      //TODO: llamar el servicio
      this.peliculasService.buscarPeliculas(params['texto'])
        .subscribe( movies => {
          this.movies = movies;
        })
    })
  }

}
