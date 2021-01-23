import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonVerbComponent } from './lesson-verb.component';

describe('LessonVerbComponent', () => {
  let component: LessonVerbComponent;
  let fixture: ComponentFixture<LessonVerbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonVerbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonVerbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
