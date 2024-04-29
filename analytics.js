import { ANALYTICS } from "utils/constants";

/**
 * Pushes event data to the data layer for analytics monitoring
 * @param {{ name: string, action: string}} config
 */
export function fireEvent({ name, action }) {
  window.stjude.digitalData.event.push({
    category: {},
    eventInfo: {
      eventName: name,
      eventAction: action,
      timestamp: new Date()
    }
  });
}

/**
 * Initialize an analytics cart array
 * @param {{}[] | []} [initialArray=[]] Array to intialize cart item with
 */
export function initAnalyticsCart(initialArray = []) {
  window.stjude = window?.stjude ?? {};
  window.stjude.digitalData = window.stjude?.digitalData ?? {};
  window.stjude.digitalData.cart = window.stjude.digitalData?.cart ?? {};
  window.stjude.digitalData.cart.item =
    window.stjude.digitalData.cart.item ?? initialArray;
}

/**
 * Update analytics cart with specified attributes and values
 * @param {{ [string]: any }} attributeObj Object of attributes to update
 */
export function updateAnalyticsCartAttr(attributeObj) {
  const cart = window.stjude.digitalData.cart.item[0].attributes;

  for (let property in attributeObj) {
    cart[property] = attributeObj[property];
  }
}

/**
 * Initializes an array for storing push session events
 */
export function initSessionEventQueue() {
  window.stjude = window?.stjude ?? {};
  window.stjude.digitalData = window.stjude?.digitalData ?? {};
  window.stjude.digitalData.sessionEventQueue =
    window.stjude.digitalData?.sessionEventQueue ?? [];
}

/**
 * Pushes per-page view (session) event data to the data layer for
 *  analytics monitoring
 * @param {{ name: string, action: string}} config
 */
export function fireSessionEvent({ name, action }) {
  /**
   * If a once-per-session event has not already been fired (if it's name has
   *  not already been pushed to the sessionEventQueue array), fire the
   *  respective event
   */
  if (!window.stjude.digitalData.sessionEventQueue.includes(name)) {
    window.stjude.digitalData.sessionEventQueue.push(name);

    fireEvent({ name, action });
  }
}

/**
 * Format an error used in Profile analytics events
 * @param {string} errorMessage Text to append as analytics error
 * @returns {string}
 */
export function analyticsActionError(errorMessage) {
  return `${ANALYTICS.ACTION_RESULT.ERROR} - ${errorMessage}`;
}
