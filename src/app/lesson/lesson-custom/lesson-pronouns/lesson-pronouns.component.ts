import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-pronouns',
  templateUrl: './lesson-pronouns.component.html',
  styleUrls: ['./lesson-pronouns.component.css']
})
export class LessonPronounsComponent implements OnInit {

  constructor() { }

  @Input() data: any;
  @Input() idLesson: string;
  @Input() searchText: string;

  ngOnInit() {
  }

}
