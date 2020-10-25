'use strict mode';

(($) => {
  // CAROUSEL
  // TODO: переписать карусель
  // https://www.w3schools.com/howto/howto_js_slideshow.asp
  // https://www.sitepoint.com/simple-javascript-quiz/#addingpagination
  const carousel = $('.carousel');

  carousel.carousel({
    interval: 0,
  });

  document.querySelectorAll('.quiz__answer:not(.is-last)').forEach((el) => {
    el.addEventListener('click', () => {
      setTimeout(() => {
        // TODO: переписать карусель и её управление
        carousel.carousel('next');
      }, 320);
    });
  });

  // TODO: менять классы body на смене кадров
  // мб, использовать src/util/enter-leave-transitions.js
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
    // Сохраняем значения групп радиокнопок
    const age       = $('input[name="age"]:checked').val();
    const residence = $('input[name="residence"]:checked').val();
    const family    = $('input[name="family"]:checked').val();
    const ha        = $('input[name="ha"]:checked').val();
    let resume;
    let resumeTitle;

    // Сверяем полученные ответы с условиями выдачи ипотеки
    if (age === 'lth 36') {
      if (residence === 'FE') {
        // Молодые семьи (ДВ)
        if (family === 'family' || family === 'has child') {
          resumeTitle = 'Поздравляем!';
          resume = `
            <p>Вы&nbsp;— идеальный кандидат для участия в&nbsp;ипотечной программе «Дальневосточная ипотека», которую инициировал Президент РФ. Если Ваша кредитная история в&nbsp;порядке, то&nbsp;вы&nbsp;сможете оформить льготный кредит по&nbsp;самой низкой ставке в&nbsp;России 2&nbsp;%!</p>
            <p class="note">Помните о&nbsp;том, что финальное решение о&nbsp;выдаче льготной ипотеки принимает банк. Обратитесь в&nbsp;один из&nbsp;банков-участников программы. <a class="link is-forward" href="https://www.hcfe.ru/support-measures/dv-ipoteka/" target="_blank" rel="noopener noreferrer">Подробности</a></p>
          `;
        } else {
          // Холостяки (ДВ)
          resumeTitle = 'Хм. Быть может пора подумать о&nbsp;свадьбе?';
          resume = `
            <p>Тем более, что для поддержки молодой семьи в&nbsp;России вводятся всё новые программы.</p>
            <p class="note">Для уточнения условий получения «Дальневосточной ипотеки» вам необходимо обратится в&nbsp;один из&nbsp;банков-участников программы. <a class="link is-forward" href="https://www.hcfe.ru/support-measures/dv-ipoteka/" target="_blank" rel="noopener noreferrer">Подробности</a></p>
          `;
        }
      } else {
        // Молодые семьи из других регионов
        resumeTitle = 'Сначала надо переехать';
        resume = `
          <p>Программы ипотечного кредитования для приобретения квартиры или постройки дома по&nbsp;самой низкой ставкой в&nbsp;России в&nbsp;настоящее время действуют только на&nbsp;Дальнем Востоке России. Поэтому если вы&nbsp;молоды и&nbsp;открыты всему новому, переезжайте в&nbsp;ДВФО :)</p>
          <p class="note">Для уточнения условий получения «Дальневосточной ипотеки» вам необходимо обратится в&nbsp;один из&nbsp;банков-участников программы. <a class="link is-forward" href="https://www.hcfe.ru/support-measures/dv-ipoteka/" target="_blank" rel="noopener noreferrer">Подробности</a></p>
        `;
      }
    } else if (ha === 'ha') {
      // Немолодые «гектарщики»
      resumeTitle = 'У вас есть шанс';
      resume = `
        <p>Если вы&nbsp;получатель земли по&nbsp;программе «дальневосточный гектар», то&nbsp;неважно сколько вам лет, сколько у&nbsp;вас детей и&nbsp;где вы&nbsp;прописаны, главное, чтобы земля была получена по&nbsp;программе «Дальневосточный гектар». То&nbsp;есть должен быть заключен договор безвозмездного пользования на&nbsp;земельный участок.</p>
        <p>Из&nbsp;единственно известных пока ограничений для получателей «Дальневосточного гектара» это вид разрешённого использования земли&nbsp;— «Для индивидуального жилищного строительства» и(или) «Для ведения личного подсобного хозяйства (приусадебный участок)».</p>
        <p class="note">Для уточнения условий получения «Дальневосточной ипотеки» вам необходимо обратится в&nbsp;один из&nbsp;банков-участников программы. <a class="link is-forward" href="https://www.hcfe.ru/support-measures/dv-ipoteka/" target="_blank" rel="noopener noreferrer">Подробности</a></p>
      `;
    } else {
      // без шансов
      resumeTitle = 'Увы 😢';
      resume = `
        <p>Вы&nbsp;старше 36&nbsp;лет, поэтому, взять льготный ипотечный кредит для покупки квартиры не&nbsp;сможете. Советуем подумать об&nbsp;участии в&nbsp;программе «Дальневосточный гектар», тогда вам доступна ипотека под&nbsp;2% для постройки дома.</p>
        <p class="note">Для уточнения условий получения «Дальневосточной ипотеки» вам необходимо обратится в&nbsp;один из&nbsp;банков-участников программы. <a class="link is-forward" href="https://www.hcfe.ru/support-measures/dv-ipoteka/" target="_blank" rel="noopener noreferrer">Подробности</a></p>
      `;
    }

    return [resumeTitle, resume];
  }

  // 3) По клику на ответе на последний вопрос
  document.querySelectorAll('.quiz__answer:not(.is-last)').forEach((el) => {
    el.addEventListener('click', () => {
      // Получение результатов из функции summingUp()
      const results           = summingUp();
      const resultsTitle      = results[0];
      const resultsBody       = results[1];
      const resultsTitleBox   = document.getElementById('results-title');
      const resultsBox        = document.getElementById('results');

      // Вывод результатов
      resultsTitleBox.innerHTML(resultsTitle);
      resultsBox.innerHTML(resultsBody);

      // Переход к слайду результатов
      // TODO: переписать на «ваниле»
      setTimeout(() => {
        carousel.carousel('next');
      }, 320);
    });
  });

  document.querySelectorAll('.quiz__answer:not(.is-last)').forEach((el) => {
    el.addEventListener('click', () => {
      // TODO: переписать на «ваниле»
      $('input:radio').prop('checked', false);
    });
  });

  /**
   * ПУБЛИКАЦИЯ В СОЦСЕТЯХ
   * TODO: доделать — см. Backup
   * TODO: сделать динамическую замену значений Open Graph
   * https://drib.tech/programming/dynamically-change-facebook-open-graph-meta-data-javascript
   */
})(jQuery);
