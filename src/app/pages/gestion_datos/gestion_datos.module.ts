import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule }   from '@angular/forms';
import { GestionDatosRoutingModule, routedComponents } from './gestion_datos-routing.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    GestionDatosRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    ThemeModule,
    FormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [],
  entryComponents: [],
})
export class GestionDatosModule { }