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
  selector: 'ngx-monto-aceptado-crud',
  templateUrl: './monto-aceptado-crud.component.html',
  styleUrls: ['./monto-aceptado-crud.component.scss']
})
export class MontoAceptadoCrudComponent implements OnInit {
  config: ToasterConfig;
  info_experiencia_laboral_id: number;
  organizacion: Organizacion;
  ente_id: number;
  soporte: any;

  ExperienciaLaboralId: number;
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

        console.log("Id param = ", params['ExperienciaLaboralId']);

        this.ExperienciaLaboralId = params['ExperienciaLaboralId'];
        this.id = params['Id']

        console.log(this.ExperienciaLaboralId)

        if (this.ExperienciaLaboralId != null)
          this.http.get('http://localhost:8080/v1/registrar_monto_aceptado_por_cobrar/' + (this.ExperienciaLaboralId).toString(), {
            headers: new HttpHeaders({
              'Accept': 'application/json',
            }),
          }).subscribe(res => {
            if (res != null)
              console.log(res)
          })
      });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  create(actoAdministrativo: string, fechaActo: string, fechaPension: string, fechaResPension: string, cuota: number, monto: number): void {
    let url = 'http://localhost:8080/v1/registrar_monto_aceptado_por_cobrar/' + (this.id != null ? this.id : '')
    console.log(url)

    let data = {
      CuotaAceptadaOrganizacion: Number(cuota),
      ExperienciaLaboralId: Number(this.ExperienciaLaboralId),
      FechaActoAdministrativo: new Date(fechaActo),
      FechaPension: new Date(fechaPension),
      FechaResolucionPension: new Date(fechaResPension),
      TipoActoAdministrativo: actoAdministrativo,
      ValorMesadaPension: Number(monto)
    }

    this.http.post(url, data, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    }).subscribe(res => {
      if (res != null) {
        console.log(res)
        this.router.navigate(['/pages/gestion_informacion/monto_aceptado-list'], { queryParams: { ExperienciaLaboralId: this.ExperienciaLaboralId } })
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
