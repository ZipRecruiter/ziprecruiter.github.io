---
---

window.zrBaseUrl = "{{protocol}}//{{ site.domain }}";
window.zrBookmarkletUrl = window.zrBaseUrl + "/greasemonkey/fogbugz-helper";

{% include js/vendor/autosize/3.0.10/autosize.js %}

{% capture include_to_scssify %}
	{% include greasemonkey/fogbugz-helper/fogbugz-helper.css %}
{% endcapture %}

var css = {{ include_to_scssify | jsonify }};

var s = document.createElement('style');
s.id = 'fogbugz-helper-css';
s.innerHTML = css;
document.head.appendChild(s);

{% include greasemonkey/fogbugz-helper/fogbugz-helper-script.js %}
