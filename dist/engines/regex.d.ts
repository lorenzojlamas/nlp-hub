import { IApp } from './../model/app';
export declare class RegexApp {
    regex(app: IApp, utterance: string): Promise<any>;
    regexResponse(app: IApp, match: any): {
        engine: string;
        intent: {
            name: string | undefined;
            score: number;
        };
    };
}
