import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroJsPage } from './intro-js.page';

describe('IntroJsPage', () => {
  let component: IntroJsPage;
  let fixture: ComponentFixture<IntroJsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroJsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
