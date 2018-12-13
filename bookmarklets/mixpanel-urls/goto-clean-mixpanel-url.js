---
---

(function() {
  {% include bookmarklets/mixpanel-urls/mixpanel-urls.js %}

  window.location.href = mp_clean_url;
  window.location.reload(true);
})();