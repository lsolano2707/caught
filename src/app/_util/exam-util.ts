import { Question } from "../_entities/question";
import { QuestionMultichoice } from "../_entities/questionMultichoice";
import { Option } from "../_entities/option";

export class ExamUtil {
  // Questions
  static SPANISH = "SPANISH";
  static ENGLISH = "ENGLISH";

  // Type Question
  static TEXT = "TEXT";
  static AUDIO = "AUDIO";

  // Type Exam
  static WRITING = "WRITING";
  static MULTICHOICE = "MULTICHOICE";

  // Order Questions
  static RANDOM = "RANDOM";
  static ASCENDING = "ASCENDING";
  static DESCENDING = "DESCENDING";
  static DEFAULT = "DEFAULT";

  // Number of Questions
  static ALL_QUESTIONS = "all-questions";
  static RANG_OF_QUESTIONS = "range-of-questions";

  // Level
  static EASY = "1";
  static NORMAL = "2";
  static HARD = "3";

  // Verbs Tense
  static PRESENT = "PRESENT";
  static PAST = "PAST";
  static PAST_PARTICIPLE = "PAST_PARTICIPLE";
  static ARRAY_VERB_TENSE = ["PRESENT", "PAST", "PAST_PARTICIPLE", "SPANISH"];

  static LETTERS = ["a", "b", "c", "d"];

  static getWrittingExam(
    data: any[],
    optionNumberOfQuestion: string,
    numberOfQuestion: number,
    questionsStart: number,
    questionsEnd: number,
    languajeQuestion: string,
    languajeAnswer: string,
    order: string
  ): Question[] {
    const questions: Question[] = [];

    switch (languajeQuestion) {
      case this.SPANISH:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(data);
        } else if (order === this.ASCENDING) {
          this.sortArray(data, "spanishValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(data, "spanishValue", this.DESCENDING);
        }
        break;
      case this.ENGLISH:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(data);
        } else if (order === this.ASCENDING) {
          this.sortArray(data, "englishValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(data, "englishValue", this.DESCENDING);
        }
        break;
    }

    let numQuestion = 1;
    for (const vocabulary of data) {
      let question = null;

      if (optionNumberOfQuestion === this.ALL_QUESTIONS) {
        if (numQuestion <= numberOfQuestion) {
          question = this.getWritingQuestion(
            languajeQuestion,
            languajeAnswer,
            numQuestion,
            vocabulary
          );
          questions.push(question);
        }
      } else {
        if (numQuestion >= questionsStart && numQuestion <= questionsEnd) {
          question = this.getWritingQuestion(
            languajeQuestion,
            languajeAnswer,
            numQuestion,
            vocabulary
          );
          questions.push(question);
        }
      }
      numQuestion++;
    }

    return questions;
  }

  static getWritingQuestion(
    languajeQuestion: string,
    languajeAnswer: string,
    numQuestion: number,
    vocabulary: any
  ): Question {
    const question = new Question();

    question.idQuestion = numQuestion;

    // Question
    if (languajeQuestion === this.ENGLISH) {
      question.questionText = vocabulary.englishValue;
      question.questionAudio = vocabulary.englishAudio;
    } else if (languajeQuestion === this.SPANISH) {
      question.questionText = vocabulary.spanishValue;
      question.questionAudio = vocabulary.spanishAudio;
    }

    // Answer
    if (languajeAnswer === this.ENGLISH) {
      question.answer = vocabulary.englishValue;
    } else if (languajeAnswer === this.SPANISH) {
      question.answer = vocabulary.spanishValue;
    }
    return question;
  }

  // Multichoice
  static getMultichoiceExam(
    data: any[],
    optionNumberOfQuestion: string,
    numberOfQuestion: number,
    questionsStart: number,
    questionsEnd: number,
    languajeQuestion: string,
    languajeAnswer: string,
    order: string
  ): QuestionMultichoice[] {
    const questions: QuestionMultichoice[] = [];

    switch (languajeQuestion) {
      case this.SPANISH:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(data);
        } else if (order === this.ASCENDING) {
          this.sortArray(data, "spanishValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(data, "spanishValue", this.DESCENDING);
        }
        break;
      case this.ENGLISH:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(data);
        } else if (order === this.ASCENDING) {
          this.sortArray(data, "englishValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(data, "englishValue", this.DESCENDING);
        }
        break;
    }

    const dataArray2 = [].concat(data);

    let numQuestion = 1;
    for (const vocabulary of data) {
      let questionMultichoice = null;

      if (optionNumberOfQuestion === this.ALL_QUESTIONS) {
        if (numQuestion <= numberOfQuestion) {
          questionMultichoice = this.getMultichoiceQuestion(
            languajeQuestion,
            languajeAnswer,
            dataArray2,
            vocabulary,
            numQuestion
          );
          questions.push(questionMultichoice);
        }
      } else {
        if (numQuestion >= questionsStart && numQuestion <= questionsEnd) {
          questionMultichoice = this.getMultichoiceQuestion(
            languajeQuestion,
            languajeAnswer,
            dataArray2,
            vocabulary,
            numQuestion
          );
          questions.push(questionMultichoice);
        }
      }
      numQuestion++;
    }
    return questions;
  }

