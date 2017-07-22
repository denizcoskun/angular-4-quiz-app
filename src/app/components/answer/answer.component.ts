import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  isSelected = false;
  @Input() answer;
  @Input() isAnswered;
  @Output() submit: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  submitAnswer() {
    this.isSelected = true;
    this.submit.emit(this.answer.Index);
  }
}
