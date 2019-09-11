export interface IRecognizerParams {
    id: string;
    type: string;
    intent?: string;
    exp: string;
    key?: string;
    kb?: string;
    appHost?: string;
    appId?: string;
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
