(function($, undefined){

$('body').delegate('.thumb', 'click', function() {
  var $this = $(this);
  if ( !$this.is('.collapsed') ) {
    $this.addClass('collapsed');
  } else {
    $this.removeClass('collapsed')
  }
});

})(window.jQuery || window.Zepto || window.$);
