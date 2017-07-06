(function($, undefined){

var $body = $('body');

$body.delegate('.thumb', 'click', function() {
  var $this = $(this);
  if ( !$this.is('.collapsed') ) {
    $this.addClass('collapsed');
  } else {
    $this.removeClass('collapsed');
  }
});

$('[data-type="spoiler"] > :not([data-type="spoiler-info"])').addClass('visually-hidden');

$body.delegate('[data-type="spoiler-show"]', 'click', function() {
  $(this).closest('[data-type="spoiler"]')
    .find('> :not([data-type="spoiler-info"])')
      .removeClass('visually-hidden')
      .end()
    .find('> [data-type="spoiler-info"]')
      .hide();
});

})(window.jQuery || window.Zepto || window.$);
