import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAlarmComponent } from './home-alarm.component';

describe('HomeAlarmComponent', () => {
  let component: HomeAlarmComponent;
  let fixture: ComponentFixture<HomeAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
