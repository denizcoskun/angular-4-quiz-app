import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';

// Components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';


// Routes
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'quiz', component: QuizComponent, children: [
    { path: ':id', component: QuestionComponent },
    { path: 'scoreboard', component: QuestionComponent}
  ]},
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

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuizComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MaterialModule,
    appRouting,
    StoreModule.forRoot({quiz: reducer}),
    EffectsModule.forRoot([QuizEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [QuizService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
