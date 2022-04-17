import { log } from "../../utils/logger";
import { v4 as uuid } from "uuid";
import { FError } from "../../utils/error";
import { Request, Response } from "express";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { removeLocalFile } from "../../utils/fs";
import { bucket } from "../..";

export const uploadFilesController = async (
	req: Request,
	res: Response
) => {
	const traceId = uuid();
	log.info(`[${traceId}] [uploadFilesController] [START]`);
	const files = req.files as Express.Multer.File[];
    try {

        const path = req.body.path;

		const data = await Promise.all(
            files.map(async (file) => {
                log.info(`[${traceId}] [uploadFile] [START] [${file.originalname}]`);
				try {

                    const uploadRes = await bucket.upload(
                        file.path,
                        {
                            destination: `${path}/${file.originalname}`,
                            public: true,
                            metadata: {
                                cacheControl: "public, max-age=31536000",
                                contentType: file.mimetype
                            }
                        }
                    );

					log.info(
						`[${traceId}] [uploadFile] [END] [${file.originalname}]`
					);
					return uploadRes[0].metadata;
				} catch (error) {
					const errorMessage =
						(error as Error).message || "No error description";
                    log.error(
						`[${traceId}] [uploadFilesController] [ERROR] [${errorMessage}]`
					);
                    throw error
                }
			})
		);

		log.info(`[${traceId}] [uploadFilesController] [END]`);
		return res.status(httpStatusCode.OK).json({
			data
		});
	} catch (error) {
		Promise.all(
			files.map((file) => {
				removeLocalFile(file.path);
			})
		);
		const errorStatus =
			(error as FError).status || httpStatusCode.INTERNAL_SERVER_ERROR;
		const errorMessage = (error as Error).message || "No error description";
		log.error(
			`[${traceId}] [uploadFilesController] [ERROR] [${errorMessage}]`
		);
		return res.status(errorStatus).json({
			error: errorMessage
		});
	}
};
