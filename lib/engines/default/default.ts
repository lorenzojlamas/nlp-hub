import { EngineRecognizer } from "../engine";
import { IRecognizerParams, IRecognizerResponse } from "../../model/app";

export class DefaultRecognizer extends EngineRecognizer {
    _defaultIntent: string;
    _id: string;
    constructor(app: IRecognizerParams){
        super();
        this._defaultIntent = app.intent as string;
        this._id = app.id;
    }
    public async recognice(utterance: string): Promise<IRecognizerResponse> {
        return new Promise((resolve) => {
            resolve(this.defaultResult());
        });
    }
    private defaultResult() {
        return {
          id: this._id,
          engine: 'default',
          intent: {
            name: this._defaultIntent,
            score: 1,
          },
          entities: []
        };
      }
}
