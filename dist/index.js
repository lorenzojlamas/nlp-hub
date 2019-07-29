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
const luis_1 = require("./engines/luis");
const regex_1 = require("./engines/regex");
class NlpHub {
    constructor(filePath) {
        this.threshold = 0.8;
        const definition = JSON.parse(fs_1.default.readFileSync(`${filePath}`, 'utf8'));
        this.threshold = definition.threshold;
        this.apps = definition.apps;
    }
    firstMatch(utterance) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const app of this.apps) {
                const returnOfApp = yield this.appProcess(app, utterance);
                if (returnOfApp !== null) {
                    if (returnOfApp.intent.score > this.threshold) {
                        return returnOfApp;
                    }
                }
            }
            return ({
                engine: 'regex',
                intent: {
                    name: 'none',
                    score: 1,
                },
            });
        });
    }
    appProcess(app, utterance) {
        return __awaiter(this, void 0, void 0, function* () {
            if (app.type === 'regex') {
                const regexApp = new regex_1.RegexApp();
                return (yield regexApp.regex(app, utterance));
            }
            else if (app.type === 'luis') {
                const luisApp = new luis_1.LuisApp();
                return (yield luisApp.luis(app, utterance));
            }
            else {
                return (null);
            }
        });
    }
}
exports.NlpHub = NlpHub;
