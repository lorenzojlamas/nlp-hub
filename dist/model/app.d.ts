export interface IRecognizerParams {
    id: string;
    type: string;
    params: ILuisRecognizer | IRegexRecognizer | IRasaRecognizer | IDefaultRecognizer;
}
export interface IRecognizerResponse {
    engine: string;
    entities: any;
    intent: IRecognizerIntent;
    id: string;
    originalResponse?: any;
}
export interface IRecognizerIntent {
    name: string;
    score: number;
}
export interface IRegexRecognizer {
    intent: string;
    exp: string;
}
export interface ILuisRecognizer {
    appId: string;
    key: string;
    appHost: string;
}
export interface IRasaRecognizer {
    appHost: string;
}
export interface IDefaultRecognizer {
    intent: string;
}
