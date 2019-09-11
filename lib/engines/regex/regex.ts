import { IApp, IAppResponse } from '../../model/app';
import { EngineRecognizer } from '../engine';
export class RegexApp extends EngineRecognizer {

    _regexStr: string;
    _regExp: RegExp;
    _intent: string;
    constructor(app: IApp ) {
        super();
        this._regexStr = app.exp;
        this._regExp = new RegExp(this._regexStr, 'i');
        this._intent = (app.intent as string);
    }

    public async recognice(utterance: string): Promise<IAppResponse> {
        return new Promise((resolve) => {
            const match = utterance.match(this._regExp);
            resolve(this.regexResponse(match));
        });
    }

    public regexResponse(match: any):IAppResponse {
        const r: IAppResponse = {
            engine: 'regex',
            intent: {
                name: this._intent,
                score: match != null ? 1 : 0,
            },
            entities: [],
        };
        return r;
    }
}
