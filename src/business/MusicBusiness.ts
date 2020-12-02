import { musicDatabase } from "../data/MusicDatabase";
import { CustomError } from "../error/CustomError";
import { MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class MusicBusiness {
    public async createMusic(image: MusicInputDTO, user: any) {
        try {
            const date = new Date();

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user.token)

            if (!image.subtitle || !image.file || !image.collection) {
                throw new CustomError("Missing input", 422);
            }

            if (!verifyToken) {
                throw new CustomError("Not authorized", 401);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            await musicDatabase.createMusic(

                id, image.subtitle, verifyToken.id,
                date, image.file, image.tags,
                image.collection
            );

            return { message: "Image create succefull!" };
        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

    public async getAllMusics(user: any) {
        try {
            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user.token)

            if (!verifyToken) {
                throw new CustomError("Not authorized", 401);
            }

            const image = await musicDatabase.getAllMusics();

            return {
                id: image.getId(),
                subtitle: image.getSubtitle(),
                author: image.getAuthor(),
                date: image.getDate(),
                file: image.getFile(),
                tags: image.getTags(),
                collection: image.getCollection()
            }

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getMusicById(input: any) {
        try {

            const image = await musicDatabase.getMusicById(input);

            if (!input.id) {
                throw new CustomError("invalid-id", 401)
            }

            return {
                id: image.getId(),
                subtitle: image.getSubtitle(),
                author: image.getAuthor(),
                date: image.getDate(),
                file: image.getFile(),
                tags: image.getTags(),
                collection: image.getCollection()
            }

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export const musicBusiness: MusicBusiness = new MusicBusiness()