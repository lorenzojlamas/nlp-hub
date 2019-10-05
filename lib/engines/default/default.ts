import { EngineRecognizer } from "../engine";
import { IRecognizerParams, IRecognizerResponse, IDefaultRecognizer } from "../../model/recognizers";

export class DefaultRecognizer extends EngineRecognizer {
    _defaultIntent: string;
    constructor(recognizer: IRecognizerParams){
        super();
        const params = recognizer.params as IDefaultRecognizer;
        this._defaultIntent = params.intent;
        this._id = recognizer.id;
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
