import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { Quiz, Question, Answer, Answering } from 'app/models/quiz.model';

export const GET_QUIZ = 'Get Quiz';
export const GET_QUIZ_SUCCESS = 'Get Quiz Success';
export const GET_QUIZ_FAILURE = 'Get Quiz Success';

export const GET_QUESTION = 'Get Question from Quiz';

export const ANSWER_QUESTION = 'Answer the Question';
export const ANSWER_SUCCESS = 'Answer Success';
export const ANSWER_FAILURE = 'Answer Failure';

export const GET_SCORE = 'Get Score';


export class GetQuiz implements Action {
    readonly type = GET_QUIZ;
    constructor() { };
}

export class GetQuizSuccess implements Action { // will not be implemented for the trial.
    readonly type = GET_QUIZ_SUCCESS;
    constructor(public payload: Quiz) { };
}

export class GetQuestion implements Action {
    readonly type = GET_QUESTION;
    constructor() { };
}

export class AnswerQuestion implements Action {
    readonly type = ANSWER_QUESTION;
    constructor(public payload: Answering) { };
}

export class AnswerSuccess implements Action {
    readonly type = ANSWER_SUCCESS;
    constructor(public payload: Answering) { };
}

export class AnswerFailure implements Action {
    readonly type = ANSWER_FAILURE;
    constructor() { };
}

export class GetScore implements Action {
    readonly type = GET_SCORE;
    constructor() { };
}

export type Actions =
  | GetQuiz
  | GetQuizSuccess
  | GetQuestion
  | AnswerQuestion
  | AnswerSuccess
  | AnswerFailure
  | GetScore;
