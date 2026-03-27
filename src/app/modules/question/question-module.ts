import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing-module';
import { Question } from './question/question';
import { QuestionCard } from './question-card/question-card';


@NgModule({
  declarations: [Question, QuestionCard],
  imports: [
    CommonModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
