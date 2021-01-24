import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Score } from '../_entities/score';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  @Input() score: Score;
  @Input() lessonName: string;
  @Output() optionEvent = new EventEmitter();
  showReport = false;
  finalScore: number;

  constructor() { }

  ngOnInit() {
    // console.log('SCORE: ' + JSON.stringify(this.score));
    this.finalScore = (5 / this.score.countAnswer) * this.score.correctAnswers;
  }

  changeOption(option) {
    this.optionEvent.emit(option);
  }

}
