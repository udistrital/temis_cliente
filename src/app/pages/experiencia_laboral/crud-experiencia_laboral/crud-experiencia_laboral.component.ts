import { Organizacion } from './../../../@core/data/models/organizacion';
import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienciaLaboralModel } from '../../../@core/data/models/experiencia_laboral';
import { DatoAdicionalExperienciaLaboral } from '../../../@core/data/models/dato_adicional_experiencia_laboral';
import { NbRoleProvider, NbAccessChecker } from '@nebular/security';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { PersonaService } from '../../../@core/data/persona.service';
import { Persona } from '../../../@core/data/models/persona';
import { CargoService } from '../../../@core/data/cargo.service';
import { CargoModel } from '../../../@core/data/models/cargo';
import { TipoDedicacionService } from '../../../@core/data/tipo_dedicacion.service';
import { TipoDedicacionModel } from '../../../@core/data/models/tipo_dedicacion';
import { TipoVinculacion } from '../../../@core/data/models/tipo_vinculacion';
import { DatoAdicionalExperienciaLaboralService } from '../../../@core/data/dato_adicional_experiencia_laboral.service';
import { TipoVinculacionService } from '../../../@core/data/tipo_vinculacion.service';

@Component({
  selector: 'ngx-crud-experiencia-laboral',
  templateUrl: './crud-experiencia_laboral.component.html',
  styleUrls: ['./crud-experiencia_laboral.component.scss'],
})
export class CrudExperienciaLaboralComponent implements OnInit {
  config: ToasterConfig;
  organizacion: Organizacion;

  id: string;
  usuarioId: string;
  persona = new Persona;
  experienciaLaboral = new ExperienciaLaboralModel;
  horasDiaras = new DatoAdicionalExperienciaLaboral;
  horasSemanales = new DatoAdicionalExperienciaLaboral;

  organizaciones: Array<any>;
  cargos: Array<any>;
  dedicaciones: Array<any>;
  tipo_vinculacion: Array<any>;

  FechaIngreso: string;
  FechaRetiro: string;
  Cargo: number;
  Vinculacion: number;
  Dedicacion: number;

  create: boolean;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private organizacionService: OrganizacionService,
    private ExperienciaService: ExperienciaService,
    private route: ActivatedRoute,
    private router: Router,
    private roleProvider: NbRoleProvider,
    private accessChecker: NbAccessChecker,
    private personaService: PersonaService,
    private cargoService: CargoService,
    private tipoDedicacionService: TipoDedicacionService,
    private datoAdicionalService: DatoAdicionalExperienciaLaboralService,
    private tipoVinculacionService: TipoVinculacionService) {

    this.get_access_rights()

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change...")
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
    if (this.dedicaciones)
      for (let i = 0; i < this.dedicaciones.length; i++)
        if (this.dedicaciones[i].Id == id)
          return this.dedicaciones[i];

    return new TipoDedicacionModel;
  }

  get_vinculacion(id) {
    if (this.tipo_vinculacion)
      for (let i = 0; i < this.tipo_vinculacion.length; i++)
        if (this.tipo_vinculacion[i].Id == id)
          return this.tipo_vinculacion[i];

    return new TipoVinculacion;
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  save() {
    if (!this.validate_form()) {
      this.showToast('error', this.translate.instant('GLOBAL.guardar'),
        'Complete los campos correctamente.');
      return
    }

    this.experienciaLaboral.Organizacion = Number(this.experienciaLaboral.Organizacion);
    this.experienciaLaboral.Cargo = this.get_cargo(this.Cargo);
    this.experienciaLaboral.TipoDedicacion = this.get_dedicacion(this.Dedicacion);
    this.experienciaLaboral.TipoVinculacion = this.get_vinculacion(this.Vinculacion);

    if (this.FechaIngreso)
      this.experienciaLaboral.FechaInicio = new Date(this.FechaIngreso.concat('T10:00:00-05:00'))

    if (this.FechaRetiro)
      this.experienciaLaboral.FechaFinalizacion = new Date(this.FechaRetiro.concat('T10:00:00-05:00'))

    if (this.id && this.id != 'new')
      this.ExperienciaService.put('', this.experienciaLaboral).subscribe(res => {
        this.goBack()
      })
    else
      this.ExperienciaService.post('', this.experienciaLaboral).subscribe(res => {
        this.goBack()
      })
  }

  validate_form() {
    return true
  }

  goBack(): void {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-list/' + (this.usuarioId).toString()])
  }

  ngOnInit() {
    this.organizacionService.get('').subscribe(res => {
      this.organizaciones = <Array<any>>res;
    })

    this.cargoService.get('').subscribe(res => {
      this.cargos = <Array<any>>res;
    })

    this.tipoDedicacionService.get('').subscribe(res => {
      this.dedicaciones = <Array<any>>res;
    })

    this.tipoVinculacionService.get('').subscribe(res => {
      this.tipo_vinculacion = <Array<any>>res;
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id");
      this.usuarioId = params.get('usuarioId')

      if (this.usuarioId)
        this.experienciaLaboral.Persona = Number(this.usuarioId);

        /*this.personaService.get(this.usuarioId).subscribe(res => {
          this.experienciaLaboral.Persona = <Persona>res;
        })*/

      if (this.id != null && this.id != 'new')
        this.ExperienciaService.get((this.id).toString()).subscribe(res => {
          this.experienciaLaboral = <ExperienciaLaboralModel>res

          this.Dedicacion = this.experienciaLaboral.TipoDedicacion.Id;
          this.Vinculacion = this.experienciaLaboral.TipoVinculacion.Id;
          this.Cargo = this.experienciaLaboral.Cargo.Id;

          this.datoAdicionalService.get('?query=ExperienciaLaboral:' + (this.id).toString()).subscribe(res => {
            console.log(res);
          })

          if (this.experienciaLaboral.FechaInicio)
            this.FechaIngreso = new Date(this.experienciaLaboral.FechaInicio).toISOString().split('T')[0];

          if (this.experienciaLaboral.FechaFinalizacion)
            this.FechaRetiro = new Date(this.experienciaLaboral.FechaFinalizacion).toISOString().split('T')[0];
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
