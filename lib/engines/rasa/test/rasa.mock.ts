import nock = require('nock');
//const querystring = require('querystring');

import * as Constants from './rasa.constants.spec';
import { RasaUriParts } from './rasa.constants.spec';

interface NockPostReplyParams {
    uri: string;
    queryParams: any;
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
