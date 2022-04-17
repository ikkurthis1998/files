import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
// const dbUri = process.env.DB_URI || "mongodb://localhost:27017/";

const project_id = process.env.PROJECT_ID;
const private_key_id = process.env.PRIVATE_KEY_ID;
const private_key = JSON.parse(process.env.PRIVATE_KEY as string);
const client_email = process.env.CLIENT_EMAIL;
const client_id = process.env.CLIENT_ID;
const client_x509_cert_url = process.env.CLIENT_X509_CERT_URL;

export {
	port,
	// dbUri,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	client_x509_cert_url
};
