import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { empty } from 'rxjs/observable/empty';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';
import { QuizEffects, SEARCH_DEBOUNCE, SEARCH_SCHEDULER } from './effects';
import { QuizService } from 'app/services/quiz.service';
import * as QuizActions from './actions';
import { Observable } from 'rxjs/Observable';
import { Answer, Answering, Question, Quiz } from 'app/models/quiz.model';
import 'rxjs/add/operator/debounceTime';
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }
  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('QuizEffects', () => {
  let effects: QuizEffects;
  let quizService: any;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({app: reducer})],
      providers: [
        QuizEffects,
        {
          provide: QuizService,
          useValue: jasmine.createSpyObj('QuizService', ['getQuiz', 'postAnswer']),
        },
        { provide: Actions, useFactory: getActions },
        { provide: SEARCH_SCHEDULER, useFactory: getTestScheduler },
        { provide: SEARCH_DEBOUNCE, useValue: 10 },
    ],
    });
    quizService = TestBed.get(QuizService);

    effects = TestBed.get(QuizEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('getQuiz', () => {
    it('should return a quiz', () => {
      const answerCorrect = { Index: 0, text: 'Correct'} as Answer;
      const answerIncorrect = { Index: 1, text: 'Incorrect'} as Answer;
      const answers = [answerCorrect, ...Array(3).fill(answerIncorrect)] as Answer[];
      const question = { id: 1, text: 'A', answers: answers } as Question;
      const questions = Array(8).fill(question);
      const quiz = {id: 0, questions: questions};
      const action = new QuizActions.GetQuiz();
      const completion = new QuizActions.GetQuizSuccess(quiz);

      actions$.stream = hot('-a-', { a: action });
      const response = cold('-a-', { a: quiz });
      const expected = cold('--b', { b: completion });
      quizService.getQuiz.and.returnValue(response);
      expect(effects.getQuiz$).toBeObservable(expected);
    });

});

describe('postAnswer', () => {
 it('should dispatch AnswerSuccess action when POST success', () => {
      const answering = { questionId: 0, answerIndex: 0} as Answering;
      const action = new QuizActions.AnswerQuestion(answering);
      const completion = new QuizActions.AnswerSuccess(answering);
      actions$.stream = hot('-a--', { a: action });
      const response = cold('-a--', {a: {}});
      const expected = cold('---b', { b: completion });
      quizService.postAnswer.and.returnValue(response);
      expect(effects.answer$).toBeObservable(expected);
  });
 it('should dispatch AnswerFail action when POST failed', () => {
      const answering = { questionId: 0, answerIndex: 0} as Answering;
      const action = new QuizActions.AnswerQuestion(answering);
      const error = 'Error!';
      const completion = new QuizActions.AnswerFail();

      actions$.stream = hot('-a--', { a: action });
      const response = cold('-#--', {}, error);
      const expected = cold('---c', { c: completion });
      quizService.postAnswer.and.returnValue(response);
      expect(effects.answer$).toBeObservable(expected);
  });
})

describe('getScore', () => {
 it('should dispatch GetScore Action', () => {
    const actions = new ReplaySubject(1);

    actions.next(new QuizActions.GetQuestion());

    effects.getQuestion$.subscribe(result => {
      expect(result).toEqual(new QuizActions.GetScore());
    });
  });
})

});
