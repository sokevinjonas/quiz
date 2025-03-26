import { Injectable, signal } from '@angular/core';
import { QuestionInterface } from 'src/app/interfaces/question.interface';
import { questionsMock } from 'src/app/mocks/questions.mock';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  questions = signal<QuestionInterface[] | null>(null);
  examDuration = signal<any>('null');
  timeUp = signal<boolean>(false);

  quizSetting = {
    questionLimit: 100,
    correcAnswerPoint: 1,
    wrongAnswerPoint: 0.25,
    defaulTime: '00:00',
  };
  constructor() {}

  fetchQuestions(formValues: {
    question_count: number;
    category_id: string;
    duration: string;
  }) {
    let filterQuestions = questionsMock.filter(
      (q) => q.category_id === formValues.category_id
    );
    const selectedQuestions = filterQuestions.slice(
      0,
      formValues.question_count
    );
    this.questions.set(selectedQuestions);
    console.log(this.questions.set(selectedQuestions));

    return selectedQuestions;
    try {
    } catch (e) {
      console.error('Error fetching questions', e);
      return null;
    }
  }
  resetQuiz() {
    this.questions.set(null);
    this.examDuration.set(null);
    this.timeUp.set(false);
  }
}
