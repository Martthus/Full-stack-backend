"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routes/userRouter");
const cors_1 = __importDefault(require("cors"));
const musicRouter_1 = require("./routes/musicRouter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/user", userRouter_1.userRouter);
app.use("/music", musicRouter_1.musicRouter);
const server = app.listen(process.env.PORT || 5000, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
//# sourceMappingURL=index.js.map