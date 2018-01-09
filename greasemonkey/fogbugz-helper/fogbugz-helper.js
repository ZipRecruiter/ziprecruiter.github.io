---
---

(function() {

// Prevent the script from being loaded twice
if ( window['--fogbugz-helper-loaded'] ) return;
window['--fogbugz-helper-loaded'] = true;

(function() {
  // http://stackoverflow.com/questions/2976651/javascript-how-do-i-get-the-url-of-script-being-called
  var pathParts;
  try {
    //Throw an error to generate a stack trace
    throw new Error();
  }
  catch(e) {
    //Split the stack trace into each line
    var stackLines = e.stack.split('\n');
    var callerIndex = 0;
    //Now walk though each line until we find a path reference
    for(var i in stackLines){
      if(!stackLines[i].match(/http[s]?:\/\//)) continue;
      //We skipped all the lines with out an http so we now have a script reference
      //This one is the class constructor, the next is the getScriptPath() call
      //The one after that is the user code requesting the path info (so offset by 2)
      callerIndex = Number(i);
      break;
    }
    //Now parse the string for each section we want to return
    pathParts = stackLines[callerIndex].match(/((http[s]?:\/\/.+\/)([^\/]+\.js(\?.*)*)):/);
  }

  var fullPath = pathParts[1];

  var el = document.createElement('a');

  el.href = fullPath;
  window.zrBaseUrl = el.protocol + "//" + el.host;
})();

window.zrBookmarkletUrl = window.zrBaseUrl + "/greasemonkey/fogbugz-helper";

{% include js/vendor/autosize/3.0.10/autosize.js %}

{% capture include_to_scssify %}
	{% include greasemonkey/fogbugz-helper/fogbugz-helper.css %}
{% endcapture %}

window.zrBookmarkletCSS = {{ include_to_scssify | jsonify }};

{% include greasemonkey/fogbugz-helper/fogbugz-helper-script.js %}

})();
