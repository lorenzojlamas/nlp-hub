import { IRecognizerParams } from './model/app';
import { EngineRecognizer } from './engines/engine';
export declare class NlpHub {
    threshold: number;
    apps: IRecognizerParams[];
    recognizers: EngineRecognizer[];
    constructor(filePath: string);
    firstMatch(utterance: string): Promise<any>;
    isAcceptable(recognizerResult: any): boolean;
}
