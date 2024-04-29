/**
 * @param {string} inputValue Value of input from which to strip dashes
 * @returns {string}
 */
export default function stripDashes(inputValue) {
  let value = inputValue;
  if (typeof inputValue !== "string") {
    value = inputValue.toString();
  }
  return value.replace(/[^0-9]/g, "");
}
