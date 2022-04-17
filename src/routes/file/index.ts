import express from "express";
import { controller } from "../../controller";
import { upload } from "../../middleware/multer";

export const fileRouter = express.Router();

fileRouter.post("/upload", upload.any(), controller.uploadFilesController);

fileRouter.get("/download", controller.downloadFileController);
