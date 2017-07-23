import { Pipe, PipeTransform } from '@angular/core';
import { Answer } from 'app/models/quiz.model';
@Pipe({
  name: 'shuffle',
  pure: true
})
export class ShufflePipe implements PipeTransform {
  transform(answers: Answer[]): Answer[] {
    return answers.sort(() => {
      return 0.5 - Math.random(); // shuffle order of the answers
    });
  }
}
