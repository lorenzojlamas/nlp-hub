import fs from 'fs';
import { LuisApp } from './engines/luis/luis';
import { RasaApp } from './engines/rasa/rasa';
import { RegexApp } from './engines/regex/regex';
import { IApp } from './model/app';
import { EngineRecognizer } from './engines/engine';

let recognicersMap: {[index: string]: any} = {
  'regex': RegexApp,
  'luis': LuisApp,
  'rasa': RasaApp,
}
export class NlpHub {
    public threshold = 0.8;
    public apps: IApp[];
    public recognizers: EngineRecognizer[];

    
    constructor(filePath: string) {
        const definition = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
        this.threshold = definition.threshold;
        this.apps = definition.apps;
        this.recognizers = [];
        this.apps.forEach((app: IApp) => {
          const recognizer: EngineRecognizer = new recognicersMap[app.type](app);
          this.recognizers.push(recognizer);
        });
    }

    public async firstMatch(utterance: string) {
      for (const recognizer of this.recognizers) {
          const returnOfApp: any = await recognizer.recognice(utterance);
          if (
            (returnOfApp !== null) && !(returnOfApp instanceof Error) &&
            (returnOfApp.intent.score > this.threshold)) {
              return returnOfApp;
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
}
