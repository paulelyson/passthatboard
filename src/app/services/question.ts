import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../models/Question';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { QuestionFilter } from '../models/QuestionFilter';

interface ApiResponse {
  success: boolean;
  data: IQuestion[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(filter: QuestionFilter) {
    let params = new HttpParams({
      fromObject: {
        programs: [filter.program],
        page: filter.page,
        limit: filter.pageSize,
        major: filter.major,
        program: filter.program,
      },
    });
    return this.http.get<ApiResponse>(`${environment.apiUrl}/question`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
