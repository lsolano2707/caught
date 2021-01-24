import {LessonType} from './lessonType';

export class Lesson {
  id: string;
  idLesson: string;
  lessonType: LessonType;
  name: string;
  description: string;
  icon: string;
  order: number;
  data: any;
  levels: number[];
}
