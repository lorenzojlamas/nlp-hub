import fs from 'fs';
import { LuisRecognizer } from './engines/luis/luis';
import { RasaRecognizer } from './engines/rasa/rasa';
import { RegexRecognizer } from './engines/regex/regex';
import { IRecognizerParams } from './model/app';
import { EngineRecognizer } from './engines/engine';
import { DefaultRecognizer } from './engines/default/default';

let recognicersMap: {[index: string]: any} = {
  'regex': RegexRecognizer,
  'luis': LuisRecognizer,
  'rasa': RasaRecognizer,
  'default': DefaultRecognizer
}
export class NlpHub {
    public threshold = 0.8;
    public apps: IRecognizerParams[];
    public recognizers: EngineRecognizer[];

    constructor(filePath: string) {
        const definition = JSON.parse(fs.readFileSync(`${filePath}`, 'utf8'));
        this.threshold = definition.threshold;
        this.apps = definition.apps;
        this.recognizers = [];
        // ? SI implementamos una estrategía del tipo best match,
        // ? habría que sacar el default porque va a retornar uno.
        this.apps.forEach((app: IRecognizerParams) => {
          const recognizer: EngineRecognizer = new recognicersMap[app.type](app);
          this.recognizers.push(recognizer);
        });
    }

    public async firstMatch(utterance: string) {
      for (const recognizer of this.recognizers) {
          const recognizerResult: any = await recognizer.recognice(utterance);
          if (this.isAcceptable(recognizerResult)) {
            return recognizerResult;
          }
      } 
    }

  public isAcceptable(recognizerResult: any) {
    return (recognizerResult !== undefined) &&
    (recognizerResult !== null) &&
    !(recognizerResult instanceof Error) &&
    (recognizerResult.intent.score > this.threshold);
  }
}
