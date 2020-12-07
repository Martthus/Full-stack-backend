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
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicController = void 0;
const MusicBusiness_1 = require("../business/MusicBusiness");
class MusicController {
    createMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const music = {
                    title: req.body.title,
                    file: req.body.file,
                    genre: req.body.genre,
                    album: req.body.album
                };
                const user = {
                    token: req.headers.authorization
                };
                yield MusicBusiness_1.musicBusiness.createMusic(music, user);
                res.status(200).send({ message: "New music published!" });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
    }
    getAllMusics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                const result = yield MusicBusiness_1.musicBusiness.getAllMusics(authorization);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
    }
    getMusicById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    id: req.params.id,
                    token: req.headers.authorization
                };
                const result = yield MusicBusiness_1.musicBusiness.getMusicById(input);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
    }
}
exports.musicController = new MusicController();
//# sourceMappingURL=MusicController.js.map