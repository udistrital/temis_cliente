import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetalleAdmisionComponent } from './detalle-admision/detalle-admision.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'gestion_informacion',
      loadChildren: './gestion_informacion/gestion_informacion.module#GestionInformacionModule',
    },
    {
      path: 'experiencia_laboral',
      loadChildren: './experiencia_laboral/experiencia_laboral.module#ExperienciaLaboralModule',
    },
    {
      path: 'registrar_cobro',
      loadChildren: './registrar_cobro/registrar_cobro.module#RegistrarCobroModule',
    },
    {
      path: 'gestion_datos',
      loadChildren: './gestion_datos/gestion_datos.module#GestionDatosModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
