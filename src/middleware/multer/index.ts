import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, "../../uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname.split(" ").join("_"));
	}
});

// const storage = multer.memoryStorage();

export const upload = multer({ dest: "src/uploads/", storage });
