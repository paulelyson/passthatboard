import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { QuestionService } from '../../../services/question';
import { IQuestion } from '../../../models/Question';
import { ImageExportService } from '../../../services/image-export';

@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrl: './question.scss',
  standalone: false,
})
export class Question implements OnInit {
  @ViewChildren('articleRef') articleRefs!: QueryList<ElementRef>;
  questions: WritableSignal<IQuestion[]> = signal([]);
  constructor(
    private questionService: QuestionService,
    private imageExportService: ImageExportService,
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe({
      next: (response) => {
        this.questions.set(response.data);
      },
    });
  }

  downloadQuestionAsImage(question: IQuestion, index: number) {
    const articleElement = this.articleRefs.toArray()[index].nativeElement;
    const filename = `question_${question._id}.png`;
    console.log('Downloading question as image:', question._id, articleElement);
    this.imageExportService.downloadImage(articleElement, filename);
  }
}
