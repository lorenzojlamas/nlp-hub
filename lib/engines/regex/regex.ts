import { IRecognizerParams, IRecognizerResponse, IRegexRecognizer } from '../../model/recognizers';
import { EngineRecognizer } from '../engine';
export class RegexRecognizer extends EngineRecognizer {

    _regexStr: string;
    _regExp: RegExp;
    _intent: string;
    constructor(recognizer: IRecognizerParams ) {
        super();
        const params = recognizer.params as IRegexRecognizer
        this._regexStr = params.exp;
        this._regExp = new RegExp(this._regexStr, 'i');
        this._intent = params.intent;
        this._id = recognizer.id;
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
