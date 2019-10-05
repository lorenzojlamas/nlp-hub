import { IRecognizerResponse } from "../model/recognizers";

export abstract class EngineRecognizer {
    abstract async recognice(utterance: string): Promise<IRecognizerResponse>;
    _id!: string;
}