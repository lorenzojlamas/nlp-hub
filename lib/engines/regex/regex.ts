import { IApp } from '../../model/app';
export class RegexApp {

    _regexStr: string;
    _regExp: RegExp;
    _intent: string | undefined;
    constructor(app: IApp ) {
        this._regexStr = app.exp;
        this._regExp = new RegExp(this._regexStr, 'i');
        this._intent = app.intent;
    }

    public async regex(utterance: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const match = utterance.match(this._regExp);
            resolve(this.regexResponse(match));

        });
    }

    public regexResponse(match: any) {
        const r = {
            engine: 'regex',
            intent: {
                name: this._intent,
                score: match != null ? 1 : 0,
            },
        };
        return r;
    }
}
