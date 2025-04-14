import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMicComponent } from './add-mic.component';

describe('AddMicComponent', () => {
  let component: AddMicComponent;
  let fixture: ComponentFixture<AddMicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMicComponent]
    });
    fixture = TestBed.createComponent(AddMicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
