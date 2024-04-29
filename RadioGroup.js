import { InputField } from "components/InputField";
import { decodeEntities } from "utils/xss";
import "utils/customEvent";

export class RadioGroup {
  /**
   * @class RadioGroup
   * @param {HTMLInputElement[]} radioInputArray
   * @param {Object} config
   * @param {string|false} [config.formId=false]
   */
  constructor(radioInputArray, config = { formId: false }) {
    /**
     * @type {boolean | InputField}
     */
    this.checked = false;
    /**
     * @type {null | CustomEvent | HTMLElement}
     */
    this.dispatcher = null;
    /**
     * @type {object}
     */
    this.events = {
      change: new CustomEvent("change")
    };
    /**
     * @description Extensions attached to this InputField
     */
    this.extensions = {};
    /**
     * @type {string|false}
     * @description Form ID for use as a registered input in a Form
     *  instance; allows for an explicit value to use as a property key
     *  when retrieving the input's value
     */
    this.formId = config.formId ? config.formId : false;
    /**
     * @type {object}
     */
    this.inputs = {};
    /**
     * @type {boolean | string}
     */
    this.name = false;
    /**
     * @type {string[]}
     */
    this.valueList = [];
    /**
     * @type {boolean}
     */
    this.isRequired = false;

    radioInputArray.forEach(radio => {
      const radioInputField = new InputField(radio);

      this.name = this.name ? this.name : radio.getAttribute("name");
      this.formId = this.formId ? this.formId : this.name;
      this.valueList.push(radio.value);
      this.inputs[radio.value] = radioInputField;

      if (radio.checked) {
        this.checked = radioInputField;
      }

      if (radioInputField.isRequired) {
        this.isRequired = true;
      }

      radioInputField.addExtension("check", radioInputElement => {
        return function checkRadioInput() {
          radioInputElement.checked = true;
        };
      });

      radioInputField.addExtension("uncheck", radioInputElement => {
        return function uncheckRadioInput() {
          radioInputElement.checked = false;
        };
      });

      radioInputField.addEventListener("change", () => {
        if (radioInputField.input.checked) {
          this.checked = radioInputField;
        }
        this.dispatchEvent("change");
      });
    });

    try {
      this.dispatcher = new EventTarget();
    } catch (e) {
      this.dispatcher = document.createElement("event-target");
    }

    // Methods
    this.addEventListener = this.addEventListener.bind(this);
    this.addExtension = this.addExtension.bind(this);
    this.dispatchEvent = this.dispatchEvent.bind(this);
    this.disable = this.disable.bind(this);
    this.removeExtension = this.removeExtension.bind(this);
    this.reset = this.reset.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  /**
   *
   * @param {string} eventID ID of event to add a listener for
   * @param {function} eventHandler Handler function for an event listener
   */
  addEventListener(eventID, eventHandler) {
    this.dispatcher.addEventListener(eventID, eventHandler);
  }

  /**
   * Add custom functionality to either the RadioGroup instance or the instance's
   *  input element; ideal for adding third-party functionality.
   * @param {string} key Key by which a extension is identified
   * @param {function} extensionFn Function that initializes extension
   */
  addExtension(key, extensionFn) {
    try {
      const extensionInstance = extensionFn(this.inputs);

      if (!this.extensions.hasOwnProperty(key)) {
        this.extensions[key] = extensionInstance;
      } else if (this.extensions.hasOwnProperty(key)) {
        throw new Error(
          `RadioGroup instance already has an extension registered to ${key}`
        );
      }
    } catch (err) {
      err.name = "AddExtensionError";
      throw err.toString();
    }
  }

  /**
   * Disables all constituent inputs
   */
  disable() {
    Object.values(this.inputs).forEach(inputField => {
      inputField.disable();
    });
  }

  /**
   * Enables all constituent inputs
   */
  enable() {
    Object.values(this.inputs).forEach(inputField => {
      inputField.enable();
    });
  }

  /**
   * Dispatches an event from the configured dispatcher
   * @param {string} id ID of event to dispatch
   */
  dispatchEvent(id) {
    this.dispatcher.dispatchEvent(this.events[id]);
  }

  /**
   * Removes custom functionality attached to the RadioGroup instance; ideal for
   *  destroying or disabling third-party library functionality.
   * @param {string} key Key of extension to remove from RadioGroup instance
   * @param {function} extensionRemovalFn Function that removes extension functionality
   */
  removeExtension(key, extensionRemovalFn) {
    try {
      if (!this.extensions.hasOwnProperty(key)) {
        throw new Error(`RadioGroup instance has no extension registered to key ${key}`);
      }

      if (typeof extensionRemovalFn === "function") {
        extensionRemovalFn(this.extensions[key]);
      }

      delete this.extensions[key];

      return this.extensions;
    } catch (err) {
      err.name = "RemoveExtensionError";
      throw err.toString();
    }
  }

  reset() {
    if (this.checked) {
      this.checked.extensions.uncheck();
      this.checked = null;
    }
  }

  /**
   * Return the value of the checked InputField
   */
  get value() {
    if (typeof this.extensions.getValue === "function") {
      return this.extensions.getValue();
    }

    return this.checked.value;
  }

  /**
   * Set new value as value of checked InputField
   * @param {string} inputName Property key of registered input to set
   *                            set as checked
   */
  setValue(inputName) {
    const isInputNameString = typeof inputName === "string";
    let inputNameToSet = inputName;

    if (isInputNameString) {
      inputNameToSet = decodeEntities(inputName);
    }

    if (typeof this.extensions.setValue === "function") {
      return this.extensions.setValue(inputNameToSet);
    }

    const checkedInputField = this.inputs[inputNameToSet];
    this.checked = checkedInputField;
    checkedInputField.extensions.check();
  }
}
