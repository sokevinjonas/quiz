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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline, cog, time } from 'ionicons/icons';
import { QuizService } from '../services/quiz/quiz.service';
import { CategoryService } from '../services/category/category.service';
import { CategoryInterface } from '../interfaces/category.interface';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
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
    RouterLink,
  ],
})
export class HomePage {
  private formBuilder = inject(FormBuilder);
  private quizService = inject(QuizService);
  private categoriesService = inject(CategoryService);
  private router = inject(Router);

  // Récupère les paramètres du quiz
  quizSetting = computed(() => this.quizService.quizSetting);

  // Déclaration des signaux réactifs
  form = signal<FormGroup | null>(null);
  isLoading = signal<boolean>(false);
  categories = signal<CategoryInterface[]>([]);

  constructor() {
    this.initForm(); // Initialise le formulaire
    addIcons({ time, arrowForwardCircleOutline, cog }); // Ajoute les icônes utilisées
  }

  /**
   * Initialise le formulaire du quiz
   */
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

  /**
   * Valide le nombre de questions pour qu'il ne dépasse pas une limite maximale
   */
  maxQuestionCountValidator(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== null && control.value > max
        ? { maxLimit: `Le nombre de questions ne doit pas dépasser ${max}` }
        : null;
    };
  }

  /**
   * Vérifie que la durée du quiz n'est pas de 00:00
   */
  durationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.parseDuration(control.value) === 0
        ? { invalidTime: 'La durée ne peut pas être 00:00' }
        : null;
    };
  }

  /**
   * Convertit une durée ISO en millisecondes
   */
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

  /**
   * Active ou désactive le loader
   */
  setLoader(value: boolean) {
    this.isLoading.set(value);
  }

  /**
   * Gestion du clic sur le bouton de démarrage du quiz
   */
  onClick() {
    if (this.form()?.invalid) {
      this.form()?.markAllAsTouched();
      return;
    }
    const formValues = this.form()?.value;

    try {
      this.setLoader(true);
      this.quizService.fetchQuestions(formValues); // Correction de "fechtQuestions"
      this.router.navigate(['/quiz']);
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoader(false);
    }
  }

  /**
   * Récupère les catégories de quiz
   */
  getCategories() {
    const data = this.categoriesService.getCategories();
    this.categories.set(data);
  }

  /**
   * Convertit une heure par défaut en objet Date
   */
  getDataFromTime(defaultTime: string): Date {
    const [hours, minutes] = defaultTime.split(':').map(Number);
    return new Date(1970, 0, 1, hours, minutes);
  }

  /**
   * Génère un timestamp ISO basé sur l'heure par défaut
   */
  toIsoDateTime(): string {
    const defaultTime = this.quizSetting().defaulTime;
    const date = this.getDataFromTime(defaultTime);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${dayOfMonth}T${hours}:${minutes}:00`;
  }
}
