//const querystring = require('querystring');
import nock = require('nock');

import * as Constants from './luis.constants.spec';
import { LuisUriParts, LUIS_URI_PARTS_ERROR } from './luis.constants.spec';

interface NockGetReplyParams {
    uri: string;
    queryParams: any;
    code?: number;
    body?: any;
    headers?: nock.RequestHeaderMatcher;
    replyWithError?: string;
}


function AddGetReplyToNock(nock: nock.Scope, nockGetParams: NockGetReplyParams) {
  if (nockGetParams.replyWithError){  
    return nock.get(nockGetParams.uri)
                .query(true)
                .replyWithError(nockGetParams.replyWithError);
  } else {
      if (nockGetParams.queryParams !== undefined) {
        return nock.get(nockGetParams.uri)
                .query(true)
                .reply(nockGetParams.code,
                       nockGetParams.body);
      } else {
        return nock.get(nockGetParams.uri)
                   .reply(nockGetParams.code,
                          nockGetParams.body);
    
      }
  }
}  

function luisQueryUrl(params: LuisUriParts): string {
    return `/luis/v2.0/apps/${params.appId}`;
}

var luisCases: NockGetReplyParams[] = [
    { 
      uri: luisQueryUrl(Constants.LUIS_URI_PARTS_200),
      queryParams: Constants.LUIS_QUERY_PARAMS_200,
      code: 200,
      body: Constants.LUIS_RESPONSE_200,
      headers: undefined
    },
    { 
      uri: luisQueryUrl(Constants.LUIS_URI_PARTS_200_BAD),
      queryParams: Constants.LUIS_QUERY_PARAMS_200_BAD,
      code: 200,
      body: {},
      headers: undefined
    },
    { 
      uri: luisQueryUrl(Constants.LUIS_URI_PARTS_ERROR),
      queryParams: Constants.LUIS_QUERY_PARAMS_ERROR,
      replyWithError: Constants.LUIS_RESPONSE_ERROR,
      headers: undefined
    },
    { 
      uri: luisQueryUrl(Constants.LUIS_URI_PARTS_204),
      queryParams: Constants.LUIS_QUERY_PARAMS_204,
      code: 200,
      body: Constants.LUIS_RESPONSE_204,
      headers: undefined
    },
    { 
      uri: luisQueryUrl(Constants.LUIS_URI_PARTS_500),
      queryParams: Constants.LUIS_QUERY_PARAMS_500,
      code: 500,
      body: Constants.LUIS_RESPONSE_500,
      headers: undefined
    }
];

const luisMock = function(basePath: string) {

    var cases: NockGetReplyParams[] = luisCases;

    const luisMockOut = cases.reduce((scope, current) => AddGetReplyToNock(scope, current), nock(basePath));
    return luisMockOut;

};

export default luisMock;