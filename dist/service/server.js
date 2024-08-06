"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerService = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const venom_1 = require("./venom");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const PORT = 5000;
class ServerService {
    constructor() {
    }
    init() {
        var venom = new venom_1.VenomService();
        venom.init();
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        router.get('/', (request, response) => {
            response.sendFile('./index.html', { root: __dirname });
        });
        router.post('/checkNumber', (request, response) => __awaiter(this, void 0, void 0, function* () {
            var messageTpl = request.body;
            var result = yield venom.checkNumberStatus(messageTpl.phone);
            if (result.status === 200) {
                response.json({ "error_code": "01", "error": null, "result": result.whatsapp });
            }
            else {
                response.json({ "error_code": "02", "error": "checkNumberStatus failed", "result": false });
            }
        }), error => {
            console.log("Err:" + error);
        });
        router.post('/sendMessage', (request, response) => __awaiter(this, void 0, void 0, function* () {
            var messageTpl = request.body;
            var result = yield venom.sendText(messageTpl.phone, messageTpl.body);
            if (result.status === 200) {
                response.json({ "error_code": "01", "error": null, "result": "whatsapp message has been sent to " + messageTpl.phone });
            }
            else {
                response.json({ "error_code": "02", "error": result.error });
            }
        }), error => {
            console.log("Err:" + error);
        });
        app.use(router);
        var server = http_1.default.createServer(app);
        server.listen(PORT);
        server.on("listening", () => {
            console.info("\nserver is up \nlistening to port " + PORT + "\n");
        });
    }
}
exports.ServerService = ServerService;
