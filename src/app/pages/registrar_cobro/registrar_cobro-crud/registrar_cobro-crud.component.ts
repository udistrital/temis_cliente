import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrarCobroModel } from '../../../@core/data/models/registrar_cobro';
import { MontoAceptadoModel } from '../../../@core/data/models/monto_aceptado';
import { MontoAceptadoCobrarService } from '../../../@core/data/monto_aceptado_cobrar.service';
import { RegistrarCobroService } from '../../../@core/data/registrar_cobro.service';
import { NbRoleProvider, NbAccessChecker } from '@nebular/security';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-registrar-cobro-crud',
  templateUrl: './registrar_cobro-crud.component.html',
  styleUrls: ['./registrar_cobro-crud.component.scss']
})
export class RegistrarCobroCrudComponent implements OnInit {
  config: ToasterConfig;

  FechaDesdePago: string;
  FechaHastaPago: string;
  FechaResolucionOrdenPago: string;

  RegistrarMontoAceptadoPorCobrarData = new RegistrarCobroModel;
  MontoAceptado = new MontoAceptadoModel
  RegistrarMontoAceptadoPorCobrarId: string;
  id: string;

  create: boolean;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private MontoService: MontoAceptadoCobrarService,
    private RegistrarCobroService: RegistrarCobroService,
    private router: Router,
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

  save() {
    if (!this.validate_form()) {
      this.showToast('error', this.translate.instant('GLOBAL.guardar'),
        'Complete los campos correctamente.');
      return
    }

    if (this.FechaResolucionOrdenPago)
      this.RegistrarMontoAceptadoPorCobrarData.FechaResolucionOrdenPago = new Date(this.FechaResolucionOrdenPago.concat('T10:00:00-05:00'))

    if (this.FechaHastaPago)
      this.RegistrarMontoAceptadoPorCobrarData.FechaHastaPago = new Date(this.FechaHastaPago.concat('T10:00:00-05:00'))

    if (this.FechaDesdePago)
      this.RegistrarMontoAceptadoPorCobrarData.FechaDesdePago = new Date(this.FechaDesdePago.concat('T10:00:00-05:00'))

    if (this.id && this.id != 'new')
      this.RegistrarCobroService.put('', this.RegistrarMontoAceptadoPorCobrarData).subscribe(res => {
        this.goBack()
      })
    else
      this.RegistrarCobroService.post('', this.RegistrarMontoAceptadoPorCobrarData).subscribe(res => {
        this.goBack()
      })
  }

  validate_form() {
    return true
  }

  goBack(): void {
    this.router.navigate(['/pages/registrar_cobro/registrar_cobro-list/' + this.RegistrarMontoAceptadoPorCobrarId])
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.RegistrarMontoAceptadoPorCobrarId = params.get('RegistrarMontoAceptadoPorCobrarId');
      this.id = params.get('Id');

      console.log(this.RegistrarMontoAceptadoPorCobrarId)

      this.MontoService.get((this.RegistrarMontoAceptadoPorCobrarId).toString()).subscribe(res => {
        this.MontoAceptado = <MontoAceptadoModel>res;
        this.RegistrarMontoAceptadoPorCobrarData.RegistrarMontoAceptadoPorCobrarId = this.MontoAceptado;
      })

      if (this.id != null && this.id != 'new')
        this.RegistrarCobroService.get((this.id).toString()).subscribe(res => {
          this.RegistrarMontoAceptadoPorCobrarData = <RegistrarCobroModel>res;
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