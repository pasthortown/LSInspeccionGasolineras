import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPruebaComponent } from './pagina-prueba.component';

describe('PaginaPruebaComponent', () => {
  let component: PaginaPruebaComponent;
  let fixture: ComponentFixture<PaginaPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaPruebaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
