import { Request, Response, NextFunction } from "express";
// import { container } from "tsyringe";

import { CustomErrors } from "../../../error/CustomErrors";
// import UpdateLogService from "@modules/logs/services/UpdateLogService";
// import CreateLogService from "@modules/logs/services/CreateLogService";

const errorHandling = async (
    err: Error | any,
    request: Request,
    response: Response,
    _: NextFunction
) => {

    // const logId = request.log && request.log.id;

    // const updateLog = container.resolve(UpdateLogService);
    // const createLog = container.resolve(CreateLogService);

    console.log(err)
    console.log("error details", err?.message?.details)

    if (err instanceof CustomErrors) {
        // await updateLog.execute({
        //     logId,
        //     responseCode: err.statusCode,
        //     responseMessage: { success: false, message: err.message },
        // });

        return response
            .status(err.statusCode)
            .json({ success: false, message: err.message });
    }

    // const userId = request.user && request.user.id;

    // if (userId) {
    //     await createLog.execute({
    //         route: request.originalUrl,
    //         userId,
    //         requestMethod: request.method,
    //         requestBody: request.body,
    //         responseCode: 500,
    //         responseMessage: { success: false, message: err.message || "", error: err },
    //     });
    // }

    // await createLog.execute({
    //     route: request.originalUrl,
    //     requestMethod: request.method,
    //     requestBody: request.body,
    //     responseCode: 500,
    //     responseMessage: { success: false, message: err.message || "", error: err },
    // });

    return response.status(500).json({
        success: false,
        message: "Erro interno no servidor.",
    });
};

export default errorHandling;
