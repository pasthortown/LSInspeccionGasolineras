import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterClientRoutingModule } from './register-client-routing.module';
import { RegisterClientComponent } from './register-client.component';
import { PersonService } from './../../services/CRUD/person.service';
import { GenderService } from './../../services/CRUD/gender.service';
@NgModule({
  imports: [CommonModule,
            RegisterClientRoutingModule,
            FormsModule],
  declarations: [RegisterClientComponent],
  providers: [
    NgbModal,
    PersonService,
    GenderService,
    ]
})
export class RegisterClientModule {}
