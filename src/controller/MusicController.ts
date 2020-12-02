import { MusicInputDTO } from "../model/Music";
import { Request, Response } from "express";
import { musicBusiness } from "../business/MusicBusiness";
import { CustomError } from "../error/CustomError";

class MusicController {
    async createMusic(req: Request, res: Response) {
        try {

            const image: MusicInputDTO = {
                title: req.body.title,
                file: req.body.file,
                genre: req.body.genre,
                album: req.body.album
            }

            const user: any = {
                token: req.headers.authorization as string
            }

            const token = await musicBusiness.createMusic(image, user);

            if (!token) {
                console.log("indefinido")
            } else {
                console.log("não indefinido")
            }

            console.log({ token: !token })

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
                id: req.params.id
            }

            const result = await musicBusiness.getMusicById(input)

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export const musicController: MusicController = new MusicController();