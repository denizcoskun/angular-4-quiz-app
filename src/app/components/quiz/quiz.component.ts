import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/services/store.service'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.getQuiz();
  }


}
