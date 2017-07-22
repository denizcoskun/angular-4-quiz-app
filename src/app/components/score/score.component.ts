import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/services/store.service';
import { Observable } from 'rxjs/Observable'
import { Answering } from 'app/models/quiz.model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  score: Observable<number>;
  scoreDetails: Observable<Answering[]>;

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.scoreDetails = this.store.quizScoreDetails;
    this.score = this.store.quizScore;
  }

}
