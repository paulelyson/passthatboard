import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Question } from './question/question';

const routes: Routes = [
  {
    path: '',
    component: Question
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
