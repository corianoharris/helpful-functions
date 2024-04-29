/**
 * VENDOR CONSTANTS
 */
export const GOOGLE_PLACES_OPTIONS = {
  COMPONENT_RESTRICTIONS: {
    COUNTRY: [
      "us",
      "pr"
      /**
       * TODO: Add ISO-3166-2 codes for other US territories:
       *
       * "as",
       * "fm",
       * "gu",
       * "mh",
       * "mp",
       * "pw",
       * "vi"
       */
      // Unused by MSA: "ca", "mx"
    ]
  },
  FIELDS: {
    ADDRESS_COMPONENTS: "address_components"
  },
  TYPES: {
    ADDRESS: "address"
  }
};

export const GOOGLE_ADDRESS_COMPONENT = {
  VALID_TYPES: [
    "street_number",
    "route",
    "locality",
    "administrative_area_level_1",
    "postal_code",
    "country"
  ],
  MAPPING: {
    street_number: {
      key: "street1",
      version: "short_name"
    },
    route: {
      key: "street1",
      version: "short_name"
    },
    locality: {
      key: "city",
      version: "long_name"
    },
    administrative_area_level_1: {
      key: "stateCode",
      version: "short_name"
    },
    country: {
      key: "country",
      version: "short_name"
    },
    postal_code: {
      key: "zipCode",
      version: "long_name"
    }
  }
};

export const GOOGLE_TERRITORY_CODES = {
  US: ["AS", "AA", "AE", "AP", "FM", "GU", "MH", "MP", "PW", "PR", "VI"]
};

// Janrain constants
export const JANRAIN_STATUS_CODES = {
  OK: "ok",
  ERROR: "error"
};

export const JANRAIN_ERROR_CODES = {
  ACCOUNT_LOCKOUT: "account_locked_out",
  API_CLIENT_INVALID: 403,
  INVALID_CREDENTIALS: 210
};

/**
 * APPLICATION CONSTANTS
 */

// Different input types
export const INPUT = {
  NUMBER: "number",
  PASSWORD: "password",
  RADIO: "radio",
  TEL: "tel",
  TEXT: "text"
};

// Aria attributes
export const ARIA = {
  CONTROLS: {
    ATTRIBUTE: "aria-controls"
  },
  EXPANDED: {
    ATTRIBUTE: "aria-expanded",
    OPTIONS: {
      TRUE: "true",
      FALSE: "false"
    }
  },
  HIDE: {
    ATTRIBUTE: "aria-hidden",
    OPTIONS: {
      TRUE: "true",
      FALSE: "false"
    }
  },
  POPUP: {
    ATTRIBUTE: "aria-haspopup",
    OPTIONS: {
      TRUE: "true",
      FALSE: "false"
    }
  }
};

// typeof values
export const TYPEOF = {
  FUNCTION: "function",
  NUMBER: "number"
};

