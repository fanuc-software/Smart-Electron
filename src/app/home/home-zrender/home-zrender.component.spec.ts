import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeZrenderComponent } from './home-zrender.component';

describe('HomeZrenderComponent', () => {
  let component: HomeZrenderComponent;
  let fixture: ComponentFixture<HomeZrenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeZrenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeZrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
