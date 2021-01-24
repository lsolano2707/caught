import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ExamUtil } from '../_util/exam-util';

import { LESSONS } from './mock/mock-lesson';
import { DATA_VOCABULARY } from './mock/mock-data-lesson';
import { DATA_VERBS } from './mock/mock-data-verbs';
import { ConfigExam } from '../_entities/configExam';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LessonService {

  constructor(private http: HttpClient) { }

  lessons: any[];

  getLessons() {
    if (this.lessons === undefined) {
      // console.log('new array lessons');
      this.lessons = LESSONS.filter(item => item.state === true);
    } // else {
    //   console.log('old array lessons');
    // }
  }

  getActiveLessons(): Observable<any> {
    this.getLessons();
    return of(this.lessons);
  }

  getLessonById(id: string): Observable<any> {
    // return of(LESSONS.filter(item => item.idLesson === id)[0]);

    // Get lesson
    this.getLessons();
    const lesson = this.lessons.filter(item => item.idLesson === id)[0];
    if (lesson.data.length === 0) {
      if (lesson.lessonType.id !== 6) { // Others
        const data = DATA_VOCABULARY.filter(item => item.idLesson === id)[0].data;
        if (data.length > 0) {
          if (data[0].order) {
            this.sortBy(data, 'order', 'asc');
          } else {
            this.sortBy(data, 'englishValue', 'asc');
          }
          this.lessons.filter(item => item.idLesson === id)[0].data = data;
        }
      } else {
        const data = DATA_VERBS.filter(item => item.idLesson === id)[0].data;
        if (data.length > 0) {
          this.sortBy(data, 'englishPresentValue', 'asc');
          this.lessons.filter(item => item.idLesson === id)[0].data = data;
        }
      }
    }
    return of(lesson);
  }

  getDataByLessonId(id: string): Observable<any> {

    // Get lesson
    this.getLessons();
    const lesson = this.lessons.filter(item => item.idLesson === id)[0];

    if (lesson.data.length === 0) {
      const data = DATA_VOCABULARY.filter(item => item.idLesson === id)[0].data;
      if (data[0].order) {
        this.sortBy(data, 'order', 'asc');
      } else {
        this.sortBy(data, 'englishValue', 'asc');
      }
      this.lessons.filter(item => item.idLesson === id)[0].data = data;
      return of(data);
    } else {
      return of(lesson.data);
    }
  }

  getDataVerbByLessonId(id: string): Observable<any> {

    // Get lesson
    this.getLessons();
    const lesson = this.lessons.filter(item => item.idLesson === id)[0];

    if (lesson.data.length === 0) {
      const data = DATA_VERBS.filter(item => item.idLesson === id)[0].data;
      if (data.length > 0) {
        this.sortBy(data, 'englishValue', 'asc');
        this.lessons.filter(item => item.idLesson === id)[0].data = data;
      }
      return of(data);
    } else {
      return of(lesson.data);
    }
  }

  getExam(lessonTypeId: number, configExam: ConfigExam, data: any[]): Observable<any[]> {
    // console.log('configExam', JSON.stringify(configExam));
    let questions = null;

    if (configExam.typeAnswer === 'WRITING') {
      if (lessonTypeId === 6) {
        questions = ExamUtil.getWrittingVerbsExam(data, configExam.optionNumberOfQuestion, configExam.numberOfQuestion,
          configExam.rangeOfQuestionStart, configExam.rangeOfQuestionEnd,
          configExam.questionsVerbs, configExam.answerVerbs, configExam.orderQuestions);
      } else {
        questions = ExamUtil.getWrittingExam(data, configExam.optionNumberOfQuestion, configExam.numberOfQuestion,
          configExam.rangeOfQuestionStart, configExam.rangeOfQuestionEnd,
          configExam.questionLanguaje, configExam.answerLanguaje, configExam.orderQuestions);
      }
    } else if (configExam.typeAnswer === 'MULTICHOICE') {
      if (lessonTypeId === 6) {
        questions = ExamUtil.getMultichoiceVerbsExam(data, configExam.optionNumberOfQuestion, configExam.numberOfQuestion,
          configExam.rangeOfQuestionStart, configExam.rangeOfQuestionEnd,
          configExam.questionsVerbs, configExam.answerVerbs,
          configExam.orderQuestions, configExam.level);
      } else {
        questions = ExamUtil.getMultichoiceExam(data, configExam.optionNumberOfQuestion, configExam.numberOfQuestion,
          configExam.rangeOfQuestionStart, configExam.rangeOfQuestionEnd,
          configExam.questionLanguaje, configExam.answerLanguaje,
          configExam.orderQuestions);
      }
    }

    return of(questions);
  }

  // getExam2(request: ConfigExam): Observable<any> {
  //   console.log(JSON.stringify(request));

  //   if (request.typeAnswer === 'WRITING') { // WRITING EXAM

  //   } else { // MULTICHOICE EXAM

  //   }




  // }

  sortBy<T>(array: any, propName: keyof any, order: 'asc' | 'desc') {
    array.sort((a, b) => {
      if (a[propName] < b[propName]) {
        return -1;
      }
      if (a[propName] > b[propName]) {
        return 1;
      }
      return 0;
    });
    if (order === 'desc') {
      array.reverse();
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //   this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
