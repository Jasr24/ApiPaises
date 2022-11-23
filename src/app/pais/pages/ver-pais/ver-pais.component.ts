import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  pais!: Country;  //! para indicarle que puede ser nulo

  //ActivatedRoute viene con todo lo nesesario para subscribirnos al url
  constructor(
          private activatedRoute: ActivatedRoute,
          private paisService: PaisService) { }

  ngOnInit(): void {

    /* Esta es una manera.. la otra es con RxJs el switchMap el ual permite recibir un observable y retornar otro observable

    this.activatedRoute.params
      .subscribe(({ id }) => {
        console.log(id)  //lo que definimos en el modulo de rutas es lo que recibimos como params

        this.paisService.getPaisPorAlpha(id)
          .subscribe(pais => {
            console.log(pais);
          });

      })
    */

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getPaisPorAlpha(id)),
        tap(console.log) //el tap es otro RXxJs el cual aqui nos sirve para imrpimir en consola
      )
      .subscribe(pais => {
        this.pais = pais[0];
      })
  }

}
