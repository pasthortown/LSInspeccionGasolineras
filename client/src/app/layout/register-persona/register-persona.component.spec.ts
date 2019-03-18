import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPersonaComponent } from './register-persona.component';

describe('RegisterPersonaComponent', () => {
  let component: RegisterPersonaComponent;
  let fixture: ComponentFixture<RegisterPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPersonaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
