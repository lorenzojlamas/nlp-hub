import { IRasaResponse } from '../../../model/rasa-response';


export interface RasaUriParts {
    host: string
};

export interface RasaQueryParams {
    'subscription-key': string;  
    q: string;
    timezoneOffset: number;
    verbose: boolean;
};

export const BASE_PATH: string = 'http://westus.api.cognitive.microsoft.com';

export const RASA_QUERY_PARAMS_200: RasaQueryParams = {
    q: QUERY_200,
    'subscription-key': SUBSCRIPTION_KEY, 
    timezoneOffset: 0,
    verbose: true,
  }