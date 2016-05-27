/*!
 * Autolinker.js
 * 0.25.2
 *
 * Copyright(c) 2016 Gregory Jacobs <greg@greg-jacobs.com>
 * MIT License
 *
 * https://github.com/gregjacobs/Autolinker.js
 */
!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Autolinker=e()}(this,function(){var t=function(e){e=e||{},this.version=t.version,this.urls=this.normalizeUrlsCfg(e.urls),this.email="boolean"==typeof e.email?e.email:!0,this.twitter="boolean"==typeof e.twitter?e.twitter:!0,this.phone="boolean"==typeof e.phone?e.phone:!0,this.hashtag=e.hashtag||!1,this.newWindow="boolean"==typeof e.newWindow?e.newWindow:!0,this.stripPrefix="boolean"==typeof e.stripPrefix?e.stripPrefix:!0;var r=this.hashtag;if(r!==!1&&"twitter"!==r&&"facebook"!==r&&"instagram"!==r)throw new Error("invalid `hashtag` cfg - see docs");this.truncate=this.normalizeTruncateCfg(e.truncate),this.className=e.className||"",this.replaceFn=e.replaceFn||null,this.htmlParser=null,this.matchers=null,this.tagBuilder=null};return t.link=function(e,r){var n=new t(r);return n.link(e)},t.version="0.25.2",t.prototype={constructor:t,normalizeUrlsCfg:function(t){return null==t&&(t=!0),"boolean"==typeof t?{schemeMatches:t,wwwMatches:t,tldMatches:t}:{schemeMatches:"boolean"==typeof t.schemeMatches?t.schemeMatches:!0,wwwMatches:"boolean"==typeof t.wwwMatches?t.wwwMatches:!0,tldMatches:"boolean"==typeof t.tldMatches?t.tldMatches:!0}},normalizeTruncateCfg:function(e){return"number"==typeof e?{length:e,location:"end"}:t.Util.defaults(e||{},{length:Number.POSITIVE_INFINITY,location:"end"})},parse:function(t){for(var e=this.getHtmlParser(),r=e.parse(t),n=0,i=[],s=0,a=r.length;a>s;s++){var o=r[s],h=o.getType();if("element"===h&&"a"===o.getTagName())o.isClosing()?n=Math.max(n-1,0):n++;else if("text"===h&&0===n){var c=this.parseText(o.getText(),o.getOffset());i.push.apply(i,c)}}return i=this.compactMatches(i),i=this.removeUnwantedMatches(i)},compactMatches:function(t){t.sort(function(t,e){return t.getOffset()-e.getOffset()});for(var e=0;e<t.length-1;e++)for(var r=t[e],n=r.getOffset()+r.getMatchedText().length;e+1<t.length&&t[e+1].getOffset()<=n;)t.splice(e+1,1);return t},removeUnwantedMatches:function(e){var r=t.Util.remove;return this.hashtag||r(e,function(t){return"hashtag"===t.getType()}),this.email||r(e,function(t){return"email"===t.getType()}),this.phone||r(e,function(t){return"phone"===t.getType()}),this.twitter||r(e,function(t){return"twitter"===t.getType()}),this.urls.schemeMatches||r(e,function(t){return"url"===t.getType()&&"scheme"===t.getUrlMatchType()}),this.urls.wwwMatches||r(e,function(t){return"url"===t.getType()&&"www"===t.getUrlMatchType()}),this.urls.tldMatches||r(e,function(t){return"url"===t.getType()&&"tld"===t.getUrlMatchType()}),e},parseText:function(t,e){e=e||0;for(var r=this.getMatchers(),n=[],i=0,s=r.length;s>i;i++){for(var a=r[i].parseMatches(t),o=0,h=a.length;h>o;o++)a[o].setOffset(e+a[o].getOffset());n.push.apply(n,a)}return n},link:function(t){if(!t)return"";for(var e=this.parse(t),r=[],n=0,i=0,s=e.length;s>i;i++){var a=e[i];r.push(t.substring(n,a.getOffset())),r.push(this.createMatchReturnVal(a)),n=a.getOffset()+a.getMatchedText().length}return r.push(t.substring(n)),r.join("")},createMatchReturnVal:function(e){var r;if(this.replaceFn&&(r=this.replaceFn.call(this,this,e)),"string"==typeof r)return r;if(r===!1)return e.getMatchedText();if(r instanceof t.HtmlTag)return r.toAnchorString();var n=e.buildTag();return n.toAnchorString()},getHtmlParser:function(){var e=this.htmlParser;return e||(e=this.htmlParser=new t.htmlParser.HtmlParser),e},getMatchers:function(){if(this.matchers)return this.matchers;var e=t.matcher,r=this.getTagBuilder(),n=[new e.Hashtag({tagBuilder:r,serviceName:this.hashtag}),new e.Email({tagBuilder:r}),new e.Phone({tagBuilder:r}),new e.Twitter({tagBuilder:r}),new e.Url({tagBuilder:r,stripPrefix:this.stripPrefix})];return this.matchers=n},getTagBuilder:function(){var e=this.tagBuilder;return e||(e=this.tagBuilder=new t.AnchorTagBuilder({newWindow:this.newWindow,truncate:this.truncate,className:this.className})),e}},t.match={},t.matcher={},t.htmlParser={},t.truncate={},t.Util={abstractMethod:function(){throw"abstract"},trimRegex:/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,assign:function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t},defaults:function(t,e){for(var r in e)e.hasOwnProperty(r)&&void 0===t[r]&&(t[r]=e[r]);return t},extend:function(e,r){var n=e.prototype,i=function(){};i.prototype=n;var s;s=r.hasOwnProperty("constructor")?r.constructor:function(){n.constructor.apply(this,arguments)};var a=s.prototype=new i;return a.constructor=s,a.superclass=n,delete r.constructor,t.Util.assign(a,r),s},ellipsis:function(t,e,r){return t.length>e&&(r=null==r?"..":r,t=t.substring(0,e-r.length)+r),t},indexOf:function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var r=0,n=t.length;n>r;r++)if(t[r]===e)return r;return-1},remove:function(t,e){for(var r=t.length-1;r>=0;r--)e(t[r])===!0&&t.splice(r,1)},splitAndCapture:function(t,e){for(var r,n=[],i=0;r=e.exec(t);)n.push(t.substring(i,r.index)),n.push(r[0]),i=r.index+r[0].length;return n.push(t.substring(i)),n},trim:function(t){return t.replace(this.trimRegex,"")}},t.HtmlTag=t.Util.extend(Object,{whitespaceRegex:/\s+/,constructor:function(e){t.Util.assign(this,e),this.innerHtml=this.innerHtml||this.innerHTML},setTagName:function(t){return this.tagName=t,this},getTagName:function(){return this.tagName||""},setAttr:function(t,e){var r=this.getAttrs();return r[t]=e,this},getAttr:function(t){return this.getAttrs()[t]},setAttrs:function(e){var r=this.getAttrs();return t.Util.assign(r,e),this},getAttrs:function(){return this.attrs||(this.attrs={})},setClass:function(t){return this.setAttr("class",t)},addClass:function(e){for(var r,n=this.getClass(),i=this.whitespaceRegex,s=t.Util.indexOf,a=n?n.split(i):[],o=e.split(i);r=o.shift();)-1===s(a,r)&&a.push(r);return this.getAttrs()["class"]=a.join(" "),this},removeClass:function(e){for(var r,n=this.getClass(),i=this.whitespaceRegex,s=t.Util.indexOf,a=n?n.split(i):[],o=e.split(i);a.length&&(r=o.shift());){var h=s(a,r);-1!==h&&a.splice(h,1)}return this.getAttrs()["class"]=a.join(" "),this},getClass:function(){return this.getAttrs()["class"]||""},hasClass:function(t){return-1!==(" "+this.getClass()+" ").indexOf(" "+t+" ")},setInnerHtml:function(t){return this.innerHtml=t,this},getInnerHtml:function(){return this.innerHtml||""},toAnchorString:function(){var t=this.getTagName(),e=this.buildAttrsStr();return e=e?" "+e:"",["<",t,e,">",this.getInnerHtml(),"</",t,">"].join("")},buildAttrsStr:function(){if(!this.attrs)return"";var t=this.getAttrs(),e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r+'="'+t[r]+'"');return e.join(" ")}}),t.RegexLib=function(){var t="A-Za-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞭꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",e="0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯෦-෯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９",r=t+e,n=new RegExp("["+r+".\\-]*["+r+"\\-]"),i=/(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|press|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/;return{alphaNumericCharsStr:r,domainNameRegex:n,tldRegex:i}}(),t.AnchorTagBuilder=t.Util.extend(Object,{constructor:function(e){t.Util.assign(this,e)},build:function(e){return new t.HtmlTag({tagName:"a",attrs:this.createAttrs(e.getType(),e.getAnchorHref()),innerHtml:this.processAnchorText(e.getAnchorText())})},createAttrs:function(t,e){var r={href:e},n=this.createCssClass(t);return n&&(r["class"]=n),this.newWindow&&(r.target="_blank",r.rel="noopener noreferrer"),r},createCssClass:function(t){var e=this.className;return e?e+" "+e+"-"+t:""},processAnchorText:function(t){return t=this.doTruncate(t)},doTruncate:function(e){var r=this.truncate;if(!r||!r.length)return e;var n=r.length,i=r.location;return"smart"===i?t.truncate.TruncateSmart(e,n,".."):"middle"===i?t.truncate.TruncateMiddle(e,n,".."):t.truncate.TruncateEnd(e,n,"..")}}),t.htmlParser.HtmlParser=t.Util.extend(Object,{htmlRegex:function(){var t=/!--([\s\S]+?)--/,e=/[0-9a-zA-Z][0-9a-zA-Z:]*/,r=/[^\s\0"'>\/=\x01-\x1F\x7F]+/,n=/(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/,i=r.source+"(?:\\s*=\\s*"+n.source+")?";return new RegExp(["(?:","<(!DOCTYPE)","(?:","\\s+","(?:",i,"|",n.source+")",")*",">",")","|","(?:","<(/)?","(?:",t.source,"|","(?:","("+e.source+")","(?:","\\s*",i,")*","\\s*/?",")",")",">",")"].join(""),"gi")}(),htmlCharacterEntitiesRegex:/(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,parse:function(t){for(var e,r,n=this.htmlRegex,i=0,s=[];null!==(e=n.exec(t));){var a=e[0],o=e[3],h=e[1]||e[4],c=!!e[2],u=e.index,l=t.substring(i,u);l&&(r=this.parseTextAndEntityNodes(i,l),s.push.apply(s,r)),o?s.push(this.createCommentNode(u,a,o)):s.push(this.createElementNode(u,a,h,c)),i=u+a.length}if(i<t.length){var g=t.substring(i);g&&(r=this.parseTextAndEntityNodes(i,g),s.push.apply(s,r))}return s},parseTextAndEntityNodes:function(e,r){for(var n=[],i=t.Util.splitAndCapture(r,this.htmlCharacterEntitiesRegex),s=0,a=i.length;a>s;s+=2){var o=i[s],h=i[s+1];o&&(n.push(this.createTextNode(e,o)),e+=o.length),h&&(n.push(this.createEntityNode(e,h)),e+=h.length)}return n},createCommentNode:function(e,r,n){return new t.htmlParser.CommentNode({offset:e,text:r,comment:t.Util.trim(n)})},createElementNode:function(e,r,n,i){return new t.htmlParser.ElementNode({offset:e,text:r,tagName:n.toLowerCase(),closing:i})},createEntityNode:function(e,r){return new t.htmlParser.EntityNode({offset:e,text:r})},createTextNode:function(e,r){return new t.htmlParser.TextNode({offset:e,text:r})}}),t.htmlParser.HtmlNode=t.Util.extend(Object,{offset:void 0,text:void 0,constructor:function(e){t.Util.assign(this,e)},getType:t.Util.abstractMethod,getOffset:function(){return this.offset},getText:function(){return this.text}}),t.htmlParser.CommentNode=t.Util.extend(t.htmlParser.HtmlNode,{comment:"",getType:function(){return"comment"},getComment:function(){return this.comment}}),t.htmlParser.ElementNode=t.Util.extend(t.htmlParser.HtmlNode,{tagName:"",closing:!1,getType:function(){return"element"},getTagName:function(){return this.tagName},isClosing:function(){return this.closing}}),t.htmlParser.EntityNode=t.Util.extend(t.htmlParser.HtmlNode,{getType:function(){return"entity"}}),t.htmlParser.TextNode=t.Util.extend(t.htmlParser.HtmlNode,{getType:function(){return"text"}}),t.match.Match=t.Util.extend(Object,{constructor:function(t){this.tagBuilder=t.tagBuilder,this.matchedText=t.matchedText,this.offset=t.offset},getType:t.Util.abstractMethod,getMatchedText:function(){return this.matchedText},setOffset:function(t){this.offset=t},getOffset:function(){return this.offset},getAnchorHref:t.Util.abstractMethod,getAnchorText:t.Util.abstractMethod,buildTag:function(){return this.tagBuilder.build(this)}}),t.match.Email=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.email=e.email},getType:function(){return"email"},getEmail:function(){return this.email},getAnchorHref:function(){return"mailto:"+this.email},getAnchorText:function(){return this.email}}),t.match.Hashtag=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.serviceName=e.serviceName,this.hashtag=e.hashtag},getType:function(){return"hashtag"},getServiceName:function(){return this.serviceName},getHashtag:function(){return this.hashtag},getAnchorHref:function(){var t=this.serviceName,e=this.hashtag;switch(t){case"twitter":return"https://twitter.com/hashtag/"+e;case"facebook":return"https://www.facebook.com/hashtag/"+e;case"instagram":return"https://instagram.com/explore/tags/"+e;default:throw new Error("Unknown service name to point hashtag to: ",t)}},getAnchorText:function(){return"#"+this.hashtag}}),t.match.Phone=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.number=e.number,this.plusSign=e.plusSign},getType:function(){return"phone"},getNumber:function(){return this.number},getAnchorHref:function(){return"tel:"+(this.plusSign?"+":"")+this.number},getAnchorText:function(){return this.matchedText}}),t.match.Twitter=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.twitterHandle=e.twitterHandle},getType:function(){return"twitter"},getTwitterHandle:function(){return this.twitterHandle},getAnchorHref:function(){return"https://twitter.com/"+this.twitterHandle},getAnchorText:function(){return"@"+this.twitterHandle}}),t.match.Url=t.Util.extend(t.match.Match,{constructor:function(e){t.match.Match.prototype.constructor.call(this,e),this.urlMatchType=e.urlMatchType,this.url=e.url,this.protocolUrlMatch=e.protocolUrlMatch,this.protocolRelativeMatch=e.protocolRelativeMatch,this.stripPrefix=e.stripPrefix},urlPrefixRegex:/^(https?:\/\/)?(www\.)?/i,protocolRelativeRegex:/^\/\//,protocolPrepended:!1,getType:function(){return"url"},getUrlMatchType:function(){return this.urlMatchType},getUrl:function(){var t=this.url;return this.protocolRelativeMatch||this.protocolUrlMatch||this.protocolPrepended||(t=this.url="http://"+t,this.protocolPrepended=!0),t},getAnchorHref:function(){var t=this.getUrl();return t.replace(/&amp;/g,"&")},getAnchorText:function(){var t=this.getMatchedText();return this.protocolRelativeMatch&&(t=this.stripProtocolRelativePrefix(t)),this.stripPrefix&&(t=this.stripUrlPrefix(t)),t=this.removeTrailingSlash(t)},stripUrlPrefix:function(t){return t.replace(this.urlPrefixRegex,"")},stripProtocolRelativePrefix:function(t){return t.replace(this.protocolRelativeRegex,"")},removeTrailingSlash:function(t){return"/"===t.charAt(t.length-1)&&(t=t.slice(0,-1)),t}}),t.matcher.Matcher=t.Util.extend(Object,{constructor:function(t){this.tagBuilder=t.tagBuilder},parseMatches:t.Util.abstractMethod}),t.matcher.Email=t.Util.extend(t.matcher.Matcher,{matcherRegex:function(){var e=t.RegexLib.alphaNumericCharsStr,r=new RegExp("["+e+"\\-;:&=+$.,]+@"),n=t.RegexLib.domainNameRegex,i=t.RegexLib.tldRegex;return new RegExp([r.source,n.source,"\\.",i.source].join(""),"gi")}(),parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.tagBuilder,s=[];null!==(r=n.exec(e));){var a=r[0];s.push(new t.match.Email({tagBuilder:i,matchedText:a,offset:r.index,email:a}))}return s}}),t.matcher.Hashtag=t.Util.extend(t.matcher.Matcher,{matcherRegex:new RegExp("#[_"+t.RegexLib.alphaNumericCharsStr+"]{1,139}","g"),nonWordCharRegex:new RegExp("[^"+t.RegexLib.alphaNumericCharsStr+"]"),constructor:function(e){t.matcher.Matcher.prototype.constructor.call(this,e),this.serviceName=e.serviceName},parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.nonWordCharRegex,s=this.serviceName,a=this.tagBuilder,o=[];null!==(r=n.exec(e));){var h=r.index,c=e.charAt(h-1);if(0===h||i.test(c)){var u=r[0],l=r[0].slice(1);o.push(new t.match.Hashtag({tagBuilder:a,matchedText:u,offset:h,serviceName:s,hashtag:l}))}}return o}}),t.matcher.Phone=t.Util.extend(t.matcher.Matcher,{matcherRegex:/(?:(\+)?\d{1,3}[-\040.])?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]\d{4}/g,parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.tagBuilder,s=[];null!==(r=n.exec(e));){var a=r[0],o=a.replace(/\D/g,""),h=!!r[1];s.push(new t.match.Phone({tagBuilder:i,matchedText:a,offset:r.index,number:o,plusSign:h}))}return s}}),t.matcher.Twitter=t.Util.extend(t.matcher.Matcher,{matcherRegex:new RegExp("@[_"+t.RegexLib.alphaNumericCharsStr+"]{1,20}","g"),nonWordCharRegex:new RegExp("[^"+t.RegexLib.alphaNumericCharsStr+"]"),parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.nonWordCharRegex,s=this.tagBuilder,a=[];null!==(r=n.exec(e));){var o=r.index,h=e.charAt(o-1);if(0===o||i.test(h)){var c=r[0],u=r[0].slice(1);a.push(new t.match.Twitter({tagBuilder:s,matchedText:c,offset:o,twitterHandle:u}))}}return a}}),t.matcher.Url=t.Util.extend(t.matcher.Matcher,{matcherRegex:function(){var e=/(?:[A-Za-z][-.+A-Za-z0-9]*:(?![A-Za-z][-.+A-Za-z0-9]*:\/\/)(?!\d+\/?)(?:\/\/)?)/,r=/(?:www\.)/,n=t.RegexLib.domainNameRegex,i=t.RegexLib.tldRegex,s=t.RegexLib.alphaNumericCharsStr,a=new RegExp("["+s+"\\-+&@#/%=~_()|'$*\\[\\]?!:,.;]*["+s+"\\-+&@#/%=~_()|'$*\\[\\]]");return new RegExp(["(?:","(",e.source,n.source,")","|","(","(//)?",r.source,n.source,")","|","(","(//)?",n.source+"\\.",i.source,")",")","(?:"+a.source+")?"].join(""),"gi")}(),wordCharRegExp:/\w/,openParensRe:/\(/g,closeParensRe:/\)/g,constructor:function(e){t.matcher.Matcher.prototype.constructor.call(this,e),this.stripPrefix=e.stripPrefix},parseMatches:function(e){for(var r,n=this.matcherRegex,i=this.stripPrefix,s=this.tagBuilder,a=[];null!==(r=n.exec(e));){var o=r[0],h=r[1],c=r[2],u=r[3],l=r[5],g=r.index,f=u||l,m=e.charAt(g-1);if(t.matcher.UrlMatchValidator.isValid(o,h)&&!(g>0&&"@"===m||g>0&&f&&this.wordCharRegExp.test(m))){if(this.matchHasUnbalancedClosingParen(o))o=o.substr(0,o.length-1);else{var p=this.matchHasInvalidCharAfterTld(o,h);p>-1&&(o=o.substr(0,p))}var d=h?"scheme":c?"www":"tld",x=!!h;a.push(new t.match.Url({tagBuilder:s,matchedText:o,offset:g,urlMatchType:d,url:o,protocolUrlMatch:x,protocolRelativeMatch:!!f,stripPrefix:i}))}}return a},matchHasUnbalancedClosingParen:function(t){var e=t.charAt(t.length-1);if(")"===e){var r=t.match(this.openParensRe),n=t.match(this.closeParensRe),i=r&&r.length||0,s=n&&n.length||0;if(s>i)return!0}return!1},matchHasInvalidCharAfterTld:function(t,e){if(!t)return-1;var r=0;e&&(r=t.indexOf(":"),t=t.slice(r));var n=/^((.?\/\/)?[A-Za-z0-9\u00C0-\u017F\.\-]*[A-Za-z0-9\u00C0-\u017F\-]\.[A-Za-z]+)/,i=n.exec(t);return null===i?-1:(r+=i[1].length,t=t.slice(i[1].length),/^[^.A-Za-z:\/?#]/.test(t)?r:-1)}}),t.matcher.UrlMatchValidator={hasFullProtocolRegex:/^[A-Za-z][-.+A-Za-z0-9]*:\/\//,uriSchemeRegex:/^[A-Za-z][-.+A-Za-z0-9]*:/,hasWordCharAfterProtocolRegex:/:[^\s]*?[A-Za-z\u00C0-\u017F]/,isValid:function(t,e){return!(e&&!this.isValidUriScheme(e)||this.urlMatchDoesNotHaveProtocolOrDot(t,e)||this.urlMatchDoesNotHaveAtLeastOneWordChar(t,e))},isValidUriScheme:function(t){var e=t.match(this.uriSchemeRegex)[0].toLowerCase();return"javascript:"!==e&&"vbscript:"!==e},urlMatchDoesNotHaveProtocolOrDot:function(t,e){return!(!t||e&&this.hasFullProtocolRegex.test(e)||-1!==t.indexOf("."))},urlMatchDoesNotHaveAtLeastOneWordChar:function(t,e){return t&&e?!this.hasWordCharAfterProtocolRegex.test(t):!1}},t.truncate.TruncateEnd=function(e,r,n){return t.Util.ellipsis(e,r,n)},t.truncate.TruncateMiddle=function(t,e,r){if(t.length<=e)return t;var n=e-r.length,i="";return n>0&&(i=t.substr(-1*Math.floor(n/2))),(t.substr(0,Math.ceil(n/2))+r+i).substr(0,e)},t.truncate.TruncateSmart=function(t,e,r){var n=function(t){var e={},r=t,n=r.match(/^([a-z]+):\/\//i);return n&&(e.scheme=n[1],r=r.substr(n[0].length)),n=r.match(/^(.*?)(?=(\?|#|\/|$))/i),n&&(e.host=n[1],r=r.substr(n[0].length)),n=r.match(/^\/(.*?)(?=(\?|#|$))/i),n&&(e.path=n[1],r=r.substr(n[0].length)),n=r.match(/^\?(.*?)(?=(#|$))/i),n&&(e.query=n[1],r=r.substr(n[0].length)),n=r.match(/^#(.*?)$/i),n&&(e.fragment=n[1]),e},i=function(t){var e="";return t.scheme&&t.host&&(e+=t.scheme+"://"),t.host&&(e+=t.host),t.path&&(e+="/"+t.path),t.query&&(e+="?"+t.query),t.fragment&&(e+="#"+t.fragment),e},s=function(t,e){var n=e/2,i=Math.ceil(n),s=-1*Math.floor(n),a="";return 0>s&&(a=t.substr(s)),t.substr(0,i)+r+a};if(t.length<=e)return t;var a=e-r.length,o=n(t);if(o.query){var h=o.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);h&&(o.query=o.query.substr(0,h[1].length),t=i(o))}if(t.length<=e)return t;if(o.host&&(o.host=o.host.replace(/^www\./,""),t=i(o)),t.length<=e)return t;var c="";if(o.host&&(c+=o.host),c.length>=a)return o.host.length==e?(o.host.substr(0,e-r.length)+r).substr(0,e):s(c,a).substr(0,e);var u="";if(o.path&&(u+="/"+o.path),o.query&&(u+="?"+o.query),u){if((c+u).length>=a){if((c+u).length==e)return(c+u).substr(0,e);var l=a-c.length;return(c+s(u,l)).substr(0,e)}c+=u}if(o.fragment){var g="#"+o.fragment;if((c+g).length>=a){if((c+g).length==e)return(c+g).substr(0,e);var f=a-c.length;return(c+s(g,f)).substr(0,e)}c+=g}if(o.scheme&&o.host){var m=o.scheme+"://";if((c+m).length<a)return(m+c).substr(0,e)}if(c.length<=e)return c;var p="";return a>0&&(p=c.substr(-1*Math.floor(a/2))),(c.substr(0,Math.ceil(a/2))+r+p).substr(0,e)},t});

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

var marked_options = {
  gfm: true,
  breaks: true
};

/*
 * to-markdown - an HTML to Markdown converter
 *
 * Copyright 2011+, Dom Christie
 * Licenced under the MIT licence
 *
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.toMarkdown=e()}}(function(){return function e(n,t,r){function o(a,c){if(!t[a]){if(!n[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var f=t[a]={exports:{}};n[a][0].call(f.exports,function(e){var t=n[a][1][e];return o(t?t:e)},f,f.exports,e,n,t,r)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,n,t){"use strict";function r(e){return-1!==b.indexOf(e.nodeName.toLowerCase())}function o(e){return-1!==y.indexOf(e.nodeName.toLowerCase())}function i(e){var n=(new v).parseFromString(e,"text/html");return N(n.documentElement,r),n}function a(e){for(var n,t,r,o=[e],i=[];o.length>0;)for(n=o.shift(),i.push(n),t=n.childNodes,r=0;r<t.length;r++)1===t[r].nodeType&&o.push(t[r]);return i.shift(),i}function c(e){for(var n="",t=0;t<e.childNodes.length;t++)if(1===e.childNodes[t].nodeType)n+=e.childNodes[t]._replacement;else{if(3!==e.childNodes[t].nodeType)continue;n+=e.childNodes[t].data}return n}function l(e,n){return e.cloneNode(!1).outerHTML.replace("><",">"+n+"<")}function u(e,n){if("string"==typeof n)return n===e.nodeName.toLowerCase();if(Array.isArray(n))return-1!==n.indexOf(e.nodeName.toLowerCase());if("function"==typeof n)return n.call(p,e);throw new TypeError("`filter` needs to be a string, array, or function")}function f(e,n){var t,o,i;return"left"===e?(t=n.previousSibling,o=/ $/):(t=n.nextSibling,o=/^ /),t&&(3===t.nodeType?i=o.test(t.nodeValue):1!==t.nodeType||r(t)||(i=o.test(t.textContent))),i}function d(e){var n="",t="";if(!r(e)){var o=/^[ \r\n\t]/.test(e.innerHTML),i=/[ \r\n\t]$/.test(e.innerHTML);o&&!f("left",e)&&(n=" "),i&&!f("right",e)&&(t=" ")}return{leading:n,trailing:t}}function s(e){var n,t=c(e);if(!o(e)&&!/A|TH|TD/.test(e.nodeName)&&/^\s*$/i.test(t))return void(e._replacement="");for(var r=0;r<m.length;r++){var i=m[r];if(u(e,i.filter)){if("function"!=typeof i.replacement)throw new TypeError("`replacement` needs to be a function that returns a string");var a=d(e);(a.leading||a.trailing)&&(t=t.trim()),n=a.leading+i.replacement.call(p,t,e)+a.trailing;break}}e._replacement=n}var p,m,h=e("./lib/md-converters"),g=e("./lib/gfm-converters"),v=e("./lib/html-parser"),N=e("collapse-whitespace"),b=["address","article","aside","audio","blockquote","body","canvas","center","dd","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frameset","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","isindex","li","main","menu","nav","noframes","noscript","ol","output","p","pre","section","table","tbody","td","tfoot","th","thead","tr","ul"],y=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];p=function(e,n){if(n=n||{},"string"!=typeof e)throw new TypeError(e+" is not a string");e=e.replace(/(\d+)\. /g,"$1\\. ");var t,r=i(e).body,o=a(r);m=h.slice(0),n.gfm&&(m=g.concat(m)),n.converters&&(m=n.converters.concat(m));for(var l=o.length-1;l>=0;l--)s(o[l]);return t=c(r),t.replace(/^[\t\r\n]+|[\t\r\n\s]+$/g,"").replace(/\n\s+\n/g,"\n\n").replace(/\n{3,}/g,"\n\n")},p.isBlock=r,p.isVoid=o,p.outer=l,n.exports=p},{"./lib/gfm-converters":2,"./lib/html-parser":3,"./lib/md-converters":4,"collapse-whitespace":7}],2:[function(e,n,t){"use strict";function r(e,n){var t=Array.prototype.indexOf.call(n.parentNode.childNodes,n),r=" ";return 0===t&&(r="| "),r+e+" |"}var o=/highlight highlight-(\S+)/;n.exports=[{filter:"br",replacement:function(){return"\n"}},{filter:["del","s","strike"],replacement:function(e){return"~~"+e+"~~"}},{filter:function(e){return"checkbox"===e.type&&"LI"===e.parentNode.nodeName},replacement:function(e,n){return(n.checked?"[x]":"[ ]")+" "}},{filter:["th","td"],replacement:function(e,n){return r(e,n)}},{filter:"tr",replacement:function(e,n){var t="",o={left:":--",right:"--:",center:":-:"};if("THEAD"===n.parentNode.nodeName)for(var i=0;i<n.childNodes.length;i++){var a=n.childNodes[i].attributes.align,c="---";a&&(c=o[a.value]||c),t+=r(c,n.childNodes[i])}return"\n"+e+(t?"\n"+t:"")}},{filter:"table",replacement:function(e){return"\n\n"+e+"\n\n"}},{filter:["thead","tbody","tfoot"],replacement:function(e){return e}},{filter:function(e){return"PRE"===e.nodeName&&e.firstChild&&"CODE"===e.firstChild.nodeName},replacement:function(e,n){return"\n\n```\n"+n.firstChild.textContent+"\n```\n\n"}},{filter:function(e){return"PRE"===e.nodeName&&"DIV"===e.parentNode.nodeName&&o.test(e.parentNode.className)},replacement:function(e,n){var t=n.parentNode.className.match(o)[1];return"\n\n```"+t+"\n"+n.textContent+"\n```\n\n"}},{filter:function(e){return"DIV"===e.nodeName&&o.test(e.className)},replacement:function(e){return"\n\n"+e+"\n\n"}}]},{}],3:[function(e,n,t){function r(){var e=a.DOMParser,n=!1;try{(new e).parseFromString("","text/html")&&(n=!0)}catch(t){}return n}function o(){var n=function(){};if("undefined"==typeof document){var t=e("jsdom");n.prototype.parseFromString=function(e){return t.jsdom(e,{features:{FetchExternalResources:[],ProcessExternalResources:!1}})}}else i()?n.prototype.parseFromString=function(e){var n=new window.ActiveXObject("htmlfile");return n.designMode="on",n.open(),n.write(e),n.close(),n}:n.prototype.parseFromString=function(e){var n=document.implementation.createHTMLDocument("");return n.open(),n.write(e),n.close(),n};return n}function i(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch(n){window.ActiveXObject&&(e=!0)}return e}var a="undefined"!=typeof window?window:this;n.exports=r()?a.DOMParser:o()},{jsdom:6}],4:[function(e,n,t){"use strict";n.exports=[{filter:"p",replacement:function(e){return"\n\n"+e+"\n\n"}},{filter:"br",replacement:function(){return"  \n"}},{filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,n){for(var t=n.nodeName.charAt(1),r="",o=0;t>o;o++)r+="#";return"\n\n"+r+" "+e+"\n\n"}},{filter:"hr",replacement:function(){return"\n\n* * *\n\n"}},{filter:["em","i"],replacement:function(e){return"_"+e+"_"}},{filter:["strong","b"],replacement:function(e){return"**"+e+"**"}},{filter:function(e){var n=e.previousSibling||e.nextSibling,t="PRE"===e.parentNode.nodeName&&!n;return"CODE"===e.nodeName&&!t},replacement:function(e){return"`"+e+"`"}},{filter:function(e){return"A"===e.nodeName&&e.getAttribute("href")},replacement:function(e,n){var t=n.title?' "'+n.title+'"':"";return"["+e+"]("+n.getAttribute("href")+t+")"}},{filter:"img",replacement:function(e,n){var t=n.alt||"",r=n.getAttribute("src")||"",o=n.title||"",i=o?' "'+o+'"':"";return r?"!["+t+"]("+r+i+")":""}},{filter:function(e){return"PRE"===e.nodeName&&"CODE"===e.firstChild.nodeName},replacement:function(e,n){return"\n\n    "+n.firstChild.textContent.replace(/\n/g,"\n    ")+"\n\n"}},{filter:"blockquote",replacement:function(e){return e=e.trim(),e=e.replace(/\n{3,}/g,"\n\n"),e=e.replace(/^/gm,"> "),"\n\n"+e+"\n\n"}},{filter:"li",replacement:function(e,n){e=e.replace(/^\s+/,"").replace(/\n/gm,"\n    ");var t="*   ",r=n.parentNode,o=Array.prototype.indexOf.call(r.children,n)+1;return t=/ol/i.test(r.nodeName)?o+".  ":"*   ",t+e}},{filter:["ul","ol"],replacement:function(e,n){for(var t=[],r=0;r<n.childNodes.length;r++)t.push(n.childNodes[r]._replacement);return/li/i.test(n.parentNode.nodeName)?"\n"+t.join("\n"):"\n\n"+t.join("\n")+"\n\n"}},{filter:function(e){return this.isBlock(e)},replacement:function(e,n){return"\n\n"+this.outer(n,e)+"\n\n"}},{filter:function(){return!0},replacement:function(e,n){return this.outer(n,e)}}]},{}],5:[function(e,n,t){n.exports=["address","article","aside","audio","blockquote","canvas","dd","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","main","nav","noscript","ol","output","p","pre","section","table","tfoot","ul","video"]},{}],6:[function(e,n,t){},{}],7:[function(e,n,t){"use strict";function r(e){return!(!e||!u[e.nodeName])}function o(e){return!(!e||!l[e.nodeName])}function i(e,n){if(e.firstChild&&"PRE"!==e.nodeName){"function"!=typeof n&&(n=r);for(var t=null,i=!1,l=null,u=c(l,e);u!==e;){if(3===u.nodeType){var f=u.data.replace(/[ \r\n\t]+/g," ");if(t&&!/ $/.test(t.data)||i||" "!==f[0]||(f=f.substr(1)),!f){u=a(u);continue}u.data=f,t=u}else{if(1!==u.nodeType){u=a(u);continue}n(u)||"BR"===u.nodeName?(t&&(t.data=t.data.replace(/ $/,"")),t=null,i=!1):o(u)&&(t=null,i=!0)}var d=c(l,u);l=u,u=d}t&&(t.data=t.data.replace(/ $/,""),t.data||a(t))}}function a(e){var n=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),n}function c(e,n){return e&&e.parentNode===n||"PRE"===n.nodeName?n.nextSibling||n.parentNode:n.firstChild||n.nextSibling||n.parentNode}var l=e("void-elements");Object.keys(l).forEach(function(e){l[e.toUpperCase()]=1});var u={};e("block-elements").forEach(function(e){u[e.toUpperCase()]=1}),n.exports=i},{"block-elements":5,"void-elements":8}],8:[function(e,n,t){n.exports={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}},{}]},{},[1])(1)});

(function($) {
'use strict';

// http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
function convertHtmlToText(inputText) {
  var returnText = "" + inputText;

  //-- remove BR tags and replace them with line break
  returnText=returnText.replace(/<br>/gi, "\n");
  returnText=returnText.replace(/<br\s\/>/gi, "\n");
  returnText=returnText.replace(/<br\/>/gi, "\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText=returnText.replace(/<p.*>/gi, "\n");
  returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText=returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g,'');

  //-- get rid of html-encoded characters:
  returnText=returnText.replace(/&nbsp;/gi," ");
  returnText=returnText.replace(/&amp;/gi,"&");
  returnText=returnText.replace(/&quot;/gi,'"');
  returnText=returnText.replace(/&lt;/gi,'<');
  returnText=returnText.replace(/&gt;/gi,'>');

  //-- return
  return returnText;
}

// Safely auto link stuff
var auto_link_html_div = document.createElement('div');
var auto_link_html = function(node, exp, rep) {
  // http://stackoverflow.com/questions/11863847/regex-to-match-urls-but-not-urls-in-hyperlinks
  //var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
  var nodes = node.childNodes;

  for ( var i = 0, m = nodes.length; i < m; i++){
    var n = nodes[i];

    if ( n.nodeType == n.TEXT_NODE ) {
      var g = n.textContent.match(exp);

      while( g ) {
        var idx = n.textContent.indexOf(g[0]);
        var pre = n.textContent.substring(0, idx);
        var t = document.createTextNode(pre);
        var a = document.createElement('a');
        a.href = rep.replace(/\$1/, g[0]);
        a.innerText = g[0];
        n.textContent = n.textContent.substring(idx + g[0].length);
        n.parentElement.insertBefore(t, n);
        n.parentElement.insertBefore(a, n);
        g = n.textContent.match(exp);
      }
    } else if ( n.tagName !== 'A' && n.tagName !== 'CODE' ) {
      auto_link_html(n, exp, rep);
    }
  }
};

// link special texts
var auto_links = function(text) {
  auto_link_html_div.innerHTML = text;

  // Sha1's to ZR gitlabs
  auto_link_html(auto_link_html_div, /(\b[a-f0-9]{40})/, 'https://git.ziprecruiter.com/ZipRecruiter/ziprecruiter/commit/$1');

  // Perl nerd stuff
  // ZR specific
  auto_link_html(auto_link_html_div, /\b(ZR::|StarterView::|PartnerAlerts::|Test::ZR::|Test::StarterView::|Test::PartnerAlerts::)(([a-zA-Z0-9]+::)*[a-zA-Z0-9]+)/, 'https://pod.ziprecruiter.com/?$1');

  auto_link_html(auto_link_html_div, /\b([a-zA-Z0-9]+::)+[a-zA-Z0-9]+/, 'https://metacpan.org/pod/$1');

  return auto_link_html_div.innerHTML;
};

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

  var _autosize_textareas = function() {
    var $textareas = $('textarea:not(.autosize-autosized)');

    if ( $textareas.length ) {
      $textareas.autosize();
    }
  };

  var autosize_textareas_timeout;
  var autosize_textareas = function() {
    clearTimeout(autosize_textareas_timeout);
    autosize_textareas_timeout = setTimeout(_autosize_textareas, 10);
  };

  var onload_autosize_textareas = function() {
    autosize_textareas();
    $document.delegate('body', 'DOMNodeInserted DOMNodeRemoved', autosize_textareas);
  };

  var onunload_autosize_textareas = function() {
    $document.undelegate('body', 'DOMNodeInserted DOMNodeRemoved', autosize_textareas);
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
  var _fake_kanban_double_sorted_class = 'fogbugz-helper-fake-kanban-double-sorted';

  var _fake_kanban_template_inserted = function(r, data) {
    if ( $('.list-group-header').children().length > 2 ) {
      if ( !r.element.filter('#filter-bar-title').length ) {
        return;
      }

      // This is where we do things when the tickets are all loaded

      // Sorts
      var $sorts = $('#filter-description-sort [data-s-name]');
      var sorts = [];
      $sorts.each(function() {
        sorts.push($(this).data('s-name'));
      });

      // Columns
      var $columns = $('.grid-column-contents');
      var columns_o = {};
      var columns = [];
      $columns.each(function() {
        var match = this.className.match(/ grid\-column\-([a-zA-Z]+)/);
        if ( match && columns_o[match[1]] !== true ) {
          columns_o[match[1]] = true;
          columns.push(match[1]);
        }
      });

      // Double sort
      if ( sorts.length > 1 && columns_o[sorts[1]] === true ) {
        $body.removeClass(_fake_kanban_sorted_class);
        $body.addClass(_fake_kanban_double_sorted_class);

        var types_o = {};
        var types_a = [];
        $('.list-group-body').each(function() {
          $(this).find('.bug-grid-row').each(function() {
            var $column = $(this).find('.grid-column-' + sorts[1]);
            var id = $.trim($column.text());

            if ( !types_o[id] ) {
              types_o[id] = true;
              types_a.push(id);
            }
          });
        });

        types_a.sort();

        $('.list-group-body').each(function() {
          var list_group_body = this;
          var types = {};

          for ( var i = 0, l = types_a.length, t; i < l; i++ ) {
            t = types_a[i];
            var $table = $('<table/>');
            types[t] = $table;
            $table
              .appendTo(list_group_body)
              .attr('data-collapse-key', t)
              ;
          }

          $(this).find('.bug-grid-row').each(function() {
            var $column = $(this).find('.grid-column-' + sorts[1]);
            var id = $.trim($column.text());

            $column.closest('td').addClass(_fake_kanban_double_sorted_class + '-sort');
            types[id].append($column.closest('tr').detach());
          });
        });
      } else {
        // Single sort
        $body.removeClass(_fake_kanban_double_sorted_class);
        $body.addClass(_fake_kanban_sorted_class);
      }
    } else {
      $body.removeClass(_fake_kanban_double_sorted_class);
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

    ////////////////////////////
   // Hide Useless Stuff
  ////////////////////////////
  var onload_hide_stuff = function() {
    $body.addClass('fogbugz-helper-hide-stuff');
  };

  var onunload_reverse_comments = function() {
    $body.removeClass('fogbugz-helper-hide-stuff');
  };

  pm.add({
    id: 'hide_stuff',
    text: 'Hide Unused FogBugz Stuff',
    title: 'I don\'t use these anyway. Hollar if you like this but want something specific back.',
    defaultOn: false,
    onload: onload_hide_stuff,
    onunload: onunload_reverse_comments
  });

    ////////////////////////////
   // WYSIWYG for custom inputs
  ////////////////////////////
  var toMarkdown_options = { gfm: true };

  /*var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var $div = $('<div>');
    var txt = document.createElement('textarea');

    function decodeHTMLEntities (str) {
      txt.innerHTML = str;
      str = txt.value;
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      $div.html(str);

      var $imgs = $div.find('img');
      for ( var i = 0, l = $imgs.length; i < l; i++ ) {
        var $img = $imgs.eq(i);
        var src = $img.attr('src');
        $img.wrap('<a href="' + src + '" target="_blank"></a>');
      }

      str = $div.html();

      return str;
    }

    return decodeHTMLEntities;
  })();*/

  /*var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities (str) {
      if(str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }

      return str;
    }

    return decodeHTMLEntities;
  })();*/

  // http://stackoverflow.com/questions/5796718/html-entity-decode
  var decodeEntities = (function() {
      // this prevents any overhead from creating the object each time
      var element = document.createElement('div');

      // regular expression matching HTML entities
      var entity = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/ig;

      return function decodeHTMLEntities(str) {
          // find and replace all the html entities
          str = str.replace(entity, function(m) {
              element.innerHTML = m;
              return element.textContent;
          });

          //str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          str = str.replace(/<script/gmi, '&lt;script');
          str = str.replace(/<\/script/gmi, '&lt;/script');

          // reset the value
          element.textContent = '';

          return str;
      }
  })();

  // Toggle
  var $wysiwyg_toggle;

  var wysiwyg_add = function() {
    var $customfield = $('.customfield-longtext');
    var $textarea = $customfield.find('textarea.wysiwygified');
    var code = '';

    // Edit
    if ( $textarea.length ) {
      // replace textarea with ckeditor
      code = $textarea.val();

      if ( code.charAt(0) != '<' || code.charAt(code.length - 1) != '>' ) {
        code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        code = marked(code, marked_options);
      } else {
        code = marked(toMarkdown(code, toMarkdown_options), marked_options);
      }

      code = decodeEntities(code);

      code = auto_links(code);

      $textarea.val(code);
      wysiwyg_textarea($textarea);
    }

    $wysiwyg_toggle.find('.wysiwyg_toggle_rich').addClass('wysiwyg_toggle_selected');
  };

  var wysiwyg_remove = function(markdown) {
    markdown = markdown || false;

    var $textarea = $('textarea.wysiwygified');
    var val;

    if ( markdown ) {
      val = wysiwygify_editor.getData();
      val = toMarkdown(val, toMarkdown_options);
      val = _wysiwyg_fix_links(val);
    } else {
      val = $textarea.val();
      val = decodeEntities(convertHtmlToText(val));
    }

    wysiwygify_editor.destroy(true);
    wysiwygify_editor = null;

    $textarea.val(val);
  };

  var wysiwyg_toggle_off = function() {
    $wysiwyg_toggle.find('label').removeClass('wysiwyg_toggle_selected');
  };

  $body
    /*.delegate('.wysiwyg_toggle .wysiwyg_toggle_plain:not(.wysiwyg_toggle_selected)', 'click', function(ev) {
      ev.preventDefault();
      if ( !confirm('Lose formatting and switch to plain-text mode?') ) {
        return;
      }

      var $this = $(this);
      wysiwyg_toggle_off();
      wysiwyg_remove();
      $this.addClass('wysiwyg_toggle_selected');
    })*/
    .delegate('.wysiwyg_toggle .wysiwyg_toggle_rich:not(.wysiwyg_toggle_selected)', 'click', function(ev) {
      ev.preventDefault();
      var $this = $(this);
      wysiwyg_toggle_off();
      wysiwyg_add(true);
      $this.addClass('wysiwyg_toggle_selected');
    })
    .delegate('.wysiwyg_toggle .wysiwyg_toggle_markdown:not(.wysiwyg_toggle_selected)', 'click', function(ev) {
      ev.preventDefault();

      var $this = $(this);
      wysiwyg_toggle_off();

      wysiwyg_remove(true);

      $this.addClass('wysiwyg_toggle_selected');
    })
    ;

  // Make wysiwyg editor
  var wysiwygify_editor;
  var wysiwygify_config = {
    customConfig: "{0}config_MVC.js".format(window.CKEDITOR_BASEPATH),
    toolbar_RichTextArea: [
        ['Undo', 'Redo'],
        ['Format'],
        ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat'],
        ['NumberedList', 'BulletedList', 'Blockquote'] //, 'Outdent', 'Indent'],
        // ['Source']
    ],
    format_tags: 'h1;h2;h3;h4;h5;h6;p;pre',
    contentsCss: [
      '{0}contents.css'.format(window.CKEDITOR_BASEPATH),
      '{0}contents.bugRichEdit.css'.format(window.CKEDITOR_BASEPATH),
      'data:text/css;base64,' + btoa('\
        body {\
          line-height: 1.4;\
          font-size: 13px;\
        }\
        pre {\
          background: #eee;\
          border-radius: 3px;\
          padding: 10px;\
          display: table;\
          font-family: monospace;\
        }\
        \
        code {\
          background-color: #f7f7f9;\
          border: 1px solid #e1e1e8;\
          white-space: normal;\
          color: #c25;\
          padding: 1px 3px;\
          border-radius: 3px;\
          font-size: 12px;\
        }\
        \
        pre code {\
          background-color: transparent;\
          border: none;\
          white-space: inherit;\
          color: inherit;\
          padding: 0;\
        }\
        table {\
          margin: .5em 0;\
          border-collapse: collapse;\
          border-spacing: 0;\
          empty-cells: show;\
          border: 1px solid #cbcbcb;\
        }\
        \
        thead {\
          background-color: #e0e0e0;\
          color: #000;\
          text-align: left;\
          vertical-align: bottom;\
        }\
        \
        td,\
        th {\
          border-left: 1px solid #cbcbcb;\
          border-width: 0 0 0 1px;\
          font-size: inherit;\
          margin: 0;\
          overflow: visible;\
          padding: .5em 1em;\
        }\
        \
        th,\
        td {\
          padding: 0.5em 1em;\
        }\
        \
        td:first-child,\
        th:first-child {\
          border-left-width: 0;\
        }\
        \
        tr:nth-child(even) {\
          background: #f2f2f2;\
        }\
      ')
    ]
  };

  var _wysiwyg_fix_links = function(data) {
    // Fix MD links that FB will munge
    // find markdown links
    var ms = data.match(/\[([^\]]+)\]\(([^\)]+)\)/g);

    if ( ! ms ) {
      return data;
    }

    for ( var i = 0, l = ms.length, m, mms; i < l; i++ ) {
      m = ms[i];

      // if the first and last argument match, just put the url in
      mms = m.match(/\[([^\]]+)\]\(([^\)]+)\)/);

      if ( mms[1] == mms[2] || mms[1] + '/' == mms[2] || mms[1] == mms[2] + '/' ) {
        data = data.replace(mms[0], mms[1]);
      }
    }

    return data;
  };

  var wysiwyg_textarea = function($textarea) {
    wysiwygify_editor = CKEDITOR.replace($textarea.attr('id'), wysiwygify_config);

    // Replacing CKE's textarea updater so I can intercept the save command. Kinda scary.
    wysiwygify_editor.updateElement = function() {
      if ( !wysiwygify_editor.checkDirty() ) {
        return;
      }

      var element = this.element;

      if ( element && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ) {
        var data = this.getData();

        if ( this.config.htmlEncodeOutput ) {
          data = CKEDITOR.tools.htmlEncode( data );
        }

        if ( element.is( 'textarea' ) ) {
          // Strip tags
          data = data.replace(/<([\/]?)(div)([^>]*)>/g, '<$1p>');
          // My regex isn't good enough to combine these :(
          data = data.replace(/<([\/]?)(span)([^>]*)>/g, '');
          data = data.replace(/<(?!((?:\/\s*)?(?:table|thead|tr|th|tbody|td|del|strike|s|code|pre|a|blockquote|h1|h2|h3|h4|h5|h6|br|p|i|em|b|strong|[o|u]l|li)))([^>])+>/g, '');

          data = toMarkdown(data, toMarkdown_options);

          data = _wysiwyg_fix_links(data);

          element.setValue( data );
        } else {
          element.setHtml( data );
        }
      }
    }
  };

  var _wysiwygify = function() {
    var $customfield = $('.customfield-longtext');
    var $textarea = $customfield.find('textarea:not(.wysiwygified)').addClass('wysiwygified');

    // Edit
    if ( $textarea.length ) {
      $wysiwyg_toggle = $('<div class="wysiwyg_toggle">\
        <!-- label class="wysiwyg_toggle_plain">Plain text</label -->\
        <label class="wysiwyg_toggle_markdown">Markdown</label>\
        <label class="wysiwyg_toggle_rich">Rich text</label>\
      </div>')
      .insertBefore($textarea);

      wysiwyg_add();
    // Show
    }
  };

  // Don't call this function thousands of times
  var wysiwygify_timeout;
  var wysiwygify = function() {
    clearTimeout(wysiwygify_timeout);

    wysiwygify_timeout = setTimeout(_wysiwygify, 10);
  };

  var onload_wysiwygify = function() {
    wysiwygify();
    $document.delegate('body', 'DOMNodeInserted DOMNodeRemoved', wysiwygify);
  };

  var onunload_wysiwygify = function() {
    $document.undelegate('body', 'DOMNodeInserted DOMNodeRemoved', wysiwygify);

    // TODO: Unload CKEDITOR instances
    if ( wysiwygify_editor && wysiwygify_editor.name ) {
      wysiwyg_remove(true);

      var $textarea = $('textarea.wysiwygified');
      if ( $textarea.length ) {
        $textarea
          .removeClass('wysiwygified')
          ;
      }
    }
  };

  pm.add({
    id: 'wysiwygify',
    text: 'Rich Text on Case Summary',
    title: 'Makes the Case Summary textarea "rich text" formattable (saves as markdown)',
    defaultOn: false,
    onload: onload_wysiwygify,
    onunload: onunload_wysiwygify
  });

    ////////////////////////////
   // Markdown parser
  ////////////////////////////

  var _markdownify_fix_text = function(text, replace_br, skip_other) {
    if ( !skip_other ) {
      text = decodeEntities(text);
    }

    if ( replace_br ) {
      // Remove br tags that FB adds
      text = text.replace(/<br>/g, '').replace(/&nbsp;/g, ' ');
    }

    if ( !skip_other ) {
      // Remove links FB adds to markdown'd links
      text = text.replace(/(\[[^\]]+\]\()<a .*?href="([^"]+)".*?>[^<]+<\/a>\)/g, '$1$2)');

      // Fix other f'd up links like [http://google.com](http://google.com)
      // [<a href="http://google.com](http://google.com)" rel="nofollow" target="_blank">http://google.com](http://google.com)</a>
      text = text.replace(/\[<a .*?href="([^"\]\(]+)\]\(([^"\]\(]+)\)".*?>[^<\]\(]+\]\([^<\]\(]+\)<\/a>/g, '[$1]($2)');

      // Convert to markdown
      text = marked(text, marked_options);
    }

    text = auto_links(text);

    return text;
  };

  var $markdownify_converter = $('<textarea/>');
  var markdownify_timeout;
  var _markdownify = function() {
    var $customfield = $('.customfield-longtext .content > pre:not(.wysiwygified, .markdownified)').addClass('markdownified');

    if ( $customfield.length ) {
      $customfield.each(function() {
        var $this = $(this);
        var text = $this.html();

        //text = decodeEntities(text);
        $this.data('markdown-text', text);

        text = _markdownify_fix_text(text);

        $this.html(text);

        // fix links
        $this.find('code').each(function() {
          this.innerHTML = this.innerHTML
            .replace(/&lt;a ([^&]+)&gt;([^&]+)&lt;\/a&gt;/g, '<a $1>$2</a>')
            ;
        });
      });
    }

    // Plain text comments
    var $bodycontent = $('.events .event .bodycontent:not(.wysiwygified, .markdownified):not(:has(:not(a, br)))').addClass('markdownified');

    if ( $bodycontent.length ) {
      $bodycontent.each(function() {
        var $this = $(this);
        var text = $this.html();

        $this.data('markdown-text', text);

        text = _markdownify_fix_text(text, true);

        $this.html(text);

        // fix links
        $this.find('code').each(function() {
          this.innerHTML = this.innerHTML
            .replace(/&lt;a ([^&]+)&gt;([^&]+)&lt;\/a&gt;/g, '<a $1>$2</a>')
            ;
        });
      });
    }

    // WYSIWYG'd comments
    $bodycontent = $('.events .event .bodycontent:not(.wysiwygified, .markdownified)').addClass('markdownified');

    if ( $bodycontent.length ) {
      $bodycontent.each(function() {
        var $this = $(this);
        var text = $this.html();

        $this.data('markdown-text', text);

        text = _markdownify_fix_text(text, false, true);

        $this.html(text);

        // fix links
        $this.find('code').each(function() {
          this.innerHTML = this.innerHTML
            .replace(/&lt;a ([^&]+)&gt;([^&]+)&lt;\/a&gt;/g, '<a $1>$2</a>')
            ;
        });
      });
    }
  };

  // Don't call this function thousands of times
  var markdownify = function() {
    clearTimeout(markdownify_timeout);

    markdownify_timeout = setTimeout(_markdownify, 10);
  };

  var onload_markdown = function() {
    markdownify();
    $document.delegate('body', 'DOMNodeInserted DOMNodeRemoved', markdownify);
  };

  var onunload_markdown = function() {
    $document.undelegate('body', 'DOMNodeInserted DOMNodeRemoved', markdownify);

    $('.markdownified').each(function() {
      var $this = $(this);

      $this.removeClass('markdownified');
      $this.html($this.data('markdown-text'));
    });
  };

  pm.add({
    id: 'markdown',
    text: 'Markdown for Comments/Case Description',
    title: 'Automatically converts markdown in plain text comments and case description',
    defaultOn: true,
    onload: onload_markdown,
    onunload: onunload_markdown
  });

    ////////////////////////////
   // Add related tickets
  ////////////////////////////

  var add_related_ticket_buttons_timeout;
  var add_related_ticket_done_class = 'add_related_ticket_done';
  var add_related_ticket_button_class = 'add_related_ticket_button';
  //var add_related_ticket_link_class = 'add_related_ticket_link';
  var add_related_ticket_child_class = 'add_related_ticket_child';
  var add_related_ticket_copy_class = 'add_related_ticket_copy';
  //var add_related_ticket_parent_class = 'add_related_ticket_parent';

  var add_related_ticket_values = null;
  var add_related_ticket_array_regex = /^\[.*\]$/;

  var add_related_ticket_click = function(ev) {
    ev.preventDefault();

    var $this = $(this);
    var id = $('.case .top .left .case').text();

    var $add_button = $('#header .main-nav .add-case-button');
    var old_href = $add_button.attr('href');
    var href = old_href + '?';

    if ( $this.hasClass(add_related_ticket_child_class) ) {
      var duplicates = {
        props: [
          'ixProject',
          'ixArea',
          'ixCategory'
        ]
      };

      href += 'ixBugParent=' + id + '&';
    } else if ( $this.hasClass(add_related_ticket_copy_class) ) {
      // Values are hard coded, couldn't find anything in fb that would tell me what should be editable
      var duplicates = {
        props: [
          'sTitle',
          'ixProject',
          'ixArea',
          'ixFixFor',
          'ixCategory',
          'ixPersonAssignedTo',
          'ixStatus',
          'sCustomerEmail',
          'ixPriority',
          'ixBugParent',
          'dtDue',
          'hrsCurrEst',
          'hrsElapsedExtra',
          'dblStoryPts',
          'tags',
        ],
        customs: [],
        kanbans: [
          'ixKanbanColumn',
          'ixKanbanColor'
        ],
        cases: [
          'subcases',
          'casesDependedOn'
        ]
      };

      for ( var field in add_related_ticket_data.customFields ) {
        if ( !add_related_ticket_data.customFields.hasOwnProperty(field) ) continue;
        if ( /^[0-9]+_/.test(field) === false ) continue;
        duplicates.customs.push(field);
      }
    }

    for ( var key in duplicates ) {
      // skip loop if the property is from prototype
      if (!duplicates.hasOwnProperty(key)) continue;

      var dupes = duplicates[key];

      for ( var i = 0, l = dupes.length, value; i < l; i++ ) {
        if ( key === 'props' ) {
          value = add_related_ticket_data[dupes[i]];

          if ( dupes[i] === 'sTitle' ) {
            value = 'Copy of ' + value;
          }
        } else if ( key === 'customs' ) {
          value = add_related_ticket_data.customFields[dupes[i]];
        } else if ( key === 'kanbans' ) {
          value = add_related_ticket_data.kanbanInfo[dupes[i]];
        } else if ( key === 'cases' ) {
          value = [];
          var cases = add_related_ticket_data[dupes[i]];

          for ( var ci = 0, cl = cases.length, c; ci < cl; ci++ ) {
            c = cases[ci];
            value.push(c.ixBug + ': ' + c.sTitle);
          }
        }

        if ( value === null || typeof value === 'undefined' || value === 0 ) {
          continue;
        }

        href += encodeURIComponent(dupes[i]) + '=' + encodeURIComponent(value) + '&'
      }
    }

    $add_button
      .attr('href', href)
      .click()
      .attr('href', old_href)
      ;
  };

  // Add buttons and add id's if a button was previously clicked
  var _add_related_ticket_buttons = function() {
    var $left = $('.case .top .left:not(.' + add_related_ticket_done_class + ')').addClass(add_related_ticket_done_class);

    // Case has an ID
    if ( $('.case .top .left .case').length ) {
      var id = $('#formEditCase .top .left .case').text();

      var $child = $('<button>Sub Case</button>')
        .addClass(add_related_ticket_button_class)
        .addClass(add_related_ticket_child_class)
        .appendTo($left)
        ;

      var $copy = $('<button>Duplicate</button>')
        .addClass(add_related_ticket_button_class)
        .addClass(add_related_ticket_copy_class)
        .appendTo($left)
        ;

      /* var $parent = $('<button>+ Parent Case</button>')
        .addClass(add_related_ticket_button_class)
        .addClass(add_related_ticket_parent_class)
        .appendTo($left)
        ;*/
    }
  };

  // Don't call this function thousands of times
  var add_related_ticket_buttons = function() {
    clearTimeout(add_related_ticket_buttons_timeout);

    add_related_ticket_buttons_timeout = setTimeout(_add_related_ticket_buttons, 10);
  };

  var add_related_ticket_data;
  var add_related_ticket_check_api_response_regex = /^\/api\/0\/cases\/[0-9]+$/;
  var add_related_ticket_check_api_response = function(type, info) {
    if ( add_related_ticket_check_api_response_regex.test(type.route) ) {
      var id = document.location.href.match(/cases\/([a-z]+\/)?([0-9]+)\/?/);
      if ( id ) {
        var uid = type.route.match(/cases\/([0-9]+)/)[1];

        if ( id[2] === uid ) {
          add_related_ticket_data = info.data;
        }
      }
    }
  };

  var onload_add_related_ticket = function() {
    add_related_ticket_buttons();
    $document
      .delegate('body', 'DOMNodeInserted DOMNodeRemoved', add_related_ticket_buttons)
      .delegate('.' + add_related_ticket_button_class, 'click', add_related_ticket_click)
      ;

    fb.pubsub.subscribe('/api/success', add_related_ticket_check_api_response);
  };

  var onunload_add_related_ticket = function() {
    $document
      .undelegate('body', 'DOMNodeInserted DOMNodeRemoved', add_related_ticket_buttons)
      .undelegate('.' + add_related_ticket_button_class, 'click', add_related_ticket_click)
      ;

    $('.' + add_related_ticket_button_class).remove();
    //$('.' + add_related_ticket_link_class).remove();
    $('.' + add_related_ticket_done_class).removeClass(add_related_ticket_done_class);

    fb.pubsub.unsubscribe('/api/success', add_related_ticket_check_api_response);
  };

  pm.add({
    id: 'add_related_ticket',
    text: 'Add Related Ticket Buttons',
    title: 'Adds buttons to make it easy to add parent/child tickets',
    defaultOn: true,
    onload: onload_add_related_ticket,
    onunload: onunload_add_related_ticket
  });

    ////////////////////////////
   // Add resolve/reopen/close/reactivate button to edit ticket
  ////////////////////////////

  var add_resolve_button_timeout;
  var has_add_resolve_button_class = 'has_add_resolve_button';

  // Add resolve or reopen button to ticket
  var _add_resolve_button = function() {
    var $nav = $('.case > article > nav:not(.' + has_add_resolve_button_class + ')');

    if ( $nav.length && $('#sCommand').val() === 'edit' ) {
      $nav.addClass(has_add_resolve_button_class);

      // Case is open
      if ( add_resolve_fOpen ) {
        var resolve_url = document.location.href.replace(/\/edit\//, '/resolve/');
        var extra = '';

        // Case is resolved
        if ( add_resolve_personResolvedBy ) {
          var reactivate_url = document.location.href.replace(/\/edit\//, '/reactivate/');
          var close_url = document.location.href.replace(/\/edit\//, '/close/');

          extra = '\
            <a class="control" name="reactivate" href="' + reactivate_url + '" accesskey="t">\
              <span class="icon icon-case-reactivate"></span>Reactivate\
            </a>\
            <a class="control" name="close" href="' + close_url + '" accesskey="x">\
              <span class="icon icon-case-close"></span>Close Case\
            </a>\
          ';
        }

        $nav.append('\
          <span class="controls">\
            <a class="control" name="resolve" href="' + resolve_url + '" accesskey="r">\
              <span class="icon icon-case-resolve"></span>Resolve\
            </a>\
            ' + extra + '\
          </span>\
        ');
      } else {
        // Case is closed
        var reopen_url = document.location.href.replace(/\/edit\//, '/reopen/');

        $nav.append('\
          <span class="controls">\
            <a class="control" name="reopen" href="' + reopen_url + '" accesskey="u">\
              <span class="icon icon-case-reopen"></span>Reopen\
            </a>\
          </span>\
        ');
      }
    }
  };

  // Checking to see if the api call was a case, and if so save the fOpen state
  var add_resolve_fOpen;
  var add_resolve_personResolvedBy;
  var add_resolve_check_api_response_regex = /^\/api\/0\/cases\/[0-9]+$/;
  var add_resolve_check_api_response = function(type, info) {
    if ( add_resolve_check_api_response_regex.test(type.route) ) {
      add_resolve_fOpen = info.data.fOpen;
      add_resolve_personResolvedBy = info.data.personResolvedBy;
    }
  };

  // Don't call this function thousands of times
  var add_resolve_button = function() {
    clearTimeout(add_resolve_button_timeout);

    add_resolve_button_timeout = setTimeout(_add_resolve_button, 10);
  };

  var onload_add_resolve = function() {
    add_resolve_button();
    $document
      .delegate('body', 'DOMNodeInserted DOMNodeRemoved', add_resolve_button)
      ;

    fb.pubsub.subscribe('/api/success', add_resolve_check_api_response);
  };

  var onunload_add_related_ticket = function() {
    $document
      .undelegate('body', 'DOMNodeInserted DOMNodeRemoved', add_resolve_button)
      ;

    $('.' + has_add_resolve_button_class).removeClass().find('.controls').remove();
    fb.pubsub.unsubscribe('/api/success', add_resolve_check_api_response);
  };

  pm.add({
    id: 'add_resolve',
    text: 'Add Resolve/Reopen Buttons to Edit Ticket Header',
    title: 'Adds a "resolve," "reactivate," "close," and "reopen" buttons to the header area of tickets when editing',
    defaultOn: true,
    onload: onload_add_resolve,
    onunload: onunload_add_related_ticket
  });

  /* Not used, but this is how I figured out FB's event names*/

  /*var _sub = fb.pubsub.subscribe;

  fb.pubsub.subscribe = function(name, fun) {
    console.log('fb.pubsub.subscribe:', name);
    _sub(name, fun);
    _sub(name, function(m, d) {
      console.log('subscribed event:', name, m, d);
    });
  };*/

  /*var _pub = fb.pubsub.publish;

  fb.pubsub.publish = function(name) {
    console.log('fb.pubsub.publish:', arguments);
    _pub.apply(window, arguments);
    debugger;
  };*/

  // Set up all the preferences
  pm.load();
};

// Attempt to run the code
init();

})();
