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
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionFilter } from '../../../models/QuestionFilter';

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
  filter = new QuestionFilter();
  constructor(
    private questionService: QuestionService,
    private imageExportService: ImageExportService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });

    this.questionService.getQuestions(this.filter).subscribe({
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

  queryParamsHandling(params: Params) {
    this.filter.program = params['program'] || 'Education';
    this.filter.major = params['major'] || '';
    this.filter.coverage = params['coverage'] ? (Array.isArray(params['coverage']) ? params['coverage'] : [params['coverage']]) : [];
    this.filter.page = params['page'] ? +params['page'] : 1;
    this.filter.pageSize = params['pageSize'] ? +params['pageSize'] : 25;
  }
}
