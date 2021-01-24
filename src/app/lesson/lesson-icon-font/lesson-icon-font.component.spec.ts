import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonIconFontComponent } from './lesson-icon-font.component';

describe('LessonIconFontComponent', () => {
  let component: LessonIconFontComponent;
  let fixture: ComponentFixture<LessonIconFontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonIconFontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonIconFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
