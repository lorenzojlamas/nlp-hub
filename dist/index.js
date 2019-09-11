"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const luis_1 = require("./engines/luis/luis");
const rasa_1 = require("./engines/rasa/rasa");
const regex_1 = require("./engines/regex/regex");
let recognicersMap = {
    'regex': regex_1.RegexApp,
    'luis': luis_1.LuisApp,
    'rasa': rasa_1.RasaApp,
};
class NlpHub {
    constructor(filePath) {
        this.threshold = 0.8;
        const definition = JSON.parse(fs_1.default.readFileSync(`${filePath}`, 'utf8'));
        this.threshold = definition.threshold;
        this.apps = definition.apps;
        this.recognizers = [];
        this.apps.forEach((app) => {
            const recognizer = new recognicersMap[app.type](app);
            this.recognizers.push(recognizer);
        });
    }
    firstMatch(utterance) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.recognizers.forEach(async (recognizer: EngineRecognizer) => {
            for (const recognizer of this.recognizers) {
                const returnOfApp = yield recognizer.recognice(utterance);
                if ((returnOfApp !== null) && !(returnOfApp instanceof Error) &&
                    (returnOfApp.intent.score > this.threshold)) {
                    return returnOfApp;
                }
            }
            ;
            return ({
                engine: 'regex',
                intent: {
                    name: 'NoneDialog',
                    score: 1,
                },
            });
        });
    }
}
exports.NlpHub = NlpHub;
