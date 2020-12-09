import { MusicInputDTO } from "../model/Music";
import { Request, Response } from "express";
import { musicBusiness } from "../business/MusicBusiness";

class MusicController {
    async createMusic(req: Request, res: Response) {
        try {

            const music: MusicInputDTO = {
                title: req.body.title,
                file: req.body.file,
                genre: req.body.genre,
                album: req.body.album,
                author_name: req.body.author_name
            }

            const user: any = {
                token: req.headers.authorization as string
            }

            await musicBusiness.createMusic(music, user);

            res.status(200).send({ message: "New music published!" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getAllMusics(req: Request, res: Response) {
        try {

            const { authorization }: any = req.headers

            const result = await musicBusiness.getAllMusics(authorization)

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getMusicById(req: Request, res: Response) {
        try {

            const input = {
                id: req.params.id,
                token: req.headers.authorization
            }

            const result = await musicBusiness.getMusicById(input)

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export const musicController: MusicController = new MusicController();