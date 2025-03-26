import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonText,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
  IonLabel,
  IonDatetimeButton,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline, time } from 'ionicons/icons';
import { QuizService } from '../services/quiz/quiz.service';
import { CategoryService } from '../services/category/category.service';
import { CategoryInterface } from '../interfaces/category.interface';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonSpinner,
    IonIcon,
    IonButton,
    IonDatetimeButton,
    IonLabel,
    IonModal,
    IonDatetime,
    NgIf,
    IonText,
    IonInput,
    IonItem,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonContent,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class HomePage {
  private formBuilder = inject(FormBuilder);
  private quiService = inject(QuizService);
  private categoriesService = inject(CategoryService);
  private router = inject(Router);

  quizSetting = computed(() => this.quiService.quizSetting);
  form = signal<FormGroup | null>(null);
  isLoading = signal<boolean>(false);
  categories = signal<CategoryInterface[]>([]);

  constructor() {
    this.initForm();
    addIcons({
      time,
      arrowForwardCircleOutline,
    });
  }
  initForm() {
    const form = this.formBuilder.group({
      question_count: [
        null,
        [
          Validators.required,
          Validators.min(1),
          this.maxQuestionCountValidator(this.quizSetting().questionLimit),
        ],
      ],
      category_id: [null, [Validators.required]],
      duration: [
        this.toIsoDateTime(),
        [Validators.required, this.durationValidator()],
      ],
    });
    this.form.set(form);
  }
  maxQuestionCountValidator(max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== null && control.value > max
        ? { maxLimit: `Le nombre de question ne doit pas dépasser ${max}` }
        : null;
    };
  }
  durationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.parseDuration(control.value) === 0
        ? { invalidTime: 'La durée ne peut pas être 00:00' }
        : null;
    };
  }
  parseDuration(duration: string): number {
    if (duration && !duration.includes('T')) return 0;

    const timePart = duration.split('T')[1];
    if (!timePart) return 0;

    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return (
      (hours || 0) * 3600 * 1000 +
      (minutes || 0) * 60 * 1000 +
      (seconds || 0) * 1000
    );
  }

  ngOnInit() {
    this.getCategories();
  }
  setLoader(value: boolean) {
    this.isLoading.set(value);
  }
  onClick() {
    if (this.form()?.invalid) {
      this.form()?.markAllAsTouched();
      return;
    }
    const formValues = this.form()?.value;
    try {
      this.setLoader(true);
      this.quiService.fechtQuestions(formValues);
      this.setLoader(false);
      this.router.navigate(['/quiz']);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoader(false);
    }
  }

  getCategories() {
    const data = this.categoriesService.getCategories();
    this.categories.set(data);
  }

  getDataFromTime(defaulTime: string): Date {
    const [hours, minutes] = defaulTime.split(':').map(Number);
    return new Date(1970, 0, 1, hours, minutes);
  }
  toIsoDateTime(): string {
    const defaulTime = this.quizSetting().defaulTime;
    const date = this.getDataFromTime(defaulTime);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${dayOfMonth}T${hours}:${minutes}:00`;
  }
}
