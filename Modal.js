import dialogPolyfill from "dialog-polyfill";
import { GLOBAL_TRANSITION_SPEED } from "utils/constants";
import "utils/customEvent";

const MODAL_EVENTS = {
  OPEN: "modalOpen",
  CLOSE: "modalClose"
};

const MODAL_STATES = {
  OPEN: "OPEN",
  CLOSED: "CLOSED"
};

/**
 *
 * @param {Object} config
 * @param {Modal} config.modal
 * @param {function} config.syncCallback
 * @param {function} config.asyncCallback
 */
export const closeModalHandler = function closeModalAndUpdateFocus({
  modal,
  syncCallback = false,
  asyncCallback = false
}) {
  // Close the modal
  modal.close();

  // Blur the active element and call synchronous callback
  document.activeElement.blur();

  // Call synchronous callback if exists
  if (syncCallback) {
    syncCallback();
  }

  // Call asynchronous callback if exists
  if (asyncCallback) {
    setTimeout(asyncCallback, GLOBAL_TRANSITION_SPEED);
  }

  // Remove body classes to re-enable scrolling
  document.querySelector("html").classList.remove("disable-scroll");
  document.body.classList.remove("disable-scroll");
};

export class LegacyModal {
  constructor({ modalElement, defaultState = MODAL_STATES.CLOSED }) {
    // DOM elements
    this.modalElement = modalElement;

    // Properties
    this.extensions = {};
    this.prevDocumentActiveElement = document.activeElement;
    this.isDialogElement = this.modalElement.tagName === "DIALOG";
    this.isOpen = defaultState === MODAL_STATES.OPEN;

    // Methods
    this.addExtension = this.addExtension.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.removeExtension = this.removeExtension.bind(this);

    // Setup event listeners
    this.modalElement.addEventListener(MODAL_EVENTS.OPEN, e => {
      if (this.isDialogElement) {
        this.modalElement.setAttribute("open", MODAL_STATES.OPEN);
      }

      setTimeout(() => {
        this.modalElement.classList.add("open");
      }, GLOBAL_TRANSITION_SPEED);
      this.isOpen = true;
    });

    this.modalElement.addEventListener(MODAL_EVENTS.CLOSE, e => {
      if (this.isDialogElement) {
        setTimeout(() => {
          this.modalElement.removeAttribute("open");
        }, GLOBAL_TRANSITION_SPEED);
      }

      this.modalElement.classList.remove("open");
      this.isOpen = false;
    });
  }

  /**
   * Add custom functionality to either the Modal instance or the instance's
   *  input element; ideal for adding third-party functionality.
   * @param {string} key Key by which a extension is identified
   * @param {function} extensionFn Function that initializes extension
   */
  addExtension(key, extensionFn) {
    try {
      const extensionInstance = extensionFn();

      if (!this.extensions.hasOwnProperty(key)) {
        this.extensions[key] = extensionInstance;
      } else if (this.extensions.hasOwnProperty(key)) {
        throw new Error(`Modal instance already has an extension registered to ${key}`);
      }
    } catch (err) {
      err.name = "AddExtensionError";
      throw err.toString();
    }
  }

  open() {
    this.prevDocumentActiveElement = window.document.activeElement;
    this.modalElement.dispatchEvent(new CustomEvent(MODAL_EVENTS.OPEN));
  }
  close() {
    this.modalElement.dispatchEvent(new CustomEvent(MODAL_EVENTS.CLOSE));
    this.prevDocumentActiveElement.focus();
  }

