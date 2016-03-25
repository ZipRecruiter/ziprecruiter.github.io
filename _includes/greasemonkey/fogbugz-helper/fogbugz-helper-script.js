
(function($) {
'use strict';

var $document;
var $window;

  //////////////////////
 // Sniff for dom mutation events
//////////////////////
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

  //////////////////////
 // Preference manager
//////////////////////
var PreferenceManager = function() {
  this.prefs = {};
  this.loaded = false;
};

PreferenceManager.prototype.set = function(name, value) {
  return localStorage.setItem('fogbugz-helper-' + name, value);
}

PreferenceManager.prototype.get = function(name, defaultOn) {
  var val = JSON.parse(localStorage.getItem('fogbugz-helper-' + name));

  if ( val === null && defaultOn ) {
    val = true;
  }

  return val;
}

PreferenceManager.prototype.add = function(pref) {
  if ( !pref.id ) {
    // Maybe throw an error?
    return;
  }

  this.prefs[pref.id] = pref;
};

PreferenceManager.prototype.load = function() {
  var me = this;
  var pkey;
  var pref;

  if ( me.loaded ) {
    // Maybe throw an error?
    return;
  }

  me.loaded = true;

  var add_prefs = function(force) {
    var $helper_menu = $('#fogbugz-helper-menu');

    force = force || false;

    if ( !force && $helper_menu.length ) {
      // Already added menu
      return;
    } else if ( force ) {
      $helper_menu.empty();
    } else {
      $helper_menu = $('<li/>').attr('id', 'fogbugz-helper-menu');
      // Add a link to plugin homepage
      var $homepage_link = $('<label><a href="http://ziprecruiter.github.io/greasemonkey/fogbugz-helper/" target="_blank">ZipRecruiter FogBugz Helper</a></label>');
      $helper_menu.append($homepage_link);
    }

    // Menu to put checkbox preferences into
    var $prefs_menu = $('<menu/>').attr('id', 'fogbugz-helper-prefs-menu');

    // Menu for features to dump stuff into
    var $features_menu = $('<menu/>').attr('id', 'fogbugz-helper-features-menu');

    // Make preferences
    var $plabel;
    var $pcheck;

    for ( pkey in me.prefs ) {
      pref = me.prefs[pkey];

      $pcheck = $('<input type="checkbox">')
        .attr({
          'id': 'fogbugz-helper-pref-check-' + pref.id
        })
        .data('prefid', pref.id)
        ;

      if ( me.get(pref.id, pref.defaultOn) ) {
        $pcheck.prop('checked', true);
      }

      $plabel = $('<label/>')
        .attr({
          'id': 'fogbugz-helper-pref-' + pref.id,
          'for': 'fogbugz-helper-pref-check-' + pref.id,
          'title': pref.title
        })
        .html(pref.text)
        .prepend($pcheck)
        .appendTo($prefs_menu)
        ;
    }

    $helper_menu
      .append($prefs_menu)
      .append($features_menu)
      .appendTo($('body #header .tools .dropdown-menu'))
      ;

    for ( pkey in me.prefs ) {
      pref = me.prefs[pkey];

      if ( me.get(pref.id, pref.defaultOn) && pref.ontools ) {
        pref.ontools();
      }
    }
  };

  // One-time setup stuff
  $document
    .delegate('.tools', 'mouseover', function() {
      add_prefs();
    })
    // Changing preferences via checkboxes
    .delegate('#fogbugz-helper-prefs-menu input', 'change', function() {
      var $this = $(this);
      var id = $this.data('prefid');
      var pref = me.prefs[id];
      var checked = $this.prop('checked');
      me.set(id, checked);

      if ( !checked && pref.onunload ) {
        pref.onunload();
      } else if ( checked ) {
        if ( pref.onload ) {
          pref.onload();
        }

        if ( pref.ontools ) {
          pref.ontools();
        }
      }
    })
    ;

  for ( pkey in me.prefs ) {
    pref = me.prefs[pkey];

    if ( me.get(pref.id, pref.defaultOn) && pref.onload ) {
      pref.onload();
    }
  }
};

// Make the preference manager
var pm = new PreferenceManager();

  ////////////////////////////
 // (Preference) Use Stylesheet (for debugging)
////////////////////////////
var use_stylesheet = function() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = 'fogbugz-helper-css';
  document.head.appendChild(link);
  link.href = window.zrBookmarkletUrl + '/fogbugz-helper.css?';
};

var use_style_tag = function() {
  var s = document.createElement('style');
  s.id = 'fogbugz-helper-css';
  s.innerHTML = window.zrBookmarkletCSS;
  document.head.appendChild(s);
}

var onload_use_stylesheet = function() {
  $('#fogbugz-helper-css').remove();
  use_stylesheet();
};

var onunload_use_stylesheet = function() {
  $('#fogbugz-helper-css').remove();
  use_style_tag();
};

pm.add({
  id: 'use_stylesheet',
  text: 'Use Stylesheet (for debugging)',
  title: 'This is for development purposes, you shouldn\'t need to enable it',
  onload: onload_use_stylesheet,
  onunload: onunload_use_stylesheet
});

if ( pm.get('use_stylesheet') ) {
  use_stylesheet();
} else {
  use_style_tag();
}

  //////////////////////
 // Set up and run the features
//////////////////////
var init = function() {
  // Make sure jQuery is loaded before continuing
  if ( !window.jQuery ) {
    setTimeout(init, 10);
    return;
  }

  $ = window.jQuery;

  if ( pm.get('use_stylesheet') ) {
    // Make sure css is loaded before continuing
    var $fogbugz_helper_css = $('#fogbugz-helper-css');
    if ( !$fogbugz_helper_css.length || ($fogbugz_helper_css.css('content') != 'loaded' && $fogbugz_helper_css.css('content') != '"loaded"' && $fogbugz_helper_css.css('content') != "'loaded'") ) {
      setTimeout(init, 10);
      return;
    }
  }

    //////////////////////
   // autosize textarea plugin
  //////////////////////
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

  // Run the main functionality
  main($);
}

var main = function($) {
  // Shared Stuff
  var $body = $('body');
  $document = $(document);
  $window = $(window);

    ////////////////////////////
   // (Preference) Hotkeys
  ////////////////////////////

  // Keep this preference first so other preferences can add their own hotkeys

  // http://stackoverflow.com/questions/13992111/javascript-function-to-convert-keycodes-into-characters
  var convertKeyCode = function(evt) {
    var chara = null;
    var keyCode = (evt.which) ? evt.which : evt.keyCode;
    var shift = evt.shiftKey;
    //if (keyCode == 8)
    //  chara = "backspace";
    //  backspace
    //if (keyCode == 9)
    //  chara = "tab";
    //  tab
    //if (keyCode == 13)
    //  chara = "enter";
    //  enter
    if (keyCode == 16)
      chara = "";
    //  chara = "shift";
    //  shift
    //if (keyCode == 17)
    //  chara = "ctrl";
    //  ctrl
    //if (keyCode == 18)
    //  chara = "alt";
    //  alt
    if (keyCode == 19) {
        chara = "PAUSE/BREAK";
    //  pause/break
    //if (keyCode == 20)
    //  chara = "caps lock";
    //  caps lock
    } else if (keyCode == 27) {
      chara = "ESC";
    //  escape
    //if (keyCode == 33)
    //  chara = "page up";
    // page up, to avoid displaying alternate character and confusing people
    //if (keyCode == 34)
    //  chara = "page down";
    // page down
    //if (keyCode == 35)
    //  chara = "end";
    // end
    //if (keyCode == 36)
    //  chara = "home";
    // home
    //if (keyCode == 37)
    //  chara = "left arrow";
    // left arrow
    //if (keyCode == 38)
    //  chara = "up arrow";
    // up arrow
    //if (keyCode == 39)
    //  chara = "right arrow";
    // right arrow
    //if (keyCode == 40)
    //  chara = "down arrow";
    // down arrow
    //if (keyCode == 45)
    //  chara = "insert";
    // insert
    //if (keyCode == 46)
    //  chara = "delete";
    // delete
    // Alphanumeric
    } else if (keyCode == 48) {
        chara = /*(shift) ? ")" :*/ "0";
    } else if (keyCode == 49) {
        chara = /*(shift) ? "!" :*/ "1";
    } else if (keyCode == 50) {
        chara = /*(shift) ? "@" :*/ "2";
    } else if (keyCode == 51) {
        chara = /*(shift) ? "#" :*/ "3";
    } else if (keyCode == 52) {
        chara = /*(shift) ? "$" :*/ "4";
    } else if (keyCode == 53) {
        chara = /*(shift) ? "%" :*/ "5";
    } else if (keyCode == 54) {
        chara = /*(shift) ? "^" :*/ "6";
    } else if (keyCode == 55) {
        chara = /*(shift) ? "&" :*/ "7";
    } else if (keyCode == 56) {
        chara = /*(shift) ? "*" :*/ "8";
    } else if (keyCode == 57) {
        chara = /*(shift) ? "(" :*/ "9";

    } else if (keyCode == 65) {
        chara = /*(shift) ? "A" :*/ "a";
    } else if (keyCode == 66) {
        chara = /*(shift) ? "B" :*/ "b";
    } else if (keyCode == 67) {
        chara = /*(shift) ? "C" :*/ "c";
    } else if (keyCode == 68) {
        chara = /*(shift) ? "D" :*/ "d";
    } else if (keyCode == 69) {
        chara = /*(shift) ? "E" :*/ "e";
    } else if (keyCode == 70) {
        chara = /*(shift) ? "F" :*/ "f";
    } else if (keyCode == 71) {
        chara = /*(shift) ? "G" :*/ "g";
    } else if (keyCode == 72) {
        chara = /*(shift) ? "H" :*/ "h";
    } else if (keyCode == 73) {
        chara = /*(shift) ? "I" :*/ "i";
    } else if (keyCode == 74) {
        chara = /*(shift) ? "J" :*/ "j";
    } else if (keyCode == 75) {
        chara = /*(shift) ? "K" :*/ "k";
    } else if (keyCode == 76) {
        chara = /*(shift) ? "L" :*/ "l";
    } else if (keyCode == 77) {
        chara = /*(shift) ? "M" :*/ "m";
    } else if (keyCode == 78) {
        chara = /*(shift) ? "N" :*/ "n";
    } else if (keyCode == 79) {
        chara = /*(shift) ? "O" :*/ "o";
    } else if (keyCode == 80) {
        chara = /*(shift) ? "P" :*/ "p";
    } else if (keyCode == 81) {
        chara = /*(shift) ? "Q" :*/ "q";
    } else if (keyCode == 82) {
        chara = /*(shift) ? "R" :*/ "r";
    } else if (keyCode == 83) {
        chara = /*(shift) ? "S" :*/ "s";
    } else if (keyCode == 84) {
        chara = /*(shift) ? "T" :*/ "t";
    } else if (keyCode == 85) {
        chara = /*(shift) ? "U" :*/ "u";
    } else if (keyCode == 86) {
        chara = /*(shift) ? "V" :*/ "v";
    } else if (keyCode == 87) {
        chara = /*(shift) ? "W" :*/ "w";
    } else if (keyCode == 88) {
        chara = /*(shift) ? "X" :*/ "x";
    } else if (keyCode == 89) {
        chara = /*(shift) ? "Y" :*/ "y";
    } else if (keyCode == 90) {
        chara = /*(shift) ? "Z" :*/ "z";
    // Alphanumeric
    //} else if (keyCode == 91) {
    //  chara = "left window";
    // left window
    //} else if (keyCode == 92) {
    //  chara = "right window";
    // right window
    //} else if (keyCode == 93) {
    //  chara = "select key";
    // select key
    //} else if (keyCode == 96) {
    //  chara = "numpad 0";
    // numpad 0
    //} else if (keyCode == 97) {
    //  chara = "numpad 1";
    // numpad 1
    //} else if (keyCode == 98) {
    //  chara = "numpad 2";
    // numpad 2
    //} else if (keyCode == 99) {
    //  chara = "numpad 3";
    // numpad 3
    //} else if (keyCode == 100) {
    //  chara = "numpad 4";
    // numpad 4
    //} else if (keyCode == 101) {
    //  chara = "numpad 5";
    // numpad 5
    //} else if (keyCode == 102) {
    //  chara = "numpad 6";
    // numpad 6
    //} else if (keyCode == 103) {
    //  chara = "numpad 7";
    // numpad 7
    //} else if (keyCode == 104) {
    //  chara = "numpad 8";
    // numpad 8
    //} else if (keyCode == 105) {
    //  chara = "numpad 9";
    // numpad 9
    //} else if (keyCode == 106) {
    //  chara = "multiply";
    // multiply
    //} else if (keyCode == 107) {
    //  chara = "add";
    // add
    //} else if (keyCode == 109) {
    //  chara = "subtract";
    // subtract
    //} else if (keyCode == 110) {
    //  chara = "decimal point";
    // decimal point
    //} else if (keyCode == 111) {
    //  chara = "divide";
    // divide
    //} else if (keyCode == 112) {
    //  chara = "F1";
    // F1
    //} else if (keyCode == 113) {
    //  chara = "F2";
    // F2
    //} else if (keyCode == 114) {
    //  chara = "F3";
    // F3
    //} else if (keyCode == 115) {
    //  chara = "F4";
    // F4
    //} else if (keyCode == 116) {
    //  chara = "F5";
    // F5
    //} else if (keyCode == 117) {
    //  chara = "F6";
    // F6
    //} else if (keyCode == 118) {
    //  chara = "F7";
    // F7
    //} else if (keyCode == 119) {
    //  chara = "F8";
    // F8
    //} else if (keyCode == 120) {
    //  chara = "F9";
    // F9
    //} else if (keyCode == 121) {
    //  chara = "F10";
    // F10
    //} else if (keyCode == 122) {
    //  chara = "F11";
    // F11
    //} else if (keyCode == 123) {
    //  chara = "F12";
    // F12
    //} else if (keyCode == 144) {
    //  chara = "num lock";
    // num lock
    //} else if (keyCode == 145) {
    //  chara = "scroll lock";
    // scroll lock
    } else if (keyCode == 186) {
        chara = ";";
    // semi-colon
    } else if (keyCode == 187) {
        chara = "=";
    // equal-sign
    } else if (keyCode == 188) {
        chara = ",";
    // comma
    } else if (keyCode == 189) {
        chara = "-";
    // dash
    } else if (keyCode == 190) {
        chara = ".";
    // period
    } else if (keyCode == 191) {
        chara = (shift) ? "?" : "/";
    // forward slash
    } else if (keyCode == 192) {
        chara = "`";
    // grave accent
    } else if (keyCode == 219) {
        chara = /*(shift) ? "{" :*/ "[";
    // open bracket
    } else if (keyCode == 220) {
        chara = "\\";
    // back slash
    } else if (keyCode == 221) {
        chara = /*(shift) ? "}" :*/ "]";
    // close bracket
    } else if (keyCode == 222) {
        chara = "'";
    // single quote
    }

    return chara;
  }

  var Hotkey = function(hotkey) {
    this.action = hotkey.action;
    this.hotkey = hotkey;
  };

  var default_hotkey_pairs = [
    // Create new case
    {
      text: 'Create Case',
      name: 'create_case',
      keys: 'c',
      allowInput: false,
      action: function() {
        $('.add-case-button').click();
      }
    }
    // Close case
    ,{
      text: 'Close Case or Unfocus Input',
      name: 'close_case_or_unfocus',
      keys: 'ESC',
      allowInput: true,
      action: function(e) {
        if ( $(e.target).is('input, button, textarea, select') ) {
          $(e.target).blur();
        } else {
          $('.js-header-list-cases-link').click();
        }

        $hotkey_wrapper.hide();
      }
    }
    // Search
    ,{
      text: 'Search Cases',
      name: 'search_cases',
      keys: 'gi',
      allowInput: false,
      action: function() {
        $('.search-box').focus();
      }
    }
    // Search
    ,{
      text: 'Quick Search',
      name: 'quick_search',
      keys: '/',
      allowInput: false,
      action: function() {
        $('.search-box').focus();
      }
    }
    // Search
    ,{
      text: 'Search',
      name: 'search',
      keys: 'f',
      allowInput: false,
      action: function() {
        $('.search-box').focus();
      }
    }
    // Hotkey help
    ,{
      text: 'Show Hotkeys',
      name: 'show_hotkeys',
      keys: '?',
      allowInput: false,
      action: function() {
        $hotkey_wrapper.show();
      }
    }
    // Previous case
    ,{
      text: 'Previous Case',
      name: 'previous_case',
      keys: 'j',
      allowInput: false,
      action: function() {
        $('[name="previous-case"]').click();
      }
    }
    // Next case
    ,{
      text: 'Next Case',
      name: 'next_case',
      keys: 'k',
      allowInput: false,
      action: function() {
        $('[name="next-case"]').click();
      }
    }
    // Edit case
    ,{
      text: 'Edit Case',
      name: 'edit_case',
      keys: 'e',
      allowInput: false,
      action: function() {
        $('[name="edit"]').click();
      }
    }
    // Assign case
    ,{
      text: 'Assign Case',
      name: 'assign_case',
      keys: 'a',
      allowInput: false,
      action: function() {
        $('[name="assign"]').eq(0).click();
      }
    }
  ];

  var hotkey_pairs = {};
  var hotkey_chain = '';
  var clear_hotkey_chain_timeout;
  var $hotkey_wrapper = $('<div/>')
    .addClass('fogbugz-helper-hotkeys-wrapper')
    ;

  var hotkey_press = function(e) {
    //expire after focusing anything
    clearTimeout(clear_hotkey_chain_timeout);
    if ( e.altKey || e.ctrlKey || e.metaKey || e.shiftKey ) {
      hotkey_chain = '';
      return;
    }

    var cha = convertKeyCode(e);
    if ( cha === null ) {
      hotkey_chain = '';
      return;
    }

    hotkey_chain += cha;

    if ( hotkey_pairs[hotkey_chain] ) {
      // Make sure not to fire macros while typing comments etc
      if ( !hotkey_pairs[hotkey_chain].hotkey.allowInput && $(e.target).is('input, button, textarea, select') ) {
        hotkey_chain = '';
        return;
      }

      setTimeout(function() {
        hotkey_pairs[hotkey_chain].action(e);
        hotkey_chain = '';
      }, 0);
    } else {
      //expire after a set amount of time
      clear_hotkey_chain_timeout = setTimeout(function() {
        hotkey_chain = '';
      }, 1000);
    }
  };

  var onload_fb_hotkeys = function() {
    $document
      .bind('keydown', hotkey_press)
      ;
  };

  var onunload_fb_hotkeys = function() {
    $document
      .unbind('keydown', hotkey_press)
      ;

    $('.fogbugz-helper-hotkeys-tool').remove();
  };

  var ontools_fb_hotkeys = function() {
    var $hotkeys = $('<div/>')
      .addClass('fogbugz-helper-hotkeys-tool fogbugz-helper-tool')
      ;

    var $headline = $('<a href="#">')
      .addClass('fogbugz-helper-headline')
      .html('Show Hotkeys')
      .appendTo($hotkeys)
      .bind('click', function() {
        $hotkey_wrapper.show();
      })
      ;

    var $menu = $('#fogbugz-helper-features-menu');

    $menu.append($hotkeys);
  }

  var show_hotkeys_popup = function() {
    $hotkey_wrapper
      .show()
      .focus()
      ;
  };

  var build_hotkeys_pop = function() {
    var hotkeys = localStorage.getItem('zr_hotkeys') || '{}';
    hotkeys = JSON.parse(hotkeys);

    var $hotkeys = $('<div/>')
      .addClass('fogbugz-helper-hotkeys-modal')
      ;

    var $headline = $('<h4>')
      .addClass('fogbugz-helper-headline')
      .html('Hotkeys')
      .appendTo($hotkeys)
      ;

    for ( var i = 0, l = default_hotkey_pairs.length, hotkey, keys; i < l; i++ ) {
      hotkey = default_hotkey_pairs[i];
      keys = hotkeys[hotkey.name] || hotkey.keys;

      var $hotkey = $('<div/>')
        .addClass('fogbugz-helper-hotkey')
        ;

      var $input = $('<label>') //$('<input type="text">')
        .attr({
          'id': 'hotkey-' + hotkey.name
        })
        .addClass('fogbugz-helper-hotkey-input-wrapper')
        //.val(keys)
        .html(keys)
        ;

      var $label = $('<label>')
        .attr({
          'for': 'hotkey-' + hotkey.name
        })
        .addClass('fogbugz-helper-hotkey-label')
        .html(hotkey.text)
        ;

      $hotkeys.append(
        $hotkey.append($input, $label)
      );
    }

    var $close = $('<p>')
      .addClass('fogbugz-helper-hotkey-close')
      .html('(click anywhere or press ESC to close)')
      .appendTo($hotkeys)
      ;

    $hotkey_wrapper
      .attr({'tabIndex': 1})
      .hide()
      .empty()
      .append($hotkeys)
      .appendTo('body')
      .bind('click', function() {
        $hotkey_wrapper.hide();
      })
      ;
  };

  var hotkeys = localStorage.getItem('zr_hotkeys') || '{}';
  hotkeys = JSON.parse(hotkeys);

  for ( var i = 0, l = default_hotkey_pairs.length, hotkey, keys; i < l; i++ ) {
    hotkey = default_hotkey_pairs[i];
    keys = hotkeys[hotkey.name] || hotkey.keys;
    hotkey_pairs[keys] = new Hotkey(hotkey);
  }

  build_hotkeys_pop();

  pm.add({
    id: 'fb_hotkeys',
    text: 'Hotkeys',
    title: 'Hotkeys for common actions. May not play nicely with FogBugz\'s built-in hotkeys.',
    defaultOn: false,
    onload: onload_fb_hotkeys,
    ontools: ontools_fb_hotkeys,
    onunload: onunload_fb_hotkeys
  });

    ////////////////////////////
   // (Preference) Autosize Textareas
  ////////////////////////////
  var autosize_textareas = function() {
    var $textareas = $('textarea:not(.autosize-autosized)');

    if ( $textareas.length ) {
      $textareas.autosize();
    }
  };

  var onload_autosize_textareas = function() {
    autosize_textareas();
    $document.delegate('#main', 'DOMNodeInserted DOMNodeRemoved', autosize_textareas);
  };

  var onunload_autosize_textareas = function() {
    $document.undelegate('#main', 'DOMNodeInserted DOMNodeRemoved', autosize_textareas);
  };

  pm.add({
    id: 'autosize_textareas',
    text: 'Autosize Textareas',
    title: 'Large text fields will automatically expand when type in them',
    defaultOn: true,
    onload: onload_autosize_textareas,
    onunload: onunload_autosize_textareas
  });

    ////////////////////////////
   // (Preference) Background color picker
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
  var color;

  var onload_bgcolors = function() {
    $body.addClass('fogbugz-helper-bgcolors');

    color = localStorage.getItem('color');

    if ( color ) {
      $body.css('background-color', color);
    }
  };

  var onunload_bgcolors = function() {
    $body
      .removeClass('fogbugz-helper-bgcolors')
      .css('background-color', '')
      ;

    $('.fogbugz-helper-colors').remove();
  };

  var ontools_bgcolors = function() {
    var $color_li = $('.fogbugz-helper-colors');

    // Can't figure out why the colors don't stay, we'll just run this function every time and bail if they exist
    if ( $color_li.length ) {
      return;
    }

    $color_li = $('<div/>')
      .addClass('fogbugz-helper-colors fogbugz-helper-tool')
      .delegate('button', 'click', function(e) {
        e.preventDefault();
        var color = $(this).css('background-color');

        localStorage.setItem('color', color);
        $body.css('background-color', color);
        $input.val(color);
      })
      ;

    var $headline = $('<h4>')
      .addClass('fogbugz-helper-headline')
      .html('Choose a background color')
      .appendTo($color_li)
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

    var $menu = $('#fogbugz-helper-features-menu');

    $menu.append($color_li);
  };

  pm.add({
    id: 'bgcolors',
    text: 'Background Colors',
    title: 'Enable the color picker to change the background color of FogBugz. Has a few styling issues here and there. If you encounter an issue you can quickly disable it in the FogBugz tools menu.',
    defaultOn: true,
    onload: onload_bgcolors,
    ontools: ontools_bgcolors,
    onunload: onunload_bgcolors
  });

    ////////////////////////////
   // (Preference) Edit Ticket Links
  ////////////////////////////
  var edit_ticket_links = function(e) {
    var href = this.href;

    href = href.replace(/cases\/([0-9]+)/, 'cases/edit/$1');

    this.href = href;
  };

  var onload_edit_ticket_links = function() {
    $document.delegate('a.case', 'mouseover focus', edit_ticket_links);
  };

  var onunload_edit_ticket_links = function() {
    $document.undelegate('a.case', 'mouseover focus', edit_ticket_links);
  };

  pm.add({
    id: 'edit_ticket_links',
    text: 'Edit Ticket Links',
    title: 'When you click on ticket links within FogBugz, they will open in "edit mode." This will not work on links outside of FogBugz yet (like links in emails, etc).',
    defaultOn: true,
    onload: onload_edit_ticket_links,
    onunload: onunload_edit_ticket_links
  });

    ////////////////////////////
   // (Preference) Open Tickets in Modal
  ////////////////////////////

  var $main = $('#main');

  var _close_ticket_modal = function() {
    $('.js-header-list-cases-link').click();
  };

  var close_ticket_modal = function(e) {
    if ( e.target !== this ) {
      return;
    }

    _close_ticket_modal();
  };

  var onload_tickets_in_modal = function() {
    $body.addClass('fogbugz-helper-tickets-in-modal')
    $main.bind('click', close_ticket_modal);
  };

  var onunload_tickets_in_modal = function() {
    $body.removeClass('fogbugz-helper-tickets-in-modal')
    $main.unbind('click', close_ticket_modal);
  };

  pm.add({
    id: 'onunload_tickets_in_modal',
    text: 'Click Backdrop to Close Ticket',
    title: 'Clicking the area behind a ticket will close the ticket and load your last filter.',
    defaultOn: true,
    onload: onload_tickets_in_modal,
    onunload: onunload_tickets_in_modal
  });

    ////////////////////////////
   // (Preference) Auto Sort Tickets
  ////////////////////////////
  var onload_auto_sort = function() {
    $body.addClass('fogbugz-helper-auto-sort');
  };

  var onunload_auto_sort = function() {
    $body.removeClass('fogbugz-helper-auto-sort');
  };

  pm.add({
    id: 'auto_sort',
    text: 'Auto Sort Tickets (by status)',
    title: 'When grouped and sorted by status, ticket groups are arranged in a more logical order. Reverse sorting doesn\'t work yet',
    defaultOn: false,
    onload: onload_auto_sort,
    onunload: onunload_auto_sort
  });

    ////////////////////////////
   // (Preference) Expand Task List
  ////////////////////////////
  var onload_expand_tasks = function() {
    $body.addClass('fogbugz-helper-expand-tasks');
  };

  var onunload_expand_tasks = function() {
    $body.removeClass('fogbugz-helper-expand-tasks');
  };

  pm.add({
    id: 'expand_tasks',
    text: 'Expand Task List Cells',
    title: 'Shows the full text of titles etc. in ticket lists. Each row can be more than one line of text.',
    defaultOn: false,
    onload: onload_expand_tasks,
    onunload: onunload_expand_tasks
  });

    ////////////////////////////
   // (Preference) Ticket Tweaks
  ////////////////////////////
  var onload_ticket_tweaks = function() {
    $body.addClass('fogbugz-helper-ticket-tweaks');
  };

  var onunload_ticket_tweaks = function() {
    $body.removeClass('fogbugz-helper-ticket-tweaks');
  };

  pm.add({
    id: 'ticket_tweaks',
    text: 'Ticket Styling Tweaks',
    title: 'Various ticket styling changes to make tickets work a little better in smaller windows, etc.',
    defaultOn: true,
    onload: onload_ticket_tweaks,
    onunload: onunload_ticket_tweaks
  });

    ////////////////////////////
   // (Preference) Fake Kanban
  ////////////////////////////
  var _fake_kanban_class = 'fogbugz-helper-fake-kanban';
  var _fake_kanban_sorted_class = 'fogbugz-helper-fake-kanban-sorted';

  /* Not used, but this is how I figured out FB's event names

  var _sub = fb.pubsub.subscribe;

  fb.pubsub.subscribe = function(name, fun) {
    console.log(name);
    _sub(name, fun);
    _sub(name, function(m, d) {
      console.log(m, d);
      console.log($('#filter-description-sort').children().length);
    });
    //console.log(document.getElementById('filter-description-sort'));
  };*/

  /*var _pub = fb.pubsub.publish;

  fb.pubsub.publish = function(name) {
    console.log(arguments);
    _pub.apply(window, arguments);
    console.log($('#filter-description-sort').children().length);
  };*/

  var _fake_kanban_template_inserted = function(r, data) {
    if ( $('.list-group-header').children().length > 2 ) {
      $body.addClass(_fake_kanban_sorted_class);
    } else {
      $body.removeClass(_fake_kanban_sorted_class);
    }
  };

  var onload_fake_kanban = function() {
    $body.addClass(_fake_kanban_class);

    fb.pubsub.subscribe("/template/inserted", _fake_kanban_template_inserted);

    _fake_kanban_template_inserted();
  };

  var onunload_fake_kanban = function() {
    $body.removeClass(_fake_kanban_class);

    fb.pubsub.unsubscribe("/template/inserted", _fake_kanban_template_inserted);

    $body.removeClass(_fake_kanban_sorted_class);
  };

  pm.add({
    id: 'fake_kanban',
    text: 'Kanban-Style Ticket Listing',
    title: 'Changes ticket listings to be similar to the FogBugz Kanban board. Drag n drop to come...',
    defaultOn: false,
    onload: onload_fake_kanban,
    onunload: onunload_fake_kanban
  });

    ////////////////////////////
   // (Preference) Reverse Comments
  ////////////////////////////
  var onload_reverse_comments = function() {
    $body.addClass('fogbugz-helper-reverse-comments');
  };

  var onunload_reverse_comments = function() {
    $body.removeClass('fogbugz-helper-reverse-comments');
  };

  pm.add({
    id: 'reverse_comments',
    text: 'Reverse Comment Order on Tickets',
    title: 'Pretty self explanatory',
    defaultOn: false,
    onload: onload_reverse_comments,
    onunload: onunload_reverse_comments
  });

  // Set up all the preferences
  pm.load();
};

// Attempt to run the code
init();

})();
