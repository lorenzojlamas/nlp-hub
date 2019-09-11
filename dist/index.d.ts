import { IApp } from './model/app';
import { EngineRecognizer } from './engines/engine';
export declare class NlpHub {
    threshold: number;
    apps: IApp[];
    recognizers: EngineRecognizer[];
    constructor(filePath: string);
    firstMatch(utterance: string): Promise<any>;
}
