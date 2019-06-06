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
import { SalarioMinimoLegalModel } from '../../../@core/data/models/salario_minimo_legal';
import { SalarioMinimoService } from '../../../@core/data/salario_minimo.service';
import { formatDate } from '@angular/common';
import { NbRoleProvider, NbAccessChecker } from '@nebular/security';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-salario-minimo-legal-crud',
  templateUrl: './salario_minimo_legal-crud.component.html',
  styleUrls: ['./salario_minimo_legal-crud.component.scss']
})
export class SalarioMinimoLegalCrudComponent implements OnInit {
  config: ToasterConfig;
  sml = new SalarioMinimoLegalModel;
  id: string;

  FechaInicioVigencia: string;
  FechaFinalizacionVigencia: string;

  create: boolean;
  view: boolean;
  delete: boolean;
  edit: boolean;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private SalarioMinimoService: SalarioMinimoService,
    private roleProvider: NbRoleProvider,
    private accessChecker: NbAccessChecker) {

    this.get_access_rights()
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

    this.accessChecker.isGranted('view', roles).subscribe(res => {
      this.view = res
    })

    this.accessChecker.isGranted('edit', roles).subscribe(res => {
      this.edit = res
    })

    this.accessChecker.isGranted('delete', roles).subscribe(res => {
      this.delete = res
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

    if (this.FechaInicioVigencia)
      this.sml.FechaInicioVigencia = new Date(this.FechaInicioVigencia.concat('T10:00:00-05:00'))

    if (this.FechaFinalizacionVigencia)
      this.sml.FechaFinalizacionVigencia = new Date(this.FechaFinalizacionVigencia.concat('T10:00:00-05:00'))

    if (this.id && this.id != 'new')
      this.SalarioMinimoService.put('', this.sml).subscribe(res => {
        this.goBack()
      })
    else
      this.SalarioMinimoService.post('', this.sml).subscribe(res => {
        this.goBack()
      })
  }

  validate_form() {
    return true
  }

  goBack(): void {
    this.router.navigate(['/pages/gestion_datos/salario_minimo_legal-list'])
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id");

      if (this.id != null && this.id != 'new')
        this.SalarioMinimoService.get((this.id).toString()).subscribe(res => {
          this.sml = <SalarioMinimoLegalModel>res

          if (this.sml.FechaInicioVigencia) {
            let aux = new Date(this.sml.FechaInicioVigencia)
            this.FechaInicioVigencia = new Date(this.sml.FechaInicioVigencia).toISOString().split('T')[0];
          }

          if (this.sml.FechaFinalizacionVigencia) {
            let aux = new Date(this.sml.FechaFinalizacionVigencia)
            this.FechaFinalizacionVigencia = new Date(this.sml.FechaFinalizacionVigencia).toISOString().split('T')[0];
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
