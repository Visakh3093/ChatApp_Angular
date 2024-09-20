import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedProfileModalComponent } from './selected-profile-modal.component';

describe('SelectedProfileModalComponent', () => {
  let component: SelectedProfileModalComponent;
  let fixture: ComponentFixture<SelectedProfileModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedProfileModalComponent]
    });
    fixture = TestBed.createComponent(SelectedProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
