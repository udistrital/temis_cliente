import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionDatosComponent } from './gestion_datos.component';
import { OrganizacionListComponent } from './organizacion-list/organizacion-list.component';
import { IndicePrecioConsumoListComponent } from './indice_precio_consumo-list/indice_precio_consumo-list.component';
import { DtfListComponent } from './dtf-list/dtf-list.component';
import { SalarioMinimoLegalListComponent } from './salario_minimo_legal-list/salario_minimo_legal-list.component';
import { IndicePrecioConsumoCrudComponent } from './indice_precio_consumo-crud/indice_precio_consumo-crud.component';
import { DtfCrudComponent } from './dtf-crud/dtf-crud.component';
import { SalarioMinimoLegalCrudComponent } from './salario_minimo_legal-crud/salario_minimo_legal-crud.component';

const routes: Routes = [{
  path: '',
  component: GestionDatosComponent,
  children: [{
    path: 'organizacion-list',
    component: OrganizacionListComponent,
  },
  {
    path: 'indice_precio_consumo-list',
    component: IndicePrecioConsumoListComponent
  },
  {
    path: 'indice_precio_consumo-crud',
    component: IndicePrecioConsumoCrudComponent
  },
  {
    path: 'dtf-list',
    component: DtfListComponent
  },
  {
    path: 'dtf-crud/:Id',
    component: DtfCrudComponent
  },
  {
    path: 'salario_minimo_legal-list',
    component: SalarioMinimoLegalListComponent
  },
  {
    path: 'salario_minimo_legal-crud',
    component: SalarioMinimoLegalCrudComponent
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

export class GestionDatosRoutingModule { }

export const routedComponents = [
  GestionDatosComponent,
  OrganizacionListComponent,
  IndicePrecioConsumoListComponent,
  IndicePrecioConsumoCrudComponent,
  DtfListComponent,
  DtfCrudComponent,
  SalarioMinimoLegalListComponent,
  SalarioMinimoLegalCrudComponent
];
