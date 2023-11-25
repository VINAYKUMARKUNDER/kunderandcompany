import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvoiceComponent } from './my-invoice.component';

describe('MyInvoiceComponent', () => {
  let component: MyInvoiceComponent;
  let fixture: ComponentFixture<MyInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInvoiceComponent]
    });
    fixture = TestBed.createComponent(MyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
