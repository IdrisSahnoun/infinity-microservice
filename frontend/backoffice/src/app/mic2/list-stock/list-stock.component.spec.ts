import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockComponent } from './list-stock.component';

describe('ListStockComponent', () => {
  let component: ListStockComponent;
  let fixture: ComponentFixture<ListStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStockComponent]
    });
    fixture = TestBed.createComponent(ListStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
