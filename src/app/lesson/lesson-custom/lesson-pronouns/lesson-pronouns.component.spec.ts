import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPronounsComponent } from './lesson-pronouns.component';

describe('LessonPronounsComponent', () => {
  let component: LessonPronounsComponent;
  let fixture: ComponentFixture<LessonPronounsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonPronounsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPronounsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
