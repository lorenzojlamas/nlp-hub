import fs from 'fs';
import { LuisApp } from './engines/luis/luis';
import {RegexApp} from './engines/regex';
import { IApp } from './model/app';

export class NlpHub {
    public threshold = 0.8;
    public apps!: IApp[];

    constructor(filePath: string) {
        const definition = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
        this.threshold = definition.threshold;
        this.apps = definition.apps;
    }

    public async firstMatch(utterance: string) {

        for (const app of this.apps) {
          const returnOfApp: any = await this.appProcess(app, utterance);
          if (returnOfApp !== null) {
            if (returnOfApp.intent.score > this.threshold) {
              return returnOfApp;
            }
          }
        }
        return({
                engine: 'regex',
                intent: {
                  name: 'NoneDialog',
                  score: 1,
                },
              });
      }
    public async appProcess(app: any, utterance: any) {
        if (app.type === 'regex') {
            const regexApp: RegexApp = new RegexApp();
            return (await regexApp.regex(app, utterance));
        } else if (app.type === 'luis') {
          const luisApp: LuisApp = new LuisApp(app);
          return (await luisApp.luis(utterance));
        } else {
          return (null);
        }
    }
}
