import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  quizSetting = {
    questionLimit: 100,
    correcAnswerPoint: 1,
    wrongAnswerPoint: -0.25,
    defaulTime: '00:00',
  };
  constructor() {}

  fetchQuestions(formValues: {
    category: string;
    difficulty: string;
    type: string;
  }) {
    return [];
  }
}
