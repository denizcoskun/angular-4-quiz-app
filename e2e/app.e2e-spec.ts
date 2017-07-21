import { QuizAppPage } from './app.po';

describe('quiz-app App', () => {
  let page: QuizAppPage;

  beforeEach(() => {
    page = new QuizAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
