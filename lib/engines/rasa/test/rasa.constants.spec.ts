import { IRecognizerResponse } from "../../../model/app";
export interface RasaUriParts {
    host: string
};

export const BASE_PATH: string = 'http://RASA_HOST';

export const QUERY_200: string = 'QUERY_200';
export const QUERY_204: string = 'asd';
export const QUERY_400: string = 'QUERY_400';
export const QUERY_Error: string = 'some-error';


export const RASA_RESPONSE_204 = {
    proyect: 'mock',
    intent: {
        name: 'intent1',
        confidence: 0.83
    },
    model: 'model1232',
    entities: []
}
export const RASA_RESPONSE_200 = {
    proyect: 'mock',
    intent: {
        name: 'intent1',
        confidence: 0.3
    },
    model: 'model1232',
    entities: [{
        confidence: 0.82,
        entity: 'entity',
        value: 'some entitie',
    }]
}

export const RASA_EXPECTED_200_RECOGNIZER_RESULT: IRecognizerResponse = {
    id: 'ID',
    engine: 'rasa',
    entities:[{
        score: 0.82,
        type: 'entity',
        value: 'some entitie',
    }
    ],
    intent: {
        name: 'intent1',
        score: 0.3
    },
    originalResponse: {
        proyect: 'mock',
        intent: {
            name: 'intent1',
            confidence: 0.3
        },
        model: 'model1232',
        entities: [{
            confidence: 0.82,
            entity: 'entity',
            value: 'some entitie'
        }]
    }};