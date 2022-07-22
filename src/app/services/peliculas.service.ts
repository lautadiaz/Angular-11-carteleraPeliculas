import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from 'src/interfaces/cartelera-response';
import { PeliculaResponse } from 'src/interfaces/pelicula-response';
import { Cast, CastResponse } from 'src/interfaces/cast-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http:HttpClient) { }

  get params() {
    return {
      api_key:'f39f6a6a82979e539049b5c61c10a11f',
      lenguage: 'es-ES',
      page: this.carteleraPage
    }
  }

  getCartelera():Observable<Movie[]> {

    if ( this.cargando ) {

      return of([]);
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>( `${ this.baseUrl }/movie/now_playing`,{
      params: this.params
    }).pipe(
      map((resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  resetCartelera() {
    this.carteleraPage = 1;
  }

  buscarPeliculas( texto: string):Observable<Movie[]> {

    const params = {...this.params, page:1, query: texto};

    return this.http.get<CarteleraResponse>( `${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map((resp) => resp.results ),
      // tap( () => {
      //   this.carteleraPage = 1;
      // })
    );
  }

  cargarPelicula( id: string) {

    return this.http.get<PeliculaResponse>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
  }

  getActores( id: string):Observable<Cast[]> {
    return this.http.get<CastResponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]))
    )
  }
}
