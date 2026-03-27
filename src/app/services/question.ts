import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../models/Question';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

interface ApiResponse {
  success: boolean;
  data: IQuestion[];
  message: string;

}

@Injectable({
  providedIn: 'root',
})
export class Question {
  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/questions`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}
