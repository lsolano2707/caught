import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { LessonService } from '../_services/lesson.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private lessonService: LessonService) { }

  lessons: any[];
  searchText: string;

  ngOnInit() {
    this.getLessons();
  }

  search(val) {
    this.searchText = val;
  }

  getLessons() {
    this.lessonService.getActiveLessons().subscribe(result => {
        this.lessons = result;
      },
      error => {
          console.log('Error 2: ' + <any>error);
      });
  }



}
