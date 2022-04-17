import fs from "fs";
import { log } from "../logger";

export const removeLocalFile = (filePath: string) => {
	fs.unlink(filePath, (error) => {
		if (error) {
			log.warn(`[removeLocalFile] [WARN] [${error.message}]`);
		}
	});
};
