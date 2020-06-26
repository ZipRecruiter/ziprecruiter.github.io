(function() {
  // In case it doesn't exist
  if ( !String.prototype.format ) {
    String.prototype.format = function() {return this;};
  }

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

    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

      //////////////////////
     // Preference manager
    //////////////////////
    var PreferenceManager = function() {
      this.prefs = {};
      this.loaded = false;
    };

    PreferenceManager.prototype.set = function(name, value) {
      return localStorage.setItem('jira-helper-' + name, value);
    }

    PreferenceManager.prototype.get = function(name, defaultOn) {
      var val = JSON.parse(localStorage.getItem('jira-helper-' + name));

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
      var prefs_array = [];

      if ( me.loaded ) {
        // Maybe throw an error?
        return;
      }

      me.loaded = true;

      var add_prefs = function(force) {
        var $helper_menu = $('#jira-helper-menu');

        force = force || false;

        if ( !force && $helper_menu.length ) {
          // Already added menu
          return;
        } else if ( force ) {
          $helper_menu.empty();
        } else {
          $helper_menu = $('<div/>').attr('id', 'jira-helper-menu');
          // Add a link to plugin homepage
          var $homepage_link = $('<label><a href="http://ziprecruiter.github.io/greasemonkey/jira-helper/" target="_blank">ZipRecruiter JIRA Helper</a></label>');
          $helper_menu.append($homepage_link);
        }

        // Menu to put checkbox preferences into
        var $prefs_menu = $('<menu/>').attr('id', 'jira-helper-prefs-menu');

        // Menu for features to dump stuff into
        var $features_menu = $('<menu/>').attr('id', 'jira-helper-features-menu');

        // Make preferences
        var $plabel;
        var $pcheck;

        prefs_array.sort(function(a, b) {
          if ( a.text < b.text ) {
            return -1;
          }

          if ( a.text > b.text ) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        for ( var i = 0, l = prefs_array.length; i < l; i++ /*pkey in me.prefs*/ ) {
          //pref = me.prefs[pkey];
          pref = prefs_array[i];

          $pcheck = $('<input type="checkbox">')
            .attr({
              'id': 'jira-helper-pref-check-' + pref.id
            })
            .data('prefid', pref.id)
            ;

          if ( me.get(pref.id, pref.defaultOn || (iOS && pref.defaultOnIOS)) ) {
            $pcheck.prop('checked', true);
          }

          $plabel = $('<label/>')
            .attr({
              'id': 'jira-helper-pref-' + pref.id,
              'for': 'jira-helper-pref-check-' + pref.id,
              'title': pref.title + ' (Default: ' + (pref.defaultOn || (iOS && pref.defaultOnIOS)?'On':'Off') + ')'
            })
            .html(pref.text)
            .prepend($pcheck)
            .appendTo($prefs_menu)
            ;
        }

        $helper_menu
          .append($prefs_menu)
          .append($features_menu)
          .insertBefore($('.gw-nav-entry-settings .dropdown-menu .menu-content-section:last-child'))
          ;

        for ( pkey in me.prefs ) {
          pref = me.prefs[pkey];

          if ( me.get(pref.id, pref.defaultOn || (iOS && pref.defaultOnIOS)) && pref.ontools ) {
            pref.ontools();
          }
        }
      };

      // One-time setup stuff
      $document
        .delegate('.gw-nav-entry-settings', 'mouseover', function() {
          setTimeout(add_prefs, 10);
        })
        // Changing preferences via checkboxes
        .delegate('#jira-helper-prefs-menu input', 'change', function() {
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
        prefs_array.push(pref);

        if ( me.get(pref.id, pref.defaultOn || (iOS && pref.defaultOnIOS)) && pref.onload ) {
          pref.onload();
        }
      }
    };

    // Make the preference manager
    var pm = window.__jira_helper_pm = new PreferenceManager();

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
        var $jira_helper_css = $('#jira-helper-css');
        if ( !$jira_helper_css.length || ($jira_helper_css.css('content') != 'loaded' && $jira_helper_css.css('content') != '"loaded"' && $jira_helper_css.css('content') != "'loaded'") ) {
          setTimeout(init, 10);
          return;
        }
      }

      // Run the main functionality
      main($);
    }

    var main = function($) {
      // Shared Stuff
      var $body = $('body');
      $document = $(document);
      $window = $(window);

        ////////////////////////////
       // (Preference) New Ticket Tweaks
      ////////////////////////////

      (function(pm) {
        var $meta_tweaks = $('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"/>');

        var onload = function() {
          $body.addClass('jira-helper-new-ticket-tweaks');
          $meta_tweaks.appendTo('head');
          $('html,body').scrollTop(0);
          $('html,body').scrollLeft(0);
        };

        var onunload = function() {
          $body.removeClass('_fhtt');
          $meta_tweaks.remove();
        };

        pm.add({
          id: 'new_ticket_tweaks',
          text: 'New JIRA Ticket Styling Tweaks',
          title: 'Makes the new JIRA ticket view easier to read, etc.',
          /*screenshot: 'img/responsive.png',
          screenshot2: 'img/ticket_spam.gif',*/
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) Reverse Comments
      ////////////////////////////
      var onload_reverse_comments = function() {
        $body.addClass('jira-helper-reverse-comments');
      };

      var onunload_reverse_comments = function() {
        $body.removeClass('jira-helper-reverse-comments');
      };

      pm.add({
        id: 'reverse_comments',
        text: 'Reverse Comment Order on New JIRA Ticket View',
        title: 'Reverses comment order when New JIRA Ticket View is on, puts comment box at the top',
        defaultOn: true,
        onload: onload_reverse_comments,
        onunload: onunload_reverse_comments
      });

        ////////////////////////////
       // Hotfix shortcut
      ////////////////////////////
      (function(pm) { // So as not to pollute the namespace
        var $tooltip = $('<button type="button" class="jira_helper_tooltip"></button>');
        var $tooltip_text = $('<span class="jira_helper_tooltip_text"></span>')
          .appendTo($tooltip);

        var copy_text = function(ev) {
          try {
            if ( window.getSelection().empty ) {  // Chrome
              window.getSelection().empty();
            } else if ( window.getSelection().removeAllRanges ) {  // Firefox
              window.getSelection().removeAllRanges();
            }

            var range = document.createRange();
            range.selectNode($tooltip_text[0]);
            window.getSelection().addRange(range);

            if ( window.getSelection().toString() ) {
              document.execCommand('copy');
            } else {
              // If at first you don't succeed...
              setTimeout(function() {
                copy_text.call(this, ev);
              }, 100)
            }
          } catch(copyErr) {
            alert('Unable to copy');
          }

          // Hiding here seems to cause all kinds of issues
          // $tooltip.fadeOut(50);

          if ( window.getSelection().empty ) {  // Chrome
            window.getSelection().empty();
          } else if ( window.getSelection().removeAllRanges ) {  // Firefox
            window.getSelection().removeAllRanges();
          }
        };

        $tooltip
          .bind('mousedown', copy_text)
          .bind('click', function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
          })
          ;

        var hide_tooltip_to;
        var show_tooltip_to;

        var show_tooltip = function() {
          var el = this;
          var $this = $(this);
          clearTimeout(hide_tooltip_to);
          clearTimeout(show_tooltip_to);

          show_tooltip_to = setTimeout(function() {
            var text_match = el.href.match(/(\b[a-f0-9]{40})/);
            if ( !text_match ) return;
            var text = text_match[0];

            if ( text && text.match(/(\b[a-f0-9]{40})/) ) {
              $tooltip.show();
              $tooltip_text.attr('title', 'Click to copy the hotfix command').html('bin/zr-req-hotfix -s --qa-facing=yes -m="" ' + text + '');
              $tooltip.appendTo(el);
            }
          }, 100);
        };

        var hide_tooltip = function() {
          hide_tooltip_to = setTimeout(function() {
            $tooltip.detach();
          }, 500);
        };

        var commit_selector = 'a[href^="https://git.ziprecruiter.com/ZipRecruiter/ziprecruiter/-/commit/"]';

        var onload_fn = function() {
          $document
            .delegate(commit_selector, 'mouseover focus', show_tooltip)
            .delegate(commit_selector, 'mouseout blur', hide_tooltip)
            ;
        };

        var onunload_fn = function() {
          $document
            .undelegate(commit_selector, 'mouseover focus', show_tooltip)
            .undelegate(commit_selector, 'mouseout blur', hide_tooltip)
            ;
        };

        pm.add({
          id: 'hotfix_shortcut',
          text: 'Show Hotfix Comand on Commit Links',
          title: 'Adds a copyable hotfix command in a tooltip on linked sha1\'s',
          defaultOn: true,
          onload: onload_fn,
          onunload: onunload_fn
        });
      })(pm);

      // Set up all the preferences
      if ( !window.__jira_helper_do_not_init ) {
        pm.load();
      }
    };

    // Attempt to run the code
    init();

  })();
})();