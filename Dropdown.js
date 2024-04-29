import { EventDispatcher } from "utils/classes";
import { MENU_EVENTS } from "utils/constants";

export class Dropdown extends EventDispatcher {
  constructor({ trigger, menu }) {
    // Pass menu element to EventDispatcher
    super(menu.getAttribute("id"));

    // Properties
    this.buttonElement = trigger;
    this.menuElement = menu;
    this.listElement = this.menuElement.children[0];
    this.isOpen = false;

    // Add events to events property
    this.createEvent(MENU_EVENTS.OPEN);
    this.createEvent(MENU_EVENTS.CLOSE);

    // Methods
    this.close = this.close.bind(this);
    this.focusoutHandler = this.focusoutHandler.bind(this);
    this.open = this.open.bind(this);
  }

  focusoutHandler(e) {
    const focusedEl = e.target;

    /**
     * Close FlyoutMenu if the focused element is not the FlyoutMenu
     *  trigger button or a link in the FlyoutMenu
     */
    if (
      focusedEl.parentNode !== this.buttonElement &&
      focusedEl !== this.buttonElement &&
      focusedEl.parentNode.parentNode.parentNode !== this.menuElement
    ) {
      this.close();
    }
  }

  open() {
    // Add attrs, classes for open flyout menu, update isOpen state
    this.buttonElement.setAttribute("aria-expanded", "true");
    this.menuElement.setAttribute("aria-hidden", "false");
    this.menuElement.classList.add("active");
    setTimeout(() => {
      this.menuElement.classList.add("transition");
    }, 50);
    this.isOpen = true;

    // Start listening to events
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("focusin", this.focusoutHandler);
    window.addEventListener("click", this.focusoutHandler);

    // Dispatch open event
    this.dispatchEvent(MENU_EVENTS.OPEN);
  }

  close() {
    // Remove attrs, classes for open flyout menu, update isOpen state
    this.buttonElement.setAttribute("aria-expanded", "false");
    this.menuElement.setAttribute("aria-hidden", "true");
    this.menuElement.classList.remove("transition");
    setTimeout(() => {
      this.menuElement.classList.remove("active");
    }, 333);
    this.isOpen = false;

    // Remove handlers for performance
    window.removeEventListener("focusin", this.focusoutHandler);
    window.removeEventListener("click", this.focusoutHandler);

    // Dispatch close event
    this.dispatchEvent(MENU_EVENTS.CLOSE);
  }
}
