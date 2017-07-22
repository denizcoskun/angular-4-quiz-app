import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import * as reducer from 'app/store/reducer';
import { Observable } from 'rxjs/Observable';
import { Answering } from 'app/models/quiz.model';
import * as QuizActions from './actions';
import { QuizService } from 'app/services/quiz.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { of } from 'rxjs/observable/of';

interface AppState {
  app: reducer.State;
}

@Injectable()
export class QuizEffects {
  @Effect()
  getQuiz$: Observable<Action> = this.actions$
    .ofType(QuizActions.GET_QUIZ)
    .switchMap(() => {
      return this.quizService.getQuiz().map(results => {
        return new QuizActions.GetQuizSuccess(results);
      }).catch(() => of());
    });

  @Effect()
  getQuizSuccess$: Observable<Action> = this.actions$
    .ofType(QuizActions.GET_QUIZ_SUCCESS)
    .map(() => {
      this.router.navigateByUrl('quiz');
      return new QuizActions.GetQuestion();
    });

  @Effect({ dispatch: false })
  getQuestion$ = this.actions$
    .ofType(QuizActions.GET_QUESTION)
    .withLatestFrom(this.store)
    .map(([action, store]) => {
        this.router.navigateByUrl('quiz/' + store.app.currentQuestion.id);
    });

  @Effect()
  answer$ = this.actions$
    .ofType(QuizActions.ANSWER_QUESTION)
    .debounceTime(300)
    .map(toPayload)
    .switchMap((payload: Answering) =>
      this.quizService
        .postAnswer(payload)
        .map(() => new QuizActions.AnswerSuccess(payload))
        .catch(() => of(new QuizActions.AnswerFailure()))
    );

  @Effect()
  answerSuccess$ = this.actions$
    .ofType(QuizActions.ANSWER_SUCCESS)
    .withLatestFrom(this.store)
    .map(([action, store]) => {
      if (store.app.quiz.questions.length === store.app.answers.length ) {
        this.router.navigateByUrl('score');
        return new QuizActions.GetScore();
      } else {
      return new QuizActions.GetQuestion();
      }
    });

  @Effect()
  answerFailed$ = this.actions$
    .ofType(QuizActions.ANSWER_FAILURE)
    .map(() => new QuizActions.GetQuestion());

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
