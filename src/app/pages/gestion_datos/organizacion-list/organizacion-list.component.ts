import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from './../../../@core/data/organizacion.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'organizacion-list',
  templateUrl: './organizacion-list.component.html',
  styleUrls: ['./organizacion-list.component.scss']
})
export class OrganizacionListComponent implements OnInit {
  data: Array<any>;

  constructor(private translate: TranslateService,
    private organizacionService: OrganizacionService) {

    this.loadData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("Language Change...")
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.organizacionService.get('').subscribe(res => {
      this.data = <Array<any>>res
    })
  }

  ngOnInit() {
  }
}
