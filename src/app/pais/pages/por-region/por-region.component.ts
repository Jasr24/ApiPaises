import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles:[`
    button {
      margin-right: 5px
    }
  `
  ]
})
export class PorRegionComponent {

  // 'EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU' , 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'

  //regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU' , 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string ="";
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  getClaseCss(region: string): string{
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion(region: string){

    if(region === this.regionActiva){return} //para que no se recargue, esto es solo para hacer mas rapido la aplicacion, si lo quitamos funciona de todas maneras

    this.regionActiva = region;
    this.paises = []; //esto es solo para hacer mas rapido la aplicacion, si lo quitamos funciona de todas maneras

    this.paisService.buscarPorRegion(region)
      .subscribe((paises) => {
        this.paises = paises;
      })
  }

}
