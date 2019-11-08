import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramResovleComponent } from './program-resovle.component';

describe('ProgramResovleComponent', () => {
  let component: ProgramResovleComponent;
  let fixture: ComponentFixture<ProgramResovleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramResovleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramResovleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
