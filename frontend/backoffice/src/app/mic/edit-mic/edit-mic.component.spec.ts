import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMicComponent } from './edit-mic.component';

describe('EditMicComponent', () => {
  let component: EditMicComponent;
  let fixture: ComponentFixture<EditMicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMicComponent]
    });
    fixture = TestBed.createComponent(EditMicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
