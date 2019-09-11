import nock = require('nock');
//const querystring = require('querystring');

import * as Constants from './rasa.constants.spec';
import { RasaUriParts } from './rasa.constants.spec';

interface NockPostReplyParams {
    uri: string;
    code: number;
    body?: any;
    headers?: nock.HttpHeaders;
    requestBody: any;
}

function AddGetReplyToNock(nock: nock.Scope, nockPostParams: NockPostReplyParams) {
    return nock.post(nockPostParams.uri,nockPostParams.requestBody)
                .reply(nockPostParams.code,
                    nockPostParams.body);
}

var rasaCases: NockPostReplyParams[] = [
    { 
      uri: '/parse',
      requestBody: {q: Constants.QUERY_204},
      code: 200,
      headers: undefined
    }
];

const rasaMock = function(basePath: string) {

    var cases: NockPostReplyParams[] = rasaCases;

    cases.reduce((scope, current) => AddGetReplyToNock(scope, current), nock(basePath));

    for (let mockUrl of nock.pendingMocks()) {
      console.error('url: %j', mockUrl);
    }

};

export default rasaMock;