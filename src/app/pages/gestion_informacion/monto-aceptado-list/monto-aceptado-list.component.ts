import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { MontoAceptadoCobrarService } from '../../../@core/data/monto_aceptado_cobrar.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-monto-aceptado-list',
  templateUrl: './monto-aceptado-list.component.html',
  styleUrls: ['./monto-aceptado-list.component.scss']
})
export class MontoAceptadoListComponent implements OnInit {
  config: ToasterConfig;
  
  ExperienciaLaboralId: number;
  UsuarioId: number;

  data: Array<any>;
  ExperienciaLaboral: any;
  Organizacion: any;
  Usuario: any;

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private http: HttpClient,
    private experienciaService: ExperienciaService,
    private organizacionService: OrganizacionService,
    private montoAceptadoService: MontoAceptadoCobrarService,
    private usuarioService: PersonaService,
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
        this.ExperienciaLaboralId = params['ExperienciaLaboralId'];
        
        if (this.ExperienciaLaboralId != null) {
          this.experienciaService.get((this.ExperienciaLaboralId).toString()).subscribe(res => {
            this.ExperienciaLaboral = res

            this.organizacionService.get((this.ExperienciaLaboral.EntidadId).toString()).subscribe(res => {
              this.Organizacion = res
            })

            this.usuarioService.get((this.ExperienciaLaboral.UsuarioId).toString()).subscribe(res => {
              this.Usuario = res
            })
          })

          this.montoAceptadoService.get('?query=ExperienciaLaboralId:' + (this.ExperienciaLaboralId).toString()).subscribe(res => {
            this.data = <Array<any>>res
          })
        }

      });
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-list'], { queryParams: { usuarioId: this.ExperienciaLaboral.UsuarioId } })
  }

  onCreate() {
    this.router.navigate(['/pages/gestion_informacion/monto_aceptado-crud'], { queryParams: { ExperienciaLaboralId: this.ExperienciaLaboralId } })
  }

  onEdit(id) {
    this.router.navigate(['/pages/gestion_informacion/monto_aceptado-crud'], { queryParams: { ExperienciaLaboralId: this.ExperienciaLaboralId, Id: id } })
  }

  onRegistrarCobro(id) {
    this.router.navigate(['/pages/registrar_cobro/registrar_cobro-list'], { queryParams: { RegistrarMontoAceptadoPorCobrarId: id } })
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
          this.http.delete('http://localhost:8080/v1/registrar_monto_aceptado_por_cobrar/' + (id).toString(), {
            headers: new HttpHeaders({
              'Accept': 'application/json',
            }),
          }).subscribe(res => {
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
