import { EngineRecognizer } from "../engine";
import { IRecognizerParams, IRecognizerResponse, IDefaultRecognizer } from "../../model/app";

export class DefaultRecognizer extends EngineRecognizer {
    _defaultIntent: string;
    constructor(app: IRecognizerParams){
        super();
        const params = app.params as IDefaultRecognizer;
        this._defaultIntent = params.intent;
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
