/**
 * -----------------------------------------------------------------------------
 * FORM
 * -----------------------------------------------------------------------------
 */

jQuery(document).ready(($) => {
  // Animated label
  $('.form-control').on('blur input focus', () => {
    const $field = $(this).closest('.form-group');
    if (this.value) {
      $field.addClass('is-filled');
    } else {
      $field.removeClass('is-filled');
    }
  });

  $('.form-control').on('focus', () => {
    const $field = $(this).closest('.form-group');
    if (this) {
      $field.addClass('is-filled');
    } else {
      $field.removeClass('is-filled');
    }
  });
});
