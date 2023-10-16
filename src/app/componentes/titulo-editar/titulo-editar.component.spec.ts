import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloEditarComponent } from './titulo-editar.component';

describe('TituloEditarComponent', () => {
  let component: TituloEditarComponent;
  let fixture: ComponentFixture<TituloEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TituloEditarComponent]
    });
    fixture = TestBed.createComponent(TituloEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
