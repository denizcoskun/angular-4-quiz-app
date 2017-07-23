import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { Quiz } from 'app/models/quiz.model';
import { data } from './quiz';
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {

    let turn = 0;

    backend.connections.subscribe((connection: MockConnection) => {

            if (connection.request.url.endsWith('/quiz') &&
                connection.request.method === RequestMethod.Post) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 201,
                    body: data
                })));

                return;
            }

            if (connection.request.url.endsWith('/answer') &&
                connection.request.method === RequestMethod.Post) {
                if (turn === 3) {
                    connection.mockError(new Error('Error'));
                    turn = 0;
                } else {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 201,
                    })));
                    turn++;
                }
                return;
            }
    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
