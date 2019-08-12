import messages from '../consts/messages';


// this util converts a error message object (string/array) to a string.
export const resMessageParser = (err, defaultMessage = messages.UNKNOWN_ERROR) => {
	try {
		const messages = err.messages;
		if (Array.isArray(messages))
			return messages.join(", ");
		else if ((typeof messages) === 'string')
			return messages;
		else throw err;
	} catch (err) {
		return defaultMessage;
	}
}