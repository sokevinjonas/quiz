import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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
  form = signal<FormGroup | null>(null);
  isLoading = signal<boolean>(false);
  categories = signal<any[]>([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
  ]);
  constructor() {
    this.initForm();
    addIcons({
      time,
      arrowForwardCircleOutline,
    });
  }

  initForm() {
    const form = this.formBuilder.group({
      question_count: [null, [Validators.required, Validators.minLength(1)]],
      category_id: [null, [Validators.required]],
      duration: [null, [Validators.required]],
    });
    this.form.set(form);
  }
  onClick() {}
}
