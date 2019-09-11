export interface IApp {
    id: string;
    type: string;
    intent?: string;
    exp: string;
    key?: string;
    kb?: string;
    appHost?: string;
    appId?: string;
}
export interface IAppResponse {
    engine: string;
    entities: any;
    intent: IIntentApp;
    originalResponse?: any;
}
export interface IIntentApp {
    name: string;
    score: number;
}
