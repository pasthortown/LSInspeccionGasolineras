import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterClientRoutingModule } from './register-client-routing.module';
import { RegisterClientComponent } from './register-client.component';

@NgModule({
  imports: [CommonModule, 
            RegisterClientRoutingModule,
            FormsModule],
  declarations: [RegisterClientComponent],
  providers: [
    NgbModal,
    ]
})
export class RegisterClientModule {}
