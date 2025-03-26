import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonItem,
  IonChip,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  add,
  star,
  starOutline,
  optionsOutline,
} from 'ionicons/icons';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonLabel,
    IonChip,
    IonItem,
    IonButtons,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class QuizPage implements OnInit {
  private quizService = inject(QuizService);
  private router = inject(Router);

  questions = computed(() => this.quizService.questions());
  currendIndex = signal<number>(0);
  IsReview = signal<boolean>(false);
  // Récupère les paramètres du quiz
  quizSetting = computed(() => this.quizService.quizSetting);
  constructor() {
    addIcons({
      arrowBack,
      optionsOutline,
      add,
      star,
      starOutline,
    });
  }

  ngOnInit() {}
  gotBackAlert() {
    this.router.navigate(['/home']);
  }

  markAnswer() {}

  setIsReview(val: boolean) {
    this.IsReview.set(val);
  }
}
