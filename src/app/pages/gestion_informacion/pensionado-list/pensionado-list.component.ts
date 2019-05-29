import { Component, OnInit, Input } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router"

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'pensionado-list',
  templateUrl: './pensionado-list.component.html',
  styleUrls: ['./pensionado-list.component.scss']
})
export class PensionadoListComponent implements OnInit {
  config: ToasterConfig;
  data = <Array<any>>[];

  constructor(private translate: TranslateService,
    private http: HttpClient,
    private userService: PersonaService,
    private router: Router,
    private toasterService: ToasterService) {
    
      this.loadData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language change...")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.userService.get('').subscribe(res => {
      this.data = <Array<any>>res;
    })
  }

  ngOnInit() {
  }

  goExperienceHistory(id): void {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-list'], { queryParams: { usuarioId: id } })
  }
}
