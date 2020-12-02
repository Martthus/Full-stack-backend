import { Music } from "../model/Music";
import BaseDataBase from "./BaseDatabase";

class MusicDatabase extends BaseDataBase {

    private static TABLE_MUSIC = "MUSIC_TABLE"
    private static TABLE_GENRE = "GENRE_TABLE"
    /**
     * createImage
     */
    public async createMusic(
        id: string,
        title: string,
        author: string,
        date: Date,
        file: string,
        genre: string[],
        album: string
    ): Promise<any> {
        try {
            const result = await BaseDataBase.connection(MusicDatabase.TABLE_GENRE)
                .select("genre")
                .where({genre})

            if (!result) {
                await BaseDataBase.connection(MusicDatabase.TABLE_GENRE)
                    .insert(id, genre)
            }

            const result1 = await BaseDataBase.connection
                .insert({
                    id,
                    title,
                    author,
                    date,
                    file,
                    genre,
                    album
                })
                .into(MusicDatabase.TABLE_MUSIC);

            return result1

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllMusics(): Promise<any> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${MusicDatabase.TABLE_MUSIC} 
        `);
            return Music.toMusicModel(result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicById(id: string): Promise<any> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${MusicDatabase.TABLE_MUSIC} WHERE id = '${id}'
        `);
            return Music.toMusicModel(result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export const musicDatabase: MusicDatabase = new MusicDatabase();