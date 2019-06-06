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
import { DtfModel } from '../../../@core/data/models/dtf';
import { NbRoleProvider, NbAccessChecker } from '@nebular/security';
import { DtfService } from '../../../@core/data/dtf.service';
import { formatDate } from '@angular/common';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'dtf-crud',
  templateUrl: './dtf-crud.component.html',
  styleUrls: ['./dtf-crud.component.scss']
})
export class DtfCrudComponent implements OnInit {
  config: ToasterConfig;
  dtf = new DtfModel;
  id: string;

  FechaNorma: string;
  FechaInicioVigencia: string;
  FechaFinalizacionVigencia: string;

  create: boolean;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private DtfService: DtfService,
    private roleProvider: NbRoleProvider,
    private accessChecker: NbAccessChecker) {


    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change....")
    });
  }

  get_access_rights() {
    let roles

    this.roleProvider.getRole().subscribe(res => {
      roles = res
    })

    this.accessChecker.isGranted('create', roles).subscribe(res => {
      this.create = res
    })
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

    if (this.FechaNorma)
      this.dtf.FechaNorma = new Date(this.FechaNorma.concat('T10:00:00-05:00'))

    if (this.FechaInicioVigencia)
      this.dtf.FechaInicioVigencia = new Date(this.FechaInicioVigencia.concat('T10:00:00-05:00'))

    if (this.FechaFinalizacionVigencia)
      this.dtf.FechaFinalizacionVigencia = new Date(this.FechaFinalizacionVigencia.concat('T10:00:00-05:00'))

    if (this.id && this.id != 'new')
      this.DtfService.put('', this.dtf).subscribe(res => {
        this.goBack()
      })
    else
      this.DtfService.post('', this.dtf).subscribe(res => {
        this.goBack()
      })
  }

  validate_form() {
    return true
  }

  goBack(): void {
    this.router.navigate(['/pages/gestion_datos/dtf-list'])
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id");

      if (this.id != null && this.id != 'new')
        this.DtfService.get((this.id).toString()).subscribe(res => {
          this.dtf = <DtfModel>res

          if (this.dtf.FechaNorma) {
            this.FechaNorma = new Date(this.dtf.FechaNorma).toISOString().split('T')[0];
          }

          if (this.dtf.FechaInicioVigencia) {
            let aux = new Date(this.dtf.FechaInicioVigencia)
            this.FechaInicioVigencia = new Date(this.dtf.FechaNorma).toISOString().split('T')[0];
          }

          if (this.dtf.FechaFinalizacionVigencia) {
            let aux = new Date(this.dtf.FechaFinalizacionVigencia)
            this.FechaFinalizacionVigencia = new Date(this.dtf.FechaNorma).toISOString().split('T')[0];
          }
        })
    });
  }

  keyPress(ev) {
    console.log(ev);
    return false;
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
