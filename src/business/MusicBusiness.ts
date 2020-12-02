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

            const newMusic = await musicDatabase.createMusic(
                id, music.title, verifyToken.id,
                date, music.file, music.genre,
                music.album
            );

            return newMusic

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

    public async getAllMusics(user: any) {
        try {

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user)

            if (!verifyToken) {
                throw new CustomError("Not authorized", 401);
            }

            const music = await musicDatabase.getAllMusics();

            return music
            
                    //Perguntar no plantão -->
            // {
            //     id: music.getId(),
            //     title: music.getTitle(),
            //     author: music.getAuthor(),
            //     date: music.getDate(),
            //     file: music.getFile(),
            //     genre: music.getGenre(),
            //     album: music.getAlbum()
            // }

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
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
            throw new CustomError(error.message, error.statusCode)
        }
    }
}

export const musicBusiness: MusicBusiness = new MusicBusiness()