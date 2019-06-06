import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MontoAceptadoModel } from '../../../@core/data/models/monto_aceptado';
import { MontoAceptadoCobrarService } from '../../../@core/data/monto_aceptado_cobrar.service';
import { NbRoleProvider, NbAccessChecker } from '@nebular/security';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-monto-aceptado-crud',
  templateUrl: './monto-aceptado-crud.component.html',
  styleUrls: ['./monto-aceptado-crud.component.scss']
})
export class MontoAceptadoCrudComponent implements OnInit {
  config: ToasterConfig;

  MontoAceptado = new MontoAceptadoModel;
  ExperienciaLaboralId: string;
  id: string;

  FechaActoAdministrativo: string;
  FechaPension: string;
  FechaResolucionPension: string;

  create: boolean;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private MontoAceptadoService: MontoAceptadoCobrarService,
    private roleProvider: NbRoleProvider,
    private accessChecker: NbAccessChecker) {

    this.get_access_rights()
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change...")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
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

  save(): void {
    if (!this.validate_form()) {
      this.showToast('error', this.translate.instant('GLOBAL.guardar'),
        'Complete los campos correctamente.');
      return
    }

    this.MontoAceptado.ExperienciaLaboralId = Number(this.MontoAceptado.ExperienciaLaboralId);

    if (this.FechaActoAdministrativo)
      this.MontoAceptado.FechaActoAdministrativo = new Date(this.FechaActoAdministrativo.concat('T10:00:00-05:00'))

    if (this.FechaResolucionPension)
      this.MontoAceptado.FechaResolucionPension = new Date(this.FechaResolucionPension.concat('T10:00:00-05:00'))

    if (this.FechaPension)
      this.MontoAceptado.FechaPension = new Date(this.FechaPension.concat('T10:00:00-05:00'))

    if (this.id && this.id != 'new')
      this.MontoAceptadoService.put('', this.MontoAceptado).subscribe(res => {
        this.goBack()
      })
    else
      this.MontoAceptadoService.post('', this.MontoAceptado).subscribe(res => {
        this.goBack()
      })
  }

  validate_form() {
    return true;
  }

  goBack(): void {
    this.router.navigate(['/pages/gestion_informacion/monto_aceptado-list/' + this.ExperienciaLaboralId])
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id");
      this.ExperienciaLaboralId = params.get('IdExperienciaLaboral')

      this.MontoAceptado.ExperienciaLaboralId = parseInt(this.ExperienciaLaboralId)

      if (this.id != null && this.id != 'new')
        this.MontoAceptadoService.get((this.id).toString()).subscribe(res => {
          this.MontoAceptado = <MontoAceptadoModel>res
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
