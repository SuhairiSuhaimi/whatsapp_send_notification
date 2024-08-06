"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplate = exports.PhoneTemplate = void 0;
class PhoneTemplate {
    constructor(phone) {
        this.phone = phone;
    }
}
exports.PhoneTemplate = PhoneTemplate;
class MessageTemplate {
    constructor(phone, body) {
        this.phone = phone;
        this.body = body;
    }
}
exports.MessageTemplate = MessageTemplate;
