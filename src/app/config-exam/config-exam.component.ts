import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { LoaderService } from '../loader/loader.service';
import { Lesson } from '../_entities/lesson';

@Component({
  selector: 'config-exam',
  templateUrl: './config-exam.component.html',
  styleUrls: ['./config-exam.component.css']
})
export class ConfigExamComponent implements OnInit, AfterViewInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private formBuilder: FormBuilder,
    private loaderService: LoaderService) { }

  STORAGE_KEY = 'config';


  @Input() lesson: Lesson;
  @Output() option = new EventEmitter();
  @Output() configExam = new EventEmitter();

  form: FormGroup;
  configDefault: any;
  numberOfQuestions = 0;

  ngOnInit() {
    this.loaderService.show();
    this.numberOfQuestions = this.lesson.data.length;

    this.configDefault = {
      questionLanguaje: 'ENGLISH',
      answerLanguaje: 'SPANISH',
      typeQuestion: 'TEXT',
      typeAnswer: 'MULTICHOICE',
      multichoiceType: 'TEXT',
      optionNumberOfQuestion: 'all-questions',
      rangeOfQuestionStart: 1,
      rangeOfQuestionEnd: this.numberOfQuestions,
      numberOfQuestion: this.numberOfQuestions,
      orderQuestions: 'RANDOM',
      level: '1',
      time: 5,
      buttonBack: false,
      questionsVerbs: 'RANDOM',
      answerVerbs: 'RANDOM'
    };

    const configSave = this.storage.get(this.STORAGE_KEY);
    // console.log('config', JSON.stringify(config));
    if (configSave && configSave.lessonId === this.lesson.idLesson) {
      this.createControls(configSave);
      this.configDefault.optionNumberOfQuestion = configSave.optionNumberOfQuestion;
    } else {
      this.createControls(this.configDefault);
    }

    // setInterval(() => this.loaderService.hide(), 3000);
    // setInterval(() => null, 5000);
  }

  ngAfterViewInit() {
    this.loaderService.hide();
  }

  createControls(config: any) {
    // console.log('config', JSON.stringify(config));
    this.form = this.formBuilder.group({
      questionLanguaje: [config.questionLanguaje, Validators.required],
      answerLanguaje: [{ value: config.answerLanguaje, disabled: false }, Validators.required],
      typeQuestion: [config.typeQuestion, Validators.required],
      typeAnswer: [config.typeAnswer, Validators.required],
      multichoiceType: [config.multichoiceType, Validators.required],
      numberOfQuestion: [config.numberOfQuestion, Validators.required],
      rangeOfQuestionStart: [config.rangeOfQuestionStart, Validators.required],
      rangeOfQuestionEnd: [config.rangeOfQuestionEnd, Validators.required],
      orderQuestions: [config.orderQuestions, Validators.required],
      level: [config.level, Validators.required],
      time: [{ value: config.time || 5, disabled: true }],
      buttonBack: [config.buttonBack],
      questionsVerbs: [config.questionsVerbs, Validators.required],
      answerVerbs: [config.answerVerbs, Validators.required]
    });
  }

  changeAnswer() {
    this.form.controls.answerLanguaje.setValue(this.form.controls.questionLanguaje.value === 'ENGLISH' ? 'SPANISH' : 'ENGLISH');
  }

  activateRadiobuttonAnswer() {
    if (this.form.controls.typeQuestion.value === 'AUDIO') {
      this.form.controls.answerLanguaje.enable();
    } else {
      this.form.controls.answerLanguaje.disable();
      this.changeAnswer();
    }
  }

  activateTime() {
    this.form.controls.time.disabled ? this.form.controls.time.enable() : this.form.controls.time.disable();
  }

  goToLesson() {
    this.option.emit('lesson');
  }

  goToExam() {
    const config = this.form.value;
    config.lessonId = this.lesson.idLesson;
    config.optionNumberOfQuestion = this.configDefault.optionNumberOfQuestion;
    // insert updated array to local storage
    this.storage.set(this.STORAGE_KEY, config);
    this.configExam.emit(config);
    this.option.emit('exam');
  }

  showQuestionsNumber(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    this.configDefault.optionNumberOfQuestion = target.attributes.id.value;
  }

  getHeaderOption(event) {
    if (event === 'exam') {
      this.goToExam();
    } else {
      this.goToLesson();
    }
  }

}
