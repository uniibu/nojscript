var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */
(function () {
  var jsOff = function () {
    function jsOff() {
      _classCallCheck(this, jsOff);

      this.toString = function () {
        return '[native code]';
      };
      this.timer = null;
      this.iframeHolder = document.createElement('iframe');
      this.localVars = null;
      console.clear && console.clear();
    }

    _createClass(jsOff, [{
      key: '_disable',
      value: function _disable() {
        var _this = this;
        if (!_this.localVars) {
          var iframe = _this.iframeHolder.cloneNode();
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
          var currentWindow = Object.getOwnPropertyNames(window);
          var results = currentWindow.filter(function (prop) {
            return !iframe.contentWindow.hasOwnProperty(prop);
          });
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var vars = _step.value;

              if (_this.localVars === null) _this.localVars = {};
              var prop = window[vars];
              _this.localVars[vars] = prop;
              window[vars] = undefined;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          document.body.removeChild(iframe);
        }
        eval('debugger');
      }
    }, {
      key: '_enable',
      value: function _enable() {
        var _this = this;
        if (!_this.localVars) return;
        for (var vars in _this.localVars) {
          window[vars] = _this.localVars[vars];
        }
        _this.localVars = null;
      }
    }, {
      key: '_monitor',
      value: function _monitor() {
        var _this = this;
        if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
          _this._disable();
          return;
        }
        var devtool = /./;
        devtool.toString = function () {
          _this._disable();
        };
        console.log('%c', devtool);
        _this._enable();
        console.clear && console.clear();
      }
    }, {
      key: 'start',
      value: function start() {
        var _this = this;
        if (_this.timer) return;
        _this.timer = setInterval(function () {
          return _this._monitor();
        }, 0);
      }
    }]);

    return jsOff;
  }();

  var j = new jsOff();
  j.start();
})();
