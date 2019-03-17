import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstablishmentRoutingModule } from './establishment-routing.module';
import { EstablishmentComponent } from './establishment.component';
import { EstablishmentService } from './../../../services/CRUD/establishment.service';
import { environment } from 'src/environments/environment';
import { PersonService } from './../../../services/CRUD/person.service';

@NgModule({
   imports: [CommonModule,
             EstablishmentRoutingModule,
             FormsModule],
   declarations: [EstablishmentComponent],
   providers: [
               NgbModal,
               PersonService,
               EstablishmentService
               ]
})
export class EstablishmentModule {}