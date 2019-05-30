import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { MontoAceptadoCobrarService } from '../../../@core/data/monto_aceptado_cobrar.service';
import { RegistrarCobroService } from '../../../@core/data/registrar_cobro.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../../@core/data/persona.service';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-registrar-cobro-list',
  templateUrl: './registrar_cobro-list.component.html',
  styleUrls: ['./registrar_cobro-list.component.scss']
})
export class RegistrarCobroListComponent implements OnInit {
  config: ToasterConfig;

  data: Array<any>;
  RegistrarMontoAceptadoPorCobrarId: number;
  MontoAceptado: any;
  ExperienciaLaboral: any;
  Usuario: any;
  Organizacion: any;

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private http: HttpClient,
    private experienciaService: ExperienciaService,
    private organizacionService: OrganizacionService,
    private usuarioService: PersonaService,
    private MontoAceptadoCobrarService: MontoAceptadoCobrarService,
    private RegistrarCobroService: RegistrarCobroService,
    private route: ActivatedRoute,
    private router: Router) {

    this.loadData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change...")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.data = <Array<any>>[]

    this.route.queryParams
      .subscribe(params => {

        this.RegistrarMontoAceptadoPorCobrarId = params['RegistrarMontoAceptadoPorCobrarId'];

        if (this.RegistrarMontoAceptadoPorCobrarId != null)
          this.MontoAceptadoCobrarService.get((this.RegistrarMontoAceptadoPorCobrarId).toString()).subscribe(res => {
            this.MontoAceptado = res;

            this.experienciaService.get((this.MontoAceptado.ExperienciaLaboralId).toString()).subscribe(res => {
              this.ExperienciaLaboral = res;

              this.organizacionService.get((this.ExperienciaLaboral.EntidadId).toString()).subscribe(res => {
                this.Organizacion = res
              })

              this.usuarioService.get((this.ExperienciaLaboral.UsuarioId).toString()).subscribe(res => {
                this.Usuario = res
              })
            })
          })

        this.RegistrarCobroService.get('?query=RegistrarMontoAceptadoPorCobrarId:' + (this.RegistrarMontoAceptadoPorCobrarId).toString())
          .subscribe(res => {
            this.data = <Array<any>>res
          })

      });
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/pages/gestion_informacion/monto_aceptado-list'], { queryParams: { ExperienciaLaboralId: 1 } })
  }

  onCreate() {
    this.router.navigate(['/pages/registrar_cobro/registrar_cobro-crud'], { queryParams: { RegistrarMontoAceptadoPorCobrarId: this.RegistrarMontoAceptadoPorCobrarId } })
  }

  onEdit(id) {
    this.router.navigate(['/pages/registrar_cobro/registrar_cobro-crud'], { queryParams: { RegistrarMontoAceptadoPorCobrarId: this.RegistrarMontoAceptadoPorCobrarId, Id: id } })
  }

  onDelete(id): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.eliminar'),
      text: this.translate.instant('GLOBAL.eliminar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.http.delete('http://localhost:8080/v1/registrar_recaudo/' + (id).toString(), {
            headers: new HttpHeaders({
              'Accept': 'application/json',
            }),
          }).subscribe(res => {
            console.log(res);

            if (res !== null) {
              this.loadData();
              this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
                this.translate.instant('GLOBAL.experiencia_laboral') + ' ' +
                this.translate.instant('GLOBAL.confirmarEliminar'));
            }
          }, (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          })

          /*this.experienciaService.delete('experiencia_laboral', event.data).subscribe(res => {
            if (res !== null) {
              this.loadData();
              this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
                this.translate.instant('GLOBAL.experiencia_laboral') + ' ' +
                this.translate.instant('GLOBAL.confirmarEliminar'));
            }
          }, (error: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error.status + '',
              text: this.translate.instant('ERROR.' + error.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });*/
        }
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
