export interface ILuisResponse {
    query: string;
    topScoringIntent: IIntent;
    intents?: IIntent[];
    entities?: IEntity[];
    sentimentAnalysis?: any;
}

export interface IEntity {
    entity: string;
    type: string;
    startIndex: number;
    endIndex: number;
    resolution?: any;
    score?: number;
}

export interface IIntent {
    intent: string;
    score: number;
}
