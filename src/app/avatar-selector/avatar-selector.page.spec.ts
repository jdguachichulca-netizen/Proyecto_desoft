import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarSelectorPage } from './avatar-selector.page';

describe('AvatarSelectorPage', () => {
  let component: AvatarSelectorPage;
  let fixture: ComponentFixture<AvatarSelectorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
