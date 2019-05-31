import { Organizacion } from './../../../@core/data/models/organizacion';
import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { OrganizacionService } from '../../../@core/data/organizacion.service';
import { ExperienciaService } from '../../../@core/data/experiencia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienciaLaboralModel } from '../../../@core/data/models/experiencia_laboral';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

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
  experienciaLaboral = new ExperienciaLaboralModel;
  organizaciones: Array<any>;

  FechaIngreso: string;
  FechaRetiro: string;

  constructor(
    private translate: TranslateService,
    private toasterService: ToasterService,
    private organizacionService: OrganizacionService,
    private ExperienciaService: ExperienciaService,
    private route: ActivatedRoute,
    private router: Router) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change...")
    });
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
    
    this.experienciaLaboral.EntidadId = Number(this.experienciaLaboral.EntidadId);

    if (this.FechaIngreso)
      this.experienciaLaboral.FechaIngreso = new Date(this.FechaIngreso.concat('T10:00:00-05:00'))

    if (this.FechaRetiro)
      this.experienciaLaboral.FechaRetiro = new Date(this.FechaRetiro.concat('T10:00:00-05:00'))

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
      this.organizaciones = <Array<any>>res
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id");
      this.usuarioId = params.get('usuarioId')
      this.experienciaLaboral.UsuarioId = parseInt(this.usuarioId)

      if (this.id != null && this.id != 'new')
        this.ExperienciaService.get((this.id).toString()).subscribe(res => {
          this.experienciaLaboral = <ExperienciaLaboralModel>res

          if (this.experienciaLaboral.FechaIngreso)
            this.FechaIngreso = new Date(this.experienciaLaboral.FechaIngreso).toISOString().split('T')[0];

          if (this.experienciaLaboral.FechaRetiro) 
            this.FechaRetiro = new Date(this.experienciaLaboral.FechaRetiro).toISOString().split('T')[0];
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
