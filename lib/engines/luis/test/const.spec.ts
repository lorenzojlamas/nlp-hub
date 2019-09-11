import { ILuisResponse } from '../../../model/luis-response';

export const BASE_PATH: string = 'https://westus.api.cognitive.microsoft.com';

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
