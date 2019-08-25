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

export const BASE_PATH: string = 'https://westus.api.cognitive.microsoft.com';

// export const DEFAULT_BASE_PATH: string = swagger.schemes[0] + '://' + swagger.host + swagger.basePath;

export const CODE_200: string = '200';
export const CODE_204: string = '204';
export const CODE_400: string = '400';
export const CODE_403: string = '403';
export const CODE_404: string = '404';
export const CODE_500: string = '500';
export const CODE_504: string = '504';

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
