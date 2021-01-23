import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonVocabularyComponent } from './lesson-vocabulary.component';

describe('LessonVocabularyComponent', () => {
  let component: LessonVocabularyComponent;
  let fixture: ComponentFixture<LessonVocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonVocabularyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
