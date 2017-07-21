import { Injectable } from '@angular/core';
import { Question, Answer, Answering } from 'app/models/quiz.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as reducer from 'app/store/reducer';
import * as QuizActions from 'app/store/actions';

@Injectable()

export class StoreService {
  question;

  constructor(private store: Store<{quiz: reducer.State}>) {}

  getQuiz() {
    this.store.dispatch(new QuizActions.GetQuiz());
  }

  postAnswer(answer: Answering) {
    this.store.dispatch(new QuizActions.AnswerQuestion(answer));
  }

  getQuestion() {
    this.store.dispatch(new QuizActions.GetQuestion());
  }
}
