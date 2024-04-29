import { InputField } from "./InputField";

/**
 * @typedef {{ UP: "UP", DOWN: "DOWN"}}
 */
export const CHARACTER_COUNTER_DIRECTION = {
  UP: "UP",
  DOWN: "DOWN"
};

export class CharacterCounter {
  /**
   * @class CharacterCounter
   * @param {object} config
   * @param {InputField} config.inputField
   * @param {HTMLElement} config.counterElement
   * @param {number | false} [config.minLength=false]
   * @param {number} config.maxLength
   * @param {"UP"  | "DOWN"} config.direction
   */
  constructor({
    inputField,
    counterElement,
    minLength = false,
    maxLength,
    direction = CHARACTER_COUNTER_DIRECTION.UP
  } = {}) {
    /** @type {InputField} */
    this.inputField = inputField;

    /** @type {HTMLElement} */
    this.counterElement = counterElement;

    /** @type {number | false} */
    this.minLength = minLength;

    /** @type {number} */
    this.maxLength = maxLength;

    /** @type {"UP"  | "DOWN"} */
    this.direction = direction;

    /** @type {number} */
    this.count = 0;

    /** @type {boolean} */
    this.isError = false;

    /**
     * Bind methods
     */

    // Private methods
    this.getDisplayNumber = this.getDisplayNumber.bind(this);
    this.updateCount = this.updateCount.bind(this);

    // Public methods
    this.init = this.init.bind(this);
    this.reset = this.reset.bind(this);

    // Return instance
    return this;
  }

  init() {
    if (this.counterElement) {
      this.counterElement.innerText = this.getDisplayNumber(0);
    }

    this.inputField.addEventListener("input", () => {
      this.updateCount(this.inputField.value.length);
    });
  }

  /**
   * @private
   * @param {number} num
   */
  getDisplayNumber(num) {
    if (this.direction === CHARACTER_COUNTER_DIRECTION.DOWN) {
      return this.maxLength - num;
    } else {
      return num;
    }
  }

  /**
   * @private
   * @param {number} newCount
   */
  updateCount(newCount) {
    this.count = newCount;

    if (this.counterElement) {
      this.counterElement.innerText = this.getDisplayNumber(this.count);
    }
  }

  /**
   * Resets counter and counter element text
   */
  reset() {
    this.count = 0;

    if (this.counterElement) {
      this.counterElement.innerText = this.getDisplayNumber(this.count);
    }
  }
}
