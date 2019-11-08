import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMonitorComponent } from './host-monitor.component';

describe('HostMonitorComponent', () => {
  let component: HostMonitorComponent;
  let fixture: ComponentFixture<HostMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
