var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getIntroAsPerson } from "./_openAIAPI.js";
export default function handler(request, response) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const entity = ((_a = request.query.entity) !== null && _a !== void 0 ? _a : 'Normal Person');
        const intro = yield getIntroAsPerson({ entity });
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json({
            intro
        });
    });
}
