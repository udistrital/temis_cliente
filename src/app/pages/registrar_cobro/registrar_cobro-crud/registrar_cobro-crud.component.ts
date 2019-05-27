import { EnteService } from './../../../@core/data/ente.service';
import { CampusMidService } from './../../../@core/data/campus_mid.service';
import { Organizacion } from './../../../@core/data/models/organizacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service';
import { Lugar } from '../../../@core/data/models/lugar';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-registrar-cobro-crud',
  templateUrl: './registrar_cobro-crud.component.html',
  styleUrls: ['./registrar_cobro-crud.component.scss']
})
export class RegistrarCobroCrudComponent implements OnInit {

  config: ToasterConfig;
  info_experiencia_laboral_id: number;
  organizacion: Organizacion;
  ente_id: number;
  soporte: any;

  data: any;
  RegistrarMontoAceptadoPorCobrarData: any;

  RegistrarMontoAceptadoPorCobrarId: number;
  id: number;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private organizacionService: OrganizacionService,
    private campusMidService: CampusMidService,
    private ubicacionesService: UbicacionesService,
    private experienciaService: ExperienciaService,
    private documentoService: DocumentoService,
    private nuxeoService: NuxeoService,
    private enteService: EnteService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {
    //this.formInfoExperienciaLaboral = FORM_EXPERIENCIA_LABORAL;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    /*this.loadOptionsTipoOrganizacion();
    this.loadOptionsPais();
    this.loadOptionsCargo();
    this.loadOptionsTipoDedicacion();
    this.loadOptionsTipoVinculacion();*/
  }

  construirForm() {
    // this.formInfoExperienciaLaboral.titulo = this.translate.instant('GLOBAL.experiencia_laboral');
    /*this.formInfoExperienciaLaboral.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formInfoExperienciaLaboral.campos.length; i++) {
      this.formInfoExperienciaLaboral.campos[i].label = this.translate.instant('GLOBAL.' +
        this.formInfoExperienciaLaboral.campos[i].label_i18n);
      this.formInfoExperienciaLaboral.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formInfoExperienciaLaboral.campos[i].label_i18n);
    }*/
    this.route.queryParams
      //.filter(params => params.usuarioId)
      .subscribe(params => {

        console.log("Id param = ", params['RegistrarMontoAceptadoPorCobrarId']);

        this.RegistrarMontoAceptadoPorCobrarId = params['RegistrarMontoAceptadoPorCobrarId'];
        this.id = params['Id']

        console.log(this.RegistrarMontoAceptadoPorCobrarId)

        if (this.id != null)
          this.http.get('http://localhost:8080/v1/registrar_recaudo/' + (this.id).toString(), {
            headers: new HttpHeaders({
              'Accept': 'application/json',
            }),
          }).subscribe(res => {
            if (res != null)
              this.data = res
          })

        if (this.RegistrarMontoAceptadoPorCobrarId != null)
          this.http.get('http://localhost:8080/v1/registrar_monto_aceptado_por_cobrar/' + (this.RegistrarMontoAceptadoPorCobrarId).toString(), {
            headers: new HttpHeaders({
              'Accept': 'application/json',
            }),
          }).subscribe(res => {
            if (res != null)
              this.RegistrarMontoAceptadoPorCobrarData = res
          })
      });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  create(ResolucionOrdenPago: string, FechaResolucionOrdenPago: string, ConsecutivoCuentaCobro: string, FechaDesdePago: string, FechaHastaPago: string,
    ValorCuentaCobro: number, ObservacionesPago: string): void {

    let url = 'http://localhost:8080/v1/registrar_recaudo/' + (this.id != null ? this.id : '')
    console.log(url)

    let data = {
      ResolucionOrdenPago: ResolucionOrdenPago,
      FechaResolucionOrdenPago: new Date(FechaResolucionOrdenPago),
      ConsecutivoCuentaCobro: Number(ConsecutivoCuentaCobro),
      FechaDesdePago: new Date(FechaDesdePago),
      FechaHastaPago: new Date(FechaHastaPago),
      ObservacionesPago: ObservacionesPago,
      ValorCuentaCobro: Number(ValorCuentaCobro),
      RegistrarMontoAceptadoPorCobrarId: this.RegistrarMontoAceptadoPorCobrarData
    }

    this.http.post(url, data, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    }).subscribe(res => {
      if (res != null) {
        console.log(res)
        this.router.navigate(['/pages/registrar_cobro/registrar_cobro-list'], { queryParams: { RegistrarMontoAceptadoPorCobrarId: this.RegistrarMontoAceptadoPorCobrarId } })
      }
    })
  }

  ngOnInit() {
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