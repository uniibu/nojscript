/* eslint-env browser */
(() => {
  class jsOff {
    constructor () {
      this.toString = () => '[native code]';
      this.timer = null;
      this.iframeHolder = document.createElement('iframe');
      this.localVars = null;
      console.clear && console.clear();
    }
    _disable () {
      const _this = this;
      if (!_this.localVars) {
        const iframe = _this.iframeHolder.cloneNode();
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        const currentWindow = Object.getOwnPropertyNames(window);
        const results = currentWindow.filter(prop => !iframe.contentWindow.hasOwnProperty(prop));
        for (const vars of results) {
          if (_this.localVars === null) _this.localVars = {};
          const prop = window[vars];
          _this.localVars[vars] = prop;
          window[vars] = undefined;
        }

        document.body.removeChild(iframe);
      }
      eval('debugger');
    }
    _enable () {
      const _this = this;
      if (!_this.localVars) return;
      for (const vars in _this.localVars) {
        window[vars] = _this.localVars[vars];
      }
      _this.localVars = null;
    }
    _monitor () {
      const _this = this;
      if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
        _this._disable();
        return;
      }
      const devtool = /./;
      devtool.toString = () => {
        _this._disable();
      };
      console.log('%c', devtool);
      _this._enable();
      console.clear && console.clear();
    }
    start () {
      const _this = this;
      if (_this.timer) return;
      _this.timer = setInterval(() => _this._monitor(), 0);
    }
  }
  const j = new jsOff();
  j.start();
})();
