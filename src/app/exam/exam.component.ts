import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { LessonService } from '../_services/lesson.service';

import { ConfigExam } from '../_entities/configExam';
import { Question } from '../_entities/question';
import { Option } from '../_entities/option';
import { QuestionMultichoice } from '../_entities/questionMultichoice';
import { Score } from '../_entities/score';
import { Lesson } from '../_entities/lesson';

@Component({
  selector: 'exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {


  @Input() lesson: Lesson;
  @Input() configExam: ConfigExam;
  @Output() option = new EventEmitter();
  @Output() examToScoreEvent = new EventEmitter();

  form: FormGroup;
  questions: Question[] = [];
  questionMultichoices: QuestionMultichoice[];

  question: Question;
  questionMultichoice: QuestionMultichoice;
  position = 1;
  countAnswer: number;
  correctAnswers = 0;
  mistakes = 0;

  hours = 0;
  minutes = 0;
  seconds = 0;
  colorRojo = false;
  backButton: boolean;

  constructor(private lessonService: LessonService,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createControls();

    // Asignamos el lenguaje de la respuesta
    if (!this.configExam.answerLanguaje) {
      this.configExam.answerLanguaje = (this.configExam.questionLanguaje === 'ENGLISH' ? 'SPANISH' : 'ENGLISH');
    }
    this.getExam();

    // Validamos si tiene tiempo
    if (this.configExam.time) {
      this.startTimer();
    }

  }

  createControls() {
    this.form = this.formBuilder.group({
      answer: ['', Validators.required]
    });
  }

  changeOption() {
    this.option.emit('config');
  }

  selectAnswer(option) {
    this.form.controls.answer.setValue(option);
  }

  getExam() {
    this.lessonService.getExam(this.lesson.lessonType.id, this.configExam, this.lesson.data).subscribe(questions => {

      this.countAnswer = questions.length;
      if (this.configExam.typeAnswer === 'WRITING') {
        // console.log('WRITING EXAM -> ' + JSON.stringify(questions));
        this.questions = questions;
        this.createWriteQuestion();
      } else if (this.configExam.typeAnswer === 'MULTICHOICE') {
        // console.log('MULTICHOICE EXAM -> ' + JSON.stringify(questions));
        this.questionMultichoices = questions;
        this.createMultichoiceQuestion();
      }

    },
      error => {
        console.log('Error: ' + <any>error);
      });
  }

  createWriteQuestion() {
    this.question = this.questions[this.position - 1];
  }

  createMultichoiceQuestion() {
    this.questionMultichoice = this.questionMultichoices[this.position - 1];
  }

  validateQuestion() {
    // Add user answer to question object
    this.question.answerUserComplete = this.form.value.answer.trim();
    this.question.answerComplete = this.question.answer;

    // Validate the question
    const answer = this.question.answer.split('/');
    if (answer[0].toUpperCase() === this.form.value.answer.trim().toUpperCase()) {
      this.correctAnswers += 1;
      this.question.check = 'CORRECT';
    } else {
      this.mistakes += 1;
      this.question.check = 'ERROR';
    }

    // Add question to array
    this.questions[this.position - 1] = this.question;

    if (this.position < this.countAnswer) {
      this.position += 1;
      this.question = this.questions[this.position - 1];
    } else {
      this.showScore();
    }

    this.backButton = false;
    // Reset Controls
    this.createControls();
    this.form.controls.answer.setValue('', { focus });
  }

  validateMultichoiceQuestion() {
    // Validate the question
    if (this.questionMultichoice.question.answer === this.form.value.answer) {
      this.correctAnswers += 1;
      this.questionMultichoice.question.check = 'CORRECT';
    } else {
      this.mistakes += 1;
      this.questionMultichoice.question.check = 'ERROR';
    }

    // Add user answer to question object
    this.questionMultichoice.question.answerUser = this.form.value.answer.trim();
    if (this.questionMultichoice.question.answerUser) {
      this.questionMultichoice.question.answerUserComplete = '(' + this.questionMultichoice.question.answerUser + ') '
        + this.getAnswerByLetter(this.questionMultichoice.options, this.form.value.answer);
    } else {
      this.questionMultichoice.question.answerUserComplete = '?';
    }
    this.questionMultichoice.question.answerComplete = '(' + this.questionMultichoice.question.answer + ') '
      + this.getAnswerByLetter(this.questionMultichoice.options, this.questionMultichoice.question.answer);

    // Add question to array
    if (!this.backButton) {
      this.questions.push(this.questionMultichoice.question);
    }

    if (this.position < this.countAnswer) {
      this.position += 1;
      this.questionMultichoice = this.questionMultichoices[this.position - 1];
    } else {
      this.showScore();
    }

    this.backButton = false;
    // Reset Controls
    this.createControls();
  }

  backMultichoiceQuestion() {
    this.position -= 1;
    this.questionMultichoice = this.questionMultichoices[this.position - 1];
    this.form.controls.answer.setValue(this.questionMultichoice.question.answerUser);

    // Restamos el score
    if (this.questionMultichoice.question.check === 'CORRECT') {
      if (this.correctAnswers > 0) {
        this.correctAnswers -= 1;
      }
    } else {
      if (this.mistakes > 0) {
        this.mistakes -= 1;
      }
    }

    this.backButton = true;
  }

  backQuestion() {
    this.position -= 1;
    this.question = this.questions[this.position - 1];
    this.form.controls.answer.setValue(this.question.answerUserComplete, { focus });

    // Restamos el score
    if (this.question.check === 'CORRECT') {
      if (this.correctAnswers > 0) {
        this.correctAnswers -= 1;
      }
    } else {
      if (this.mistakes > 0) {
        this.mistakes -= 1;
      }
    }

    this.backButton = true;
  }

  showScore() {
    this.option.emit('score');
    const score: Score = new Score();
    score.correctAnswers = this.correctAnswers;
    score.countAnswer = this.countAnswer;
    score.mistakes = this.mistakes;
    score.questions = this.questions;

    // console.log(JSON.stringify(score));
    this.examToScoreEvent.emit(score);
  }

  getAnswerByLetter(options: Option[], letter: string): string {
    const resp = options.filter(item => item.id === letter);
    return resp[0] ? resp[0].valueText : '';
  }

  validate(key) {
    if (this.form.value.answer && key.which === 13) {
      this.validateQuestion();
    }
  }

  play(event) {
    event.target.firstElementChild.play();
  }

  startTimer(): void {

    // Obtenemos el tiempo
    this.hours = Math.trunc(parseInt(this.configExam.time, 0) / 60);
    this.minutes = parseInt(this.configExam.time, 0) - (this.hours * 60);

    // Colocamos el color en rojo
    if (this.minutes < 1) {
      this.colorRojo = true;
    }

    setInterval(() => this.tick(), 1000);
  }

  private tick(): void {
    if (--this.seconds < 0) {
      this.seconds = 59;
      if (--this.minutes < 0) {
        this.minutes = 59;
        if (--this.hours < 0) {
          this.timeOut();
        }
      }
    }

    // Colocamos el color en rojo
    if (this.hours === 0 && this.minutes < 1) {
      this.colorRojo = true;
    }
  }

  private timeOut(): void {
    // Mostramos las que no alcanzo a responder
    if (this.configExam.typeAnswer === 'WRITING') {
      for (let i = this.position; i <= this.countAnswer; i++) {
        this.mistakes += 1;
        this.question.check = 'ERROR';

        // Add user answer to question object
        this.question.answerUserComplete = '?';
        this.question.answerComplete = this.question.answer;

        // Add question to array
        this.questions[i - 1] = this.question;
        this.question = this.questions[i];
      }
    } else if (this.configExam.typeAnswer === 'MULTICHOICE') {
      for (let i = this.position; i <= this.countAnswer; i++) {
        this.mistakes += 1;
        this.questionMultichoice.question.check = 'ERROR';

        // Add question to array
        this.questions.push(this.questionMultichoice.question);
        // add answer
        this.questionMultichoice.question.answerComplete = '(' + this.questionMultichoice.question.answer + ') '
          + this.getAnswerByLetter(this.questionMultichoice.options, this.questionMultichoice.question.answer);
        this.questionMultichoice.question.answerUserComplete = '?';
        this.questionMultichoice = this.questionMultichoices[i];
      }
    }

    // Terminamos el examen
    this.showScore();
  }

  getHeaderOption(event) {
    if (event === 'score') {
      this.timeOut();
    } else {
      this.option.emit(event);
    }
  }

}
