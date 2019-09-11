import { IRecognizerParams } from './model/app';
import { EngineRecognizer } from './engines/engine';
export declare class NlpHub {
    threshold: number;
    apps: IRecognizerParams[];
    recognizers: EngineRecognizer[];
    constructor(filePath: string);
    firstMatch(utterance: string): Promise<{
        engine: string;
        intent: {
            name: string;
            score: number;
        };
    }>;
    private defaultResult;
    isAcceptable(recognizerResult: any): boolean;
}
