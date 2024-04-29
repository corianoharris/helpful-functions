import { GOOGLE_PLACES_OPTIONS } from "utils/constants";
import stjude from "utils/stjude";

export function generateGoogleMapsApiScriptTag({ googleApiKey }) {
  const googleApiSrc = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
  const scriptTag = document.createElement("script");

  // Set script tag attributes
  scriptTag.setAttribute("async", true);
  scriptTag.setAttribute("defer", true);
  scriptTag.setAttribute("type", "text/javascript");
  scriptTag.setAttribute("src", googleApiSrc);

  // Append script tag to body tag
  document.body.appendChild(scriptTag);

  // Listen for load event, if callback exists
  if (
    window.stjude.msa.googleMapsInitCallbacks &&
    window.stjude.msa.googleMapsInitCallbacks.length
  ) {
    scriptTag.addEventListener("load", () => {
      try {
        window.stjude.msa.googleMapsInitCallbacks.forEach(callbackFn => {
          callbackFn();
        });
      } catch (e) {
        console.error(e);
      }
    });
  }
}

export function initGoogleAddressAutocomplete({ addressInput }) {
  const defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90, -180),
    new google.maps.LatLng(90, 180)
  );
  const options = {
    bounds: defaultBounds,
    componentRestrictions: {
      country: GOOGLE_PLACES_OPTIONS.COMPONENT_RESTRICTIONS.COUNTRY
    },
    fields: [GOOGLE_PLACES_OPTIONS.FIELDS.ADDRESS_COMPONENTS],
    types: [GOOGLE_PLACES_OPTIONS.TYPES.ADDRESS]
  };

  const googleAddressAutocomplete = new google.maps.places.Autocomplete(
    addressInput,
    options
  );

  stjude.attach("msa", "googleAddressAutocomplete", googleAddressAutocomplete);
}
