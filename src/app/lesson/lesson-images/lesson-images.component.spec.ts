import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonImagesComponent } from './lesson-images.component';

describe('LessonImagesComponent', () => {
  let component: LessonImagesComponent;
  let fixture: ComponentFixture<LessonImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
