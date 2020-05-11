'use strict mode';

// import { $ } from '../util';

// CAROUSEL
const carousel = $('.carousel');

carousel.carousel({
  interval: 0,
});

$('.quiz__answer:not(.is-last)').on('click', () => {
  setTimeout(() => {
    carousel.carousel('next');
  }, 320);
});

// Change body classes
carousel.on('slide.bs.carousel', (e) => {
  // Remove body slide-* classes
  $('body').removeClass();

  // Add new body class based on slide id
  const bodyClass = `page is-home has-open-${e.relatedTarget.id}`;
  $('body').addClass(bodyClass);
});

/**
 * 2) Подведение итогов
 * @return {string} Результат
 */
function summingUp() {
  alert('boom!');
}

// 3) По клику на ответе на последний вопрос

$('.quiz__answer.is-last').on('click', () => {
  alert('boom!');

  setTimeout(() => {
    carousel.carousel('next');
  }, 320);
});

/**
 * ПУБЛИКАЦИЯ В СОЦСЕТЯХ
 * TODO: доделать — см. Backup
 * TODO: сделать динамическую замену значений Open Graph
 * https://drib.tech/programming/dynamically-change-facebook-open-graph-meta-data-javascript
 */
