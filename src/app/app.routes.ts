import { Routes } from '@angular/router';

export const routes: Routes = [
 {
  path: 'question',
  loadChildren: () => import('./modules/question/question-module').then(m => m.QuestionModule)
 }
];
