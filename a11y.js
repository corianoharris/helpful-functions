import { ARIA } from "utils/constants";

export const ariaHideElementsExcept = visibleElement => {
  const msaHeader = document.querySelector(".ams-header");
  const parsys1 = document.getElementById("site-content").querySelector(".par-1.parsys");
  const parsysChildren = Array.from(parsys1.children);
  const msaFooter = document.querySelector(".msa-footer");

  msaHeader.setAttribute(ARIA.HIDE.ATTRIBUTE, ARIA.HIDE.OPTIONS.TRUE);
  msaFooter.setAttribute(ARIA.HIDE.ATTRIBUTE, ARIA.HIDE.OPTIONS.TRUE);

  parsysChildren.forEach(parChild => {
    if (visibleElement !== parChild) {
      parChild.setAttribute(ARIA.HIDE.ATTRIBUTE, ARIA.HIDE.OPTIONS.TRUE);
    }
  });
};

export const ariaShowElements = () => {
  const msaHeader = document.querySelector(".ams-header");
  const parsys1 = document.getElementById("site-content").querySelector(".par-1.parsys");
  const parsysChildren = Array.from(parsys1.children);
  const msaFooter = document.querySelector(".msa-footer");

  msaHeader.removeAttribute(ARIA.HIDE.ATTRIBUTE);
  msaFooter.removeAttribute(ARIA.HIDE.ATTRIBUTE);

  parsysChildren.forEach(parChild => {
    if (parChild.hasAttribute(ARIA.HIDE.ATTRIBUTE)) {
      parChild.removeAttribute(ARIA.HIDE.ATTRIBUTE);
    }
  });
};
