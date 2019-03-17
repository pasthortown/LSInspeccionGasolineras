import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablishmentComponent } from './establishment.component';

const routes: Routes = [
   {
      path: '',
      component: EstablishmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class EstablishmentRoutingModule {}
