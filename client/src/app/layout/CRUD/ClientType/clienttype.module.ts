import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientTypeRoutingModule } from './clienttype-routing.module';
import { ClientTypeComponent } from './clienttype.component';
import { ClientTypeService } from './../../../services/CRUD/clienttype.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             ClientTypeRoutingModule,
             FormsModule],
   declarations: [ClientTypeComponent],
   providers: [
               NgbModal,
               ClientTypeService
               ]
})
export class ClientTypeModule {}