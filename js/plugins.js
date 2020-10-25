!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):(e=e||self).Util=t(e.jQuery)}(this,function(o){"use strict";o=o&&o.hasOwnProperty("default")?o.default:o;var t="transitionend";function e(e){var t=this,n=!1;return o(this).one(l.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||l.triggerTransitionEnd(t)},e),this}var l={TRANSITION_END:"bsTransitionEnd",getUID:function(e){for(;e+=~~(1e6*Math.random()),document.getElementById(e););return e},getSelectorFromElement:function(e){var t,n=e.getAttribute("data-target");n&&"#"!==n||(n=(t=e.getAttribute("href"))&&"#"!==t?t.trim():"");try{return document.querySelector(n)?n:null}catch(e){return null}},getTransitionDurationFromElement:function(e){if(!e)return 0;var t=o(e).css("transition-duration"),n=o(e).css("transition-delay"),i=parseFloat(t),r=parseFloat(n);return i||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(t)+parseFloat(n))):0},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(e){o(e).trigger(t)},supportsTransitionEnd:function(){return Boolean(t)},isElement:function(e){return(e[0]||e).nodeType},typeCheckConfig:function(e,t,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var r=n[i],o=t[i],s=o&&l.isElement(o)?"element":(a=o,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(r).test(s))throw new Error(e.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+r+'".')}var a},findShadowRoot:function(e){if(!document.documentElement.attachShadow)return null;if("function"!=typeof e.getRootNode)return e instanceof ShadowRoot?e:e.parentNode?l.findShadowRoot(e.parentNode):null;var t=e.getRootNode();return t instanceof ShadowRoot?t:null},jQueryDetection:function(){if(void 0===o)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=o.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||4<=e[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};return l.jQueryDetection(),o.fn.emulateTransitionEnd=e,o.event.special[l.TRANSITION_END]={bindType:t,delegateType:t,handle:function(e){if(o(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}},l}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery"),require("./util.js")):"function"==typeof define&&define.amd?define(["jquery","./util.js"],t):(e=e||self).Carousel=t(e.jQuery,e.Util)}(this,function(_,m){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function t(t,e){var n,i=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,n)),i}function s(r){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?t(Object(o),!0).forEach(function(e){var t,n,i;t=r,i=o[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}_=_&&_.hasOwnProperty("default")?_.default:_,m=m&&m.hasOwnProperty("default")?m.default:m;var a="carousel",l="bs.carousel",u="."+l,e=".data-api",n=_.fn[a],c={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},h={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},p="next",d="prev",v="left",g="right",y={SLIDE:"slide"+u,SLID:"slid"+u,KEYDOWN:"keydown"+u,MOUSEENTER:"mouseenter"+u,MOUSELEAVE:"mouseleave"+u,TOUCHSTART:"touchstart"+u,TOUCHMOVE:"touchmove"+u,TOUCHEND:"touchend"+u,POINTERDOWN:"pointerdown"+u,POINTERUP:"pointerup"+u,DRAG_START:"dragstart"+u,LOAD_DATA_API:"load"+u+e,CLICK_DATA_API:"click"+u+e},f="carousel",E="active",S="slide",T="carousel-item-right",b="carousel-item-left",I="carousel-item-next",O="carousel-item-prev",D="pointer-event",w=".active",C=".active.carousel-item",A=".carousel-item",j=".carousel-item img",N=".carousel-item-next, .carousel-item-prev",P=".carousel-indicators",i="[data-slide], [data-slide-to]",o='[data-ride="carousel"]',x={TOUCH:"touch",PEN:"pen"},R=function(){function o(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(t),this._element=e,this._indicatorsElement=this._element.querySelector(P),this._touchSupported="ontouchstart"in document.documentElement||0<navigator.maxTouchPoints,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var e,t,n,i=o.prototype;return i.next=function(){this._isSliding||this._slide(p)},i.nextWhenVisible=function(){!document.hidden&&_(this._element).is(":visible")&&"hidden"!==_(this._element).css("visibility")&&this.next()},i.prev=function(){this._isSliding||this._slide(d)},i.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(N)&&(m.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},i.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},i.to=function(e){var t=this;this._activeElement=this._element.querySelector(C);var n=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)_(this._element).one(y.SLID,function(){return t.to(e)});else{if(n===e)return this.pause(),void this.cycle();var i=n<e?p:d;this._slide(i,this._items[e])}},i.dispose=function(){_(this._element).off(u),_.removeData(this._element,l),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},i._getConfig=function(e){return e=s({},c,{},e),m.typeCheckConfig(a,e,h),e},i._handleSwipe=function(){var e,t=Math.abs(this.touchDeltaX);t<=40||(e=t/this.touchDeltaX,(this.touchDeltaX=0)<e&&this.prev(),e<0&&this.next())},i._addEventListeners=function(){var t=this;this._config.keyboard&&_(this._element).on(y.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&_(this._element).on(y.MOUSEENTER,function(e){return t.pause(e)}).on(y.MOUSELEAVE,function(e){return t.cycle(e)}),this._config.touch&&this._addTouchEventListeners()},i._addTouchEventListeners=function(){var e,t,n=this;this._touchSupported&&(e=function(e){n._pointerEvent&&x[e.originalEvent.pointerType.toUpperCase()]?n.touchStartX=e.originalEvent.clientX:n._pointerEvent||(n.touchStartX=e.originalEvent.touches[0].clientX)},t=function(e){n._pointerEvent&&x[e.originalEvent.pointerType.toUpperCase()]&&(n.touchDeltaX=e.originalEvent.clientX-n.touchStartX),n._handleSwipe(),"hover"===n._config.pause&&(n.pause(),n.touchTimeout&&clearTimeout(n.touchTimeout),n.touchTimeout=setTimeout(function(e){return n.cycle(e)},500+n._config.interval))},_(this._element.querySelectorAll(j)).on(y.DRAG_START,function(e){return e.preventDefault()}),this._pointerEvent?(_(this._element).on(y.POINTERDOWN,e),_(this._element).on(y.POINTERUP,t),this._element.classList.add(D)):(_(this._element).on(y.TOUCHSTART,e),_(this._element).on(y.TOUCHMOVE,function(e){var t;(t=e).originalEvent.touches&&1<t.originalEvent.touches.length?n.touchDeltaX=0:n.touchDeltaX=t.originalEvent.touches[0].clientX-n.touchStartX}),_(this._element).on(y.TOUCHEND,t)))},i._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},i._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll(A)):[],this._items.indexOf(e)},i._getItemByDirection=function(e,t){var n=e===p,i=e===d,r=this._getItemIndex(t),o=this._items.length-1;if((i&&0===r||n&&r===o)&&!this._config.wrap)return t;var s=(r+(e===d?-1:1))%this._items.length;return-1==s?this._items[this._items.length-1]:this._items[s]},i._triggerSlideEvent=function(e,t){var n=this._getItemIndex(e),i=this._getItemIndex(this._element.querySelector(C)),r=_.Event(y.SLIDE,{relatedTarget:e,direction:t,from:i,to:n});return _(this._element).trigger(r),r},i._setActiveIndicatorElement=function(e){var t,n;this._indicatorsElement&&(t=[].slice.call(this._indicatorsElement.querySelectorAll(w)),_(t).removeClass(E),(n=this._indicatorsElement.children[this._getItemIndex(e)])&&_(n).addClass(E))},i._slide=function(e,t){var n,i,r,o,s,a=this,l=this._element.querySelector(C),u=this._getItemIndex(l),c=t||l&&this._getItemByDirection(e,l),h=this._getItemIndex(c),d=Boolean(this._interval),f=e===p?(n=b,i=I,v):(n=T,i=O,g);c&&_(c).hasClass(E)?this._isSliding=!1:this._triggerSlideEvent(c,f).isDefaultPrevented()||l&&c&&(this._isSliding=!0,d&&this.pause(),this._setActiveIndicatorElement(c),r=_.Event(y.SLID,{relatedTarget:c,direction:f,from:u,to:h}),_(this._element).hasClass(S)?(_(c).addClass(i),m.reflow(c),_(l).addClass(n),_(c).addClass(n),(o=parseInt(c.getAttribute("data-interval"),10))?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=o):this._config.interval=this._config.defaultInterval||this._config.interval,s=m.getTransitionDurationFromElement(l),_(l).one(m.TRANSITION_END,function(){_(c).removeClass(n+" "+i).addClass(E),_(l).removeClass(E+" "+i+" "+n),a._isSliding=!1,setTimeout(function(){return _(a._element).trigger(r)},0)}).emulateTransitionEnd(s)):(_(l).removeClass(E),_(c).addClass(E),this._isSliding=!1,_(this._element).trigger(r)),d&&this.cycle())},o._jQueryInterface=function(i){return this.each(function(){var e=_(this).data(l),t=s({},c,{},_(this).data());"object"==typeof i&&(t=s({},t,{},i));var n="string"==typeof i?i:t.slide;if(e||(e=new o(this,t),_(this).data(l,e)),"number"==typeof i)e.to(i);else if("string"==typeof n){if(void 0===e[n])throw new TypeError('No method named "'+n+'"');e[n]()}else t.interval&&t.ride&&(e.pause(),e.cycle())})},o._dataApiClickHandler=function(e){var t,n,i,r=m.getSelectorFromElement(this);!r||(t=_(r)[0])&&_(t).hasClass(f)&&(n=s({},_(t).data(),{},_(this).data()),(i=this.getAttribute("data-slide-to"))&&(n.interval=!1),o._jQueryInterface.call(_(t),n),i&&_(t).data(l).to(i),e.preventDefault())},e=o,n=[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return c}}],(t=null)&&r(e.prototype,t),n&&r(e,n),o}();return _(document).on(y.CLICK_DATA_API,i,R._dataApiClickHandler),_(window).on(y.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(o)),t=0,n=e.length;t<n;t++){var i=_(e[t]);R._jQueryInterface.call(i,i.data())}}),_.fn[a]=R._jQueryInterface,_.fn[a].Constructor=R,_.fn[a].noConflict=function(){return _.fn[a]=n,R._jQueryInterface},R});