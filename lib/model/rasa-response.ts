export interface IRasaResponse {
    proyect: string;
    intent: IIntentRasa;
    text: string;
    model: string;
    entities: IEntitYRasa[];
}

export interface IIntentRasa {
    name: string;
    confidence: number;
}

export interface IEntitYRasa {
    end: number;
    value: string;
    extractor: string;
    confidence: number;
    start: number;
    entity: string;
}