// Validation rules for input fields
export const FIELD_VALIDATION_PATTERNS = {
  FIRST_NAME: {
    /**
     * Pattern accepts all alphabetical characters with accents,
     *  including umlauts
     *
     * Utilizing the "range" operator "exploits the ordering
     *  of characters in the charset to define a continuous
     *  range" (comment by @Angad, see link below)
     *
     * Adapted from https://stackoverflow.com/a/26900132/4233945
     */
    legalChar: {
      key: "legalChar",
      pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ \-]{1,100}$/
    },
    illegalChar: {
      key: "illegalChar",
      pattern: /^[^?!@#$%^&*()=+:;<>,/{}[\]_0-9]{1,100}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{1,100}$/i
    }
  },
  MIDDLE_NAME: {
    legalChar: {
      key: "legalChar",
      pattern: /^([A-Za-zÀ-ÖØ-öø-ÿ][\-]?){1,50}$/
    },
    illegalChar: {
      key: "illegalChar",
      pattern: /^[^?!@#$%^&*()=+:;<>,/{}[\]_0-9]{1,50}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{1,50}$/
    }
  },
  LAST_NAME: {
    legalChar: {
      key: "legalChar",
      pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ \-]{2,200}$/
    },
    illegalChar: {
      key: "illegalChar",
      pattern: /^[^?!@#$%^&*()=+:;<>,/{}[\]_0-9]{2,200}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{2,200}$/i
    }
  },
  PHONE: {
    format: {
      key: "format",
      pattern: /^(1\-)?[0-9]{3}(\-)?[0-9]{3}(\-)?[0-9]{4}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{10,40}$/
    }
  },
  EMAIL: {
    format: {
      key: "format",
      pattern: /^.+@.+\.[a-z]{2,}$/
    },
    hasAtSymbol: {
      key: "hasAtSymbol",
      pattern: /@/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{6,256}$/
    }
  },
  USERNAME: {
    format: {
      key: "format",
      pattern: /^[a-zA-Z0-9\-.\_]{6,256}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{6,256}/
    }
  },
  PASSWORD: {
    capitalAlpha: { key: "capitalAlpha", pattern: /[A-Z]+/ },
    format: { key: "format", pattern: /^[a-zA-Z0-9!#$%\-_=+<>.]+$/ },
    lowercaseAlpha: { key: "lowercaseAlpha", pattern: /[a-z]+/ },
    minMax: { key: "minMax", pattern: /^.{8,64}$/ },
    number: { key: "number", pattern: /[0-9]+/ },
    specialCharacter: {
      key: "specialCharacter",
      pattern: /[!#$%\-_=+<>.]+/
    }
  },
  STREET_ADDR_1: {
    // Uses positive lookaheads to match alphas/numerics/space characters apositionally
    format: {
      key: "format",
      pattern: /^((?=[^?!@$%^&*()=+:;<>,{}[\]_"]*[0-9])(?=[^?!@$%^&*()=+:;<>,{}[\]_"]* )(?=[^?!@$%^&*()=+:;<>,{}[\]_"]*[A-Za-zÀ-ÖØ-öø-ÿ])[^?!@$%^&*()=+:;<>,{}[\]_"]*){3,300}$/i
    },
    illegalChar: {
      key: "illegalChar",
      pattern: /^[^?!@$%^&*()=+:;<>,{}[\]_"]{3,300}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{3,300}$/
    }
  },
  STREET_ADDR_2: {
    format: {
      key: "format",
      pattern: /^((?=[^?!@$%^&*()=+:;<>,{}[\]_"]* )(?=[^?!@$%^&*()=+:;<>,{}[\]_"]*[A-Za-zÀ-ÖØ-öø-ÿ])[^?!@$%^&*()=+:;<>,{}[\]_"]*){3,50}$/
    },
    illegalChar: {
      key: "illegalChar",
      pattern: /^[^?!@$%^&*()=+:;<>,{}[\]_"]{3,50}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{3,50}$/
    }
  },
  CITY: {
    legalChar: {
      key: "legalChar",
      pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ \-\.']{2,100}$/
    },
    illegalChar: {
      key: "illegalChar",
      pattern: /^[^?!@#$%^&*()=+:;<>,{}[\]_"]{2,100}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{2,100}$/
    }
  },
  STATE: {
    format: {
      key: "format",
      pattern: /^[a-z]{2}$/i
    }
  },
  POSTAL_CODE: {
    format: {
      key: "format",
      pattern: /^[0-9]{5}$/
    },
    minMax: {
      key: "minMax",
      pattern: /^.{5}$/
    }
  },
  COUNTRY: {
    minMax: {
      key: "minMax",
      pattern: /[a-z]{3}/i
    }
  },
  PLEDGE_ID: {
    format: {
      key: "format",
      pattern: /^([0-9]+(,?[ ]*)?\n?)+$/
    }
  },
  CURRENCY: {
    format: {
      key: "format",
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/
    }
  },
  GIFT_AMOUNT: {
    min: {
      key: "min",
      func: inputValue => parseInt(inputValue) >= 5
    }
  },
  CC_NUMBER: {
    format: {
      key: "format",
      pattern: /^[0-9]{8,16}$/
    }
  },
  CC_NAME: {
    format: {
      key: "format",
      pattern: /^.+(\s.+\.?)?\s.+$/
    }
  },
  CC_EXPIRATION: {
    format: {
      key: "format",
      pattern: /^[0-9]{2}$/
    },
    validMonth: {
      key: "validMonth",
      func: inputValue => {
        const valueLength = inputValue.length;
        const monthDigit = parseInt(inputValue);

        /**
         * Because the month input field accepts a leading zero, check
         *  value's length before checking if the digit is zero
         */
        const isNotZero = valueLength > 1 ? monthDigit > 0 : true;

        return isNotZero && monthDigit <= 12;
      }
    }
  },
  CC_CVV: {
    format: {
      key: "format",
      pattern: /^[0-9]{3,4}$/
    }
  },
  CANCEL_REASON: {
    hasValue: {
      key: "hasValue",
      pattern: /^[a-zA-Z ]+$/
    }
  },
  CANCEL_COMMENT: {
    minMax: {
      key: "minMax",
      pattern: /^.{0,500}$/
      // func: inputValue => inputValue.length <= 500
    }
  }
};

// Static resources associated with validation patterns
export const FIELD_VALIDATION_RESOURCES = {
  PASSWORD: {
    /**
     * Ignore strings for RegExp constructor consumption from being formatted against
     *  normal string standards
     */

    // prettier-ignore
    specialCharacters: "!#$%\\-_=+<>."
  }
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT"
};

export const LEGACY_VALIDATIONS = {
  PHONE: {
    PATTERN: /([0-9]-)?[0-9]{3}\-?[0-9]{3}\-?[0-9]{4}/,
    MIN_LENGTH: 10,
    MAX_LENGTH: 40
  }
};

/**
 * Global transition speed as set in config-maps (SCSS) for Hope Framework
 * @var {number} GLOBAL_TRANSITION_SPEED
 */
export const GLOBAL_TRANSITION_SPEED = 333;

/**
 * Breakpoint constants for use in resize event listeners
 * @var {{ VISIBLE_CEILING: number, HIDDEN_FLOOR: number }} MENU_BREAKPOINTS
 */
export const MENU_BREAKPOINTS = {
  VISIBLE_CEILING: 949,
  HIDDEN_FLOOR: 950
};

/**
 * Events that can be dispatched/listened to by external entities
 * @var {{ OPEN: string, CLOSE: string }} MENU_EVENTS
 */
export const MENU_EVENTS = {
  OPEN: "OPEN",
  CLOSE: "CLOSE"
};

/**
 * Status strings sent in standardized service responses
 * @var {{ SUCCESS: string, FAILURE: string }} REQUEST_STATUS
 */
export const REQUEST_STATUS = {
  SUCCESS: "success",
  FAILURE: "failure"
};

/**
 * Auth solution strings used in General template author dialog
 * @var {{ JANRAIN: "janrain", HOSTED_LOGIN: "hl" }} AUTH_SOLUTION
 */
export const AUTH_SOLUTION = {
  JANRAIN: "janrain",
  HOSTED_LOGIN: "hl"
};

/**
 * Strings used by analtyics events
 * @var {{ ACTION_RESULT: { ERROR: "Error", SUCCESS: "Success" }}} ANALYTICS
 */
export const ANALYTICS = {
  ACTION_RESULT: {
    ERROR: "Error",
    SUCCESS: "Success"
  }
};

/**
 * Service-provided payment method strings
 * @type {{
 * AMERICAN_EXPRESS: "AmericanExpress",
 *  DIRECT_DEBIT: "DirectDebit",
 *  DISCOVER: "Discover",
 *  MASTERCARD: "MasterCard",
 *  OTHER: "Other",
 *  PAYPAL: "PayPal",
 *  VISA: "Visa",
 *  UNKNOWN: "unknown"
 * }}
 */
export const PAYMENT_METHOD_TYPES = {
  AMERICAN_EXPRESS: "AmericanExpress",
  DIRECT_DEBIT: "DirectDebit",
  DISCOVER: "Discover",
  MASTERCARD: "MasterCard",
  OTHER: "Other",
  PAYPAL: "PayPal",
  VISA: "Visa",
  UNKNOWN: "unknown"
};

/**
 * Maps service-provided payment methods to user-friendly content
 */
export const PAYMENT_METHOD_MAP = {
  [PAYMENT_METHOD_TYPES.AMERICAN_EXPRESS]: "American Express",
  [PAYMENT_METHOD_TYPES.DIRECT_DEBIT]: "Direct Debit",
  [PAYMENT_METHOD_TYPES.DISCOVER]: "Discover",
  [PAYMENT_METHOD_TYPES.MASTERCARD]: "Mastercard",
  [PAYMENT_METHOD_TYPES.OTHER]: "Other",
  [PAYMENT_METHOD_TYPES.PAYPAL]: "PayPal",
  [PAYMENT_METHOD_TYPES.VISA]: "Visa",
  [PAYMENT_METHOD_TYPES.UNKNOWN]: "unknown"
};

/**
 * Maps Cleave.js-provided payment methods to user-friendly content
 */
export const CREDIT_CARD_TYPE_MAP = {
  amex: "AmericanExpress",
  discover: "Discover",
  mastercard: "MasterCard",
  visa: "Visa",
  unknown: "unknown"
};

export const PAYMENT_REQUEST_ERROR_MAP = {
  InvalidDataError:
    "The payment information received is invalid. Please correct any errors and try again.",
  CreditCardExpired: "Your credit card has expired. Please use a different card.",
  CreditCardInsufficientFunds:
    "There are insufficient funds in your account. Please use a different card.",
  CreditCardInvalidVerificationNumber:
    "Your security code is invalid. Please check the number or use a different card.",
  CreditCardInvalidAccount:
    "Sorry, your payment didn't go through. Choose another payment option, or contact us at (800) 215-8834 or donors@stjude.org.",
  InvalidDataPayment:
    "The payment information received is invalid. Please correct any errors and try again.",
  CreditCardDecline:
    "Sorry, your payment didn't go through. Choose another payment option, or contact us at (800) 215-8834 or donors@stjude.org.",
  CreditCardInactive:
    "Sorry, your payment didn't go through. Choose another payment option, or contact us at (800) 215-8834 or donors@stjude.org.",
  CreditCardDecline:
    "Sorry, your payment didn't go through. Choose another payment option, or contact us at (800) 215-8834 or donors@stjude.org.",
  CreditCardError:
    "We're sorry, we're unable to process your payment at this time. Please try again later. To set up your payment now, please call (800) 215-8834. Thank you for your support!",
  APGTimeoutError:
    "We're sorry, we're unable to process your payment at this time. Please try again later. To set up your payment now, please call (800) 215-8834. Thank you for your support!",
  InternalServerError:
    "We're sorry, we're unable to process your payment at this time. Please try again later. To set up your payment now, please call (800) 215-8834. Thank you for your support!",
  InvalidDataMain:
    "We're unable to process your payment. Please try again later, or contact us at (800) 215-8834 or donors@stjude.org.",
  InvalidJSON:
    "We're unable to process your payment. Please try again later, or contact us at (800) 215-8834 or donors@stjude.org.",
  InvalidRequest:
    "Sorry, your payment didn't go through. Choose another payment option or contact us at (800) 215-8834 or donors@stjude.org.",
  Timeout:
    "Sorry your payment didn't go through. Choose another payment option or contact us at (800) 215-8834 or donors@stjude.org.",
  Error:
    "We're sorry, we're unable to process your payment at this time. Please try again later. To set up your payment now, please call (800) 215-8834. Thank you for your support!",
  JavaScriptException:
    "We're sorry, we're unable to process your payment at this time. Please try again later. To set up your payment now, please call (800) 215-8834. Thank you for your support!"
};
