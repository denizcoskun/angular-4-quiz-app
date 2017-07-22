import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StoreService } from './store.service';

@Injectable()

export class ScoreRouteGuardService implements CanActivate {

    constructor(private store: StoreService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.store.quizStatus.map(isFinished => {
            if (isFinished) {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        })
    }
}
