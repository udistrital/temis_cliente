import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router"

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { EnteService } from '../../../@core/data/ente.service';
import { IdentificacionService } from '../../../@core/data/identificacion.service';
import { TipoIdentificacionService } from '../../../@core/data/tipo_identificacion.service';

@Component({
  selector: 'pensionado-list',
  templateUrl: './pensionado-list.component.html',
  styleUrls: ['./pensionado-list.component.scss']
})
export class PensionadoListComponent implements OnInit {
  config: ToasterConfig;
  data = <Array<any>>[];
  tipo_identificacion = <Array<any>>[];

  constructor(private translate: TranslateService,
    private http: HttpClient,
    private userService: PersonaService,
    private router: Router,
    private toasterService: ToasterService,
    private enteService: EnteService,
    private identificacionService: IdentificacionService,
    private tipoIdentificacionService: TipoIdentificacionService) {

    this.loadData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language change...")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.userService.get('').subscribe(res => {
      this.data = <Array<any>>res;

      if (this.data)
        this.data.forEach(aux => {
          this.identificacionService.get('?query=Ente:' + (aux.Ente).toString()).subscribe(id_aux => {
            aux.IdentificacionData = id_aux;
          })
        })
    })

    this.tipoIdentificacionService.get('').subscribe(res => {
      this.tipo_identificacion = <Array<any>>res;
    })
  }

  test() {
    console.log(this.tipo_identificacion)
    console.log(this.data)
  }

  getTipoIdentifacion(id) {
    if (this.tipo_identificacion)
      for (let i = 0; i < this.tipo_identificacion.length; i++)
        if (this.tipo_identificacion[i].Id == id)
          return this.tipo_identificacion[i];

    return
  }

  ngOnInit() {
  }

  goExperienceHistory(id): void {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-list/' + (id).toString()])
  }
}
