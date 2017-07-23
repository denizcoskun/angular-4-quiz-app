import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Quiz, Answering } from 'app/models/quiz.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class QuizService {
  quiz: Quiz;

  constructor(private http: Http) {}

  getQuiz(): Observable<any> {
    return this.http
      .post('/quiz', {})
      .map((response: Response) => response.json());
  }

  postAnswer(answer: Answering): Observable<any> {
   return this.http
      .post('/answer', answer)
  }

}
