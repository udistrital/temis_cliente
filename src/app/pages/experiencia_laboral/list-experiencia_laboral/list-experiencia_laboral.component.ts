import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-experiencia-laboral',
  templateUrl: './list-experiencia_laboral.component.html',
  styleUrls: ['./list-experiencia_laboral.component.scss'],
})
export class ListExperienciaLaboralComponent implements OnInit {
  config: ToasterConfig;
  data: Array<any>;
  id: string;
  user: any;
  entities: Array<any>;

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private http: HttpClient,
    private experienciaService: ExperienciaService,
    private userService: PersonaService,
    private organizacionService: OrganizacionService,
    private route: ActivatedRoute,
    private router: Router) {

    this.loadData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language change...")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("usuarioId");

      if (this.id != null) {
        this.userService.get((this.id).toString()).subscribe(res => {
          this.user = res;
        })

        this.organizacionService.get('').subscribe(res => {
          this.entities = <Array<any>>res;
        })

        this.experienciaService.get('?query=UsuarioId:' + (this.id).toString()).subscribe(res => {
          this.data = <Array<any>>res;
        })
      }

    });
  }

  ngOnInit() {
  }

  getEntity(id) {
    for (let i = 0; i < this.entities.length; i++)
      if (this.entities[i].Id == id)
        return this.entities[i]

    return {}
  }

  goBack() {
    this.router.navigate(['/pages/gestion_informacion/pensionado-list'])
  }

  onCreate() {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-crud/' + (this.id).toString() + '/new'])
  }

  onEdit(id) {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-crud/' + (this.id).toString() + '/' + id])
  }

  onCobro(id) {
    this.router.navigate(['/pages/gestion_informacion/monto_aceptado-list/' + (id).toString()])
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
          this.userService.delete('', id).subscribe(res => {
            if (res !== null) {
              this.loadData();
              this.showToast('info', this.translate.instant('GLOBAL.eliminar'),
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
