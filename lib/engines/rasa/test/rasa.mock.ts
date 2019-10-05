import nock = require('nock');

import * as Constants from './rasa.constants.spec';

interface NockPostReplyParams {
    uri: string;
    code: number;
    body?: any;
    headers?: nock.RequestHeaderMatcher;
    requestBody: any;
    replyWithError?: string;
}

function AddPostReplyToNock(nock: nock.Scope, nockPostParams: NockPostReplyParams) {
  if (nockPostParams.replyWithError){
    return nock.post(nockPostParams.uri,nockPostParams.requestBody)
                .replyWithError(nockPostParams.replyWithError);
  } else {
    return nock.post(nockPostParams.uri,nockPostParams.requestBody)
                .reply(nockPostParams.code,
                    nockPostParams.body);

  }
}

var rasaCases: NockPostReplyParams[] = [
    { 
      uri: '/parse',
      requestBody: {q: Constants.QUERY_200},
      code: 200,
      headers: undefined,
      body: Constants.RASA_RESPONSE_200,
    },
    { 
      uri: '/parse',
      requestBody: {q: Constants.QUERY_204},
      code: 200,
      headers: undefined,
      body: Constants.RASA_RESPONSE_204,
    },
    { 
      uri: '/parse',
      requestBody: {q: Constants.QUERY_400},
      code: 400,
      headers: undefined,
      body: [],
    },
    {
      uri: '/parse',
      requestBody : {q: Constants.QUERY_200_BAD},
      code: 200,
      headers: undefined,
      body: {}
    },
    { 
      uri: '/parse',
      requestBody: {q: Constants.QUERY_Error},
      code: 500,
      replyWithError: "some error in request"
    }
];

const rasaMock = function(basePath: string) {

    var cases: NockPostReplyParams[] = rasaCases;

    const rasaMockOut = cases.reduce((scope, current) => {
      return AddPostReplyToNock(scope, current);
    }, nock(basePath));
    return rasaMockOut;

};

export default rasaMock;