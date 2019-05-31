import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionInformacionComponent } from './gestion_informacion.component';
import { MontoAceptadoCrudComponent } from './monto-aceptado-crud/monto-aceptado-crud.component';
import { MontoAceptadoListComponent } from './monto-aceptado-list/monto-aceptado-list.component';
import { PensionadoListComponent } from './pensionado-list/pensionado-list.component';

const routes: Routes = [{
  path: '',
  component: GestionInformacionComponent,
  children: [{
    path: 'monto_aceptado-crud/:IdExperienciaLaboral/:Id',
    component: MontoAceptadoCrudComponent,
  },
  {
    path: 'monto_aceptado-list/:IdExperienciaLaboral',
    component: MontoAceptadoListComponent
  }, 
  {
    path: 'pensionado-list',
    component: PensionadoListComponent
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class GestionInformacionRoutingModule { }

export const routedComponents = [
  GestionInformacionComponent,
  MontoAceptadoCrudComponent,
  MontoAceptadoListComponent,
  PensionadoListComponent
];
