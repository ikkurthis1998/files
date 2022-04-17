const LCERROR = "\x1b[31m%s\x1b[0m"; //red
const LCWARN = "\x1b[33m%s\x1b[0m"; //yellow
const LCINFO = "\x1b[36m%s\x1b[0m"; //cyan
const LCSUCCESS = "\x1b[32m%s\x1b[0m"; //green

export const log = class {
	static error = (message: string) => {
		console.error(LCERROR, message);
	};
	static warn = (message: string) => {
		console.warn(LCWARN, message);
	};
	static info = (message: string) => {
		console.info(LCINFO, message);
	};
	static success = (message: string) => {
		console.info(LCSUCCESS, message);
	};
};
