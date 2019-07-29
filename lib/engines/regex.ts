import { IApp } from './../model/app';
export class RegexApp {

    public async regex(app: IApp , utterance: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const regExp = new RegExp(app.exp, 'i');
            const match = utterance.match(regExp);
            resolve(this.regexResponse(app, match));

        });
    }

    public regexResponse(app: IApp, match: any) {
        const r = {
            engine: 'regex',
            intent: {
                name: app.intent,
                score: match != null ? 1 : 0,
            },
        };
        return r;
    }
}
