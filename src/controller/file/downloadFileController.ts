import { log } from "../../utils/logger";
import { v4 as uuid } from "uuid";
import { FError } from "../../utils/error";
import { Request, Response } from "express";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { bucket } from "../..";
import { File } from '@google-cloud/storage';

export const fileExists = async (file: File) => {
    return (await file.exists())[0]
}

export const downloadFileController = async (
	req: Request,
	res: Response
) => {
	const traceId = uuid();
	log.info(`[${traceId}] [downloadFileController] [START]`);
    try {

        const key = req.query.key as string;

        const file = bucket.file(key);

        if (!(await fileExists(file))) {
			log.error(
				`[${traceId}] [downloadFileController] [ERROR] File not found`
			);
			return res.status(httpStatusCode.NOT_FOUND).json({
				error: "File not found"
			});
		}

        file.createReadStream() //stream is created
            .pipe(res) //pipe the stream to the response object
			.on("finish", () => {
				log.info(`[${traceId}] [downloadFileController] [END]`);
				return; // The file download is complete
			})

	} catch (error) {
		const errorStatus =
			(error as FError).status || httpStatusCode.INTERNAL_SERVER_ERROR;
		const errorMessage = (error as Error).message || "No error description";
		log.error(
			`[${traceId}] [downloadFileController] [ERROR] [${errorMessage}]`
		);
		return res.status(errorStatus).json({
			error: errorMessage
		});
	}
};