  static getMultichoiceQuestion(
    languajeQuestion: string,
    languajeAnswer: string,
    dataArray2: any,
    vocabulary: any,
    numQuestion: number
  ): QuestionMultichoice {
    const questionMultichoice = new QuestionMultichoice();
    const question = new Question();

    this.shuffle(dataArray2);

    const numRandom = this.getRandomInt(0, 3);
    question.idQuestion = numQuestion;

    // Question
    if (languajeQuestion === this.ENGLISH) {
      question.questionText = vocabulary.englishValue;
      question.questionAudio = vocabulary.englishAudio;
    } else if (languajeQuestion === this.SPANISH) {
      question.questionText = vocabulary.spanishValue;
      question.questionAudio = vocabulary.spanishAudio;
    }

    let answer = 0;
    let sw = false;
    const options: Option[] = [];

    // console.log('dataArray2', JSON.stringify(dataArray2));
    for (const vocabulary2 of dataArray2) {
      if (answer < 4) {
        // console.log('answer:', answer, 'numRandom:', numRandom);
        if (sw === false && answer === numRandom) {
          question.answer = this.LETTERS[answer];

          // Answer
          if (languajeAnswer === this.ENGLISH) {
            options.push(
              new Option(
                this.LETTERS[answer],
                vocabulary.englishValue.split("/")[0],
                vocabulary.englishAudio
              )
            );
          } else if (languajeAnswer === this.SPANISH) {
            options.push(
              new Option(
                this.LETTERS[answer],
                vocabulary.spanishValue.split("/")[0],
                vocabulary.spanishAudio
              )
            );
          }

          sw = true;
          answer++;
        }

        // Answer
        if (answer < 4) {
          if (languajeAnswer === this.ENGLISH) {
            if (vocabulary2.englishValue !== vocabulary.englishValue) {
              options.push(
                new Option(
                  this.LETTERS[answer],
                  vocabulary2.englishValue.split("/")[0],
                  vocabulary2.englishAudio
                )
              );
            } else {
              answer--;
            }
          } else if (languajeAnswer === this.SPANISH) {
            if (vocabulary2.spanishValue !== vocabulary.spanishValue) {
              options.push(
                new Option(
                  this.LETTERS[answer],
                  vocabulary2.spanishValue.split("/")[0],
                  vocabulary2.spanishAudio
                )
              );
            } else {
              answer--;
            }
          }
        }
        answer++;
        questionMultichoice.options = options;
      } else {
        break;
      }
    }

    if (!question.answer) {
      console.log("numQuestion", numQuestion);
      console.log("answer", answer);
      console.log("sw", sw);
      console.log("numRandom", numRandom);
      console.log("this.LETTERS", this.LETTERS);
      console.log("this.LETTERS[answer]", this.LETTERS[answer]);
      console.log("options", options);
      console.log("--------------");
    }

    questionMultichoice.question = question;
    return questionMultichoice;
  }

