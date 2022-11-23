import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  //HttpClientModule recuerde de importalo en el modulo, ya sea el prncipal o el otro para poder importar el servicio HttpClient
  // /name/colombia
  private apiUrl: string = 'https://restcountries.com/v3.1';
                        //  https://restcountries.com/v2/all?fields=name,capital,currencies


  constructor(private http: HttpClient) { }

  buscarPais( termino: string ): Observable<Country[]>{  

    const url = `${this.apiUrl}/name/${termino}`;
    return  this.http.get<Country[]>(url);  /*; Asi se controla errores mediante los rxjs
                      .pipe(
                        catchError(err => of([]))  //El of aqui transforma lo que sea en un obserbable
                      );*/
  }

  buscarCapital( termino: string ): Observable<Country[]>{  

    const url = `${this.apiUrl}/capital/${termino}`;
    return  this.http.get<Country[]>(url);
  }

  getPaisPorAlpha( id: string ): Observable<Country>{  

    const url = `${this.apiUrl}/alpha/${id}`;
    return  this.http.get<Country>(url);
  }

  buscarPorRegion(region: string): Observable<Country[]>{

    //Con la siguiente es para pasar parametros si se nesesita hacer la respuesta mas corta
    const httpParams = new HttpParams()
      .set('fields','pasas el parametro que desea.. lo escribes aqui')
      .set('otro', 'puedes agregar todos los parametros que quieras');

    const url = `${this.apiUrl}/region/${region}`;

    //en el reutr pasas los parametros que creaste arriba con el httpParams
    //return  this.http.get<Country[]>(url, {params: httpParams});
    return  this.http.get<Country[]>(url);
  }

}
