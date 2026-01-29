import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nivel2Page } from './nivel2.page';

describe('Nivel2Page', () => {
  let component: Nivel2Page;
  let fixture: ComponentFixture<Nivel2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Nivel2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
