import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LessonService } from '../_services/lesson.service';
import { Lesson } from '../_entities/lesson';
import { ConfigExam } from '../_entities/configExam';
import { Score } from '../_entities/score';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LessonComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private elementRef: ElementRef,
    private router: Router,
    private lessonService: LessonService) { }

  searchText: string;
  lesson: Lesson;
  option: string;
  configExam: ConfigExam;
  score: Score;

  prueba = 4;
  // dataLesson: any;

  ngOnInit() {


    const id = this.route.snapshot.params['id'];
    const type = this.route.snapshot.params['type'];
    // console.log('id: ' + id + '- type: ' + type);

    this.getLessonById(id);

    if (type === 'exam') {
      this.changeOptionConfig();
    } else {
      this.changeOptionLesson();
    }
  }

  changeOption(option) {
    this.option = option;
  }

  changeOptionLesson() {
    this.option = 'lesson';
  }

  changeOptionConfig() {
    this.option = 'config';
  }

  search(val) {
    this.searchText = val;
  }

  getLessonById(id: string) {
    this.lessonService.getLessonById(id).subscribe(result => {
      // console.log('lesson', JSON.stringify(result));
      this.lesson = result;
      // console.log('lesson', JSON.stringify(this.lesson));

      // Get data
      // if (this.lesson.idLesson === '100_2') {
      //   this.lessonService.getDataVerbByLessonId(id).subscribe(dataLesson => {
      //     // console.log('dataLesson', JSON.stringify(dataLesson));
      //     this.dataLesson = dataLesson;
      //   }, error => {
      //     console.log('Error dataLesson: ' + <any>error);
      //   });
      // } else {
      //   this.lessonService.getDataByLessonId(id).subscribe(dataLesson => {
      //     // console.log('dataLesson', JSON.stringify(dataLesson));
      //     this.dataLesson = dataLesson;
      //   }, error => {
      //     console.log('Error dataLesson: ' + <any>error);
      //   });
      // }

    }, error => {
      console.log('Error lesson: ' + <any>error);
    });
  }

  getOption(val) {
    this.option = val;
  }

  getConfigExam(val) {
    this.configExam = val;
  }

  getExamToScoreEvent(val) {
    this.score = val;
  }

  getHeaderOption(event) {
    if (event === 'exam') {
      this.changeOptionConfig();
    }
  }

}
