import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigExamComponent } from './config-exam.component';

describe('ConfigExamComponent', () => {
  let component: ConfigExamComponent;
  let fixture: ComponentFixture<ConfigExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
