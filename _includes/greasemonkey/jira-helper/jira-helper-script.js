(function() {

if ( !window.$ ) {
/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):e(t)}(this,function(t){var e=function(){function $(t){return null==t?String(t):S[C.call(t)]||"object"}function F(t){return"function"==$(t)}function k(t){return null!=t&&t==t.window}function M(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function R(t){return"object"==$(t)}function Z(t){return R(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function z(t){var e=!!t&&"length"in t&&t.length,n=r.type(t);return"function"!=n&&!k(t)&&("array"==n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function q(t){return a.call(t,function(t){return null!=t})}function H(t){return t.length>0?r.fn.concat.apply([],t):t}function I(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function V(t){return t in l?l[t]:l[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||h[I(t)]?e:e+"px"}function B(t){var e,n;return c[t]||(e=f.createElement(t),f.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),c[t]=n),c[t]}function U(t){return"children"in t?u.call(t.children):r.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,r=t?t.length:0;for(n=0;r>n;n++)this[n]=t[n];this.length=r,this.selector=e||""}function J(t,r,i){for(n in r)i&&(Z(r[n])||L(r[n]))?(Z(r[n])&&!Z(t[n])&&(t[n]={}),L(r[n])&&!L(t[n])&&(t[n]=[]),J(t[n],r[n],i)):r[n]!==e&&(t[n]=r[n])}function W(t,e){return null==e?r(t):r(t).filter(e)}function Y(t,e,n,r){return F(e)?e.call(t,n,r):e}function G(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function K(t,n){var r=t.className||"",i=r&&r.baseVal!==e;return n===e?i?r.baseVal:r:void(i?r.baseVal=n:t.className=n)}function Q(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?r.parseJSON(t):t):t}catch(e){return t}}function tt(t,e){e(t);for(var n=0,r=t.childNodes.length;r>n;n++)tt(t.childNodes[n],e)}var e,n,r,i,O,P,o=[],s=o.concat,a=o.filter,u=o.slice,f=t.document,c={},l={},h={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+|!)[^>]*>/,d=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,g=/^(?:body|html)$/i,v=/([A-Z])/g,y=["val","css","html","text","data","width","height","offset"],x=["after","prepend","before","append"],b=f.createElement("table"),E=f.createElement("tr"),j={tr:f.createElement("tbody"),tbody:b,thead:b,tfoot:b,td:E,th:E,"*":f.createElement("div")},w=/complete|loaded|interactive/,T=/^[\w-]*$/,S={},C=S.toString,N={},A=f.createElement("div"),D={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},L=Array.isArray||function(t){return t instanceof Array};return N.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=A).appendChild(t),r=~N.qsa(i,e).indexOf(t),o&&A.removeChild(t),r},O=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return a.call(t,function(e,n){return t.indexOf(e)==n})},N.fragment=function(t,n,i){var o,s,a;return d.test(t)&&(o=r(f.createElement(RegExp.$1))),o||(t.replace&&(t=t.replace(m,"<$1></$2>")),n===e&&(n=p.test(t)&&RegExp.$1),n in j||(n="*"),a=j[n],a.innerHTML=""+t,o=r.each(u.call(a.childNodes),function(){a.removeChild(this)})),Z(i)&&(s=r(o),r.each(i,function(t,e){y.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},N.Z=function(t,e){return new X(t,e)},N.isZ=function(t){return t instanceof N.Z},N.init=function(t,n){var i;if(!t)return N.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&p.test(t))i=N.fragment(t,RegExp.$1,n),t=null;else{if(n!==e)return r(n).find(t);i=N.qsa(f,t)}else{if(F(t))return r(f).ready(t);if(N.isZ(t))return t;if(L(t))i=q(t);else if(R(t))i=[t],t=null;else if(p.test(t))i=N.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==e)return r(n).find(t);i=N.qsa(f,t)}}return N.Z(i,t)},r=function(t,e){return N.init(t,e)},r.extend=function(t){var e,n=u.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){J(t,n,e)}),t},N.qsa=function(t,e){var n,r="#"==e[0],i=!r&&"."==e[0],o=r||i?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&r?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:u.call(s&&!r&&t.getElementsByClassName?i?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},r.contains=f.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},r.type=$,r.isFunction=F,r.isWindow=k,r.isArray=L,r.isPlainObject=Z,r.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},r.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},r.inArray=function(t,e,n){return o.indexOf.call(e,t,n)},r.camelCase=O,r.trim=function(t){return null==t?"":String.prototype.trim.call(t)},r.uuid=0,r.support={},r.expr={},r.noop=function(){},r.map=function(t,e){var n,i,o,r=[];if(z(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&r.push(n);else for(o in t)n=e(t[o],o),null!=n&&r.push(n);return H(r)},r.each=function(t,e){var n,r;if(z(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(r in t)if(e.call(t[r],r,t[r])===!1)return t;return t},r.grep=function(t,e){return a.call(t,e)},t.JSON&&(r.parseJSON=JSON.parse),r.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){S["[object "+e+"]"]=e.toLowerCase()}),r.fn={constructor:N.Z,length:0,forEach:o.forEach,reduce:o.reduce,push:o.push,sort:o.sort,splice:o.splice,indexOf:o.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=N.isZ(e)?e.toArray():e;return s.apply(N.isZ(this)?this.toArray():this,n)},map:function(t){return r(r.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return r(u.apply(this,arguments))},ready:function(t){return w.test(f.readyState)&&f.body?t(r):f.addEventListener("DOMContentLoaded",function(){t(r)},!1),this},get:function(t){return t===e?u.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return o.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return F(t)?this.not(this.not(t)):r(a.call(this,function(e){return N.matches(e,t)}))},add:function(t,e){return r(P(this.concat(r(t,e))))},is:function(t){return this.length>0&&N.matches(this[0],t)},not:function(t){var n=[];if(F(t)&&t.call!==e)this.each(function(e){t.call(this,e)||n.push(this)});else{var i="string"==typeof t?this.filter(t):z(t)&&F(t.item)?u.call(t):r(t);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return r(n)},has:function(t){return this.filter(function(){return R(t)?r.contains(this,t):r(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!R(t)?t:r(t)},last:function(){var t=this[this.length-1];return t&&!R(t)?t:r(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?r(t).filter(function(){var t=this;return o.some.call(n,function(e){return r.contains(e,t)})}):1==this.length?r(N.qsa(this[0],t)):this.map(function(){return N.qsa(this,t)}):r()},closest:function(t,e){var n=[],i="object"==typeof t&&r(t);return this.each(function(r,o){for(;o&&!(i?i.indexOf(o)>=0:N.matches(o,t));)o=o!==e&&!M(o)&&o.parentNode;o&&n.indexOf(o)<0&&n.push(o)}),r(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=r.map(n,function(t){return(t=t.parentNode)&&!M(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return W(e,t)},parent:function(t){return W(P(this.pluck("parentNode")),t)},children:function(t){return W(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||u.call(this.childNodes)})},siblings:function(t){return W(this.map(function(t,e){return a.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return r.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=B(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=F(t);if(this[0]&&!e)var n=r(t).get(0),i=n.parentNode||this.length>1;return this.each(function(o){r(this).wrapAll(e?t.call(this,o):i?n.cloneNode(!0):n)})},wrapAll:function(t){if(this[0]){r(this[0]).before(t=r(t));for(var e;(e=t.children()).length;)t=e.first();r(t).append(this)}return this},wrapInner:function(t){var e=F(t);return this.each(function(n){var i=r(this),o=i.contents(),s=e?t.call(this,n):t;o.length?o.wrapAll(s):i.append(s)})},unwrap:function(){return this.parent().each(function(){r(this).replaceWith(r(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=r(this);(t===e?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return r(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return r(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;r(this).empty().append(Y(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,r){var i;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(R(t))for(n in t)G(this,n,t[n]);else G(this,t,Y(this,r,e,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(i=this[0].getAttribute(t))?i:e},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){G(this,t)},this)})},prop:function(t,e){return t=D[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=D[t]||t,this.each(function(){delete this[t]})},data:function(t,n){var r="data-"+t.replace(v,"-$1").toLowerCase(),i=1 in arguments?this.attr(r,n):this.attr(r);return null!==i?Q(i):e},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=Y(this,t,e,this.value)})):this[0]&&(this[0].multiple?r(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(e){if(e)return this.each(function(t){var n=r(this),i=Y(this,e,t,n.offset()),o=n.offsetParent().offset(),s={top:i.top-o.top,left:i.left-o.left};"static"==n.css("position")&&(s.position="relative"),n.css(s)});if(!this.length)return null;if(f.documentElement!==this[0]&&!r.contains(f.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+t.pageXOffset,top:n.top+t.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(t,e){if(arguments.length<2){var i=this[0];if("string"==typeof t){if(!i)return;return i.style[O(t)]||getComputedStyle(i,"").getPropertyValue(t)}if(L(t)){if(!i)return;var o={},s=getComputedStyle(i,"");return r.each(t,function(t,e){o[e]=i.style[O(e)]||s.getPropertyValue(e)}),o}}var a="";if("string"==$(t))e||0===e?a=I(t)+":"+_(t,e):this.each(function(){this.style.removeProperty(I(t))});else for(n in t)t[n]||0===t[n]?a+=I(n)+":"+_(n,t[n])+";":this.each(function(){this.style.removeProperty(I(n))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(r(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?o.some.call(this,function(t){return this.test(K(t))},V(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var n=K(this),o=Y(this,t,e,n);o.split(/\s+/g).forEach(function(t){r(this).hasClass(t)||i.push(t)},this),i.length&&K(this,n+(n?" ":"")+i.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===e)return K(this,"");i=K(this),Y(this,t,n,i).split(/\s+/g).forEach(function(t){i=i.replace(V(t)," ")}),K(this,i.trim())}})},toggleClass:function(t,n){return t?this.each(function(i){var o=r(this),s=Y(this,t,i,K(this));s.split(/\s+/g).forEach(function(t){(n===e?!o.hasClass(t):n)?o.addClass(t):o.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===e?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===e?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=g.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(r(t).css("margin-top"))||0,n.left-=parseFloat(r(t).css("margin-left"))||0,i.top+=parseFloat(r(e[0]).css("border-top-width"))||0,i.left+=parseFloat(r(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||f.body;t&&!g.test(t.nodeName)&&"static"==r(t).css("position");)t=t.offsetParent;return t})}},r.fn.detach=r.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});r.fn[t]=function(i){var o,s=this[0];return i===e?k(s)?s["inner"+n]:M(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(e){s=r(this),s.css(t,Y(this,i,e,s[t]()))})}}),x.forEach(function(n,i){var o=i%2;r.fn[n]=function(){var n,a,s=r.map(arguments,function(t){var i=[];return n=$(t),"array"==n?(t.forEach(function(t){return t.nodeType!==e?i.push(t):r.zepto.isZ(t)?i=i.concat(t.get()):void(i=i.concat(N.fragment(t)))}),i):"object"==n||null==t?t:N.fragment(t)}),u=this.length>1;return s.length<1?this:this.each(function(e,n){a=o?n:n.parentNode,n=0==i?n.nextSibling:1==i?n.firstChild:2==i?n:null;var c=r.contains(f.documentElement,a);s.forEach(function(e){if(u)e=e.cloneNode(!0);else if(!a)return r(e).remove();a.insertBefore(e,n),c&&tt(e,function(e){if(!(null==e.nodeName||"SCRIPT"!==e.nodeName.toUpperCase()||e.type&&"text/javascript"!==e.type||e.src)){var n=e.ownerDocument?e.ownerDocument.defaultView:t;n.eval.call(n,e.innerHTML)}})})})},r.fn[o?n+"To":"insert"+(i?"Before":"After")]=function(t){return r(t)[n](this),this}}),N.Z.prototype=X.prototype=r.fn,N.uniq=P,N.deserializeValue=Q,r.zepto=N,r}();return t.Zepto=e,void 0===t.$&&(t.$=e),function(e){function h(t){return t._zid||(t._zid=n++)}function p(t,e,n,r){if(e=d(e),e.ns)var i=m(e.ns);return(a[h(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||i.test(t.ns))&&(!n||h(t.fn)===h(n))&&(!r||t.sel==r)})}function d(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function m(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function g(t,e){return t.del&&!f&&t.e in c||!!e}function v(t){return l[t]||f&&c[t]||t}function y(t,n,i,o,s,u,f){var c=h(t),p=a[c]||(a[c]=[]);n.split(/\s/).forEach(function(n){if("ready"==n)return e(document).ready(i);var a=d(n);a.fn=i,a.sel=s,a.e in l&&(i=function(t){var n=t.relatedTarget;return!n||n!==this&&!e.contains(this,n)?a.fn.apply(this,arguments):void 0}),a.del=u;var c=u||i;a.proxy=function(e){if(e=T(e),!e.isImmediatePropagationStopped()){e.data=o;var n=c.apply(t,e._args==r?[e]:[e].concat(e._args));return n===!1&&(e.preventDefault(),e.stopPropagation()),n}},a.i=p.length,p.push(a),"addEventListener"in t&&t.addEventListener(v(a.e),a.proxy,g(a,f))})}function x(t,e,n,r,i){var o=h(t);(e||"").split(/\s/).forEach(function(e){p(t,e,n,r).forEach(function(e){delete a[o][e.i],"removeEventListener"in t&&t.removeEventListener(v(e.e),e.proxy,g(e,i))})})}function T(t,n){return(n||!t.isDefaultPrevented)&&(n||(n=t),e.each(w,function(e,r){var i=n[e];t[e]=function(){return this[r]=b,i&&i.apply(n,arguments)},t[r]=E}),t.timeStamp||(t.timeStamp=Date.now()),(n.defaultPrevented!==r?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(t.isDefaultPrevented=b)),t}function S(t){var e,n={originalEvent:t};for(e in t)j.test(e)||t[e]===r||(n[e]=t[e]);return T(n,t)}var r,n=1,i=Array.prototype.slice,o=e.isFunction,s=function(t){return"string"==typeof t},a={},u={},f="onfocusin"in t,c={focus:"focusin",blur:"focusout"},l={mouseenter:"mouseover",mouseleave:"mouseout"};u.click=u.mousedown=u.mouseup=u.mousemove="MouseEvents",e.event={add:y,remove:x},e.proxy=function(t,n){var r=2 in arguments&&i.call(arguments,2);if(o(t)){var a=function(){return t.apply(n,r?r.concat(i.call(arguments)):arguments)};return a._zid=h(t),a}if(s(n))return r?(r.unshift(t[n],t),e.proxy.apply(null,r)):e.proxy(t[n],t);throw new TypeError("expected function")},e.fn.bind=function(t,e,n){return this.on(t,e,n)},e.fn.unbind=function(t,e){return this.off(t,e)},e.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var b=function(){return!0},E=function(){return!1},j=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,w={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,e,n){return this.on(e,t,n)},e.fn.undelegate=function(t,e,n){return this.off(e,t,n)},e.fn.live=function(t,n){return e(document.body).delegate(this.selector,t,n),this},e.fn.die=function(t,n){return e(document.body).undelegate(this.selector,t,n),this},e.fn.on=function(t,n,a,u,f){var c,l,h=this;return t&&!s(t)?(e.each(t,function(t,e){h.on(t,n,a,e,f)}),h):(s(n)||o(u)||u===!1||(u=a,a=n,n=r),(u===r||a===!1)&&(u=a,a=r),u===!1&&(u=E),h.each(function(r,o){f&&(c=function(t){return x(o,t.type,u),u.apply(this,arguments)}),n&&(l=function(t){var r,s=e(t.target).closest(n,o).get(0);return s&&s!==o?(r=e.extend(S(t),{currentTarget:s,liveFired:o}),(c||u).apply(s,[r].concat(i.call(arguments,1)))):void 0}),y(o,t,u,a,n,l||c)}))},e.fn.off=function(t,n,i){var a=this;return t&&!s(t)?(e.each(t,function(t,e){a.off(t,n,e)}),a):(s(n)||o(i)||i===!1||(i=n,n=r),i===!1&&(i=E),a.each(function(){x(this,t,i,n)}))},e.fn.trigger=function(t,n){return t=s(t)||e.isPlainObject(t)?e.Event(t):T(t),t._args=n,this.each(function(){t.type in c&&"function"==typeof this[t.type]?this[t.type]():"dispatchEvent"in this?this.dispatchEvent(t):e(this).triggerHandler(t,n)})},e.fn.triggerHandler=function(t,n){var r,i;return this.each(function(o,a){r=S(s(t)?e.Event(t):t),r._args=n,r.target=a,e.each(p(a,t.type||t),function(t,e){return i=e.proxy(r),r.isImmediatePropagationStopped()?!1:void 0})}),i},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t){e.fn[t]=function(e){return 0 in arguments?this.bind(t,e):this.trigger(t)}}),e.Event=function(t,e){s(t)||(e=t,t=e.type);var n=document.createEvent(u[t]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];return n.initEvent(t,r,!0),T(n)}}(e),function(e){function p(t,n,r){var i=e.Event(n);return e(t).trigger(i,r),!i.isDefaultPrevented()}function d(t,e,n,i){return t.global?p(e||r,n,i):void 0}function m(t){t.global&&0===e.active++&&d(t,null,"ajaxStart")}function g(t){t.global&&!--e.active&&d(t,null,"ajaxStop")}function v(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||d(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void d(e,n,"ajaxSend",[t,e])}function y(t,e,n,r){var i=n.context,o="success";n.success.call(i,t,o,e),r&&r.resolveWith(i,[t,o,e]),d(n,i,"ajaxSuccess",[e,n,t]),b(o,e,n)}function x(t,e,n,r,i){var o=r.context;r.error.call(o,n,e,t),i&&i.rejectWith(o,[n,e,t]),d(r,o,"ajaxError",[n,r,t||e]),b(e,n,r)}function b(t,e,n){var r=n.context;n.complete.call(r,e,t),d(n,r,"ajaxComplete",[e,n]),g(n)}function E(t,e,n){if(n.dataFilter==j)return t;var r=n.context;return n.dataFilter.call(r,t,e)}function j(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==c?"html":t==f?"json":a.test(t)?"script":u.test(t)&&"xml")||"text"}function T(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function S(t){t.processData&&t.data&&"string"!=e.type(t.data)&&(t.data=e.param(t.data,t.traditional)),!t.data||t.type&&"GET"!=t.type.toUpperCase()&&"jsonp"!=t.dataType||(t.url=T(t.url,t.data),t.data=void 0)}function C(t,n,r,i){return e.isFunction(n)&&(i=r,r=n,n=void 0),e.isFunction(r)||(i=r,r=void 0),{url:t,data:n,success:r,dataType:i}}function O(t,n,r,i){var o,s=e.isArray(n),a=e.isPlainObject(n);e.each(n,function(n,u){o=e.type(u),i&&(n=r?i:i+"["+(a||"object"==o||"array"==o?n:"")+"]"),!i&&s?t.add(u.name,u.value):"array"==o||!r&&"object"==o?O(t,u,r,n):t.add(n,u)})}var i,o,n=+new Date,r=t.document,s=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,a=/^(?:text|application)\/javascript/i,u=/^(?:text|application)\/xml/i,f="application/json",c="text/html",l=/^\s*$/,h=r.createElement("a");h.href=t.location.href,e.active=0,e.ajaxJSONP=function(i,o){if(!("type"in i))return e.ajax(i);var c,p,s=i.jsonpCallback,a=(e.isFunction(s)?s():s)||"Zepto"+n++,u=r.createElement("script"),f=t[a],l=function(t){e(u).triggerHandler("error",t||"abort")},h={abort:l};return o&&o.promise(h),e(u).on("load error",function(n,r){clearTimeout(p),e(u).off().remove(),"error"!=n.type&&c?y(c[0],h,i,o):x(null,r||"error",h,i,o),t[a]=f,c&&e.isFunction(f)&&f(c[0]),f=c=void 0}),v(h,i)===!1?(l("abort"),h):(t[a]=function(){c=arguments},u.src=i.url.replace(/\?(.+)=\?/,"?$1="+a),r.head.appendChild(u),i.timeout>0&&(p=setTimeout(function(){l("timeout")},i.timeout)),h)},e.ajaxSettings={type:"GET",beforeSend:j,success:j,error:j,complete:j,context:null,global:!0,xhr:function(){return new t.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:f,xml:"application/xml, text/xml",html:c,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:j},e.ajax=function(n){var u,f,s=e.extend({},n||{}),a=e.Deferred&&e.Deferred();for(i in e.ajaxSettings)void 0===s[i]&&(s[i]=e.ajaxSettings[i]);m(s),s.crossDomain||(u=r.createElement("a"),u.href=s.url,u.href=u.href,s.crossDomain=h.protocol+"//"+h.host!=u.protocol+"//"+u.host),s.url||(s.url=t.location.toString()),(f=s.url.indexOf("#"))>-1&&(s.url=s.url.slice(0,f)),S(s);var c=s.dataType,p=/\?.+=\?/.test(s.url);if(p&&(c="jsonp"),s.cache!==!1&&(n&&n.cache===!0||"script"!=c&&"jsonp"!=c)||(s.url=T(s.url,"_="+Date.now())),"jsonp"==c)return p||(s.url=T(s.url,s.jsonp?s.jsonp+"=?":s.jsonp===!1?"":"callback=?")),e.ajaxJSONP(s,a);var P,d=s.accepts[c],g={},b=function(t,e){g[t.toLowerCase()]=[t,e]},C=/^([\w-]+:)\/\//.test(s.url)?RegExp.$1:t.location.protocol,N=s.xhr(),O=N.setRequestHeader;if(a&&a.promise(N),s.crossDomain||b("X-Requested-With","XMLHttpRequest"),b("Accept",d||"*/*"),(d=s.mimeType||d)&&(d.indexOf(",")>-1&&(d=d.split(",",2)[0]),N.overrideMimeType&&N.overrideMimeType(d)),(s.contentType||s.contentType!==!1&&s.data&&"GET"!=s.type.toUpperCase())&&b("Content-Type",s.contentType||"application/x-www-form-urlencoded"),s.headers)for(o in s.headers)b(o,s.headers[o]);if(N.setRequestHeader=b,N.onreadystatechange=function(){if(4==N.readyState){N.onreadystatechange=j,clearTimeout(P);var t,n=!1;if(N.status>=200&&N.status<300||304==N.status||0==N.status&&"file:"==C){if(c=c||w(s.mimeType||N.getResponseHeader("content-type")),"arraybuffer"==N.responseType||"blob"==N.responseType)t=N.response;else{t=N.responseText;try{t=E(t,c,s),"script"==c?(1,eval)(t):"xml"==c?t=N.responseXML:"json"==c&&(t=l.test(t)?null:e.parseJSON(t))}catch(r){n=r}if(n)return x(n,"parsererror",N,s,a)}y(t,N,s,a)}else x(N.statusText||null,N.status?"error":"abort",N,s,a)}},v(N,s)===!1)return N.abort(),x(null,"abort",N,s,a),N;var A="async"in s?s.async:!0;if(N.open(s.type,s.url,A,s.username,s.password),s.xhrFields)for(o in s.xhrFields)N[o]=s.xhrFields[o];for(o in g)O.apply(N,g[o]);return s.timeout>0&&(P=setTimeout(function(){N.onreadystatechange=j,N.abort(),x(null,"timeout",N,s,a)},s.timeout)),N.send(s.data?s.data:null),N},e.get=function(){return e.ajax(C.apply(null,arguments))},e.post=function(){var t=C.apply(null,arguments);return t.type="POST",e.ajax(t)},e.getJSON=function(){var t=C.apply(null,arguments);return t.dataType="json",e.ajax(t)},e.fn.load=function(t,n,r){if(!this.length)return this;var a,i=this,o=t.split(/\s/),u=C(t,n,r),f=u.success;return o.length>1&&(u.url=o[0],a=o[1]),u.success=function(t){i.html(a?e("<div>").html(t.replace(s,"")).find(a):t),f&&f.apply(i,arguments)},e.ajax(u),this};var N=encodeURIComponent;e.param=function(t,n){var r=[];return r.add=function(t,n){e.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(N(t)+"="+N(n))},O(r,t,n),r.join("&").replace(/%20/g,"+")}}(e),function(t){t.fn.serializeArray=function(){var e,n,r=[],i=function(t){return t.forEach?t.forEach(i):void r.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(r,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&i(t(o).val())}),r},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(e),function(){try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;t.getComputedStyle=function(t,e){try{return n(t,e)}catch(r){return null}}}}(),e});
window.$ = undefined;
}

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
    var sniff = function(selector, fn, once, $el) {
      once = once || false;
      $el = $el || $document;
      var running = false;
      var stop = false;
      var sniff_timeout;

      var fn_wrap = function(e) {
        if ( running || stop ) {
          return;
        }

        running = true;
        var self = this;
        var args = arguments;

        clearTimeout(sniff_timeout);

        sniff_timeout = setTimeout(function() {
          var ret = fn.apply(self, args);

          if ( ret && once ) {
            $el.off('DOMNodeInserted DOMNodeRemoved', selector, fn_wrap);
            stop = true;
          }

          running = false;
        }, 0);

        // return ret;
      };

      $el.on('DOMNodeInserted DOMNodeRemoved', selector, fn_wrap);
    };

    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

      //////////////////////
     // "Forward" styling rule from one selector to another
    //////////////////////

    var my_ss;
    var forward_style_rule = function(from, to, prepend) {
      prepend = prepend || '';
      var sto;

      if ( !my_ss ) {
        for ( var i=0, l=document.styleSheets.length, s; i < l; i++ ) {
          s = document.styleSheets[i];
          if ( !s.href && s.rules[0] && s.rules[0].selectorText === '#jira-helper-loaded' ) {
            my_ss = s;
          }
        }
      }

      if ( typeof to !== 'string' ) {
        // Assuming a jQuery object
        sto = ( to[0].className ) ? '.' + to[0].className.split(' ').join('.') : to[0].tagName;
        sto += ':nth-child(' + (to.index() + 1) + ')';
      } else {
        sto = to;
      }

      for ( var si=0, sl=my_ss.rules.length, sr; si < sl; si++ ) {
        sr = my_ss.rules[si];

        if ( sr.selectorText && sr.selectorText.indexOf(from) !== -1 && sr.selectorText.indexOf(sto) === -1 ) {
          sr.selectorText += ', ' + prepend + sto;
          console.log(sr.selectorText)
        }
      }
    };

      //////////////////////
     // Get id of current ticket
    //////////////////////

    var get_jira_id = function() {
      var jira_id = $("meta[name='ajs-issue-key']").attr("content");
      if ( !jira_id ) {
        try {
          for(var i in window.SPA_STATE.ISSUE) {
            if (window.SPA_STATE.ISSUE.hasOwnProperty(i)) {
              return i;
            }
          }
        } catch (err) {}
      } else {
        return jira_id;
      }
    };

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
          .appendTo($('[data-placement="bottom-end"] > span > div > div > div'))
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
        .on('click', '[aria-label="Settings"]', function() {
          setTimeout(add_prefs, 10);
        })
        // Changing preferences via checkboxes
        .on('change', '#jira-helper-prefs-menu input', function() {
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
      link.id = 'jira-helper-css';
      document.head.appendChild(link);
      link.href = window.zrBookmarkletUrl + '/jira-helper.css?';
    };

    var use_style_tag = function() {
      var s = document.createElement('style');
      s.id = 'jira-helper-css';
      s.innerHTML = window.zrBookmarkletCSS;
      document.head.appendChild(s);
    }

    var onload_use_stylesheet = function() {
      $('#jira-helper-css').remove();
      use_stylesheet();
    };

    var onunload_use_stylesheet = function() {
      $('#jira-helper-css').remove();
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
      if ( (!window.jQuery && !window.cash && !window.Zepto) || !document.body ) {
        setTimeout(init, 10);
        return;
      }

      $ = window.jQuery || window.cash || window.Zepto;

      if ( pm.get('use_stylesheet') ) {
        // Make sure css is loaded before continuing
        var $jira_helper_css = $('#jira-helper-css');
        if ( !$jira_helper_css.length /* || ($jira_helper_css.css('content') != 'loaded' && $jira_helper_css.css('content') != '"loaded"' && $jira_helper_css.css('content') != "'loaded'")*/ ) {
          setTimeout(init, 10);
          return;
        }
      }

      // Run the main functionality
      main($);
    };

    var main = function($) {
      // Shared Stuff
      var $body = $('body');
      $document = $(document);
      $window = $(window);

        //////////////////////
       // History helpers
      //////////////////////

      // monkey patch some History events
      var pushState = history.pushState;
      var replaceState = history.replaceState;
      var history_settings = {}; // settings that preferences can turn on and off

      history.pushState = function(stateObj, title, url) {
        if ( history_settings.skipNextPush ) {
          history_settings.skipNextPush = false;
          return;
        }
        var ret = pushState.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        return ret;
      };

      history.replaceState = function(stateObj, title, url) {
        // opening a ticket on kanban view
        if ( history_settings.fixKanbanBackButton && window.location.href.match(/\/RapidBoard\.jspa/) && !window.location.href.match(/modal=detail/) && url.match(/&modal=detail&/) ) {
          history.pushState.apply(this, arguments);
        } else {
          var ret = replaceState.apply(this, arguments);
          window.dispatchEvent(new Event('replacestate'));
        }

        return ret;
      };

        ////////////////////////////
       // (Preference) Select All Status Button
      ////////////////////////////

      (function(pm) {
        // Keep track of this, because jira fires the click twice
        var sniffing = false;
        var listen_for_statuses = function(e) {
          if ( sniffing ) {
            return;
          }

          sniffing = true;
          sniff('#issue-filter', function() {
            var $inputs = $('#issue-filter input[type="checkbox"]');

            if ( $inputs.length ) {
              var all_checked = true;
              $inputs.each(function() {
                if ( !$(this).prop('checked') ) {
                  all_checked = false;
                  return false;
                }
              })

              var $select_all = $('<div class="check-list-item" id="select_all_statuses_wrapper" role="option">\
                  <label class="item-label" data-descriptor-title="Blocked" for="select_all_statuses">\
                    <input type="checkbox" tabindex="-1" id="select_all_statuses">\
                    <span class="jira-issue-status-lozenge-max-width-medium">\
                      -Select All Shown-\
                    </span>\
                  </label>\
                </div>');

              if ( all_checked ) {
                $select_all.find('input').prop('checked', true);
              }

              $select_all.insertBefore('#issue-filter');

              sniffing = false;
              return true;
            }
          }, true);
        };

        var onload = function() {
          $body
            // Clicking the status dropdown
            .on('click', '[data-id="status"]', listen_for_statuses)
            // clicking the select all button
            .on('change', '#select_all_statuses', function() {
              var $this = $(this);

              if ( $this.prop('checked') ) {
                $('#issue-filter input[type="checkbox"]').each(function() {
                  var $this = $(this);

                  if ( !$this.prop('checked') ) {
                    $this.prop('checked', true).trigger('change');
                  }
                });
              } else {
                $('#issue-filter input[type="checkbox"]').each(function() {
                  var $this = $(this);

                  if ( $this.prop('checked') ) {
                    $this.prop('checked', false).trigger('change');
                  }
                });
              }
            })
            // Update select all button based on other checkboxes
            .on('change', '#issue-filter input[type="checkbox"]', function() {
              var $inputs = $('#issue-filter input[type="checkbox"]');
              var all_checked = true;
              $inputs.each(function() {
                if ( !$(this).prop('checked') ) {
                  all_checked = false;
                  return false;
                }
              });

              $('#select_all_statuses').prop('checked', all_checked);
            });
        };

        var onunload = function() {
          $body.off('click', '[data-id="status"]', listen_for_statuses);
        };

        pm.add({
          id: 'select_all_status_button',
          text: '(Search Issues) Select All Status Button',
          title: 'When clicking the "Status" button on the Search Issues page, show a "Select All" button to check all the boxes at the top',
          screenshot: 'img/ft_select_all.png',
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) Fix Kanban Back Button
      ////////////////////////////

      (function(pm) {
        var check_close_modal = function() {
          if ( window.location.href.match(/\/RapidBoard\.jspa/) && !window.location.href.match(/modal=detail/) ) {
            // $('.atlaskit-portal [aria-hidden="false"] [data-focus-lock-disabled="false"] > div:first-of-type').click();
            history_settings.skipNextPush = true;
            $('#jira-issue-header [aria-label="Close"]').click();
            setTimeout(function() {
              history_settings.skipNextPush = false;
            }, 50);
          }
        };

        var onload = function() {
          history_settings.fixKanbanBackButton = true;
          window.addEventListener('popstate', check_close_modal);
        };

        var onunload = function() {
          history_settings.fixKanbanBackButton = false;
          window.removeEventListener('popstate', check_close_modal);
        };

        pm.add({
          id: 'fix_kanban_back_button',
          text: 'Fix Kanban Back Button',
          title: 'When opening tickets in kanban view they do not add a history state, but when you close them they do, but they do not actually close/chage the ticket modal when clicking the back button. This makes it act a little more like you\'d expect.',
          // screenshot: 'img/ft_remove_status_icons.png',
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) Ticket titles in URLs
      ////////////////////////////

      (function(pm) {
        var interval;
        var check = function() {
          var matches;

          if ( (matches = window.location.href.match(/\/browse\/([A-Z]+-[0-9]+)(\/[^?]*)?(\?.*)?$/)) && !window.location.search ) {
            var id = matches[1];
            var title_path = matches[2] || '';
            var query = matches[3] || '';

            // new jira issue view, old
            var title = $('[data-test-id="issue.views.issue-base.foundation.summary.heading"], #summary-val').text();
            // var title = $('[data-test-id="issue.views.issue-base.foundation.summary.heading"]').text();

            if ( !title ) {
              return;
            }

            title = title.replace(/[^a-zA-Z0-9\.]+/g, '-').replace(/^-+|-+$/g, '');
            if ( '/' + title === title_path ) return;

            history.replaceState({}, document.title, '/browse/' + id + '/' + title + query);
          }
        };

        var onload = function() {
          window.addEventListener('pushstate', check);
          window.addEventListener('replacestate', check);
          window.addEventListener('popstate', check);
          check();
          interval = setInterval(check, 400);
        };

        var onunload = function() {
          clearInterval(interval);
          window.removeEventListener('pushstate', check);
          window.removeEventListener('replacestate', check);
          window.removeEventListener('popstate', check);
        };

        /*pm.add({
          id: 'add_title_to_ticket_url',
          text: '(New JIRA Issue View) Add Title to Ticket URL',
          title: 'Adds a URLized title to the end of the current ticket URL',
          // screenshot: 'img/ft_remove_status_icons.png',
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });*/
      })(pm);

        ////////////////////////////
       // (Preference) Fix old ticket view removing id from url
      ////////////////////////////

      (function(pm) {
        var interval;
        var check = function() {
          if (!window.AJS) return;

          var id = window.AJS.$('meta[name="ajs-issue-key"]').attr('content');
          var matches;

          // Jira eats the id if anything comes after the id. Put the id back
          if ( id && window.location.href.indexOf('/browse/' + id) === -1 ) {
            history.replaceState({}, document.title, window.location.href.replace('/browse/', '/browse/' + id + '/'));
          } else if ( id && (matches = window.location.href.match(/\/browse\/([A-Z]+-[0-9]+)(\/[^?]*)?(\?.*)?$/)) && matches[2] ) {
            history.replaceState({}, document.title, window.location.href.replace(matches[2], ''));
          }
        };

        var onload = function() {
          window.addEventListener('pushstate', check);
          window.addEventListener('replacestate', check);
          window.addEventListener('popstate', check);
          check();
          interval = setInterval(check, 400);
        };

        var onunload = function() {
          clearInterval(interval);
          window.removeEventListener('pushstate', check);
          window.removeEventListener('replacestate', check);
          window.removeEventListener('popstate', check);
        };

        pm.add({
          id: 'fix_old_ticket_urls',
          text: '(Old Ticket View) Fix Ticket Title In URL',
          title: 'Fixes old ticket views choking on ticket urls',
          // screenshot: 'img/ft_remove_status_icons.png',
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) Tame ticket links
      ////////////////////////////

      (function(pm) {
        var body_class = 'jira-helper-tame-ticket-links';

        var onload = function() {
          $body.addClass(body_class);
        };

        var onunload = function() {
          $body.removeClass(body_class);
        };

        pm.add({
          id: 'tame_ticket_links',
          text: '(New JIRA Issue View) Tame Ticket Links (WIP)',
          title: 'Make ticket related links smaller (and remove web links)',
          // screenshot: 'img/ft_remove_status_icons.png',
          defaultOn: false,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) PONY MODE
      ////////////////////////////

      (function(pm) {
        var body_class = 'jira-helper-PONY-MODE';

        var onload = function() {
          $body.addClass(body_class);
        };

        var onunload = function() {
          $body.removeClass(body_class);
        };

        pm.add({
          id: 'PONY_MODE',
          text: 'PONY MODE',
          title: 'Made especially for Dez',
          // screenshot: 'img/ft_remove_status_icons.png',
          defaultOn: false,
          onload: onload,
          onunload: onunload
        });
      })(pm);

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
          title: 'Only show status text in list-y views (must enable "Show Priority Text")',
          screenshot: 'img/ft_remove_status_icons.png',
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
          text: 'Open Links In New Tabs Instead Of New Windows',
          title: 'Overrides some button clicks to not open in a new browser windows, rather open them in new tabs',
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
          text: '(New JIRA Issue View) Styling Tweaks',
          title: 'Makes the new JIRA issue view easier to read, etc.',
          screenshot: 'img/ft_new_styling_tweaks.png',
          defaultOn: true,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) New Ticket Styling Hooks
      ////////////////////////////

      (function(pm) {
        var class_prefix = 'jira-helper-hook-ticket-';
        var column_selector = '[data-test-id="issue.views.issue-details.issue-layout.left-most-column"]';
        var interval;

        var find_and_forward = function(sparent, sfind, sforward) {
          var $el = $(sfind);

          if ( !$el.length ) return;
          //if ( $el.data('__hooks_added') ) return true;

          var $el_wrapper = $el
            .closest(sparent + ' > *');

          var class_name = sforward.replace(/\./g, ' ');

          if ( !$el_wrapper.length ) return;
          if ( $el_wrapper[0].className && $el_wrapper[0].className.indexOf(class_name) !== -1 ) return true;

          //forward_style_rule(sforward, $el_wrapper, sparent + ' > ');
          $el_wrapper.addClass(class_name);

          return true;
        };

        var check = function() {
          var matches;

          var is_job_url = !!window.location.href.match(/\/browse\/([A-Z]+-[0-9]+)/);
          if ( /*window.AJS &&*/ is_job_url ) {
            var $left = $(column_selector);
            if ( !$left.length || $left.data('__hooks_added') ) return;

            var all_found = true;

            // Title
            if ( !find_and_forward(column_selector, '[data-test-id="issue.views.issue-base.foundation.summary.heading"]', '.jira-helper-hook-ticket-title-wrapper') ) {
              all_found = false;
            }

            // Tools
            if ( !find_and_forward(column_selector, '[data-test-id="issue.views.issue-base.foundation.quick-add.link-button.ui.link-dropdown-button"]', '.jira-helper-hook-ticket-actions-wrapper') )  {
              all_found = false;
            }

            // Info
            if ( !find_and_forward(column_selector, '[data-test-id="issue.views.field.rich-text.description"]', '.jira-helper-hook-ticket-info-wrapper') ) {
              all_found = false;
            }

            // Description
            var $description = $('[data-test-id="issue.views.field.rich-text.description"]');
            var $info_wrapper = $description.closest(column_selector + ' > *');
            var info_wrapper_class = '.' + $info_wrapper[0].className.split(/\s+/).join('.');

            if ( !find_and_forward(column_selector + ' > ' + info_wrapper_class, '[data-test-id="issue.views.field.rich-text.description"]', '.jira-helper-hook-ticket-description-wrapper') ) {
              all_found = false;
            }

            // Subtasks
            if ( !find_and_forward(column_selector + ' > ' + info_wrapper_class, '[aria-label="Issue actions"]', '.jira-helper-hook-ticket-subtasks-wrapper') ) {
              all_found = false;
            }

            // Linked Issues
            if ( !find_and_forward(column_selector + ' > ' + info_wrapper_class, '[aria-label="Link an issue"]', '.jira-helper-hook-ticket-linkedissues-wrapper') ) {
              all_found = false;
            }

            // Web Links
            if ( !find_and_forward(column_selector + ' > ' + info_wrapper_class, '[aria-label="Link to a web page"]', '.jira-helper-hook-ticket-weblinks-wrapper') ) {
              all_found = false;
            }

            // Activity Heading
            if ( !find_and_forward(column_selector, '[data-test-id="issue-activity-feed.heading"]', '.jira-helper-hook-ticket-activityheading-wrapper') ) {
              all_found = false;
            }

            // Activity Nav
            if ( !find_and_forward(column_selector, column_selector + ' > div:last-of-type', '.jira-helper-hook-ticket-activitynav-wrapper') ) {
              all_found = false;
            }

            // Comment Section
            if ( !find_and_forward(column_selector, '[data-test-id="issue.activity.comments-list"]', '.jira-helper-hook-ticket-commentsection-wrapper') ) {
              console.log('no comment section')
              all_found = false;
            }

            // Load Comments
            if ( !find_and_forward(column_selector + ' > span', column_selector + ' > span > div:not([data-test-id="issue.activity.comments-list"])', '.jira-helper-hook-ticket-loadcomments-wrapper') ) {
              all_found = false;
            }

            // Comment
            if ( !find_and_forward(column_selector + ' > span', column_selector + ' > span > span', '.jira-helper-hook-ticket-comment-wrapper') ) {
              all_found = false;
            }

            if ( all_found ) {
              $left.attr('data-__hooks_added', 1);
            }
          }
        };

        var onload = function() {
          check();
          interval = setInterval(check, 1000);
        };

        var onunload = function() {
          clearInterval(interval);
        };

        pm.add({
          id: 'new_ticket_hooks',
          text: '(New JIRA Issue View) Styling Hooks',
          title: 'Needed for styling tweaks',
          // screenshot: 'img/ft_new_styling_tweaks.png',
          defaultOn: false,
          onload: onload,
          onunload: onunload
        });
      })(pm);

        ////////////////////////////
       // (Preference) Auto load more comments
      ////////////////////////////
      (function(pm) {
        var scroll_area_selector = '[data-test-id="issue.views.issue-details.issue-layout.issue-layout"] > div:first-child > div:first-child > div:first-child';
        var backoff_timeout_time = 100;
        var timeout_time = 0;
        var check_timeout;
        var clear_backoff_timeout;
        var scroll_bottom_distance = 400;

        var clear_backoff = function() {
          timeout_time = 0;
        };

        var check_scroll = function(event) {
          // Back off if called too rapidly
          timeout_time = backoff_timeout_time;
          clearTimeout(clear_backoff_timeout);
          clear_backoff_timeout = setTimeout(clear_backoff, backoff_timeout_time);

          if ( !pm.get('reverse_comments') ) return;

          var el = event.target;
          var $this = $(el);

          if ( !$this.is(scroll_area_selector) ) return;

          if ( el.scrollHeight - el.scrollTop - $this.height() < scroll_bottom_distance ) {
            var $button = $('[data-test-id="issue.activity.comments-list"] ~ div button');
            $button.click();
          }
        };

        // Don't fire too many times
        var try_check_scroll = function(event) {
          clearTimeout(check_timeout);
          check_timeout = setTimeout(check_scroll.bind(this, event), timeout_time);
        };

        var onload = function() {
          document.addEventListener('scroll', try_check_scroll, true);
        };

        var onunload = function() {
          document.removeEventListener('scroll', try_check_scroll);
        };

        pm.add({
          id: 'auto_load_all_comments',
          text: '(New JIRA Issue View) Auto Load Comments',
          title: 'Clicks the show more comments button until all comments are loaded',
          defaultOn: false,
          onload: onload,
          onunload: onunload
        });
      })(pm);

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
          .on('focus mousedown', '.jira-helper-external-links a[href]:not([href^="https://ziprecruiter.atlassian.net/"]):not([href^="/"]):not([href^="#"])', function() {
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
          .on('mousedown', copy_text)
          .on('click', function(ev) {
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

          var $content_editable = $this.closest('[contenteditable="true"]');

          // Don't do this if they are editing/adding a comment, etc
          if ( $content_editable.length ) return;

          show_tooltip_to = setTimeout(function() {
            var text_match = el.href.match(/(\b[a-f0-9]{40})/);
            if ( !text_match ) return;
            var text = text_match[0];
            var jira_id = get_jira_id();

            if ( text && text.match(/(\b[a-f0-9]{40})/) ) {
              $tooltip.show();
              $tooltip_text.attr('title', 'Click to copy the hotfix command').html('tools/starterview_release/bin/sv-hotfix-stg --message="' + jira_id + ' fixes" --qa-facing ' + text + '');
              $tooltip.appendTo(el);
            }
          }, 100);
        };

        var hide_tooltip = function() {
          hide_tooltip_to = setTimeout(function() {
            $tooltip.detach();
          }, 500);
        };

        var commit_selector = 'a[href^="https://git.ziprecruiter.com/ZipRecruiter/ziprecruiter/-/commit/"], a[href^="https://git.ziprecruiter.com/ZipRecruiter/ziprecruiter/commit/"]';

        var onload_fn = function() {
          $document
            .on('mouseover focus', commit_selector, show_tooltip)
            .on('mouseout blur', commit_selector, hide_tooltip)
            ;
        };

        var onunload_fn = function() {
          $document
            .off('mouseover focus', commit_selector, show_tooltip)
            .off('mouseout blur', commit_selector, hide_tooltip)
            ;
        };

        /*pm.add({
          id: 'hotfix_shortcut',
          text: 'Show Hotfix Comand on Commit Links',
          title: 'Adds a copyable hotfix command in a tooltip on linked sha1\'s',
          defaultOn: true,
          screenshot: 'img/ft_hotfix.png',
          onload: onload_fn,
          onunload: onunload_fn
        });*/
      })(pm);

      // Set up all the preferences
      if ( !window.__jira_helper_do_not_init ) {
        pm.load();
      }
    };

    // Attempt to run the code
    if ( document.location.href ) { // I think this is trying to run in iframes
      init();
    }

  })();
})();