import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(vieneDelHijo:string){
    this.hayError = false;
    this.termino = vieneDelHijo;

    this.paisService.buscarCapital(this.termino)
    .subscribe( (pais) => {

      this.paises = pais;
      
      console.log(pais);

    }, /*Esta es una manera de controlar el error.. la otra es en el servicio mediante los operadores rxjs*/ 
    (err) => {
      this.paises = [];
      this.hayError = true;
    });
  }
}
