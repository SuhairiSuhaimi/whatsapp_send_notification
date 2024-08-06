"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenomService = void 0;
const venom_bot_1 = require("venom-bot");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
class VenomService {
    constructor() {
    }
    init() {
        (0, venom_bot_1.create)({
            session: "mainSession",
        })
            .then((client) => this.start(client))
            .catch((err) => console.log(err));
    }
    start(client) {
        this.mainSessionClient = client;
        client.onMessage((message) => {
            var _a;
            this.rbody = message === null || message === void 0 ? void 0 : message.body;
            console.log(message.from + " > " + ((_a = this.rbody) === null || _a === void 0 ? void 0 : _a.slice(0, 25)) + (this.rbody && this.rbody.length > 25 ? "..." : ""));
            client.sendText(message.from, "Testing auto reply message \n" + this.rbody);
        });
    }
    //extract phone from chatId
    getPhone(chatId) {
        const phone = chatId.includes("@c.us") ? chatId.split("@", 1)[0] : chatId;
        return phone;
    }
    //convert phone to chatId
    getChatId(phone) {
        const chatId = !phone.includes("@c.us") ? phone + "@c.us" : phone;
        return chatId;
    }
    //check number got whatsapp or not
    checkNumberStatus(phone) {
        var chatId = this.getChatId(phone);
        var data = { "status": 0, "whatsapp": false };
        return this.mainSessionClient.checkNumberStatus(chatId)
            .then((res) => {
            data['status'] = (res['status'] === 200) ? 200 : 400;
            data['whatsapp'] = (res['numberExists'] === true) ? true : false;
            return data;
        })
            .catch((err) => {
            data['status'] = 400;
            data['whatsapp'] = false;
            data['error'] = "The phone no. is not exist in whatsapp system.";
            return data;
        });
    }
    //send plain message
    sendText(phone, msg) {
        var chatId = this.getChatId(phone);
        var data = { "status": 0, "error": "" };
        return this.mainSessionClient.sendText(chatId, msg)
            .then((res) => {
            data['status'] = (res['erro']) ? 400 : 200;
            data['error'] = (res['erro']) ? res['text'] : "";
            return data;
        })
            .catch((err) => {
            data['status'] = 400;
            data['error'] = "Error when sending: sendText\nError:" + err;
            return data;
        });
    }
}
exports.VenomService = VenomService;
