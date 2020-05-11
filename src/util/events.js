/* eslint-disable import/prefer-default-export */

/**
 * With event delegation, you bind an event to the topmost element (in the case
 * of the DOM, that's the document element), capture every event, and run
 * the registered callback after determining whether it's relevant.
 *
 * @example
 *     listen('click', 'a', (event, target) => {
 *       event.preventDefault();
 *       console.log(`Clicked ${target.href}`);
 *     });
 */
export function listen(type, selector, callback) {
  document.addEventListener(type, (event) => {
    const target = event.target.closest(selector);

    if (target) {
      callback(event, target);
    }
  });
}
