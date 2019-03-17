import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenderRoutingModule } from './gender-routing.module';
import { GenderComponent } from './gender.component';
import { GenderService } from './../../../services/CRUD/gender.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             GenderRoutingModule,
             FormsModule],
   declarations: [GenderComponent],
   providers: [
               NgbModal,
               GenderService
               ]
})
export class GenderModule {}