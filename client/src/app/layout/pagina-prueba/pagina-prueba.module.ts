import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginaPruebaRoutingModule } from './pagina-prueba-routing.module';
import { PaginaPruebaComponent } from './pagina-prueba.component';

@NgModule({
  imports: [CommonModule, PaginaPruebaRoutingModule],
  declarations: [PaginaPruebaComponent]
})
export class PaginaPruebaModule {}
