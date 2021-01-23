import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonColorsComponent } from './lesson-colors.component';

describe('LessonColorsComponent', () => {
  let component: LessonColorsComponent;
  let fixture: ComponentFixture<LessonColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
