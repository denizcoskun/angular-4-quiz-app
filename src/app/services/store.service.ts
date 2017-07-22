import { Injectable } from '@angular/core';
import { Question, Answer, Answering } from 'app/models/quiz.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as reducer from 'app/store/reducer';
import * as QuizActions from 'app/store/actions';

@Injectable()

export class StoreService {
  question;

  constructor(private store: Store<{app: reducer.State}>) {}

  getQuiz() {
    this.store.dispatch(new QuizActions.GetQuiz());
  }

  postAnswer(answer: Answering) {
    this.store.dispatch(new QuizActions.AnswerQuestion(answer));
  }

  getQuestion() {
    this.store.dispatch(new QuizActions.GetQuestion());
  }

  get quizProgress(): Observable<any> {
    return this.store.select(reducer.selectQuizProgress);
  }

  get currentQuestion(): Observable<Question> {
    return this.store.select(reducer.selectQuestion);
  }

  get quizStatus(): Observable<boolean> {
    return this.store.select(reducer.selectQuizStatus);
  }

  get quizScoreDetails(): Observable<Answering[]> {
    return this.store.select(reducer.selectScoreDetails);
  }

  get quizScore(): Observable<number> {
    return this.store.select(reducer.selectScore);
  }
}
