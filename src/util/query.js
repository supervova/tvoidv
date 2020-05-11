/**
 * $ SELECTS A SINGLE OCCURRENCE of an element that matches a given selector.
 * Use .getElementById() instead whenever possible
 *
 * @param {string} selector
 * @param {string} scope - The optional argument to look for an element inside another.
 * @return {Object}
 *
 * @example
 *     const map = $('[data-map]');
 *     const marker = $('[data-map-marker]', map);
 */
export function $(selector, scope = document) {
  return scope.querySelector(selector);
}


/**
 * $$ SELECTS ALL OCCURRENCES of an element that matches a given selector.
 *
 * @param {string} selector
 * @param {string} scope
 * @return {Array}
 * @example
 *     const imageGalleries = $$('[data-image-gallery]');
 *
 *     $$('[data-image-gallery]').forEach((el) => {
 *       // Do sth with every (el)ement in aray of [data-image-gallery]
 *     });
 */
export function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/**
  FIND THE NEAREST MATCHING PARENT with closest() method

  <article>
    <div id="div-01">Here is div-01
      <div id="div-02">Here is div-02
        <div id="div-03">Here is div-03</div>
      </div>
    </div>
  </article>

  // It's our guy
  var el = document.getElementById('div-03');

  // returns the element with the id=div-02
  var r1 = el.closest("#div-02");

  // returns #div-01, the closest "article > div" ancestor
  var r2 = el.closest("article > div");

  // returns article, the closest ancestor which is not a div
  var r3 = el.closest(":not(div)");
 */

/**
  * TEST SELECTORS ON AN ELEMENT with matches() method

  $$('input').forEach(input => {
    if (input.matches('[type="checkbox"]')) {
      // Do something...
    }

    // Do something else...
  });
  */
