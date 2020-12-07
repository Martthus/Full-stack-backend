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
exports.musicDatabase = void 0;
const Music_1 = require("../model/Music");
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
class MusicDatabase extends BaseDatabase_1.default {
    createMusic(id, title, author, date, file, genre, album) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.default.connection(MusicDatabase.TABLE_MUSIC)
                    .insert({
                    id,
                    title,
                    author,
                    date,
                    file,
                    genre,
                    album
                });
                const result = yield BaseDatabase_1.default.connection(MusicDatabase.TABLE_GENRE)
                    .select("genre")
                    .where({ genre });
                if (result.length <= 0) {
                    yield BaseDatabase_1.default.connection(MusicDatabase.TABLE_GENRE)
                        .insert({ id, genre });
                }
                return;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getAllMusics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.default.connection.raw(`
          SELECT * from ${MusicDatabase.TABLE_MUSIC} 
        `);
                return (result[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getMusicById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.default.connection.raw(`
          SELECT * from ${MusicDatabase.TABLE_MUSIC} WHERE id = '${id}'
        `);
                return Music_1.Music.toMusicModel(result[0][0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
MusicDatabase.TABLE_MUSIC = "MUSIC_TABLE";
MusicDatabase.TABLE_GENRE = "GENRE_TABLE";
exports.musicDatabase = new MusicDatabase();
//# sourceMappingURL=MusicDatabase.js.map