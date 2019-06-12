import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NbRoleProvider, NbAccessChecker } from '@nebular/security';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { CargoService } from '../../../@core/data/cargo.service';
import { TipoDedicacionService } from '../../../@core/data/tipo_dedicacion.service';
import { TipoVinculacionService } from '../../../@core/data/tipo_vinculacion.service';
import { Organizacion } from '../../../@core/data/models/organizacion';
import { CargoModel } from '../../../@core/data/models/cargo';
import { TipoDedicacionModel } from '../../../@core/data/models/tipo_dedicacion';
import { TipoVinculacion } from '../../../@core/data/models/tipo_vinculacion';

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

  organizaciones: Array<any>;
  cargos: Array<any>;
  tipo_dedicacion: Array<any>;
  tipo_vinculacion: Array<any>;

  create: boolean;
  view: boolean;
  delete: boolean;
  edit: boolean;

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private http: HttpClient,
    private experienciaService: ExperienciaService,
    private personaService: PersonaService,
    private organizacionService: OrganizacionService,
    private route: ActivatedRoute,
    private router: Router,
    private roleProvider: NbRoleProvider,
    private accessChecker: NbAccessChecker,
    private cargoService: CargoService,
    private tipoDedicacionService: TipoDedicacionService,
    private tipoVinculacionService: TipoVinculacionService) {

    this.get_access_rights()

    this.loadData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language change...")
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

  loadData(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("usuarioId");

      if (this.id != null) {
        this.personaService.get((this.id).toString()).subscribe(res => {
          this.user = res;
        })

        this.experienciaService.get('?query=Persona:' + (this.id).toString()).subscribe(res => {
          this.data = <Array<any>>res;
        })
      }

    });
  }

  ngOnInit() {
    this.organizacionService.get('').subscribe(res => {
      this.organizaciones = <Array<any>>res;
    })

    this.cargoService.get('').subscribe(res => {
      this.cargos = <Array<any>>res;
    })

    this.tipoDedicacionService.get('').subscribe(res => {
      this.tipo_dedicacion = <Array<any>>res;
    })

    this.tipoVinculacionService.get('').subscribe(res => {
      this.tipo_vinculacion = <Array<any>>res;
    })
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
    console.log(id)
    
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
          this.experienciaService.delete('', id).subscribe(res => {
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

  get_organizacion(id) {
    if (this.organizaciones)
      for (let i = 0; i < this.organizaciones.length; i++)
        if (this.organizaciones[i].Id == id)
          return this.organizaciones[i];

    return new Organizacion;
  }

  get_cargo(id) {
    if (this.cargos)
      for (let i = 0; i < this.cargos.length; i++)
        if (this.cargos[i].Id == id)
          return this.cargos[i];

    return new CargoModel;
  }

  get_dedicacion(id) {
    if (this.tipo_dedicacion)
      for (let i = 0; i < this.tipo_dedicacion.length; i++)
        if (this.tipo_dedicacion[i].Id == id)
          return this.tipo_dedicacion[i];

    return new TipoDedicacionModel;
  }

  get_vinculacion(id) {
    if (this.tipo_vinculacion)
      for (let i = 0; i < this.tipo_vinculacion.length; i++)
        if (this.tipo_vinculacion[i].Id == id)
          return this.tipo_vinculacion[i];

    return new TipoVinculacion;
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
