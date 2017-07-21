import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Quiz, Answering } from 'app/models/quiz.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class QuizService {
  quiz: Quiz;

  constructor(private http: HttpClient) {}

  getQuiz(): Observable<Quiz> {
    return this.http
      .post<Quiz>('http://localhost:3000/quiz', {});
  }

  postAnswer(answer: Answering): Observable<Answering> {
   return this.http
      .post<Answering>('http://localhost:3000/answer', answer);
  }
}
