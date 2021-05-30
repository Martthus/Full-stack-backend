import express from "express";
import { musicController } from "../controller/MusicController";

export const musicRouter = express.Router();

<<<<<<< HEAD
musicRouter.post("/", musicController.createMusic);
musicRouter.get("/", musicController.getAllMusics);
=======
musicRouter.post("/new", musicController.createMusic);
musicRouter.get("/all", musicController.getAllMusics);
>>>>>>> 04fa08a9f80e9dcb148b0a0b23c9dc3998598366
musicRouter.get("/:id", musicController.getMusicById);