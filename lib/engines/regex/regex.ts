import { IRecognizerParams, IRecognizerResponse } from '../../model/app';
import { EngineRecognizer } from '../engine';
export class RegexRecognizer extends EngineRecognizer {

    _regexStr: string;
    _regExp: RegExp;
    _intent: string;
    _id: string;
    constructor(app: IRecognizerParams ) {
        super();
        this._regexStr = app.exp;
        this._regExp = new RegExp(this._regexStr, 'i');
        this._intent = (app.intent as string);
        this._id = app.id;
    }

    public async recognice(utterance: string): Promise<IRecognizerResponse> {
        return new Promise((resolve) => {
            const match = utterance.match(this._regExp);
            resolve(this.regexResponse(match));
        });
    }

    public regexResponse(match: any):IRecognizerResponse {
        const r: IRecognizerResponse = {
            id: this._id,
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
