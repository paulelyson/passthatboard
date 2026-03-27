import { IMongoDocument } from "./MongoDocument";

export interface IQuestion extends IMongoDocument {
 source: string;
 program: string;
 major: string[]
 year: number;
 question: string;
 answer: string;
 choices: string[];
 explanation: string;
}