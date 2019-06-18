import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { TipoOrganizacionService } from '../../../@core/data/tipo_organizacion.service';
import { EnteService } from '../../../@core/data/ente.service';
import { IdentificacionService } from '../../../@core/data/identificacion.service';

@Component({
  selector: 'organizacion-list',
  templateUrl: './organizacion-list.component.html',
  styleUrls: ['./organizacion-list.component.scss']
})
export class OrganizacionListComponent implements OnInit {
  data: Array<any>;
  tipo_organizacion: Array<any>;

  constructor(private translate: TranslateService,
    private organizacionService: OrganizacionService,
    private tipoOrganizacionService: TipoOrganizacionService,
    private enteService: EnteService,
    private identificacionService: IdentificacionService) {

    this.loadData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change...")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.organizacionService.get('').subscribe(res => {
      this.data = <Array<any>>res

      if (this.data && this.data.length)
        this.data.forEach(org => {
          this.enteService.get(org.Ente).subscribe(en_res => {
            org.EnteData = en_res
          })

          this.identificacionService.get('?query=Ente:' + (org.Ente).toString()).subscribe(id_res => {
            org.IdentificacionData = id_res
          })
        })
    })

    this.tipoOrganizacionService.get('').subscribe(res => {
      this.tipo_organizacion = <Array<any>>res
    })
  }

  test() {
    console.log(this.data)
    console.log(this.tipo_organizacion)
  }

  getTipoOrganizacion(id) {
    if (this.tipo_organizacion)
      for (var i = 0; i < this.tipo_organizacion.length; i++)
        if (this.tipo_organizacion[i].Id == id)
          return this.tipo_organizacion[i]

    return
  }

  ngOnInit() {
  }
}
