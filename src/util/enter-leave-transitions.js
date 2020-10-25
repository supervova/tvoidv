// @see @see {@link https://sebastiandedeyne.com/javascript-framework-diet/enter-leave-transitions/|Sebastian De Deyne's JavaScript Framework Diet}

/* eslint-disable no-unused-vars */

/**
 * HELPER: Wait until the appearance classes changes have been applied
 * To ensure the classList changes are applied before moving on to removing
 * the *-start class, we can use the browser's requestAnimationFrame
 * function.
 * Because of a Chrome bug, requestAnimationFrame should be wrapped
 * in another requestAnimationFrame call.
 */
function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

/**
 * HELPER: Wait until the transition is over
 * We can determine that by parsing the transition duration with
 * getComputedStyle
 */
function afterTransition(element) {
  return new Promise((resolve) => {
    const duration = Number(
      getComputedStyle(element)
        .transitionDuration
        .replace('s', ''),
    ) * 1000;

    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * MAKING ELEMENTS APPEAR WITH ENTER
 *
 * @param   {Object}  element     HTML element to which animation classes will be assigned
 * @param   {string}  transition  Type of transition: fade, slide etc
 *
 * @example enter($('[data-dropdown-list]'), 'fade');
 */
async function enter(element, transition) {
  // Since the element isn't visible yet, add .is-open (display: block)
  element.classList.add('is-open');

  // Add classes containing transition
  element.classList.add(`ani-${transition}-enter`);
  element.classList.add(`ani-${transition}-enter-active`);

  // Wait until the above changes have been applied...
  await nextFrame();

  // Remove the first appearance class
  element.classList.remove(`ani-${transition}-enter`);

  // Wait until the transition is over...
  await afterTransition(element);

  // Remove the second appearance class
  element.classList.remove(`ani-${transition}-enter-active`);
}

/**
 * MAKING ELEMENTS DISAPPEAR WITH LEAVE
 *
 * @param   {Object}  element     HTML element to which animation classes will be assigned
 * @param   {string}  transition  Type of transition: fade, slide etc
 *
 * @return  {[type]}              [return description]
 */
async function leave(element, transition) {
  element.classList.add('is-open');
  element.classList.add(`ani-${transition}-leave`);
  element.classList.add(`ani-${transition}-leave-active`);

  // Wait until the above changes have been applied...
  await nextFrame();

  element.classList.remove(`ani-${transition}-leave`);

  // Wait until the transition is over...
  await afterTransition();

  element.classList.remove(`ani-${transition}-leave-active`);
  element.classList.remove('is-open');
}