  /**
   * Removes custom functionality attached to the Modal instance; ideal for
   *  destroying or disabling third-party library functionality.
   * @param {string} key Key of extension to remove from Modal instance
   * @param {function} extensionRemovalFn Function that removes extension functionality
   */
  removeExtension(key, extensionRemovalFn) {
    try {
      if (!this.extensions.hasOwnProperty(key)) {
        throw new Error(`Modal instance has no extension registered to key ${key}`);
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
}

export class Modal {
  constructor(
    { container, modal, defaultState } = { defaultState: MODAL_STATES.CLOSED }
  ) {
    this.backdrop = container.querySelector(".msa-modal-backdrop");
    this.closeButton = container.querySelector(".modal-close-btn") ?? false;
    this.container = container;
    this.isOpen = MODAL_STATES.OPEN === defaultState;
    this.modal = modal;
    this.pages = [];

    this.escKeyupHandler = () => {
      this.close();
    };

    // Register container as dialog
    dialogPolyfill.registerDialog(container);

    this.closeButton.addEventListener("focusout", e => {
      const isRelatedTargetNull = e.relatedTarget === null;

      if (!isRelatedTargetNull && !this.modal.contains(e.relatedTarget)) {
        e.preventDefault();

        this.backdrop.focus();
      }
    });

    this.backdrop.addEventListener("focusout", e => {
      const isRelatedTargetNull = e.relatedTarget === null;

      if (!isRelatedTargetNull && !this.modal.contains(e.relatedTarget)) {
        e.preventDefault();

        this.closeButton.focus();
      }
    });

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open({ syncCallback = () => {}, asyncCallback = () => {} } = {}) {
    document.querySelector("html").classList.add("disable-scroll");
    document.body.classList.add("disable-scroll");

    this.container.classList.add("show");
    this.container.show();

    // Add event listener
    window.addEventListener("keyup", e => {
      if (e.code === "Escape" && this.isOpen) {
        this.escKeyupHandler();
      }
    });

    // call synchronous callback
    syncCallback();

    setTimeout(() => {
      this.modal.classList.add("show");
      this.isOpen = true;

      // call asynchronous callback
      asyncCallback();
    }, GLOBAL_TRANSITION_SPEED / 3);
  }

  close({
    removeScrollClasses = true,
    syncCallback = () => {},
    asyncCallback = () => {}
  } = {}) {
    this.modal.classList.remove("show");
    this.isOpen = false;

    // Remove event listener
    window.removeEventListener("keyup", this.escKeyupHandler);

    // call synchronous callback
    syncCallback();

    setTimeout(() => {
      this.container.classList.remove("show");
      this.container.close();

      if (removeScrollClasses) {
        document.querySelector("html").classList.remove("disable-scroll");
        document.body.classList.remove("disable-scroll");
      }

      // call asynchronous callback
      asyncCallback();
    }, GLOBAL_TRANSITION_SPEED * 2);
  }

  registerEscHandler(escKeyupHandler) {
    this.escKeyupHandler = escKeyupHandler;
  }

  /**
   *
   * @param {HTMLElement[]} pagesToRegister
   * @returns {HTMLElement[]}
   */
  registerPages(
    pagesToRegister = Array.from(this.modal.querySelectorAll(".modal-page"))
  ) {
    if (pagesToRegister.length > 0) {
      this.pages = Array.from(pagesToRegister);
    }

    return this.pages;
  }

  resetPages({ startingPage }) {
    const openPage = this.modal.querySelector(".modal-page.show");

    if (openPage !== startingPage) {
      openPage.classList.remove("show");

      setTimeout(() => {
        openPage.classList.add("hide");
        startingPage.classList.remove("hide");

        setTimeout(() => {
          startingPage.classList.add("show");
        }, GLOBAL_TRANSITION_SPEED);
      }, GLOBAL_TRANSITION_SPEED);
    }
  }

  transitionPages({ from: currentPage, to: nextPage }) {
    currentPage.classList.remove("show");

    setTimeout(() => {
      currentPage.classList.add("hide");
      nextPage.classList.remove("hide");

      setTimeout(() => {
        nextPage.classList.add("show");
      }, GLOBAL_TRANSITION_SPEED);
    }, GLOBAL_TRANSITION_SPEED);
  }
}
