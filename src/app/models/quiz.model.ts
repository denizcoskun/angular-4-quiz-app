export interface Quiz {
  id: number;
  questions: Question[]; // questions.length = 8
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[]; // answers.length = 4
}

export interface Answer {
  text: string;
  Index: number;
}

export interface Answering {
  questionId: number;
  answerIndex: number;
}

