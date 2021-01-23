import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() returnHome: boolean;
  @Input() searchField: boolean;
  @Input() isHome: boolean;
  @Input() isLesson: boolean;
  @Input() isConfigExam: boolean;
  @Input() isExam: boolean;
  @Input() lessonId: string;
  @Output() outputEvent = new EventEmitter();
  @Output() outputSearch = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(event: any) {
    this.outputSearch.emit(event.target.value);
    // console.log(event.target.value + ' | ');
  }

  setOption(option) {
    this.outputEvent.emit(option);
  }

}
