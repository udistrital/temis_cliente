import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarCobroComponent } from './registrar_cobro.component';
import { RegistrarCobroCrudComponent } from './registrar_cobro-crud/registrar_cobro-crud.component';
import { RegistrarCobroListComponent } from './registrar_cobro-list/registrar_cobro-list.component';

const routes: Routes = [{
  path: '',
  component: RegistrarCobroComponent,
  children: [{
    path: 'registrar_cobro-crud/:RegistrarMontoAceptadoPorCobrarId/:Id',
    component: RegistrarCobroCrudComponent,
  },
  {
    path: 'registrar_cobro-list/:RegistrarMontoAceptadoPorCobrarId',
    component: RegistrarCobroListComponent
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

export class RegistrarCobroRoutingModule { }

export const routedComponents = [
  RegistrarCobroComponent,
  RegistrarCobroCrudComponent,
  RegistrarCobroListComponent
];
