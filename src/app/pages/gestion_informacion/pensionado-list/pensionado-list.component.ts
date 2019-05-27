import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
//import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { PersonaService } from '../../../@core/data/persona.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from "@angular/router"

@Component({
  selector: 'pensionado-list',
  templateUrl: './pensionado-list.component.html',
  styleUrls: ['./pensionado-list.component.scss']
})
export class PensionadoListComponent implements OnInit {
  uid: number;
  eid: number;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;
  source: LocalDataSource = new LocalDataSource();
  data = <Array<any>>[];

  constructor(private translate: TranslateService,
    //private produccionAcademicaService: ProduccionAcademicaService,
    private http: HttpClient,
    private userService: PersonaService,
    private router: Router,
    private toasterService: ToasterService) {
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
          title: "Id",
          // type: 'tipo_articulo;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        TipoDocumento: {
          title: "Tipo Doc.",
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        NumeroDocumento: {
          title: "No. Doc.",
          valuePrepareFunction: (value) => {
            return value;
          }
        },
        Nombres: {
          title: "Nombres",
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Apellidos: {
          title: "Apellidos",
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        CiudadNacimiento: {
          title: "Ciudad Nacimiento",
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        EstadoCivil: {
          title: "Estado Civil",
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Genero: {
          title: "Genero",
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
      hideSubHeader: true,
      actions: {
        columnTitle: "Acciones",
        add: false,
        delete: false,
        position: 'right'
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>'
      },
      /*delete: {
        deleteButtonContent: '<i class="nb-trash"></i>'
      },*/
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    /*const data = <Array<any>>[{
      Id: "1",
      Documento: 101010101,
      Nombre: "Pedro",
      Apellido: "Cifuentes",
      Estado_Civil: "soltero",
      Genero: "masculino"
    }];

    this.source.load(data);

    console.log(this.source)

    this.userService.get('')
      .subscribe(res => {
        if (res) {
          console.log(res);
          const data = <Array<any>>res;
          this.source.load(data);
        }
      });*/

    this.http.get('http://localhost:8080/v1/usuario/', {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    }).subscribe(res => {
      console.log(res);

      if (res) {
        this.data = <Array<any>>res;
        this.source.load(this.data);
      }
    })
  }

  ngOnInit() {
  }

  goExperienceHistory(id): void {
    this.router.navigate(['/pages/experiencia_laboral/experiencia_laboral-list'], { queryParams: { usuarioId: id } })
  }
}
