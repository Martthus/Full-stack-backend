import { musicDatabase } from "../data/MusicDatabase";
import { CustomErrors } from "../shared/error/CustomErrors";
import { MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class MusicBusiness {
    public async createMusic(music: MusicInputDTO, user: any) {
        try {
            const date = new Date();

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user.token)

            if (!music.title || !music.file || !music.album || !music.author_name) {
                throw new CustomErrors("Missing input", 422);
            }

            if (!verifyToken) {
                throw new CustomErrors("Not authorized", 401);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const newMusic = await musicDatabase.createMusic(
                id, music.title, verifyToken.id,
                date, music.file, music.genre,
                music.album, music.author_name
            );

            return newMusic

        } catch (error) {
            throw new CustomErrors(error.message, error.statusCode)
        }
    }

    public async getAllMusics(user: any) {
        try {

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user)

            if (!verifyToken) {
                throw new CustomErrors("Not authorized", 401);
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
            throw new CustomErrors(error.message, error.statusCode)
        }
    }

    public async getMusicById(input: any) {
        try {
            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(input.token)

            if (!verifyToken) {
                throw new CustomErrors("Not authorized", 401);
            }

            const music = await musicDatabase.getMusicById(input.id);

            if (!input.id) {
                throw new CustomErrors("invalid-id", 401)
            }

            return {
                id: music.getId(),
                title: music.getTitle(),
                author: music.getAuthor(),
                date: music.getDate(),
                file: music.getFile(),
                genre: music.getGenre(),
                album: music.getAlbum(),
                author_name: music.getAuthor_name()
            }

        } catch (error) {
            throw new CustomErrors(error.message, error.statusCode)
        }
    }
}

export const musicBusiness: MusicBusiness = new MusicBusiness()