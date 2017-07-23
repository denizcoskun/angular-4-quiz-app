import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import * as reducer from 'app/store/reducer';
import { Observable } from 'rxjs/Observable';
import { Answering, Question } from 'app/models/quiz.model';
import * as QuizActions from './actions';
import { QuizService } from 'app/services/quiz.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);



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
      }).catch(() => of(new QuizActions.GetQuizFail()) );
    });

  @Effect()
  getQuizSuccess$: Observable<Action> = this.actions$
    .ofType(QuizActions.GET_QUIZ_SUCCESS)
    .map(() => {
      this.router.navigateByUrl('quiz');
      return new QuizActions.GetQuestion();
    });

  @Effect()
  getQuestion$ = this.actions$
    .ofType(QuizActions.GET_QUESTION)
    .withLatestFrom(this.store)
    .map(([action, store]) => {
      const questionQueue = store.app.questionQueue;
      // Check if there is question in the queue
       if (questionQueue.length > 0 && typeof questionQueue[0].id === 'number') {
         return new QuizActions.GetQuestionSuccess(questionQueue[0])
       } else {
         return new QuizActions.GetScore()
       }
  });

  @Effect({ dispatch: false })
  getQuestionSuccess$ = this.actions$
    .ofType(QuizActions.GET_QUESTION_SUCCESS)
    .map(toPayload)
    .map((question: Question) => {
        this.router.navigateByUrl('quiz/' + question.id);
  });

  @Effect({ dispatch: false })
  getQuestionFail$ = this.actions$
    .ofType(QuizActions.GET_QUESTION_FAIL)
    .map(toPayload)
    .map((payload: boolean) => {
        this.router.navigateByUrl(payload ? 'quiz/score' : 'quiz');
  });

  @Effect()
  answer$ = this.actions$
    .ofType(QuizActions.ANSWER_QUESTION)
    .debounceTime(this.debounce || 300, this.scheduler || async)
    .map(toPayload)
    .switchMap((payload: Answering) =>
      this.quizService
        .postAnswer(payload)
        .map(() => new QuizActions.AnswerSuccess(payload))
        .catch(() => of(new QuizActions.AnswerFail()))
    );

  @Effect()
  answerSuccess$ = this.actions$
    .ofType(QuizActions.ANSWER_SUCCESS)
    .withLatestFrom(this.store)
    .map(([action, store]) => {
      // if all questions answered
      if (store.app.progress === store.app.quiz.questions.length) {
        this.router.navigateByUrl('score');
        return new QuizActions.GetScore();
      } else {
      return new QuizActions.GetQuestion();
      }
    });

  @Effect()
  answerFailed$ = this.actions$
    .ofType(QuizActions.ANSWER_FAIL)
    .map(() => new QuizActions.GetQuestion());

  constructor(
    private actions$: Actions,
    private quizService: QuizService,
    private router: Router,
    private store: Store<AppState>,
    @Optional()
    @Inject(SEARCH_DEBOUNCE) public debounce: number = 300,
    /**
       * You inject an optional Scheduler that will be undefined
       * in normal application usage, but its injected here so that you can mock out
       * during testing using the RxJS TestScheduler for simulating passages of time.
       */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}

}
