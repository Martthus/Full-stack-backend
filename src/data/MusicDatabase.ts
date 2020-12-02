import { Music } from "../model/Music";
import BaseDataBase from "./BaseDatabase";

class MusicDatabase extends BaseDataBase {

    private static TABLE_MUSIC = "MUSIC_TABLE"
    private static TABLE_HASHTAG = "HASHTAG_TABLE"
    /**
     * createImage
     */
    public async createMusic(
        id: string,
        subtitle: string,
        author: string,
        date: Date,
        file: string,
        tags: string[],
        collection: string
    ): Promise<void> {
        try {
            const result = await BaseDataBase.connection(MusicDatabase.TABLE_HASHTAG)
                .select("hashtag")
                .where(tags)

            if (!result[0][0]) {
                await BaseDataBase.connection(MusicDatabase.TABLE_HASHTAG)
                    .insert(id, tags)
            }

            await BaseDataBase.connection
                .insert({
                    id,
                    subtitle,
                    author,
                    date,
                    file,
                    tags,
                    collection
                })
                .into(MusicDatabase.TABLE_MUSIC);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllMusics(): Promise<Music> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${MusicDatabase.TABLE_MUSIC} 
        `);
            return (result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicById(id: string): Promise<Music> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${MusicDatabase.TABLE_MUSIC} WHERE id = '${id}'
        `);
            return (result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export const musicDatabase: MusicDatabase = new MusicDatabase();