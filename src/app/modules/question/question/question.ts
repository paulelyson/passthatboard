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
  showAllAnswers: boolean = false;
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
    const filename = `question_${question._id}${this.showAllAnswers ? '_answer' : ''}.png`;
    console.log('Downloading question as image:', question._id, articleElement);
    this.imageExportService.downloadImage(articleElement, filename);
  }

  downloadAllQuestionsAsImages() {
    this.articleRefs.forEach(async (articleRef, index) => {
      const question = this.questions()[index];
      const filename = `question_${question._id}${this.showAllAnswers ? '_answer' : ''}.png`;
      // const filename = `question_${question._id}.png`;
      console.log('Downloading question as image:', question._id, articleRef.nativeElement);
      await this.imageExportService.downloadImage(articleRef.nativeElement, filename);
      await this.delay(100);
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
