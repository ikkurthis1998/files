import * as secrets from "../secrets";

// export const serviceAccount = require("./serviceAccountKey.json");

export const serviceAccount = {
	type: "service_account",
	project_id: secrets.project_id,
	private_key_id: secrets.private_key_id,
	private_key: secrets.private_key as string,
	client_email: secrets.client_email,
	client_id: secrets.client_id,
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url: secrets.client_x509_cert_url
};
