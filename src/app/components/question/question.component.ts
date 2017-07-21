import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'app/models/quiz.model'
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'app/services/store.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, OnDestroy {
  questionId: string;
  question: Question;
  constructor(private route: ActivatedRoute, private router: Router, private store: StoreService) { }

  ngOnInit() {
  }

  answer() {
    this.store.postAnswer({questionId: 0, answerIndex: 0});
  }

  ngOnDestroy() {
  }

}
