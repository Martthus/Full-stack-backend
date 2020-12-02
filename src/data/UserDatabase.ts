import { User } from "../model/User";
import BaseDataBase from "./BaseDatabase";

class UserDatabase extends BaseDataBase {

    private static TABLE_NAME = "USER"
    /**
     * signup
     */
    public async signup(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string
    ): Promise<void> {
        try {
            await BaseDataBase.connection
                .insert({
                    id, name, email, nickname, password
                })
                .into(UserDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);

        }
    }
    /**
     * login
     */
    public async login(
        email: string
    ): Promise<any> {
        try {
            const login = await BaseDataBase.connection
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ email });

            return User.toUserModel(login[0])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);

        }
    }
}

export const userDatabase: UserDatabase = new UserDatabase();