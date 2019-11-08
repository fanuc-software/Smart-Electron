import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleResultComponent } from './cycle-result.component';

describe('CycleResultComponent', () => {
  let component: CycleResultComponent;
  let fixture: ComponentFixture<CycleResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
