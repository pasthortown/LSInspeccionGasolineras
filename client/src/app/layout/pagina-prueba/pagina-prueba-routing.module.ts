import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaPruebaComponent } from './pagina-prueba.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaPruebaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaPruebaRoutingModule {}
