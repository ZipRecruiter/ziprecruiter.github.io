---
---
// ==UserScript==
// @name         Periscope Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix Periscope stuff
// @author       Gerald
// @match        https://app.periscopedata.com/*
// @grant        none
// @run-at       document-end
// @version      0.1
// ==/UserScript==

(function($) {
  'use strict';
  ////////////////////////////////
  // This section highlights a row when clicked
  ////////////////////////////////
  var last_index = null;
  var $style = null;
  var set_selected = function(index) {
    if ( $style && $style.length ) {
      $style.remove();
      $style = null;
    }

    if ( index === last_index ) {
      last_index = null;
      return;
    }

    last_index = index;

    /*jshint multistr: true */
    $style = $('<style/>').html('\
      .row:nth-child(' + index + ') .ninja-cell {\
        outline: dotted 2px blue;\
        outline-offset: -1px;\
      }\
    ');

    $('head').append($style);
  };

  $(document).delegate('.row', 'click', function() {
    var $this = $(this);
    var index = $this.parent().find('.row').index(this);
    set_selected(index + 1);
  });
})(window.jQuery);