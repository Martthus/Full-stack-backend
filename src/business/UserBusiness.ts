import { userDatabase } from "../data/UserDatabase";
import { CustomErrors } from "../shared/error/CustomErrors";
import { LoginInputDTO, UserInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

class UserBusiness {
    /**
     * signup
     */
    public async signup(user: UserInputDTO) {
        try {
            if (!user.name || !user.email || !user.nickname || !user.password) {
                throw new CustomErrors("Missing input", 422);
            }

            if (user.email.indexOf("@") === -1) {
                throw new CustomErrors("Invalid email", 422);
            }

            if (user.password.length < 6) {
                throw new CustomErrors("Invalid password", 422);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();


            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);
            console.log(id, user.name, user.email, user.nickname, hashPassword)

            await userDatabase.signup(id, user.name, user.email, user.nickname, hashPassword);

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id });

            return accessToken;
        } catch (error) {
            throw new CustomErrors(error.message, error.statusCode);
        }

    }
    /**
     * login
     */
    public async login(
        user: LoginInputDTO
    ) {
        try {
            if (!user.email || !user.password) {
                throw new CustomErrors("Missing input", 422);
            }

            const userFromDB = await userDatabase.login(user.email);

            if (!userFromDB) {
                throw new CustomErrors("Invalid credentials", 401);
            }

            const hashManager = new HashManager();
            const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

            if (!hashCompare) {
                throw new CustomErrors("Invalid credentials", 401);
            }

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id: userFromDB.getId() });

            if (!hashCompare) {
                throw new CustomErrors("Invalid Password!", 422);
            }

            return accessToken;
        } catch (error) {
            throw new CustomErrors(error.message, error.statusCode);
        }

    }
}

export const userBusiness: UserBusiness = new UserBusiness()