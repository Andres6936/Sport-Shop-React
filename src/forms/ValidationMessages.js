/**
 * Create messages that can be shown to the user.
 *
 * @returns {[string]} List with the messages of error.
 */
export const GetMessages = (elem) => {
    const messages = [];
    if (elem.validity.valueMissing) {
        messages.push("Value Required");
    }

    if (elem.validity.typeMismatch) {
        messages.push(`Invalid ${elem.type}`)
    }

    return messages;
}