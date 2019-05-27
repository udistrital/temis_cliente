import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-monto-aceptado-list',
  templateUrl: './monto-aceptado-list.component.html',
  styleUrls: ['./monto-aceptado-list.component.scss']
})
export class MontoAceptadoListComponent implements OnInit {
  uid: number;
  eid: number;
  showTable: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: Array<any>;
  crud = false;
  ExperienciaLaboralId: number;

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private http: HttpClient,
    private experienciaService: ExperienciaService,
    private organizacionService: OrganizacionService,
    private route: ActivatedRoute,
    private router: Router) {
    this.loadData();
    //this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      //this.cargarCampos();
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    /*this.experienciaService.get('experiencia_laboral/?query=Persona:' + this.eid).subscribe(res => {
     if (res !== null) {
       this.data = <Array<any>>res;
       this.data.forEach(element => {
         this.organizacionService.get('organizacion/?query=Ente:' + element.Organizacion).subscribe(r => {
           if (res !== null) {
             element.Organizacion = r[0];
           }
           this.source.load(this.data);
         },
         (error: HttpErrorResponse) => {
           Swal({
             type: 'error',
             title: error.status + '',
             text: this.translate.instant('ERROR.' + error.status),
             confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
           });
         });
       });
     }
   },
   (error: HttpErrorResponse) => {
     Swal({
       type: 'error',
       title: error.status + '',
       text: this.translate.instant('ERROR.' + error.status),
       confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
     });
   });*/

    console.log("loadData??")
    this.data = <Array<any>>[]

    this.route.queryParams
      //.filter(params => params.usuarioId)
      .subscribe(params => {

        console.log("Id param = ", params['ExperienciaLaboralId']);

        this.ExperienciaLaboralId = params['ExperienciaLaboralId'];

        console.log(this.ExperienciaLaboralId)

        if (this.ExperienciaLaboralId != null)
          this.http.get('http://localhost:8080/v1/registrar_monto_aceptado_por_cobrar/?query=ExperienciaLaboralId:' + (this.ExperienciaLaboralId).toString(), {
            headers: new HttpHeaders({
              'Accept': 'application/json',
            }),
          }).subscribe(res => {
            console.log(res);

            if (res) {
              this.data = <Array<any>>res
              //this.source.load(this.data);
            }
          })

      });
  }

  ngOnInit() {
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
          console.log("Eliminar")

          this.http.delete('http://localhost:8080/v1/registrar_monto_aceptado_por_cobrar/' + (id).toString(), {
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
