"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = 3000;
const app = (0, app_1.default)();
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
