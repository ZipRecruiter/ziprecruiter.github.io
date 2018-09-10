---
---

(function($) {

  var html = '<ul>';

  for ( var pref in window.__fogbugz_helper_pm.prefs ) {
    pref = window.__fogbugz_helper_pm.prefs[pref];
    html += '<li>' +
      '<h4 id="' + pref.id + '">' + pref.text + '</h4>' +
      '<p>' + pref.title + ' (Default: ' + (pref.defaultOn?'On':'Off') + ')</p>' +
      ( pref.screenshot ? '<p class="thumb collapsed"><img src="' + window.zrBookmarkletUrl + '/' + pref.screenshot + '"></p>' : '' ) +
      ( pref.screenshot2 ? '<p class="thumb collapsed"><img src="' + window.zrBookmarkletUrl + '/' + pref.screenshot2 + '"></p>' : '' ) +
    '</li>';
  }

  $('#features_content').prepend(html);

})(window.jQuery);