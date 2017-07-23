import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'app/services/store.service';
import {  } from 'app';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.getQuiz(); // when route is /quiz fetch the quiz from server
  }

  ngOnDestroy() {
  }


}
