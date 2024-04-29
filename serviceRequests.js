import { HTTP_METHODS } from "utils/constants";
import userSignOut from "utils/userSignOut";

/**
 * UTILITIES
 */

/**
 * Make request using org.stjude.util.makeRequest utility
 * @param {Object} config
 * @param {string} config.url
 * @param {string} config.method
 * @param {(Object|null)} [config.data=null]
 * @param {string} [config.contentType="application/json"]
 * @param {function} [config.success=()=>{}]
 * @param {function} [config.error=()=>{}]
 * @param {any[]} config.restProperties Remaining properties in config object
 */
function sjRequest({
  url,
  method,
  data = null,
  contentType = "application/json",
  success = () => {},
  error = () => {},
  ...restProperties
}) {
  window.stjude.msa.utils.request({
    url,
    method,
    contentType,
    data: data ? JSON.stringify(data) : null,
    success,
    error,
    ...restProperties
  });
}

/**
 * CONSTITUENT/C360 REQUESTS
 */

// Constituent profile data requests

function create({ accessToken, data, error }) {
  if (accessToken) {
    sjRequest({
      url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter/create`,
      method: HTTP_METHODS.POST,
      headers: [
        {
          Authorization: `Bearer ${accessToken}`
        }
      ],
      data,
      error
    });
  } else {
    const error = new Error("No access token is available");
    error.name = "CreateConstituentRequestError";
    throw error.toString();
  }
}

/**
 * Edits constituent data through Janrain APIs
 * @param {Object} config
 * @param {{ [string]: any }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function cssoEdit({ data, success, error }) {
  const accessToken = window.stjude.shared.cookie.getCookie("access_token");

  if (accessToken) {
    sjRequest({
      url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter`,
      method: HTTP_METHODS.PUT,
      headers: [
        {
          Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
        }
      ],
      data: {
        ...data,
        // hard-code USA until i18n is in place for registration
        country: "USA"
      },
      success,
      error
    });
  } else {
    userSignOut({ redirectPath: `${signInPageURL}?code=session_expired` });
  }
}

/**
 * Updates constituent data through OIDC APIs
 * @param {Object} config
 * @param {{ [string]: any }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function updateProfile({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter`,
    method: HTTP_METHODS.PUT,
    credentials: true,
    data: {
      ...data,
      // hard-code USA until i18n is in place for registration
      country: "USA"
    },
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {function} config.success
 * @param {function} config.error
 */
