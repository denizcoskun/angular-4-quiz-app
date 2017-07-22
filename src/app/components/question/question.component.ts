import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'app/models/quiz.model'
import { StoreService } from 'app/services/store.service'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import { QuizEffects } from 'app/store/effects';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, OnDestroy {
  questionId: string;
  question: Question;
  isAnswered: Subject<string> = new Subject<string>();
  destroy$: Subject<{}> = new Subject(); // Managing Unsubscription

  constructor(private store: StoreService, private quizEffects: QuizEffects) {
    this.store.currentQuestion
    .do(() => this.isAnswered.next(null))
    .takeUntil(this.destroy$)
    .subscribe(q => this.question = q);
  }

  ngOnInit() {
    this.quizEffects.answerFailed$
    .takeUntil(this.destroy$)
    .map(() => this.isAnswered.next('failed')).subscribe();
  }

  submitAnswer($event) {
    this.isAnswered.next('success');
    this.store.postAnswer({questionId: this.question.id, answerIndex: $event});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.isAnswered.unsubscribe();
    this.destroy$.unsubscribe();
  }


}
