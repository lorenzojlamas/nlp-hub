// import { Content, Rol, Audio, VodSeries, VodSeason, LiveSchedule, Vod, LiveEpisode, VodEpisode } from './model/models';
// import { ContentTypes, OrderTypes, SeriesTypes } from './model/contentsSearchRequest';
// import { ContentsSearchRequest } from './model/contentsSearchRequest';
// import { ContentSimilarToTitleRequest, ContentCategories } from './model/contentSimilarToTitleRequest';
// import { ContentSimilarToContentRequest } from './model/contentSimilarToContentRequest';
// import { ContentRequest } from './model/contentRequest';
// import { ContentsRequest } from './model/contentsRequest';

import { ILuisResponse } from '../../../model/luis-response';
// import swagger from './luis.swagger.json';

// export const ACCESS_TOKEN_200: string = 'the access token of the user for code 200';
// export const ACCESS_TOKEN_200_BAD: string = 'the access token of the user for code 200 bad';
// export const ACCESS_TOKEN_200_BAD2: string = 'the access token of the user for code 200 bad2';
// export const ACCESS_TOKEN_400: string = 'the access token of the user for code 400';
// export const ACCESS_TOKEN_403: string = 'the access token of the user for code 403';
// export const ACCESS_TOKEN_404: string = 'the access token of the user for code 404';
// export const ACCESS_TOKEN_500: string = 'the access token of the user for code 500';
// export const ACCESS_TOKEN_504: string = 'the access token of the user for code 504';
// export const API_NAME: string = swagger.info.title;

export interface LuisUriParts {
  host: string;
  appId: string;
}

export interface LuisQueryParams {
  'subscription-key': string;  
  q: string;
  timezoneOffset: number;
  verbose: boolean;
}


export const BASE_PATH: string = 'http://westus.api.cognitive.microsoft.com';

// export const DEFAULT_BASE_PATH: string = swagger.schemes[0] + '://' + swagger.host + swagger.basePath;

export const CODE_200: string = '200';
export const CODE_204: string = '204';
export const CODE_400: string = '400';
export const CODE_403: string = '403';
export const CODE_404: string = '404';
export const CODE_500: string = '500';
export const CODE_504: string = '504';


export const APP_ID_CODE_200: string = 'APP_ID_200';
export const APP_ID_CODE_204: string = 'APP_ID_204';
export const APP_ID_CODE_400: string = 'APP_ID_400';
export const APP_ID_CODE_403: string = 'APP_ID_403';
export const APP_ID_CODE_404: string = 'APP_ID_404';
export const APP_ID_CODE_500: string = 'APP_ID_500';
export const APP_ID_CODE_504: string = 'APP_ID_504';

export const QUERY_200: string = 'QUERY_200';

export const INTENT_200 = {
  intent: 'INTENT.200',
  score: 0.9200
};

export const SENTIMENT = {
  label: 'neutral',
  score: 0.5
}

export const APP_KEY: string = 'APP_KEY';

export const SUBSCRIPTION_KEY: string = 'SUBS_KEY';

// Content returned by the API.

export const LUIS_RESPONSE: ILuisResponse = {
    entities: [
    ],
    intents: [
        {
            intent: 'None',
            score: 0.0267993771,
        },
    ],
    query: 'quiero genererar un ticket',
    topScoringIntent: {
        intent: 'intent.ticket.generation',
        score: 0.07631713,
    },
};

/**
 * Content Search constants
 */
export const LUIS_QUERY: any = {
    'q': 'quiero generar un ticket',
    'subscription-key': 'b43bb5a8c9d240b79f72m5abc8818126',
    'timezoneOffset': '-360',
    'verbose': true,
};

export const LUIS_URI_PARTS_200: LuisUriParts = {
  host: BASE_PATH,
  appId: APP_ID_CODE_200,
}

export const LUIS_QUERY_PARAMS_200: LuisQueryParams = {
  q: QUERY_200,
  'subscription-key': SUBSCRIPTION_KEY, 
  timezoneOffset: 0,
  verbose: true,
}

export const LUIS_RESPONSE_200 = {
  query: QUERY_200,
  topScoringIntent: INTENT_200,
  entities: [],
  sentimentAnalysis: SENTIMENT
}



let r = {
    "query": "forward to frank 30 dollars through HSBC",
    "topScoringIntent": {
      "intent": "give",
      "score": 0.3964121
    },
    "entities": [
      {
        "entity": "30",
        "type": "builtin.number",
        "startIndex": 17,
        "endIndex": 18,
        "resolution": {
          "value": "30"
        }
      },
      {
        "entity": "frank",
        "type": "frank",
        "startIndex": 11,
        "endIndex": 15,
        "score": 0.935219169
      },
      {
        "entity": "30 dollars",
        "type": "builtin.currency",
        "startIndex": 17,
        "endIndex": 26,
        "resolution": {
          "unit": "Dollar",
          "value": "30"
        }
      },
      {
        "entity": "hsbc",
        "type": "Bank",
        "startIndex": 36,
        "endIndex": 39,
        "resolution": {
          "values": [
            "BankeName"
          ]
        }
      }
    ],
    "sentimentAnalysis": {
      "label": "neutral",
      "score": 0.5
    }
  }
