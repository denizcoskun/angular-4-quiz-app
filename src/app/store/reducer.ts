import { Quiz, Question, Answering } from 'app/models/quiz.model';

import * as QuizActions from './actions'

export interface State {
    loading: boolean; // loading indicator for POST events
    quiz: Quiz;
    questionQueue: Question[]; // questions that will be answered
    currentQuestion: Question; // question that is displayed on screen
    answers: Answering[]; // answers are stored to show the score at the end
};

const initialState: State =  {
    loading: false,
    quiz: null,
    questionQueue: [],
    currentQuestion: null,
    answers: [],
};

export function reducer(state = initialState, action: QuizActions.Actions): State {
    switch (action.type) {
        case QuizActions.GET_QUIZ: {
          return {
                ...state,
                loading: true
            }
        }
        case QuizActions.GET_QUIZ_SUCCESS: {
          return {
                ...state,
                loading: false,
                quiz: action.payload,
                questionQueue: action.payload.questions
            }
        }

        case QuizActions.GET_QUESTION: {
          return {
                ...state,
                currentQuestion: state.questionQueue[0], // first question in the queue
                questionQueue: state.questionQueue.filter((item, index) => index > 0) // removing first element in the queue
            }
        }
        case QuizActions.ANSWER_QUESTION: {
          return {
                ...state,
                loading: true,
            }
        }
        case QuizActions.ANSWER_SUCCESS: {
          return {
                ...state,
                loading: false,
                answers: [...state.answers, action.payload]
            }
        }
        case QuizActions.ANSWER_FAILURE: {
          return {
                ...state,
                loading: false,
                questionQueue: [...state.questionQueue, state.currentQuestion]
            }
        }
        default: {
            return state;
        }
    }
}
