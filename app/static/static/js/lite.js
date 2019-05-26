// https://github.com/Olical/EventEmitter
(function(){"use strict";function t(){}function i(t, n){for(var e=t.length; e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,r=this,s=r.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0; e<t.length; e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(r,e){var t,n=this.getListenersAsObject(r),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===i(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(r,s){var n,e,t=this.getListenersAsObject(r);for(e in t)t.hasOwnProperty(e)&&(n=i(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(r,o){var e,i,t,s,n=this.getListenersAsObject(r);for(t in n)if(n.hasOwnProperty(t))for(i=n[t].length;i--;)e=n[t][i],e.once===!0&&this.removeListener(r,e.listener),s=e.listener.apply(this,o||[]),s===this._getOnceReturnValue()&&this.removeListener(r,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return r.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:r.EventEmitter=t}).call(this);

window.__debugMode = true; // Don't turn it off

var parseJSON = (window.JSON && JSON.parse) ? function (obj) {
  try { return JSON.parse(obj); } catch (e) {
    topError('<b>parseJSON:</b> ' + e.message, {dt: -1, type: 5, answer: obj});
    return eval('('+obj+')');
  }
} : function(obj) {
  return eval('('+obj+')');
}

var cur = {destroy: [], nav: []}; // Current page variables and navigation map.
var _ua = navigator.userAgent.toLowerCase();
var browser = {
  version: (_ua.match( /.+(?:me|ox|on|rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
  opera: /opera/i.test(_ua),
  msie: (/msie/i.test(_ua) && !/opera/i.test(_ua)),
  msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
  msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
  msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
  msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
  mozilla: /firefox/i.test(_ua),
  chrome: /chrome/i.test(_ua),
  safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
  iphone: /iphone/i.test(_ua),
  ipod: /ipod/i.test(_ua),
  iphone4: /iphone.*OS 4/i.test(_ua),
  ipod4: /ipod.*OS 4/i.test(_ua),
  ipad: /ipad/i.test(_ua),
  safari_mobile: /iphone|ipod|ipad/i.test(_ua),
  android: /android/i.test(_ua),
  opera_mobile: /opera mini|opera mobi/i.test(_ua),
  mobile: /iphone|ipod|ipad|opera mini|opera mobi|mobile/i.test(_ua),
  mac: /mac/i.test(_ua),
  smart_tv: /smart-tv|smarttv/i.test(_ua)
};
var mobPlatforms = {1:1,2:1,3:1,4:1,5:1};

var browserFeatures = {
  // Detect wheel event
  wheelEvent: 'onwheel' in ce('div') ? 'wheel' : (document.onmousewheel !== void 0 ? 'mousewheel' : (browser.mozilla ? 'MozMousePixelScroll' : 'DOMMouseScroll')),
  hasBoundingClientRect: 'getBoundingClientRect' in ce('div'),
  cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && vk.cma
};

if (!window.vk) window.vk = {loginscheme: 'http', ip_h: ''};

function jsc(name) {
  return 'cmodules/' + name;
}

(function() {
  var flash = [0, 0, 0], axon = 'ShockwaveFlash.ShockwaveFlash';
  var wrapType = 'embed', wrapParam = 'type="application/x-shockwave-flash" ';
  var escapeAttr = function(v) {
    return v.toString().replace('&', '&amp;').replace('"', '&quot;');
  }
  if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
    var x = navigator.plugins['Shockwave Flash'];
    if (x && x.description) {
      var ver = x.description.replace(/([a-zA-Z]|\s)+/, '').replace(/(\s+r|\s+b[0-9]+)/, '.').split('.');
      for (var i = 0; i < 3; ++i) flash[i] = ver[i] || 0;
    }
  } else {
    if (_ua.indexOf('Windows CE') >= 0) {
      var axo = true, ver = 6;
      while (axo) {
        try {
          ++ver;
          axo = new ActiveXObject(axon + '.' + ver);
          flash[0] = ver;
        } catch(e) {}
      }
    } else {
      try {
        var axo = new ActiveXObject(axon + '.7');
        flash = axo.GetVariable('$version').split(' ')[1].split(',');
      } catch (e) {}
    }
    wrapType = 'object';
    wrapParam = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
  }
  browser.flashwrap = (wrapType == 'embed') ? function(opts, params) {
    params = extend({
      id: opts.id,
      name: opts.id,
      width: opts.width,
      height: opts.height,
      style: opts.style,
      preventhide: opts.preventhide
    }, params);
    if (browser.flash >= opts.version) {
      params.src = opts.url;
    } else {
      params.src = opts.express;
    }
    var paramsStr = [];
    for (var i in params) {
      var p = params[i];
      if (p !== undefined && p !== null) {
        paramsStr.push(i + '="' + escapeAttr(p) + '" ');
      }
    }
    return '<embed ' + wrapParam + paramsStr.join('') + '/>';
  } : function(opts, params) {
    if (browser.flash >= opts.version) {
      params.movie = opts.url;
    } else {
      params.movie = opts.express;
    }
    var attr = {
      id: opts.id,
      width: opts.width,
      height: opts.height,
      style: opts.style,
      preventhide: opts.preventhide
    }
    var attrStr = [];
    for (var i in attr) {
      var p = attr[i];
      if (p !== undefined && p !== null) {
        attrStr.push(i + '="' + escapeAttr(p) + '" ');
      }
    }
    var paramsStr = [];
    for (var i in params) {
      var p = params[i];
      if (p !== undefined && p !== null) {
        paramsStr.push('<param name="' + i + '" value="' + escapeAttr(p) + '" />');
      }
    }
    return '<object ' + wrapParam + attrStr.join('') +'>' + paramsStr.join('') + '</object>';
  }
  if (flash[0] < 7) flash = [0, 0, 0];
  browser.flash = intval(flash[0]);
  browser.flashfull = {
    major: browser.flash,
    minor: intval(flash[1]),
    rev: intval(flash[2])
  }
})();

for (var i in StaticFiles) {
  var f = StaticFiles[i];
  f.t = (i.indexOf('.css') != -1) ? 'css' : 'js';
  f.n = i.replace(/[\\/\\.]/g, '_');
  f.l = 0;
  f.c = 0;
}

window.locHost = location.host;
window.locProtocol = location.protocol;
window.__dev = /[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+\.[a-z0-9_\-]+/i.test(locHost);
if (!__dev) __debugMode = false;
window.locHash = location.hash.replace('#/', '').replace('#!', '');
window.locDomain = locHost.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0];
window.locBase = location.toString().replace(/#.+$/, '');
if (!vk.nodomain) {
  if (!browser.msie6 || document.domain != locDomain) {
    try {
      document.domain = locDomain;
    } catch (error) {
      debugLog(error);
    }
  }
}

window.__qlTimer = null;
window.__qlClear = function() { clearTimeout(__qlTimer); setTimeout(function() { clearTimeout(__qlTimer); }, 2000); }
window.onLoginDone = function () {
  __qlClear();
  nav.reload({force: true, from: 6});
}
window.onLogout = function() {
  __qlClear();
}

function onLoginFailed(code, opts) {
  __qlClear();
}
function onLoginCaptcha(sid, dif) {
  __qlClear();
}

/* Debug */

window._logTimer = (new Date()).getTime();
function debugLog(msg) {
  try {
    var t = '[' + (((new Date()).getTime() - _logTimer) / 1000) + '] ';
    if (ge('debuglog')) {
      if (msg === null) {
        msg = '[NULL]';
      } else if (msg === undefined) {
        msg = '[UNDEFINED]';
      }
      ge('debuglog').innerHTML += t + msg.toString().replace('<', '&lt;').replace('>', '&gt;')+'<br/>';
    }
    if (window.console && console.log) {
      Array.prototype.unshift.call(arguments, t);
      console.log.apply(console, arguments);
    }
  } catch (e) {
  }
}

/* Utils */

function isRetina() {
  return window.devicePixelRatio >= 2;
}

function onlinePlatformClass(platform) {
  var cls = '';
  if (platform) {
    cls += 'online ';
  }

  if (mobPlatforms[platform]) {
    cls += 'mobile';
  }

  return cls;
}

function toggleOnline(obj, platform) {
  removeClass(obj, 'online');
  removeClass(obj, 'mobile');
  addClass(obj, onlinePlatformClass(platform));
}

function updateOnlineText() {}
function updateAriaElements() {}
function updateAriaCheckboxes() {}

// Parse strings looking for color tuples [255,255,255]
function getRGB(color) {
  var result;
  if (color && isArray(color) && color.length == 3)
    return color;
  if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
    return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
  if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
    return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];
  if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
    return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
  if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
    return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];
}

function formatTime(t) {
  var res, sec, min, hour;

  t = Math.max(t, 0);
  sec = Math.round(t % 60);
  res = (sec < 10) ? '0'+sec : sec;
  t = Math.floor(t / 60);
  min = t % 60;
  res = min+':'+res;
  t = Math.floor(t / 60);

  if (t > 0) {
    if (min < 10) res = '0' + res;
    res = t+':'+res;
  }

  return res;
}

function vkNow() {
  return +new Date;
}

Function.prototype.pbind = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(window);
  return this.bind.apply(this, args);
};

if (!Function.prototype.bind) {
  Function.prototype.bind = function() {
    var func = this, args = Array.prototype.slice.call(arguments);
    var obj = args.shift();
    return function() {
      var curArgs = Array.prototype.slice.call(arguments);
      return func.apply(obj, args.concat(curArgs));
    }
  }
}

function rand(mi, ma) {
  return Math.random() * (ma - mi + 1) + mi;
}

function irand(mi, ma) {
  return Math.floor(rand(mi, ma));
}

function isUndefined(obj) {
  return typeof obj === 'undefined'
};

function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}

function isString(obj) {
  return typeof obj === 'string';
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]' && !(browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined');
}

function isEmpty(o) {
  if(Object.prototype.toString.call(o) !== '[object Object]') {return false;} for(var i in o){ if(o.hasOwnProperty(i)){return false;} } return true;
}

function isNumeric(value) {
  return !isNaN(value);
}

function vkImage() {
  return window.Image ? (new Image()) : ce('img'); // IE8 workaround
}

function intval(value) {
  if (value === true) return 1;
  return parseInt(value) || 0;
}

function floatval(value) {
  if (value === true) return 1;
  return parseFloat(value) || 0;
}

function positive(value) {
  value = intval(value);
  return value < 0 ? 0 : value;
}

function replaceEntities(str) {
  return se('<textarea>' + ((str || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')) + '</textarea>').value;
}

function clean(str) {
  return str ? (str+'').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
}

function unclean(str) {
  return replaceEntities((str+'').replace(/\t/g, "\n"));
}

function each(object, callback) {
  if (!isObject(object) && typeof object.length !== 'undefined') {
    for (var i = 0, length = object.length; i < length; i++) {
      var value = object[i];
      if (callback.call(value, i, value) === false) break;
    }
  } else {
    for (var name in object) {
      if (!Object.prototype.hasOwnProperty.call(object, name)) continue;
      if (callback.call(object[name], name, object[name]) === false)
        break;
    }
  }

  return object;
}

function indexOf(arr, value, from) {
  for (var i = from || 0, l = (arr || []).length; i < l; i++) {
    if (arr[i] == value) return i;
  }
  return -1;
}

function inArray(value, arr) {
  return indexOf(arr, value) != -1;
}

function clone(obj, req) {
  var newObj = !isObject(obj) && typeof obj.length !== 'undefined' ? [] : {};
  for (var i in obj) {
    if (/webkit/i.test(_ua) && (i == 'layerX' || i == 'layerY' || i == 'webkitMovementX' || i == 'webkitMovementY')) continue;
    if (req && typeof(obj[i]) === 'object' && i !== 'prototype' && obj[i] !== null) {
      newObj[i] = clone(obj[i]);
    } else {
      newObj[i] = obj[i];
    }

  }
  return newObj;
}

// Computes the difference of arrays by keys and values
function arrayKeyDiff(a) {
  var arr_dif = {}, i = 1, argc = arguments.length, argv = arguments, key, found;
  for (key in a){
    found = false;
    for (i = 1; i < argc; i++){
      if (argv[i][key] && (argv[i][key] == a[key])){
        found = true;
      }
    }
    if (!found) {
      arr_dif[key] = a[key];
    }
  }
  return arr_dif;
}

function extend() {
  var a = arguments, target = a[0] || {}, i = 1, l = a.length, deep = false, options;

  if (typeof target === 'boolean') {
    deep = target;
    target = a[1] || {};
    i = 2;
  }

  if (typeof target !== 'object' && !isFunction(target)) target = {};

  for (; i < l; ++i) {
    if ((options = a[i]) != null) {
      for (var name in options) {
        var src = target[name], copy = options[name];

        if (target === copy) continue;

        if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
          target[name] = extend(deep, src || (copy.length != null ? [] : {}), copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

function cleanObj(data) {
  if (isObject(data)) {
    var dataCleaned = {};
    for(var i in data) {
      dataCleaned[i.replace(/[^a-zA-Z0-9_\-]/g, '')] = cleanObj(data[i]);
    }
  } else if (isArray(data)) {
    var dataCleaned = [];
    for(var i in data) {
      dataCleaned.push(cleanObj(data[i]));
    }
  } else {
    var type = typeof(data);
    if (type == 'number' || type == 'boolean' || type == 'function') {
      var dataCleaned = data;
    } else {
      var dataCleaned = clean(data);
    }
  }
  return dataCleaned;
}

if (!Object.keys) {
  Object.keys = function(o) {
    var a = [];
    for (var i in o) {
      if (o.hasOwnProperty(i)) {
        a.push(i);
      }
    }
    return a;
  }
}

function hashCode(str) {
  var hash = 0;

  if (str.length === 0) {
    return hash;
  }

  for (var i = 0, len = str.length; i < len; i++) {
    var chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }

  return hash;
}

/* Store data connected to element */

window.vkExpand = 'VK' + vkNow();
window.vkUUID = 0;
window.vkCache = {};

function data(elem, name, data) {
  var id = elem[vkExpand], undefined;
  if (!id) {
    id = elem[vkExpand] = ++vkUUID;
  }

  if (name && !vkCache[id]) {
    vkCache[id] = {};
    if (__debugMode) vkCache[id].__elem = elem;
  }

  if (data !== undefined) {
    vkCache[id][name] = data;
  }

  return name ? vkCache[id][name] : id;
}

function attr(el, attrName, value) {
  el = ge(el);
  if (typeof value == 'undefined') {
    return el.getAttribute(attrName);
  } else {
    el.setAttribute(attrName, value);
    return value;
  }
}

function removeAttr(el) {
  for (var i = 0; i < arguments.length; ++i) {
    var n = arguments[i];
    if (el[n] === undefined) continue;
    try {
      delete el[n];
    } catch(e) {
      try {
        el.removeAttribute(n);
      } catch(e) {}
    }
  }
}

function removeData(elem, name) {
  var id = elem ? elem[vkExpand] : false;
  if (!id) return;

  if (name) {
    if (vkCache[id]) {
      delete vkCache[id][name];
      name = '';
      for (name in vkCache[id]) {
        break;
      }

      if (!name) {
        removeData(elem);
      }
    }
  } else {
    removeEvent(elem);
    removeAttr(elem, vkExpand);
    delete vkCache[id];
  }
}

function cleanElems() {
  var a = arguments;
  for (var i = 0; i < a.length; ++i) {
    var el = ge(a[i]);
    if (el) {
      removeData(el);
      removeAttr(el, 'btnevents');
    }
  }
}

/* Lang */

function trim(text) {
  return (text || '').replace(/^\s+|\s+$/g, '');
}

function stripHTML(text) {
  return text ? text.replace(/<(?:.|\s)*?>/g, '') : '';
}

function escapeRE(s) {
  return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') : '';
}

function langWordNumeric(num, words, arr) {
  if (isArray(words) && num < words.length) {
    return words[num];
  }
  return langNumeric(num, arr);
}

function langNumeric(count, vars, formatNum) {
  if (!vars || !window.langConfig) { return count; }
  var res;
  if (!isArray(vars)) {
    res = vars;
  } else {
    res = vars[1];
    if(count != Math.floor(count)) {
      res = vars[langConfig.numRules['float']];
    } else {
      each(langConfig.numRules['int'], function(i,v){
        if (v[0] == '*') { res = vars[v[2]]; return false; }
        var c = v[0] ? count % v[0] : count;
        if(indexOf(v[1], c) != -1) { res = vars[v[2]]; return false; }
      });
    }
  }
  if (formatNum) {
    var n = count.toString().split('.'), c = [];
    for(var i = n[0].length - 3; i > -3; i -= 3) {
      c.unshift(n[0].slice(i > 0 ? i : 0, i + 3));
    }
    n[0] = c.join(langConfig.numDel);
    count = n.join(langConfig.numDec);
  }
  res = (res || '%s').replace('%s', count);
  return res;
}

function langSex(sex, vars) {
  if (!isArray(vars)) return vars;
  var res = vars[1];
  if (!window.langConfig) return res;
  each(langConfig.sexRules, function(i,v){
    if (v[0] == '*') { res = vars[v[1]]; return false; }
    if (sex == v[0] && vars[v[1]]) { res = vars[v[1]]; return false; }
  });
  return res;
}

function langStr(vars) {
  var res = vars + '', args = arguments, args_count = args.length;
  for (var i = 1; i < args_count; i += 2) {
    var token = args[i][0] == '%' ? args[i] : '{' + args[i] + '}';
    res = res.replace(token, args[i + 1]);
  }
  return res;
}

function getLang() {
  try {
    var args = Array.prototype.slice.call(arguments);
    var key = args.shift();
    if (!key) return '...';
    var val = (window.cur.lang && window.cur.lang[key]) || (window.lang && window.lang[key]) || (window.langpack && window.langpack[key]) || window[key];
    if (!val) {
      var res = key.split('_');
      res.shift();
      return res.join(' ');
    }
    if (isFunction(val)) {
      return val.apply(null, args);
    } else if ((args[0] !== undefined || isArray(val)) && args[0] !== 'raw') {
      return langNumeric(args[0], val, args[1]);
    } else {
      return val;
    }
  } catch(e) {
    debugLog('lang error:' + e.message + '(' + Array.prototype.slice.call(arguments).join(', ') + ')');
  }
}

function checkTextLength(maxLen, inp, warn, nobr, cut, force, utf) {
  var value = (inp.getValue) ? inp.getValue() : inp.value,
      lastLen = inp.lastLen || 0;
  if (inp.lastLen === value.length && !force) return;
  inp.lastLen = value.length;
  var spec = {'&':5,'<':4,'>':4,'"':6,"\n":(nobr?1:4),"\r":0,'!':5,"'":5,'$':6,'\\':6},
      good = {0x490:1,0x491:1,0x2013:1,0x2014:1,0x2018:1,0x2019:1,0x201a:1,0x2026:1,0x2030:1,0x2039:1,0x203a:1,0x20ac:1,0x2116:1,0x2122:1,0xfffd:1},
      bad = {0x40d:1,0x450:1,0x45d:1};
  if (cut) spec[','] = 5;
  var countRealLen = function(text, nobr) {
    var res = 0;
    for (var i = 0, l = text.length; i < l; i++) {
      var k = spec[text.charAt(i)], c = text.charCodeAt(i);
      if (k !== undefined) {
        res += k;
      } else if (!utf && c >= 0x80 && (c < 0x401 || bad[c] || c > 0x45f) && !good[c] && (c < 0x201c || c > 0x201e) && (c < 0x2020 || c > 0x2022)) {
        res += ('&#' + c + ';').length;
      } else {
        res += 1;
      }
    }
    return res;
  };
  var realCut = function(text, len) {
    var curLen = 0, res = '';
    for (var i = 0, l = text.length; i < l; i++) {
      var symbol = text.charAt(i), k = spec[symbol], c = text.charCodeAt(i);
      if (k !== undefined) {
        curLen += k;
      } else if (!utf && c >= 0x80 && (c < 0x401 || bad[c] || c > 0x45f) && !good[c] && (c < 0x201c || c > 0x201e) && (c < 0x2020 || c > 0x2022)) {
        curLen += ('&#' + c + ';').length;
      } else {
        curLen += 1;
      }
      if (curLen > len) break;
      res += symbol;
    }
    return res;
  }
  var realLen = countRealLen(value, nobr);
  warn = ge(warn);
  if (realLen > maxLen - 100) {
    show(warn);
    if (realLen > maxLen) {
      if (cut) {
        var cutVal = val(inp, realCut(value, Math.min(maxLen, lastLen)));
        inp.lastLen = cutVal.length;
        warn.innerHTML = getLang('text_N_symbols_remain', 0);
      } else {
        warn.innerHTML = getLang('text_exceeds_symbol_limit', realLen - maxLen);
      }
    } else {
      warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
    }
  } else {
    hide(warn);
  }
}

function winToUtf(text) {
  return text.replace(/&#(\d\d+);/g, function(s, c) {
    c = intval(c);
    return (c >= 32) ? String.fromCharCode(c) : s;
  }).replace(/&quot;/gi, '"').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&');
}

function parseLatin(text) {
  var outtext = text;
  var lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"];
  var rus1 = ['¸', 'æ', 'õ', 'ö', '÷', 'ù',  'ù',   'ø', 'ý', 'þ', 'ÿ', '¨', 'Æ', 'Õ', 'Ö', '×', 'Ù',  'Ù',   'Ø', 'Ý', 'Þ', 'ß', 'ü'];
  for (var i = 0; i < lat1.length; i++) {
    outtext = outtext.split(lat1[i]).join(rus1[i]);
  }
  var lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYÂ¸Â¨';
  var rus2 = 'àáâãäåçèéêëìíîïðñòóôõöûÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÛåÅ';
  for (var i = 0; i < lat2.length; i++) {
    outtext = outtext.split(lat2.charAt(i)).join(rus2.charAt(i));
  }
  return (outtext == text) ? null : outtext;
}

function addLangKeys(keys, global) {
  var obj = global ? window : window.cur;
  if (!obj.lang) {
    obj.lang = keys;
  } else {
    extend(obj.lang, keys);
  }
}

function parseLatin(text){
  var outtext = text;
  var lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"];
  var rus1 = ['¸', 'æ', 'õ', 'ö', '÷', 'ù',  'ù',   'ø', 'ý', 'þ', 'ÿ', '¨', 'Æ', 'Õ', 'Ö', '×', 'Ù',  'Ù',   'Ø', 'Ý', 'Þ', 'ß', 'ü'];
  for (var i = 0, l = lat1.length; i < l; i++) {
    outtext = outtext.split(lat1[i]).join(rus1[i]);
  }
  var lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY¸¨';
  var rus2 = 'àáâãäåçèéêëìíîïðñòóôõöûÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÛåÅ';
  for (var i = 0, l = lat2.length; i < l; i++) {
    outtext = outtext.split(lat2.charAt(i)).join(rus2.charAt(i));
  }
  return (outtext == text) ? null : outtext;
}

function parseCyr(text) {
  var outtext = text, i,
      lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"],
      rus1 = ['¸', 'æ', 'õ', 'ö', '÷', 'ù',  'ù',   'ø', 'ý', 'þ', 'ÿ', '¨', 'Æ', 'Õ', 'Ö', '×', 'Ù',  'Ù',   'Ø', 'Ý', 'Þ', 'ß', 'ü'],
      lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY¸¨',
      rus2 = 'àáâãäåçèéêëìíîïðñòóôõöûÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÛåÅ';
  for (i = 0; i < rus1.length; i++) {
    outtext = outtext.split(rus1[i]).join(lat1[i]);
  }
  for (i = 0; i < rus2.length; i++) {
    outtext = outtext.split(rus2.charAt(i)).join(lat2.charAt(i));
  }
  return (outtext == text) ? null : outtext;
}

function parseLatKeys(text) {
  var outtext = text, i;
      lat = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`",
      rus = "éöóêåíãøùçõúôûâàïðîëäæýÿ÷ñìèòüáþ.¸";
  for (i = 0; i < lat.length; i++) {
    outtext = outtext.split(lat.charAt(i)).join(rus.charAt(i));
  }
  return (outtext == text) ? null : outtext;
}

/* Misc */

window._postsSeen = {};
window._postsSaved = {};
window._postsSaveTimer;
window._postsSendTimer;
window._postsCleanTimer;
window.ls = {
  checkVersion: function() {
    return false;
  },
  set: function(k, v) {
    return false;
  },
  get: function(k) {
    return false;
  },
  remove: function(k) {
    return false;
  }
};

function aquireLock(name, fn, noretry) {
  var lockKey = 'lockkk_' + name;
  if (ls.get(lockKey) !== true) {
    ls.set(lockKey, true);
    try {
      fn();
    } catch(e) {}
    ls.set(lockKey, false);
    return;
  }
  if (ls.checkVersion()) {
    if (!noretry) {
      setTimeout(aquireLock.pbind(name, fn, true), 100);
    }
  } else {
    fn();
  }
}

function statlogsValueEvent(statName, value, key1, key2, key3) {
  if (typeof(statName) === 'undefined' || typeof(value) === 'undefined') {
    return;
  }
  var stats,
      cookieName = 'remixsts',
      keys = [].slice.apply(arguments, [2, 5]);
  aquireLock('stats_cookie_lock', function() {
    try {
      stats = JSON.parse(getCookie(cookieName));
      stats = stats.data;
    } catch(e) {
      stats = [];
    }
    stats.push([
      Math.round(Date.now()/1000),
      statName,
      value
    ].concat(keys));
    while (stats.length > 100) {
      stats.shift();
    }
    var uniqueId = Math.round(rand(0, 1000000000)); // unique id
    setCookie(cookieName, JSON.stringify({data: stats, uniqueId: uniqueId, source: 'lite'}), 0.01)
  });
}

function onLoaded(fn) {
  if (vk.loaded) {
    fn();
  } else {
    addEvent(window, 'load', fn);
  }
}

/* Ajax */

function serializeForm(form) {
  if (typeof(form) != 'object') {
    return false;
  }
  var result = {};
  var g = function(n) {
    return geByTag(n, form);
  };
  var nv = function(i, e){
    if (!e.name) return;
    if (e.type == 'text' || !e.type) {
      result[e.name] = val(e);
    } else {
      result[e.name] = (browser.msie && !e.value && form[e.name]) ? form[e.name].value : e.value;
    }
  };
  each(g('input'), function(i, e) {
    if ((e.type != 'radio' && e.type != 'checkbox') || e.checked) return nv(i, e);
  });
  each(g('select'), nv);
  each(g('textarea'), nv);

  return result;
}

function ajx2q(qa) {
  var query = [], enc = function (str) {
    try {
      return encodeURIComponent(str);
    } catch (e) { return '';}
  };

  for (var key in qa) {
    if (qa[key] == null || isFunction(qa[key])) continue;
    if (isArray(qa[key])) {
      for (var i = 0, c = 0; i < qa[key].length; ++i) {
        if (qa[key][i] == null || isFunction(qa[key][i])) {
          continue;
        }
        query.push(enc(key) + '[' + c + ']=' + enc(qa[key][i]));
        ++c;
      }
    } else {
      query.push(enc(key) + '=' + enc(qa[key]));
    }
  }
  query.sort();
  return query.join('&');
}

function q2ajx(qa) {
  if (!qa) return {};
  var query = {}, dec = function (str) {
    try {
      return decodeURIComponent(str);
    } catch (e) { return str;}
  };
  qa = qa.split('&');
  each(qa, function(i, a) {
    var t = a.split('=');
    if (t[0]) {
      var v = dec(t[1] + '');
      if (t[0].substr(t.length - 2) == '[]') {
        var k = dec(t[0].substr(0, t.length - 2));
        if (!query[k]) {
          query[k] = [];
        }
        query[k].push(v);
      } else {
        query[dec(t[0])] = v;
      }
    }
  });
  return query;
}

window.stManager = {
  emitter: new EventEmitter(),
  _waiters: [],
  _wait: function() {
    var l = __stm._waiters.length, checked = {}, handlers = [];
    if (!l) {
      clearInterval(__stm._waitTimer);
      __stm._waitTimer = false;
      return;
    }
    for (var j = 0; j < l; ++j) {
      var wait = __stm._waiters[j][0];
      for (var i = 0, ln = wait.length; i < ln; ++i) {
        var f = wait[i];
        if (!checked[f]) {
          if (!StaticFiles[f].l && StaticFiles[f].t == 'css' && getStyle(StaticFiles[f].n, 'display') == 'none') {
            __stm.done(f);
          }
          if (StaticFiles[f].l) {
            checked[f] = 1;
          } else {
            checked[f] = -1;
            if (vk.loaded) {
              var c = ++StaticFiles[f].c;
              if (c > __stm.lowlimit && stVersions[f] > 0 || c > __stm.highlimit) {
                if (stVersions[f] < 0) {
                  topError('<b>Error:</b> Could not load <b>' + f + '</b>.', {dt: 5, type: 1, msg: 'Failed to load with ' + __stm.lowlimit + '/' + __stm.highlimit + ' limits (' + ((vkNow() - vk.started) / 100) + ' ticks passed)', file: f});
                  StaticFiles[f].l = 1;
                  checked[f] = 1;
                } else {
                  topMsg('Some problems with loading <b>' + f + '</b>...', 5);
                  stVersions[f] = irand(-10000, -1);
                  __stm._add(f, StaticFiles[f]);
                }
              }
            }
          }
        }
        if (checked[f] > 0) {
          wait.splice(i, 1);
          --i; --ln;
        }
      }
      if (!wait.length) {
        handlers.push(__stm._waiters.splice(j, 1)[0][1]);
        --j; --l;
      }
    }
    for (var j = 0, l = handlers.length; j < l; ++j) {
      handlers[j]();
    }
  },
  _addCss: function(text) {
    var elem = headNode.appendChild(ce('style', {
      type: 'text/css',
      media: 'screen'
    }));
    if (elem.sheet) {
      elem.sheet.insertRule(text, 0);
    } else if (elem.styleSheet) {
      elem.styleSheet.cssText = text;
    }
  },
  _srcPrefix: function (f, v) {
    if (!vk.stDomains ||
        __dev ||
        f.indexOf('.js') == -1 && f.indexOf('.css') == -1 ||
        f.indexOf('lang') != -1 ||
        f.indexOf('dyn-') != -1 ||
        f.indexOf('loader_nav') != -1 ||
        location.protocol == 'https:') {
      return '';
    }
    if (f.indexOf('.css') != -1) {
      return 'http://st0.vk.me';
    }
    f = f.replace(/[^a-z\d\.\-_]/ig, '');
    var src = intval(v), n = f.length, i;
    for (i = 0; i < n; i++) {
      src += f.charCodeAt(i);
    }
    return 'http://st' + ((src % vk.stDomains) + 1) + '.vk.me';
  },
  _add: function(f, old) {
    var name = f.replace(/[\/\.]/g, '_'),
        f_ver = stVersions[f],
        f_full = f + '?' + f_ver,
        f_prefix = stManager._srcPrefix(f, f_ver);

    // f_prefix = ''; // tmp fix userapi problems // turned to vk.me

    if (old && old.l && old.t == 'css') {
      __stm._addCss('#' + name + ' {display: block; }');
    }
    StaticFiles[f] = {v: f_ver, n: name, l: 0, c: 0};
    if (f.indexOf('.js') != -1) {
      var p = '/js/';
      if (stTypes.fromLib[f]) {
        p += 'lib/';
      } else if (stTypes.fromCompiled && stTypes.fromCompiled[f]) {
        p += jsc('web/');
      } else if (!/^lang\d/i.test(f) && !stTypes.fromRoot[f] && f.indexOf('/') == -1) {
        p += 'al/';
      }
      StaticFiles[f].t = 'js';

      if (f == 'common.js') {
        setTimeout(stManager.done.bind(stManager).pbind('common.js'), 0);
      } else {
        headNode.appendChild(ce('script', {
          type: 'text/javascript',
          src: f_prefix + p + f_full
        }));
      }
    } else if (f.indexOf('.css') != -1) {
      var p = '/css/' + (vk.css_dir || '') + (stTypes.fromRoot[f] || f.indexOf('/') != -1 ? '' : 'al/');
      headNode.appendChild(ce('link', {
        type: 'text/css',
        rel: 'stylesheet',
        href: f_prefix + p + f_full
      }));

      StaticFiles[f].t = 'css';

      if (!ge(name)) {
        utilsNode.appendChild(ce('div', {id: name}));
      }
    }
  },

  add: function(files, callback, async) {
    var wait = [], de = document.documentElement;
    if (!isArray(files)) files = [files];
    for (var i in files) {
      var f = files[i];
      if (!f) {
        continue;
      }
      if (f.indexOf('?') != -1) {
        f = f.split('?')[0];
      }
      if (/^lang\d/i.test(f)) {
        stVersions[f] = stVersions['lang'];
      } else if (!stVersions[f]) {
        stVersions[f] = 1;
      }
      // Opera Speed Dial fix
      var opSpeed = browser.opera && de.clientHeight == 768 && de.clientWidth == 1024;
      if ((opSpeed || __debugMode) && !(browser.iphone || browser.ipad) && f != 'common.js' && f != 'common.css' && stVersions[f] > 0 && stVersions[f] < 1000000000) stVersions[f] += irand(1000000000, 2000000000);
      var old = StaticFiles[f];
      if (!old || old.v != stVersions[f]) {
        __stm._add(f, old);
      }
      if (callback && !StaticFiles[f].l) {
        wait.push(f);
      }
    }
    if (!callback) return;
    if (!wait.length) {
      return (async === true) ? setTimeout(callback, 0) : callback();
    }
    __stm._waiters.push([wait, callback]);
    if (!__stm._waitTimer) {
      __stm._waitTimer = setInterval(__stm._wait, 100);
    }
  },
  done: function(f) {
    if (stVersions[f] < 0) {
      topMsg('<b>Warning:</b> Something is bad, please <b><a href="/page-777107_43991681">clear your cache</a></b> and restart your browser.', 10);
    }
    StaticFiles[f].l = 1;
    stManager.emitter.emitEvent('update', [f, StaticFiles[f]]);
  }
}, __stm = stManager;

window.ajaxCache = {};
window.globalAjaxCache = {};
window.ajax = {
  _init: function() {
    var r = false;
    try {
      if (r = new XMLHttpRequest()) {
        ajax._req = function() { return new XMLHttpRequest(); }
        return;
      }
    } catch(e) {}
    each(['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'], function() {
      try {
        var t = '' + this;
        if (r = new ActiveXObject(t)) {
          (function(n) {
            ajax._req = function() { return new ActiveXObject(n); }
          })(t);
          return false;
        }
      } catch(e) {}
    });
    if (!ajax._req) {
      location.replace('/badbrowser.php');
    }
  },
  _getreq: function() {
    if (!ajax._req) ajax._init();
    return ajax._req();
  },
  _frameover: function() {
    var node = iframeTransport.parentNode;
    node.innerHTML = '';
    utilsNode.removeChild(node);
    iframeTransport = false;
    ajax.framegot(false);
    if (cur.onFrameBlocksDone) {
      cur.onFrameBlocksDone();
    }
  },
  _receive: function(cont, html, js) {
    cont = cont && ge(cont);
    if (cont && html) {
      html = ce('div', {innerHTML: html});
      while (html.firstChild) {
        cont.appendChild(html.firstChild);
      }
    }
    if (js) {
      eval('(function(){' + js + ';})()');
    }
    ajax._framenext();
  },
  framedata: false,
  _framenext: function() {
    if (!(ajax.framedata || {}).length) return;
    var d = ajax.framedata.shift();
    if (d === true) {
      ajax._framenext();
    } else if (d === false) {
      ajax.framedata = false;
    } else {
      setTimeout(ajax._receive.pbind(d[0], d[1], d[2]), 0);
    }
  },
  framegot: function(c, h, j) {
    if (!ajax.framedata) return;
    ajax.framedata.push((h === undefined && j === undefined) ? c : [c, h, j]);
    if (ajax.framedata.length === 1) {
      ajax._framenext();
    }
  },
  framepost: function(url, query, done) {
    if (window.iframeTransport) {
      ajax._frameover();
    }
    window.iframeTransport = utilsNode.appendChild(ce('div', {innerHTML: '<iframe></iframe>'})).firstChild;
    ajax.framedata = [true];
    ajax._framedone = done;
    iframeTransport.src = url + '?' + ((typeof(query) != 'string') ? ajx2q(query) : query);
  },
  plainpost: function(url, query, done, fail) {
    var r = ajax._getreq();
    var q = (typeof(query) != 'string') ? ajx2q(query) : query;
    r.onreadystatechange = function() {
      if (r.readyState == 4) {
        if (r.status >= 200 && r.status < 300) {
          if (done) done(r.responseText, r);
        } else if (r.status) {
          if (fail) fail(r.responseText, r);
        }
      }
    }
    try {
      r.open('POST', url, true);
    } catch(e) {
      topMsg('<b>Ajax Error:</b> ' + e.message);
    }
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    r.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    r.send(q);
    return r;
  },
  post: function(url, query, options) {
    if (url.substr(0, 1) != '/') url = '/' + url;
    var o = extend({_captcha: false, _box: false}, options || {}), q = extend({al: o.frame ? -1 : 1}, query);
    if (o.progress) {
      if (!o.showProgress) {
        o.showProgress = show.pbind(o.progress);
      }
      if (!o.hideProgress) {
        o.hideProgress = hide.pbind(o.progress);
      }
    }
    return ajax._post(url, q, o);
  },
  preload: function(url, query, data) {
    if (url.substr(0, 1) != '/') url = '/' + url;
    ajaxCache[url + '#' + ajx2q(query)] = data;
  },
  invalidate: function(url, query) {
    if (url === undefined) {
      ajaxCache = {}
    } else {
      delete ajaxCache[ajax._getCacheKey(url, query)];
    }
  },
  _getCacheKey: function(url, query, o) {
    var boldq = clone(query);
    delete boldq.al;
    delete boldq.al_ad;
    delete boldq.ads_section;
    delete boldq.ads_showed;
    delete boldq.captcha_sid;
    delete boldq.captcha_key;
    delete boldq._smt;
    delete boldq._preload;
    return url + '#' + ajx2q(boldq, o && o.noSort);
  },
  _debugLog: function(text) {
     window._updateDebug = function() {
       var dlw = ge('debuglogwrap');
       if (dlw) {
         dlw.innerHTML = text;
         window._updateDebug = false;
       }
     }
  },
  _parseRes: function(answer) {
    window._updateDebug = false;
    for (var i = 0; i < answer.length; ++i) {
      var ans = answer[i];
      if (ans.substr(0, 2) == '<!') {
        var from = ans.indexOf('>');
        var type = ans.substr(2, from - 2);
        ans = ans.substr(from + 1);
        switch (type) {
        case 'json' : answer[i] = eval('(' + ans + ')'); break;
        case 'int'  : answer[i] = intval(ans); break;
        case 'float': answer[i] = floatval(ans); break;
        case 'bool' : answer[i] = intval(ans) ? true : false; break;
        case 'null' : answer[i] = null; break;
        case 'debug':
          ajax._debugLog(ans);
          answer.pop(); // <!debug> must be last one
        break;
        }
      }
    }
  },
  _post: function(url, q, o) {
    if (!q.captcha_sid && o.showProgress) o.showProgress();
    var cacheKey = false;
    extend(q, __adsGetAjaxParams(q, o));
    if (o.cache) {
      cacheKey = ajax._getCacheKey(url, q, o);
    }
    var hideBoxes = function() {
      for (var i = 0; i < arguments.length; ++i) {
        var box = arguments[i];
        if (box && box.isVisible()) {
          box.setOptions({onHide: false});
          box.hide();
        }
      }
      return false;
    }
    var fail = function(text) {
      if (o.hideProgress) o.hideProgress();
      if (o._suggest) cleanElems(o._suggest);
      o._suggest = o._captcha = o._box = hideBoxes(o._box, o._captcha);
      if (isFunction(o.onFail)) {
        if (o.onFail(text)) {
          return;
        }
      }
      topError(text);
    }
    // Process response function
    var processResponse = function(code, answer) {

      if (o.customProcessResponse) {
        return o.customProcessResponse(code, answer);
      }

      if (o.cache && !o.forceGlobalCache) {
        if (!code) {
          ajaxCache[cacheKey] = answer;
        }
        if (o.cache === 2) {
          return;
        }
      }

      // Parse response

      if (o.hideProgress) o.hideProgress();
      o._box = hideBoxes(o._box);
      if (o._captcha && code != 2) {
        if (o._suggest) cleanElems(o._suggest);
        o._suggest = o._captcha = hideBoxes(o._captcha);
      }
      switch (code) {
      case 1: // email not confirmed
        if (ge('confirm_mail')) {
          showFastBox({
            width: 430,
            title: ge('confirm_mail_title').value,
            onHide: o.onFail
          }, '<div class="confirm_mail">' + ge('confirm_mail').innerHTML + '</div>');
        } else {
          topMsg('<b>Error!</b> Email is not confirmed!');
        }
        break;
      case 2: // captcha
        if (intval(answer[1]) === 2) {
          var resend = function(response) {
            var nq = extend(q, {recaptcha: response});
            var no = o.cache ? extend(o, {cache: -1}) : o;
            ajax._post(url, nq, no);
          }
          o._captcha = showReCaptchaBox(answer[0], answer[2], o._captcha, {
            onSubmit: resend,
            addText: addText,
            onDestroy: function() {
              if (o.onFail) o.onFail();
            }
          });
        } else {
          var resend = function(sid, key) {
            var nq = extend(q, {captcha_sid: sid, captcha_key: key});
            var no = o.cache ? extend(o, {cache: -1}) : o;
            ajax._post(url, nq, no);
          }
          var addText = '';
          if (vk.nophone == 1 && !vk.nomail) {
            addText = getLang('global_try_to_activate').replace('{link}', '<a class="phone_validation_link">').replace('{/link}', '</a>');
            addText = '<div class="phone_validation_suggest">' + addText + '</div>';
          }
          o._captcha = showCaptchaBox(answer[0], intval(answer[1]), o._captcha, {
            onSubmit: resend,
            addText: addText,
            onHide: function() {
              if (o.onFail) o.onFail();
            }
          });
        }
        if (o._captcha && o._captcha.bodyNode && (o._suggest = geByClass1('phone_validation_link', o._captcha.bodyNode))) {
          addEvent(o._suggest, 'click', function() {
            o._box = activateMobileBox({onDone: o._captcha.submit});
          });
        }
        break;
      case 3: // auth failed
        var no = o.cache ? extend(o, {cache: -1}) : o;
        window.onReLoginDone = ajax._post.pbind(url, q, no);
        window.onReLoginFailed = function(toRoot) {
          if (toRoot === -1) {
            location.href = location.href.replace(/^http:/, 'https:');
          } else if (toRoot) {
            nav.go('/');
          } else {
            window.onReLoginDone();
          }
        }
        var iframe = ce('iframe', {src: vk.loginscheme + '://login.vk.com/?role=al_frame&_origin=' + (locProtocol + '//' + locHost) + '&ip_h=' + (answer[0] || vk.ip_h)}), t = 0;
        utilsNode.appendChild(iframe);
        break;
      case 4: // redirect
        if (answer[1]) { // ajax layout redirect
          nav.go(answer[0]);
        } else {
          hab.stop();
          location.href = answer[0];
        }
        break;
      case 5: // reload
        nav.reload({force: intval(answer[0])}); // force reload
        break;
      case 6: // mobile activation needed
        var no = o.cache ? extend(o, {cache: -1}) : o;
        o._box = activateMobileBox({onDone: ajax._post.pbind(url, q, no), onFail: o.onFail, hash: answer[0]});
        break;
      case 7: // message
        if (o.onFail) o.onFail();
        topMsg(answer[0], 10);
        break;
      case 8: // error
        if (o.onFail) {
          if (o.onFail(answer[0])) {
            return;
          }
        }
        topError(answer[0], answer[1] ? 0 : 10);
        break;
      case 9: // votes payment
        o._box = showFastBox(answer[0], answer[1]);
        var no = extend(clone(o), {showProgress: o._box.showProgress, hideProgress: o._box.hideProgress});
        if (o.cache) {
          no.cache = -1;
        }
        o._box = requestBox(o._box, function() {
          if (isVisible(o._box.progress)) return;
          ajax._post(url, extend(q, {_votes_ok: 1}), no);
        }, o.onFail);
        var f = eval('((function() { return function() { var box = this; ' + (answer[2] || '') + ' ;}; })())');
        f.apply(o._box);
        break;
      case 10: //zero zone
        o._box = showFastBox({
          title: answer[0] || getLang('global_charged_zone_title'),
          onHide: o.onFail
        }, answer[1], getLang('global_charged_zone_continue'), function() {
          var nq = extend(q, {charged_confirm: answer[3]});
          ajax._post(url, nq, o);
        }, getLang('global_cancel'));
        break;
      case 11:
      case 12:
        if (vk.widget) {
          window.open(vk.loginscheme + '://vk.com/settings?z=validatebox', 'validatebox');
        } else {
          onBodyResize(true);
          show(boxLayerBG);
          show(boxLayerWrap);

          cur.box = showFastBox({title: getLang('global_not_activated_title'), dark: 1, hideOnBGClick: true, bodyStyle: "line-height: 160%", onWidgetHide: function() {
            setTimeout(function() {
              hide(boxLayerBG);
              hide(boxLayerWrap);
            }, 0)
          }
          }, getLang('global_mobile_need_validation').replace('{link}', '<br/><a onclick="cur.box.hide();" href="' + vk.loginscheme + '://vk.com/settings?z=validatebox">').replace('{/link}', '</a>'));

          o.onFail.apply();
        }
        break;
      default:
        if (code == -1 || code == -2 || code == -3) {
          var adsShowed  = answer.pop();
          var adsCanShow = answer.pop();
          var adsHtml    = answer.pop();
          var adsProps;
          if (code == -3) {
            adsProps = answer.pop();
          }
          __adsSet(adsHtml, null, adsCanShow, adsShowed, null, adsProps);
        }
        if (o.onDone) { // page, box or other
          o.onDone.apply(window, answer);
        }
        break;
      }
      if (window._updateDebug) _updateDebug();
    }
    var done = function(text, data) { // data - for iframe transport post
      if (!trim(text).length) {
        data = [8, getLang('global_unknown_error')];
        text = stVersions['nav'] + '<!><!>' + vk.lang + '<!>' + stVersions['lang'] + '<!>8<!>' + data[1];
      }

      var answer = text.split('<!>');

      var navVersion = intval(answer.shift());
      if (!navVersion) {
        return fail(text);
      }

      // First strict check for index.php reloading, in vk.al == 1 mode.
      if (vk.version && vk.version != navVersion) {
        if (navVersion && answer.length > 4) {
          nav.reload({force: true});
        } else {
          if (nav.strLoc) {
            location.replace(locBase);
          } else {
            topError('Server error.');
          }
        }
        return;
      }
      vk.version = false;

      // Common response fields
      var newStatic = answer.shift();
      var langId = intval(answer.shift());
      var langVer = intval(answer.shift());

      if (o.frame) answer = data;

      var code = intval(answer.shift());
      if (vk.lang != langId && o.canReload) { // Lang changed
        nav.reload({force: true});
        return;
      }

      // Wait for attached static files
      var waitResponseStatic = function() {
        //var st = ['lite.css'];
        var st = [];
        if (newStatic) {
          newStatic = newStatic.split(',');
          for (var i = 0; i < newStatic.length; ++i) {
            st.push(newStatic[i]);
          }
        }
        if (stVersions['lang'] < langVer) {
          stVersions['lang'] = langVer;
          for (var i in StaticFiles) {
            if (/^lang\d/i.test(i)) {
              st.push(i);
            }
          }
        }

        if (!o.frame) {
          try {
            ajax._parseRes(answer);
          } catch(e) {
            topError('<b>JSON Error:</b> ' + e.message);
          }
        }
        stManager.add(st, processResponse.pbind(code, answer));
      }

      // Static managing function
      if (navVersion <= stVersions['nav']) {
        return waitResponseStatic();
      }
      headNode.appendChild(ce('script', {
        type: 'text/javascript',
        src: '/js/loader_nav' + navVersion + '_' + vk.lang + '.js'
      }));
      setTimeout(function() {
        if (navVersion <= stVersions['nav']) {
          return waitResponseStatic();
        }
        setTimeout(arguments.callee, 100);
      }, 0);
    }
    if (o.cache > 0 || o.forceGlobalCache) {
      var answer = ajaxCache[cacheKey];
      if (answer && !o.forceGlobalCache) {
        processResponse(0, answer);
        return;
      } else if (answer = globalAjaxCache[cacheKey]) {
        if (answer == -1) {
          globalAjaxCache[cacheKey] = o.onDone;
        } else {
          o.onDone.apply(window, answer);
        }
        return;
      }
    }
    return o.frame ? ajax.framepost(url, q, done) : ajax.plainpost(url, q, done, fail);
  }
}

/* Nav */

function HistoryAndBookmarks(params) {
  // strict check for cool hash display in ff.
  var fixEncode = function(loc) {
    var h = loc.split('#');
    var l = h[0].split('?');
    return l[0] + (l[1] ? ('?' + ajx2q(q2ajx(l[1]))) : '') + (h[1] ? ('#' + h[1]) : '');
  }

  var frame = null, withFrame = browser.msie6 || browser.msie7;
  var frameDoc = function() {
    return frame.contentDocument || (frame.contentWindow ? frame.contentWindow.document : frame.document);
  }

  var options = extend({onLocChange: function() {}}, params);

  var getLoc = function(skipFrame) {
    var loc = '';
    if (vk.al == 3) {
      loc = (location.pathname || '') + (location.search || '') + (location.hash || '');
    } else {
      if (withFrame && !skipFrame) {
        try {
          loc = frameDoc().getElementById('loc').innerHTML.replace(/&lt;/ig, '<').replace(/&gt;/ig, '>').replace(/&quot;/ig, '"').replace(/&amp;/ig, '&');
        } catch(e) {
          loc = curLoc;
        }
      } else {
        loc = browser.msie6 ? ((location.toString().match(/#(.*)/) || {})[1] || '') : location.hash.replace(/^#/, '');
        if (loc.substr(0, 1) != vk.navPrefix) {
          loc = (location.pathname || '') + (location.search || '') + (location.hash || '');
        }
      }
    }
    if (!loc && vk.al > 1) {
      loc = (location.pathname || '') + (location.search || '');
    }
    return fixEncode(loc.replace(/^(\/|!)/, ''));
  }

  var curLoc = getLoc(true);

  var setFrameContent = function(loc) {
    try {
      var d = frameDoc();
      d.open();

      d.write('<div id="loc">' +
          loc.replace('&', '&amp;').replace('"', '&quot;').replace('>', '&gt;').replace('<', '&lt;') +
        '</div>'
      );

      d.close();
    } catch(e) {}
  }

  var setLoc = function(loc) {
    //curLoc = fixEncode(loc.replace(/#(\/|!)?/, ''));
    curLoc = fixEncode(loc);
    var l = (location.toString().match(/#(.*)/) || {})[1] || '';
    if (!l && vk.al > 1) {
      l = (location.pathname || '') + (location.search || '');
    }
    l = fixEncode(l);
    if (l.replace(/^(\/|!)/, '') != curLoc) {
      if (vk.al == 3) {
        try {
          history.pushState({}, '', '/' + curLoc);
          return;
        } catch(e) {}
      }
      window.chHashFlag = true;
      location.hash = '#' + vk.navPrefix + curLoc;
      if (withFrame && getLoc() != curLoc) {
        setFrameContent(curLoc);
      }
    }
  }

  var locChecker = function() {
    var loc = getLoc(true);
    if (loc != curLoc) {
      setFrameContent(loc);
    }
  }

  var checker = function(force) {
    var l = getLoc();
    if (l == curLoc && force !== true) {
      return;
    }

    options.onLocChange(l);

    curLoc = l;
    if (withFrame && location.hash.replace('#' + vk.navPrefix, '') != l) {
      location.hash = '#' + vk.navPrefix + l;
    }
  }
  var checkTimer;
  var frameChecker = function() {
    try {
      if (frame.contentWindow.document.readyState != 'complete') {
        return;
      }
    } catch(e) {
      return;
    }
    checker();
  }
  var init = function() {
    if (vk.al == 1) {
      checker(true);
    }
    if (vk.al < 3) {
      if (withFrame) {
        frame = document.createElement('iframe');
        frame.id = 'hab_frame';
        frame.attachEvent('onreadystatechange', frameChecker);
        frame.src = 'al_loader.php?act=hab_frame&loc=' + encodeURIComponent(curLoc) + '&domain=' + encodeURIComponent(locDomain);

        utilsNode.appendChild(frame);

        checkTimer = setInterval(locChecker, 200);
      } else {
        if ('onhashchange' in window) {
          addEvent(window, 'hashchange', function() {
            if (window.chHashFlag) {
              window.chHashFlag = false;
            } else {
              checker();
            }
          });
        } else {
          checkTimer = setInterval(checker, 200);
        }
      }
    } else if (vk.al == 3) {
      addEvent(window, 'popstate', checker);
    }
  }

  return {
    setLoc: setLoc,
    getLoc: getLoc,
    init: init,
    setOptions: function(params) {
      options = extend(options, params);
    },
    checker: checker,
    stop: function() {
      if (vk.al < 3) {
        clearInterval(checkTimer);
        if (withFrame) {
          frame.detachEvent('onreadystatechange', frameChecker);
        }
      } else if (vk.al == 3) {
        removeEvent(window, 'popstate', checker);
      }
    }
  }
}

window.hab = new HistoryAndBookmarks({onLocChange: function(loc) {
  nav.go('/' + loc, undefined, {back: true});
}});

window.nav = {
  getData: function(loc) {
    if (loc.length) {
      for (var i in navMap) {
        if (i[0] == '<') continue;
        var m = loc.match(new RegExp('^' + i, 'i'));
        if (m) {
          return {url: navMap[i][0], files: navMap[i][1]};
        }
      }
      var m = loc.match(/^[a-z0-9\-_]+\.php$/i);
      if (m) {
        return {url: loc};
      }
      return {url: navMap['<other>'][0], files: navMap['<other>'][1]};
    }
    return {url: navMap['<void>'][0], files: navMap['<void>'][1]};
  },

  reload: function(opts) {
    opts = opts || {};
    if (opts.force) {
      hab.stop();
      location.href = '/' + nav.strLoc;
    } else {
      nav.go('/' + nav.strLoc, undefined, extend({nocur: true}, opts));
    }
  },

  go: function(loc, ev, opts) {
    if (checkEvent(ev) || cur.noAjaxNav) return;
    opts = opts || {};
    if (loc.tagName && loc.tagName.toLowerCase() == 'a') {
      if (loc.target == '_blank' || nav.baseBlank) {
        return;
      }
      var _params = loc.getAttribute('hrefparams');
      if (_params) {
        opts.params = extend(opts.params || {}, q2ajx(_params));
      }
      loc = loc.href || '';
      if (ev && !(loc || '').match(new RegExp('^' + locProtocol + '//' + locHost, 'i'))) {
        return;
      }
    }
    var strLoc = '', objLoc = {}, changed = {};
    if (typeof(loc) == 'string') {
      loc = loc.replace(new RegExp('^(' + locProtocol + '//' + locHost + ')?/?', 'i'), '');
      strLoc = loc;
      objLoc = nav.fromStr(loc);
    } else {
      if (!loc[0]) loc[0] = '';
      strLoc = nav.toStr(loc);
      objLoc = loc;
    }

    if (!opts.nocur) {
      changed = clone(objLoc);
      for (var i in nav.objLoc) {
        if (nav.objLoc[i] == changed[i]) {
          delete(changed[i]);
        } else if (changed[i] === undefined) {
          changed[i] = false;
        }
      }
    }

    if (!opts.nocur && (vk.loaded || !changed['0'])) {
      var curnav = cur.nav || [];
      for (var i = curnav.length - 1; i >= 0; i--) {
        var oldUrl = document.URL;
        if (curnav[i](clone(changed), nav.objLoc, objLoc, opts) === false) {
          var currentURL = locProtocol+'//'+location.host+'/'+strLoc,
              referrer = (oldUrl == currentURL) ? '' : oldUrl;
          return false;
        }
      }
    }

    // other code is not needed for widgets
  },

  setLoc: function(loc) {
    if (typeof(loc) == 'string') {
      nav.strLoc = loc;
      nav.objLoc = nav.fromStr(loc);
    } else {
      nav.strLoc = nav.toStr(loc);
      nav.objLoc = loc;
    }
    hab.setLoc(nav.strLoc);
  },

  change: function(loc, ev, opts) {
    var params = clone(nav.objLoc);
    each(loc, function(i,v) {
      if (v === false) {
        delete params[i];
      } else {
        params[i] = v;
      }
    });
    return nav.go(params, ev, opts);
  },

  fromStr: function(str) {
    str = str.split('#');
    var res = str[0].split('?');
    var param = {'0': res[0] || ''}
    if (str[1]) {
      param['#'] = str[1];
    }
    return extend(q2ajx(res[1] || ''), param);
  },

  toStr: function(obj) {
    obj = clone(obj);
    var hash = obj['#'] || '';
    var res = obj[0] || '';
    delete(obj[0]);
    delete(obj['#']);
    var str = ajx2q(obj);
    return (str ? (res + '?' + str) : res) + (hash ? ('#' + hash) : '');
  },

  init: function() {
    nav.strLoc = hab.getLoc();
    nav.objLoc = nav.fromStr(nav.strLoc);
  }
}

nav.init();

function goAway(lnk, prms, e) {
  return true;
}

function processDestroy(c) {
  if (c._back && c._back.hide && c == cur) {
    for (var i in c._back.hide) {
      try {c._back.hide[i]();}catch(e){}
    }
  }
  if (!c.destroy || !c.destroy.length) return;
  for (var i in c.destroy) {
    try {c.destroy[i](c);}catch(e){}
  }
}

window.onLogout = window.onLoginDone = nav.reload;

/* Events */

window.KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DEL: 8,
  TAB: 9,
  RETURN: 13,
  ENTER: 13,
  ESC: 27,
  PAGEUP: 33,
  PAGEDOWN: 34,
  SPACE: 32,
  CTRL: 17,
  ALT: 18
};

function addEvent(elem, types, handler, custom, context) {
  elem = ge(elem);
  if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
    return;

  var realHandler = context ? function (e) {
    var prevData = e.data;
    e.data = context;
    var ret = handler.apply(this, [e]);
    e.data = prevData;
    return ret;
  } : handler;

  // For IE
  if (elem.setInterval && elem != window) elem = window;

  var events = data(elem, 'events') || data(elem, 'events', []),
      handle = data(elem, 'handle') || data(elem, 'handle', function() {
        _eventHandle.apply(arguments.callee.elem, arguments);
      });
  // to prevent a memory leak
  handle.elem = elem;

  each(types.split(/\s+/), function(index, type) {
    if (!events[type]) {
      events[type] = [];
      if (!custom && elem.addEventListener) {
        elem.addEventListener(type, handle, false);
      } else if (!custom && elem.attachEvent) {
        elem.attachEvent('on' + type, handle);
      }
    }
    events[type].push(realHandler);
  });

  elem = null;
}

function removeEvent(elem, types, handler) {
  elem = ge(elem);
  if (!elem) return;
  var events = data(elem, 'events');
  if (!events) return;
  if (typeof(types) != 'string') {
    for (var i in events) {
      removeEvent(elem, i);
    }
    return;
  }
  each(types.split(/\s+/), function(index, type) {
    if (!isArray(events[type])) return;
    if (isFunction(handler)) {
      for (var i = 0; i < events[type].length; i++) {
        if (events[type][i] == handler) {
          for (var j = i + 1; j < events[type].length; j++) {
            events[type][j - 1] = events[type][j];
          }
          events[type].pop();
          break;
        }
      }
    } else {
      for (var i = 0; i < events[type].length; i++) {
        delete events[type][i];
      }
    }
    if (!events[type].length) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, data(elem, 'handle'), false);
      } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, data(elem, 'handle'));
      }
      delete events[type];
    }
  });
}

function triggerEvent(elem, type, ev) {
  var handle = data(elem, 'handle');
  if (handle) {
    setTimeout(function() {
      handle.call(elem, extend((ev || {}), {type: type, target: elem}))
    }, 0);
  }
}

function cancelEvent(event) {
  event = (event || window.event);
  if (!event) return false;
  event = (event.originalEvent || event);
  if (event.preventDefault) event.preventDefault();
  if (event.stopPropagation) event.stopPropagation();
  event.cancelBubble = true;
  event.returnValue = false;
  return false;
}

function stopEvent(event) {
  event = (event || window.event);
  if (!event) return false;
  while (event.originalEvent) {
    event = event.originalEvent;
  }
  if (event.stopPropagation) event.stopPropagation();
  event.cancelBubble = true;
  return false;
}

function _eventHandle(event) {
  event = event || window.event;

  var originalEvent = event;
  event = clone(originalEvent);
  event.originalEvent = originalEvent;

  if (!event.target) {
    event.target = event.srcElement || document;
  }

  // check if target is a textnode (safari)
  if (event.target.nodeType == 3) {
    event.target = event.target.parentNode;
  }

  if (!event.relatedTarget && event.fromElement) {
    event.relatedTarget = event.fromElement == event.target;
  }

  if (event.pageX == null && event.clientX != null) {
    var doc = document.documentElement, body = bodyNode || document.body;
    event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
    event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
  }

  if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
    event.which = event.charCode || event.keyCode;
  }

  if (!event.metaKey && event.ctrlKey) {
    event.metaKey = event.ctrlKey;
  }

  // click: 1 == left; 2 == middle; 3 == right
  if (!event.which && event.button) {
    event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
  }

  var handlers = data(this, 'events');
  if (!handlers || typeof(event.type) != 'string' || !handlers[event.type] || !handlers[event.type].length) {
    return;
  }

  for (var i in (handlers[event.type] || [])) {
    if (event.type == 'mouseover' || event.type == 'mouseout') {
      var parent = event.relatedElement;
      while (parent && parent != this) {
        try { parent = parent.parentNode; }
        catch(e) { parent = this; }
      }
      if (parent == this) {
        continue
      }
    }
    var ret = handlers[event.type][i].apply(this, arguments);
    if (ret === false) {
      cancelEvent(event);
    }
  }
}

function normEvent(event) {
  event = event || window.event;

  var originalEvent = event;
  event = clone(originalEvent);
  event.originalEvent = originalEvent;

  if (!event.target) {
    event.target = event.srcElement || document;
  }

  // check if target is a textnode (safari)
  if (event.target.nodeType == 3) {
    event.target = event.target.parentNode;
  }

  if (!event.relatedTarget && event.fromElement) {
    event.relatedTarget = event.fromElement == event.target;
  }

  if (event.pageX == null && event.clientX != null) {
    var doc = document.documentElement, body = bodyNode;
    event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
    event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
  }

  if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
    event.which = event.charCode || event.keyCode;
  }

  if (!event.metaKey && event.ctrlKey) {
    event.metaKey = event.ctrlKey;
  } else if (!event.ctrlKey && event.metaKey && browser.mac) {
    event.ctrlKey = event.metaKey;
  }

  // click: 1 == left; 2 == middle; 3 == right
  if (!event.which && event.button) {
    event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
  }

  return event;
}

addEvent(window, 'unload', function() { // Prevent memory leaks in IE
  for (var id in vkCache) {
    if (vkCache[id].handle && vkCache[id].handle.elem != window) {
      removeEvent(vkCache[id].handle.elem);
    }
  }
});

function onCtrlEnter(ev, handler) {
  ev = ev || window.event;
  if (ev.keyCode == 10 || ev.ctrlKey && ev.keyCode == 13) {
    handler();
  }
}

var layoutWidth = 791;

function domStarted() {
  window.headNode = geByTag1('head');
  var bl = ge('box_layer_bg'), blw = bl.nextSibling;
  extend(window, {
    icoNode:  geByTag1('link', headNode),
    bodyNode: geByTag1('body'),
    htmlNode: geByTag1('html'),
    utilsNode: ge('utils'),
    layerBG: null,
    boxLayerBG: bl,
    boxLayerWrap: blw,
    boxLayer: blw.firstChild,
    boxLoader: blw.firstChild.firstChild,
    __afterFocus: false,
    __needBlur: false
  });
  if (!utilsNode) return;

  for (var i in StaticFiles) {
    var f = StaticFiles[i];
    f.l = 1;
    if (f.t == 'css') {
      utilsNode.appendChild(ce('div', {id: f.n}));
    }
  }

  addEvent(boxLayerWrap, 'click', __bq.hideLastCheck);

  extend(layers, {
    boxshow: layers._show.pbind(bl, blw),
    boxhide: layers._hide.pbind(bl, blw)
  });

  hab.init();
}

function domReady() {
  if (!utilsNode) return;


  extend(window, {
    pageNode: document.body
  });

  window.scrollNode = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);

  onBodyResize();

  var scrolledNode = browser.msie6 ? pageNode : window;
}

function onDomReady(f) {
  f();
}

function checkEvent(e) {
  return ((e = (e || window.event)) && (e.type == 'click' || e.type == 'mousedown' || e.type == 'mouseup') && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || browser.mac && e.metaKey)) || false;
}

function checkKeyboardEvent(e) {
  e = normEvent(e);
  if (!e || !e.target) return false;
  if (!e.screenX) return true;

  var size = getSize(e.target), xy = getXY(e.target);
  var offsetX = e.pageX - xy[0];
  var offsetY = e.pageY - xy[1];

  if (offsetX < 0 || offsetX > size[0] || offsetY < 0 || offsetY > size[1]) return true;
  return (Math.abs(e.pageX - xy[0] - size[0] / 2) < 1 && Math.abs(e.pageY - xy[1] - size[1] / 2) < 1);
}

function setWorkerTimeout(cb, delay) {
  if (window.Worker && window.Blob) {
    var scriptBlob = new Blob([" \
      var timeout; \
      onmessage = function(e) { \
        clearTimeout(timeout); \
        if (e.data == 'start') { \
          timeout = setTimeout(function() { postMessage({}); }, " + delay + "); \
        } \
      } \
    "]);

    try {
      var worker = new Worker(window.URL.createObjectURL(scriptBlob));

      worker.onmessage = function() {
        worker.terminate();
        cb();
      }
      worker.postMessage('start');
    } catch (e) {
      worker = false;
    }

    return worker;
  } else {
    return setTimeout(cb, delay)
  }
}

function clearWorkerTimeout(worker) {
  if (!worker) {
    return false
  }

  if (isNumeric(worker)) {
    clearTimeout(worker);
  } else {
    worker.terminate();
  }
}

/* Templates */

function addTemplates(tpls) {
  window.templates = window.templates || {};
  extend(window.templates, tpls);
}

function getTemplate(tplName, state) {
  var tpls = window.templates = window.templates || {},
      tpl = tpls[tplName];

  if (typeof tpl === 'function') {  // function that returns actual template string
    tpl = tpl();
  }
  if (tpl && state) {
    return rs(tpl, state);
  }

  return tpl || '';
}

/* Cookie */

window._cookies;

function _initCookies() {
  _cookies = {};
  var ca = document.cookie.split(';');
  var re = /^[\s]*([^\s]+?)$/i;
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].split('=');
    if (c.length == 2) {
     _cookies[c[0].match(re)[1]] = unescape(c[1].match(re) ? c[1].match(re)[1] : '');
    }
  }
}

function getCookie(name) {
  _initCookies();
  return _cookies[name];
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = '; expires='+date.toGMTString();
  }
  var domain = locDomain;
  document.cookie = name + '='+escape(value) + expires + '; path=/' + (domain ? '; domain=.' + domain : '');
}

/* DOM */

function domClosestOverflowHidden(startEl, ignoreFirefoxScrollFixWrap) {
  startEl = ge(startEl);
  var el = startEl, position, overflow, transform, lastPosition;

  while (el && el.tagName && el !== bodyNode) {
    position = getStyle(el, 'position');
    overflow = getStyle(el, 'overflow');
    transform = getStyle(el, 'transform');

    if (ignoreFirefoxScrollFixWrap && browser.mozilla) { // for mozilla browser
      if (el.id != 'page_wrap' &&
        el !== startEl &&
        overflow !== 'visible' &&
        (position === 'static' ? (!lastPosition || lastPosition === 'relative') : lastPosition !== 'fixed')) {
        break;
      }
    } else if (el !== startEl && // for other browser
      overflow !== 'visible' &&
      (position === 'static' ? (!lastPosition || lastPosition === 'relative') : lastPosition !== 'fixed')) {
      break;
    }

    if (transform !== 'none') {
      lastPosition = void 0;
    } else if (position !== 'static' && lastPosition !== 'fixed') {
      lastPosition = position;
    }

    el = domPN(el);
  }

  return el;
}

function nodeUpdated(elem, delay) {
  setStyle(elem, {backgroundColor: '#F5F7FA'});
  animate(elem, {backgroundColor: '#FFF'}, delay || 6000, function(el) {
    setStyle(el, {backgroundColor: null});
  });
}

function getColor(elem, attr) {
  var color;
  do {
    color = getStyle(elem, attr);
    if (!color.indexOf('rgba')) color = '';
    if (color != '' && color != 'transparent' || elem.nodeName.toLowerCase() == 'body') {
      break;
    }
    attr = 'backgroundColor';
  } while (elem = elem.parentNode);
  return getRGB(color);
}

function scrollToTop(speed) {
  if (speed == undefined) speed = 400;
  if (speed) {
    if (browser.msie6) {
      animate(pageNode, {scrollTop: 0}, speed);
    } else {
      animate(htmlNode, {scrollTop: 0}, speed);
      animate(bodyNode, {scrollTop: 0}, speed);
    }
  } else {
    window.scroll(0, 0);
    if (browser.msie6) {
      pageNode.scrollTop = 0;
    }
  }
}

function scrollGetX() {
  return window.pageXOffset || scrollNode.scrollLeft || document.documentElement.scrollLeft;
}

function scrollGetY() {
  return window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop;
}

function ge(el) {
  return (typeof el == 'string' || typeof el == 'number') ? document.getElementById(el) : el;
}

function geByTag(searchTag, node) {
  node = ge(node) || document;
  return node.getElementsByTagName(searchTag);
}

function geByTag1(searchTag, node) {
  node = ge(node) || document;
  return node.querySelector && node.querySelector(searchTag) || geByTag(searchTag, node)[0];
}

function geByClass(searchClass, node, tag) {
  node = ge(node) || document;
  tag = tag || '*';
  var classElements = [];

  if (!browser.msie8 && node.querySelectorAll && tag != '*') {
    return node.querySelectorAll(tag + '.' + searchClass);
  }
  if (node.getElementsByClassName) {
    var nodes = node.getElementsByClassName(searchClass);
    if (tag != '*') {
      tag = tag.toUpperCase();
      for (var i = 0, l = nodes.length; i < l; ++i) {
        if (nodes[i].tagName.toUpperCase() == tag) {
          classElements.push(nodes[i]);
        }
      }
    } else {
      classElements = Array.prototype.slice.call(nodes);
    }
    return classElements;
  }

  var els = geByTag(tag, node);
  var pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');
  for (var i = 0, l = els.length; i < l; ++i) {
    if (pattern.test(els[i].className)) {
      classElements.push(els[i]);
    }
  }
  return classElements;
}

function geByClass1(searchClass, node, tag) {
  node = ge(node) || document;
  tag = tag || '*';
  return !browser.msie8 && node.querySelector && node.querySelector(tag + '.' + searchClass) || geByClass(searchClass, node, tag)[0];
}

function gpeByClass(className, elem, stopElement) {
  elem = ge(elem);
  if (!elem) return null;
  while (stopElement !== elem && (elem = elem.parentNode)) {
    if (hasClass(elem, className)) return elem;
  }
  return null;
}

function domClosest(className, elem) {
  if (hasClass(elem, className)) return elem;
  return gpeByClass(className, elem);
}

function ce(tagName, attr, style) {
  var el = document.createElement(tagName);
  if (attr) extend(el, attr);
  if (style) setStyle(el, style);
  return el;
}

window.cf = (function(doc) {
  var frag = doc.createDocumentFragment(),
      elem = doc.createElement('div'),
      range = doc.createRange && doc.createRange();
  frag.appendChild(elem);
  range && range.selectNodeContents(elem);

  return range && range.createContextualFragment ?
    function (html) {
      if (!html) return doc.createDocumentFragment();
      return range.createContextualFragment(html);
    } :
    function (html) {
      if (!html) return doc.createDocumentFragment();
      elem.innerHTML = html;
      var frag = doc.createDocumentFragment();
      while (elem.firstChild) {
        frag.appendChild(elem.firstChild);
      }
      return frag;
    };
})(document);

function re(el) {
  el = ge(el);
  if (el && el.parentNode) el.parentNode.removeChild(el);
  return el;
}

function se(html) {
  return domFC(ce('div', {innerHTML: html}));
}

function sech(html) {
  return domChildren(ce('div', {innerHTML: html}));
}

function rs(html, repl) {
  each (repl, function(k, v) {
    html = html.replace(new RegExp('%' + k + '%', 'g'), v);
  });
  return html;
}

function psr(html) {
  if (locProtocol != 'https:') return html;
  html = html.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, 'https://$1');
  html = html.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, 'https://pp.vk.me/c$3/$4');
  html = html.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, 'https://pp.vk.me/c$1/$3');
  html = html.replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, 'https://ps.vk.me/c$1/');
  html = html.replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, 'https://ps.vk.me/v$1/');
  return html;
}

function domEL(el, p) {
  p = p ? 'previousSibling' : 'nextSibling';
  while (el && !el.tagName) el = el[p];
  return el;
}

function domNS(el) {
  return domEL((el || {}).nextSibling);
}

function domPS(el) {
  return domEL((el || {}).previousSibling, 1);
}

function domFC(el) {
  return domEL((el || {}).firstChild);
}

function domLC(el) {
  return domEL((el || {}).lastChild, 1);
}

function domPN(el) {
  return (el || {}).parentNode;
}

function domChildren(el) {
  var chidlren = [];
  var nodes = el.childNodes;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tagName) {
      chidlren.push(nodes[i]);
    }
  }
  return chidlren;
}

function domInsertBefore(el, before) {
  var parent = domPN(before);
  return parent && parent.insertBefore(el, before);
}

function domInsertAfter(el, after) {
  var parent = domPN(after);
  return parent && parent.insertBefore(el, domNS(after));
}

function domByClass(el, searchClass) {
  if (!el) return el;
  return geByClass1(searchClass, el);
}

function domData(el, name, value) {
  if (!el) {
    return null;
  }

  if (typeof value != 'undefined') {
    if (value === null) {
      el.removeAttribute('data-' + name);
    } else {
      el.setAttribute('data-' + name, value);
    }

    return value;
  } else {
    return el.getAttribute('data-' + name);
  }
}

function matchesSelector(el, selector) {
  el = ge(el);
  if (!el || el == document) return false;

  var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || function(selector) {
    var nodes = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(selector);
    for (var i = nodes.length; --i >= 0 && nodes[i] !== this; ) ;
    return i > -1;
  };

  return matches.call(el, selector);
}

function isHover(el) {
  return matchesSelector(el, ':hover');
}

function isAncestor(el, ancestor) {
  var current = ge(el);
  ancestor = ge(ancestor);
  if (!el || !ancestor) {
    return false;
  }
  while (current = current.parentNode) {
    if (current == ancestor) {
      return true;
    }
  }
  return false;
}

function domQuery(selectors, parent) {
  return (parent || document).querySelectorAll(selectors);
}
function domQuery1(selector, parent) {
  return (parent || document).querySelector(selector);
}
function domReplaceEl(oldEl, newEl) {
  if (isString(newEl)) {
    newEl = se(newEl);
  }
  domPN(oldEl).replaceChild(newEl, oldEl);
  return newEl;
}
function domChildIndex(child) {
  var i = 0;
  while ((child = domPS(child)) != null) {
    i++;
  }
  return i;
}

function domClosestPositioned(el, opts) {
  opts = opts || {};
  var parent = opts.fromEl || domPN(el),
      positions = opts.positions || ['relative', 'absolute', 'fixed'];
  while (parent && parent != bodyNode) {
    var elPos = getStyle(parent, 'position');

    if (inArray(elPos, positions) && (!opts.noOverflow || getStyle(parent, 'overflow') != 'hidden')) {
      break;
    }

    parent = domPN(parent);
  }

  return parent;
}

function show(elem) {
  var l = arguments.length;
  if (l > 1) {
    for (var i = 0; i < l; i++) {
      show(arguments[i]);
    }
    return;
  }

  elem = ge(elem);
  if (!elem || !elem.style) return;

  var old = elem.olddisplay;
  var newStyle = 'block';
  var tag = elem.tagName.toLowerCase();
  elem.style.display = old || '';

  if (getStyle(elem, 'display') !== 'none') {
    return;
  }

  if (hasClass(elem, 'inline') || hasClass(elem, '_inline')) {
    newStyle = 'inline';
  } else if (hasClass(elem, '_inline_block')) {
    newStyle = 'inline-block';
  } else if (tag === 'tr' && !browser.msie) {
    newStyle = 'table-row';
  } else if (tag === 'table' && !browser.msie) {
    newStyle = 'table';
  } else {
    newStyle = 'block';
  }
  elem.style.display = elem.olddisplay = newStyle;
}

function hide(elem) {
  var l = arguments.length;
  if (l > 1) {
    for (var i = 0; i < l; i++) {
      hide(arguments[i]);
    }
    return;
  }

  elem = ge(elem);
  if (!elem || !elem.style) return;

  var display = getStyle(elem, 'display');
  elem.olddisplay = ((display != 'none') ? display : '');
  elem.style.display = 'none';
}

function isVisible(elem) {
  elem = ge(elem);
  if (!elem || !elem.style) return false;
  return getStyle(elem, 'display') != 'none';
}

function clientHeight() {
  return window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
}

function getClientRectOffsetY(elem, part, offset) {
  elem = ge(elem);
  offset = offset || 0;
  var ey = getXY(elem)[1],
      eh = getSize(elem)[1],
      w = window, de = document.documentElement,
      ch = Math.max(intval(w.innerHeight), intval(de.clientHeight)),
      fixed_head = ge('page_header_cont'),
      hh = getSize(fixed_head)[1],
      st = (de.scrollTop || bodyNode.scrollTop || window.scrollY || 0);
  if (!part) {
    if (ey < st + hh + offset) return (ey - st + hh - offset);
    if (ey + eh > st + ch - offset) return (ey + eh - st - ch + offset);
  } else {
    if (ey + eh < st + hh + offset) return (ey + eh - st - hh - offset);
    if (ey > st + ch - offset) return (ey - st - ch + offset);
  }
  return 0;
}

function toggle(elem, v) {
  if (v === undefined) {
    v = !isVisible(elem);
  }
  if (v) {
    show(elem);
  } else {
    hide(elem);
  }
  return v;
}

window.hfTimeout = 0;

function toggleFlash(show, timeout) {
  //if (/mac/i.test(navigator.userAgent)) return;
  clearTimeout(hfTimeout);
  if (timeout > 0) {
    hfTimeout = setTimeout(function() {toggleFlash(show, 0)}, timeout);
    return;
  }

  var vis = show ? 'visible' : 'hidden';

  triggerEvent(document, show ? 'unblock' : 'block');

  var f = function() {
    if (this.getAttribute('preventhide')) {
      return;
    } else if (this.id == 'flash_app' && browser.msie) {

      show ? setStyle(this, {position: 'static', top: 0}) : setStyle(this, {position: 'absolute', top: '-5000px'});
    } else {
      this.style.visibility = vis;
    }
  };
  each(geByTag('embed'), f);
  each(geByTag('object'), f);
}

function boundingRectEnabled(obj) {
  return (typeof obj.getBoundingClientRect !== 'undefined');
}

function getXYRect(obj, notBounding) {
  var rect;
  if (notBounding && getStyle(obj, 'display') == 'inline') {
    var rects = obj.getClientRects();
    rect = rects && rects[0] || obj.getBoundingClientRect();
  } else {
    rect = obj.getBoundingClientRect();
  }

  return rect;
}

function getXY(obj, forFixed) {
  obj = ge(obj);
  if (!obj) return [0,0];

  var docElem, win,
      rect = {top: 0, left: 0},
      doc = obj.ownerDocument;
  if (!doc) {
    return [0, 0];
  }
  docElem = doc.documentElement;

  if (boundingRectEnabled(obj)) {
    rect = getXYRect(obj, true);
  }
  win = doc == doc.window ? doc : (doc.nodeType === 9 ? doc.defaultView || doc.parentWindow : false);
  return [
    rect.left + (!forFixed ? win.pageXOffset || docElem.scrollLeft : 0) - (docElem.clientLeft || 0),
    rect.top + (!forFixed ? win.pageYOffset || docElem.scrollTop : 0) - (docElem.clientTop || 0)
  ];
}

function isWindow(el) {
  return el != null && el === el.window;
}

var DISPLAY_SWAP_RGX = /^(none|table(?!-c[ea]).+)/;

function getSize(elem, withoutBounds, notBounding) {
  elem = ge(elem);
  var s = [0, 0], de = document.documentElement, rect;
  if (withoutBounds && getStyle(elem, 'boxSizing') === 'border-box') {
    withoutBounds = false;
  }
  if (elem == document) {
    s = [Math.max(
        de.clientWidth,
        bodyNode.scrollWidth, de.scrollWidth,
        bodyNode.offsetWidth, de.offsetWidth
      ), Math.max(
        de.clientHeight,
        bodyNode.scrollHeight, de.scrollHeight,
        bodyNode.offsetHeight, de.offsetHeight
      )];
  } else if (elem){
    function getWH() {
      if (boundingRectEnabled(elem) && (rect = getXYRect(elem, notBounding)) && rect.width !== undefined) {
        s = [rect.width, rect.height];
      } else {
        s = [elem.offsetWidth, elem.offsetHeight];
      }
      if (!withoutBounds) return;
      var padding = 0, border = 0;
      each(s, function(i, v) {
        var which = i ? ['Top', 'Bottom'] : ['Left', 'Right'];
        each(which, function(){
          s[i] -= parseFloat(getStyle(elem, 'padding' + this)) || 0;
          s[i] -= parseFloat(getStyle(elem, 'border' + this + 'Width')) || 0;
        });
      });
    }
    if (!isVisible(elem)) {
      var props = {position: 'absolute', visibility: 'hidden', display: 'block'};
      var old = {}, old_cssText = false;
      if (elem.style.cssText.indexOf('!important') > -1) {
        old_cssText = elem.style.cssText;
      }
      each(props, function(i, v) {
        old[i] = elem.style[i];
        elem.style[i] = v;
      });
      getWH();
      each(props, function(i, v) {
        elem.style[i] = old[i];
      });
      if (old_cssText) {
        elem.style.cssText = old_cssText;
      }
    } else getWH();

  }
  return s;
}

function getW(el) {
  return getSize(el)[0];
}

function getH(el) {
  return getSize(el)[1];
}

// deprecated
function _getSize(elem, withoutBounds, notBounding) {
  elem = ge(elem);
  var s = [0, 0], de = document.documentElement, rect;
  if (withoutBounds && getStyle(elem, 'boxSizing') === 'border-box') {
    withoutBounds = false;
  }
  if (elem == document) {
    s = [Math.max(
        de.clientWidth,
        bodyNode.scrollWidth, de.scrollWidth,
        bodyNode.offsetWidth, de.offsetWidth
      ), Math.max(
        de.clientHeight,
        bodyNode.scrollHeight, de.scrollHeight,
        bodyNode.offsetHeight, de.offsetHeight
      )];
  } else if (elem){
    function getWH() {
      if (boundingRectEnabled(elem) && (rect = getXYRect(elem, notBounding)) && rect.width !== undefined) {
        s = [rect.width, rect.height];
      } else {
        s = [elem.offsetWidth, elem.offsetHeight];
      }
      if (!withoutBounds) return;
      var padding = 0, border = 0;
      each(s, function(i, v) {
        var which = i ? ['Top', 'Bottom'] : ['Left', 'Right'];
        each(which, function(){
          s[i] -= parseFloat(getStyle(elem, 'padding' + this)) || 0;
          s[i] -= parseFloat(getStyle(elem, 'border' + this + 'Width')) || 0;
        });
      });
    }
    if (!isVisible(elem)) {
      var props = {position: 'absolute', visibility: 'hidden', display: 'block'};
      var old = {}, old_cssText = false;
      if (elem.style.cssText.indexOf('!important') > -1) {
        old_cssText = elem.style.cssText;
      }
      each(props, function(i, v) {
        old[i] = elem.style[i];
        elem.style[i] = v;
      });
      getWH();
      each(props, function(i, v) {
        elem.style[i] = old[i];
      });
      if (old_cssText) {
        elem.style.cssText = old_cssText;
      }
    } else getWH();

  }
  return s;
}

function getZoom() {
  var r1 = ge('zoom_test_1') || document.body.appendChild(ce('div', {id: 'zoom_test_1'}, {left: '10%', position: 'absolute', visibility: 'hidden'})),
      r2 = ge('zoom_test_2') || document.body.appendChild(ce('div', {id: 'zoom_test_2'}, {left: r1.offsetLeft + 'px', position: 'absolute', visibility: 'hidden'}));
  return r2.offsetLeft / r1.offsetLeft;
}

function imagesLoader(cont, options) {
  var default_options = {
        top_load: 0,
        bottom_load: 2,
        load_limit: 10,
        need_load_class: '__need_load',
        skip_process_load: false,
        use_iframe: false
      },
      loading_times = [],
      loading_cnt = 0,
      loading_to = null,
      opts = extend(default_options, options)
      obj = {};

  function giftLoaded(src, no_force) {
    if (loading_times[src]) {
      --loading_cnt;
      delete loading_times[src];
    }
    if (!no_force) {
      obj.processLoad();
    }
  }

  function getImgY(img) {
    var top = 0, obj = img;
    if (obj && obj.offsetParent) {
      do {
        top += obj.offsetTop;
        if (cont && obj.offsetParent === cont) break;
      } while (obj = obj.offsetParent);
    }
    return top;
  }

  obj.processLoad = function() {
    for (var src in loading_times) {
      var arr = loading_times[src], loading_time = arr[0], img = arr[1];
      if (img.width || img.height || vkNow() - loading_time > 20000) {
        if (loading_times[src]) {
          giftLoaded.call(img, src, true);
        }
      }
    }
    clearTimeout(loading_to);
    if (loading_cnt) {
      loading_to = setTimeout(obj.processLoad, 500);
    }
    if (loading_cnt >= opts.load_limit) return;

    var images = geByClass(opts.need_load_class, cont || bodyNode),
        changed_images = [];
    if (cont) {
      var cont_h = cont.offsetHeight,
          cont_top = cont.scrollTop - cont_h * opts.top_load,
          cont_bottom = cont.scrollTop + cont_h * opts.bottom_load;
    }
    for (var i = 0, l = images.length; i < l && loading_cnt < opts.load_limit; i++) {
      var img = images[i];
      if (img.tagName != 'IMG') continue;

      var src = img.getAttribute('data-src');
      if (src) {
        if (cont) {
          var imgY = getImgY(img);
          var imgB = imgY + img.parentNode.offsetHeight;
          if (imgY > cont_bottom) continue;
          if (imgB < cont_top) continue;
        }

        changed_images.push([img, src]);
      }
    }

    each(changed_images, function() {
      var img = this[0], src = this[1];
      obj.iloader && obj.iloader.add(src, giftLoaded, img);
      img.src = src;
      img.removeAttribute('data-src');
      removeClass(img, opts.need_load_class);
      if (!loading_times[src]) {
        ++loading_cnt;
        loading_times[src] = [vkNow(), img];
      }
    });

    clearTimeout(loading_to);
    if (loading_cnt) {
      loading_to = setTimeout(obj.processLoad, 500);
    }
  }

  obj.destroy = function() {
    loading_times = [];
    loading_cnt = 0;
    clearTimeout(loading_to);
  }

  if (opts.use_iframe && window.IframeLoader) {
    obj.iloader = new IframeLoader();
  }
  if (!opts.skip_process_load) {
    obj.processLoad();
  }
  return obj;
}

function IframeLoader() {
  var iframe, doc, body, index, sources, aborted_sources;

  function iframeDoc(i) {
    try {
      if (i.contentDocument) return i.contentDocument;
      if (i.contentWindow && i.contentWindow.document) return i.contentWindow.document;
      return i.document;
    } catch (e) {};
    return false;
  }
  function getImgHtml(i) {
    if (doc && doc.body) return '<img id="___img' + i + '" />';
    else return '<img class="___img' + i + '" />';
  }
  function getImg(i) {
    if (doc && doc.body) return doc.getElementById('___img' + i);
    else return geByClass1('___img' + i, body);
  }
  function init() {
    iframe = utilsNode.appendChild(ce('iframe'));
    doc = iframeDoc(iframe);
    if (doc && doc.body) {
      body = doc.body;
    } else {
      body = utilsNode.appendChild(ce('div', {}, {display: 'none'}));
    }
    index = 0;
    sources = [];
  }
  function add(src, onLoad, that) {
    var i = index++;
    sources[i] = {src: src, onLoad: onLoad, that: that};
    body.appendChild(ce('div', {innerHTML: getImgHtml(i)}));
    var img = getImg(i);
    img.src = src;
    img.onload = function() {
      var obj = sources[i];
      if (!obj) return;
      obj.onLoad && obj.onLoad.call(obj.that || window, obj.src);
      delete sources[i];
      body.removeChild(getImg(i).parentNode);
    }
  }
  function abort() {
    re(iframe);
    aborted_sources = [];
    for (var k in sources) {
      aborted_sources.push(sources[k]);
    }
    init();
  }
  function repeat(need_redraw) {
    if (!aborted_sources) return [];
    var objs = [];
    for (var k in aborted_sources) {
      var obj = aborted_sources[k];
      add(obj.src, obj.onLoad, obj.that);
      objs.push(obj.that);
    }
    aborted_sources = null;
    if (need_redraw) {
      var redraw_data = [];
      each(objs, function() {
        redraw_data.push([this, this.src]);
        this.src = '';
        hide(this);
      });
      setTimeout(function(){
        each(redraw_data, function() {
          var img = this[0], src = this[1];
          img.src = src;
          show(img);
        });
      }, 10);
    }
    return objs;
  }

  init();

  return {
    add: add,
    abort: abort,
    repeat: repeat
  }
}

function renderFlash(cont, opts, params, vars) {
  if (!opts.url || !opts.id) {
    return false;
  }
  opts = extend({
    version: 9,
    width: 1,
    height: 1
  }, opts);
  var f = opts.url;
  if (!stVersions[f]) {
    stVersions[f] = '';
  }
  if (__debugMode && stVersions[f] < 1000000) stVersions[f] += irand(1000000, 2000000);

  if (stVersions[f]) {
    opts.url += ((opts.url.indexOf('?') == -1) ? '?' : '&') + '_stV=' + stVersions[f];
  }

  params = extend({
    quality: 'high',
    flashvars: ajx2q(vars)
  }, params);
  if (browser.flash < opts.version) return false;
  ge(cont).innerHTML = browser.flashwrap(opts, params);
  return true;
}

function onBodyResize(force) {
  var w = window, de = document.documentElement;
  if (!w.pageNode) return;
  var dwidth = Math.max(intval(w.innerWidth), intval(de.clientWidth));
  var dheight = Math.max(intval(w.innerHeight), intval(de.clientHeight));
  var sbw = sbWidth();

  if (browser.mobile) {
    dwidth = Math.max(dwidth, intval(bodyNode.scrollWidth));
    dheight = Math.max(dheight, intval(bodyNode.scrollHeight));
  } else if (browser.msie7) {
    if (htmlNode.scrollHeight > htmlNode.offsetHeight) {
      dwidth += sbw + 1;
    }
  } else if (browser.msie8) {
    if (htmlNode.scrollHeight + 3 > htmlNode.offsetHeight) {
      dwidth += sbw + 1;
    }
  }
  if (w.lastWindowWidth != dwidth || force === true) {
    w.lastInnerWidth = w.lastWindowWidth = dwidth;

    if (bodyNode.offsetWidth < layoutWidth + sbw + 2) {
      dwidth = layoutWidth + sbw + 2;
    }
    if (dwidth) {
      for (var el = pageNode.firstChild; el; el = el.nextSibling) {
        if (!el.tagName) continue;
        for (var e = el.firstChild; e; e = e.nextSibling) {
          if (e.className == 'scroll_fix') {
            e.style.width = ((w.lastInnerWidth = (dwidth - sbw * (browser.msie7 ? 2 : 1) - 1)) - 1) + 'px';
          }
        }
      }
    }
  }
  if (w.lastWindowHeight != dheight || force === true) {
    w.lastWindowHeight = dheight;
    if (browser.msie6) {
      pageNode.style.height = dheight + 'px';
    }
  }
  if (cur.lSTL) {
    setStyle(cur.lSTL, {width: Math.max(getXY(cur.lSTL.el)[0], 0), height: dheight - 1});
  }
}

function redraw(el, fixedClass) {
  if (el && getStyle(el, 'position') == 'fixed') {
    fixedClass ? removeClass(el, fixedClass) : setStyle(el, {position: 'relative'});
    el.offsetLeft;
    fixedClass ? addClass(el, fixedClass) : setStyle(el, {position: 'fixed'});
  }
}

function getProgressHtml(id, cls) {
  return rs(vk.pr_tpl, {id: id || '', cls: cls || ''});
}

function showProgress(el, id, doInsertBefore) {
  el = ge(el);
  if (!el) return;

  var prel = se(rs(vk.pr_tpl, {id: id || ''}));

  if (doInsertBefore) {
    domInsertBefore(prel, el);
  } else {
    el.appendChild(prel);
  }
  setTimeout(function(){
    setStyle(prel, {opacity: 1});
  });
  return prel;
}

function hideProgress(el) {
  if (el) {
    re(geByClass1('pr', el));
  }
}

function disableEl(el) {
  setStyle(el, 'pointer-events', 'none')
}

function enableEl(el) {
  setStyle(el, 'pointer-events', '')
}

function throttle(fn, time) {
  var timeout;

  return function() {
    if (!timeout) {
      fn.apply(this, arguments);
      timeout = setTimeout(function() {
        timeout = false;
      }, time)
    }
  };
}

function shuffle(arr) {
  var counter = arr.length,
      temp,
      index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
}

function getProgressHtml(id, cls) {
  return rs(vk.pr_tpl, {id: id || '', cls: cls || ''});
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

function domCA(el, selector) {
  var matches = selector ?
                matchesSelector :
                function() { return true; };
  do {
    el = domPN(el);
  } while(el && !matchesSelector(el, selector));
  return el;
}

function matchesSelector(el, selector) {
  var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || function(selector) {
    var nodes = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(selector);
    for (var i = nodes.length; --i >= 0 && nodes[i] !== this; ) ;
    return i > -1;
  };

  return matches.call(el, selector);
}

function isHover(el) {return matchesSelector(el, ':hover');}

function isAncestor(el, ancestor) {
  var current = ge(el);
  ancestor = ge(ancestor);
  if (!el || !ancestor) {
    return false;
  }
  while (current = current.parentNode) {
    if (current == ancestor) {
      return true;
    }
  }
  return false;
}

function getScroll() {
  var b = (browser.msie6) ? ge('PageContainer') : document.body, de = document.documentElement;
  return [b.scrollLeft || de.scrollLeft || window.pageXOffset || 0, b.scrollTop || de.scrollTop  || window.pageYOffset || 0,
  de.clientWidth || b.clientWidth || 0, de.clientHeight || b.clientHeight || 0];
}

/* CSS */

window.whitespaceRegex = /[\t\r\n\f]/g;

function hasClass(obj, name) {
  if (obj = ge(obj)) {
    name = trim(name).replace(window.whitespaceRegex, ' ').split(' ');
    var result = true,
      names = (' ' + obj.className + ' ').replace(window.whitespaceRegex, ' ');
    each(name, function(i, name) {
      return (result = names.indexOf(' ' + name + ' ') >= 0);
    });
    return result;
  }
}

function addClass(obj, name) {
  if ((obj = ge(obj)) && !hasClass(obj, name = trim(name).replace(window.whitespaceRegex, ' '))) {
    obj.className = (obj.className ? obj.className + ' ' : '') + name;
  }
}

function removeClass(obj, name) {
  if (obj = ge(obj)) {
    name = trim(name).replace(window.whitespaceRegex, ' ').split(' ').join('|');
    obj.className = trim((obj.className || '').replace((new RegExp('\\b(' + name + ')\\b', 'g')), ' '));
  }
}

function toggleClass(obj, name, v) {
  if (v === undefined) {
    v = !hasClass(obj, name);
  }
  (v ? addClass : removeClass)(obj, name);
  return v;
}

function addClassDelayed(obj, name) { setTimeout(addClass.pbind(obj, name), 0); }
function removeClassDelayed(obj, name) { setTimeout(removeClass.pbind(obj, name), 0); }
function toggleClassDelayed(obj, name, v) {
  if (v === undefined) {
    v = !hasClass(obj, name);
  }
  (v ? addClassDelayed : removeClassDelayed)(obj, name);
  return v;
}

function replaceClass(obj, oldName, newName) {
  removeClass(obj, oldName);
  addClass(obj, newName);
}

var cssTransformProp = (function(){
  var testEl = document.createElement('div');
  if(testEl.style.transform == null) {
    var vendors = ['Webkit', 'Moz', 'ms'];
    for(var vendor in vendors) {
      if(testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
        return vendors[vendor] + 'Transform';
      }
    }
  }
  return 'transform';
})();

function getStyle(elem, name, force) {
  elem = ge(elem);
  if (isArray(name)) { var res = {}; each(name, function(i,v){res[v] = getStyle(elem, v);}); return res; }
  if (!elem) return '';
  if (force === undefined) {
    force = true;
  }
  if (!force && name == 'opacity' && browser.msie) {
    var filter = elem.style['filter'];
    return filter ? (filter.indexOf('opacity=') >= 0 ?
      (parseFloat(filter.match(/opacity=([^)]*)/)[1] ) / 100) + '' : '1') : '';
  }
  if (!force && elem.style && (elem.style[name] || name == 'height')) {
    return elem.style[name];
  }

  var ret, defaultView = document.defaultView || window;
  if (defaultView.getComputedStyle) {
    name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    var computedStyle = defaultView.getComputedStyle(elem, null);
    if (computedStyle) {
      ret = computedStyle.getPropertyValue(name);
    }
  } else if (elem.currentStyle) {
    if (name == 'opacity' && browser.msie) {
      var filter = elem.currentStyle['filter'];
      return filter && filter.indexOf('opacity=') >= 0 ?
        (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + '' : '1';
    }
    var camelCase = name.replace(/\-(\w)/g, function(all, letter){
      return letter.toUpperCase();
    });
    ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
    //dummy fix for ie
    if (ret == 'auto') {
      ret = 0;
    }

    ret = (ret + '').split(' ');
    each(ret, function(i,v) {
      if (!/^\d+(px)?$/i.test(v) && /^\d/.test(v)) {
        var style = elem.style, left = style.left, rsLeft = elem.runtimeStyle.left;
        elem.runtimeStyle.left = elem.currentStyle.left;
        style.left = v || 0;
        ret[i] = style.pixelLeft + 'px';
        style.left = left;
        elem.runtimeStyle.left = rsLeft;
      }
    });
    ret = ret.join(' ');
  }

  if (force && (name == 'width' || name == 'height')) {
    var ret2 = getSize(elem, true)[({'width': 0, 'height': 1})[name]];
    ret = (intval(ret) ? Math.max(floatval(ret), ret2) : ret2) + 'px';
  }

  return ret;
}

function setStyle(elem, name, value){
  elem = ge(elem);
  if (!elem) return;
  if (typeof name == 'object') return each(name, function(k, v) { setStyle(elem,k,v); });
  if (name == 'opacity') {
    if (browser.msie) {
      if ((value + '').length) {
        if (value !== 1) {
          elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
        } else {
          elem.style.filter = '';
        }
      } else {
        elem.style.cssText = elem.style.cssText.replace(/filter\s*:[^;]*/gi, '');
      }
      elem.style.zoom = 1;
    };
    elem.style.opacity = value;
  } else {
    try{
      var isN = typeof(value) == 'number';
      if (isN && (/height|width/i).test(name)) value = Math.abs(value);
      elem.style[name] = isN && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name) ? value + 'px' : value;
    } catch(e){debugLog('setStyle error: ', [name, value], e);}
  }
}

function setPseudoStyle(elem, pseudo, style) {
  var pid = data(elem, 'pseudo-id');
  if (!pid) {
    data(elem, 'pseudo-id', pid = irand(100000000, 999999999));
    addClass(elem, '_pseudo_' + pid);
  }
  var sid = pseudo + '-style-' + pid,
      stel = ge(sid),
      css = '._pseudo_' + pid + ':' + pseudo + '{';
  if (!stel) {
    stel = headNode.appendChild(ce('style', {
      id: sid,
      type: 'text/css'
    }));
  }
  each(style, function(k, v) {
    css += k + ': ' + v + ' !important;';
  });
  css += '}';
  if (stel.sheet) {
    if (stel.sheet.cssRules.length) {
      stel.sheet.deleteRule(0);
    }
    stel.sheet.insertRule(css, 0);
  } else if (stel.styleSheet) {
    stel.styleSheet.cssText = css;
  }
}

/* Animation */

function animate(el, params, speed, callback) {
  el = ge(el);
  if (!el) return;
  var _cb = isFunction(callback) ? callback : function() {};
  var options = extend({}, typeof speed == 'object' ? speed : {duration: speed, onComplete: _cb});
  var fromArr = {}, toArr = {}, visible = isVisible(el), self = this, p;
  options.orig = {};
  params = clone(params);
  if (params.discrete) {
    options.discrete = 1;
    delete(params.discrete);
  }
  if (browser.iphone)
    options.duration = 0;
  var tween = data(el, 'tween'), i, name, toggleAct = visible ? 'hide' : 'show';
  if (tween && tween.isTweening) {
    options.orig = extend(options.orig, tween.options.orig);
    tween.stop(false);
    if (tween.options.show) toggleAct = 'hide';
    else if (tween.options.hide) toggleAct = 'show';
  }
  for (p in params)  {
    if (!tween && (params[p] == 'show' && visible || params[p] == 'hide' && !visible)) {
      return options.onComplete.call(this, el);
    }
    if ((p == 'height' || p == 'width') && el.style) {
      if (!params.overflow) {
        if (options.orig.overflow == undefined) {
          options.orig.overflow = getStyle(el, 'overflow');
        }
        el.style.overflow = 'hidden';
      }
      if (!hasClass(el, 'inl_bl') && el.tagName != 'TD') {
        el.style.display = 'block';
      }
    }
    if (/show|hide|toggle/.test(params[p])) {
      if (params[p] == 'toggle') {
        params[p] = toggleAct;
      }
      if (params[p] == 'show') {
        var from = 0;
        options.show = true;
        if (options.orig[p] == undefined) {
          options.orig[p] = getStyle(el, p, false) || '';
          setStyle(el, p, 0);
        }

        var o;
        if (p == 'height' && browser.msie6) {
          o = '0px';
          el.style.overflow = '';
        } else {
          o = options.orig[p];
        }

        var old = el.style[p];
        el.style[p] = o;
        params[p] = parseFloat(getStyle(el, p, true));
        el.style[p] = old;

        if (p == 'height' && browser.msie && !params.overflow) {
          el.style.overflow = 'hidden';
        }
      } else {
        if (options.orig[p] == undefined) {
          options.orig[p] = getStyle(el, p, false) || '';
        }
        options.hide = true;
        params[p] = 0;
      }
    }
  }
  if (options.show && !visible) {
    show(el);
  }
  tween = new Fx.Base(el, options);
  each(params, function(name, to) {
    if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(name)) {
      var p = (name == 'borderColor') ? 'borderTopColor' : name;
      from = getColor(el, p);
      to = getRGB(to);
      if (from === undefined) return;
    } else {
      var parts = to.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
        start = tween.cur(name, true) || 0;
      if (parts) {
        to = parseFloat(parts[2]);
        if (parts[1]) {
          to = ((parts[1] == '-=' ? -1 : 1) * to) + to;
        }
      }

      if (options.hide && name == 'height' && browser.msie6) {
        el.style.height = '0px';
        el.style.overflow = '';
      }
      from = tween.cur(name, true);
      if (options.hide && name == 'height' && browser.msie6) {
        el.style.height = '';
        el.style.overflow = 'hidden';
      }
      if (from == 0 && (name == 'width' || name == 'height'))
        from = 1;

      if (name == 'opacity' && to > 0 && !visible) {
        setStyle(el, 'opacity', 0);
        from = 0;
        show(el);
      }
    }
    if (from != to || (isArray(from) && from.join(',') == to.join(','))) {
      fromArr[name] = from;
      toArr[name] = to;
    }
  });
  tween.start(fromArr, toArr);
  data(el, 'tween', tween);

  return tween;
}

function cubicBezier(x1, y1, x2, y2, t, dt) {
  var curveX = function(t) {
    var v = 1 - t;
    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
  };
  var curveY = function(t) {
    var v = 1 - t;
    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
  };
  var derivativeCurveX = function(t) {
    var v = 1 - t;
    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
  };
  var x = t, t0, t1, t2, xx, d2, i;

  // First try a few iterations of Newton's method -- normally very fast.
  for (t2 = x, i = 0; i < 8; i++){
    xx = curveX(t2) - x;
    if (Math.abs(xx) < dt) {
      return curveY(t2);
    }
    d2 = derivativeCurveX(t2);
    if (Math.abs(d2) < 1e-6) break;
    t2 = t2 - xx / d2;
  }

  t0 = 0, t1 = 1, t2 = x;

  if (t2 < t0) return curveY(t0);
  if (t2 > t1) return curveY(t1);

  // Fallback to the bisection method for reliability.
  while (t0 < t1){
    xx = curveX(t2);
    if (Math.abs(xx - x) < dt) return curveY(t2);
    if (x > xx) t0 = t2;
    else t1 = t2;
    t2 = (t1 - t0) * .5 + t0;
  }

  // Failure
  return curveY(t2);
}

function fadeTo(el, speed, to, callback) {
  return animate(el, {opacity: to}, speed, callback);
}

var Fx = {
  Transitions: {
    linear: function(t, b, c, d) { return c*t/d + b; },
    sineInOut: function(t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; },
    halfSine: function(t, b, c, d) { return c * (Math.sin(Math.PI * (t/d) / 2)) + b; },
    easeOutBack: function(t, b, c, d) { var s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; },
    easeInCirc: function(t, b, c, d) { return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b; },
    easeOutCirc: function(t, b, c, d) { return c * Math.sqrt(1 - (t=t/d-1)*t) + b; },
    easeInQuint: function(t, b, c, d) { return c*(t/=d)*t*t*t*t + b; },
    easeOutQuint: function(t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; },
    easeOutCubic: function(t, b, c, d) { return c*((t=t/d-1)*t*t + 1) + b;},
    swiftOut: function(t, b, c, d) { return c * cubicBezier(0.4, 0, 0.22, 1, t/d, 4/d) + b; }
  },
  Attrs: [
    [ 'height', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom' ],
    [ 'width', 'marginLeft', 'marginRight', 'paddingLeft', 'paddingRight' ],
    [ 'opacity', 'left', 'top' ]
  ],
  Timers: [],
  TimerId: null
}, fx = Fx;

Fx.Base = function(el, options, name) {
  this.el = ge(el);
  this.name = name;
  this.options = extend({
    onStep: function(){},
    onComplete: function() {},
    transition: options.transition || Fx.Transitions.sineInOut,
    duration: 500
  }, options || {});
}

function genFx(type, num) {
  var obj = {};
  each(Fx.Attrs.concat.apply([], Fx.Attrs.slice(0, num)), function() {
    obj[this] = type;
  });
  return obj;
};

// Shortcuts for custom animations
each({slideDown: genFx('show', 1),
  slideUp: genFx('hide', 1),
  slideToggle: genFx('toggle', 1),
  fadeIn: {opacity: 'show'},
  fadeOut: {opacity: 'hide'},
  fadeToggle: {opacity: 'toggle'}}, function(f, v) {
  window[f] = function(el, speed, callback) { return animate(el, v, speed, callback); }
});

// Shortcuts for custom animations
each({slideDown: genFx('show', 1),
  slideUp: genFx('hide', 1),
  slideToggle: genFx('toggle', 1),
  fadeIn: {opacity: 'show'},
  fadeOut: {opacity: 'hide'},
  fadeToggle: {opacity: 'toggle'}}, function(f, val) {
  window[f] = function(el, speed, callback) { return animate(el, val, speed, callback); }
});

Fx.Base.prototype = {
  start: function(from, to){
    this.from = from;
    this.to = to;
    this.time = vkNow();
    this.isTweening = true;

    var self = this;
    function t(gotoEnd) {
      return self.step(gotoEnd);
    }
    t.el = this.el;
    if (t() && Fx.Timers.push(t) && !Fx.TimerId) {
      Fx.TimerId = setInterval(function() {
        var timers = Fx.Timers, l = timers.length;
        for (var i = 0; i < l; i++) {
          if (!timers[i]()) {
            timers.splice(i--, 1);
            l--;
          }
        }
        if (!l) {
          clearInterval(Fx.TimerId);
          Fx.TimerId = null;
        }
      }, 13);
    }
    return this;
  },

  stop: function(gotoEnd) {
    var timers = Fx.Timers;

    for (var i = timers.length - 1; i >= 0; i--) {
      if (timers[i].el == this.el ) {
        if (gotoEnd) {
          timers[i](true);
        }
        timers.splice(i, 1);
      }
    }
    this.isTweening = false;
  },

  step: function(gotoEnd) {
    var time = vkNow();
    if (!gotoEnd && time < this.time + this.options.duration) {
      this.cTime = time - this.time;
      this.now = {};
      for (p in this.to) {
        // color fx
        if (isArray(this.to[p])) {
          var color = [], j;
          for (j = 0; j < 3; j++) {
            if (this.from[p] === undefined || this.to[p] === undefined) {
              return false;
            }
            color.push(Math.min(parseInt(this.compute(this.from[p][j], this.to[p][j])), 255));
          }
          this.now[p] = color;
        } else {
          this.now[p] = this.compute(this.from[p], this.to[p]);
          if (this.options.discrete) this.now[p] = intval(this.now[p]);
        }
      }
      this.update();
      return true;
    } else {
      setTimeout(this.options.onComplete.bind(this, this.el), 10);
      this.now = extend(this.to, this.options.orig);
      this.update();
      if (this.options.hide) hide(this.el);
      this.isTweening = false;
      return false;
    }
  },

  compute: function(from, to){
    var change = to - from;
    return this.options.transition(this.cTime, from, change, this.options.duration);
  },

  update: function(){
    this.options.onStep(this.now);
    for (var p in this.now) {
      if (isArray(this.now[p])) setStyle(this.el, p, 'rgb(' + this.now[p].join(',') + ')');
      else this.el[p] != undefined ? (this.el[p] = this.now[p]) : setStyle(this.el, p, this.now[p]);
    }
  },

  cur: function(name, force){
    if (this.el[name] != null && (!this.el.style || this.el.style[name] == null))
      return this.el[name];
    return parseFloat(getStyle(this.el, name, force)) || 0;
  }
};

function cssAnim(obj, prep, opts, callb) {
  var v = intval(browser.version);
  if (obj && ((browser.chrome && v > 14) || (browser.mozilla && v > 13) || (browser.opera && v > 2))) {
    var callbWrap;
    var st = 'all '+opts.duration+'ms '+(opts.func || 'ease-out');
    obj.style.WebkitTransition = st;
    obj.style.MozTransition = st;
    obj.style.OTransition = st;
    obj.style.transition = st;
    var callbWrap = function() {
      if (browser.opera && intval(browser.version) <= 12) {
        obj.removeEventListener('oTransitionEnd', callbWrap);
      } else {
        removeEvent(obj, 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', callbWrap);
      }
      obj.style.WebkitTransition = '';
      obj.style.MozTransition = '';
      obj.style.OTransition = '';
      obj.style.transition = '';
      if (callb) callb();
      return false;
    }
    if (callb) {
      if (browser.opera && intval(browser.version) <= 12) {
        obj.addEventListener('oTransitionEnd', callbWrap)
      } else {
        addEvent(obj, 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', callbWrap);
      }
    }
    setTimeout(setStyle.pbind(obj, prep), 0);
  } else {
    animate(obj, prep, extend(opts, {onComplete: callb}));
  }
}

function animateCount(el, newCount, opts) {
  el = ge(el);
  opts = opts || {};

  if (opts.str) {
    newCount = trim(newCount.toString()) || '';
  } else {
    newCount = positive(newCount);
  }
  if (!el) return;
  if (browser.mobile && !browser.safari_mobile && !browser.android) {
    val(el, newCount || '');
    return;
  }

  var curCount = data(el, 'curCount'),
    nextCount = data(el, 'nextCount');

  if (typeof nextCount == 'number' || opts.str && typeof nextCount == 'string') {
    if (newCount != nextCount) {
      data(el, 'nextCount', newCount);
    }
    return;
  }
  if (typeof curCount == 'number' || opts.str && typeof curCount == 'string') {
    if (newCount != curCount) {
      data(el, 'nextCount', newCount);
    }
    return;
  }
  if (opts.str) {
    curCount = trim(val(el).toString()) || '';
  } else {
    curCount = positive(val(el));
  }
  if (opts.str === 'auto') {
    opts.str = !curCount.match(/^\d+$/) || !newCount.match(/^\d+$/);
    if (!opts.str) {
      curCount = positive(curCount);
      newCount = positive(newCount);
    }
  }
  if (curCount == newCount) {
    return;
  }
  data(el, 'curCount', newCount);
  var incr = opts.str ? (curCount.length == newCount.length ? curCount < newCount : curCount.length < newCount.length) : curCount < newCount,
    big = (incr ? newCount : curCount).toString(),
    small = (incr ? curCount : newCount).toString(),
    constPart = [],
    constEndPart = [],
    bigPart = '',
    smallPart = '',
    i, l, j;

  if (!opts.str) {
    small = ((new Array(big.length - small.length + 1)).join('0')) + small;
  }
  for (i = 0, l = big.length; i < l; i++) {
    if ((j = big.charAt(i)) !== small.charAt(i)) {
      break;
    }
    constPart.push(j);
  }
  bigPart = big.substr(i);
  smallPart = small.substr(i);

  if (opts.str) {
    for (i = bigPart.length; i > 0; i--) {
      if ((j = bigPart.charAt(i)) !== smallPart.charAt(i)) {
        break;
      }
      constEndPart.unshift(j);
    }
    if (constEndPart.length) {
      bigPart = bigPart.substr(0, i + 1);
      smallPart = smallPart.substr(0, i + 1);
    }
  }

  constPart = constPart.join('').replace(/\s$/, '&nbsp;');
  constEndPart = constEndPart.join('').replace(/^\s/, '&nbsp;');

  if (!trim(val(el)) && !opts.noSpaceIfEmpty) {
    val(el, '&nbsp;');
  }
  var h = el.clientHeight || el.offsetHeight;
  val(el, '<div class="counter_wrap inl_bl"></div>');
  var wrapEl = el.firstChild,
    constEl1, constEl2, animwrapEl, animEl,
    vert = true;

  if (constPart.length) {
    wrapEl.appendChild(constEl1 = ce('div', {className: 'counter_const inl_bl', innerHTML: constPart}));
  }
  if (!constPart.length) {
    smallPart = smallPart.replace(/^0+/, '');
  }
  if (!smallPart || smallPart == '0' && !constPart.length) {
    smallPart = '&nbsp;';
    vert = constPart.length ? true : false;
  }

  wrapEl.appendChild(animwrapEl = ce('div', {className: 'counter_anim_wrap inl_bl'}));
  animwrapEl.appendChild(animEl = ce('div', {
    className: 'counter_anim ' + (incr ? 'counter_anim_inc' : 'counter_anim_dec'),
    innerHTML: '<div class="counter_anim_big"><span class="counter_anim_big_c">' + bigPart + '</span></div>' +
    (vert ? '<div class="counter_anim_small"><span class="counter_anim_small_c">' + smallPart + '</span></div>' : '')
  }, vert ? {marginTop: incr ? -h : 0} : {right: 0}));
  if (opts.str) {
    setStyle(animEl, {textAlign: 'right', right: 0});
  }

  var bigW = getSize(geByClass1('counter_anim_big_c', animEl, 'span'))[0],
    smallW = vert ? (smallPart == '&nbsp;' ? bigW : getSize(geByClass1('counter_anim_small_c', animEl, 'span'))[0]) : 0;

  if (constEndPart.length) {
    wrapEl.appendChild(constEl2 = ce('div', {className: 'counter_const inl_bl', innerHTML: constEndPart}));
  }

  if (!opts.noWrapWidth) {
    setStyle(wrapEl, {width: (constEl1 && getSize(constEl1)[0] || 0) + (constEl2 && getSize(constEl2)[0] || 0) + bigW + 0})
  }

  if (browser.csstransitions === undefined) {
    var b = browser, bv = floatval(b.version);
    browser.csstransitions =
      (b.chrome && bv >= 9.0) ||
      (b.mozilla && bv >= 4.0) ||
      (b.opera && bv >= 10.5) ||
      (b.safari && bv >= 3.2) ||
      (b.safari_mobile) ||
      (b.android);
  }
  var css3 = browser.csstransitions;
  setStyle(animwrapEl, {width: incr ? smallW : bigW});

  var onDone = function () {
    val(el, newCount || (opts.noSpaceIfEmpty ? '' : ' '));
    var next = data(el, 'nextCount');
    data(el, 'curCount', false);
    data(el, 'nextCount', false);
    if (typeof next == 'number' || opts.str && typeof next == 'string') {
      setTimeout(animateCount.pbind(el, next, opts), 0);
    }
    opts.onDone && opts.onDone();
  }, margin = vert ? {marginTop: incr ? 0 : -h} : {marginRight: incr ? -smallW : 0};
  if (css3) {
    getStyle(animwrapEl, 'width');
    addClass(animwrapEl, 'counter_css_anim_wrap');
    if (bigW != smallW) {
      setStyle(animwrapEl, {width: incr ? bigW : smallW});
    }
    if (vert) setStyle(animEl, margin);
    setTimeout(onDone, 300);

    if (opts.fadeMode) {
      setStyle(geByClass1('counter_anim_big', el), 'opacity', 1);
      setStyle(geByClass1('counter_anim_small', el), 'opacity', 0);
    }
  } else {
    if (bigW != smallW) {
      animate(animwrapEl, {width: incr ? bigW : smallW}, {duration: 100});
    }
    if (vert) {
      animate(animEl, margin, {duration: 300, transition: Fx.Transitions.easeOutCirc, onComplete: onDone});
    } else {
      setTimeout(onDone, 300);
    }
  }
}

/* Tooltips */

function _cleanHide(el) {
  if (el.temphide) {
    removeEvent(el, 'mouseout', el.temphide);
    removeAttr(el, 'temphide');
    removeAttr(el, 'showing');
  }
}

function showTooltip(el, opts) {
  _cleanHide(el);

  var showing = true;
  el.temphide = function() {
    showing = false;
  }
  addEvent(el, 'mouseout', el.temphide);

  if (opts.stat) stManager.add(opts.stat);
  stManager.add(['tooltips.js', 'tooltips.css'], function() {
    if (!showing) return;
    _cleanHide(el);

    if (!el.tt || !el.tt.el || opts.force) {
      tooltips.create(el, opts);
      if (opts.onCreate) opts.onCreate();
    }
    tooltips.show(el, opts);
  });
}

function showTitle(el, text, shift, opts) {
  el = ge(el);
  var tf = function() {
    return text || el.getAttribute('data-title');
  };
  if (browser.msie && browser.version < 9) {
    el.setAttribute('title', tf());
  } else {
    if (!shift) {
      var sx = Math.round(20 - getSize(el)[0] / 2);
      shift = [sx, 8];
    }
    showTooltip(el, extend({text: tf, shift: shift, black: 1}, opts));
  }
}

/* UI */

function topMsg(text, seconds, color) {
  if (!color) color = '#D6E5F7';
  if (!text) {
    hide('system_msg');
  } else {
    clearTimeout(window.topMsgTimer);
    var el = ge('system_msg');
    el.style.backgroundColor = color;
    el.innerHTML = text;
    show(el);
    if (seconds) {
      window.topMsgTimer = setTimeout(topMsg.pbind(false), seconds * 1000);
    }
  }
}

function topError(text, seconds) {
  if (text.message) {
    var e = text;
    text = '<b>JavaScript error:</b> ' + e.message;
    if (e.stack && __debugMode) text += '<br/>' + e.stack.replace(/\n/g, '<br/>');
  }
  topMsg(text, seconds, '#FFB4A3');
}

function setTitle(el, cntEl, txt) {
  el = ge(el);
  if (!el || el.titleSet) return;

  if (!cntEl) cntEl = el;
  if (cntEl.scrollWidth > cntEl.clientWidth) {
    el.setAttribute('title', trim(txt || el.innerText || el.textContent));
  } else {
    var b = geByTag1('b', el);
    if (b && b.scrollWidth > b.clientWidth) {
      el.setAttribute('title', trim(txt || el.innerText || el.textContent));
    } else {
      el.removeAttribute('title');
    }
  }
  el.titleSet = 1;
}

function setFavIcon() {}

function showGlobalPrg(img, opts) {
  var xy = getXY(img), sz = getSize(img), o = opts || {}, w = o.w || 32, h = o.h || 13, el = ge('global_prg');
  el.className = o.cls || 'progress';
  setStyle(el, {
    left: xy[0] + Math.floor((sz[0] - w) / 2) + intval(o.shift ? o.shift[0] : 0),
    top: xy[1] + Math.floor((sz[1] - h) / 2) + intval(o.shift ? o.shift[1] : 0),
    width: w, height: h,
    display: 'block',
    'z-index': (o.zIndex ? o.zIndex : null)
  });
  if (o.hide) {
    img.style.visibility = 'hidden';
  }
}

function callHub(func, count) {
  this.count = count || 1;
  this.done = function(c) {
    this.count -= c || 1;
    if (this.count <= 0) {
      func();
    }
  };
}
window.CallHub = callHub;

function isChecked(el) {
  el = ge(el);
  return hasClass(el, 'on') ? 1 : '';
}

function checkbox(el, v) {
  el = ge(el);
  if (!el || hasClass(el, 'disabled')) return;

  if (v === undefined) {
    v = !isChecked(el);
  }
  toggleClass(el, 'on', v);
  return false;
}

function disable(el, v) {
  el = ge(el);

  if (v === undefined) {
    v = !hasClass(el, 'disabled');
  }
  toggleClass(el, 'disabled', v);
  return false;
}

function autosizeSetup(el, options) {
  el = ge(el);
  if (!el) return;
  if (el.autosize) {
    el.autosize.update();
    return;
  }

  options.minHeight = intval(options.minHeight) || intval(getStyle(el, 'height'));
  options.maxHeight = intval(options.maxHeight);

  var elwidth = getSize(el)[0],
      fs = getStyle(el, 'fontSize'),
      lh;
  if (!elwidth) {
    elwidth = intval(getStyle(el, 'width'));
  }
  if (elwidth < 1) {
    elwidth = intval(getStyle(el, 'width', false));
  }
  if (fs.indexOf('em') > 0) {
    fs = floatval(fs) * vk.fs;
  }
  fs = intval(fs);
  el.autosize = {
    options: options,
    helper: ce('textarea', {className: 'ashelper'}, {
      width: elwidth,
      height: 10,
      fontFamily: getStyle(el, 'fontFamily'),
      fontSize: fs + 'px',
      lineHeight: (lh = getStyle(el, 'lineHeight')),
      boxSizing: getStyle(el, 'boxSizing'),
      padding: getStyle(el, 'padding')
    }),
    handleEvent: function(v, e) {
      var ch = e.charCode ? String.fromCharCode(e.charCode) : e.charCode;
      if (ch === undefined) {
        ch = String.fromCharCode(e.keyCode);
        if (e.keyCode == 10 || e.keyCode == 13) {
          ch = '\n';
        } else if (!browser.msie && e.keyCode <= 40) {
          ch = '';
        }
      }
      if (!ch) {
        return v;
      }
      if (!browser.msie) {
        return v.substr(0, el.selectionStart) + ch + v.substr(el.selectionEnd);
      }
      var r = document.selection.createRange();
      if (r.text) {
        v = v.replace(r.text, '');
      }
      return v + ch;
    },
    update: function(e) {
      var value = el.value;
      if (e && e.type != 'blur' && e.type != 'keyup' && (!browser.msie || e.type == 'keypress')) {
        if (!e.ctrlKey && !e.altKey && !e.metaKey) {
          value = el.autosize.handleEvent(value, e);
        }
      }
      if (!value) {
        value = ' ';
      }
      if (el.autosize.helper.value != value) {
        el.autosize.helper.value = value;
      }
      var opts = el.autosize.options,
          oldHeight = getSize(el, true)[1],
          newHeight = el.autosize.helper.scrollHeight, df;
      if (opts.exact && (df = newHeight % lh) > 2) {
        newHeight -= (df - 2);
      }
      if (newHeight < opts.minHeight) {
        newHeight = opts.minHeight;
      }
      var newStyle = {overflow: 'hidden'}, curOverflow = getStyle(el, 'overflow').indexOf('auto') > -1 ? 'auto' : 'hidden';
      if (opts.maxHeight && newHeight > opts.maxHeight) {
        newHeight = opts.maxHeight;
        extend(newStyle, {overflow: 'auto', overflowX: 'hidden'});
      }
      if (oldHeight != newHeight || curOverflow != newStyle.overflow) {
        newStyle.height = newHeight;
        setStyle(el, newStyle);
        if (isFunction(opts.onResize)) {
          opts.onResize(newHeight);
        }
      }
    }
  }
  if (options.exact) {
    if (lh == 'normal') lh = '120%';
    lh = intval((lh.indexOf('%') > 0) ? fs * intval(lh) / 100 : lh);
  }
  utilsNode.appendChild(el.autosize.helper);
  if (browser.opera_mobile) {
    setStyle(el, {overflow: 'hidden'});
    el.autosize.update();
    addEvent(el, 'blur', el.autosize.update);
  } else {
    addEvent(el, 'keydown keyup keypress', el.autosize.update);
    setTimeout(function() {
      setStyle(el, {overflow: 'hidden', resize: 'none'});
      el.autosize.update();
      var t = val(el); val(el, ' ', true); val(el, t, true);
    }, 0);
  }
}

function sbWidth() {
  if (window._sbWidth === undefined) {
    var t = ce('div', {innerHTML: '<div style="height: 75px;">1<br>1</div>'}, {
      overflowY: 'scroll',
      position: 'absolute',
      width: '50px',
      height: '50px'
    });
    bodyNode.appendChild(t);
    window._sbWidth = t.offsetWidth - t.firstChild.offsetWidth - 1;
    bodyNode.removeChild(t);
  }
  return window._sbWidth;
}

function val(input, value, nofire) {
  input = ge(input);
  if (!input) return;

  if (value !== undefined) {
    if (input.setValue) {
      input.setValue(value);
      !nofire && input.phonblur && input.phonblur();
    } else if (input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') {
      input.value = value;
    } else if (input.emojiId !== undefined && window.Emoji) {
      Emoji.val(input, value);
    } else {
      input.innerHTML = value;
    }

    triggerEvent(input, 'valueChanged');
  }

  return input.getValue ? input.getValue() :
         (((input.tagName == 'INPUT' || input.tagName == 'TEXTAREA') ? input.value : input.innerHTML) || '');
}

function elfocus(el, from, to) {
  el = ge(el);
  try {
    el.focus();
    if (from === undefined || from === false) from = el.value.length;
    if (to === undefined || to === false) to = from;
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.collapse(true);
      range.moveEnd('character', to);
      range.moveStart('character', from);
      range.select();
    } else if (el.setSelectionRange) {
      el.setSelectionRange(from, to);
    }
  } catch(e) {}
}

function shortCurrency() {
  var rubEnabled = {};
  each(geByClass('_short_currency'), function() {
    var _short = this.getAttribute('data-short') || '',
        _short_len = winToUtf(_short).length,
        ff = getStyle(this, 'fontFamily') || 'tahoma,arial,sans-serif';
    if (!_short) return true;
    if (typeof rubEnabled[ff] === 'undefined') {
      var _test = '';
      for (var i = _short_len - 1; i >= 0; i--) {
        _test += '&#8399;';
      }
      var div = ce('div', {innerHTML: '<b>' + _short + '</b><b>' + _test + '</b>'},{fontFamily: ff, fontSize: '24px'});
      ge('utils').appendChild(div);
      rubEnabled[ff] = Math.abs(div.firstChild.offsetWidth - div.lastChild.offsetWidth) >= 3 * _short_len;
      re(div);
    }
    if (rubEnabled[ff]) {
      val(this, _short);
    }
  });
}

function notaBene(el, color, nofocus) {
  el = ge(el);
  if (!el) return;

  if (!nofocus) elfocus(el);
  var oldBack = data(el, 'back') || data(el, 'back', getStyle(el, 'backgroundColor'));
  var colors = {notice: '#FFFFE0', warning: '#FAEAEA'};
  setStyle(el, 'backgroundColor', colors[color] || color || colors.warning);
  setTimeout(animate.pbind(el, {backgroundColor: oldBack}, 300), 400);
}

function getCaretBoundingRect(node) {
    var rectNode = node.getBoundingClientRect(),
      rectCaret = null,
      range = null;
    if (rectNode.top === rectNode.bottom) return {left: 0, top: 0, bottom: 0};
    if (document.selection) { // using textRange
      range = document.selection.createRange();
      rectCaret = range.getClientRects() || [];
      if (!rectCaret.length) { // fix empty range
        range.text = '_';
        range.moveStart('character', -1);
        rectCaret = range.getClientRects();
        range.text = '';
      }
      rectCaret = rectCaret[rectCaret.length - 1];
    } else if (window.getSelection) { // using Range
      var sel = getSelection();
      range = sel.getRangeAt(0);
      if (range.collapsed) { // fix empty range
        var offset = range.startOffset;
        range.setStart(range.startContainer, 0);
        rectCaret = range.getClientRects();
        range.setStart(range.startContainer, offset);
      }
      rectCaret = rectCaret.length ? rectCaret[rectCaret.length - 1] : {right: rectNode.left, top: rectNode.top, bottom: rectNode.top};
    }
    return {
      left: rectCaret.right - rectNode.left,
      top: rectCaret.top - rectNode.top,
      bottom: rectCaret.bottom - rectNode.top
    };
};

function hasAccessibilityMode() {
  return !!(window.vk && vk.a11y);
}

/* UI Placeholder */

function __phCheck(el, opts, focus, blur) {
  opts = opts || {};
  var shown = el.phshown, ph = el.phcont,
      back = opts.back, editable = opts.editable,
      phColor = opts.phColor || '#8C8E91',
      activeColor = opts.activeColor || '#C0C8D0',
      hideBackAfter = opts.hideBackAfter,
      animateTimout = (opts.timeout || opts.timeout === 0) ? opts.timeout : 100,
      animatePeriod = opts.period || 200;
  if (editable) {
    var v = (el.textContent !== undefined ? el.textContent : el.innerText) || geByTag('img', el).length;
  } else {
    var v = el.value;
  }
  if (shown && (back && v || !back && (focus && !focus.type || v))) {
    hide(ph);
    el.phshown = false;
  } else if (!shown && !v && (back || blur)) {
    show(ph);
    el.phshown = true;
    if (browser.opera && blur) {
      el.setAttribute('placeholder', ''); el.removeAttribute('placeholder', '');
    }
  }
  if (back && !v) {
    if (focus && !focus.type) {
      var cb = hideBackAfter ? hide.pbind(ph.firstChild.firstChild) : null;
      clearTimeout(el.phanim);
      el.phanim = setTimeout(function() {
        animate(ph.firstChild.firstChild, {color: activeColor}, animatePeriod, cb);
      }, animateTimout);
    }
    if (blur) {
      clearTimeout(el.phanim);
      if (hideBackAfter) {
        show(ph.firstChild.firstChild);
      }
      el.phanim = setTimeout(function() {
        animate(ph.firstChild.firstChild, {color: phColor}, animatePeriod);
      }, animateTimout);
    }
  }
}

function placeholderSetup(id, opts) {
  var el = ge(id);
  var disabled = false;
  var ph;
  var o = opts ? clone(opts) : {};
  if (!el || (el.phevents && !o.reload) || !(ph = (el.getAttribute ? el.getAttribute('placeholder') : el.placeholder))) {
    return;
  }

  el.removeAttribute('placeholder');

  var pad = {};
  var dirs = ['Top', 'Bottom', 'Left', 'Right'];
  if (o.pad) {
    pad = o.pad;
  } else {
    if (o.fast) {
      for (var i = 0; i < 4; ++i) {
        pad['padding' + dirs[i]] = 3;
        pad['margin' + dirs[i]] = 0;
        pad['border' + dirs[i] + 'Width'] = 1;
      }
      extend(pad, o.styles || {});
    } else {
      var prop = [];
      for (var i = 0; i < 4; ++i) {
        prop.push('margin' + dirs[i]);
        prop.push('padding' + dirs[i]);
        prop.push('border' + dirs[i] + 'Width');
      }
      pad = getStyle(el, prop);
    }
    for (var i = 0; i < 4; ++i) { // add border if needed
      var mKey = 'margin' + dirs[i],
          bKey = 'border' + dirs[i] + 'Width';
      pad[mKey] = (intval(pad[mKey]) + intval(pad[bKey])) + 'px';
      delete(pad[bKey]);
    }
  }

  if (o.reload) {
    var prel = el.previousSibling;
    if (prel && hasClass(prel, 'input_back_wrap')) re(prel);
  }
  var b1 = el.phcont = el.parentNode.insertBefore(ce('div', {
    className: 'input_back_wrap no_select',
    innerHTML: '<div class="input_back"><div class="input_back_content' + (o.big ? ' big' : '') + '" style="width: ' + (getSize(el)[0] - 20) + 'px;">' + ph + '</div></div>'
  }), el);
  var b = domFC(b1);
  var c = domFC(b);
  setStyle(b, pad);

  var cv = __phCheck.pbind(el, o), checkValue = browser.mobile ? cv : function(f, b) {
    setTimeout(cv.pbind(f, b), 0);
  }

  if (browser.msie && browser.version < 8) {
    setStyle(b, {marginTop: 1});
  }
  el.phonfocus = function(hid) {
    if (disabled) {
      return;
    }
    el.focused = true;
    cur.__focused = el;
    if (hid === true) {
      setStyle(el, {backgroundColor: '#FFF'});
      hide(b);
    }
    checkValue(true, false);
  }
  el.phonblur = function() {
    if (disabled) {
      return;
    }
    cur.__focused = el.focused = false;
    show(b);
    checkValue(false, true);
  }
  el.phshown = true, el.phanim = null;

  if (el.value || (o.editable && ((el.textContent !== undefined ? el.textContent : el.innerText) || geByTag('img', el).length))) {
    el.phshown = false;
    hide(b1);
  }

  if (!browser.opera_mobile) {
    addEvent(b1, 'focus click', function(ev) {
      if (disabled) {
        return;
      }
      if (o.editableFocus) {
        setTimeout(o.editableFocus.pbind(el), 0);
        el.phonfocus();
      } else {
        el.blur(); el.focus();
      }
    });
    addEvent(el, 'focus'+(o.editable ? ' click' : ''), el.phonfocus);
    addEvent(el, 'keydown paste cut input', checkValue);
  }
  addEvent(el, 'blur', el.phonblur);
  el.check = checkValue;

  el.getValue = function() {
    return o.editable ? el.innerHTML : el.value;
  }

  el.setPlaceholder = function(ph) {
    geByClass1('input_back_content', b1).textContent = ph;
  },

  el.setDisabled = function(dis) {
    disabled = dis;
  },

  el.setValue = function(v) {
    if (o.editable) {
      el.innerHTML = v;
    } else {
      el.value = v;
    }
    __phCheck(el, o);
  }
  el.phevents = true;
  el.phonsize = function() {};

  if (o.global) return;

  if (!o.reload) {
    if (!cur.__phinputs) {
      cur.__phinputs = [];
      cur.destroy.push(function(__phinputs) {
        for (var i = 0, l = __phinputs.length; i < l; ++i) {
          removeData(__phinputs[i]);
        }
      }.pbind(cur.__phinputs));
    }
    cur.__phinputs.push(el);
  }
}

// placeholder fallback for IE and old opera
function placeholderInit(id, opts) {
  var el = ge(id);
  var ph;
  var o = opts ? clone(opts) : {};
  var custom = typeof(ce("input").placeholder) === 'undefined' || el && el.getAttribute && el.getAttribute('contenteditable');
  if (!el || (el.phevents && !o.reload) || !(ph = (el.getAttribute ? el.getAttribute('placeholder') : el.placeholder))) {
    return;
  }
  el.getValue = function() {
    return o.editable ? el.innerHTML : el.value;
  }
  el.setValue = function(v) {
    if (o.editable) {
      el.innerHTML = v;
    } else {
      el.value = v;
    }
    if (custom) {
      _phCheck(el, o);
    }
  }
  el.phonfocus = function() {}
  el.phonblur = function() {}
  if (!custom) return;

  function _phCheck(el, opts, focus, blur) {
    opts = opts || {};
    var shown = el.phshown,
        ph = el.phcont,
        editable = opts.editable;
    if (editable) {
      var v = (el.textContent !== undefined ? el.textContent : el.innerText);
      if (v && browser.opera && v.match(/^[ ]+$/)) {
        v = '';
      }
      if (!v) {
        v = geByTag('img', el).length > 0;
      }
      if (!v) {
        v = geByTag('br', el).length > 1;
      }
    } else {
      var v = el.value;
    }
    if (shown && v) {
      hide(ph);
      el.phshown = false;
    } else if (!shown && !v) {
      show(ph);
      el.phshown = true;
      if (browser.opera && blur) {
        el.setAttribute('placeholder', ''); el.removeAttribute('placeholder', '');
      }
    }
  }


  el.removeAttribute('placeholder');

  if (o.reload) {
    var prel = domNS(el);
    if (prel && hasClass(prel, 'placeholder')) re(prel);
  }
  var b1 = el.phcont = domInsertAfter(ce('div', {
    className: 'placeholder',
    innerHTML: '<div class="ph_input"><div class="ph_content">' + ph + '</div></div>'
  }), el);
  var b = domFC(b1);
  var c = domFC(b);

  var cv = _phCheck.pbind(el, o), checkValue = browser.mobile ? cv : function(f, b) {
    setTimeout(cv.pbind(f, b), 0);
  }

  el.phonfocus = function(hid) {
    el.focused = true;
    cur.__focused = el;
    checkValue(true, false);
  }
  el.phonblur = function() {
    cur.__focused = el.focused = false;
    checkValue(false, true);
  }
  el.phshown = true;

  if (el.value || (o.editable && ((el.textContent !== undefined ? el.textContent : el.innerText) || geByTag('img', el).length))) {
    el.phshown = false;
    hide(b1);
  }

  if (!browser.opera_mobile) {
    addEvent(b1, 'focus click', function(ev) {
      if (o.editableFocus) {
        setTimeout(o.editableFocus.pbind(el), 0);
        el.phonfocus();
      } else {
        el.blur(); el.focus();
      }
    });
    addEvent(el, 'focus' + (o.editable ? ' click' : ''), el.phonfocus);
    addEvent(el, 'keydown paste cut input', checkValue);
  }
  addEvent(el, 'blur', el.phonblur);
  el.check = checkValue;

  el.phevents = true;
  el.phonsize = function() {};

  if (o.global) return;

  if (!o.reload) {
    if (!cur.__phinputs) {
      cur.__phinputs = [];
      cur.destroy.push(function() {
        if (!cur.__phinputs) return;
        for (var i = 0, l = cur.__phinputs.length; i < l; ++i) {
          removeData(cur.__phinputs[i]);
        }
      });
    }
    cur.__phinputs.push(el);
  }
}

/* UI Boxes */

function requestBox(box, onDone, onFail) {
  box.setOptions({onHide: onFail});
  box.onDone = function() {
    box.setOptions({onHide: false});
    onDone();
  }
  return box;
}

function activateMobileBox(opts) {
  return requestBox(showBox('activation.php', {
    act: 'activate_mobile_box',
    hash: opts.hash,
    captcha: opts.acceptCaptcha ? 1 : ''
  }), function() {
    vk.nophone = 0;
    opts.onDone();
  }, opts.onFail);
}

// Layers

window._layerAnim = false;
window.layers = {
  sh: (!_layerAnim || browser.msie || browser.iphone) ? function(el, done) {
    show(el);
    if (done) done();
  } : function(el, done) {
    fadeIn(el, 200, done);
  },
  hd: (!_layerAnim || browser.msie || browser.iphone) ? function(el, done) {
    hide(el);
    if (done) done();
  } : function(el, done) {
    fadeOut(el, 200, done);
  },
  visible: false,
  _show: function(el, con, opacity, color) {
    setStyle(el, {opacity: opacity || '', backgroundColor: color || ''});
    if (!layers.visible) {
      toggleFlash();
      if (browser.mozilla) {
        window._oldScroll = htmlNode.scrollTop;
        pageNode.style.height = (_oldScroll + (window.lastWindowHeight || 0)) + 'px';
        pageNode.style.marginTop = -_oldScroll + 'px';
      } else if (!browser.msie6) {
        (browser.msie7 ? htmlNode : bodyNode).style.overflow = 'hidden';
      }
    }
    layers.visible = true;
    addClass(bodyNode, 'layers_shown');
    if (con.visibilityHide) {
      removeClass(con, 'box_layer_hidden');
    } else {
      show(con);
    }
    layers.sh(el);
  },
  _hide: function(el, con) {
    var done = function() {
      if (con && con.visibilityHide) {
        addClass(con, 'box_layer_hidden');
      } else {
        hide(con);
      }
      if ((!isVisible(boxLayerWrap) || boxLayerWrap.visibilityHide)
        && ((window.mvcur && mvcur.minimized)
          || !isVisible(window.mvLayerWrap))
        && !isVisible(window.wkLayerWrap)) {
        layers.visible = false;
        removeClass(bodyNode, 'layers_shown');
        toggleFlash(true);
        if (browser.mozilla) {
          pageNode.style.height = 'auto';
          pageNode.style.marginTop = '0px';
          if (window._oldScroll) {
            htmlNode.scrollTop = _oldScroll;
          }
        } else if (!browser.msie6) {
          (browser.msie7 ? htmlNode : bodyNode).style.overflow = 'auto';
        }
      }
    }
    layers.hd(el, done);
  }
};

// Message box

window._message_box_guid = 0;
window._message_boxes = [];
window._show_flash_timeout = 0;
var __bq = boxQueue = {
  hideAll: function(force, noLoc) {
    if (force) {
      while (__bq.count()) {
        __bq.hideLast();
      }
      return;
    }
    if (__bq.count()) {
      var box = _message_boxes[__bq._boxes.pop()];
      box._in_queue = false;
      box._hide(false, false, noLoc);
    }
    while (__bq.count()) {
      var box = _message_boxes[__bq._boxes.pop()];
      box._in_queue = false;
    }
  },
  hideLast: function(check, e) {
    if (__bq.count()) {
      var box = _message_boxes[__bq._boxes[__bq.count() - 1]];
      if (check === true && (box.changed || __bq.skip || e && e.target && e.target.tagName && e.target.tagName.toLowerCase() != 'input' && cur.__mdEvent && e.target != cur.__mdEvent.target)) {
        __bq.skip = false;
        return;
      }
      box.hide();
    }
    if (e && e.type == 'click') return cancelEvent(e);
  },
  hideBGClick: function(e) {
    if (e && e.target && /^box_layer/.test(e.target.id)) {
      __bq.hideLast();
    }
  },
  count: function() {
    return __bq._boxes.length;
  },
  _show: function(guid) {
    var box = _message_boxes[guid];
    if (!box || box._in_queue) return;
    if (__bq.count()) {
      _message_boxes[__bq._boxes[__bq.count() - 1]]._hide(true, true);
    } else if (window.tooltips) {
      tooltips.hideAll();
    }
    box._in_queue = true;
    var notFirst = __bq.count() ? true : false;
    __bq.curBox = guid;
    box._show(notFirst || __bq.currHiding, notFirst);
    __bq._boxes.push(guid);
  },
  _hide: function(guid) {
    var box = _message_boxes[guid];
    if (!box || !box._in_queue || __bq._boxes[__bq.count() - 1] != guid || !box.isVisible()) return;
    box._in_queue = false;
    __bq._boxes.pop();
    box._hide(__bq.count() ? true : false);
    if (__bq.count()) {
      var prev_guid = __bq._boxes[__bq.count() - 1];
      __bq.curBox = prev_guid;
      _message_boxes[prev_guid]._show(true, true, true);
    }
  },
  _boxes: [],
  curBox: 0
};

__bq.hideLastCheck = __bq.hideLast.pbind(true);

function curBox() {
  var b = _message_boxes[__bq.curBox];
  return (b && b.isVisible()) ? b : null;
}

if (!browser.mobile) {
  addEvent(document, 'keydown', function(e) {
    if (e.keyCode == KEY.ESC && __bq.count()) {
      __bq.hideLast();
      return false;
    }
  });
}

function boxRefreshCoords(cont) {
  var height = window.innerHeight || document.documentElement.clientHeight || boxLayerBG.offsetHeight;
  var top = browser.mobile ? intval(window.pageYOffset) : 0;
  containerSize = getSize(cont);
  cont.style.marginTop = Math.max(10, top + (height - containerSize[1]) / 3) + 'px';
}

function MessageBox(options, dark) {
  var defaults = {
    title: false,
    titleControls: '',
    width: 450,
    height: 'auto',
    animSpeed: 0,
    bodyStyle: '',
    grey: false,
    white: false,
    selfDestruct: true,
    progress: false,
    hideOnBGClick: false,
    hideButtons: false,
    onShow: false,
    onHideAttempt: false,
    onBeforeHide: false,
    onHide: false,
    onClean: false,
    onDestroy: false
  };

  options = extend(defaults, options);

  var buttonsCount = 0,
      boxContainer, boxBG, boxLayout;
  var boxTitleWrap, boxTitle, boxTitleControls, boxCloseButton, boxBody;
  var boxControlsWrap, boxControls, boxButtons, boxProgress, boxControlsText;
  var guid = _message_box_guid++, visible = false, btns = {'ok' : [], 'cancel' : []};

  if (!options.progress) options.progress = 'box_progress' + guid;

  var controlsStyle = options.hideButtons ? ' style="display: none"' : '';
  boxContainer = ce('div', {
    className: 'popup_box_container'+(options.containerClass ? ' '+options.containerClass : ''),
    innerHTML: '\
      <div class="box_layout" onclick="__bq.skip=true;">\
      <div class="box_title_wrap"><div class="box_x_button"></div><div class="box_title_controls"></div><div class="box_title"></div></div>\
      <div class="box_body" style="' + options.bodyStyle + '"></div>\
      <div class="box_controls_wrap"' + controlsStyle + '><div class="box_controls">\
      <table cellspacing="0" cellpadding="0" class="fl_r"><tr></tr></table>\
      <div class="progress" id="' + options.progress + '"></div>\
      <div class="box_controls_text"></div>\
      </div></div>\
      </div>'
  }, {
    display: 'none'
  });
  hide(boxContainer);

  boxLayout = domFC(boxContainer);

  boxTitleWrap = domFC(boxLayout);
  boxCloseButton = domFC(boxTitleWrap);
  boxTitle = domLC(boxTitleWrap);
  boxTitleControls = domNS(boxCloseButton);

  if (options.noCloseButton) hide(boxCloseButton);

  boxBody = domNS(boxTitleWrap);

  boxControlsWrap = domNS(boxBody);
  boxControls = domFC(boxControlsWrap);
  boxButtons = domFC(boxControls);
  boxProgress = domNS(boxButtons);
  boxControlsText = domNS(boxProgress);

  boxLayer.appendChild(boxContainer);

  refreshBox();
  boxRefreshCoords(boxContainer);

  var emitter = new EventEmitter();

  // Refresh box properties
  function refreshBox() {
    // Set title
    if (options.title) {
      boxTitle.innerHTML = options.title;
      removeClass(boxBody, 'box_no_title');
      show(boxTitleWrap);
    } else {
      addClass(boxBody, 'box_no_title');
      hide(boxTitleWrap);
    }
    if (options.titleControls) {
      boxTitleControls.innerHTML = options.titleControls;
    }
    toggleClass(boxBody, 'box_no_buttons', options.hideButtons);
    toggleClass(boxTitleWrap, 'box_grey', options.grey);
    toggleClass(boxTitleWrap, 'box_white', options.white);

    // Set box dimensions
    boxContainer.style.minWidth = typeof(options.width) == 'string' ? options.width : options.width + 'px';
    boxContainer.style.width = typeof(options.width) == 'string' ? options.width : options.width + 'px';
    boxContainer.style.height = typeof(options.height) == 'string' ? options.height : options.height + 'px';
  }

  // Add button
  function addButton(label, onclick, type) {
    ++buttonsCount;
    var btnClass = 'flat_button', type;
    if (type == 'no' || type == 'gray') {
      btnClass += ' secondary';
      type = 'cancel';
    } else {
      type = 'ok';
    }

    var handler = function() {
      emitter.emit(type, retBox);
      onclick.apply(null, arguments);
    }

    var buttonWrap = ce('button', {
      className: btnClass,
      innerHTML: label
    }), row = boxButtons.rows[0], cell = row.insertCell(0);
    cell.appendChild(buttonWrap);
    createButton(buttonWrap, handler);
    btns[type].push(buttonWrap);

    return buttonWrap;
  }

  // Add custom controls text
  function setControlsText(text) {
    boxControlsText.innerHTML = text;
  }

  // Remove buttons
  function removeButtons() {
    var row = boxButtons.rows[0];
    while (row.cells.length) {
      cleanElems(row.cells[0]);
      row.deleteCell(0);
    }
    btns.ok.length = btns.cancel.length = 0;
  }

  var destroyMe = function() {
    if (isFunction(options.onClean)) options.onClean();
    if (isFunction(options.onDestroy)) options.onDestroy();
    removeButtons();
    cleanElems(boxContainer, boxCloseButton, boxTitleWrap, boxControlsWrap);
    boxLayer.removeChild(boxContainer);
    delete _message_boxes[guid];
    if (options.onWidgetHide) {
      options.onWidgetHide();
    }
  }

  // Hide box
  var hideMe = function(showingOther, tempHiding, noLoc) {
    if (!visible) return;
    visible = false;

    var speed = (showingOther === true) ? 0 : options.animSpeed;

    if (options.hideOnBGClick) {
      removeEvent(document, 'click', __bq.hideBGClick);
    }

    if (isFunction(options.onBeforeHide)) {
      options.onBeforeHide();
    }

    if (_layerAnim && !showingOther) {
      layers.boxhide();
    }

    var onHide = function() {
      if (__bq.currHiding == _message_boxes[guid]) {
        __bq.currHiding = false;
      }
      if (!_layerAnim && !_message_boxes[guid].shOther && !showingOther) {
        layers.boxhide();
      }
      if (!tempHiding && options.selfDestruct) {
        destroyMe();
      } else {
        hide(boxContainer);
      }
      if (isFunction(options.onHide)) {
        options.onHide(noLoc);
      }
    }
    if (speed > 0) {
      __bq.currHiding = _message_boxes[guid];
      fadeOut(boxContainer, speed, onHide);
    } else {
      onHide();
    }
  }

  // Show box
  function showMe(noAnim, notFirst, isReturned) {
    if (visible || !_message_boxes[guid]) return;
    visible = true;

    var speed = (noAnim === true || notFirst) ? 0 : options.animSpeed;

    if (options.hideOnBGClick) {
      addEvent(document, 'click', __bq.hideBGClick);
    }

    // Show blocking background
    if (!notFirst) {
      layers.boxshow();
    }

    if (__bq.currHiding) {
      __bq.currHiding.shOther = true;
      var cont = __bq.currHiding.bodyNode.parentNode.parentNode;
      data(cont, 'tween').stop(true);
    }

    // Show box
    if (speed > 0) {
      fadeIn(boxContainer, speed);
    } else {
      show(boxContainer);
    }

    boxRefreshCoords(boxContainer);
    if (options.onShow) {
      options.onShow(isReturned);
    }

    _message_box_shown = true;
  }

  addEvent(boxCloseButton, 'click', __bq.hideLast);

  var retBox = _message_boxes[guid] = {
    guid: guid,
    _show: showMe,
    _hide: hideMe,

    bodyNode: boxBody,
    titleWrap: boxTitleWrap,
    btns: btns,

    // Show box
    show: function() {
      __bq._show(guid);
      return this;
    },
    progress: boxProgress,
    showCloseProgress: addClass.pbind(boxTitleWrap, 'box_loading'),
    hideCloseProgress: removeClass.pbind(boxTitleWrap, 'box_loading'),
    showProgress: function() {
      hide(boxControlsText);
      show(boxProgress);
    },
    hideProgress: function() {
      hide(boxProgress);
      show(boxControlsText);
    },

    // Hide box
    hide: function(attemptParam) {
      if (isFunction(options.onHideAttempt) && !options.onHideAttempt(attemptParam)) return false;
      __bq._hide(guid);
      return true;
    },

    isVisible: function() {
      return visible;
    },
    bodyHeight: function() {
      return getStyle(boxBody, 'height');
    },

    // Insert html content into the box
    content: function(html) {
      if (options.onClean) options.onClean();
      boxBody.innerHTML = html;
      boxRefreshCoords(boxContainer);
      refreshBox();
      return this;
    },

    emit: function(ev, arg) {
      emitter.emit(ev, arg);
    },

    // Add button
    addButton: function(label, onclick, type, returnBtn) {
      var btn = addButton(label, onclick ? onclick : this.hide, type);
      return (returnBtn) ? btn : this;
    },

    setButtons: function(yes, onYes, no, onNo) {
      var b = this.removeButtons();
      if (!yes) return b.addButton(getLang('box_close'));
      b.addButton(yes, onYes)
      if (no) b.addButton(no, onNo, 'no');
      return b;
    },

    // Set controls text
    setControlsText: setControlsText,

    // Remove buttons
    removeButtons: function() {
      removeButtons();
      return this;
    },

    destroy: destroyMe,

    getOptions: function() {
      return options;
    },

    on: function(ev, handler) {
      emitter.on(ev, handler);
    },

    once: function(ev, handler) {
      emitter.once(ev, handler);
    },

    // Update box options
    setOptions: function(newOptions) {
      if (options.hideOnBGClick) {
        removeEvent(document, 'click', __bq.hideBGClick);
      }
      options = extend(options, newOptions);
      if ('bodyStyle' in newOptions) {
        var items = options.bodyStyle.split(';');
        for (var i = 0, l = items.length; i < l; ++i) {
          var name_value = items[i].split(':');
          if (name_value.length > 1 && name_value[0].length) {
            boxBody.style[trim(name_value[0])] = trim(name_value[1]);
            if (boxBody.style.setProperty) {
              boxBody.style.setProperty(trim(name_value[0]), trim(name_value[1]), '');
            }
          }
        }
      }
      if (options.hideOnBGClick) {
        addEvent(document, 'click', __bq.hideBGClick);
      }
      toggle(boxControlsWrap, !options.hideButtons);
      refreshBox();
      if (!options.noRefreshCoords) {
        boxRefreshCoords(boxContainer);
      }
      return this;
    },
    evalBox: function(js, url, params) {
      var scr = '((function() { return function() { var box = this; ' + (js || '') + ';}; })())'; // IE :(
      if (__debugMode) {
        var fn = eval(scr);
        fn.apply(this, [url, params]);
      } else try {
        var fn = eval(scr);
        fn.apply(this, [url, params]);
      } catch (e) {
        topError(e, {dt: 15, type: 7, url: url, query: params ? ajx2q(params) : undefined, js: js});
      }
    }
  }
  return retBox;
}

function showBox(url, params, options, e) {
  if (checkEvent(e)) return false;

  var opts = options || {};
  var boxParams = opts.params || {};
  if (opts.containerClass) {
    boxParams.containerClass = opts.containerClass;
  }
  var box = new MessageBox(boxParams);
  var p = {
    onDone: function(title, html, js, data) {
      if (!box.isVisible()) {
        if (opts.onDone) opts.onDone(box, data);
        return;
      }

      function processResponse() {
        show(boxLayerBG);
        addClass(bodyNode, 'layers_shown');
        box.setOptions({title: title, hideButtons: boxParams.hideButtons || false});
        if (opts.showProgress) {
          box.show();
        } else {
          show(box.bodyNode);
        }
        box.content(html);
        box.evalBox(js, url, params);
        if (opts.onDone) opts.onDone(box, data);
      }

      if (__debugMode) {
          processResponse();
      } else {
        try {
          processResponse();
        } catch(e) {
          topError(e, {dt: 15, type: 103, url: url, query: ajx2q(params), answer: Array.prototype.slice.call(arguments).join('<!>')});
          if (box.isVisible()) box.hide();
        }
      }
    },
    onFail: function(error) {
      box.failed = true;
      setTimeout(box.hide, 0);
      if (isFunction(opts.onFail)) return opts.onFail(error);
    },
    cache: opts.cache,
    stat: opts.stat,
    fromBox: true
  };

  if (opts.prgEl) {
    opts.showProgress = showGlobalPrg.pbind(opts.prgEl, {cls: opts.prgClass, w: opts.prgW, h: opts.prgH, hide: true});
    opts.hideProgress = hide.pbind('global_prg');
  }
  if (opts.showProgress) {
    extend(p, {
      showProgress: opts.showProgress,
      hideProgress: opts.hideProgress
    });
  } else {
    box.setOptions({title: false, hideButtons: true}).show();
    if (__bq.count() < 2) {
      hide(boxLayerBG);
      removeClass(bodyNode, 'layers_shown');
    }
    hide(box.bodyNode);
    p.showProgress = function() {
      show(boxLoader);
      boxRefreshCoords(boxLoader);
    }
    p.hideProgress = hide.pbind(boxLoader);
  }
  box.removeButtons().addButton(getLang('global_close'));

  ajax.post(url, params, p);
  return box;
}

function showTabbedBox(url, params, options, e) {
  options = options || {};
  options.stat = options.stat || [];
  options.stat.push('box.js', 'boxes.css');
  return showBox(url, params, options, e)
}

function showFastBox(o, c, yes, onYes, no, onNo) {
  return (new MessageBox(typeof(o) == 'string' ? {title: o} : o)).content(c).setButtons(yes, onYes, no, onNo).show();
}

function showCaptchaBox(sid, dif, box, o) {
  var done = function(e) {
    if (e && e.keyCode !== undefined && e.keyCode != 10 && e.keyCode != 13) return;
    var key = geByTag1('input', box.bodyNode);
    if (!trim(key.value) && e !== true) {
      elfocus(key);
      return;
    }
    var imgs = geByTag1('img', box.bodyNode);
    var captcha = imgs[0], loader = imgs[1];
    removeEvent(key);
    removeEvent(captcha);
    show(geByClass1('progress', box.bodyNode));
    hide(key);
    o.onSubmit(sid, key.value);
  }
  var was_box = box ? true : false;
  var difficulty = intval(dif) ? '' : '&s=1';
  var imgSrc = o.imgSrc || '/captcha.php?sid=' + sid + difficulty;
  if (!was_box) {
    var content = '\
  <div class="captcha">\
    <div><img src="' + imgSrc + '"/></div>\
    <div><input type="text" class="big_text" maxlength="7" placeholder="' + getLang('global_captcha_input_here') + '" /><div class="progress" /></div></div>\
  </div>' + (o.addText || '');
    box = showFastBox({
      title: getLang('captcha_enter_code'),
      width: 305,
      onHide: o.onHide,
      onDestroy: o.onDestroy || false
    }, content, getLang('captcha_send'), function() {
      box.submit();
    }, getLang('captcha_cancel'), function() {
      var key = geByTag1('input', box.bodyNode);
      var captcha = geByTag1('img', box.bodyNode);
      removeEvent(key);
      removeEvent(captcha);
      box.hide();
    });
  }
  box.submit = done.pbind(true);
  var key = geByTag1('input', box.bodyNode);
  var captcha = geByTag1('img', box.bodyNode);
  if (was_box) {
    key.value = '';
    captcha.src = '/captcha.php?sid=' + sid + difficulty;
    hide(geByClass1('progress', box.bodyNode));
  }
  show(key);
  addEvent(key, 'keypress', done);
  addEvent(captcha, 'click', function() {
    this.src = '/captcha.php?sid=' + sid + difficulty + '&v=' + irand(1000000, 2000000);
  });
  elfocus(key);
  return box;
}

function showReCaptchaBox(key, lang, box, o) {
  window.recaptchaResponse = function(response) {
    o.onSubmit(response);
  };
  var was_box = box ? true : false,
      loaded = !!window.grecaptcha;
  if (!was_box) {
    if (!loaded) {
      window.recaptchaCallback = function() {
        var _box = curBox();
        if (!_box) return;
        var wrapId = geByClass1('recaptcha', _box.bodyNode);
        if (!wrapId) return;
        val(wrapId, '');
        grecaptcha.render(wrapId, {
          sitekey: key,
          callback: recaptchaResponse
        });
      }
      headNode.appendChild(ce('script', {
        type: 'text/javascript',
        src: 'https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=' + lang
      }));
    }

    var content = '<div class="recaptcha"></div>' + (o.addText || '');
    box = showFastBox({
      title: getLang('global_recaptcha_title'),
      width: 354,
      onHide: o.onHide,
      onDestroy: o.onDestroy || false
    }, content, getLang('captcha_cancel'));
    var wrap = geByClass1('recaptcha', box.bodyNode);
    wrap.id = 'recaptcha' + (box.guid ? box.guid : '0');
    showProgress(wrap);
  }
  if (was_box && loaded) {
    grecaptcha.reset();
  } else if (loaded) {
    recaptchaCallback();
  }
  box.changed = true;
  return box;
}

function showDoneBox(msg, opts) {
  opts = opts || {};
  var l = (opts.w || 380) + 20;
  var style = opts.w ? ' style="width: ' + opts.w + 'px;"' : '';
  var pageW = bodyNode.offsetWidth,
      resEl = ce('div', {
      className: 'top_result_baloon_wrap fixed',
      innerHTML: '<div class="top_result_baloon"' + style + '>' + msg + '</div>'
  }, {left: (pageW - l) / 2});
  bodyNode.insertBefore(resEl, bodyNode.firstChild);
  boxRefreshCoords(resEl);
  var out = opts.out || 2000;
  var _fadeOut = function() {
    setTimeout(function() {
      if (opts.permit && !opts.permit()) {
        _fadeOut();
        return;
      }
      fadeOut(resEl.firstChild, 500, function() {
        re(resEl);
        if (opts.callback) {
          opts.callback();
        }
      });
    }, out);
  }
  _fadeOut();
}

/**
 Simple tooltips.

 el - object which tootlip should point to
 opts
 content         - (required) string or dom element for tooltip content
 id              - custom id for tootlip
 cls             - custom class for tooltip
 autoShow        - show/hide tooltip on mouse enter/leave, if false - on mouse click (default: true)
 customShow      - external code sets visibility of tooltip
 delay           - delay for tooltip show (default: 100)
 appendTo        - appends tooltip to particular element
 appendToParent  - appends tooltip to closest positioned element (default: false)
 offset          - custom offset for tooltip (default: [0, 0]). Array or function returning array
 shift           - custom array shift
 elClassWhenShown - class that will be added to el when tooltip is shown
 setPos          - function for calculation tooltip custom position. forceSide parameter is required
 noHideOnClick   - no hide tooltip after show by click. work only with autoShow=false (default: false)
 type            - ElementTooltip.TYPE_VERTICAL / ElementTooltip.TYPE_HORIZONTAL (default vertical)
 forceSide       - forces tooltip to be shown on particular side top/bottom/left/right. It ignores type option.
 defaultSide
 align           - align of the tooltip center/left/right (center by default, supports rtl).
 width           - custom tooltip height (function or int value)
 noBorder
 arrowSize       - 'mini', normal', 'big'

 onShow          - callback fired when tooltip is shown
 onHide          - callback fired when tooltip is hidden
 onFirstTimeShow - callback fired when tooltip is shown first time (onShow also will be called next)
 */
function ElementTooltip(el, opts) {
  if (this.constructor != ElementTooltip) {
    throw new Error('ElementTooltip was called without \'new\' operator');
  }

  el = ge(el);
  if (!el || !el.nodeType) {
    throw new Error('First argument not a DOM element');
  }

  if (data(el, 'ett')) { // already have tt for this element
    return data(el, 'ett');
  }

  this._opts = extend({
    delay: 100,
    offset: [0, 0],
    shift: 0,
    type: ElementTooltip.TYPE_VERTICAL,
    id: '',
    cls: '',
    width: null,
    appendToParent: false,
    autoShow: true,
    autoHide: false,
    noHideOnClick: false,
    arrowSize: 'normal',
    customShow: false,
    align: ElementTooltip.ALIGN_CENTER,
  }, opts);

  if (this._opts.customShow) {
    this._opts.autoShow = false
  }

  if (!this._opts.defaultSide) {
    this._opts.defaultSide = this._opts.type == ElementTooltip.TYPE_VERTICAL ? 'top' : 'left'
  }

  this._opts.cls += ' eltt_arrow_size_' + this._opts.arrowSize
  this._opts.cls += ' eltt_align_' + this._opts.align;

  if (this._opts.noBorder) {
    this._opts.cls += ' eltt_noborder'
  }

  if (this._opts.type != ElementTooltip.TYPE_VERTICAL) {
    delete this._opts.shift
  }

  if (this._opts.setPos && !this._opts.forceSide) {
    throw new Error('forceSide parameter should be set if you use setPos');
  }

  if (this._opts.forceSide) {
    this._opts.type = inArray(this._opts.forceSide, ['top', 'bottom']) ? ElementTooltip.TYPE_VERTICAL : ElementTooltip.TYPE_HORIZONTAL;
  }

  this._appendToEl = this._opts.appendTo ? this._opts.appendTo : (this._opts.appendToParent ? domClosestPositioned(el, {noOverflow: true}) : el);

  this._arrowSize = {
    'mini': ElementTooltip.ARROW_SIZE_MINI,
    'normal': ElementTooltip.ARROW_SIZE_NORMAL,
    'big': ElementTooltip.ARROW_SIZE_BIG,
  }[this._opts.arrowSize]

  if (this._opts.forceSide) {
    this._opts.type = ElementTooltip.getType(this._opts.forceSide)
  }

  this._el = el;
  data(this._el, 'ett', this);

  this._initEvents(el);

  this._clearTimeouts();

  this._isShown = false;
}

ElementTooltip.TYPE_VERTICAL = 0;
ElementTooltip.TYPE_HORIZONTAL = 1;
ElementTooltip.FADE_SPEED = 100; // keep in sync with @eltt_fade_speed
ElementTooltip.ARROW_SIZE = 6;

ElementTooltip.ARROW_SIZE_MINI = 9;
ElementTooltip.ARROW_SIZE_NORMAL = 8;
ElementTooltip.ARROW_SIZE_BIG = 16;

ElementTooltip.ALIGN_LEFT = 'left';
ElementTooltip.ALIGN_CENTER = 'center';
ElementTooltip.ALIGN_RIGHT = 'right';

ElementTooltip.prototype._initEvents = function(el) {
  if (this._opts.autoShow) {
    addEvent(el, 'mouseenter', this._el_me_event = this._onMouseEnter.bind(this));
  }

  if (this._opts.autoShow || this._opts.autoHide) {
    addEvent(el, 'mouseleave', this._el_ml_event = this._onMouseLeave.bind(this));
  }

  if (!this._opts.autoShow && !this._opts.customShow) {
    addEvent(el, 'click', this._el_c_event = function() {
      if (this._isShown && this._opts.noHideOnClick) return;
      this.toggle(!this._isShown)
    }.bind(this));
  }
}

ElementTooltip.prototype._onMouseEnter = function(event) {
  clearTimeout(this._hto);
  this._hto = false; // prevent hide

  if (!this._isShown && this._opts.autoShow) {
    clearTimeout(this._reTimeout); this._reTimeout = false;

    clearTimeout(this._sto);
    this._sto = setTimeout(this.show.bind(this), this._opts.delay);
  }
}

ElementTooltip.prototype._onMouseLeave = function(event) {
  this._clearTimeouts();
  this._hto = setTimeout(this._hide.bind(this), 200);
}

ElementTooltip.prototype._onMouseWindowClick = function(event) {
  var node = event.target;
  while(node && node != this._ttel && node != document.body && node != this._el) {
    node = domPN(node);
  }

  if (hasClass(event.target, '_ap_layer__close')) {
    return
  }

  if (!node || node == document.body) {
    this.hide(true);
    return cancelEvent(event);
  }
}

ElementTooltip.prototype.destroy = function() {
  this._el_me_event && removeEvent(this._el, 'mouseenter', this._el_me_event);
  this._el_ml_event && removeEvent(this._el, 'mouseleave', this._el_ml_event);
  this._el_c_event && removeEvent(this._el, 'click', this._el_c_event);

  this._clearTimeouts();
  removeData(this._el, 'ett');
  re(this._ttel);
  this._ev_wclick && removeEvent(document, 'mousedown', this._ev_wclick);
  var contentEl;
  if (this._ttel) {
    contentEl = geByClass1('_eltt_content', this._ttel);
  }
  this._opts.onDestroy && this._opts.onDestroy(contentEl);
}

ElementTooltip.prototype.hide = function(byElClick) {
  this._hide(byElClick);
}

ElementTooltip.prototype._onTooltipMouseEnter = function(ev) {
  this._clearTimeouts();
}

ElementTooltip.prototype._onTooltipMouseLeave = function(ev) {
  this._onMouseLeave();
}

ElementTooltip.prototype.build = function() {
  if (!this._ttel) {
    this._ttel = se('<div class="eltt ' + (this._opts.cls || '') + '" id="' + this._opts.id + '"><div class="eltt_arrow_back _eltt_arrow_back"><div class="eltt_arrow"></div></div><div class="eltt_content _eltt_content"></div></div>');
    this._ttArrowEl = geByClass1('_eltt_arrow_back', this._ttel)

    var contentWrap = geByClass1('_eltt_content', this._ttel)

    if (this._opts.content) {
      if (isString(this._opts.content)) {
        contentWrap.innerHTML = this._opts.content;
      } else {
        contentWrap.appendChild(this._opts.content);
      }
    }

    this._appendToEl.appendChild(this._ttel);
  }
}

ElementTooltip.prototype.show = function() {
  if (this._isShown) {
    this.updatePosition();
    return
  }

  this._clearTimeouts();

  if (!this._ttel) {
    this.build();

    if (this._opts.autoShow || this._opts.autoHide) {
      addEvent(this._ttel, 'mouseenter', this._ev_ttenter = this._onTooltipMouseEnter.bind(this));
      addEvent(this._ttel, 'mouseleave', this._ev_ttleave = this._onTooltipMouseLeave.bind(this));
    }
  }

  if (this._opts.width) {
    var width = isFunction(this._opts.width) ? this._opts.width.call(this) : this._opts.width;
    setStyle(this._ttel, 'width', width);
  }

  show(this._ttel);

  var contentEl = geByClass1('_eltt_content', this._ttel)
  if (this._opts.onFirstTimeShow && !this._firstTimeShown) {
    this._opts.onFirstTimeShow.call(this, contentEl, this._ttel);
  }
  this._opts.onShow && this._opts.onShow(contentEl, !this._firstTimeShown);

  this._firstTimeShown = true;

  this.updatePosition();

  this._isShown = true;

  this.updatePosition();
  this._visTO = setTimeout(addClass.pbind(this._ttel, 'eltt_vis'), 10);

  this._opts.elClassWhenShown && addClass(this._el, this._opts.elClassWhenShown);

  if (this._ev_wclick) {
    removeEvent(document, 'mousedown', this._ev_wclick);
  }
  addEvent(document, 'mousedown', this._ev_wclick = this._onMouseWindowClick.bind(this));
}

ElementTooltip.getType = function(side) {
  switch(side) {
    case 'top':
    case 'bottom':
      return ElementTooltip.TYPE_VERTICAL
    case 'right':
    case 'left':
      return ElementTooltip.TYPE_HORIZONTAL
  }
}

ElementTooltip.prototype.getOptions = function() {
  return this._opts
}

ElementTooltip.prototype.updatePosition = function() {
  var side = this._opts.forceSide;

  var boundingBox = this._opts.getTargetBoundingBox ? this._opts.getTargetBoundingBox(this) : false;
  if (!boundingBox) {
    var elPos = getXY(this._el);
    var elSize = getSize(this._el);
    boundingBox = {
      left: elPos[0],
      top: elPos[1],
      width: elSize[0],
      height: elSize[1]
    }
  }

  var audioLayerWrapEl = gpeByClass('audio_layer_container', this._ttel);
  var boundingEl = audioLayerWrapEl ? audioLayerWrapEl : domClosestOverflowHidden(this._ttel);
  var boundingElPos = (boundingEl != bodyNode) ? getXY(boundingEl) : [ scrollGetX(), scrollGetY() + getPageHeaderHeight()];
  var boundingElSize = (boundingEl != bodyNode) ? getSize(boundingEl) : [ window.innerWidth, window.innerHeight ];

  var ttelSize = getSize(this._ttel);

  var arrowSize = this._arrowSize;
  var border = this._opts.noBorder ? 0 : 1;

  var offset = isFunction(this._opts.offset) ? this._opts.offset() : this._opts.offset;

  var style;

  var _this = this;
  function setArrowCenteredPosition(side, shift) {
    var style = {}
    var sizeIndex = ['marginLeft', 'marginTop'].indexOf(side);
    var align;

    if (_this._opts.align === (vk.rtl ? ElementTooltip.ALIGN_LEFT : ElementTooltip.ALIGN_RIGHT)) {
      align = ttelSize[sizeIndex] - Math.max(border + arrowSize + (shift || 0), Math.min(ttelSize[sizeIndex], boundingBox[sizeIndex ? 'height' : 'width']) / 2);
    } else if (_this._opts.align === (vk.rtl ? ElementTooltip.ALIGN_RIGHT : ElementTooltip.ALIGN_LEFT)) {
      align = Math.max(border + arrowSize + (shift || 0), Math.min(ttelSize[sizeIndex], boundingBox[sizeIndex ? 'height' : 'width']) / 2);
    } else {
      align = ttelSize[sizeIndex] / 2;
    }

    style[side] = Math.floor(align)/*tt align*/ - border/*borders*/ - arrowSize - (shift || 0)/*shift compensation*/
    setStyle(_this._ttArrowEl, style)
  }

  if (this._opts.setPos) {
    // if setPos callback provided it should return
    // { left, top, arrowPos(optional) }
    style = this._opts.setPos(this) || {};

    if (ElementTooltip.getType(side) == ElementTooltip.TYPE_VERTICAL) {
      if (style.arrowPosition !== (void 0)) {
        setStyle(this._ttArrowEl, {
          marginLeft: style.arrowPosition
        })
      } else {
        setArrowCenteredPosition('marginLeft')
      }
    } else {
      if (style.arrowPosition !== (void 0)) {
        setStyle(this._ttArrowEl, {
          marginTop: style.arrowPosition
        })
      } else {
        setArrowCenteredPosition('marginTop')
      }
    }

  } else {
    if (!side && this._prevSide && this._opts.preventSideChange) {
      side = this._prevSide;
    } else if (!side) {
      if (this._opts.type == ElementTooltip.TYPE_VERTICAL) {
        var inMessages = hasClass(bodyNode, 'body_im');
        var bottomGap = inMessages ? 60 : (this._opts.bottomGap || 0);

        var enoughSpaceAbove = (boundingBox.top - boundingElPos[1]) > ttelSize[1] + arrowSize - offset[1];
        var enoughSpaceBelow = (scrollGetY() + boundingElSize[1] - (boundingBox.top + boundingBox.height + arrowSize) - bottomGap) > ttelSize[1];

        if (this._opts.defaultSide == 'top') {
          side = enoughSpaceAbove ? 'top' : 'bottom'
        } else {
          side = enoughSpaceBelow ? 'bottom' : 'top'
        }
      } else {
        if ((boundingBox.left - boundingElPos[0]) < ttelSize[0]) {
          side = 'right';
        } else {
          side = 'left';
        }
      }
    }

    var parentPos = getXY(this._appendToEl);
    var parentOffset = [
      boundingBox.left - parentPos[0],
      boundingBox.top - parentPos[1]
    ];

    var shift;
    var totalLeftOffset = offset[0] + parentOffset[0];

    if (this._opts.centerShift) {
      totalLeftOffset += this._opts.centerShift || 0;
      shift = this._opts.centerShift;
    } else if (this._opts.rightShift) {
      shift = -(ttelSize[0]/2 - this._opts.rightShift);
      totalLeftOffset += shift;
    }

    this._prevSide = side;

    var horAlignOffset;
    var verAlignOffset;
    var overflow;
    var padding = 20;

    if (this._opts.align === (vk.rtl ? ElementTooltip.ALIGN_LEFT : ElementTooltip.ALIGN_RIGHT)) {
      horAlignOffset = boundingBox.width - ttelSize[0];
      verAlignOffset = boundingBox.height - ttelSize[1];
    } else if (this._opts.align === (vk.rtl ? ElementTooltip.ALIGN_RIGHT : ElementTooltip.ALIGN_LEFT)) {
      horAlignOffset = 0;
      verAlignOffset = 0;
    } else {
      horAlignOffset = -ttelSize[0]/2 + boundingBox.width/2;
      verAlignOffset = boundingBox.height/2 - ttelSize[1]/2;
    }

    switch (side) {
      case 'bottom':
        overflow = horAlignOffset + boundingBox.left + offset[0] + ttelSize[0] + padding - (boundingElPos[0] + boundingElSize[0]);

        if (overflow < 0) {
          overflow = 0;
        }

        shift = shift ? shift - overflow : -overflow;
        style = {
          left: horAlignOffset + totalLeftOffset - overflow,
          top: boundingBox.height + arrowSize - offset[1] + parentOffset[1]
        };
        break;

      case 'top':
        overflow = horAlignOffset + boundingBox.left + offset[0] + ttelSize[0] + padding - (boundingElPos[0] + boundingElSize[0]);

        if (overflow < 0) {
          overflow = 0;
        }

        shift = shift ? shift - overflow : -overflow;
        style = {
          left: horAlignOffset + totalLeftOffset - overflow,
          top: -ttelSize[1] - arrowSize + offset[1] + parentOffset[1]
        };
        break;

      case 'right':
        overflow = verAlignOffset + boundingBox.top + offset[1] - (boundingElPos[1] + padding);

        if (overflow > 0) {
          overflow = 0;
        }

        shift = shift ? shift - overflow : -overflow;
        style = {
          left: boundingBox.width + arrowSize + totalLeftOffset,
          top: verAlignOffset + offset[1] + parentOffset[1] - overflow
        };
        break;

      case 'left':
        overflow = verAlignOffset + boundingBox.top + offset[1] - (boundingElPos[1] + padding);

        if (overflow > 0) {
          overflow = 0;
        }

        shift = shift ? shift - overflow : -overflow;
        style = {
          left: -ttelSize[0] - arrowSize + totalLeftOffset,
          top: verAlignOffset + offset[1] + parentOffset[1] - overflow
        };
        break;
    }

    if (this._opts.type == ElementTooltip.TYPE_VERTICAL) {
      setArrowCenteredPosition('marginLeft', shift)
    } else {
      setArrowCenteredPosition('marginTop', shift)
    }
  }

  each(['top', 'bottom', 'left', 'right'], function(i, s) {
    if (side != s) {
      removeClass(this._ttel, 'eltt_' + s);
    }
  }.bind(this));

  addClass(this._ttel, 'eltt_' + side);
  setStyle(this._ttel, style);
};

ElementTooltip.prototype._hide = function(byElClick) {
  this._isShown = false;

  this._clearTimeouts();

  this._reTimeout = setTimeout((function() {
    hide(this._ttel);

    this._opts.elClassWhenShown && removeClass(this._el, this._opts.elClassWhenShown);
    this._opts.onHide && this._opts.onHide(this._ttel, !!byElClick);
  }).bind(this), ElementTooltip.FADE_SPEED);

  if (this._opts.onBeforeHide) {
    try {
      this._opts.onBeforeHide(this._ttel, !!byElClick);
    } catch(e) {}
  }

  removeClass(this._ttel, 'eltt_vis');
  this._ev_wclick && removeEvent(document, 'mousedown', this._ev_wclick);
}

ElementTooltip.prototype.isShown = function() {
  return this._isShown;
}

ElementTooltip.prototype.toggle = function() {
  if (this.isShown()) {
    this.hide();
  } else {
    this.show();
  }
}

ElementTooltip.prototype._clearTimeouts = function() {
  this._visTO && clearTimeout(this._visTO); this._visTO = false;
  this._sto && clearTimeout(this._sto); this._sto = false;
  this._hto && clearTimeout(this._hto); this._hto = false;
  this._reTimeout && clearTimeout(this._reTimeout); this._reTimeout = false;
}

ElementTooltip.prototype.getContent = function() {
  return geByClass1('_eltt_content', this._ttel);
}

/* UI Radio */

window.radioBtns = {};

function radioval(name) {
  return radioBtns[name] ? radioBtns[name].val : false;
}

function radiobtn(el, v, name) {
  if (!radioBtns[name]) return;
  each(radioBtns[name].els, function() {
    if (this == el) {
      addClass(this, 'on');
    } else {
      removeClass(this, 'on');
    }
  });
  return radioBtns[name].val = v;
}

/* UI Buttons */

function createButton(el, onClick) {
  el = ge(el);
  if (!el || el.btnevents) return;
  if (hasClass(el, 'flat_button')) {
    if (isFunction(onClick)) {
      el.onclick = onClick.pbind(el);
    }
    return;
  }
  var p = el.parentNode;
  if (hasClass(p, 'button_blue') || hasClass(p, 'button_gray')) {
    if (isFunction(onClick)) {
      el.onclick = onClick.pbind(el);
    }
    return;
  }
  var hover = false;
  addEvent(el, 'click mousedown mouseover mouseout', function(e) {
    if (hasClass(p, 'locked')) return;
    switch (e.type) {
    case 'click':
      if (!hover) return;
      el.className = 'button_hover';
      onClick(el);
      return cancelEvent(e);
    break;
    case 'mousedown':
      el.className = 'button_down';
    break;
    case 'mouseover':
      hover = true;
      el.className = 'button_hover';
    break;
    case 'mouseout':
      el.className = 'button';
      hover = false;
    break;
    }
  });
  el.btnevents = true;
}

function actionsMenuItemLocked(el) {
  if (!(el = ge(el))) return;
  return hasClass(el, 'ui_actions_menu_item_lock');
}

function lockActionsMenuItem(el) {
  if (
    (el = ge(el)) &&
    hasClass(el, 'ui_actions_menu_item') &&
    !hasClass(el, 'ui_actions_menu_item_lock')
  ) {
    data(el, 'inner', el.innerHTML);
    addClass(el, 'ui_actions_menu_item_lock');
    var lockText = ce('div', {className: 'ui_actions_menu_item_lock_text'});
    val(lockText, el.innerHTML);
    el.appendChild(lockText);
    showProgress(el);
  }
}

function unlockActionsMenuItem(el) {
  if (
    (el = ge(el)) &&
    hasClass(el, 'ui_actions_menu_item') &&
    hasClass(el, 'ui_actions_menu_item_lock')
  ) {
    removeClass(el, 'ui_actions_menu_item_lock');
    el.innerHTML = data(el, 'inner');
  }
}

function linkLocked(el) {
  if (!(el = ge(el))) return;
  return hasClass(el, 'link_lock');
}

function lockLink(el) {
  if (
    !(el = ge(el)) ||
    el.tagName.toLowerCase() != 'a' ||
    linkLocked(el)
  ) return;
  addClass(el, 'link_lock');
}

function unlockLink(el) {
  if (
    !(el = ge(el)) ||
    !linkLocked(el)
  ) return;
  removeClass(el, 'link_lock');
}

function lockButton(el) {
  if (!(el = ge(el))) return;

  if (el.tagName.toLowerCase() != 'button' && !hasClass(el, 'flat_button') && !hasClass(el, 'wr_header') || isButtonLocked(el)) return;

  var elSize = getSize(el);

  addClass(el, 'flat_btn_lock');
  data(el, 'inner', el.innerHTML);

  setStyle(el, { width: elSize[0], height: elSize[1] });

  el.innerHTML = '';

  showProgress(el, 'btn_lock');
}
function unlockButton(el) {
  if (!(el = ge(el))) return;

  if (!isButtonLocked(el)) return;

  hideProgress(el);
  el.innerHTML = data(el, 'inner');
  removeClass(el, 'flat_btn_lock');

  setStyle(el, { width: null, height: null });
}

function buttonLocked(el) {
  return isButtonLocked(el);
}

function isButtonLocked(el) {
  if (!(el = ge(el))) return;
  return hasClass(el, 'flat_btn_lock');
}

function disableButton(el, disable) {
  if (!(el = ge(el)) || el.tagName.toLowerCase() !== 'button') return;

  if (disable) {
    if (!isVisible(el)) {
      return
    }
    el.parentNode.insertBefore(ce('button', {innerHTML: el.innerHTML, className: el.className + ' button_disabled'}), el);
    hide(el);
  } else {
    var disabledEl = domPS(el);
    if (disabledEl && hasClass(disabledEl, 'button_disabled')) re(disabledEl);
    show(el);
  }
}

function lockFlatButton(el) {
  if (!el || el.tagName.toLowerCase() != 'button' || isButtonLocked(el)) return;
  addClass(el, 'flat_btn_lock');
  el.innerHTML = '<span class="flat_btn_h">'+el.innerHTML+'</span>';
}

function unlockFlatButton(el) {
  if (!isButtonLocked(el)) return;
  el.innerHTML = el.firstChild.innerHTML;
  removeClass(el, 'flat_btn_lock');
}

/* UI Ads */

window.__adsLoaded = vkNow();

function __adsGetAjaxParams(ajaxParams, ajaxOptions) {
  __adsGetAjaxParams = function() {
    return window.AdsLight && AdsLight.getAjaxParams.apply(AdsLight.getAjaxParams, arguments) || {al_ad: null};
  };
  var result = stManager.add(['aes_light.js'], __adsGetAjaxParams.pbind(ajaxParams, ajaxOptions));
  return result || {al_ad: null};
}

function __adsUpdate(force) {
  __adsUpdate = function() {
    window.AdsLight && AdsLight.updateBlock.apply(AdsLight.updateBlock, arguments);
  };
  stManager.add(['aes_light.js'], __adsUpdate.pbind(force));
}

function __adsSet(adsHtml, adsSection, adsCanShow, adsShowed, adsParams, adsProps) {
  __adsSet = function() {
    window.AdsLight && AdsLight.setNewBlock.apply(AdsLight.setNewBlock, arguments);
  };
  stManager.add(['aes_light.js'], __adsSet.pbind(adsHtml, adsSection, adsCanShow, adsShowed, adsParams, adsProps));
}

/* Post video */

window._videoLastInlined = false;
function showVideo(videoId, listId, options, ev) {
  if (cur.viewAsBox) return cur.viewAsBox();
  if (checkEvent(ev)) return true;

  if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == videoId) {
    videoview.unminimize();
    return false;
  }

  if (!options) {
    options = {};
  }

  var claim = nav.objLoc.claim,
      stat = ['videoview.js', 'videoview.css', 'page.js', 'page.css'];

  if (options.playlistId) {
    options.addParams = extend(options.addParams, {playlist_id: options.playlistId});
    if (!window.VideoPlaylist || !VideoPlaylist.getList(options.playlistId)) {
      options.addParams.load_playlist = intval(/^-?\d+_-?\d+$/.test(options.playlistId));
    }
  }

  var hub = new callHub(function() {
    if (!options.hidden) {
      revertLastInlineVideo();
      videoview.showVideo.apply(videoview, hub.data);
    } else {
      options.hidden(hub.data, options, listId, videoId);
    }
  }, 2);

  stManager.add(stat, function() {
    if (!options.hidden) {
      videoview.show(ev, videoId, listId, options);
    }
    hub.done();
  });

  extend(options, {onDone: function() {
    hub.data = arguments;
    hub.done();
  }, cache: (listId != 'status')});

  var actParams = options.params;

  if (!actParams) {
    actParams = {
      act: 'show',
      video: videoId,
      list: listId,
      autoplay: (options.autoplay) ? 1 : 0,
      ad_video: options.ad_video,
      module: options.module || currentModule() || '',
      svids: options.svids,
    };
  }
  if (options.addParams) {
    actParams = extend(actParams, options.addParams);
  }
  if (!trim(actParams.module)) {
    extend(actParams, { _nol: JSON.stringify(nav.objLoc) });
  }
  if (claim) {
    actParams.claim = claim;
  }
  ajax.post('al_video.php', actParams, options);

  vkImage().src = locProtocol + '//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-';

  return false;
}

window.VideoConstants = {
  VIDEO_ITEM_INDEX_OWNER_ID: 0,
  VIDEO_ITEM_INDEX_ID:       1,
  VIDEO_ITEM_INDEX_THUMB:    2,
  VIDEO_ITEM_INDEX_TITLE:    3,
  VIDEO_ITEM_INDEX_FLAGS:    4,
  VIDEO_ITEM_INDEX_DURATION: 5,
  VIDEO_ITEM_INDEX_HASH:     6,
  VIDEO_ITEM_INDEX_MODER_ACTS: 7,
  VIDEO_ITEM_INDEX_OWNER:    8,
  VIDEO_ITEM_INDEX_DATE:     9,
  VIDEO_ITEM_INDEX_VIEWS:    10,

  VIDEO_ITEM_FLAG_EXTERNAL:        1 << 0,
  VIDEO_ITEM_FLAG_DOMAIN_YT:       1 << 1,
  VIDEO_ITEM_FLAG_DOMAIN_COUB:     1 << 2,
  VIDEO_ITEM_FLAG_DOMAIN_RT:       1 << 3,
  VIDEO_ITEM_FLAG_DOMAIN_PLADFORM: 1 << 4,
  VIDEO_ITEM_FLAG_DOMAIN_VIMEO:    1 << 5,
  VIDEO_ITEM_FLAG_CAN_EDIT:        1 << 6,
  VIDEO_ITEM_FLAG_CAN_DELETE:      1 << 7,
  VIDEO_ITEM_FLAG_CAN_ADD:         1 << 8,
  VIDEO_ITEM_FLAG_PRIVATE:         1 << 9,
  VIDEO_ITEM_FLAG_NO_AUTOPLAY:     1 << 10,
  VIDEO_ITEM_FLAG_ADDED:           1 << 11,
  VIDEO_ITEM_FLAG_SKIP_THUMB_LOAD: 1 << 12,
  VIDEO_ITEM_FLAG_NEED_SIGN_IN:    1 << 13,
  VIDEO_ITEM_FLAG_HD:              1 << 14,
};

function videoCallback(params) {
  var method = params.shift();
  if (window.Videoview && Videoview.playerCallback[method]) {
    Videoview.playerCallback[method].apply(Videoview, params);
  } else {
    throw Error('Unregistered player callback: ' + method);
  }
}

function checkMp4(callback) {
  if (browser.smart_tv) {
    callback(true);
    return;
  }

  if (window.localStorage && localStorage.getItem('video_can_play_mp4')) {
    callback(true);
    return;
  }

  var sessionValue = window.sessionStorage && sessionStorage.getItem('video_can_play_mp4');
  if (sessionValue != null) {
    callback(!!intval(sessionValue));
    return;
  }

  var _timeout;
  var _resolved;

  var v = ce('video');
  if (v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"').replace('no', '')) {
    v.onloadedmetadata = _resolve.pbind(true);
    v.onerror = function() {
      _resolve(false, 'error_' + v.error.code);
    };
    v.src = '/images/blank.mp4';
    v.load();
    _timeout = setTimeout(_resolve.pbind(false, 'timeout'), 3000);
  } else {
    _resolve(false, 'video_type');
  }

  function _resolve(canPlay, reason) {
    if (_resolved) return;
    _resolved = true;
    var storage = canPlay ? window.localStorage : window.sessionStorage;
    try {
      storage.setItem('video_can_play_mp4', intval(canPlay));
    } catch(e) {}
    callback(canPlay, reason);
    clearTimeout(_timeout);
    v.src = '';
    v.load();
    v = v.onloadedmetadata = v.onerror = null;
  }
}

/* Post audio */


function audioSearchPerformer(ref, ev) {}

function padAudioPlaylist() {
  return window.audioPlaylist || ls.get('pad_playlist');
}

function toggleAudioLyrics(event, ref, audioId, lyricsId) {
  if (!lyricsId) {
    return false;
  }

  var audioRowEl = gpeByClass('_audio_row', ref);
  var lyricsEl = geByClass1('_audio_lyrics_wrap', audioRowEl);

  if (lyricsEl.innerHTML) {
    toggle(lyricsEl);
    cancelEvent(event);
    return false;
  }

  lyricsId = intval(lyricsId);

  if (lyricsId) {
    addClass(audioRowEl, 'audio_loading');
    showProgress(audioRowEl);

    ajax.post('al_audio.php', { act: 'get_lyrics', aid: audioId, lid: lyricsId }, {
      onDone: function(lyrics) {
        hideProgress(audioRowEl);
        removeClass(audioRowEl, 'audio_loading');

        lyricsEl.innerHTML = lyrics;
        show(lyricsEl);
      }
    });

    cancelEvent(event);
  }

  return false;
}

function getAudioPlayer() {
  getAudioPlayer.run || extend(getAudioPlayer, {
    queue: [],
    run: function() {
      window.ap = new AudioPlayer();
      var func = null;
      while (func = getAudioPlayer.queue.shift()) ap[func.name].apply(ap, func.args);
    },
    wrapper: {
      toggleAudio: function() {
        if (vk && vk.widget && !vk.id) {
          Widgets.oauth();
          return false;
        }
        getAudioPlayer.queue.push({
          name: 'toggleAudio',
          args: [].slice.call(arguments)
        });
      }
    }
  });

  if (window.ap) return ap;
  if (window.AudioPlayer) return window.ap = new AudioPlayer();

  stManager.add(['audioplayer.js', 'audioplayer.css', 'ui_common.js', 'ui_common.css'], getAudioPlayer.run);
  return getAudioPlayer.wrapper;
}
function audioShowActionTooltip(btn, shift, needDownAndLeft) {
  if (cur._addRestoreInProgress) return;

  var audioRow = gpeByClass('_audio_row', btn);
  var audioObject = AudioUtils.getAudioFromEl(audioRow, true)
  var action = domData(btn, 'action');
  var text

  var audioAddRestoreInfo = AudioUtils.getAddRestoreInfo();

  switch(action) {
    case 'current_delete':
      text = getLang('audio_delete_from_current')
      break

    case 'recoms_delete':
      text = getLang('audio_dont_show');
      break

    case 'listened_delete':
      text = getLang('audio_remove_from_list');
      break

    case 'delete':
      if (window.AudioPage && AudioPage.isInRecentPlayed(audioRow)) { // todo: little bit hacky
        text = getLang('audio_remove_from_list');

      } else {
        var restores = audioAddRestoreInfo[audioObject.fullId];
        if (restores && restores.deleteAll) {
          text = restores.deleteAll.text;
        } else {
          text = getLang('global_delete_audio');
        }
      }
      break;

    case 'restore_recoms':
      text = getLang('audio_restore_audio');
      break

    case 'add':
      var info = audioAddRestoreInfo[audioObject.fullId];

      if (info && info.state == 'deleted') {
        text = getLang('audio_restore_audio');

      } else if (info && info.state == 'added') {
        text = getLang('global_delete_audio');

      } else {
        var audioPage = window.AudioPage ? currentAudioPage(btn) : false;
        if (audioPage && audioPage.getOwnerId() < 0 && audioPage.canAddToGroup()) {
          text = getLang('audio_add_to_group');
        } else {
          text = getLang('audio_add_to_audio');
        }
      }
      break;

    case 'edit':
      text = getLang('audio_edit_audio');
      break;

    case 'next':
      text = (cur.lang && cur.lang.global_audio_set_next_audio) || getLang('audio_set_next_audio');
      break;

    case 'recoms':
      text = getLang('audio_show_recommendations');
      break;
  }

  var options = {text: function() { return text; }, black: 1, shift: shift ? shift : [7, 4, 0], needLeft: true, forcetodown: needDownAndLeft };

  if (gpeByClass('_im_mess_stack', btn)) {
    options.appendParentCls = '_im_mess_stack';
    options.shift = [7, 10, 0];
    options.noZIndex = true;

  } else if (gpeByClass('top_notify_wrap', btn)) {
    options.appendParentCls = 'top_notify_wrap';
  }

  showTooltip(btn, options);
}

function playAudioNew() {
  cur.gpHidden = true;
  var args = arguments;
  if (args[args.length-1] !== false) args = Array.prototype.slice.apply(arguments).concat([true]);
  if (!browser.ipad) {
    stManager.add(['audioplayer.js', 'audioplayer.css'], function() {
      audioPlayer.operate.apply(null, args);
    });
  } else {
    audioPlayer.operate.apply(null, args);
  }
}

function currentAudioId() {
  return window.audioPlayer && audioPlayer.id;
}

function showAudioClaimWarning(audio, claim) {
  var claimText, claimTitle;
  var ownerId = audio.ownerId;
  var id = audio.id;
  var claimId = claim.id;
  var title = audio.title;
  var reason = claim.reason;

  if (reason == 'geo') {
    claimText = getLang('audio_claimed_geo');
    claimTitle = getLang('audio_claim_warning_title');
  } else if (reason == 'site_rules_violation') {
    claimText = getLang('audio_site_rules_violation_warning');
    claimTitle = getLang('audio_site_rules_violation_header');
  } else if (reason == 'subscription') {
    claimText = getLang('audio_claimed_future');
    claimTitle = getLang('audio_claimed_future_title');
  } else {
    claimText = getLang('audio_claim_warning');
    claimTitle = getLang('audio_claim_warning_title');
  }

  claimText = claimText.split('{audio}').join('<b>' + title + '</b>');

  var el = geByClass1('_audio_row_' + ownerId + '_' + id);
  el && showTooltip(el, {
    slide: 15,
    shift: [-3, 6],
    dir: 'auto',
    showdt: 0,
    hidedt: 200,
    appendEl: ge('main'),
    typeClass: 'like_tt audio_claim_warning_tt',
    content: '<div class="audio_claim_warning_title">' + claimTitle + '</div><div class="audio_claim_warning_content">' + claimText + '</div>'
  });
}

function parallel() {
  var args = [].slice.call(arguments)
  var onDoneAll = args.pop()
  var hub = new callHub(onDoneAll, args.length)
  each(args, function (i, func) {
    func(function () {
      hub.done()
    })
  })
}

function shareAudioPlaylist(event, playlistOwnerId, playlistId, accessHash) {
  showBox('like.php', {
    act: 'publish_box',
    object: 'audio_playlist' + playlistOwnerId + '_' + playlistId,
    list: accessHash,
  }, {
    stat: ['wide_dd.js', 'wide_dd.css', 'sharebox.js']
  });

  return cancelEvent(event)
}

/* Post photo */

function isPhotoeditor3Available() {
  return (browser.msie ? parseInt(browser.version) > 10 : true);
}

/* Article */
function bookmark(ownerId, objectId, objectType, hash, isBookmarked, itemAccessHash, ref) {
  isBookmarked = isBookmarked || false;
  itemAccessHash = itemAccessHash || '';
  ref = ref || '';

  ajax.post('al_bookmarks.php', {
    act: 'bookmark',
    owner_id: ownerId,
    object_id: objectId,
    type: objectType,
    state: isBookmarked ? 1 : 0,
    hash: hash,
    item_access_hash: itemAccessHash,
    ref: ref,
  }, {
    onDone: function(addedText, tags, objectTypeInt, setTagHash) {
      if (addedText) {
        var boxEl = window.showDoneBox(addedText)
        var setTagEl = geByClass1('bookmarks_tag_set', boxEl)
        if (setTagEl && !isEmpty(tags)) {
          var tagsArray = []
          each(tags, function(id, tag) {
            tagsArray.push(tag)
          })
          tagsArray.sort(function(a, b) {
            return a.order - b.order
          })

          var content = '<div class="bookmarks_tags_list">';
          for (var i = 0; i < tagsArray.length; i++) {
            var tag = tagsArray[i]
            content += '<div class="bookmarks_tags_list_item" data-id=' + tag.id + '">'+tag.name+'</div>';
          }
          content += '</div>';

          content = se(content)

          content.addEventListener('click', function(e) {
            var tagEl = domClosest('bookmarks_tags_list_item', e.target)
            if (tagEl) {
              var tagId = domData(tagEl, 'id')
              var added = toggleClass(tagEl, 'bookmarks_tags_list_item--selected')
              ajax.post('al_bookmarks.php', {
                act: 'set_tag',
                item_type: objectTypeInt,
                item_oid: ownerId,
                item_id: objectId,
                hash: setTagHash,
                tag_id: tagId,
                is_tagged: intval(!added),
              })
            }
          })

          if (cur.setBookmarksTagTooltip) {
            cur.setBookmarksTagTooltip.destroy()
          }

          stManager.add(['ui_common.css', 'ui_common.js'], function() {})

          cur.setBookmarksTagTooltip = new ElementTooltip(setTagEl, {
            content: content,
            appendToParent: true,
            cls: 'bookmarks_tag_set_tt',
            offset: [0, -26],
            onFirstTimeShow: function(contentEl) {
              stManager.add(['ui_common.css', 'ui_common.js'], function() {
                cur.setBookmarksTagTooltipScroll = new uiScroll(domFC(contentEl), { // eslint-disable-line new-cap
                  theme: 'dark',
                })
              })
            }
          })

          cur.destroy.push(function() {
            cur.setBookmarksTagTooltip.destroy()
          })
        }
      }
    }
  });
}

function bookmarkArticle(event, ele, ownerId, objectId, objectType, hash, isBookmarked) {
  if (ele) {
    isBookmarked = parseInt(domData(ele, 'state'));
    domData(ele, 'state', isBookmarked ? 0 : 1);
  }

  bookmark(ownerId, objectId, objectType, hash, isBookmarked);

  each(geByClass('_article_' + ownerId + '_' + objectId), function(i, el) {
    var btn = geByClass1('_bookmark_btn', el)
    domData(btn, 'state', isBookmarked ? 0 : 1);
  });

  return cancelEvent(event);
}

/* Widgets */

window.Widgets = {

  popupBoxWidth: 450,
  popupBoxHeight: 300,

  popupBoxOpen: function(url, params, name, opts) {
    opts = extend({
      width: this.popupBoxWidth,
      height: this.popupBoxHeight,
      onClose: null
    }, opts);

    params = extend({
      widget: 4
    }, params);

    if (browser.safari) opts.height += 45; /* safari popup window panel height, hardcoded to avoid popup jump */

    var left = Math.max(0, (screen.width - opts.width) / 2) + (screen.availLeft | 0),
      top = Math.max(0, (screen.height - opts.height) / 2) + (screen.availTop | 0);
    if (!/^https?:\/\//i.test(url)) {
      url = location.protocol + '//' + location.host + '/' + url.replace(/^\/+/, '');
    }
    window.activePopup = window.open(url + '?' + ajx2q(params), name, 'width='+opts.width+',height='+opts.height+',left='+left+',top='+top+',menubar=0,toolbar=0,location=0,status=0');
    if (activePopup) {
      activePopup.focus();
      opts.onClose && (function check() {
        !activePopup || activePopup.closed ? opts.onClose() : setTimeout(check, 1000);
      })();
    }
  },

  popupBoxAdjust: function(startWidth, startHeight, opts) {
    opts = extend({
      nocenter: false,
      container: false,
      forceWidth: false,
      forceHeight: false,
      minWidth: 0,
      minHeight: 0,
      attempts: 5,
      interval: 500
    }, opts);

    if (window.panelsHeight == void 0) window.panelsHeight = null;
    if (window.panelsWidth == void 0) window.panelsWidth = null;
    window.popupWidth = null;
    window.popupHeight = null;
    var interruptedCentering = opts.nocenter,
      interruptedResize = false,
      inter = 0,
      lastLeft = null,
      lastTop = null,
      loaded = false,
      resized = false,
      container = opts.container || geByClass1('box_layout') || ge('page_wrap'),
      scrollable = ge('box_layer_wrap') || bodyNode;

    if (!container || !scrollable) return;
    if (!startWidth) startWidth = this.popupBoxWidth;
    if (!startHeight) startHeight = this.popupBoxHeight;
    fixScrolls(true);

    function sL() {return window.screenX !== void 0 ? screenX : window.screenLeft;}
    function sT() {return window.screenY !== void 0 ? screenY : window.screenTop;}

    function adjust() {
      if ((interruptedCentering || opts.nocenter) && interruptedResize) return;
      if (!interruptedCentering && lastLeft !== null && lastTop !== null && (lastLeft !== sL() || lastTop !== sT())) interruptedCentering = true;

      var containerWidth = container.scrollWidth,
        containerHeight = container.scrollHeight,
        width = Math.max(opts.minWidth, (opts.forceWidth ? startWidth : containerWidth)) + panelsWidth,
        height = Math.max(opts.minHeight, (opts.forceHeight ? startHeight : containerHeight)) + panelsHeight;

      if (screen.availWidth && screen.availHeight) {
        width = Math.min(screen.availWidth, width);
        height = Math.min(screen.availHeight, height);
      }

      if (width != popupWidth || height != popupHeight) {
        popupWidth = width + (containerHeight + panelsHeight > height ? sbWidth() + 1 : 0);
        popupHeight = height;
        resized = +new Date();

        interruptedCentering || opts.nocenter || window.moveTo(
          Math.floor((screen.width - popupWidth+ (browser.safari ? -panelsWidth : panelsWidth)) / 2) + (screen.availLeft | 0),
          Math.floor((screen.height - popupHeight + (browser.safari ? -panelsHeight : panelsHeight)) / 2) + (screen.availTop | 0)
        );

        window.resizeTo(popupWidth, popupHeight);
      }

      setTimeout(function() {
        if (!interruptedCentering) {
          lastLeft = sL();
          lastTop = sT();
        }
        onBodyResize();
      }, 0);
    }

    function fixScrolls(partly) {
      scrollable.style.overflow = 'hidden';
      !partly && setTimeout(function() {
        scrollable.style.overflow = '';
      }, 0);
    }

    function startAdjustment(newOpts) {
      if (interruptedCentering && interruptedResize) return;
      clearInterval(inter);
      newOpts && extend(opts, newOpts);

      if (panelsHeight === null) {
        if (window.innerWidth == void 0 || window.outerWidth == void 0) {
          resized = +new Date();
          window.resizeTo(startWidth, startHeight);
          panelsWidth = startWidth - (document.documentElement.clientWidth || document.body.clientWidth);
          panelsHeight = startHeight - (document.documentElement.clientHeight || document.body.clientHeight);
        } else {
          panelsWidth = outerWidth - innerWidth;
          panelsHeight = outerHeight - innerHeight;
        }
      }

      adjust();

      var i = 0;
      inter = setInterval(function() {
        adjust();
        if (++i >= opts.attempts) {
          clearInterval(inter);
        }
      }, opts.interval);
    }

    if (document.readyState === "complete") {
      loaded = true;
      fixScrolls();
    }
    addEvent(window, 'load', function() {
      loaded = true;
      fixScrolls();
    });

    addEvent(window, 'resize', function self() {
      if (!loaded) return;
      if (resized && (+new Date() - resized < 1000)) {
        resized = false;
        fixScrolls();
        return;
      }
      interruptedCentering = interruptedResize = true;
      clearInterval(inter);
      removeEvent(window, 'resize', self);
    });

    setTimeout(startAdjustment, 1);
    return startAdjustment;
  },

  oauth: function(options, params) {
    if (vk.show_external_auth_box) {
      return Widgets.popupBoxOpen(location.origin + '/al_settings.php', extend({
        act: 'external_auth_box',
        widget_hash: cur.widgetHash,
      }, isObject(params) ? params : {}), 'vk_external_auth', extend({
        width: 655,
        height: 171,
        onClose: function() {
          location.reload();
        }
      }, isObject(options) ? options : {}));
    }
    Widgets.popupBoxOpen(location.protocol + '//oauth.vk.com/authorize', extend({
      client_id: -1,
      redirect_uri: 'close.html',
      display: 'widget'
    }, isObject(params) ? params : {}), 'vk_openapi', extend({
      width: 655,
      height: 430,
      onClose: window.gotSession ? window.gotSession.pbind(true) : void 0
    }, isObject(options) ? options : {}));
  },

  showTooltip: (function(showTooltip) {
    return function() {
      var args = [].slice.call(arguments);
      args[1] = extend(args[1] || {}, {
        showIfFit: true
      });
      return showTooltip.apply(this, args);
    }
  })(window.showTooltip),

  showReCaptchaBox: function(key, lang, box, o) {
    showBox('al_apps.php', {
      act: 'show_recaptcha_box',
      box_msg: o.addText,
      widget_width: 352
    });
    cur.Rpc.methods.recaptcha = o.onSubmit || function() {};
    cur.Rpc.methods.recaptchaHide = function() {
      isFunction(cur.recaptchaHide) && cur.recaptchaHide();
      isFunction(o.onHide) && o.onHide();
    }
  },

  showPhoto: function(photo, list) {
    return showBox('al_photos.php', {
      act: 'photo_box',
      photo: photo,
      wall_owner: photo.split('_')[0],
      list: list,
      widget_width: 654
    });
  },

  showVideo: function(video, list) {
    window.revertLastInlineVideo && revertLastInlineVideo();
    return showBox('al_video.php', {
      act: 'video_box',
      video: video,
      list: list,
      wall_owner: video.split('_')[0],
      widget_width: 780,
      module: cur.module || '_alpost'
    });
  },

  showSubscribeBox: function(oid, callback, state, isEvent) {
    window.subscribedCallback = callback ? callback : function() {};
    Widgets.popupBoxOpen('widget_community.php', {
      act: 'a_subscribe_box',
      oid: oid,
      state: state !== void 0 ? state : 1,
      is_event: isEvent ? 1 : void 0
    }, 'vk_subscribe', {
      height: 291
    });
  },

  showUnsubscribeBox: function(oid, callback) {
    window.unsubscribedCallback = callback ? callback : function() {};
    Widgets.popupBoxOpen('widget_community.php', {
      act: 'a_unsubscribe_box',
      oid: oid
    }, 'vk_unsubscribe', {
      height: 291
    });
  },

  showBox: function(allowed, onbefore) {
    var originalShowBox = window.showBox;

    allowed = extend(allowed || {}, {
      'blank.php': true,
      'al_apps.php': {'show_recaptcha_box': true}
    });

    return function(url, params, options, e) {
      if (allowed[url] && (!isObject(allowed[url]) || allowed[url][params.act])) {
        window.tooltips && tooltips.hideAll();
        onbefore && onbefore();

        if (isObject(allowed[url]) && allowed[url][params.act] && isObject(allowed[url][params.act].params)) {
          extend(params, allowed[url][params.act].params);
        }

        if (vk.amp) {
          Widgets.popupBoxOpen(url, extend({
            widget_hash: cur.widgetHash,
          }, params), url+'_'+params.act, {
            width: params.widget_width || void 0,
            height: params.widget_height || void 0,
          });
        } else {
          var stat = params.act && isObject(allowed[url]) && allowed[url][params.act].stat;
          stat && cur.Rpc.callMethod('showLoader', true);

          stManager.add(stat || [], function() {
            params = extend({
              widget_hash: cur.widgetHash,
              widget: 2,
              scrollbar_width: window.sbWidth(),
              widget_width: options && options.params && intval(options.params.width) || void(0)
            }, params);
            cur.Rpc.callMethod('showBox', url+'?' + ajx2q(params), {
              height: window.outerHeight || screen.availHeight || 768,
              width: window.outerWidth || screen.availWidth || 1028,
              base_domain: '//' + location.hostname + '/'
            });
          });
        }
      } else {
        debugLog('Forbidden request: '+params.act+' in '+url);
        return true;
      }
      return false;
    }
  },

  hideBox: function() {
    window.Rpc && Rpc.callMethod('destroy');
  },

  showInlineVideo: function(videoId, listId, options, ev, thumb) {
    if (checkEvent(ev)) return true;

    if (window.mvcur && mvcur.mvShown) {
      return showVideo(videoId, listId, options, ev);
    }

    options = options || {};
    options.params = options.params || {act: 'show_inline', video: videoId, list: listId, autoplay: (options.autoplay) ? 1 : 0, module: options.module || cur.module || ''};
    if (!trim(options.params.module)) {
      extend(options.params, { _nol: JSON.stringify(nav.objLoc) });
    }
    var h = thumb.clientHeight,
        w = thumb.clientWidth,
        btn = geByClass1('video_play_inline', thumb, 'div');

    extend(options.params, {width: w, height: h});
    extend(options.params, options.addParams);

    options.onDone = function (title, html, js, opts) {
      revertLastInlineVideo();
      hide(thumb);
      var videoWrap = ce('div', {id: 'page_video_inline_wrap' + videoId, className: 'page_video_inline_wrap', innerHTML: html}, {width: w, height: h}),
          videoBg = ge('video_background' + videoId);
      _videoLastInlined = [videoWrap, thumb]
      thumb.parentNode.appendChild(videoWrap);
      videoBg && setStyle(geByTag1('img', videoBg), {width: w, height: h});
      cur.mvOpts = opts && opts.mvData ? opts.mvData : false;
      if (opts.player) {
        var container = domByClass(videoWrap, 'video_box_wrap');
        VideoInitializer.initPlayer(container, opts.player.type, opts.player.params);
      }
      try {
        eval('(function () {' + js + '})();');
      } catch (e) {
      }

      if (!options.params.mute) {
        var _n = window.Notifier, _a = window.audioPlayer;
        if (_n) setTimeout(function() { _n.lcSend('video_start'); }, 0);
        if (_a && _a.player && !_a.player.paused()) {
          _a.pauseTrack();
          _a.pausedByVideo = 1;
        }
      }
    };
    options.onFail = function(text) {
      showBox('blank.php', {code: 1901});
      return true;
    }
    options.showProgress = function () {
      addClass(btn, 'video_play_inline_loading');
    };
    options.hideProgress = function () {
      removeClass(btn, 'video_play_inline_loading');
    };
    stManager.add('videoview.js', function() {
      ajax.post('al_video.php', options.params, options);
      vkImage().src = locProtocol + '//vk.com/rtrg?r=w*Z1Flwi3QdbWaoLMc7zOA*7Cr4Nrtojr9otHjsjIhsb2CVqRWalgbvxZw3MzxZa6be3Siu2XY3gvK5fysYtWLWgNwHMpjRTupSGZrcGRNlj7fduqq9*t7ij6CX4aMcBTD5be8mIXJsbTsvP8Zl2RZEd76a4FTuCOFqzMxqGtFc-';
    });
    return false;
  },

  revertLastInlineVideo: function(ancestor) {
    if (!_videoLastInlined) {
      return;
    }
    var current, found = false;
    if ((ancestor = ge(ancestor)) &&
        (current = _videoLastInlined[0])) {
      while (current = current.parentNode) {
        if (current == ancestor) {
          found = true;
          break;
        }
      }
      if (!found) {
        return;
      }
    }
    re(_videoLastInlined[0]);
    show(_videoLastInlined[1]);
    _videoLastInlined = false;
    delete cur.mvOpts;
  },

  pauseLastInlineVideo: function() {
    if (!_videoLastInlined) {
      return;
    }
    var player = ge('video_player') || window.html5video || null;
    if (player && player.playVideo) {
      player.playVideo(false);
    }
  }

};

function loadScript(scriptSrc, options) {
  var timeout = options.timeout;
  var onLoad = options.onLoad;
  var onError = options.onError;

  var script = document.createElement('script');
  script.addEventListener('load', success);
  script.addEventListener('readystatechange', success);
  script.addEventListener('error', fail);
  script.src = scriptSrc;
  document.head.appendChild(script);

  if (timeout) {
    var failTimeout = setTimeout(fail, timeout);
  }

  function success(evt) {
    if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') return;

    removeListeners();
    onLoad && onLoad();
  }

  function fail(evt) {
    removeListeners();
    onError && onError();
  }

  function removeListeners() {
    clearTimeout(failTimeout);
    script.removeEventListener('load', success);
    script.removeEventListener('readystatechange', success);
    script.removeEventListener('error', fail);
  }

  return {
    destroy: function destroy() {
      removeListeners();
    }
  };
}

function getStatusExportHash() {
  return vk.statusExportHash;
}

var urlActiveExp = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9à-ÿº´¿_\-]+\.)+(?:ðô|óêð|îíëàéí|ñàéò|ñðá))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
  urlInactiveExp = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9à-ÿº´¿_\-]+\.)+(?:ðô|óêð|îíëàéí|ñàéò|ñðá))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;

function extractUrls(text, inactive) {
  var rx = inactive ? urlInactiveExp : urlActiveExp,
    matches;

  var result = [];
  while (text && (matches = text.match(rx))) {
    text = text.substr(matches.index + matches[0].length);
    var offset = 0;
    if (!matches[4]) {
      offset = 7;
    }
    result.push({url: matches[2 + offset], query: matches[5 + offset] || '', domain: matches[4 + offset]});
  }

  return result;
}

function updateMoney(balance, balanceEx) {
  if (balance === undefined || balance === false) return;
  var postfix = '';
  if (balanceEx === true) {
    vk.balanceEx = balance;
    postfix = '_ex';
  } else {
    vk.balance = balance;
  }
  var els = geByClass('votes_balance_nom' + postfix);
  for (var i in els) {
    els[i].innerHTML = balance+' '+getLang('votes_flex', balance);
  }
  var money = balance * (vk.vcost || 7.0);
  var els = geByClass('money_balance_nom' + postfix);
  for (var i in els) {
    els[i].innerHTML = getLang('global_money_amount_rub', money, true);
  }
  if (balanceEx !== undefined && balanceEx !== false && balanceEx !== true) {
    updateMoney(balanceEx, true);
  }
}

function formatCount(count, opts) {
  opts = opts || {};
  var kLimit = opts.kLimit || 1000;
  var mLimit = opts.mLimit || 1000000;

  if (count >= mLimit && !opts.noCheck) {
    count = intval(count / 100000);
    count = (count > 1000) ? intval(count / 10) : count / 10;
    return formatCount(count, extend(opts, {
      noCheck: true
    }), true) + 'M';
  } else if (count >= kLimit && !opts.noCheck) {
    count = intval(count / 100);
    count = (count > 100) ? intval(count / 10) : count / 10;
    return formatCount(count, extend(opts, {
      noCheck: true
    }), true) + 'K';
  }

  return langNumeric(count, '%s', true).replace(/,/g, '\.');
}

addEvent(window, 'DOMContentLoaded load', function() {
  vk.loaded = true;
});

if (!window.constants) {
  window.constants = {};
}

window.constants.Groups = {
  GROUPS_ADMIN_LEVEL_USER: 0,
  GROUPS_ADMIN_LEVEL_MODERATOR: 1,
  GROUPS_ADMIN_LEVEL_EDITOR: 2,
  GROUPS_ADMIN_LEVEL_ADMINISTRATOR: 3,
  GROUPS_ADMIN_LEVEL_HOST: 4,
  GROUPS_ADMIN_LEVEL_EVENT_CREATOR: 5,
  GROUPS_ADMIN_LEVEL_CREATOR: 6,
  GROUPS_ADMIN_PSEUDO_LEVEL_ADVERTISER: 100
};

window.getPageHeaderHeight = (function() {
  var cached;
  return function() {
    var headerEl = ge('page_header');
    cached = cached || (headerEl ? headerEl.offsetHeight : 0);
    return cached;
  }
})();

try{stManager.done('lite.js');}catch(e){}
