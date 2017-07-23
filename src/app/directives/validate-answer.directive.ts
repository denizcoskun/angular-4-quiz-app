import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validateAnswer]'
})
export class ValidateAnswerDirective {

  isCorrect: string = null;

  @Input() answer;

  @Input('isAnswered') set isAnswered(status) {
    // to motive user to click again in case http 400 is received at the last question
    if (status === 'failed')  {
      this.removeHighlight();
    }
  }

  @HostListener('click', ['$event']) onClick() {
   this.highlight();
  }

  constructor(private el: ElementRef) {
  }

  highlight() {
    if (!this.answer) {
      return
    }
    this.el.nativeElement.className =  this.answer.Index === 0 ? 'true' : 'false';
  }

  removeHighlight() {
     this.el.nativeElement.className = '';
  }
}
