/*
 ** Copyright (c) Jon <jon@jgubman.com>
 **
 ** Permission is hereby granted, free of charge, to any person obtaining a copy
 ** of this software and associated documentation files (the "Software"), to deal
 ** in the Software without restriction, including without limitation the rights
 ** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 ** copies of the Software, and to permit persons to whom the Software is
 ** furnished to do so, subject to the following conditions:
 **
 ** The above copyright notice and this permission notice shall be included in all
 ** copies or substantial portions of the Software.
 **
 ** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 ** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 ** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 ** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 ** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 ** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 ** SOFTWARE.
 */

"use strict";
(function (factory) {
  /*!
   * Custom Universal Module Definition (UMD)
   *
   * Video.js will never be a non-browser lib so we can simplify UMD a bunch and
   * still support requirejs and browserify. This also needs to be closure
   * compiler compatible, so string keys are used.
   */
  if (typeof define === "function" && define["amd"]) {
    define(["./video"], function (vjs) {
      factory(window, document, vjs);
    });
    // checking that module is an object too because of umdjs/umd#35
  } else if (typeof exports === "object" && typeof module === "object") {
    factory(window, document, require("video.js"));
  } else {
    factory(window, document, videojs);
  }
})(function (window, document, vjs) {
  //cookie functions from https://developer.mozilla.org/en-US/docs/DOM/document.cookie
  var getCookieItem = function (sKey) {
      if (!sKey || !hasCookieItem(sKey)) {
        return null;
      }
      var reg_ex = new RegExp(
        "(?:^|.*;\\s*)" +
          window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
          "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
      );
      return window.unescape(document.cookie.replace(reg_ex, "$1"));
    },
    setCookieItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return;
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires =
              vEnd === Infinity
                ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT"
                : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toGMTString();
            break;
        }
      }
      document.cookie =
        window.escape(sKey) +
        "=" +
        window.escape(sValue) +
        sExpires +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "") +
        (bSecure ? "; secure" : "");
    },
    hasCookieItem = function (sKey) {
      return new RegExp(
        "(?:^|;\\s*)" +
          window.escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
          "\\s*\\="
      ).test(document.cookie);
    },
    hasLocalStorage = function () {
      try {
        window.localStorage.setItem("persistVolume", "persistVolume");
        window.localStorage.removeItem("persistVolume");
        return true;
      } catch (e) {
        return false;
      }
    },
    getStorageItem = function (key) {
      return hasLocalStorage()
        ? window.localStorage.getItem(key)
        : getCookieItem(key);
    },
    setStorageItem = function (key, value) {
      return hasLocalStorage()
        ? window.localStorage.setItem(key, value)
        : setCookieItem(key, value, Infinity, "/");
    },
    extend = function (obj) {
      var arg, i, k;
      for (i = 1; i < arguments.length; i++) {
        arg = arguments[i];
        for (k in arg) {
          if (arg.hasOwnProperty(k)) {
            obj[k] = arg[k];
          }
        }
      }
      return obj;
    },
    defaults = {
      namespace: "",
      timeUpdateNamespace: "",
    },
    volumePersister = function (options) {
      var player = this;
      var settings = extend({}, defaults, options || {});

      var volumeKey = settings.namespace + "-" + "volume";
      var volumeMuteKey = settings.namespace + "-" + "mute";

      var timeKey = settings.timeUpdateNamespace + "-" + "time";

      /*player.on("volumechange", function() {
      setStorageItem(volumeKey, player.volume());
      setStorageItem(volumeMuteKey, player.muted());
    });*/

      $(window).on("beforeunload", function () {
        setStorageItem(volumeKey, player.volume());
        setStorageItem(volumeMuteKey, player.muted());
        setStorageItem(timeKey, player.currentTime());
        //localStorage.setItem('your_video_identifier', currentTime);
        return;
      });

      /*player.on("timeupdate", function() {
      setStorageItem(timeKey, player.currentTime());
    });*/

      player.one("loadedmetadata", function () {
        var persistedVolume = getStorageItem(volumeKey);
        if (persistedVolume !== null) {
          player.volume(persistedVolume);
        }

        var persistedMute = getStorageItem(volumeMuteKey);
        if (persistedMute !== null) {
          player.muted("true" === persistedMute);
        }

        var persistedTime = getStorageItem(timeKey);
        if (persistedTime !== null) {
          player.currentTime(parseFloat(persistedTime));
        }
      });
    };

  vjs.plugin("persistvolume", volumePersister);
});
