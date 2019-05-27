import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GestionInformacionRoutingModule, routedComponents } from './gestion_informacion-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    GestionInformacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    ThemeModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [],
  entryComponents: [],
})
export class GestionInformacionModule { }