import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientService } from './../../../services/CRUD/client.service';
import { environment } from 'src/environments/environment';
import { PersonService } from './../../../services/CRUD/person.service';
import { ClientTypeService } from './../../../services/CRUD/clienttype.service';
import { EstablishmentService } from './../../../services/CRUD/establishment.service';

@NgModule({
   imports: [CommonModule,
             ClientRoutingModule,
             FormsModule],
   declarations: [ClientComponent],
   providers: [
               NgbModal,
               PersonService,
               ClientTypeService,
               EstablishmentService,
               ClientService
               ]
})
export class ClientModule {}