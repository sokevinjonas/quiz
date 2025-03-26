import { Component, input, OnInit } from '@angular/core';
import { QuestionInterface } from 'src/app/interfaces/question.interface';
import { IonicSlides } from '@ionic/angular/standalone';
@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss'],
  imports: [],
})
export class QuizQuestionsComponent implements OnInit {
  readonly questions = input<QuestionInterface[]>([]);

  swiperModules = [IonicSlides];
  constructor() {}

  ngOnInit() {}
}
