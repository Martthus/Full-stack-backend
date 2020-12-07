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
exports.musicBusiness = void 0;
const MusicDatabase_1 = require("../data/MusicDatabase");
const CustomError_1 = require("../error/CustomError");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
class MusicBusiness {
    createMusic(music, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                const authenticator = new Authenticator_1.Authenticator();
                const verifyToken = authenticator.getData(user.token);
                if (!music.title || !music.file || !music.album) {
                    throw new CustomError_1.CustomError("Missing input", 422);
                }
                if (!verifyToken) {
                    throw new CustomError_1.CustomError("Not authorized", 401);
                }
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generate();
                const newMusic = yield MusicDatabase_1.musicDatabase.createMusic(id, music.title, verifyToken.id, date, music.file, music.genre, music.album);
                return newMusic;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.message, error.statusCode);
            }
        });
    }
    getAllMusics(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticator = new Authenticator_1.Authenticator();
                const verifyToken = authenticator.getData(user);
                if (!verifyToken) {
                    throw new CustomError_1.CustomError("Not authorized", 401);
                }
                const music = yield MusicDatabase_1.musicDatabase.getAllMusics();
                return music;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.message, error.statusCode);
            }
        });
    }
    getMusicById(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticator = new Authenticator_1.Authenticator();
                const verifyToken = authenticator.getData(input.token);
                if (!verifyToken) {
                    throw new CustomError_1.CustomError("Not authorized", 401);
                }
                const music = yield MusicDatabase_1.musicDatabase.getMusicById(input.id);
                if (!input.id) {
                    throw new CustomError_1.CustomError("invalid-id", 401);
                }
                return {
                    id: music.getId(),
                    title: music.getTitle(),
                    author: music.getAuthor(),
                    date: music.getDate(),
                    file: music.getFile(),
                    genre: music.getGenre(),
                    album: music.getAlbum()
                };
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.message, error.statusCode);
            }
        });
    }
}
exports.musicBusiness = new MusicBusiness();
//# sourceMappingURL=MusicBusiness.js.map