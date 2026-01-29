import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nivel1Page } from './nivel1.page';

describe('Nivel1Page', () => {
  let component: Nivel1Page;
  let fixture: ComponentFixture<Nivel1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Nivel1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
