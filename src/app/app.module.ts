import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';

// Mock Backend
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { fakeBackendProvider } from './backend/mock.backend';

// Routes
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'quiz',
    component: QuizComponent,
    children: [{ path: ':id', component: QuestionComponent }]
  },
  {
    path: 'score',
    component: ScoreComponent,
    canActivate: [ScoreRouteGuardService]
  }
];

export const appRouting = RouterModule.forRoot(routes);

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from 'app/store/reducer';
import { QuizEffects } from 'app/store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Services
import { QuizService } from './services/quiz.service';
import { StoreService } from './services/store.service';
import { ScoreRouteGuardService } from './services/score.guard.service';

// Components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ScoreComponent } from './components/score/score.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ValidateAnswerDirective } from './directives/validate-answer.directive';
import { ShufflePipe } from './pipes/shuffle.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent,
    QuestionComponent,
    ScoreComponent,
    AnswerComponent,
    ValidateAnswerDirective,
    ShufflePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NoopAnimationsModule,
    MaterialModule,
    appRouting,
    StoreModule.forRoot({ app: reducer }),
    EffectsModule.forRoot([QuizEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    QuizService,
    StoreService,
    ScoreRouteGuardService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
