import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SalarioMinimoService } from '../../../@core/data/salario_minimo.service';
import { NbRoleProvider, NbAccessChecker } from '@nebular/security';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-salario-minimo-legal-list',
  templateUrl: './salario_minimo_legal-list.component.html',
  styleUrls: ['./salario_minimo_legal-list.component.scss']
})
export class SalarioMinimoLegalListComponent implements OnInit {
  config: ToasterConfig;
  data: Array<any>;

  create: boolean;
  view: boolean;
  delete: boolean;
  edit: boolean;

  constructor(private translate: TranslateService,
    private toasterService: ToasterService,
    private SalarioMinimoService: SalarioMinimoService,
    private router: Router,
    private roleProvider: NbRoleProvider,
    private accessChecker: NbAccessChecker) {

      this.get_access_rights()

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

    this.SalarioMinimoService.get('').subscribe(res => {
      this.data = <Array<any>>res;
    })
  }

  get_access_rights() {
    let roles

    this.roleProvider.getRole().subscribe(res => {
      roles = res
      console.log(typeof res, res)
    })

    this.accessChecker.isGranted('create', roles).subscribe(res => {
      this.create = res
      console.log(res)
    })

    this.accessChecker.isGranted('view', roles).subscribe(res => {
      this.view = res
      console.log(res)
    })

    this.accessChecker.isGranted('edit', roles).subscribe(res => {
      this.edit = res
      console.log(res)
    })

    this.accessChecker.isGranted('delete', roles).subscribe(res => {
      this.delete = res
      console.log(res)
    })
  }

  ngOnInit() {
  }

  onCreate() {
    this.router.navigate(['/pages/gestion_datos/salario_minimo_legal-crud/new'])
  }

  onEdit(id) {
    this.router.navigate(['/pages/gestion_datos/salario_minimo_legal-crud/' + (id).toString()])
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
          this.SalarioMinimoService.delete('', (id).toString()).subscribe(res => {
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
