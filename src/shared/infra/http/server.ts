import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import cors from 'cors'
import "express-async-errors";

import errorHandling from "./middlewares/errorHandling";
import routes from "./routes";
import "../typeorm"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandling);

app.get("/", (req, res) => {
    return res.send("Samurai music API 2021");
});

const server = app.listen(process.env.PORT || 5000, () => {
    const address = server.address() as AddressInfo;

    console.log(`Servidor rodando em http://localhost:${address.port}`);
});