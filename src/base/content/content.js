'use strict mode';

import { $$ } from '../../util';

// Prevent video to downloa on mobiles
(() => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    $$('.video.is-bg source').forEach((el) => {
      el.setAttribute('src', el.getAttribute('data-src'));
    });
  }
})();
