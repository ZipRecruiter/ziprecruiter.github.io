(function($) {
'use strict';

var $fogbugz_helper_css;
var $document;
var $window;

// Sniff for dom mutation events
var sniff = function(selector, fn, once) {
  once = once || false;
  var running = false;
  var fn_wrap = function() {
    if ( running ) {
      return;
    }

    running = true;

    var ret = fn.apply(this, arguments);

    if ( ret && once ) {
      $document.undelegate('#main', 'DOMNodeInserted DOMNodeRemoved', fn_wrap);
    }

    running = false;

    return ret;
  };

  $document.delegate('#main', 'DOMNodeInserted DOMNodeRemoved', fn_wrap);
};

var init = function() {
    ////////////////////////////
   // Make sure jQuery is loaded before continuing
  ////////////////////////////
  if ( !window.jQuery ) {
    setTimeout(init, 10);
    return;
  }

  $ = window.jQuery;

   ////////////////////////////
  // Add styling
  ////////////////////////////
  var css = '<link rel="stylesheet" id="fogbugz-helper-css"/>';
  var $css = $(css)
    .appendTo('head')
    ;

  $css.attr({href: window.zrBookmarkletUrl + '/fogbugz-helper.css?'});

  $fogbugz_helper_css = $('#fogbugz-helper-css');

  // autosize textarea plugin
  $.fn.autosize = function() {
    return this.each(function() {
      var $this = $(this);

      if ( $this.is('.autosize-autosized') ) {
        return;
      }

      $this.addClass('autosize-autosized');

      autosize(this);
    });
  };

    ////////////////////////////
   // Run the main functionality
  ////////////////////////////
  main();
}

var main = function() {
    ////////////////////////////
   // Make sure css is loaded before continuing
  ////////////////////////////
  if ( !$fogbugz_helper_css.length || ($fogbugz_helper_css.css('content') != 'loaded' && $fogbugz_helper_css.css('content') != '"loaded"' && $fogbugz_helper_css.css('content') != "'loaded'") ) {
    setTimeout(main, 10);
    return;
  }

    ////////////////////////////
   // Stuff
  ////////////////////////////
  var $body = $('body');
  $document = $(document);
  $window = $(window);

    ////////////////////////////
   // Autosize textareas
  ////////////////////////////
  sniff('#main', function() {
    var $textareas = $('textarea:not(.autosize-autosized)');
    if ( $textareas.length ) {
      $textareas.autosize();
    }
  });

    ////////////////////////////
   // Add cololors
  ////////////////////////////
  var colors = [
    '#FFFFFF',
    '#3B3B3B',
    '#0079BF',
    '#D29034',
    '#519839',
    '#B04632',
    '#89609E',
    '#CD5A91',
    '#4BBF6B',
    '#00AECC',
    '#838C91'
  ];

  // Get preference
  var color = localStorage.getItem('color');

  if ( color ) {
    $body.css('background-color', color);
  }

  // Add colors to menu
  var add_colors = function() {
    var $color_li = $('<li/>')
      .addClass('fogbugz-helper-colors')
      .delegate('button', 'click', function(e) {
        e.preventDefault();
        var color = $(this).css('background-color');

        localStorage.setItem('color', color);
        $body.css('background-color', color);
        $input.val(color);
      })
      ;

    // Buttons
    for ( var ci = 0, cl = colors.length, c, $c; ci < cl; ci++ ) {
      c = colors[ci];

      $c = $('<button>&nbsp;</button>')
        .addClass('color')
        .css('background-color', c)
        .appendTo($color_li)
        ;
    }

    // Input
    var $input = $('<input type="text">')
      .val(color)
      .appendTo($color_li)
      .bind('input', function() {
        var color = $(this).val();

        localStorage.setItem('color', color);
        $body.css('background-color', color);
      })
      ;

    var $menu = $('body #header .tools .dropdown-menu');

    $menu.append($color_li);

    $(document)
      .undelegate('.tools', 'mouseover', add_colors);
  }

  $(document)
    .delegate('.tools', 'mouseover', add_colors);

  /*// Click edit button
  sniff('#main', function() {
    var $edit = $('.control[name="edit"]');
    if ( $edit.length ) {
      $edit.trigger('click');
      return true; // stop the sniffer
    } else if ( $('#btnCancel').length ) {
      return true; // bail if already in edit mode
    }
  }, true);

  // Put placeholder text on textareas
  sniff('#main', function() {
    var $textarea = $('textarea[title]:not([placeholder])');

    $textarea.each(function() {
      var $this = $(this);
      $this.attr('placeholder', $this.attr('title'));
    });
  }, false);

  // Anchor left to top
  var $left;
  var $top;

  var adjust_left = function() {
    $left.css({
      top: $top.outerHeight(true)
    })
  };

  var anchor_left_to_top = function() {
    $window
      .bind('resize', adjust_left)
      ;

    $document.delegate('#main', 'DOMNodeInserted DOMNodeRemoved', adjust_left);

    adjust_left();
  };

  sniff('#main', function() {
    $left = $('#formEditCase > .left');
    $top = $('#formEditCase > .top');

    if ( $left.length && $top.length ) {
      anchor_left_to_top();
      return true; // stop the sniffer
    }
  }, true);*/
};

  ////////////////////////////
 // Attempt to run the code
////////////////////////////
init();

})();