  // Writting verbs
  static getWrittingVerbsExam(
    verbs: any[],
    optionNumberOfQuestion: string,
    numberOfQuestion: number,
    questionsStart: number,
    questionsEnd: number,
    questionsVerbs: string,
    answerVerbs: string,
    order: string
  ): Question[] {
    const questions: Question[] = [];

    // Random question
    if (questionsVerbs === this.RANDOM) {
      const numRandom = this.getRandomInt(0, 3);
      questionsVerbs = this.ARRAY_VERB_TENSE[numRandom];
    }

    // Random answer
    while (answerVerbs === this.RANDOM || answerVerbs === questionsVerbs) {
      const numRandomAnswer = this.getRandomInt(0, 3);
      answerVerbs = this.ARRAY_VERB_TENSE[numRandomAnswer];
    }

    switch (questionsVerbs) {
      case this.PRESENT:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "englishPresentValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "englishPresentValue", this.DESCENDING);
        }
        break;
      case this.PAST:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "englishPastValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "englishPastValue", this.DESCENDING);
        }
        break;
      case this.PAST_PARTICIPLE:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "englishPastParticipleValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "englishPastParticipleValue", this.DESCENDING);
        }
        break;
      case this.SPANISH:
        // Sort list
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "spanishValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "spanishValue", this.DESCENDING);
        }
        break;
    }

    let numQuestion = 1;
    for (const verb of verbs) {
      if (optionNumberOfQuestion === this.ALL_QUESTIONS) {
        if (numQuestion <= numberOfQuestion) {
          const question = this.getWrittingVerbsExamQuestion(
            questionsVerbs,
            answerVerbs,
            verb,
            numQuestion
          );
          questions.push(question);
        } else {
          break;
        }
      } else {
        if (numQuestion >= questionsStart && numQuestion <= questionsEnd) {
          const question = this.getWrittingVerbsExamQuestion(
            questionsVerbs,
            answerVerbs,
            verb,
            numQuestion
          );
          questions.push(question);
        }
      }
      numQuestion++;
    }
    return questions;
  }

  static getWrittingVerbsExamQuestion(
    questionsVerbs: string,
    answerVerbs: string,
    verb: any,
    numQuestion: number
  ): Question {
    const question = new Question();

    question.idQuestion = numQuestion;
    let answerTense = "";

    // Questions
    switch (questionsVerbs) {
      case this.PRESENT:
        this.getQuestionVerb(verb, this.PRESENT, question, answerTense);
        break;
      case this.PAST:
        this.getQuestionVerb(verb, this.PAST, question, answerTense);
        break;
      case this.PAST_PARTICIPLE:
        this.getQuestionVerb(verb, this.PAST_PARTICIPLE, question, answerTense);
        break;
      case this.SPANISH:
        this.getQuestionVerb(verb, this.SPANISH, question, answerTense);
        break;
    }

    // Answer
    switch (answerVerbs) {
      case this.PRESENT:
        answerTense = this.PRESENT;
        question.answer = verb.englishPresentValue;
        break;
      case this.PAST:
        answerTense = this.PAST;
        question.answer = verb.englishPastValue;
        break;
      case this.PAST_PARTICIPLE:
        answerTense = this.PAST_PARTICIPLE;
        question.answer = verb.englishPastParticipleValue;
        break;
      case this.SPANISH:
        answerTense = this.SPANISH;
        question.answer = verb.spanishValue;
        break;
    }

    return question;
  }

  static getQuestionVerb(
    verb: any,
    typeVerb: string,
    question: Question,
    answerTense: string
  ): Question {
    switch (typeVerb) {
      case this.SPANISH:
        question.questionText =
          verb.spanishValue + " in " + answerTense.replace("_", " ");
        question.questionAudio = verb.spanishAudio;
        break;
      case this.PRESENT:
        question.questionText =
          verb.englishPresentValue + " in " + answerTense.replace("_", " ");
        question.questionAudio = verb.englishPresentAudio;
        break;
      case this.PAST:
        question.questionText =
          verb.englishPastValue + " in " + answerTense.replace("_", " ");
        question.questionAudio = verb.englishPastAudio;
        break;
      case this.PAST_PARTICIPLE:
        question.questionText =
          verb.englishPastParticipleValue +
          " in " +
          answerTense.replace("_", " ");
        question.questionAudio = verb.englishPastParticipleAudio;
        break;
    }
    return question;
  }

  // Multichoice verbs
  static getMultichoiceVerbsExam(
    verbs: any[],
    optionNumberOfQuestion: string,
    numberOfQuestion: number,
    questionsStart: number,
    questionsEnd: number,
    questionsVerbs: string,
    answerVerbs: string,
    order: string,
    level: string
  ): QuestionMultichoice[] {
    if (optionNumberOfQuestion === this.RANG_OF_QUESTIONS) {
      verbs = verbs.slice(questionsStart - 1, questionsEnd);
    }

    const questions: QuestionMultichoice[] = [];

    // Sort list
    switch (questionsVerbs) {
      case this.PRESENT:
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "englishPresentValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "englishPresentValue", this.DESCENDING);
        }
        break;
      case this.PAST:
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "englishPastValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "englishPastValue", this.DESCENDING);
        }
        break;
      case this.PAST_PARTICIPLE:
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "englishPastParticipleValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "englishPastParticipleValue", this.DESCENDING);
        }
        break;
      case this.SPANISH:
        if (order === this.RANDOM) {
          this.shuffle(verbs);
        } else if (order === this.ASCENDING) {
          this.sortArray(verbs, "spanishValue", this.ASCENDING);
        }
        if (order === this.DESCENDING) {
          this.sortArray(verbs, "spanishValue", this.DESCENDING);
        }
        break;
    }

    const verbsArray2 = [].concat(verbs);
    let numQuestion = 1;

    for (const vocabulary of verbs) {
      let questionMultichoice = null;

      if (numQuestion <= numberOfQuestion) {
        questionMultichoice = this.getMultichoiceQuestionVerb(
          questionsVerbs,
          answerVerbs,
          verbsArray2,
          vocabulary,
          numQuestion,
          level
        );
        questions.push(questionMultichoice);
      }
      numQuestion++;
    }

    return questions;
  }

  static getMultichoiceQuestionVerb(
    questionsVerbs: string,
    answerVerbs: string,
    dataArray2: any,
    vocabulary: any,
    numQuestion: number,
    level: string
  ): QuestionMultichoice {
    const questionMultichoice = new QuestionMultichoice();
    const question = new Question();

    this.shuffle(dataArray2);
    question.idQuestion = numQuestion;

    // Random question
    if (questionsVerbs === this.RANDOM) {
      const numRandom = this.getRandomInt(0, 3);
      questionsVerbs = this.ARRAY_VERB_TENSE[numRandom];
    }

    // Random answer
    while (answerVerbs === this.RANDOM || answerVerbs === questionsVerbs) {
      const numRandomAnswer = this.getRandomInt(0, 3);
      answerVerbs = this.ARRAY_VERB_TENSE[numRandomAnswer];
    }

    // Question
    switch (questionsVerbs) {
      case this.PRESENT:
        this.getQuestionVerb(vocabulary, this.PRESENT, question, answerVerbs);
        break;
      case this.PAST:
        this.getQuestionVerb(vocabulary, this.PAST, question, answerVerbs);
        break;
      case this.PAST_PARTICIPLE:
        this.getQuestionVerb(
          vocabulary,
          this.PAST_PARTICIPLE,
          question,
          answerVerbs
        );
        break;
      case this.SPANISH:
        this.getQuestionVerb(vocabulary, this.SPANISH, question, answerVerbs);
        break;
    }

    // Answer - levels
    switch (level) {
      case this.EASY:
        questionMultichoice.options = this.getMultichoiceQuestionVerbLevelEasy(
          question,
          answerVerbs,
          dataArray2,
          vocabulary
        );
        break;
      case this.NORMAL:
        questionMultichoice.options = this.getMultichoiceQuestionVerbLevelNormal(
          question,
          answerVerbs,
          vocabulary
        );
        break;
      default:
        console.log("entrooo default");
        break;
    }

    questionMultichoice.question = question;
    return questionMultichoice;
  }

  static getMultichoiceQuestionVerbLevelEasy(
    question: Question,
    answerVerbs: string,
    dataArray2: any,
    vocabulary: any
  ): Option[] {
    const numRandom = this.getRandomInt(0, 3);
    let answer = 0;
    let sw = false;
    const options: Option[] = [];

    for (const vocabulary2 of dataArray2) {
      if (answer < 4) {
        // Correct answer
        if (sw === false && answer === numRandom) {
          question.answer = this.LETTERS[answer];

          // Answer
          switch (answerVerbs) {
            case this.PRESENT:
              options.push(
                new Option(
                  this.LETTERS[answer],
                  vocabulary.englishPresentValue.split("/")[0],
                  vocabulary.englishPresentAudio
                )
              );
              break;
            case this.PAST:
              options.push(
                new Option(
                  this.LETTERS[answer],
                  vocabulary.englishPastValue.split("/")[0],
                  vocabulary.englishPastAudio
                )
              );
              break;
            case this.PAST_PARTICIPLE:
              options.push(
                new Option(
                  this.LETTERS[answer],
                  vocabulary.englishPastParticipleValue.split("/")[0],
                  vocabulary.englishPastParticipleAudio
                )
              );
              break;
            case this.SPANISH:
              options.push(
                new Option(
                  this.LETTERS[answer],
                  vocabulary.spanishValue.split("/")[0],
                  vocabulary.spanishAudio
                )
              );
              break;
          }
          sw = true;
          answer++;
        }

        // Answer
        if (answer < 4) {
          switch (answerVerbs) {
            case this.PRESENT:
              if (
                vocabulary2.englishPresentValue !==
                vocabulary.englishPresentValue
              ) {
                options.push(
                  new Option(
                    this.LETTERS[answer],
                    vocabulary2.englishPresentValue.split("/")[0],
                    vocabulary2.englishPresentAudio
                  )
                );
              } else {
                answer--;
              }
              break;
            case this.PAST:
              if (
                vocabulary2.englishPastValue !== vocabulary.englishPastValue
              ) {
                options.push(
                  new Option(
                    this.LETTERS[answer],
                    vocabulary2.englishPastValue.split("/")[0],
                    vocabulary2.englishPastAudio
                  )
                );
              } else {
                answer--;
              }
              break;
            case this.PAST_PARTICIPLE:
              if (
                vocabulary2.englishPastParticipleValue !==
                vocabulary.englishPastParticipleValue
              ) {
                options.push(
                  new Option(
                    this.LETTERS[answer],
                    vocabulary2.englishPastParticipleValue.split("/")[0],
                    vocabulary2.englishPastParticipleAudio
                  )
                );
              } else {
                answer--;
              }
              break;
            case this.SPANISH:
              if (vocabulary2.spanishValue !== vocabulary.spanishValue) {
                options.push(
                  new Option(
                    this.LETTERS[answer],
                    vocabulary2.spanishValue.split("/")[0],
                    vocabulary2.spanishAudio
                  )
                );
              } else {
                answer--;
              }
              break;
          }
        }
        answer++;
      } else {
        break;
      }
    }
    return options;
  }

  static getMultichoiceQuestionVerbLevelNormal(
    question: Question,
    answerVerbs: string,
    vocabulary: any
  ): Option[] {
    // shuffle tenses
    const tenses = [].concat(this.ARRAY_VERB_TENSE);
    this.shuffle(tenses);

    let optionValue = "";
    const options: Option[] = [];

    let answer = 0;
    for (const tense of tenses) {
      // console.log(answer, 'tense', tense, answerVerbs);

      switch (tense) {
        case this.PRESENT:
          options.push(
            new Option(
              this.LETTERS[answer],
              vocabulary.englishPresentValue.split("/")[0],
              vocabulary.englishPresentAudio
            )
          );
          break;
        case this.PAST:
          options.push(
            new Option(
              this.LETTERS[answer],
              vocabulary.englishPastValue.split("/")[0],
              vocabulary.englishPastAudio
            )
          );
          break;
        case this.PAST_PARTICIPLE:
          options.push(
            new Option(
              this.LETTERS[answer],
              vocabulary.englishPastParticipleValue.split("/")[0],
              vocabulary.englishPastParticipleAudio
            )
          );
          break;
        case this.SPANISH:
          options.push(
            new Option(
              this.LETTERS[answer],
              vocabulary.spanishValue.split("/")[0],
              vocabulary.spanishAudio
            )
          );
      }

      if (answerVerbs === tense) {
        // question.answer = this.LETTERS[answer];
        // console.log('answer', this.LETTERS[answer]);
        question.answer = "";
        optionValue = options[options.length - 1].valueText;
      }

      answer++;
    }

    answer = 0;
    for (const option of options) {
      if (optionValue === option.valueText) {
        question.answer += this.LETTERS[answer] + ",";
      }
      answer++;
    }

    // remove the last character
    question.answer = question.answer.slice(0, -1);
    // console.log('answers final', question.answer);

    return options;
  }

  // Utilidades

  static shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static sortArray<T>(array: any, propName: keyof any, order: string) {
    array.sort((a, b) => {
      if (a[propName] < b[propName]) {
        return -1;
      }
      if (a[propName] > b[propName]) {
        return 1;
      }
      return 0;
    });
    if (order === this.DESCENDING) {
      array.reverse();
    }
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // shuffle(array) {
  //     let currentIndex = array.length;
  //     let temporaryValue;
  //     let randomIndex = null;

  //     // While there remain elements to shuffle...
  //     while (0 !== currentIndex) {

  //         // Pick a remaining element...
  //         const randomIndex = Math.floor(Math.random() * currentIndex);
  //         const currentIndex -= 1;

  //         // And swap it with the current element.
  //         temporaryValue = array[currentIndex];
  //         array[currentIndex] = array[randomIndex];
  //         array[randomIndex] = temporaryValue;
  //     }

  //     return array;
  // }
}
