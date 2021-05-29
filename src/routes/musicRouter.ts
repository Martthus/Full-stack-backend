import express from "express";
import { musicController } from "../controller/MusicController";

export const musicRouter = express.Router();

musicRouter.post("/", musicController.createMusic);
musicRouter.get("/", musicController.getAllMusics);
musicRouter.get("/:id", musicController.getMusicById);