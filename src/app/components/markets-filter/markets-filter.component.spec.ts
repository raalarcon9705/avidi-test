import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsFilterComponent } from './markets-filter.component';

describe('MarketsFilterComponent', () => {
  let component: MarketsFilterComponent;
  let fixture: ComponentFixture<MarketsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
