import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mic5Component } from './mic5.component';

describe('Mic5Component', () => {
  let component: Mic5Component;
  let fixture: ComponentFixture<Mic5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mic5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mic5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
