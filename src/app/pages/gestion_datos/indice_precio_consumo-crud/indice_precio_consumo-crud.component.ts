import { EnteService } from './../../../@core/data/ente.service';
import { CampusMidService } from './../../../@core/data/campus_mid.service';
import { Organizacion } from './../../../@core/data/models/organizacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service';
import { Lugar } from '../../../@core/data/models/lugar';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IpcModel } from '../../../@core/data/models/ipc';
import { formatDate } from '@angular/common';
import { IpcService } from '../../../@core/data/ipc.service';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-indice-precio-consumo-crud',
  templateUrl: './indice_precio_consumo-crud.component.html',
  styleUrls: ['./indice_precio_consumo-crud.component.scss']
})
export class IndicePrecioConsumoCrudComponent implements OnInit {
  config: ToasterConfig;
  ipc = new IpcModel;
  id: string;

  AnoVigencia: string;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private IpcService: IpcService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change....")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  save() {
    if (!this.validate_form()) {
      this.showToast('error', this.translate.instant('GLOBAL.guardar'),
        'Complete los campos correctamente.');
      return
    }

    if (this.AnoVigencia)
      this.ipc.AnoVigencia = new Date(this.AnoVigencia.concat('T10:00:00-05:00'))

    if (this.id)
      this.IpcService.put('', this.ipc).subscribe(res => {
        this.goBack()
      })
    else
      this.IpcService.post('', this.ipc).subscribe(res => {
        this.goBack()
      })
  }

  validate_form() {
    return true
  }

  goBack(): void {
    this.router.navigate(['/pages/gestion_datos/indice_precio_consumo-list'])
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id");

      if (this.id != null && this.id != 'new')
        this.IpcService.get((this.id).toString()).subscribe(res => {
          this.ipc = <IpcModel>res

          if (this.ipc.AnoVigencia) {
            this.AnoVigencia = new Date(this.ipc.AnoVigencia).toISOString().split('T')[0];
          }
        })
    });
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
