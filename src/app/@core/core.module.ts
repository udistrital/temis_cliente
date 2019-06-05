import { AuthInterceptor } from './_Interceptor/auth.Interceptor';
import { EnteService } from './data/ente.service';
import { UbicacionesService } from './data/ubicaciones.service';
import { PersonaService } from './data/persona.service';
import { MontoAceptadoCobrarService } from './data/monto_aceptado_cobrar.service';
import { RegistrarCobroService } from './data/registrar_cobro.service';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy, NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { DocumentoService } from './data/documento.service'
import { NotificacionesService } from './utils/notificaciones.service';
import { WebsocketService } from './utils/websocket.service';
import { AuthGuard } from './_guards/auth.guard';
import { ListService } from './store/services/list.service';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/rootReducer';
import { AdmisionesService } from './data/admisiones.service';
import { IdiomaService } from './data/idioma.service';
import { ProgramaAcademicoService } from './data/programa_academico.service';
import { ProduccionAcademicaService } from './data/produccion_academica.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DtfService } from './data/dtf.service';
import { IpcService } from './data/ipc.service';
import { SalarioMinimoService } from './data/salario_minimo.service';
import { RegistrarCobroModel } from './data/models/registrar_cobro';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import * as jwt_decode from "jwt-decode";
import { Injectable } from '@angular/core';
import { ImplicitAutenticationService } from './utils/implicit_autentication.service';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService,
    private authToken: ImplicitAutenticationService) {
  }

  getRole(): Observable<string> {
    var token = this.authToken.getPayload()
    //console.log(this.authToken.getPayload())

    // here you could provide any role based on any auth flow|1
    //const acces_token = window.localStorage.getItem('id_token');
    if (token) {
      try {
        //console.log("TRY = ", jwt_decode(acces_token)['role'])
        //console.log("? > ", observableOf(jwt_decode(acces_token)['role']))
        return observableOf(token['role']);
      }
      catch (Error) {
        //console.log("Error: ", Error)
        return observableOf('guest')
      }
    } else
      return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,

  ...NbAuthModule.forRoot({
    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
      }),
    ],
    forms: {},
  }).providers,
  {
    provide: NbTokenStorage,
    useValue: {
      get: () => {
        return window.localStorage.getItem('id_token');
      }
    }
  },

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
        create: '*'
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider,
    useClass: RoleProvider,
    /*useValue: {
      getRole: () => {
        console.log("GET ROLE???")
        // here you could provide any role based on any auth flow
        const acces_token = window.localStorage.getItem('id_token');
        if (acces_token) {
          try {
            console.log("TRY = ", jwt_decode(acces_token)['role'])
            console.log("? > ", observableOf(jwt_decode(acces_token)['role']))
            return observableOf(jwt_decode(acces_token)['role']);
          }
          catch (Error) {
            console.log("Error: ", Error)
            return observableOf('guest')
          }
        } else
          return observableOf('guest');
      }
    }*/
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducer)
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
  providers: [
    AuthGuard,
    ListService,
    PersonaService,
    AdmisionesService,
    IdiomaService,
    UbicacionesService,
    ProgramaAcademicoService,
    ProduccionAcademicaService,
    EnteService,
    MontoAceptadoCobrarService,
    RegistrarCobroService,
    DtfService,
    IpcService,
    SalarioMinimoService,
    RegistrarCobroModel,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        DocumentoService,
        NotificacionesService,
        WebsocketService,
      ],
    };
  }
}
