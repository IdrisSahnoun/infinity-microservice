import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicComponent } from './mic.component';

describe('MicComponent', () => {
  let component: MicComponent;
  let fixture: ComponentFixture<MicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MicComponent]
    });
    fixture = TestBed.createComponent(MicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