function getEmailPreferences({ success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter/email/preference`,
    headers: [
      {
        Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
      }
    ],
    method: HTTP_METHODS.GET,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {{ newsletterPreferences: { newsletterId: string, isSubscribed: boolean }[] }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function editEmailPreferences({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter/email/preference`,
    headers: [
      {
        Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
      }
    ],
    method: HTTP_METHODS.PUT,
    data,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {{ channelPreference: { mail: boolean, phone: boolean, email: boolean }}} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function editChannelPreferences({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter/preference`,
    headers: [
      {
        Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
      }
    ],
    method: HTTP_METHODS.PUT,
    data,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {{ pledgeIds: string[] }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function lookupPledgeIds({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter/commitment`,
    headers: [
      {
        Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
      }
    ],
    method: HTTP_METHODS.PUT,
    data,
    success,
    error
  });
}

/**
 * Make POST request to Constituent endpoint to search for constituent
 * @param {Object} config
 * @param {{ [string]: any }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function search({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/constituent/search`,
    headers: [{ "Access-Control-Allow-Origin": "http://localhost,stjude.org" }],
    method: HTTP_METHODS.POST,
    data,
    success,
    error
  });
}

/**
 * CSSO REQUESTS
 */

/**
 * Make POST request to cross-reference endpoint to link Janrain profile with C360 constituent
 * @param {Object} config
 * @param {{ clientId: string, consId: string, uuid: string }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function crossReference({ data: { clientId, consId, uuid }, success, error }) {
  sjRequest({
    url: `${window.org.stjude.csso.csso_cross_reference_entity_update}?clientId=${clientId}&consId=${consId}&uuid=${uuid}`,
    method: HTTP_METHODS.POST,
    headers: [{ "x-ibm-client-id": window.stjude.digitalData.api.cssoIbmClientId }],
    success,
    error
  });
}

/**
 * Calls the auth_native_traditional CSSO API
 * @param {Object} config
 * @param {string} config.email
 * @param {string} config.password
 * @param {string} [config.locale="en-US"]
 * @param {function} config.success
 * @param {function} config.noUserFound
 * @param {function} config.error
 */
function login({ email, password, locale = "en-US", success, noUserFound, error }) {
  window.org.stjude.csso.authNativeTraditional(
    email,
    password,
    locale,
    success,
    noUserFound,
    error
  );
}

/**
 * Calls the update_password CSSO API
 * @param {Object} config
 * @param {string} config.oldPassword
 * @param {string} config.newPassword
 * @param {string} config.confirmPassword
 * @param {function} config.success
 * @param {function} config.error
 */
function cssoUpdatePassword({
  oldPassword,
  newPassword,
  confirmPassword,
  success,
  error
}) {
  org.stjude.csso.update_password(
    window.stjude.shared.cookie.getCookie("access_token"),
    "en-US",
    oldPassword,
    newPassword,
    confirmPassword,
    success,
    error
  );
}

/**
 * Calls Supporter service endpoint to update user's password
 * @param {Object} config
 * @param {string} config.oldPassword
 * @param {string} config.newPassword
 * @param {function} config.success
 * @param {function} config.error
 */
function updatePassword({ oldPassword, newPassword, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/supporter/password`,
    method: HTTP_METHODS.POST,
    credentials: true,
    data: {
      applicationName: "MSA",
      currentPassword: oldPassword,
      newPassword
    },
    success,
    error
  });
}

/**
 * Pledge Management Services
 */

/**
 *
 * @param {Object} config
 * @param {function} config.success
 * @param {function} config.error
 */
function getPledgeSummaries({ success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/commitment/summary`,
    headers: [
      {
        Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
      }
    ],
    method: HTTP_METHODS.GET,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {string} config.id
 * @param {function} config.success
 * @param {function} config.error
 */
function getTransactionHistory({ id, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/commitment/history/${id}`,
    headers: [
      {
        Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
      }
    ],
    method: HTTP_METHODS.GET,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {{ pledgeId: string, pledgeStatus: "Active" | "Paused" | "Canceled" | "Completed" | "Terminated", currentPledgeStatus: "Active" | "Paused" | "Canceled" | "Completed" | "Terminated", duration?: number }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function updatePledgeStatus({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/commitment/status`,
    headers: [
      {
        Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}`
      }
    ],
    method: HTTP_METHODS.PUT,
    data,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {{ pledgeId: string, newGiftAmount: number, prevGiftAmount: number }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function updateGiftAmount({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/commitment/amount`,
    headers: [
      { Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}` }
    ],
    method: HTTP_METHODS.PUT,
    data,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {{ pledgeId: string, newGiftDate: number }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function updateGiftDate({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/commitment/date`,
    headers: [
      { Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}` }
    ],
    method: HTTP_METHODS.PUT,
    data,
    success,
    error
  });
}

/**
 *
 * @param {Object} config
 * @param {{ pledgeId: string, cardHolderName: string, ccNumber: string, expMonth: string, expYear: string, cvv: string }} config.data
 * @param {function} config.success
 * @param {function} config.error
 */
function updateGiftPaymentMethod({ data, success, error }) {
  sjRequest({
    url: `${window.stjude.digitalData.api.constituentServiceURL}/msa/v1/commitment/updatepayment`,
    headers: [
      { Authorization: `Bearer ${window.stjude.shared.cookie.getCookie("access_token")}` }
    ],
    method: HTTP_METHODS.PUT,
    data,
    success,
    error
  });
}

// Constituent service requests
export const CONSTITUENT_SERVICES = {
  create,
  edit: cssoEdit,
  lookupPledgeIds,
  search
};

export const SUPPORTER_SERVICE = {
  updateProfile,
  updatePassword
};

// CSSO requests
export const CSSO_SERVICES = {
  crossReference,
  login,
  updatePassword: cssoUpdatePassword
};

// Preference requests
export const PREFERENCE_SERVICES = {
  getEmail: getEmailPreferences,
  editEmail: editEmailPreferences,
  editChannel: editChannelPreferences
};

// Pledge management request
export const GIFT_MGMT_SERVICES = {
  getPledgeSummaries,
  getTransactionHistory,
  updatePledgeStatus,
  updateGiftAmount,
  updateGiftDate,
  updateGiftPaymentMethod
};
