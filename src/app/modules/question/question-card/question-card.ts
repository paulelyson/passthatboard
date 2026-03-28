import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss',
  standalone: false,
})
export class QuestionCard {
  @Input() question: string = '';
  @Input() answer: string = '';
  @Input() showAnswer: boolean = true;
  @Input() choices: string[] = [];
  selectedChoice: string | null = null;

  selectChoice(choice: string) {
    this.selectedChoice = choice;
    this.showAnswer = true;
  }
}
