"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// enables us to create the server
const express_1 = __importDefault(require("express"));
function createApp() {
    // initialize teh express application
    const app = (0, express_1.default)();
    // middleware
    app.use(express_1.default.json());
    return app;
}
exports.default = createApp;
