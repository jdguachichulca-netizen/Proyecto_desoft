import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroPseintPage } from './intro-pseint.page';

describe('IntroPseintPage', () => {
  let component: IntroPseintPage;
  let fixture: ComponentFixture<IntroPseintPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroPseintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
