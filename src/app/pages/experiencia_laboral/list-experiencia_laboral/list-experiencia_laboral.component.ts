import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-list-experiencia-laboral',
  templateUrl: './list-experiencia_laboral.component.html',
  styleUrls: ['./list-experiencia_laboral.component.scss'],
})
export class ListExperienciaLaboralComponent implements OnInit {
  uid: number;
  eid: number;
  showTable: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data: Array<any>;
  crud = false;
  id: number;

  @Input('ente_id')
  set name(ente_id: number) {
    this.eid = ente_id;
    this.loadData();
  }

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

  cargarCampos() {
    this.settings = {
      /*add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },*/
      mode: 'external',
      columns: {
        Id: {
          title: 'Id',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        EntidadId: {
          title: 'Organización',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        FechaIngreso: {
          title: this.translate.instant('GLOBAL.fecha_inicio'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        FechaRetiro: {
          title: this.translate.instant('GLOBAL.fecha_fin'),
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        HorasLaboradasDia: {
          title: "Horas laboradas",
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        DiasLaboradosSemana: {
          title: "Días laborados",
          valuePrepareFunction: (value) => {
            return value;
          },
        }
      },
      hideSubHeader: true,
      actions: {
        columnTitle: "Acciones",
        add: false,
        position: 'right'
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
    };
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

    this.route.queryParams
      //.filter(params => params.usuarioId)
      .subscribe(params => {

        console.log("Id param = ", params['usuarioId']);

        this.id = params['usuarioId'];

        console.log(this.id)

        if (this.id != null)
          this.http.get('http://localhost:8080/v1/experiencia_laboral/?query=UsuarioId:' + (this.id).toString(), {
            headers: new HttpHeaders({
              'Accept': 'application/json',
            }),
          }).subscribe(res => {
            console.log(res);

            if (res) {
              this.data = <Array<any>>res
              this.source.load(this.data);
            }
          })

      });
  }

  ngOnInit() {
  }

  onCreate() {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-crud'], { queryParams: { usuarioId: this.id } })
  }

  onEdit(id) {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-crud'], { queryParams: { usuarioId: this.id, Id: id } })
  }

  onCobro(id) {
    this.router.navigate(['/pages/gestion_informacion/monto_aceptado-list'], { queryParams: { ExperienciaLaboralId: id } })
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

          this.http.delete('http://localhost:8080/v1/experiencia_laboral/' + (id).toString(), {
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
