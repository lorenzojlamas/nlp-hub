import nock = require('nock');
//const querystring = require('querystring');

import * as Constants from './luis.constants.spec';
import { LuisUriParts } from './luis.constants.spec';

interface NockGetReplyParams {
    uri: string;
    queryParams: any;
    code: number;
    body?: any;
    headers?: nock.HttpHeaders;
}


function AddGetReplyToNock(nock: nock.Scope, nockGetParams: NockGetReplyParams) {
    if (nockGetParams.queryParams !== undefined) {
      return nock.get(nockGetParams.uri)
              .query(true)
    
//              .query(nockGetParams.queryParams)
              .reply(nockGetParams.code,
                     nockGetParams.body);
    } else {
      return nock.get(nockGetParams.uri)
                 .reply(nockGetParams.code,
                        nockGetParams.body);
  
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
    }
];

const luisMock = function(basePath: string) {

    var cases: NockGetReplyParams[] = luisCases;

    cases.reduce((scope, current) => AddGetReplyToNock(scope, current), nock(basePath));

    for (let mockUrl of nock.pendingMocks()) {
      console.error('url: %j', mockUrl);
    }

};

export default luisMock;