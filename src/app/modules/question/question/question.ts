import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { QuestionService } from '../../../services/question';
import { IQuestion } from '../../../models/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrl: './question.scss',
  standalone: false,
})
export class Question implements OnInit {
  questions: WritableSignal<IQuestion[]> = signal([]);
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe({
      next: (response) => {
        this.questions.set(response.data);
      },
    });
  }
}
