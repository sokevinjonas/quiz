import { Injectable } from '@angular/core';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories(): CategoryInterface[] {
    return [
      {
        id: '1',
        name: 'Javascript',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '2',
        name: 'HTML & CSS',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '3',
        name: 'Python',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '4',
        name: 'Laravel',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '5',
        name: 'Bases de Données',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '6',
        name: 'Sécurité Informatique',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '7',
        name: 'Intelligence Artificielle',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '8',
        name: 'Développement Mobile',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '9',
        name: 'DevOps & Cloud',
        created_at: '2025-03-25T00:00:00.000Z',
      },
      {
        id: '10',
        name: 'Entrepreneuriat & Startup',
        created_at: '2025-03-25T00:00:00.000Z',
      },
    ];
  }
}
