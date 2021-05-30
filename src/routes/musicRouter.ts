import express from "express";
import { musicController } from "../controller/MusicController";

export const musicRouter = express.Router();

musicRouter.post("/new", musicController.createMusic);
musicRouter.get("/all", musicController.getAllMusics);
musicRouter.get("/:id", musicController.getMusicById);