import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, RequestMethod, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { QuizService } from './quiz.service';

import { MockBackend } from '@angular/http/testing';

const mockResponse = {
      id: 0,
      questions: [
        {
          id: 1,
          text: 'Quis sit dolor tempor fugiat fugiat culpa qui?',
          answers: [
            {
              Index: 0,
              text: 'Excepteur'
            },
            {
              Index: 1,
              text: 'Proident'
            },
            {
              Index: 2,
              text: 'Id non'
            },
            {
              Index: 3,
              text: 'Eiusmod'
            }
          ]
        },
        {
          id: 2,
          text: 'Culpa ad Lorem nostrud labore officia irure ea aute?',
          answers: [
            {
              Index: 0,
              text: 'Commodo'
            },
            {
              Index: 1,
              text: 'Sint minim'
            },
            {
              Index: 2,
              text: 'Proident'
            },
            {
              Index: 3,
              text: 'Ullamco'
            }
          ]
        },
        {
          id: 3,
          text: 'Aliquip elit in nostrud cupidatat?',
          answers: [
            {
              Index: 0,
              text: 'Pariatur'
            },
            {
              Index: 1,
              text: 'Cillum'
            },
            {
              Index: 2,
              text: 'Sunt qui'
            },
            {
              Index: 3,
              text: 'Consequat'
            }
          ]
        },
        {
          id: 4,
          text: 'Sint reprehenderit aute aliquip excepteur?',
          answers: [
            {
              Index: 0,
              text: 'Mollit'
            },
            {
              Index: 1,
              text: 'Ipsum veniam'
            },
            {
              Index: 2,
              text: 'Magna anim'
            },
            {
              Index: 3,
              text: 'Reprehenderit'
            }
          ]
        },
        {
          id: 5,
          text: 'Deserunt esse nisi do est in excepteur tempor?',
          answers: [
            {
              Index: 0,
              text: 'Id ullamco'
            },
            {
              Index: 1,
              text: 'Officia'
            },
            {
              Index: 2,
              text: 'Deserunt'
            },
            {
              Index: 3,
              text: 'Incididunt'
            }
          ]
        },
        {
          id: 6,
          text: 'Eu ipsum fugiat enim laboris magna velit cillum aliqua?',
          answers: [
            {
              Index: 0,
              text: 'Lorem'
            },
            {
              Index: 1,
              text: 'Dolore'
            },
            {
              Index: 2,
              text: 'Culpa'
            },
            {
              Index: 3,
              text: 'Fugiat'
            }
          ]
        },
        {
          id: 7,
          text: 'Amet deserunt velit incididunt velit?',
          answers: [
            {
              Index: 0,
              text: 'Occaecat.'
            },
            {
              Index: 1,
              text: 'Esse ad'
            },
            {
              Index: 2,
              text: 'Quis sit'
            },
            {
              Index: 3,
              text: 'Veniam'
            }
          ]
        },
        {
          id: 8,
          text: 'Nisi consectetur qui nostrud aute quis irure in?',
          answers: [
            {
              Index: 0,
              text: 'Tempor'
            },
            {
              Index: 1,
              text: 'Exercitation'
            },
            {
              Index: 2,
              text: 'Ex non'
            },
            {
              Index: 3,
              text: 'Officia'
            }
          ]
        }
      ]
};

const mockAnswer = {
    questionId: 1,
    answerIndex: 0
}

describe('QuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuizService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    });
  });

  it(
    'should construct',
    async(
      inject([QuizService, MockBackend], (service, mockBackend) => {
        expect(service).toBeDefined();
      })
    )
  );

  describe('getQuiz', () => {
    it(
      'should get quiz',
      async(
        inject([QuizService, MockBackend], (service, mockBackend) => {
          mockBackend.connections.subscribe(conn => {
            conn.mockRespond(
              new Response(
                new ResponseOptions({ body: JSON.stringify(mockResponse) })
              )
            );
          });

          const result = service.getQuiz();
          result.subscribe(res => {
            expect(res).toEqual(mockResponse);
          });
        })
      )
    );
  });

  describe('postAnswer', () => {
    it(
      'should post answer',
      async(
        inject([QuizService, MockBackend], (service, mockBackend) => {
          mockBackend.connections.subscribe(conn => {

            conn.mockRespond(
              new Response(
                new ResponseOptions({ status: 201 })
              )
            );
            expect(conn.request.method).toBe(RequestMethod.Post);

          });

          const result = service.postAnswer(mockAnswer);
          result.subscribe(res => {
            expect(res.status).toEqual(201);
          });
        })
      )
    );
  });
});
