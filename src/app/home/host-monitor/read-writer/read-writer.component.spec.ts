import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadWriterComponent } from './read-writer.component';

describe('ReadWriterComponent', () => {
  let component: ReadWriterComponent;
  let fixture: ComponentFixture<ReadWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
