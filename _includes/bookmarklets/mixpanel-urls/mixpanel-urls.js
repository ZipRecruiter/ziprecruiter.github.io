var mp_reg = /\/\/mixpanel\.com/;
var mp = document.location.href;

if ( !mp.match(mp_reg) ) {
  console.log('Not a mixpanel.com url');
}

var mpp = mp.split('#');

if ( mpp.length != 2 ) {
  console.log('Unexpected url #');
}

var mps = mpp[1];

var mpss = [];
var buff = '';
var paren_depth = 0;
var quot_depth = 0;
var filter_reg = /^(ms_checked|ms_values):/;

for ( var i = 0, l = mps.length, mpl; i < l; i++ ) {
  mpl = mps[i];

  if ( mpl === ',' && paren_depth === 0 && quot_depth === 0 ) {
    if ( !buff.match(filter_reg) ) {
      mpss.push(buff);
    }

    buff = '';
  } else if ( mpl === '\'' && quot_depth === 0 ) {
    buff += mpl;
    quot_depth = 1;
  } else if ( mpl === '\'' && quot_depth === 1 ) {
    buff += mpl;
    quot_depth = 0;
  } else if ( mpl === '(' ) {
    buff += mpl;
    paren_depth++;
  } else if ( mpl === ')' ) {
    buff += mpl;
    paren_depth--;
  } else {
    buff += mpl;
  }
}

var mp_clean_url = mpp[0] + '#' + mpss.join(',');