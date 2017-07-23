import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import { Quiz, Question, Answer, Answering } from 'app/models/quiz.model';

export const GET_QUIZ = 'Get Quiz';
export const GET_QUIZ_SUCCESS = 'Get Quiz Success';
export const GET_QUIZ_FAIL = 'Get Quiz Fail';

export const GET_QUESTION = 'Get Question from Quiz';
export const GET_QUESTION_SUCCESS = 'Get Question Success';
export const GET_QUESTION_FAIL = 'Get Question Fail';

export const ANSWER_QUESTION = 'Answer the Question';
export const ANSWER_SUCCESS = 'Answer Success';
export const ANSWER_FAIL = 'Answer Fail';

export const GET_SCORE = 'Get Score';


export class GetQuiz implements Action {
    readonly type = GET_QUIZ;
    constructor() { };
}

export class GetQuizSuccess implements Action {
    readonly type = GET_QUIZ_SUCCESS;
    constructor(public payload: Quiz) { };
}

export class GetQuizFail implements Action {
    readonly type = GET_QUIZ_FAIL;
    constructor() { };
}

export class GetQuestion implements Action {
    readonly type = GET_QUESTION;
    constructor() { };
}

export class GetQuestionSuccess implements Action {
    readonly type = GET_QUESTION_SUCCESS;
    constructor(public payload: Question) { };
}

export class GetQuestionFail implements Action {
    readonly type = GET_QUESTION_FAIL;
    constructor(public payload: boolean) { };
}

export class AnswerQuestion implements Action {
    readonly type = ANSWER_QUESTION;
    constructor(public payload: Answering) { };
}

export class AnswerSuccess implements Action {
    readonly type = ANSWER_SUCCESS;
    constructor(public payload: Answering) { };
}

export class AnswerFail implements Action {
    readonly type = ANSWER_FAIL;
    constructor() { };
}

export class GetScore implements Action {
    readonly type = GET_SCORE;
    constructor() { };
}

export type Actions =
  | GetQuiz
  | GetQuizSuccess
  | GetQuizFail
  | GetQuestion
  | GetQuestionSuccess
  | GetQuestionFail
  | AnswerQuestion
  | AnswerSuccess
  | AnswerFail
  | GetScore;
