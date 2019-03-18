import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterPersonaRoutingModule } from './register-persona-routing.module';
import { RegisterPersonaComponent } from './register-persona.component';

@NgModule({
  imports: [CommonModule, RegisterPersonaRoutingModule],
  declarations: [RegisterPersonaComponent]
})
export class RegisterPersonaModule {}
