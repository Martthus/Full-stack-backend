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
exports.userDatabase = void 0;
const User_1 = require("../model/User");
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
class UserDatabase extends BaseDatabase_1.default {
    signup(id, name, email, nickname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.default.connection
                    .insert({
                    id, name, email, nickname, password
                })
                    .into(UserDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield BaseDatabase_1.default.connection
                    .select("*")
                    .from(UserDatabase.TABLE_NAME)
                    .where({ email });
                return User_1.User.toUserModel(login[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
UserDatabase.TABLE_NAME = "USER";
exports.userDatabase = new UserDatabase();
//# sourceMappingURL=UserDatabase.js.map