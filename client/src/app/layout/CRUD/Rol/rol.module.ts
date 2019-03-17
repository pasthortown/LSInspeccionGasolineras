import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolRoutingModule } from './rol-routing.module';
import { RolComponent } from './rol.component';
import { RolService } from './../../../services/CRUD/rol.service';
import { environment } from 'src/environments/environment';
import { PersonService } from './../../../services/CRUD/person.service';

@NgModule({
   imports: [CommonModule,
             RolRoutingModule,
             FormsModule],
   declarations: [RolComponent],
   providers: [
               NgbModal,
               PersonService,
               RolService
               ]
})
export class RolModule {}