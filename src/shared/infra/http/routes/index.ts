import { Router } from "express";

import { musicRouter } from "../../../../routes/musicRouter";
import { userRouter } from "../../../../routes/userRouter";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/music", musicRouter);

export default routes;