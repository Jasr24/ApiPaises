import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles:[
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos : Country[] = [];
  mostrarSugerencia: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(vieneDelHijo:string){
    this.mostrarSugerencia = false
    this.hayError = false;
    this.termino = vieneDelHijo;

    this.paisService.buscarPais(this.termino)
    .subscribe( (pais) => {

      // pais.forEach((pai) => {
      //   this.paises.push(pai);
      // })
      this.paises = pais; //mas rapido asi en ves de usar un for each y despues un push
      
      console.log(pais);

    }, /*Esta es una manera de controlar el error.. la otra es en el servicio mediante los operadores rxjs*/ 
    (err) => {
      this.paises = [];
      this.hayError = true;
    });
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencia = true;

    //Sugerencias
    this.paisService.buscarPais(termino)
        .subscribe(paises => 
          this.paisesSugeridos = paises.splice(0,5),  //para que solo muestre 5 sugerencias
          (err) => this.paisesSugeridos = []
        )
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }

}
