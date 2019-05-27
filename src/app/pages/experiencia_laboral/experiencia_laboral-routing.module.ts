import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienciaLaboralComponent } from './experiencia_laboral.component';
import { ListExperienciaLaboralComponent } from './list-experiencia_laboral/list-experiencia_laboral.component';
import { CrudExperienciaLaboralComponent } from './crud-experiencia_laboral/crud-experiencia_laboral.component';
// import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: ExperienciaLaboralComponent,
  children: [{
    path: 'experiencia_laboral-list',
    component: ListExperienciaLaboralComponent,
    // canActivate: [AuthGuard],
  }, {
    path: 'experiencia_laboral-crud',
    component: CrudExperienciaLaboralComponent,
    // canActivate: [AuthGuard],
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

export class ExperienciaLaboralRoutingModule { }

export const routedComponents = [
    ExperienciaLaboralComponent,
    ListExperienciaLaboralComponent,
    CrudExperienciaLaboralComponent,
];
