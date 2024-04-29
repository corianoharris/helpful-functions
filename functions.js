/**
 * @param {string} errorMessage Error message to display
 */
export function createErrorMessage(errorMessage) {
  return `<i class='icon-close'></i> ${errorMessage}`;
}

/**
 * Function to bind a templated code with a replacement value in an error message
 * @param {string} message Template string to replace in message
 * @param {HTMLInputElement} input Input element to read attribute/dataset from
 * @returns {Function}
 */
export function formatMessage(message, input) {
  let formattedMessage = message;
  const matches = formattedMessage.match(/\{\s?((data-)?[a-z]+)\s?\}/g);

  if (matches) {
    for (let match of matches) {
      formattedMessage = formattedMessage.replace(
        match,
        match.includes("data-")
          ? input.dataset[match.replace(/\{|data\-|\}/g, "")]
          : input[match.replace(/\{|\}/g, "")]
      );
    }
  }

  return formattedMessage;
}
