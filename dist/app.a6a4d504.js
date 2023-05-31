// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
    var nodeRequire = typeof require === 'function' && require;
  
    function newRequire(name, jumped) {
      if (!cache[name]) {
        if (!modules[name]) {
          // if we cannot find the module within our internal map or
          // cache jump to the current global require ie. the last bundle
          // that was added to the page.
          var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
          if (!jumped && currentRequire) {
            return currentRequire(name, true);
          }

           // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
            return previousRequire(name, true);
          }
  
          // Try the node require function if it exists.
          if (nodeRequire && typeof name === 'string') {
            return nodeRequire(name);
          }
  
          var err = new Error('Cannot find module \'' + name + '\'');
          err.code = 'MODULE_NOT_FOUND';
          throw err;
        }
  
        localRequire.resolve = resolve;
        localRequire.cache = {};
  
        var module = cache[name] = new newRequire.Module(name);
  
        modules[name][0].call(module.exports, localRequire, module, module.exports, this);
      }
  
      
    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };
  
  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/templates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobTemplate = void 0;

var jobTemplate = function jobTemplate(job, currency) {
  return "\n<div class=\"card\">\n  <div class=\"card-body\">\n  <h4 class=\"card-title\">".concat(job.title, " up to ").concat(currency).concat(job.salary_max, "</h4>\n  <h5>").concat(job.location.display_name, "</h5>\n  <p class=\"card-text\">").concat(job.description, "</p>\n  <a href=\"").concat(job.redirect_url, "\">View Job</a>\n  </div>\n</div>\n");
};

exports.jobTemplate = jobTemplate;
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.getCurrencySymbol = exports.extractFormData = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var extractFormData = function extractFormData(form) {
  return Array.from(form.elements).reduce(function (acc, _ref) {
    var id = _ref.id,
        value = _ref.value;
    return _objectSpread(_defineProperty({}, id, value), acc);
  }, {});
};

exports.extractFormData = extractFormData;

var getCurrencySymbol = function getCurrencySymbol(country) {
  var currencies = {
    gb: '£',
    us: '$',
    au: '$',
    ca: '$'
  };
  return currencies[country];
};

exports.getCurrencySymbol = getCurrencySymbol;
},{}],"src/JobSearch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobSearch = void 0;

var _templates = require("./templates");

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JobSearch =
/*#__PURE__*/
function () {
  function JobSearch(searchFormSelector, resultsContainerSelector, loadingElementSelector) {
    _classCallCheck(this, JobSearch);

    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
    this.loadingElement = document.querySelector(loadingElementSelector);
  }

  _createClass(JobSearch, [{
    key: "setCountryCode",
    value: function setCountryCode() {
      var _this = this;

      this.countryCode = 'gb';
      this.setCurrencySymbol();
      fetch('http://ip-api.com/json').then(function (results) {
        return results.json();
      }).then(function (results) {
        _this.countryCode = results.countryCode.toLowerCase();

        _this.setCurrencySymbol();
      });
    }
  }, {
    key: "setCurrencySymbol",
    value: function setCurrencySymbol() {
      this.currencySymbol = (0, _utils.getCurrencySymbol)(this.countryCode);
    }
  }, {
    key: "configureFormListener",
    value: function configureFormListener() {
      var _this2 = this;

      this.searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        _this2.startLoading();

        _this2.resultsContainer.innerHTML = '';

        var _extractFormData = (0, _utils.extractFormData)(_this2.searchForm),
            search = _extractFormData.search,
            location = _extractFormData.location;

            fetch("http://localhost:3000/?search=".concat(search, "&location=").concat(location, "&country=").concat(_this2.countryCode)).then(function (response) {
              return response.json();
            }).then(function (_ref) {
              var results = _ref.results;
    
              _this2.stopLoading();
    
              return results.map(function (job) {
                return (0, _templates.jobTemplate)(job, _this2.currencySymbol);
              }).join('');
            }).then(function (jobs) {
              return _this2.resultsContainer.innerHTML = jobs;
            }).catch(function () {
              return _this2.stopLoading();
            });
          });
        }
      }, {
        key: "startLoading",
        value: function startLoading() {
          this.loadingElement.classList.add('loading');
        }
      }, {
        key: "stopLoading",
        value: function stopLoading() {
          this.loadingElement.classList.remove('loading');
        }
      }]);

      return JobSearch;
}();

exports.JobSearch = JobSearch;
},{"./templates":"src/templates.js","./utils":"src/utils.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

var _JobSearch = require("./JobSearch");

var jobSearch = new _JobSearch.JobSearch('#search-form', '.result-container', '.loading-element');
jobSearch.setCountryCode();
jobSearch.configureFormListener();
},{"./JobSearch":"src/JobSearch.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50123" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
           hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();


