---
---

(function($) {

  var html = '<ul>';

  var prefs_array = [];
  for ( pkey in window.__fogbugz_helper_pm.prefs ) {
    pref = window.__fogbugz_helper_pm.prefs[pkey];
    prefs_array.push(pref);
  }

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

  for ( var i = 0, l = prefs_array.length, pref; i < l; i++ ) {
    pref = prefs_array[i];
    html += '<li>' +
      '<h4 id="' + pref.id + '">' + pref.text + '</h4>' +
      '<p>' + pref.title + ' (Default: ' + (pref.defaultOn?'On':'Off') + ')</p>' +
      ( pref.screenshot ? '<p class="thumb collapsed"><img src="' + window.zrBookmarkletUrl + '/' + pref.screenshot + '"></p>' : '' ) +
      ( pref.screenshot2 ? '<p class="thumb collapsed"><img src="' + window.zrBookmarkletUrl + '/' + pref.screenshot2 + '"></p>' : '' ) +
    '</li>';
  }

  $('#features_content').prepend(html);

})(window.jQuery);