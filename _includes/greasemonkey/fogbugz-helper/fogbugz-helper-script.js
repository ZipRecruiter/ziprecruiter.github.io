
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
   // (Preference) Background cololor picker
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
  var filters_url;

  var try_check_for_filters_timeout;

  var try_check_for_filters = function() {
    clearTimeout(try_check_for_filters_timeout);

    try_check_for_filters_timeout = setTimeout(check_for_filters, 200);
  };

  var check_for_filters = function() {
    if ( !document.location.href.match(/f\/((filters)|(search))/) ) {
      $body
        .addClass('main-has-content');

      return;
    }

    filters_url = document.location.href;

    $body
      .removeClass('main-has-content');

    $main2
      .empty()
      .append($main.children())
      ;
  };

  var $main2 = $('<div/>')
    .attr('id', 'main2')
    .insertBefore($main)
    ;

  var close_ticket_modal = function(e) {
    if ( e.target !== this ) {
      return;
    }

    $main
      .empty()
      ;

    $body
      .removeClass('main-has-content')
      ;

    //history.pushState(false, false, filters_url);
    //$(window).trigger('popState');
    $('.js-header-list-cases-link').click();
  };

  var onload_tickets_in_modal = function() {
    $body.addClass('fogbugz-helper-tickets-in-modal')
    $main.bind('click', close_ticket_modal);
    $document.delegate('#main', 'DOMNodeInserted', try_check_for_filters);
    try_check_for_filters();
  };

  var onunload_tickets_in_modal = function() {
    $body.removeClass('fogbugz-helper-tickets-in-modal')
    $main.unbind('click', close_ticket_modal);
    $document.undelegate('#main', 'DOMNodeInserted', try_check_for_filters);
  };

  pm.add({
    id: 'onunload_tickets_in_modal',
    text: 'Open Tickets in Modal',
    title: 'Tickets will open in "modals" which will leave your task list/search open in the background. Click the black backdrop to close the ticket.',
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
  var onload_fake_kanban = function() {
    $body.addClass('fogbugz-helper-fake-kanban');
  };

  var onunload_fake_kanban = function() {
    $body.removeClass('fogbugz-helper-fake-kanban');
  };

  pm.add({
    id: 'fake_kanban',
    text: 'Kanban-Style Ticket Listing',
    title: 'Changes ticket listings to be similar to the FogBugz Kanban board. Drag n drop to come...',
    defaultOn: false,
    onload: onload_fake_kanban,
    onunload: onunload_fake_kanban
  });

  // Set up all the preferences
  pm.load();
};

// Attempt to run the code
init();

})();
