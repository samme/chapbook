/*
Create a new function, by eval, providing an error message if it fails to parse.
*/

export default function newFunction(body, errorMessage) {
	try {
		return new Function(body);
	} catch (err) {
		err.message = `${errorMessage}. ${err.message}`;
		throw err;
	}
}
