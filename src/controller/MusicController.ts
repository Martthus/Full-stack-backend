import { MusicInputDTO } from "../model/Music";
import { Request, Response } from "express";
import { musicBusiness } from "../business/MusicBusiness";
import { CustomError } from "../error/CustomError";

class MusicController {
    async createImage(req: Request, res: Response) {
        try {

            const image: MusicInputDTO = {
                subtitle: req.body.subtitle,
                file: req.body.file,
                tags: req.body.tags,
                collection: req.body.collection
            }

            const user: any = {
                token: req.headers.authorization as string
            }

            const token = await musicBusiness.createMusic(image, user);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getAllImages(req: Request, res: Response) {
        try {

            const { token }: any = req.headers.authorization as string

            const result = await musicBusiness.getAllMusics(token)

            res.status(200).send(result);

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getImageById(req: Request, res: Response) {
        try {

            const input = {
                id: req.params.id
            }

            const result = await musicBusiness.getMusicById(input)

            res.status(200).send(result);

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export const musicController: MusicController = new MusicController();