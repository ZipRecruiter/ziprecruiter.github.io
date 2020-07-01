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
          .appendTo($('[data-testid="atlassian-navigation--secondary-actions--settings--menu-popup"] > div > div > div'))
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
        .delegate('[data-testid="atlassian-navigation--secondary-actions--settings--menu-trigger"] button', 'click', function() {
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
      if ( !window.jQuery || !document.body ) {
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
       // (Preference) Remove status icons
      ////////////////////////////

      (function(pm) {
        var body_class = 'jira-helper-remove-status-icons';

        var onload = function() {
          $body.addClass(body_class);
        };

        var onunload = function() {
          $body.removeClass(body_class);
        };

        pm.add({
          id: 'remove_status_icons',
          text: 'Remove Status Icons',
          title: 'Only show status text (if enabled) in most views',
          // screenshot: 'img/ft_new_styling_tweaks.png',
          defaultOn: false,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) Don't open button clicks etc in new window
      ////////////////////////////

      (function(pm) {
        // back up the old window.open
        var _open = window.open;

        var no_new_window_open = function(url, target) {
          var args = Array.prototype.slice.call(arguments);

          if ( target == '_blank' ) {
            args[1] = undefined;
            args = [url, target];
          }

          _open.apply(window, args);
        };

        var onload = function() {
          // monkey patch
          window.open = no_new_window_open;
        };

        var onunload = function() {
          window.open = _open;
        };

        pm.add({
          id: 'no_new_window',
          text: 'Do Not Open Links In New Window',
          title: 'Overrides some button clicks to not open in anew browser windows',
          // screenshot: 'img/ft_new_styling_tweaks.png',
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) Re-order ticket statuses
      ////////////////////////////

      (function(pm) {
        var $list;
        var selector = '[data-test-id="issue.views.issue-base.foundation.status.status-field-wrapper"]';
        var body_class = 'jira-helper-re-order-statuses';

        // Observer stuff
        var config = { attributes: false, childList: true, subtree: true };

        var callback = function(mutationsList, observer) {
          for ( let mutation of mutationsList ) {
            if (mutation.type === 'childList') {
              var $options = $list.find('[id*="-option-"]');

              if ( $options.length ) {
                var section = 0;
                var last_section = '';

                $options.each(function() {
                  var $this = $(this);
                  var $lozenge = $this.find('[data-test-id]');
                  var section_id = $lozenge.data('test-id');

                  if ( section_id !== last_section ) {
                    section++;
                  }

                  last_section = section_id;

                  $this.attr({
                    'data-status': $lozenge.text(),
                    'data-status-section': section
                  });
                });

                observer.disconnect();
              }
            }

          }
        };

        var observer = new MutationObserver(callback);

        var order_statuses = function() {
          $list = $(this);

          observer.disconnect();

          observer.observe(this, config);
        };

        var onload = function() {
          $body
            .delegate(selector, 'click', order_statuses)
            .addClass(body_class);
        };

        var onunload = function() {
          $body
            .undelegate(selector, 'click', order_statuses)
            .addClass(body_class);
        };

        pm.add({
          id: 're_order_statuses',
          text: 'Reorder Ticket Statuses (New JIRA Issue View)',
          title: 'Put ticket statuses in an order which more matches our workflow',
          // screenshot: 'img/ft_new_styling_tweaks.png',
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });
      })(pm);

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
          $body.removeClass('jira-helper-new-ticket-tweaks');
          $meta_tweaks.remove();
        };

        pm.add({
          id: 'new_ticket_tweaks',
          text: 'New JIRA Issue View Styling Tweaks',
          title: 'Makes the new JIRA issue view easier to read, etc.',
          screenshot: 'img/ft_new_styling_tweaks.png',
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
        text: 'Reverse Comment Order (New JIRA Issue View)',
        title: 'Reverses comment order when New JIRA Issue View is on, puts comment box at the top',
        defaultOn: true,
        screenshot: 'img/ft_reverse_comments.png',
        onload: onload_reverse_comments,
        onunload: onunload_reverse_comments
      });

        ////////////////////////////
       // (Preference) Show Priority Text
      ////////////////////////////
      (function(pm) { // So as not to pollute the namespace
        var onload_fn = function() {
          $body.addClass('jira-helper-priority-text');
        };

        var onunload_fn = function() {
          $body.removeClass('jira-helper-priority-text');
        };

        pm.add({
          id: 'priority_text',
          text: 'Show Priority Text',
          title: 'Shows prioity name next to arrows',
          defaultOn: true,
          screenshot: 'img/ft_priority_text.png',
          onload: onload_fn,
          onunload: onunload_fn
        });
      })(pm);

        ////////////////////////////
       // (Preference) Open external links in new tabs
      ////////////////////////////
      (function(pm) { // So as not to pollute the namespace
        var onload_fn = function() {
          $body.addClass('jira-helper-external-links');
        };

        var onunload_fn = function() {
          $body.removeClass('jira-helper-external-links');
        };

        $body
          .delegate('.jira-helper-external-links a[href]:not([href^="https://ziprecruiter.atlassian.net/"]):not([href^="/"]):not([href^="#"])', 'focus mousedown', function() {
            $(this).attr({
              target: '_blank',
              rel: 'noopener'
            });
          })

        pm.add({
          id: 'external_links',
          text: 'Open External Links in New Tabs',
          title: 'Also indicates external links with an arrow',
          defaultOn: true,
          screenshot: 'img/ft_external_links.png',
          onload: onload_fn,
          onunload: onunload_fn
        });
      })(pm);

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
          screenshot: 'img/ft_hotfix.png',
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