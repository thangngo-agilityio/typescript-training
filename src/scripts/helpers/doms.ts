/**
 * @description query html element
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export const querySelector = <T>(selector: string): T => {
  return document.querySelector(selector) as T;
};

/**
 * @description query all html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns list html elements
 */
export const querySelectorAll = <T extends HTMLElement>(selector: string) => {
  return document.querySelectorAll(selector) as NodeListOf<T>;
};

/**
 * @description query html element by id
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export function getElementById<T>(selector: string) {
  return document.getElementById(selector) as T;
}

/**
 * @description create html elements
 * @param {string} element
 * @param {HTMLElement} parent
 * @returns create elements
 */
export const createElement = <T extends HTMLElement>(element: string) => {
  return document.createElement(element) as T;
};
