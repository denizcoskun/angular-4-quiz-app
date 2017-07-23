export interface Quiz {
  id: number;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  Index: number;
}

export interface Answering {
  questionId: number;
  answerIndex: number;
}

