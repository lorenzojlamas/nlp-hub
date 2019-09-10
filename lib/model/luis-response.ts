export interface ILuisResponse {
    query: string;
    topScoringIntent: IIntentLuis;
    intents?: IIntentLuis[];
    entities?: IEntityLuis[];
    sentimentAnalysis?: any;
}

export interface IEntityLuis {
    entity: string;
    type: string;
    startIndex: number;
    endIndex: number;
    resolution?: any;
    score?: number;
}

export interface IIntentLuis {
    intent: string;
    score: number;
}