import { musicDatabase } from "../data/MusicDatabase";
import { CustomError } from "../error/CustomError";
import { MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class MusicBusiness {
    public async createMusic(music: MusicInputDTO, user: any) {
        try {
            const date = new Date();

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user.token)

            if (!music.title || !music.file || !music.album) {
                throw new CustomError("Missing input", 422);
            }

            if (!verifyToken) {
                throw new CustomError("Not authorized", 401);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            // console.log(id)
            // console.log(music.title)
            // console.log(verifyToken.id)
            // console.log(date)
            // console.log(music.file)
            // console.log(music.genre)
            // console.log(music.album)

            await musicDatabase.createMusic(

                id, music.title, verifyToken.id,
                date, music.file, music.genre,
                music.album
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
                subtitle: image.getTitle(),
                author: image.getAuthor(),
                date: image.getDate(),
                file: image.getFile(),
                tags: image.getGenre(),
                collection: image.getAlbum()
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
                subtitle: image.getTitle(),
                author: image.getAuthor(),
                date: image.getDate(),
                file: image.getFile(),
                tags: image.getGenre(),
                collection: image.getAlbum()
            }

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export const musicBusiness: MusicBusiness = new MusicBusiness()