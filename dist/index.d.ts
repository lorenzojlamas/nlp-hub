import { IApp } from './model/app';
export declare class NlpHub {
    threshold: number;
    apps: IApp[];
    constructor(filePath: string);
    firstMatch(utterance: string): Promise<any>;
    appProcess(app: any, utterance: any): Promise<any>;
}
