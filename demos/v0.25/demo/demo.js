/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _index = __webpack_require__(184);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _Utils = __webpack_require__(211);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var fields = ["Name", "ISIN", "Bid", "Ask", "Last", "Yield"];
	
	var App = function (_React$Component) {
	    _inherits(App, _React$Component);
	
	    function App(props) {
	        _classCallCheck(this, App);
	
	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	
	        _this.state = { layoutFile: null, model: null, adding: false };
	
	        // save layout when unloading page
	        window.onbeforeunload = function (event) {
	            this.save();
	        }.bind(_this);
	
	        return _this;
	    }
	
	    _createClass(App, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.loadLayout("default", false);
	        }
	    }, {
	        key: "save",
	        value: function save() {
	            var jsonStr = JSON.stringify(this.state.model.toJson(), null, "\t");
	            localStorage.setItem(this.state.layoutFile, jsonStr);
	        }
	    }, {
	        key: "loadLayout",
	        value: function loadLayout(layoutName, reload) {
	            if (this.state.layoutFile !== null) {
	                this.save();
	            }
	
	            this.loadingLayoutName = layoutName;
	            var loaded = false;
	            if (!reload) {
	                var json = localStorage.getItem(layoutName);
	                if (json != null) {
	                    this.load(json);
	                    loaded = true;
	                }
	            }
	
	            if (!loaded) {
	                _Utils2.default.downloadFile("layouts/" + layoutName + ".layout", this.load.bind(this), this.error.bind(this));
	            }
	        }
	    }, {
	        key: "load",
	        value: function load(jsonText) {
	            var json = JSON.parse(jsonText);
	            var model = _index2.default.Model.fromJson(json);
	
	            // you can control where nodes can be dropped
	            //model.setOnAllowDrop(this.allowDrop.bind(this));
	
	            this.setState({ layoutFile: this.loadingLayoutName, model: model });
	        }
	    }, {
	        key: "allowDrop",
	        value: function allowDrop(dragNode, dropInfo) {
	            var dropNode = dropInfo.node;
	
	            // prevent non-border tabs dropping into borders
	            if (dropNode.getType() == "border" && (dragNode.getParent() == null || dragNode.getParent().getType() != "border")) return false;
	
	            // prevent border tabs dropping into main layout
	            if (dropNode.getType() != "border" && dragNode.getParent() != null && dragNode.getParent().getType() == "border") return false;
	
	            return true;
	        }
	    }, {
	        key: "error",
	        value: function error(reason) {
	            alert("Error loading json config file: " + this.loadingLayoutName + "\n" + reason);
	        }
	    }, {
	        key: "onAddClick",
	        value: function onAddClick(event) {
	            if (this.state.model.getMaximizedTabset() == null) {
	                this.refs.layout.addTabWithDragAndDropIndirect("Add grid<br>(Drag to location)", {
	                    component: "grid",
	                    name: "a new grid"
	                }, this.onAdded.bind(this));
	                this.setState({ adding: true });
	            }
	        }
	    }, {
	        key: "onShowLayoutClick",
	        value: function onShowLayoutClick(event) {
	            console.log(JSON.stringify(this.state.model.toJson(), null, "\t"));
	        }
	    }, {
	        key: "onAdded",
	        value: function onAdded() {
	            this.setState({ adding: false });
	        }
	    }, {
	        key: "onTableClick",
	        value: function onTableClick(node, event) {
	            console.log("tab: \n" + node._toAttributeString());
	            console.log("tabset: \n" + node.getParent()._toAttributeString());
	        }
	    }, {
	        key: "factory",
	        value: function factory(node) {
	            // log lifecycle events
	            //node.setEventListener("resize", function(p){console.log("resize");});
	            //node.setEventListener("visibility", function(p){console.log("visibility");});
	            //node.setEventListener("close", function(p){console.log("close");});
	
	            var component = node.getComponent();
	
	            if (component === "grid") {
	                if (node.getExtraData().data == null) {
	                    // create data in node extra data first time accessed
	                    node.getExtraData().data = this.makeFakeData();
	                }
	
	                return _react2.default.createElement(SimpleTable, { fields: fields, onClick: this.onTableClick.bind(this, node), data: node.getExtraData().data });
	            } else if (component === "sub") {
	                var model = node.getExtraData().model;
	                if (model == null) {
	                    node.getExtraData().model = _index2.default.Model.fromJson(node.getConfig().model);
	                    model = node.getExtraData().model;
	                    // save submodel on save event
	                    node.setEventListener("save", function (p) {
	                        node.getConfig().model = node.getExtraData().model.toJson();
	                    });
	                }
	
	                return _react2.default.createElement(_index2.default.Layout, { model: model, factory: this.factory.bind(this) });
	            } else if (component === "text") {
	                return _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: node.getConfig().text } });
	            }
	        }
	    }, {
	        key: "onSelectLayout",
	        value: function onSelectLayout(event) {
	            this.loadLayout(event.target.value);
	        }
	    }, {
	        key: "onReloadFromFile",
	        value: function onReloadFromFile(event) {
	            this.loadLayout(this.state.layoutFile, true);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var onRenderTab = function onRenderTab(node, renderValues) {
	                //renderValues.content += " *";
	            };
	
	            var onRenderTabSet = function onRenderTabSet(node, renderValues) {
	                //renderValues.headerContent = "-- " + renderValues.headerContent + " --";
	                //renderValues.buttons.push(<img src="images/grey_ball.png"/>);
	            };
	
	            var contents = "loading ...";
	            if (this.state.model !== null) {
	                contents = _react2.default.createElement(_index2.default.Layout, {
	                    ref: "layout",
	                    model: this.state.model,
	                    factory: this.factory.bind(this),
	                    onRenderTab: onRenderTab,
	                    onRenderTabSet: onRenderTabSet });
	            }
	
	            return _react2.default.createElement(
	                "div",
	                { className: "app" },
	                _react2.default.createElement(
	                    "div",
	                    { className: "toolbar" },
	                    _react2.default.createElement(
	                        "select",
	                        { onChange: this.onSelectLayout.bind(this) },
	                        _react2.default.createElement(
	                            "option",
	                            { value: "default" },
	                            "Default"
	                        ),
	                        _react2.default.createElement(
	                            "option",
	                            { value: "simple" },
	                            "Simple"
	                        ),
	                        _react2.default.createElement(
	                            "option",
	                            { value: "justsplitters" },
	                            "Just Splitters"
	                        ),
	                        _react2.default.createElement(
	                            "option",
	                            { value: "sub" },
	                            "SubLayout"
	                        ),
	                        _react2.default.createElement(
	                            "option",
	                            { value: "complex" },
	                            "Complex"
	                        ),
	                        _react2.default.createElement(
	                            "option",
	                            { value: "preferred" },
	                            "Using Preferred size"
	                        ),
	                        _react2.default.createElement(
	                            "option",
	                            { value: "trader" },
	                            "Trader"
	                        )
	                    ),
	                    _react2.default.createElement(
	                        "button",
	                        { onClick: this.onReloadFromFile.bind(this) },
	                        "reload from file"
	                    ),
	                    _react2.default.createElement(
	                        "button",
	                        { disabled: this.state.adding, style: { float: "right" }, onClick: this.onAddClick.bind(this) },
	                        "Add"
	                    ),
	                    _react2.default.createElement(
	                        "button",
	                        { style: { float: "right" }, onClick: this.onShowLayoutClick.bind(this) },
	                        "Show Layout JSON in Console"
	                    )
	                ),
	                _react2.default.createElement(
	                    "div",
	                    { className: "contents" },
	                    contents
	                )
	            );
	        }
	    }, {
	        key: "makeFakeData",
	        value: function makeFakeData() {
	            var data = [];
	            var r = Math.random() * 50;
	            for (var i = 0; i < r; i++) {
	                var rec = {};
	                rec.Name = this.randomString(5, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	                rec.ISIN = rec.Name + this.randomString(7, "1234567890");
	                for (var j = 2; j < fields.length; j++) {
	                    rec[fields[j]] = (1.5 + Math.random() * 2).toFixed(2);
	                }
	                data.push(rec);
	            }
	            return data;
	        }
	    }, {
	        key: "randomString",
	        value: function randomString(len, chars) {
	            var a = [];
	            for (var i = 0; i < len; i++) {
	                a.push(chars[Math.floor(Math.random() * chars.length)]);
	            }
	
	            return a.join("");
	        }
	    }]);
	
	    return App;
	}(_react2.default.Component);
	
	var SimpleTable = function (_React$Component2) {
	    _inherits(SimpleTable, _React$Component2);
	
	    function SimpleTable() {
	        _classCallCheck(this, SimpleTable);
	
	        return _possibleConstructorReturn(this, (SimpleTable.__proto__ || Object.getPrototypeOf(SimpleTable)).apply(this, arguments));
	    }
	
	    _createClass(SimpleTable, [{
	        key: "shouldComponentUpdate",
	        value: function shouldComponentUpdate() {
	            return true;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;
	
	            var headercells = this.props.fields.map(function (field) {
	                return _react2.default.createElement(
	                    "th",
	                    { key: field },
	                    field
	                );
	            });
	
	            var rows = [];
	            for (var i = 0; i < this.props.data.length; i++) {
	                var row = this.props.fields.map(function (field) {
	                    return _react2.default.createElement(
	                        "td",
	                        { key: field },
	                        _this3.props.data[i][field]
	                    );
	                });
	                rows.push(_react2.default.createElement(
	                    "tr",
	                    { key: i },
	                    row
	                ));
	            }
	
	            return _react2.default.createElement(
	                "table",
	                { className: "simple_table", onClick: this.props.onClick },
	                _react2.default.createElement(
	                    "tbody",
	                    null,
	                    _react2.default.createElement(
	                        "tr",
	                        null,
	                        headercells
	                    ),
	                    rows
	                )
	            );
	        }
	    }]);
	
	    return SimpleTable;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById("container"));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var ReactBaseClasses = __webpack_require__(5);
	var ReactChildren = __webpack_require__(14);
	var ReactDOMFactories = __webpack_require__(22);
	var ReactElement = __webpack_require__(16);
	var ReactPropTypes = __webpack_require__(28);
	var ReactVersion = __webpack_require__(33);
	
	var createReactClass = __webpack_require__(34);
	var onlyChild = __webpack_require__(36);
	
	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;
	
	if (process.env.NODE_ENV !== 'production') {
	  var lowPriorityWarning = __webpack_require__(13);
	  var canDefineProperty = __webpack_require__(10);
	  var ReactElementValidator = __webpack_require__(23);
	  var didWarnPropTypesDeprecated = false;
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}
	
	var __spread = _assign;
	var createMixin = function (mixin) {
	  return mixin;
	};
	
	if (process.env.NODE_ENV !== 'production') {
	  var warnedForSpread = false;
	  var warnedForCreateMixin = false;
	  __spread = function () {
	    lowPriorityWarning(warnedForSpread, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.');
	    warnedForSpread = true;
	    return _assign.apply(null, arguments);
	  };
	
	  createMixin = function (mixin) {
	    lowPriorityWarning(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. ' + 'In React v16.0, it will be removed. ' + 'You can use this mixin directly instead. ' + 'See https://fb.me/createmixin-was-never-implemented for more info.');
	    warnedForCreateMixin = true;
	    return mixin;
	  };
	}
	
	var React = {
	  // Modern
	
	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },
	
	  Component: ReactBaseClasses.Component,
	  PureComponent: ReactBaseClasses.PureComponent,
	
	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,
	
	  // Classic
	
	  PropTypes: ReactPropTypes,
	  createClass: createReactClass,
	  createFactory: createFactory,
	  createMixin: createMixin,
	
	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,
	
	  version: ReactVersion,
	
	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};
	
	if (process.env.NODE_ENV !== 'production') {
	  var warnedForCreateClass = false;
	  if (canDefineProperty) {
	    Object.defineProperty(React, 'PropTypes', {
	      get: function () {
	        lowPriorityWarning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated,' + ' and will be removed in  React v16.0.' + ' Use the latest available v15.* prop-types package from npm instead.' + ' For info on usage, compatibility, migration and more, see ' + 'https://fb.me/prop-types-docs');
	        didWarnPropTypesDeprecated = true;
	        return ReactPropTypes;
	      }
	    });
	
	    Object.defineProperty(React, 'createClass', {
	      get: function () {
	        lowPriorityWarning(warnedForCreateClass, 'Accessing createClass via the main React package is deprecated,' + ' and will be removed in React v16.0.' + " Use a plain JavaScript class instead. If you're not yet " + 'ready to migrate, create-react-class v15.* is available ' + 'on npm as a temporary, drop-in replacement. ' + 'For more info see https://fb.me/react-create-class');
	        warnedForCreateClass = true;
	        return createReactClass;
	      }
	    });
	  }
	
	  // React.DOM factories are deprecated. Wrap these methods so that
	  // invocations of the React.DOM namespace and alert users to switch
	  // to the `react-dom-factories` package.
	  React.DOM = {};
	  var warnedForFactories = false;
	  Object.keys(ReactDOMFactories).forEach(function (factory) {
	    React.DOM[factory] = function () {
	      if (!warnedForFactories) {
	        lowPriorityWarning(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in v16.0+. Use the ' + 'react-dom-factories package instead. ' + ' Version 1.0 provides a drop-in replacement.' + ' For more info, see https://fb.me/react-dom-factories', factory);
	        warnedForFactories = true;
	      }
	      return ReactDOMFactories[factory].apply(ReactDOMFactories, arguments);
	    };
	  });
	}
	
	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(6),
	    _assign = __webpack_require__(4);
	
	var ReactNoopUpdateQueue = __webpack_require__(7);
	
	var canDefineProperty = __webpack_require__(10);
	var emptyObject = __webpack_require__(11);
	var invariant = __webpack_require__(12);
	var lowPriorityWarning = __webpack_require__(13);
	
	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	
	ReactComponent.prototype.isReactComponent = {};
	
	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};
	
	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};
	
	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          lowPriorityWarning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}
	
	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactPureComponent(props, context, updater) {
	  // Duplicated from ReactComponent.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	
	function ComponentDummy() {}
	ComponentDummy.prototype = ReactComponent.prototype;
	ReactPureComponent.prototype = new ComponentDummy();
	ReactPureComponent.prototype.constructor = ReactPureComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(ReactPureComponent.prototype, ReactComponent.prototype);
	ReactPureComponent.prototype.isPureReactComponent = true;
	
	module.exports = {
	  Component: ReactComponent,
	  PureComponent: ReactPureComponent
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	'use strict';
	
	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */
	
	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;
	
	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;
	
	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }
	
	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';
	
	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame
	
	  throw error;
	}
	
	module.exports = reactProdInvariant;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var warning = __webpack_require__(8);
	
	function warnNoop(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    var constructor = publicInstance.constructor;
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
	  }
	}
	
	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },
	
	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},
	
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },
	
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnNoop(publicInstance, 'replaceState');
	  },
	
	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnNoop(publicInstance, 'setState');
	  }
	};
	
	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(9);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	
	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	
	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }
	
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}
	
	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	module.exports = emptyFunction;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    // $FlowFixMe https://github.com/facebook/flow/issues/285
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}
	
	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var emptyObject = {};
	
	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}
	
	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var validateFormat = function validateFormat(format) {};
	
	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var lowPriorityWarning = function () {};
	
	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	
	  lowPriorityWarning = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}
	
	module.exports = lowPriorityWarning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var PooledClass = __webpack_require__(15);
	var ReactElement = __webpack_require__(16);
	
	var emptyFunction = __webpack_require__(9);
	var traverseAllChildren = __webpack_require__(19);
	
	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;
	
	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}
	
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
	
	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func,
	      context = bookKeeping.context;
	
	  func.call(context, child, bookKeeping.count++);
	}
	
	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}
	
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);
	
	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result,
	      keyPrefix = bookKeeping.keyPrefix,
	      func = bookKeeping.func,
	      context = bookKeeping.context;
	
	
	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}
	
	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}
	
	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}
	
	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}
	
	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}
	
	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}
	
	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};
	
	module.exports = ReactChildren;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(6);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};
	
	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};
	
	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};
	
	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};
	
	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};
	
	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;
	
	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};
	
	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler
	};
	
	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var ReactCurrentOwner = __webpack_require__(17);
	
	var warning = __webpack_require__(8);
	var canDefineProperty = __webpack_require__(10);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var REACT_ELEMENT_TYPE = __webpack_require__(18);
	
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	
	var specialPropKeyWarningShown, specialPropRefWarningShown;
	
	function hasValidRef(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.ref !== undefined;
	}
	
	function hasValidKey(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.key !== undefined;
	}
	
	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function () {
	    if (!specialPropKeyWarningShown) {
	      specialPropKeyWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}
	
	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function () {
	    if (!specialPropRefWarningShown) {
	      specialPropRefWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}
	
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };
	
	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};
	
	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }
	
	  return element;
	};
	
	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;
	
	  // Reserved names are extracted
	  var props = {};
	
	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;
	
	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }
	
	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }
	
	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      if (Object.freeze) {
	        Object.freeze(childArray);
	      }
	    }
	    props.children = childArray;
	  }
	
	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (key || ref) {
	      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	        if (key) {
	          defineKeyPropWarningGetter(props, displayName);
	        }
	        if (ref) {
	          defineRefPropWarningGetter(props, displayName);
	        }
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};
	
	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};
	
	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
	
	  return newElement;
	};
	
	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;
	
	  // Original props are copied
	  var props = _assign({}, element.props);
	
	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;
	
	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;
	
	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }
	
	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }
	
	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }
	
	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};
	
	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};
	
	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	var ReactCurrentOwner = {
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	};
	
	module.exports = ReactCurrentOwner;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
	
	module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(6);
	
	var ReactCurrentOwner = __webpack_require__(17);
	var REACT_ELEMENT_TYPE = __webpack_require__(18);
	
	var getIteratorFn = __webpack_require__(20);
	var invariant = __webpack_require__(12);
	var KeyEscapeUtils = __webpack_require__(21);
	var warning = __webpack_require__(8);
	
	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';
	
	/**
	 * This is inlined from ReactElement since this file is shared between
	 * isomorphic and renderers. We could extract this to a
	 *
	 */
	
	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */
	
	var didWarnAboutMaps = false;
	
	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}
	
	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;
	
	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }
	
	  if (children === null || type === 'string' || type === 'number' ||
	  // The following is inlined from ReactElement. This means we can optimize
	  // some checks. React Fiber also inlines this logic for similar purposes.
	  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }
	
	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
	
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          var mapsAsChildrenAddendum = '';
	          if (ReactCurrentOwner.current) {
	            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
	            if (mapsAsChildrenOwnerName) {
	              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
	            }
	          }
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = " It looks like you're using an element created by a different " + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
	    }
	  }
	
	  return subtreeCount;
	}
	
	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }
	
	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}
	
	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	/* global Symbol */
	
	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}
	
	module.exports = getIteratorFn;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */
	
	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });
	
	  return '$' + escapedString;
	}
	
	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);
	
	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}
	
	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};
	
	module.exports = KeyEscapeUtils;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactElement = __webpack_require__(16);
	
	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */
	var createDOMFactory = ReactElement.createFactory;
	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(23);
	  createDOMFactory = ReactElementValidator.createFactory;
	}
	
	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 *
	 * @public
	 */
	var ReactDOMFactories = {
	  a: createDOMFactory('a'),
	  abbr: createDOMFactory('abbr'),
	  address: createDOMFactory('address'),
	  area: createDOMFactory('area'),
	  article: createDOMFactory('article'),
	  aside: createDOMFactory('aside'),
	  audio: createDOMFactory('audio'),
	  b: createDOMFactory('b'),
	  base: createDOMFactory('base'),
	  bdi: createDOMFactory('bdi'),
	  bdo: createDOMFactory('bdo'),
	  big: createDOMFactory('big'),
	  blockquote: createDOMFactory('blockquote'),
	  body: createDOMFactory('body'),
	  br: createDOMFactory('br'),
	  button: createDOMFactory('button'),
	  canvas: createDOMFactory('canvas'),
	  caption: createDOMFactory('caption'),
	  cite: createDOMFactory('cite'),
	  code: createDOMFactory('code'),
	  col: createDOMFactory('col'),
	  colgroup: createDOMFactory('colgroup'),
	  data: createDOMFactory('data'),
	  datalist: createDOMFactory('datalist'),
	  dd: createDOMFactory('dd'),
	  del: createDOMFactory('del'),
	  details: createDOMFactory('details'),
	  dfn: createDOMFactory('dfn'),
	  dialog: createDOMFactory('dialog'),
	  div: createDOMFactory('div'),
	  dl: createDOMFactory('dl'),
	  dt: createDOMFactory('dt'),
	  em: createDOMFactory('em'),
	  embed: createDOMFactory('embed'),
	  fieldset: createDOMFactory('fieldset'),
	  figcaption: createDOMFactory('figcaption'),
	  figure: createDOMFactory('figure'),
	  footer: createDOMFactory('footer'),
	  form: createDOMFactory('form'),
	  h1: createDOMFactory('h1'),
	  h2: createDOMFactory('h2'),
	  h3: createDOMFactory('h3'),
	  h4: createDOMFactory('h4'),
	  h5: createDOMFactory('h5'),
	  h6: createDOMFactory('h6'),
	  head: createDOMFactory('head'),
	  header: createDOMFactory('header'),
	  hgroup: createDOMFactory('hgroup'),
	  hr: createDOMFactory('hr'),
	  html: createDOMFactory('html'),
	  i: createDOMFactory('i'),
	  iframe: createDOMFactory('iframe'),
	  img: createDOMFactory('img'),
	  input: createDOMFactory('input'),
	  ins: createDOMFactory('ins'),
	  kbd: createDOMFactory('kbd'),
	  keygen: createDOMFactory('keygen'),
	  label: createDOMFactory('label'),
	  legend: createDOMFactory('legend'),
	  li: createDOMFactory('li'),
	  link: createDOMFactory('link'),
	  main: createDOMFactory('main'),
	  map: createDOMFactory('map'),
	  mark: createDOMFactory('mark'),
	  menu: createDOMFactory('menu'),
	  menuitem: createDOMFactory('menuitem'),
	  meta: createDOMFactory('meta'),
	  meter: createDOMFactory('meter'),
	  nav: createDOMFactory('nav'),
	  noscript: createDOMFactory('noscript'),
	  object: createDOMFactory('object'),
	  ol: createDOMFactory('ol'),
	  optgroup: createDOMFactory('optgroup'),
	  option: createDOMFactory('option'),
	  output: createDOMFactory('output'),
	  p: createDOMFactory('p'),
	  param: createDOMFactory('param'),
	  picture: createDOMFactory('picture'),
	  pre: createDOMFactory('pre'),
	  progress: createDOMFactory('progress'),
	  q: createDOMFactory('q'),
	  rp: createDOMFactory('rp'),
	  rt: createDOMFactory('rt'),
	  ruby: createDOMFactory('ruby'),
	  s: createDOMFactory('s'),
	  samp: createDOMFactory('samp'),
	  script: createDOMFactory('script'),
	  section: createDOMFactory('section'),
	  select: createDOMFactory('select'),
	  small: createDOMFactory('small'),
	  source: createDOMFactory('source'),
	  span: createDOMFactory('span'),
	  strong: createDOMFactory('strong'),
	  style: createDOMFactory('style'),
	  sub: createDOMFactory('sub'),
	  summary: createDOMFactory('summary'),
	  sup: createDOMFactory('sup'),
	  table: createDOMFactory('table'),
	  tbody: createDOMFactory('tbody'),
	  td: createDOMFactory('td'),
	  textarea: createDOMFactory('textarea'),
	  tfoot: createDOMFactory('tfoot'),
	  th: createDOMFactory('th'),
	  thead: createDOMFactory('thead'),
	  time: createDOMFactory('time'),
	  title: createDOMFactory('title'),
	  tr: createDOMFactory('tr'),
	  track: createDOMFactory('track'),
	  u: createDOMFactory('u'),
	  ul: createDOMFactory('ul'),
	  'var': createDOMFactory('var'),
	  video: createDOMFactory('video'),
	  wbr: createDOMFactory('wbr'),
	
	  // SVG
	  circle: createDOMFactory('circle'),
	  clipPath: createDOMFactory('clipPath'),
	  defs: createDOMFactory('defs'),
	  ellipse: createDOMFactory('ellipse'),
	  g: createDOMFactory('g'),
	  image: createDOMFactory('image'),
	  line: createDOMFactory('line'),
	  linearGradient: createDOMFactory('linearGradient'),
	  mask: createDOMFactory('mask'),
	  path: createDOMFactory('path'),
	  pattern: createDOMFactory('pattern'),
	  polygon: createDOMFactory('polygon'),
	  polyline: createDOMFactory('polyline'),
	  radialGradient: createDOMFactory('radialGradient'),
	  rect: createDOMFactory('rect'),
	  stop: createDOMFactory('stop'),
	  svg: createDOMFactory('svg'),
	  text: createDOMFactory('text'),
	  tspan: createDOMFactory('tspan')
	};
	
	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */
	
	'use strict';
	
	var ReactCurrentOwner = __webpack_require__(17);
	var ReactComponentTreeHook = __webpack_require__(24);
	var ReactElement = __webpack_require__(16);
	
	var checkReactTypeSpec = __webpack_require__(25);
	
	var canDefineProperty = __webpack_require__(10);
	var getIteratorFn = __webpack_require__(20);
	var warning = __webpack_require__(8);
	var lowPriorityWarning = __webpack_require__(13);
	
	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	function getSourceInfoErrorAddendum(elementProps) {
	  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
	    var source = elementProps.__source;
	    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
	    var lineNumber = source.lineNumber;
	    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
	  }
	  return '';
	}
	
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};
	
	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();
	
	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      info = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }
	  return info;
	}
	
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;
	
	  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});
	
	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	  if (memoizer[currentComponentErrorInfo]) {
	    return;
	  }
	  memoizer[currentComponentErrorInfo] = true;
	
	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwner = '';
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }
	
	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
	}
	
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}
	
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}
	
	var ReactElementValidator = {
	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    if (!validType) {
	      if (typeof type !== 'function' && typeof type !== 'string') {
	        var info = '';
	        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	          info += ' You likely forgot to export your component from the file ' + "it's defined in.";
	        }
	
	        var sourceInfo = getSourceInfoErrorAddendum(props);
	        if (sourceInfo) {
	          info += sourceInfo;
	        } else {
	          info += getDeclarationErrorAddendum();
	        }
	
	        info += ReactComponentTreeHook.getCurrentStackAddendum();
	
	        var currentSource = props !== null && props !== undefined && props.__source !== undefined ? props.__source : null;
	        ReactComponentTreeHook.pushNonStandardWarningStack(true, currentSource);
	        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
	        ReactComponentTreeHook.popNonStandardWarningStack();
	      }
	    }
	
	    var element = ReactElement.createElement.apply(this, arguments);
	
	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }
	
	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }
	
	    validatePropTypes(element);
	
	    return element;
	  },
	
	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            lowPriorityWarning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }
	
	    return validatedFactory;
	  },
	
	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }
	};
	
	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(6);
	
	var ReactCurrentOwner = __webpack_require__(17);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	function isNative(fn) {
	  // Based on isNative() from Lodash
	  var funcToString = Function.prototype.toString;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var reIsNative = RegExp('^' + funcToString
	  // Take an example native function source for comparison
	  .call(hasOwnProperty
	  // Strip regex characters so we can use it for regex
	  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'
	  // Remove hasOwnProperty from the template to make it generic
	  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	  try {
	    var source = funcToString.call(fn);
	    return reIsNative.test(source);
	  } catch (err) {
	    return false;
	  }
	}
	
	var canUseCollections =
	// Array.from
	typeof Array.from === 'function' &&
	// Map
	typeof Map === 'function' && isNative(Map) &&
	// Map.prototype.keys
	Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
	// Set
	typeof Set === 'function' && isNative(Set) &&
	// Set.prototype.keys
	Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);
	
	var setItem;
	var getItem;
	var removeItem;
	var getItemIDs;
	var addRoot;
	var removeRoot;
	var getRootIDs;
	
	if (canUseCollections) {
	  var itemMap = new Map();
	  var rootIDSet = new Set();
	
	  setItem = function (id, item) {
	    itemMap.set(id, item);
	  };
	  getItem = function (id) {
	    return itemMap.get(id);
	  };
	  removeItem = function (id) {
	    itemMap['delete'](id);
	  };
	  getItemIDs = function () {
	    return Array.from(itemMap.keys());
	  };
	
	  addRoot = function (id) {
	    rootIDSet.add(id);
	  };
	  removeRoot = function (id) {
	    rootIDSet['delete'](id);
	  };
	  getRootIDs = function () {
	    return Array.from(rootIDSet.keys());
	  };
	} else {
	  var itemByKey = {};
	  var rootByKey = {};
	
	  // Use non-numeric keys to prevent V8 performance issues:
	  // https://github.com/facebook/react/pull/7232
	  var getKeyFromID = function (id) {
	    return '.' + id;
	  };
	  var getIDFromKey = function (key) {
	    return parseInt(key.substr(1), 10);
	  };
	
	  setItem = function (id, item) {
	    var key = getKeyFromID(id);
	    itemByKey[key] = item;
	  };
	  getItem = function (id) {
	    var key = getKeyFromID(id);
	    return itemByKey[key];
	  };
	  removeItem = function (id) {
	    var key = getKeyFromID(id);
	    delete itemByKey[key];
	  };
	  getItemIDs = function () {
	    return Object.keys(itemByKey).map(getIDFromKey);
	  };
	
	  addRoot = function (id) {
	    var key = getKeyFromID(id);
	    rootByKey[key] = true;
	  };
	  removeRoot = function (id) {
	    var key = getKeyFromID(id);
	    delete rootByKey[key];
	  };
	  getRootIDs = function () {
	    return Object.keys(rootByKey).map(getIDFromKey);
	  };
	}
	
	var unmountedIDs = [];
	
	function purgeDeep(id) {
	  var item = getItem(id);
	  if (item) {
	    var childIDs = item.childIDs;
	
	    removeItem(id);
	    childIDs.forEach(purgeDeep);
	  }
	}
	
	function describeComponentFrame(name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	}
	
	function getDisplayName(element) {
	  if (element == null) {
	    return '#empty';
	  } else if (typeof element === 'string' || typeof element === 'number') {
	    return '#text';
	  } else if (typeof element.type === 'string') {
	    return element.type;
	  } else {
	    return element.type.displayName || element.type.name || 'Unknown';
	  }
	}
	
	function describeID(id) {
	  var name = ReactComponentTreeHook.getDisplayName(id);
	  var element = ReactComponentTreeHook.getElement(id);
	  var ownerID = ReactComponentTreeHook.getOwnerID(id);
	  var ownerName;
	  if (ownerID) {
	    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
	  }
	  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
	  return describeComponentFrame(name, element && element._source, ownerName);
	}
	
	var ReactComponentTreeHook = {
	  onSetChildren: function (id, nextChildIDs) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.childIDs = nextChildIDs;
	
	    for (var i = 0; i < nextChildIDs.length; i++) {
	      var nextChildID = nextChildIDs[i];
	      var nextChild = getItem(nextChildID);
	      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
	      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
	      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
	      if (nextChild.parentID == null) {
	        nextChild.parentID = id;
	        // TODO: This shouldn't be necessary but mounting a new root during in
	        // componentWillMount currently causes not-yet-mounted components to
	        // be purged from our tree data so their parent id is missing.
	      }
	      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
	    }
	  },
	  onBeforeMountComponent: function (id, element, parentID) {
	    var item = {
	      element: element,
	      parentID: parentID,
	      text: null,
	      childIDs: [],
	      isMounted: false,
	      updateCount: 0
	    };
	    setItem(id, item);
	  },
	  onBeforeUpdateComponent: function (id, element) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.element = element;
	  },
	  onMountComponent: function (id) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.isMounted = true;
	    var isRoot = item.parentID === 0;
	    if (isRoot) {
	      addRoot(id);
	    }
	  },
	  onUpdateComponent: function (id) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.updateCount++;
	  },
	  onUnmountComponent: function (id) {
	    var item = getItem(id);
	    if (item) {
	      // We need to check if it exists.
	      // `item` might not exist if it is inside an error boundary, and a sibling
	      // error boundary child threw while mounting. Then this instance never
	      // got a chance to mount, but it still gets an unmounting event during
	      // the error boundary cleanup.
	      item.isMounted = false;
	      var isRoot = item.parentID === 0;
	      if (isRoot) {
	        removeRoot(id);
	      }
	    }
	    unmountedIDs.push(id);
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeHook._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }
	
	    for (var i = 0; i < unmountedIDs.length; i++) {
	      var id = unmountedIDs[i];
	      purgeDeep(id);
	    }
	    unmountedIDs.length = 0;
	  },
	  isMounted: function (id) {
	    var item = getItem(id);
	    return item ? item.isMounted : false;
	  },
	  getCurrentStackAddendum: function (topElement) {
	    var info = '';
	    if (topElement) {
	      var name = getDisplayName(topElement);
	      var owner = topElement._owner;
	      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
	    }
	
	    var currentOwner = ReactCurrentOwner.current;
	    var id = currentOwner && currentOwner._debugID;
	
	    info += ReactComponentTreeHook.getStackAddendumByID(id);
	    return info;
	  },
	  getStackAddendumByID: function (id) {
	    var info = '';
	    while (id) {
	      info += describeID(id);
	      id = ReactComponentTreeHook.getParentID(id);
	    }
	    return info;
	  },
	  getChildIDs: function (id) {
	    var item = getItem(id);
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element) {
	      return null;
	    }
	    return getDisplayName(element);
	  },
	  getElement: function (id) {
	    var item = getItem(id);
	    return item ? item.element : null;
	  },
	  getOwnerID: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element || !element._owner) {
	      return null;
	    }
	    return element._owner._debugID;
	  },
	  getParentID: function (id) {
	    var item = getItem(id);
	    return item ? item.parentID : null;
	  },
	  getSource: function (id) {
	    var item = getItem(id);
	    var element = item ? item.element : null;
	    var source = element != null ? element._source : null;
	    return source;
	  },
	  getText: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (typeof element === 'string') {
	      return element;
	    } else if (typeof element === 'number') {
	      return '' + element;
	    } else {
	      return null;
	    }
	  },
	  getUpdateCount: function (id) {
	    var item = getItem(id);
	    return item ? item.updateCount : 0;
	  },
	
	
	  getRootIDs: getRootIDs,
	  getRegisteredIDs: getItemIDs,
	
	  pushNonStandardWarningStack: function (isCreatingElement, currentSource) {
	    if (typeof console.reactStack !== 'function') {
	      return;
	    }
	
	    var stack = [];
	    var currentOwner = ReactCurrentOwner.current;
	    var id = currentOwner && currentOwner._debugID;
	
	    try {
	      if (isCreatingElement) {
	        stack.push({
	          name: id ? ReactComponentTreeHook.getDisplayName(id) : null,
	          fileName: currentSource ? currentSource.fileName : null,
	          lineNumber: currentSource ? currentSource.lineNumber : null
	        });
	      }
	
	      while (id) {
	        var element = ReactComponentTreeHook.getElement(id);
	        var parentID = ReactComponentTreeHook.getParentID(id);
	        var ownerID = ReactComponentTreeHook.getOwnerID(id);
	        var ownerName = ownerID ? ReactComponentTreeHook.getDisplayName(ownerID) : null;
	        var source = element && element._source;
	        stack.push({
	          name: ownerName,
	          fileName: source ? source.fileName : null,
	          lineNumber: source ? source.lineNumber : null
	        });
	        id = parentID;
	      }
	    } catch (err) {
	      // Internal state is messed up.
	      // Stop building the stack (it's just a nice to have).
	    }
	
	    console.reactStack(stack);
	  },
	  popNonStandardWarningStack: function () {
	    if (typeof console.reactStackEnd !== 'function') {
	      return;
	    }
	    console.reactStackEnd();
	  }
	};
	
	module.exports = ReactComponentTreeHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(6);
	
	var ReactPropTypeLocationNames = __webpack_require__(26);
	var ReactPropTypesSecret = __webpack_require__(27);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	var ReactComponentTreeHook;
	
	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(24);
	}
	
	var loggedTypeFailures = {};
	
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?object} element The React element that is being type-checked
	 * @param {?number} debugID The React component instance that is being type-checked
	 * @private
	 */
	function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
	  for (var typeSpecName in typeSpecs) {
	    if (typeSpecs.hasOwnProperty(typeSpecName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
	        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	
	        var componentStackInfo = '';
	
	        if (process.env.NODE_ENV !== 'production') {
	          if (!ReactComponentTreeHook) {
	            ReactComponentTreeHook = __webpack_require__(24);
	          }
	          if (debugID !== null) {
	            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
	          } else if (element !== null) {
	            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
	          }
	        }
	
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
	      }
	    }
	  }
	}
	
	module.exports = checkReactTypeSpec;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var ReactPropTypeLocationNames = {};
	
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}
	
	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _require = __webpack_require__(16),
	    isValidElement = _require.isValidElement;
	
	var factory = __webpack_require__(29);
	
	module.exports = factory(isValidElement);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	// React 15.5 references this module, and assumes PropTypes are still callable in production.
	// Therefore we re-export development-only version with all the PropTypes checks here.
	// However if one is migrating to the `prop-types` npm library, they will go through the
	// `index.js` entry point, and it will branch depending on the environment.
	var factory = __webpack_require__(30);
	module.exports = function(isValidElement) {
	  // It is still allowed in 15.5.
	  var throwOnDirectAccess = false;
	  return factory(isValidElement, throwOnDirectAccess);
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(9);
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	var ReactPropTypesSecret = __webpack_require__(31);
	var checkPropTypes = __webpack_require__(32);
	
	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }
	
	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */
	
	  var ANONYMOUS = '<<anonymous>>';
	
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),
	
	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker
	  };
	
	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/
	
	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;
	
	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;
	
	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }
	
	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);
	
	    return chainedCheckType;
	  }
	
	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);
	
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }
	
	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }
	
	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }
	
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }
	
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }
	
	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }
	
	        return true;
	      default:
	        return false;
	    }
	  }
	
	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }
	
	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }
	
	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }
	
	    return false;
	  }
	
	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }
	
	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }
	
	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }
	
	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }
	
	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(12);
	  var warning = __webpack_require__(8);
	  var ReactPropTypesSecret = __webpack_require__(31);
	  var loggedTypeFailures = {};
	}
	
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;
	
	          var stack = getStack ? getStack() : '';
	
	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}
	
	module.exports = checkPropTypes;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	module.exports = '15.6.1';

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _require = __webpack_require__(5),
	    Component = _require.Component;
	
	var _require2 = __webpack_require__(16),
	    isValidElement = _require2.isValidElement;
	
	var ReactNoopUpdateQueue = __webpack_require__(7);
	var factory = __webpack_require__(35);
	
	module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var emptyObject = __webpack_require__(11);
	var _invariant = __webpack_require__(12);
	
	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(8);
	}
	
	var MIXINS_KEY = 'mixins';
	
	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}
	
	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}
	
	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */
	
	  var injectedMixins = [];
	
	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',
	
	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',
	
	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',
	
	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',
	
	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',
	
	    // ==== Definition methods ====
	
	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',
	
	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',
	
	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',
	
	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',
	
	    // ==== Delegate methods ====
	
	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',
	
	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',
	
	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',
	
	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',
	
	    // ==== Advanced methods ====
	
	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };
	
	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };
	
	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }
	
	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;
	
	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }
	
	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }
	
	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;
	
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }
	
	      return;
	    }
	
	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );
	
	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;
	
	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }
	
	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }
	
	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }
	
	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);
	
	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;
	
	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];
	
	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );
	
	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }
	
	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }
	
	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );
	
	      var isInherited = name in Constructor;
	      _invariant(
	        !isInherited,
	        'ReactClass: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be ' +
	          'due to a mixin.',
	        name
	      );
	      Constructor[name] = property;
	    }
	  }
	
	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );
	
	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }
	
	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }
	
	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }
	
	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }
	
	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }
	
	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };
	
	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };
	
	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },
	
	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };
	
	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );
	
	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.
	
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }
	
	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }
	
	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;
	
	      this.state = null;
	
	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.
	
	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );
	
	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];
	
	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
	
	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);
	
	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }
	
	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );
	
	    if (process.env.NODE_ENV !== 'production') {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }
	
	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }
	
	    return Constructor;
	  }
	
	  return createClass;
	}
	
	module.exports = factory;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	'use strict';
	
	var _prodInvariant = __webpack_require__(6);
	
	var ReactElement = __webpack_require__(16);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
	  return children;
	}
	
	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(38);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	/* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/
	
	'use strict';
	
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactDefaultInjection = __webpack_require__(43);
	var ReactMount = __webpack_require__(172);
	var ReactReconciler = __webpack_require__(64);
	var ReactUpdates = __webpack_require__(61);
	var ReactVersion = __webpack_require__(177);
	
	var findDOMNode = __webpack_require__(178);
	var getHostComponentFromComposite = __webpack_require__(179);
	var renderSubtreeIntoContainer = __webpack_require__(180);
	var warning = __webpack_require__(8);
	
	ReactDefaultInjection.inject();
	
	var ReactDOM = {
	  findDOMNode: findDOMNode,
	  render: ReactMount.render,
	  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
	  version: ReactVersion,
	
	  /* eslint-disable camelcase */
	  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
	  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
	  /* eslint-enable camelcase */
	};
	
	// Inject the runtime into a devtools global hook regardless of browser.
	// Allows for debugging when the hook is injected on the page.
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
	  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
	    ComponentTree: {
	      getClosestInstanceFromNode: ReactDOMComponentTree.getClosestInstanceFromNode,
	      getNodeFromInstance: function (inst) {
	        // inst is an internal instance (but could be a composite)
	        if (inst._renderedComponent) {
	          inst = getHostComponentFromComposite(inst);
	        }
	        if (inst) {
	          return ReactDOMComponentTree.getNodeFromInstance(inst);
	        } else {
	          return null;
	        }
	      }
	    },
	    Mount: ReactMount,
	    Reconciler: ReactReconciler
	  });
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  var ExecutionEnvironment = __webpack_require__(53);
	  if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
	    // First check if devtools is not installed
	    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
	      // If we're in Chrome or Firefox, provide a download link if not installed.
	      if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
	        // Firefox does not have the issue with devtools loaded over file://
	        var showFileUrlMessage = window.location.protocol.indexOf('http') === -1 && navigator.userAgent.indexOf('Firefox') === -1;
	        console.debug('Download the React DevTools ' + (showFileUrlMessage ? 'and use an HTTP server (instead of a file: URL) ' : '') + 'for a better development experience: ' + 'https://fb.me/react-devtools');
	      }
	    }
	
	    var testFunc = function testFn() {};
	    process.env.NODE_ENV !== 'production' ? warning((testFunc.name || testFunc.toString()).indexOf('testFn') !== -1, "It looks like you're using a minified copy of the development build " + 'of React. When deploying React apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See https://fb.me/react-minification for more details.') : void 0;
	
	    // If we're in IE8, check to see if we are in compatibility mode and provide
	    // information on preventing compatibility mode
	    var ieCompatibilityMode = document.documentMode && document.documentMode < 8;
	
	    process.env.NODE_ENV !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : void 0;
	
	    var expectedFeatures = [
	    // shims
	    Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.trim];
	
	    for (var i = 0; i < expectedFeatures.length; i++) {
	      if (!expectedFeatures[i]) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'One or more ES5 shims expected by React are not available: ' + 'https://fb.me/react-warning-polyfills') : void 0;
	        break;
	      }
	    }
	  }
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  var ReactInstrumentation = __webpack_require__(67);
	  var ReactDOMUnknownPropertyHook = __webpack_require__(181);
	  var ReactDOMNullInputValuePropHook = __webpack_require__(182);
	  var ReactDOMInvalidARIAHook = __webpack_require__(183);
	
	  ReactInstrumentation.debugTool.addHook(ReactDOMUnknownPropertyHook);
	  ReactInstrumentation.debugTool.addHook(ReactDOMNullInputValuePropHook);
	  ReactInstrumentation.debugTool.addHook(ReactDOMInvalidARIAHook);
	}
	
	module.exports = ReactDOM;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var DOMProperty = __webpack_require__(41);
	var ReactDOMComponentFlags = __webpack_require__(42);
	
	var invariant = __webpack_require__(12);
	
	var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
	var Flags = ReactDOMComponentFlags;
	
	var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);
	
	/**
	 * Check if a given node should be cached.
	 */
	function shouldPrecacheNode(node, nodeID) {
	  return node.nodeType === 1 && node.getAttribute(ATTR_NAME) === String(nodeID) || node.nodeType === 8 && node.nodeValue === ' react-text: ' + nodeID + ' ' || node.nodeType === 8 && node.nodeValue === ' react-empty: ' + nodeID + ' ';
	}
	
	/**
	 * Drill down (through composites and empty components) until we get a host or
	 * host text component.
	 *
	 * This is pretty polymorphic but unavoidable with the current structure we have
	 * for `_renderedChildren`.
	 */
	function getRenderedHostOrTextFromComponent(component) {
	  var rendered;
	  while (rendered = component._renderedComponent) {
	    component = rendered;
	  }
	  return component;
	}
	
	/**
	 * Populate `_hostNode` on the rendered host/text component with the given
	 * DOM node. The passed `inst` can be a composite.
	 */
	function precacheNode(inst, node) {
	  var hostInst = getRenderedHostOrTextFromComponent(inst);
	  hostInst._hostNode = node;
	  node[internalInstanceKey] = hostInst;
	}
	
	function uncacheNode(inst) {
	  var node = inst._hostNode;
	  if (node) {
	    delete node[internalInstanceKey];
	    inst._hostNode = null;
	  }
	}
	
	/**
	 * Populate `_hostNode` on each child of `inst`, assuming that the children
	 * match up with the DOM (element) children of `node`.
	 *
	 * We cache entire levels at once to avoid an n^2 problem where we access the
	 * children of a node sequentially and have to walk from the start to our target
	 * node every time.
	 *
	 * Since we update `_renderedChildren` and the actual DOM at (slightly)
	 * different times, we could race here and see a newer `_renderedChildren` than
	 * the DOM nodes we see. To avoid this, ReactMultiChild calls
	 * `prepareToManageChildren` before we change `_renderedChildren`, at which
	 * time the container's child nodes are always cached (until it unmounts).
	 */
	function precacheChildNodes(inst, node) {
	  if (inst._flags & Flags.hasCachedChildNodes) {
	    return;
	  }
	  var children = inst._renderedChildren;
	  var childNode = node.firstChild;
	  outer: for (var name in children) {
	    if (!children.hasOwnProperty(name)) {
	      continue;
	    }
	    var childInst = children[name];
	    var childID = getRenderedHostOrTextFromComponent(childInst)._domID;
	    if (childID === 0) {
	      // We're currently unmounting this child in ReactMultiChild; skip it.
	      continue;
	    }
	    // We assume the child nodes are in the same order as the child instances.
	    for (; childNode !== null; childNode = childNode.nextSibling) {
	      if (shouldPrecacheNode(childNode, childID)) {
	        precacheNode(childInst, childNode);
	        continue outer;
	      }
	    }
	    // We reached the end of the DOM children without finding an ID match.
	     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unable to find element with ID %s.', childID) : _prodInvariant('32', childID) : void 0;
	  }
	  inst._flags |= Flags.hasCachedChildNodes;
	}
	
	/**
	 * Given a DOM node, return the closest ReactDOMComponent or
	 * ReactDOMTextComponent instance ancestor.
	 */
	function getClosestInstanceFromNode(node) {
	  if (node[internalInstanceKey]) {
	    return node[internalInstanceKey];
	  }
	
	  // Walk up the tree until we find an ancestor whose instance we have cached.
	  var parents = [];
	  while (!node[internalInstanceKey]) {
	    parents.push(node);
	    if (node.parentNode) {
	      node = node.parentNode;
	    } else {
	      // Top of the tree. This node must not be part of a React tree (or is
	      // unmounted, potentially).
	      return null;
	    }
	  }
	
	  var closest;
	  var inst;
	  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
	    closest = inst;
	    if (parents.length) {
	      precacheChildNodes(inst, node);
	    }
	  }
	
	  return closest;
	}
	
	/**
	 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
	 * instance, or null if the node was not rendered by this React.
	 */
	function getInstanceFromNode(node) {
	  var inst = getClosestInstanceFromNode(node);
	  if (inst != null && inst._hostNode === node) {
	    return inst;
	  } else {
	    return null;
	  }
	}
	
	/**
	 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
	 * DOM node.
	 */
	function getNodeFromInstance(inst) {
	  // Without this first invariant, passing a non-DOM-component triggers the next
	  // invariant for a missing parent, which is super confusing.
	  !(inst._hostNode !== undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : _prodInvariant('33') : void 0;
	
	  if (inst._hostNode) {
	    return inst._hostNode;
	  }
	
	  // Walk up the tree until we find an ancestor whose DOM node we have cached.
	  var parents = [];
	  while (!inst._hostNode) {
	    parents.push(inst);
	    !inst._hostParent ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React DOM tree root should always have a node reference.') : _prodInvariant('34') : void 0;
	    inst = inst._hostParent;
	  }
	
	  // Now parents contains each ancestor that does *not* have a cached native
	  // node, and `inst` is the deepest ancestor that does.
	  for (; parents.length; inst = parents.pop()) {
	    precacheChildNodes(inst, inst._hostNode);
	  }
	
	  return inst._hostNode;
	}
	
	var ReactDOMComponentTree = {
	  getClosestInstanceFromNode: getClosestInstanceFromNode,
	  getInstanceFromNode: getInstanceFromNode,
	  getNodeFromInstance: getNodeFromInstance,
	  precacheChildNodes: precacheChildNodes,
	  precacheNode: precacheNode,
	  uncacheNode: uncacheNode
	};
	
	module.exports = ReactDOMComponentTree;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	'use strict';
	
	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */
	
	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;
	
	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;
	
	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }
	
	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';
	
	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame
	
	  throw error;
	}
	
	module.exports = reactProdInvariant;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	function checkMask(value, bitmask) {
	  return (value & bitmask) === bitmask;
	}
	
	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_PROPERTY: 0x1,
	  HAS_BOOLEAN_VALUE: 0x4,
	  HAS_NUMERIC_VALUE: 0x8,
	  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
	  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,
	
	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * isCustomAttribute: function that given an attribute name will return true
	   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
	   * attributes where it's impossible to enumerate all of the possible
	   * attribute names,
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
	   * attribute namespace URL. (Attribute names not specified use no namespace.)
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function (domPropertyConfig) {
	    var Injection = DOMPropertyInjection;
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
	
	    if (domPropertyConfig.isCustomAttribute) {
	      DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
	    }
	
	    for (var propName in Properties) {
	      !!DOMProperty.properties.hasOwnProperty(propName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property \'%s\' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.', propName) : _prodInvariant('48', propName) : void 0;
	
	      var lowerCased = propName.toLowerCase();
	      var propConfig = Properties[propName];
	
	      var propertyInfo = {
	        attributeName: lowerCased,
	        attributeNamespace: null,
	        propertyName: propName,
	        mutationMethod: null,
	
	        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
	        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
	        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
	        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
	        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
	      };
	      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s', propName) : _prodInvariant('50', propName) : void 0;
	
	      if (process.env.NODE_ENV !== 'production') {
	        DOMProperty.getPossibleStandardName[lowerCased] = propName;
	      }
	
	      if (DOMAttributeNames.hasOwnProperty(propName)) {
	        var attributeName = DOMAttributeNames[propName];
	        propertyInfo.attributeName = attributeName;
	        if (process.env.NODE_ENV !== 'production') {
	          DOMProperty.getPossibleStandardName[attributeName] = propName;
	        }
	      }
	
	      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
	        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
	      }
	
	      if (DOMPropertyNames.hasOwnProperty(propName)) {
	        propertyInfo.propertyName = DOMPropertyNames[propName];
	      }
	
	      if (DOMMutationMethods.hasOwnProperty(propName)) {
	        propertyInfo.mutationMethod = DOMMutationMethods[propName];
	      }
	
	      DOMProperty.properties[propName] = propertyInfo;
	    }
	  }
	};
	
	/* eslint-disable max-len */
	var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	/* eslint-enable max-len */
	
	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */
	var DOMProperty = {
	  ID_ATTRIBUTE_NAME: 'data-reactid',
	  ROOT_ATTRIBUTE_NAME: 'data-reactroot',
	
	  ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
	  ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',
	
	  /**
	   * Map from property "standard name" to an object with info about how to set
	   * the property in the DOM. Each object contains:
	   *
	   * attributeName:
	   *   Used when rendering markup or with `*Attribute()`.
	   * attributeNamespace
	   * propertyName:
	   *   Used on DOM node instances. (This includes properties that mutate due to
	   *   external factors.)
	   * mutationMethod:
	   *   If non-null, used instead of the property or `setAttribute()` after
	   *   initial render.
	   * mustUseProperty:
	   *   Whether the property must be accessed and mutated as an object property.
	   * hasBooleanValue:
	   *   Whether the property should be removed when set to a falsey value.
	   * hasNumericValue:
	   *   Whether the property must be numeric or parse as a numeric and should be
	   *   removed when set to a falsey value.
	   * hasPositiveNumericValue:
	   *   Whether the property must be positive numeric or parse as a positive
	   *   numeric and should be removed when set to a falsey value.
	   * hasOverloadedBooleanValue:
	   *   Whether the property can be used as a flag as well as with a value.
	   *   Removed when strictly equal to false; present without a value when
	   *   strictly equal to true; present with a value otherwise.
	   */
	  properties: {},
	
	  /**
	   * Mapping from lowercase property names to the properly cased version, used
	   * to warn in the case of missing properties. Available only in __DEV__.
	   *
	   * autofocus is predefined, because adding it to the property whitelist
	   * causes unintended side effects.
	   *
	   * @type {Object}
	   */
	  getPossibleStandardName: process.env.NODE_ENV !== 'production' ? { autofocus: 'autoFocus' } : null,
	
	  /**
	   * All of the isCustomAttribute() functions that have been injected.
	   */
	  _isCustomAttributeFunctions: [],
	
	  /**
	   * Checks whether a property name is a custom attribute.
	   * @method
	   */
	  isCustomAttribute: function (attributeName) {
	    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
	      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
	      if (isCustomAttributeFn(attributeName)) {
	        return true;
	      }
	    }
	    return false;
	  },
	
	  injection: DOMPropertyInjection
	};
	
	module.exports = DOMProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactDOMComponentFlags = {
	  hasCachedChildNodes: 1 << 0
	};
	
	module.exports = ReactDOMComponentFlags;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ARIADOMPropertyConfig = __webpack_require__(44);
	var BeforeInputEventPlugin = __webpack_require__(45);
	var ChangeEventPlugin = __webpack_require__(60);
	var DefaultEventPluginOrder = __webpack_require__(78);
	var EnterLeaveEventPlugin = __webpack_require__(79);
	var HTMLDOMPropertyConfig = __webpack_require__(84);
	var ReactComponentBrowserEnvironment = __webpack_require__(85);
	var ReactDOMComponent = __webpack_require__(98);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactDOMEmptyComponent = __webpack_require__(143);
	var ReactDOMTreeTraversal = __webpack_require__(144);
	var ReactDOMTextComponent = __webpack_require__(145);
	var ReactDefaultBatchingStrategy = __webpack_require__(146);
	var ReactEventListener = __webpack_require__(147);
	var ReactInjection = __webpack_require__(150);
	var ReactReconcileTransaction = __webpack_require__(151);
	var SVGDOMPropertyConfig = __webpack_require__(159);
	var SelectEventPlugin = __webpack_require__(160);
	var SimpleEventPlugin = __webpack_require__(161);
	
	var alreadyInjected = false;
	
	function inject() {
	  if (alreadyInjected) {
	    // TODO: This is currently true because these injections are shared between
	    // the client and the server package. They should be built independently
	    // and not share any injection state. Then this problem will be solved.
	    return;
	  }
	  alreadyInjected = true;
	
	  ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
	
	  /**
	   * Inject modules for resolving DOM hierarchy and plugin ordering.
	   */
	  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
	  ReactInjection.EventPluginUtils.injectComponentTree(ReactDOMComponentTree);
	  ReactInjection.EventPluginUtils.injectTreeTraversal(ReactDOMTreeTraversal);
	
	  /**
	   * Some important event plugins included by default (without having to require
	   * them).
	   */
	  ReactInjection.EventPluginHub.injectEventPluginsByName({
	    SimpleEventPlugin: SimpleEventPlugin,
	    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
	    ChangeEventPlugin: ChangeEventPlugin,
	    SelectEventPlugin: SelectEventPlugin,
	    BeforeInputEventPlugin: BeforeInputEventPlugin
	  });
	
	  ReactInjection.HostComponent.injectGenericComponentClass(ReactDOMComponent);
	
	  ReactInjection.HostComponent.injectTextComponentClass(ReactDOMTextComponent);
	
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(ARIADOMPropertyConfig);
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
	
	  ReactInjection.EmptyComponent.injectEmptyComponentFactory(function (instantiate) {
	    return new ReactDOMEmptyComponent(instantiate);
	  });
	
	  ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
	  ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
	
	  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
	}
	
	module.exports = {
	  inject: inject
	};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ARIADOMPropertyConfig = {
	  Properties: {
	    // Global States and Properties
	    'aria-current': 0, // state
	    'aria-details': 0,
	    'aria-disabled': 0, // state
	    'aria-hidden': 0, // state
	    'aria-invalid': 0, // state
	    'aria-keyshortcuts': 0,
	    'aria-label': 0,
	    'aria-roledescription': 0,
	    // Widget Attributes
	    'aria-autocomplete': 0,
	    'aria-checked': 0,
	    'aria-expanded': 0,
	    'aria-haspopup': 0,
	    'aria-level': 0,
	    'aria-modal': 0,
	    'aria-multiline': 0,
	    'aria-multiselectable': 0,
	    'aria-orientation': 0,
	    'aria-placeholder': 0,
	    'aria-pressed': 0,
	    'aria-readonly': 0,
	    'aria-required': 0,
	    'aria-selected': 0,
	    'aria-sort': 0,
	    'aria-valuemax': 0,
	    'aria-valuemin': 0,
	    'aria-valuenow': 0,
	    'aria-valuetext': 0,
	    // Live Region Attributes
	    'aria-atomic': 0,
	    'aria-busy': 0,
	    'aria-live': 0,
	    'aria-relevant': 0,
	    // Drag-and-Drop Attributes
	    'aria-dropeffect': 0,
	    'aria-grabbed': 0,
	    // Relationship Attributes
	    'aria-activedescendant': 0,
	    'aria-colcount': 0,
	    'aria-colindex': 0,
	    'aria-colspan': 0,
	    'aria-controls': 0,
	    'aria-describedby': 0,
	    'aria-errormessage': 0,
	    'aria-flowto': 0,
	    'aria-labelledby': 0,
	    'aria-owns': 0,
	    'aria-posinset': 0,
	    'aria-rowcount': 0,
	    'aria-rowindex': 0,
	    'aria-rowspan': 0,
	    'aria-setsize': 0
	  },
	  DOMAttributeNames: {},
	  DOMPropertyNames: {}
	};
	
	module.exports = ARIADOMPropertyConfig;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var EventPropagators = __webpack_require__(46);
	var ExecutionEnvironment = __webpack_require__(53);
	var FallbackCompositionState = __webpack_require__(54);
	var SyntheticCompositionEvent = __webpack_require__(57);
	var SyntheticInputEvent = __webpack_require__(59);
	
	var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
	var START_KEYCODE = 229;
	
	var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;
	
	var documentMode = null;
	if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
	  documentMode = document.documentMode;
	}
	
	// Webkit offers a very useful `textInput` event that can be used to
	// directly represent `beforeInput`. The IE `textinput` event is not as
	// useful, so we don't use it.
	var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();
	
	// In IE9+, we have access to composition events, but the data supplied
	// by the native compositionend event may be incorrect. Japanese ideographic
	// spaces, for instance (\u3000) are not recorded correctly.
	var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);
	
	/**
	 * Opera <= 12 includes TextEvent in window, but does not fire
	 * text input events. Rely on keypress instead.
	 */
	function isPresto() {
	  var opera = window.opera;
	  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
	}
	
	var SPACEBAR_CODE = 32;
	var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
	
	// Events and their corresponding property names.
	var eventTypes = {
	  beforeInput: {
	    phasedRegistrationNames: {
	      bubbled: 'onBeforeInput',
	      captured: 'onBeforeInputCapture'
	    },
	    dependencies: ['topCompositionEnd', 'topKeyPress', 'topTextInput', 'topPaste']
	  },
	  compositionEnd: {
	    phasedRegistrationNames: {
	      bubbled: 'onCompositionEnd',
	      captured: 'onCompositionEndCapture'
	    },
	    dependencies: ['topBlur', 'topCompositionEnd', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
	  },
	  compositionStart: {
	    phasedRegistrationNames: {
	      bubbled: 'onCompositionStart',
	      captured: 'onCompositionStartCapture'
	    },
	    dependencies: ['topBlur', 'topCompositionStart', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
	  },
	  compositionUpdate: {
	    phasedRegistrationNames: {
	      bubbled: 'onCompositionUpdate',
	      captured: 'onCompositionUpdateCapture'
	    },
	    dependencies: ['topBlur', 'topCompositionUpdate', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
	  }
	};
	
	// Track whether we've ever handled a keypress on the space key.
	var hasSpaceKeypress = false;
	
	/**
	 * Return whether a native keypress event is assumed to be a command.
	 * This is required because Firefox fires `keypress` events for key commands
	 * (cut, copy, select-all, etc.) even though no character is inserted.
	 */
	function isKeypressCommand(nativeEvent) {
	  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
	  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
	  !(nativeEvent.ctrlKey && nativeEvent.altKey);
	}
	
	/**
	 * Translate native top level events into event types.
	 *
	 * @param {string} topLevelType
	 * @return {object}
	 */
	function getCompositionEventType(topLevelType) {
	  switch (topLevelType) {
	    case 'topCompositionStart':
	      return eventTypes.compositionStart;
	    case 'topCompositionEnd':
	      return eventTypes.compositionEnd;
	    case 'topCompositionUpdate':
	      return eventTypes.compositionUpdate;
	  }
	}
	
	/**
	 * Does our fallback best-guess model think this event signifies that
	 * composition has begun?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackCompositionStart(topLevelType, nativeEvent) {
	  return topLevelType === 'topKeyDown' && nativeEvent.keyCode === START_KEYCODE;
	}
	
	/**
	 * Does our fallback mode think that this event is the end of composition?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackCompositionEnd(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case 'topKeyUp':
	      // Command keys insert or clear IME input.
	      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
	    case 'topKeyDown':
	      // Expect IME keyCode on each keydown. If we get any other
	      // code we must have exited earlier.
	      return nativeEvent.keyCode !== START_KEYCODE;
	    case 'topKeyPress':
	    case 'topMouseDown':
	    case 'topBlur':
	      // Events are not possible without cancelling IME.
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Google Input Tools provides composition data via a CustomEvent,
	 * with the `data` property populated in the `detail` object. If this
	 * is available on the event object, use it. If not, this is a plain
	 * composition event and we have nothing special to extract.
	 *
	 * @param {object} nativeEvent
	 * @return {?string}
	 */
	function getDataFromCustomEvent(nativeEvent) {
	  var detail = nativeEvent.detail;
	  if (typeof detail === 'object' && 'data' in detail) {
	    return detail.data;
	  }
	  return null;
	}
	
	// Track the current IME composition fallback object, if any.
	var currentComposition = null;
	
	/**
	 * @return {?object} A SyntheticCompositionEvent.
	 */
	function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	  var eventType;
	  var fallbackData;
	
	  if (canUseCompositionEvent) {
	    eventType = getCompositionEventType(topLevelType);
	  } else if (!currentComposition) {
	    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
	      eventType = eventTypes.compositionStart;
	    }
	  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
	    eventType = eventTypes.compositionEnd;
	  }
	
	  if (!eventType) {
	    return null;
	  }
	
	  if (useFallbackCompositionData) {
	    // The current composition is stored statically and must not be
	    // overwritten while composition continues.
	    if (!currentComposition && eventType === eventTypes.compositionStart) {
	      currentComposition = FallbackCompositionState.getPooled(nativeEventTarget);
	    } else if (eventType === eventTypes.compositionEnd) {
	      if (currentComposition) {
	        fallbackData = currentComposition.getData();
	      }
	    }
	  }
	
	  var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);
	
	  if (fallbackData) {
	    // Inject data generated from fallback path into the synthetic event.
	    // This matches the property of native CompositionEventInterface.
	    event.data = fallbackData;
	  } else {
	    var customData = getDataFromCustomEvent(nativeEvent);
	    if (customData !== null) {
	      event.data = customData;
	    }
	  }
	
	  EventPropagators.accumulateTwoPhaseDispatches(event);
	  return event;
	}
	
	/**
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?string} The string corresponding to this `beforeInput` event.
	 */
	function getNativeBeforeInputChars(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case 'topCompositionEnd':
	      return getDataFromCustomEvent(nativeEvent);
	    case 'topKeyPress':
	      /**
	       * If native `textInput` events are available, our goal is to make
	       * use of them. However, there is a special case: the spacebar key.
	       * In Webkit, preventing default on a spacebar `textInput` event
	       * cancels character insertion, but it *also* causes the browser
	       * to fall back to its default spacebar behavior of scrolling the
	       * page.
	       *
	       * Tracking at:
	       * https://code.google.com/p/chromium/issues/detail?id=355103
	       *
	       * To avoid this issue, use the keypress event as if no `textInput`
	       * event is available.
	       */
	      var which = nativeEvent.which;
	      if (which !== SPACEBAR_CODE) {
	        return null;
	      }
	
	      hasSpaceKeypress = true;
	      return SPACEBAR_CHAR;
	
	    case 'topTextInput':
	      // Record the characters to be added to the DOM.
	      var chars = nativeEvent.data;
	
	      // If it's a spacebar character, assume that we have already handled
	      // it at the keypress level and bail immediately. Android Chrome
	      // doesn't give us keycodes, so we need to blacklist it.
	      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
	        return null;
	      }
	
	      return chars;
	
	    default:
	      // For other native event types, do nothing.
	      return null;
	  }
	}
	
	/**
	 * For browsers that do not provide the `textInput` event, extract the
	 * appropriate string to use for SyntheticInputEvent.
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?string} The fallback string for this `beforeInput` event.
	 */
	function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
	  // If we are currently composing (IME) and using a fallback to do so,
	  // try to extract the composed characters from the fallback object.
	  // If composition event is available, we extract a string only at
	  // compositionevent, otherwise extract it at fallback events.
	  if (currentComposition) {
	    if (topLevelType === 'topCompositionEnd' || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
	      var chars = currentComposition.getData();
	      FallbackCompositionState.release(currentComposition);
	      currentComposition = null;
	      return chars;
	    }
	    return null;
	  }
	
	  switch (topLevelType) {
	    case 'topPaste':
	      // If a paste event occurs after a keypress, throw out the input
	      // chars. Paste events should not lead to BeforeInput events.
	      return null;
	    case 'topKeyPress':
	      /**
	       * As of v27, Firefox may fire keypress events even when no character
	       * will be inserted. A few possibilities:
	       *
	       * - `which` is `0`. Arrow keys, Esc key, etc.
	       *
	       * - `which` is the pressed key code, but no char is available.
	       *   Ex: 'AltGr + d` in Polish. There is no modified character for
	       *   this key combination and no character is inserted into the
	       *   document, but FF fires the keypress for char code `100` anyway.
	       *   No `input` event will occur.
	       *
	       * - `which` is the pressed key code, but a command combination is
	       *   being used. Ex: `Cmd+C`. No character is inserted, and no
	       *   `input` event will occur.
	       */
	      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
	        return String.fromCharCode(nativeEvent.which);
	      }
	      return null;
	    case 'topCompositionEnd':
	      return useFallbackCompositionData ? null : nativeEvent.data;
	    default:
	      return null;
	  }
	}
	
	/**
	 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
	 * `textInput` or fallback behavior.
	 *
	 * @return {?object} A SyntheticInputEvent.
	 */
	function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	  var chars;
	
	  if (canUseTextInputEvent) {
	    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
	  } else {
	    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
	  }
	
	  // If no characters are being inserted, no BeforeInput event should
	  // be fired.
	  if (!chars) {
	    return null;
	  }
	
	  var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);
	
	  event.data = chars;
	  EventPropagators.accumulateTwoPhaseDispatches(event);
	  return event;
	}
	
	/**
	 * Create an `onBeforeInput` event to match
	 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
	 *
	 * This event plugin is based on the native `textInput` event
	 * available in Chrome, Safari, Opera, and IE. This event fires after
	 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
	 *
	 * `beforeInput` is spec'd but not implemented in any browsers, and
	 * the `input` event does not provide any useful information about what has
	 * actually been added, contrary to the spec. Thus, `textInput` is the best
	 * available event to identify the characters that have actually been inserted
	 * into the target node.
	 *
	 * This plugin is also responsible for emitting `composition` events, thus
	 * allowing us to share composition fallback code for both `beforeInput` and
	 * `composition` event types.
	 */
	var BeforeInputEventPlugin = {
	  eventTypes: eventTypes,
	
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
	  }
	};
	
	module.exports = BeforeInputEventPlugin;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var EventPluginHub = __webpack_require__(47);
	var EventPluginUtils = __webpack_require__(49);
	
	var accumulateInto = __webpack_require__(51);
	var forEachAccumulated = __webpack_require__(52);
	var warning = __webpack_require__(8);
	
	var getListener = EventPluginHub.getListener;
	
	/**
	 * Some event types have a notion of different registration names for different
	 * "phases" of propagation. This finds listeners by a given phase.
	 */
	function listenerAtPhase(inst, event, propagationPhase) {
	  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
	  return getListener(inst, registrationName);
	}
	
	/**
	 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
	 * here, allows us to not have to bind or create functions for each event.
	 * Mutating the event's members allows us to not have to create a wrapping
	 * "dispatch" object that pairs the event with the listener.
	 */
	function accumulateDirectionalDispatches(inst, phase, event) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(inst, 'Dispatching inst must not be null') : void 0;
	  }
	  var listener = listenerAtPhase(inst, event, phase);
	  if (listener) {
	    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
	    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
	  }
	}
	
	/**
	 * Collect dispatches (must be entirely collected before dispatching - see unit
	 * tests). Lazily allocate the array to conserve memory.  We must loop through
	 * each event and perform the traversal for each one. We cannot perform a
	 * single traversal for the entire collection of events because each event may
	 * have a different target.
	 */
	function accumulateTwoPhaseDispatchesSingle(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    EventPluginUtils.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
	  }
	}
	
	/**
	 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
	 */
	function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    var targetInst = event._targetInst;
	    var parentInst = targetInst ? EventPluginUtils.getParentInstance(targetInst) : null;
	    EventPluginUtils.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
	  }
	}
	
	/**
	 * Accumulates without regard to direction, does not look for phased
	 * registration names. Same as `accumulateDirectDispatchesSingle` but without
	 * requiring that the `dispatchMarker` be the same as the dispatched ID.
	 */
	function accumulateDispatches(inst, ignoredDirection, event) {
	  if (event && event.dispatchConfig.registrationName) {
	    var registrationName = event.dispatchConfig.registrationName;
	    var listener = getListener(inst, registrationName);
	    if (listener) {
	      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
	      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
	    }
	  }
	}
	
	/**
	 * Accumulates dispatches on an `SyntheticEvent`, but only for the
	 * `dispatchMarker`.
	 * @param {SyntheticEvent} event
	 */
	function accumulateDirectDispatchesSingle(event) {
	  if (event && event.dispatchConfig.registrationName) {
	    accumulateDispatches(event._targetInst, null, event);
	  }
	}
	
	function accumulateTwoPhaseDispatches(events) {
	  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
	}
	
	function accumulateTwoPhaseDispatchesSkipTarget(events) {
	  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
	}
	
	function accumulateEnterLeaveDispatches(leave, enter, from, to) {
	  EventPluginUtils.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
	}
	
	function accumulateDirectDispatches(events) {
	  forEachAccumulated(events, accumulateDirectDispatchesSingle);
	}
	
	/**
	 * A small set of propagation patterns, each of which will accept a small amount
	 * of information, and generate a set of "dispatch ready event objects" - which
	 * are sets of events that have already been annotated with a set of dispatched
	 * listener functions/ids. The API is designed this way to discourage these
	 * propagation strategies from actually executing the dispatches, since we
	 * always want to collect the entire set of dispatches before executing event a
	 * single one.
	 *
	 * @constructor EventPropagators
	 */
	var EventPropagators = {
	  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
	  accumulateDirectDispatches: accumulateDirectDispatches,
	  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
	};
	
	module.exports = EventPropagators;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var EventPluginRegistry = __webpack_require__(48);
	var EventPluginUtils = __webpack_require__(49);
	var ReactErrorUtils = __webpack_require__(50);
	
	var accumulateInto = __webpack_require__(51);
	var forEachAccumulated = __webpack_require__(52);
	var invariant = __webpack_require__(12);
	
	/**
	 * Internal store for event listeners
	 */
	var listenerBank = {};
	
	/**
	 * Internal queue of events that have accumulated their dispatches and are
	 * waiting to have their dispatches executed.
	 */
	var eventQueue = null;
	
	/**
	 * Dispatches an event and releases it back into the pool, unless persistent.
	 *
	 * @param {?object} event Synthetic event to be dispatched.
	 * @param {boolean} simulated If the event is simulated (changes exn behavior)
	 * @private
	 */
	var executeDispatchesAndRelease = function (event, simulated) {
	  if (event) {
	    EventPluginUtils.executeDispatchesInOrder(event, simulated);
	
	    if (!event.isPersistent()) {
	      event.constructor.release(event);
	    }
	  }
	};
	var executeDispatchesAndReleaseSimulated = function (e) {
	  return executeDispatchesAndRelease(e, true);
	};
	var executeDispatchesAndReleaseTopLevel = function (e) {
	  return executeDispatchesAndRelease(e, false);
	};
	
	var getDictionaryKey = function (inst) {
	  // Prevents V8 performance issue:
	  // https://github.com/facebook/react/pull/7232
	  return '.' + inst._rootNodeID;
	};
	
	function isInteractive(tag) {
	  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
	}
	
	function shouldPreventMouseEvent(name, type, props) {
	  switch (name) {
	    case 'onClick':
	    case 'onClickCapture':
	    case 'onDoubleClick':
	    case 'onDoubleClickCapture':
	    case 'onMouseDown':
	    case 'onMouseDownCapture':
	    case 'onMouseMove':
	    case 'onMouseMoveCapture':
	    case 'onMouseUp':
	    case 'onMouseUpCapture':
	      return !!(props.disabled && isInteractive(type));
	    default:
	      return false;
	  }
	}
	
	/**
	 * This is a unified interface for event plugins to be installed and configured.
	 *
	 * Event plugins can implement the following properties:
	 *
	 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
	 *     Required. When a top-level event is fired, this method is expected to
	 *     extract synthetic events that will in turn be queued and dispatched.
	 *
	 *   `eventTypes` {object}
	 *     Optional, plugins that fire events must publish a mapping of registration
	 *     names that are used to register listeners. Values of this mapping must
	 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
	 *
	 *   `executeDispatch` {function(object, function, string)}
	 *     Optional, allows plugins to override how an event gets dispatched. By
	 *     default, the listener is simply invoked.
	 *
	 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
	 *
	 * @public
	 */
	var EventPluginHub = {
	  /**
	   * Methods for injecting dependencies.
	   */
	  injection: {
	    /**
	     * @param {array} InjectedEventPluginOrder
	     * @public
	     */
	    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
	
	    /**
	     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	     */
	    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
	  },
	
	  /**
	   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
	   *
	   * @param {object} inst The instance, which is the source of events.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {function} listener The callback to store.
	   */
	  putListener: function (inst, registrationName, listener) {
	    !(typeof listener === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : _prodInvariant('94', registrationName, typeof listener) : void 0;
	
	    var key = getDictionaryKey(inst);
	    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
	    bankForRegistrationName[key] = listener;
	
	    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
	    if (PluginModule && PluginModule.didPutListener) {
	      PluginModule.didPutListener(inst, registrationName, listener);
	    }
	  },
	
	  /**
	   * @param {object} inst The instance, which is the source of events.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @return {?function} The stored callback.
	   */
	  getListener: function (inst, registrationName) {
	    // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
	    // live here; needs to be moved to a better place soon
	    var bankForRegistrationName = listenerBank[registrationName];
	    if (shouldPreventMouseEvent(registrationName, inst._currentElement.type, inst._currentElement.props)) {
	      return null;
	    }
	    var key = getDictionaryKey(inst);
	    return bankForRegistrationName && bankForRegistrationName[key];
	  },
	
	  /**
	   * Deletes a listener from the registration bank.
	   *
	   * @param {object} inst The instance, which is the source of events.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   */
	  deleteListener: function (inst, registrationName) {
	    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
	    if (PluginModule && PluginModule.willDeleteListener) {
	      PluginModule.willDeleteListener(inst, registrationName);
	    }
	
	    var bankForRegistrationName = listenerBank[registrationName];
	    // TODO: This should never be null -- when is it?
	    if (bankForRegistrationName) {
	      var key = getDictionaryKey(inst);
	      delete bankForRegistrationName[key];
	    }
	  },
	
	  /**
	   * Deletes all listeners for the DOM element with the supplied ID.
	   *
	   * @param {object} inst The instance, which is the source of events.
	   */
	  deleteAllListeners: function (inst) {
	    var key = getDictionaryKey(inst);
	    for (var registrationName in listenerBank) {
	      if (!listenerBank.hasOwnProperty(registrationName)) {
	        continue;
	      }
	
	      if (!listenerBank[registrationName][key]) {
	        continue;
	      }
	
	      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
	      if (PluginModule && PluginModule.willDeleteListener) {
	        PluginModule.willDeleteListener(inst, registrationName);
	      }
	
	      delete listenerBank[registrationName][key];
	    }
	  },
	
	  /**
	   * Allows registered plugins an opportunity to extract events from top-level
	   * native browser events.
	   *
	   * @return {*} An accumulation of synthetic events.
	   * @internal
	   */
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var events;
	    var plugins = EventPluginRegistry.plugins;
	    for (var i = 0; i < plugins.length; i++) {
	      // Not every plugin in the ordering may be loaded at runtime.
	      var possiblePlugin = plugins[i];
	      if (possiblePlugin) {
	        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
	        if (extractedEvents) {
	          events = accumulateInto(events, extractedEvents);
	        }
	      }
	    }
	    return events;
	  },
	
	  /**
	   * Enqueues a synthetic event that should be dispatched when
	   * `processEventQueue` is invoked.
	   *
	   * @param {*} events An accumulation of synthetic events.
	   * @internal
	   */
	  enqueueEvents: function (events) {
	    if (events) {
	      eventQueue = accumulateInto(eventQueue, events);
	    }
	  },
	
	  /**
	   * Dispatches all synthetic events on the event queue.
	   *
	   * @internal
	   */
	  processEventQueue: function (simulated) {
	    // Set `eventQueue` to null before processing it so that we can tell if more
	    // events get enqueued while processing.
	    var processingEventQueue = eventQueue;
	    eventQueue = null;
	    if (simulated) {
	      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
	    } else {
	      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
	    }
	    !!eventQueue ? process.env.NODE_ENV !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : _prodInvariant('95') : void 0;
	    // This would be a good time to rethrow if any of the event handlers threw.
	    ReactErrorUtils.rethrowCaughtError();
	  },
	
	  /**
	   * These are needed for tests only. Do not use!
	   */
	  __purge: function () {
	    listenerBank = {};
	  },
	
	  __getListenerBank: function () {
	    return listenerBank;
	  }
	};
	
	module.exports = EventPluginHub;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Injectable ordering of event plugins.
	 */
	var eventPluginOrder = null;
	
	/**
	 * Injectable mapping from names to event plugin modules.
	 */
	var namesToPlugins = {};
	
	/**
	 * Recomputes the plugin list using the injected plugins and plugin ordering.
	 *
	 * @private
	 */
	function recomputePluginOrdering() {
	  if (!eventPluginOrder) {
	    // Wait until an `eventPluginOrder` is injected.
	    return;
	  }
	  for (var pluginName in namesToPlugins) {
	    var pluginModule = namesToPlugins[pluginName];
	    var pluginIndex = eventPluginOrder.indexOf(pluginName);
	    !(pluginIndex > -1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : _prodInvariant('96', pluginName) : void 0;
	    if (EventPluginRegistry.plugins[pluginIndex]) {
	      continue;
	    }
	    !pluginModule.extractEvents ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : _prodInvariant('97', pluginName) : void 0;
	    EventPluginRegistry.plugins[pluginIndex] = pluginModule;
	    var publishedEvents = pluginModule.eventTypes;
	    for (var eventName in publishedEvents) {
	      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : _prodInvariant('98', eventName, pluginName) : void 0;
	    }
	  }
	}
	
	/**
	 * Publishes an event so that it can be dispatched by the supplied plugin.
	 *
	 * @param {object} dispatchConfig Dispatch configuration for the event.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @return {boolean} True if the event was successfully published.
	 * @private
	 */
	function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
	  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : _prodInvariant('99', eventName) : void 0;
	  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
	
	  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
	  if (phasedRegistrationNames) {
	    for (var phaseName in phasedRegistrationNames) {
	      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
	        var phasedRegistrationName = phasedRegistrationNames[phaseName];
	        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
	      }
	    }
	    return true;
	  } else if (dispatchConfig.registrationName) {
	    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
	    return true;
	  }
	  return false;
	}
	
	/**
	 * Publishes a registration name that is used to identify dispatched events and
	 * can be used with `EventPluginHub.putListener` to register listeners.
	 *
	 * @param {string} registrationName Registration name to add.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @private
	 */
	function publishRegistrationName(registrationName, pluginModule, eventName) {
	  !!EventPluginRegistry.registrationNameModules[registrationName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : _prodInvariant('100', registrationName) : void 0;
	  EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
	  EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;
	
	  if (process.env.NODE_ENV !== 'production') {
	    var lowerCasedName = registrationName.toLowerCase();
	    EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;
	
	    if (registrationName === 'onDoubleClick') {
	      EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
	    }
	  }
	}
	
	/**
	 * Registers plugins so that they can extract and dispatch events.
	 *
	 * @see {EventPluginHub}
	 */
	var EventPluginRegistry = {
	  /**
	   * Ordered list of injected plugins.
	   */
	  plugins: [],
	
	  /**
	   * Mapping from event name to dispatch config
	   */
	  eventNameDispatchConfigs: {},
	
	  /**
	   * Mapping from registration name to plugin module
	   */
	  registrationNameModules: {},
	
	  /**
	   * Mapping from registration name to event name
	   */
	  registrationNameDependencies: {},
	
	  /**
	   * Mapping from lowercase registration names to the properly cased version,
	   * used to warn in the case of missing event handlers. Available
	   * only in __DEV__.
	   * @type {Object}
	   */
	  possibleRegistrationNames: process.env.NODE_ENV !== 'production' ? {} : null,
	  // Trust the developer to only use possibleRegistrationNames in __DEV__
	
	  /**
	   * Injects an ordering of plugins (by plugin name). This allows the ordering
	   * to be decoupled from injection of the actual plugins so that ordering is
	   * always deterministic regardless of packaging, on-the-fly injection, etc.
	   *
	   * @param {array} InjectedEventPluginOrder
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginOrder}
	   */
	  injectEventPluginOrder: function (injectedEventPluginOrder) {
	    !!eventPluginOrder ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : _prodInvariant('101') : void 0;
	    // Clone the ordering so it cannot be dynamically mutated.
	    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
	    recomputePluginOrdering();
	  },
	
	  /**
	   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
	   * in the ordering injected by `injectEventPluginOrder`.
	   *
	   * Plugins can be injected as part of page initialization or on-the-fly.
	   *
	   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginsByName}
	   */
	  injectEventPluginsByName: function (injectedNamesToPlugins) {
	    var isOrderingDirty = false;
	    for (var pluginName in injectedNamesToPlugins) {
	      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
	        continue;
	      }
	      var pluginModule = injectedNamesToPlugins[pluginName];
	      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
	        !!namesToPlugins[pluginName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : _prodInvariant('102', pluginName) : void 0;
	        namesToPlugins[pluginName] = pluginModule;
	        isOrderingDirty = true;
	      }
	    }
	    if (isOrderingDirty) {
	      recomputePluginOrdering();
	    }
	  },
	
	  /**
	   * Looks up the plugin for the supplied event.
	   *
	   * @param {object} event A synthetic event.
	   * @return {?object} The plugin that created the supplied event.
	   * @internal
	   */
	  getPluginModuleForEvent: function (event) {
	    var dispatchConfig = event.dispatchConfig;
	    if (dispatchConfig.registrationName) {
	      return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
	    }
	    if (dispatchConfig.phasedRegistrationNames !== undefined) {
	      // pulling phasedRegistrationNames out of dispatchConfig helps Flow see
	      // that it is not undefined.
	      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
	
	      for (var phase in phasedRegistrationNames) {
	        if (!phasedRegistrationNames.hasOwnProperty(phase)) {
	          continue;
	        }
	        var pluginModule = EventPluginRegistry.registrationNameModules[phasedRegistrationNames[phase]];
	        if (pluginModule) {
	          return pluginModule;
	        }
	      }
	    }
	    return null;
	  },
	
	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _resetEventPlugins: function () {
	    eventPluginOrder = null;
	    for (var pluginName in namesToPlugins) {
	      if (namesToPlugins.hasOwnProperty(pluginName)) {
	        delete namesToPlugins[pluginName];
	      }
	    }
	    EventPluginRegistry.plugins.length = 0;
	
	    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
	    for (var eventName in eventNameDispatchConfigs) {
	      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
	        delete eventNameDispatchConfigs[eventName];
	      }
	    }
	
	    var registrationNameModules = EventPluginRegistry.registrationNameModules;
	    for (var registrationName in registrationNameModules) {
	      if (registrationNameModules.hasOwnProperty(registrationName)) {
	        delete registrationNameModules[registrationName];
	      }
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var possibleRegistrationNames = EventPluginRegistry.possibleRegistrationNames;
	      for (var lowerCasedName in possibleRegistrationNames) {
	        if (possibleRegistrationNames.hasOwnProperty(lowerCasedName)) {
	          delete possibleRegistrationNames[lowerCasedName];
	        }
	      }
	    }
	  }
	};
	
	module.exports = EventPluginRegistry;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var ReactErrorUtils = __webpack_require__(50);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	/**
	 * Injected dependencies:
	 */
	
	/**
	 * - `ComponentTree`: [required] Module that can convert between React instances
	 *   and actual node references.
	 */
	var ComponentTree;
	var TreeTraversal;
	var injection = {
	  injectComponentTree: function (Injected) {
	    ComponentTree = Injected;
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(Injected && Injected.getNodeFromInstance && Injected.getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.') : void 0;
	    }
	  },
	  injectTreeTraversal: function (Injected) {
	    TreeTraversal = Injected;
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(Injected && Injected.isAncestor && Injected.getLowestCommonAncestor, 'EventPluginUtils.injection.injectTreeTraversal(...): Injected ' + 'module is missing isAncestor or getLowestCommonAncestor.') : void 0;
	    }
	  }
	};
	
	function isEndish(topLevelType) {
	  return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
	}
	
	function isMoveish(topLevelType) {
	  return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
	}
	function isStartish(topLevelType) {
	  return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
	}
	
	var validateEventDispatches;
	if (process.env.NODE_ENV !== 'production') {
	  validateEventDispatches = function (event) {
	    var dispatchListeners = event._dispatchListeners;
	    var dispatchInstances = event._dispatchInstances;
	
	    var listenersIsArr = Array.isArray(dispatchListeners);
	    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
	
	    var instancesIsArr = Array.isArray(dispatchInstances);
	    var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;
	
	    process.env.NODE_ENV !== 'production' ? warning(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : void 0;
	  };
	}
	
	/**
	 * Dispatch the event to the listener.
	 * @param {SyntheticEvent} event SyntheticEvent to handle
	 * @param {boolean} simulated If the event is simulated (changes exn behavior)
	 * @param {function} listener Application-level callback
	 * @param {*} inst Internal component instance
	 */
	function executeDispatch(event, simulated, listener, inst) {
	  var type = event.type || 'unknown-event';
	  event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);
	  if (simulated) {
	    ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event);
	  } else {
	    ReactErrorUtils.invokeGuardedCallback(type, listener, event);
	  }
	  event.currentTarget = null;
	}
	
	/**
	 * Standard/simple iteration through an event's collected dispatches.
	 */
	function executeDispatchesInOrder(event, simulated) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchInstances = event._dispatchInstances;
	  if (process.env.NODE_ENV !== 'production') {
	    validateEventDispatches(event);
	  }
	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      }
	      // Listeners and Instances are two parallel arrays that are always in sync.
	      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
	    }
	  } else if (dispatchListeners) {
	    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
	  }
	  event._dispatchListeners = null;
	  event._dispatchInstances = null;
	}
	
	/**
	 * Standard/simple iteration through an event's collected dispatches, but stops
	 * at the first dispatch execution returning true, and returns that id.
	 *
	 * @return {?string} id of the first dispatch execution who's listener returns
	 * true, or null if no listener returned true.
	 */
	function executeDispatchesInOrderStopAtTrueImpl(event) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchInstances = event._dispatchInstances;
	  if (process.env.NODE_ENV !== 'production') {
	    validateEventDispatches(event);
	  }
	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      }
	      // Listeners and Instances are two parallel arrays that are always in sync.
	      if (dispatchListeners[i](event, dispatchInstances[i])) {
	        return dispatchInstances[i];
	      }
	    }
	  } else if (dispatchListeners) {
	    if (dispatchListeners(event, dispatchInstances)) {
	      return dispatchInstances;
	    }
	  }
	  return null;
	}
	
	/**
	 * @see executeDispatchesInOrderStopAtTrueImpl
	 */
	function executeDispatchesInOrderStopAtTrue(event) {
	  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
	  event._dispatchInstances = null;
	  event._dispatchListeners = null;
	  return ret;
	}
	
	/**
	 * Execution of a "direct" dispatch - there must be at most one dispatch
	 * accumulated on the event or it is considered an error. It doesn't really make
	 * sense for an event with multiple dispatches (bubbled) to keep track of the
	 * return values at each dispatch execution, but it does tend to make sense when
	 * dealing with "direct" dispatches.
	 *
	 * @return {*} The return value of executing the single dispatch.
	 */
	function executeDirectDispatch(event) {
	  if (process.env.NODE_ENV !== 'production') {
	    validateEventDispatches(event);
	  }
	  var dispatchListener = event._dispatchListeners;
	  var dispatchInstance = event._dispatchInstances;
	  !!Array.isArray(dispatchListener) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : _prodInvariant('103') : void 0;
	  event.currentTarget = dispatchListener ? EventPluginUtils.getNodeFromInstance(dispatchInstance) : null;
	  var res = dispatchListener ? dispatchListener(event) : null;
	  event.currentTarget = null;
	  event._dispatchListeners = null;
	  event._dispatchInstances = null;
	  return res;
	}
	
	/**
	 * @param {SyntheticEvent} event
	 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
	 */
	function hasDispatches(event) {
	  return !!event._dispatchListeners;
	}
	
	/**
	 * General utilities that are useful in creating custom Event Plugins.
	 */
	var EventPluginUtils = {
	  isEndish: isEndish,
	  isMoveish: isMoveish,
	  isStartish: isStartish,
	
	  executeDirectDispatch: executeDirectDispatch,
	  executeDispatchesInOrder: executeDispatchesInOrder,
	  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
	  hasDispatches: hasDispatches,
	
	  getInstanceFromNode: function (node) {
	    return ComponentTree.getInstanceFromNode(node);
	  },
	  getNodeFromInstance: function (node) {
	    return ComponentTree.getNodeFromInstance(node);
	  },
	  isAncestor: function (a, b) {
	    return TreeTraversal.isAncestor(a, b);
	  },
	  getLowestCommonAncestor: function (a, b) {
	    return TreeTraversal.getLowestCommonAncestor(a, b);
	  },
	  getParentInstance: function (inst) {
	    return TreeTraversal.getParentInstance(inst);
	  },
	  traverseTwoPhase: function (target, fn, arg) {
	    return TreeTraversal.traverseTwoPhase(target, fn, arg);
	  },
	  traverseEnterLeave: function (from, to, fn, argFrom, argTo) {
	    return TreeTraversal.traverseEnterLeave(from, to, fn, argFrom, argTo);
	  },
	
	  injection: injection
	};
	
	module.exports = EventPluginUtils;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var caughtError = null;
	
	/**
	 * Call a function while guarding against errors that happens within it.
	 *
	 * @param {String} name of the guard to use for logging or debugging
	 * @param {Function} func The function to invoke
	 * @param {*} a First argument
	 * @param {*} b Second argument
	 */
	function invokeGuardedCallback(name, func, a) {
	  try {
	    func(a);
	  } catch (x) {
	    if (caughtError === null) {
	      caughtError = x;
	    }
	  }
	}
	
	var ReactErrorUtils = {
	  invokeGuardedCallback: invokeGuardedCallback,
	
	  /**
	   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
	   * handler are sure to be rethrown by rethrowCaughtError.
	   */
	  invokeGuardedCallbackWithCatch: invokeGuardedCallback,
	
	  /**
	   * During execution of guarded functions we will capture the first error which
	   * we will rethrow to be handled by the top level error handler.
	   */
	  rethrowCaughtError: function () {
	    if (caughtError) {
	      var error = caughtError;
	      caughtError = null;
	      throw error;
	    }
	  }
	};
	
	if (process.env.NODE_ENV !== 'production') {
	  /**
	   * To help development we can get better devtools integration by simulating a
	   * real browser event.
	   */
	  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
	    var fakeNode = document.createElement('react');
	    ReactErrorUtils.invokeGuardedCallback = function (name, func, a) {
	      var boundFunc = func.bind(null, a);
	      var evtType = 'react-' + name;
	      fakeNode.addEventListener(evtType, boundFunc, false);
	      var evt = document.createEvent('Event');
	      evt.initEvent(evtType, false, false);
	      fakeNode.dispatchEvent(evt);
	      fakeNode.removeEventListener(evtType, boundFunc, false);
	    };
	  }
	}
	
	module.exports = ReactErrorUtils;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Accumulates items that must not be null or undefined into the first one. This
	 * is used to conserve memory by avoiding array allocations, and thus sacrifices
	 * API cleanness. Since `current` can be null before being passed in and not
	 * null after this function, make sure to assign it back to `current`:
	 *
	 * `a = accumulateInto(a, b);`
	 *
	 * This API should be sparingly used. Try `accumulate` for something cleaner.
	 *
	 * @return {*|array<*>} An accumulation of items.
	 */
	
	function accumulateInto(current, next) {
	  !(next != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : _prodInvariant('30') : void 0;
	
	  if (current == null) {
	    return next;
	  }
	
	  // Both are not empty. Warning: Never call x.concat(y) when you are not
	  // certain that x is an Array (x could be a string with concat method).
	  if (Array.isArray(current)) {
	    if (Array.isArray(next)) {
	      current.push.apply(current, next);
	      return current;
	    }
	    current.push(next);
	    return current;
	  }
	
	  if (Array.isArray(next)) {
	    // A bit too dangerous to mutate `next`.
	    return [current].concat(next);
	  }
	
	  return [current, next];
	}
	
	module.exports = accumulateInto;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	/**
	 * @param {array} arr an "accumulation" of items which is either an Array or
	 * a single item. Useful when paired with the `accumulate` module. This is a
	 * simple utility that allows us to reason about a collection of items, but
	 * handling the case when there is exactly one item (and we do not need to
	 * allocate an array).
	 */
	
	function forEachAccumulated(arr, cb, scope) {
	  if (Array.isArray(arr)) {
	    arr.forEach(cb, scope);
	  } else if (arr) {
	    cb.call(scope, arr);
	  }
	}
	
	module.exports = forEachAccumulated;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {
	
	  canUseDOM: canUseDOM,
	
	  canUseWorkers: typeof Worker !== 'undefined',
	
	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
	
	  canUseViewport: canUseDOM && !!window.screen,
	
	  isInWorker: !canUseDOM // For now, this is true - might change in the future.
	
	};
	
	module.exports = ExecutionEnvironment;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var PooledClass = __webpack_require__(55);
	
	var getTextContentAccessor = __webpack_require__(56);
	
	/**
	 * This helper class stores information about text content of a target node,
	 * allowing comparison of content before and after a given event.
	 *
	 * Identify the node where selection currently begins, then observe
	 * both its text content and its current position in the DOM. Since the
	 * browser may natively replace the target node during composition, we can
	 * use its position to find its replacement.
	 *
	 * @param {DOMEventTarget} root
	 */
	function FallbackCompositionState(root) {
	  this._root = root;
	  this._startText = this.getText();
	  this._fallbackText = null;
	}
	
	_assign(FallbackCompositionState.prototype, {
	  destructor: function () {
	    this._root = null;
	    this._startText = null;
	    this._fallbackText = null;
	  },
	
	  /**
	   * Get current text of input.
	   *
	   * @return {string}
	   */
	  getText: function () {
	    if ('value' in this._root) {
	      return this._root.value;
	    }
	    return this._root[getTextContentAccessor()];
	  },
	
	  /**
	   * Determine the differing substring between the initially stored
	   * text content and the current content.
	   *
	   * @return {string}
	   */
	  getData: function () {
	    if (this._fallbackText) {
	      return this._fallbackText;
	    }
	
	    var start;
	    var startValue = this._startText;
	    var startLength = startValue.length;
	    var end;
	    var endValue = this.getText();
	    var endLength = endValue.length;
	
	    for (start = 0; start < startLength; start++) {
	      if (startValue[start] !== endValue[start]) {
	        break;
	      }
	    }
	
	    var minEnd = startLength - start;
	    for (end = 1; end <= minEnd; end++) {
	      if (startValue[startLength - end] !== endValue[endLength - end]) {
	        break;
	      }
	    }
	
	    var sliceTail = end > 1 ? 1 - end : undefined;
	    this._fallbackText = endValue.slice(start, sliceTail);
	    return this._fallbackText;
	  }
	});
	
	PooledClass.addPoolingTo(FallbackCompositionState);
	
	module.exports = FallbackCompositionState;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};
	
	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};
	
	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};
	
	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};
	
	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};
	
	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;
	
	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};
	
	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler
	};
	
	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(53);
	
	var contentKey = null;
	
	/**
	 * Gets the key used to access text content on a DOM node.
	 *
	 * @return {?string} Key used to access text content.
	 * @internal
	 */
	function getTextContentAccessor() {
	  if (!contentKey && ExecutionEnvironment.canUseDOM) {
	    // Prefer textContent to innerText because many browsers support both but
	    // SVG <text> elements don't support innerText even when <div> does.
	    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
	  }
	  return contentKey;
	}
	
	module.exports = getTextContentAccessor;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticEvent = __webpack_require__(58);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
	 */
	var CompositionEventInterface = {
	  data: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);
	
	module.exports = SyntheticCompositionEvent;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var PooledClass = __webpack_require__(55);
	
	var emptyFunction = __webpack_require__(9);
	var warning = __webpack_require__(8);
	
	var didWarnForAddedNewProperty = false;
	var isProxySupported = typeof Proxy === 'function';
	
	var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var EventInterface = {
	  type: null,
	  target: null,
	  // currentTarget is set when dispatching; no use in copying it here
	  currentTarget: emptyFunction.thatReturnsNull,
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function (event) {
	    return event.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};
	
	/**
	 * Synthetic events are dispatched by event plugins, typically in response to a
	 * top-level event delegation handler.
	 *
	 * These systems should generally use pooling to reduce the frequency of garbage
	 * collection. The system should check `isPersistent` to determine whether the
	 * event should be released into the pool after being dispatched. Users that
	 * need a persisted event should invoke `persist`.
	 *
	 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
	 * normalizing browser quirks. Subclasses do not necessarily have to implement a
	 * DOM interface; custom application-specific events can also subclass this.
	 *
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {*} targetInst Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @param {DOMEventTarget} nativeEventTarget Target node.
	 */
	function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
	  if (process.env.NODE_ENV !== 'production') {
	    // these have a getter/setter for warnings
	    delete this.nativeEvent;
	    delete this.preventDefault;
	    delete this.stopPropagation;
	  }
	
	  this.dispatchConfig = dispatchConfig;
	  this._targetInst = targetInst;
	  this.nativeEvent = nativeEvent;
	
	  var Interface = this.constructor.Interface;
	  for (var propName in Interface) {
	    if (!Interface.hasOwnProperty(propName)) {
	      continue;
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      delete this[propName]; // this has a getter/setter for warnings
	    }
	    var normalize = Interface[propName];
	    if (normalize) {
	      this[propName] = normalize(nativeEvent);
	    } else {
	      if (propName === 'target') {
	        this.target = nativeEventTarget;
	      } else {
	        this[propName] = nativeEvent[propName];
	      }
	    }
	  }
	
	  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
	  if (defaultPrevented) {
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  } else {
	    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
	  }
	  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
	  return this;
	}
	
	_assign(SyntheticEvent.prototype, {
	  preventDefault: function () {
	    this.defaultPrevented = true;
	    var event = this.nativeEvent;
	    if (!event) {
	      return;
	    }
	
	    if (event.preventDefault) {
	      event.preventDefault();
	      // eslint-disable-next-line valid-typeof
	    } else if (typeof event.returnValue !== 'unknown') {
	      event.returnValue = false;
	    }
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  },
	
	  stopPropagation: function () {
	    var event = this.nativeEvent;
	    if (!event) {
	      return;
	    }
	
	    if (event.stopPropagation) {
	      event.stopPropagation();
	      // eslint-disable-next-line valid-typeof
	    } else if (typeof event.cancelBubble !== 'unknown') {
	      // The ChangeEventPlugin registers a "propertychange" event for
	      // IE. This event does not support bubbling or cancelling, and
	      // any references to cancelBubble throw "Member not found".  A
	      // typeof check of "unknown" circumvents this issue (and is also
	      // IE specific).
	      event.cancelBubble = true;
	    }
	
	    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
	  },
	
	  /**
	   * We release all dispatched `SyntheticEvent`s after each event loop, adding
	   * them back into the pool. This allows a way to hold onto a reference that
	   * won't be added back into the pool.
	   */
	  persist: function () {
	    this.isPersistent = emptyFunction.thatReturnsTrue;
	  },
	
	  /**
	   * Checks if this event should be released back into the pool.
	   *
	   * @return {boolean} True if this should not be released, false otherwise.
	   */
	  isPersistent: emptyFunction.thatReturnsFalse,
	
	  /**
	   * `PooledClass` looks for `destructor` on each instance it releases.
	   */
	  destructor: function () {
	    var Interface = this.constructor.Interface;
	    for (var propName in Interface) {
	      if (process.env.NODE_ENV !== 'production') {
	        Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
	      } else {
	        this[propName] = null;
	      }
	    }
	    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
	      this[shouldBeReleasedProperties[i]] = null;
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
	      Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction));
	      Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction));
	    }
	  }
	});
	
	SyntheticEvent.Interface = EventInterface;
	
	if (process.env.NODE_ENV !== 'production') {
	  if (isProxySupported) {
	    /*eslint-disable no-func-assign */
	    SyntheticEvent = new Proxy(SyntheticEvent, {
	      construct: function (target, args) {
	        return this.apply(target, Object.create(target.prototype), args);
	      },
	      apply: function (constructor, that, args) {
	        return new Proxy(constructor.apply(that, args), {
	          set: function (target, prop, value) {
	            if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
	              process.env.NODE_ENV !== 'production' ? warning(didWarnForAddedNewProperty || target.isPersistent(), "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.') : void 0;
	              didWarnForAddedNewProperty = true;
	            }
	            target[prop] = value;
	            return true;
	          }
	        });
	      }
	    });
	    /*eslint-enable no-func-assign */
	  }
	}
	/**
	 * Helper to reduce boilerplate when creating subclasses.
	 *
	 * @param {function} Class
	 * @param {?object} Interface
	 */
	SyntheticEvent.augmentClass = function (Class, Interface) {
	  var Super = this;
	
	  var E = function () {};
	  E.prototype = Super.prototype;
	  var prototype = new E();
	
	  _assign(prototype, Class.prototype);
	  Class.prototype = prototype;
	  Class.prototype.constructor = Class;
	
	  Class.Interface = _assign({}, Super.Interface, Interface);
	  Class.augmentClass = Super.augmentClass;
	
	  PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
	};
	
	PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);
	
	module.exports = SyntheticEvent;
	
	/**
	  * Helper to nullify syntheticEvent instance properties when destructing
	  *
	  * @param {object} SyntheticEvent
	  * @param {String} propName
	  * @return {object} defineProperty object
	  */
	function getPooledWarningPropertyDefinition(propName, getVal) {
	  var isFunction = typeof getVal === 'function';
	  return {
	    configurable: true,
	    set: set,
	    get: get
	  };
	
	  function set(val) {
	    var action = isFunction ? 'setting the method' : 'setting the property';
	    warn(action, 'This is effectively a no-op');
	    return val;
	  }
	
	  function get() {
	    var action = isFunction ? 'accessing the method' : 'accessing the property';
	    var result = isFunction ? 'This is a no-op function' : 'This is set to null';
	    warn(action, result);
	    return getVal;
	  }
	
	  function warn(action, result) {
	    var warningCondition = false;
	    process.env.NODE_ENV !== 'production' ? warning(warningCondition, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticEvent = __webpack_require__(58);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
	 *      /#events-inputevents
	 */
	var InputEventInterface = {
	  data: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticEvent.augmentClass(SyntheticInputEvent, InputEventInterface);
	
	module.exports = SyntheticInputEvent;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var EventPluginHub = __webpack_require__(47);
	var EventPropagators = __webpack_require__(46);
	var ExecutionEnvironment = __webpack_require__(53);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactUpdates = __webpack_require__(61);
	var SyntheticEvent = __webpack_require__(58);
	
	var inputValueTracking = __webpack_require__(74);
	var getEventTarget = __webpack_require__(75);
	var isEventSupported = __webpack_require__(76);
	var isTextInputElement = __webpack_require__(77);
	
	var eventTypes = {
	  change: {
	    phasedRegistrationNames: {
	      bubbled: 'onChange',
	      captured: 'onChangeCapture'
	    },
	    dependencies: ['topBlur', 'topChange', 'topClick', 'topFocus', 'topInput', 'topKeyDown', 'topKeyUp', 'topSelectionChange']
	  }
	};
	
	function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
	  var event = SyntheticEvent.getPooled(eventTypes.change, inst, nativeEvent, target);
	  event.type = 'change';
	  EventPropagators.accumulateTwoPhaseDispatches(event);
	  return event;
	}
	/**
	 * For IE shims
	 */
	var activeElement = null;
	var activeElementInst = null;
	
	/**
	 * SECTION: handle `change` event
	 */
	function shouldUseChangeEvent(elem) {
	  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
	  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
	}
	
	var doesChangeEventBubble = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // See `handleChange` comment below
	  doesChangeEventBubble = isEventSupported('change') && (!document.documentMode || document.documentMode > 8);
	}
	
	function manualDispatchChangeEvent(nativeEvent) {
	  var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));
	
	  // If change and propertychange bubbled, we'd just bind to it like all the
	  // other events and have it go through ReactBrowserEventEmitter. Since it
	  // doesn't, we manually listen for the events and so we have to enqueue and
	  // process the abstract event manually.
	  //
	  // Batching is necessary here in order to ensure that all event handlers run
	  // before the next rerender (including event handlers attached to ancestor
	  // elements instead of directly on the input). Without this, controlled
	  // components don't work properly in conjunction with event bubbling because
	  // the component is rerendered and the value reverted before all the event
	  // handlers can run. See https://github.com/facebook/react/issues/708.
	  ReactUpdates.batchedUpdates(runEventInBatch, event);
	}
	
	function runEventInBatch(event) {
	  EventPluginHub.enqueueEvents(event);
	  EventPluginHub.processEventQueue(false);
	}
	
	function startWatchingForChangeEventIE8(target, targetInst) {
	  activeElement = target;
	  activeElementInst = targetInst;
	  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
	}
	
	function stopWatchingForChangeEventIE8() {
	  if (!activeElement) {
	    return;
	  }
	  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
	  activeElement = null;
	  activeElementInst = null;
	}
	
	function getInstIfValueChanged(targetInst, nativeEvent) {
	  var updated = inputValueTracking.updateValueIfChanged(targetInst);
	  var simulated = nativeEvent.simulated === true && ChangeEventPlugin._allowSimulatedPassThrough;
	
	  if (updated || simulated) {
	    return targetInst;
	  }
	}
	
	function getTargetInstForChangeEvent(topLevelType, targetInst) {
	  if (topLevelType === 'topChange') {
	    return targetInst;
	  }
	}
	
	function handleEventsForChangeEventIE8(topLevelType, target, targetInst) {
	  if (topLevelType === 'topFocus') {
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForChangeEventIE8();
	    startWatchingForChangeEventIE8(target, targetInst);
	  } else if (topLevelType === 'topBlur') {
	    stopWatchingForChangeEventIE8();
	  }
	}
	
	/**
	 * SECTION: handle `input` event
	 */
	var isInputEventSupported = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // IE9 claims to support the input event but fails to trigger it when
	  // deleting text, so we ignore its input events.
	
	  isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
	}
	
	/**
	 * (For IE <=9) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */
	function startWatchingForValueChange(target, targetInst) {
	  activeElement = target;
	  activeElementInst = targetInst;
	  activeElement.attachEvent('onpropertychange', handlePropertyChange);
	}
	
	/**
	 * (For IE <=9) Removes the event listeners from the currently-tracked element,
	 * if any exists.
	 */
	function stopWatchingForValueChange() {
	  if (!activeElement) {
	    return;
	  }
	  activeElement.detachEvent('onpropertychange', handlePropertyChange);
	
	  activeElement = null;
	  activeElementInst = null;
	}
	
	/**
	 * (For IE <=9) Handles a propertychange event, sending a `change` event if
	 * the value of the active element has changed.
	 */
	function handlePropertyChange(nativeEvent) {
	  if (nativeEvent.propertyName !== 'value') {
	    return;
	  }
	  if (getInstIfValueChanged(activeElementInst, nativeEvent)) {
	    manualDispatchChangeEvent(nativeEvent);
	  }
	}
	
	function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
	  if (topLevelType === 'topFocus') {
	    // In IE8, we can capture almost all .value changes by adding a
	    // propertychange handler and looking for events with propertyName
	    // equal to 'value'
	    // In IE9, propertychange fires for most input events but is buggy and
	    // doesn't fire when text is deleted, but conveniently, selectionchange
	    // appears to fire in all of the remaining cases so we catch those and
	    // forward the event if the value has changed
	    // In either case, we don't want to call the event handler if the value
	    // is changed from JS so we redefine a setter for `.value` that updates
	    // our activeElementValue variable, allowing us to ignore those changes
	    //
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForValueChange();
	    startWatchingForValueChange(target, targetInst);
	  } else if (topLevelType === 'topBlur') {
	    stopWatchingForValueChange();
	  }
	}
	
	// For IE8 and IE9.
	function getTargetInstForInputEventPolyfill(topLevelType, targetInst, nativeEvent) {
	  if (topLevelType === 'topSelectionChange' || topLevelType === 'topKeyUp' || topLevelType === 'topKeyDown') {
	    // On the selectionchange event, the target is just document which isn't
	    // helpful for us so just check activeElement instead.
	    //
	    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
	    // propertychange on the first input event after setting `value` from a
	    // script and fires only keydown, keypress, keyup. Catching keyup usually
	    // gets it and catching keydown lets us fire an event for the first
	    // keystroke if user does a key repeat (it'll be a little delayed: right
	    // before the second keystroke). Other input methods (e.g., paste) seem to
	    // fire selectionchange normally.
	    return getInstIfValueChanged(activeElementInst, nativeEvent);
	  }
	}
	
	/**
	 * SECTION: handle `click` event
	 */
	function shouldUseClickEvent(elem) {
	  // Use the `click` event to detect changes to checkbox and radio inputs.
	  // This approach works across all browsers, whereas `change` does not fire
	  // until `blur` in IE8.
	  var nodeName = elem.nodeName;
	  return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
	}
	
	function getTargetInstForClickEvent(topLevelType, targetInst, nativeEvent) {
	  if (topLevelType === 'topClick') {
	    return getInstIfValueChanged(targetInst, nativeEvent);
	  }
	}
	
	function getTargetInstForInputOrChangeEvent(topLevelType, targetInst, nativeEvent) {
	  if (topLevelType === 'topInput' || topLevelType === 'topChange') {
	    return getInstIfValueChanged(targetInst, nativeEvent);
	  }
	}
	
	function handleControlledInputBlur(inst, node) {
	  // TODO: In IE, inst is occasionally null. Why?
	  if (inst == null) {
	    return;
	  }
	
	  // Fiber and ReactDOM keep wrapper state in separate places
	  var state = inst._wrapperState || node._wrapperState;
	
	  if (!state || !state.controlled || node.type !== 'number') {
	    return;
	  }
	
	  // If controlled, assign the value attribute to the current value on blur
	  var value = '' + node.value;
	  if (node.getAttribute('value') !== value) {
	    node.setAttribute('value', value);
	  }
	}
	
	/**
	 * This plugin creates an `onChange` event that normalizes change events
	 * across form elements. This event fires at a time when it's possible to
	 * change the element's value without seeing a flicker.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - select
	 */
	var ChangeEventPlugin = {
	  eventTypes: eventTypes,
	
	  _allowSimulatedPassThrough: true,
	  _isInputEventSupported: isInputEventSupported,
	
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var targetNode = targetInst ? ReactDOMComponentTree.getNodeFromInstance(targetInst) : window;
	
	    var getTargetInstFunc, handleEventFunc;
	    if (shouldUseChangeEvent(targetNode)) {
	      if (doesChangeEventBubble) {
	        getTargetInstFunc = getTargetInstForChangeEvent;
	      } else {
	        handleEventFunc = handleEventsForChangeEventIE8;
	      }
	    } else if (isTextInputElement(targetNode)) {
	      if (isInputEventSupported) {
	        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
	      } else {
	        getTargetInstFunc = getTargetInstForInputEventPolyfill;
	        handleEventFunc = handleEventsForInputEventPolyfill;
	      }
	    } else if (shouldUseClickEvent(targetNode)) {
	      getTargetInstFunc = getTargetInstForClickEvent;
	    }
	
	    if (getTargetInstFunc) {
	      var inst = getTargetInstFunc(topLevelType, targetInst, nativeEvent);
	      if (inst) {
	        var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
	        return event;
	      }
	    }
	
	    if (handleEventFunc) {
	      handleEventFunc(topLevelType, targetNode, targetInst);
	    }
	
	    // When blurring, set the value attribute for number inputs
	    if (topLevelType === 'topBlur') {
	      handleControlledInputBlur(targetInst, targetNode);
	    }
	  }
	};
	
	module.exports = ChangeEventPlugin;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40),
	    _assign = __webpack_require__(4);
	
	var CallbackQueue = __webpack_require__(62);
	var PooledClass = __webpack_require__(55);
	var ReactFeatureFlags = __webpack_require__(63);
	var ReactReconciler = __webpack_require__(64);
	var Transaction = __webpack_require__(73);
	
	var invariant = __webpack_require__(12);
	
	var dirtyComponents = [];
	var updateBatchNumber = 0;
	var asapCallbackQueue = CallbackQueue.getPooled();
	var asapEnqueued = false;
	
	var batchingStrategy = null;
	
	function ensureInjected() {
	  !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching strategy') : _prodInvariant('123') : void 0;
	}
	
	var NESTED_UPDATES = {
	  initialize: function () {
	    this.dirtyComponentsLength = dirtyComponents.length;
	  },
	  close: function () {
	    if (this.dirtyComponentsLength !== dirtyComponents.length) {
	      // Additional updates were enqueued by componentDidUpdate handlers or
	      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
	      // these new updates so that if A's componentDidUpdate calls setState on
	      // B, B will update before the callback A's updater provided when calling
	      // setState.
	      dirtyComponents.splice(0, this.dirtyComponentsLength);
	      flushBatchedUpdates();
	    } else {
	      dirtyComponents.length = 0;
	    }
	  }
	};
	
	var UPDATE_QUEUEING = {
	  initialize: function () {
	    this.callbackQueue.reset();
	  },
	  close: function () {
	    this.callbackQueue.notifyAll();
	  }
	};
	
	var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
	
	function ReactUpdatesFlushTransaction() {
	  this.reinitializeTransaction();
	  this.dirtyComponentsLength = null;
	  this.callbackQueue = CallbackQueue.getPooled();
	  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(
	  /* useCreateElement */true);
	}
	
	_assign(ReactUpdatesFlushTransaction.prototype, Transaction, {
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS;
	  },
	
	  destructor: function () {
	    this.dirtyComponentsLength = null;
	    CallbackQueue.release(this.callbackQueue);
	    this.callbackQueue = null;
	    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
	    this.reconcileTransaction = null;
	  },
	
	  perform: function (method, scope, a) {
	    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
	    // with this transaction's wrappers around it.
	    return Transaction.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
	  }
	});
	
	PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
	
	function batchedUpdates(callback, a, b, c, d, e) {
	  ensureInjected();
	  return batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
	}
	
	/**
	 * Array comparator for ReactComponents by mount ordering.
	 *
	 * @param {ReactComponent} c1 first component you're comparing
	 * @param {ReactComponent} c2 second component you're comparing
	 * @return {number} Return value usable by Array.prototype.sort().
	 */
	function mountOrderComparator(c1, c2) {
	  return c1._mountOrder - c2._mountOrder;
	}
	
	function runBatchedUpdates(transaction) {
	  var len = transaction.dirtyComponentsLength;
	  !(len === dirtyComponents.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to match dirty-components array length (%s).', len, dirtyComponents.length) : _prodInvariant('124', len, dirtyComponents.length) : void 0;
	
	  // Since reconciling a component higher in the owner hierarchy usually (not
	  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
	  // them before their children by sorting the array.
	  dirtyComponents.sort(mountOrderComparator);
	
	  // Any updates enqueued while reconciling must be performed after this entire
	  // batch. Otherwise, if dirtyComponents is [A, B] where A has children B and
	  // C, B could update twice in a single batch if C's render enqueues an update
	  // to B (since B would have already updated, we should skip it, and the only
	  // way we can know to do so is by checking the batch counter).
	  updateBatchNumber++;
	
	  for (var i = 0; i < len; i++) {
	    // If a component is unmounted before pending changes apply, it will still
	    // be here, but we assume that it has cleared its _pendingCallbacks and
	    // that performUpdateIfNecessary is a noop.
	    var component = dirtyComponents[i];
	
	    // If performUpdateIfNecessary happens to enqueue any new updates, we
	    // shouldn't execute the callbacks until the next render happens, so
	    // stash the callbacks first
	    var callbacks = component._pendingCallbacks;
	    component._pendingCallbacks = null;
	
	    var markerName;
	    if (ReactFeatureFlags.logTopLevelRenders) {
	      var namedComponent = component;
	      // Duck type TopLevelWrapper. This is probably always true.
	      if (component._currentElement.type.isReactTopLevelWrapper) {
	        namedComponent = component._renderedComponent;
	      }
	      markerName = 'React update: ' + namedComponent.getName();
	      console.time(markerName);
	    }
	
	    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction, updateBatchNumber);
	
	    if (markerName) {
	      console.timeEnd(markerName);
	    }
	
	    if (callbacks) {
	      for (var j = 0; j < callbacks.length; j++) {
	        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
	      }
	    }
	  }
	}
	
	var flushBatchedUpdates = function () {
	  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
	  // array and perform any updates enqueued by mount-ready handlers (i.e.,
	  // componentDidUpdate) but we need to check here too in order to catch
	  // updates enqueued by setState callbacks and asap calls.
	  while (dirtyComponents.length || asapEnqueued) {
	    if (dirtyComponents.length) {
	      var transaction = ReactUpdatesFlushTransaction.getPooled();
	      transaction.perform(runBatchedUpdates, null, transaction);
	      ReactUpdatesFlushTransaction.release(transaction);
	    }
	
	    if (asapEnqueued) {
	      asapEnqueued = false;
	      var queue = asapCallbackQueue;
	      asapCallbackQueue = CallbackQueue.getPooled();
	      queue.notifyAll();
	      CallbackQueue.release(queue);
	    }
	  }
	};
	
	/**
	 * Mark a component as needing a rerender, adding an optional callback to a
	 * list of functions which will be executed once the rerender occurs.
	 */
	function enqueueUpdate(component) {
	  ensureInjected();
	
	  // Various parts of our code (such as ReactCompositeComponent's
	  // _renderValidatedComponent) assume that calls to render aren't nested;
	  // verify that that's the case. (This is called by each top-level update
	  // function, like setState, forceUpdate, etc.; creation and
	  // destruction of top-level components is guarded in ReactMount.)
	
	  if (!batchingStrategy.isBatchingUpdates) {
	    batchingStrategy.batchedUpdates(enqueueUpdate, component);
	    return;
	  }
	
	  dirtyComponents.push(component);
	  if (component._updateBatchNumber == null) {
	    component._updateBatchNumber = updateBatchNumber + 1;
	  }
	}
	
	/**
	 * Enqueue a callback to be run at the end of the current batching cycle. Throws
	 * if no updates are currently being performed.
	 */
	function asap(callback, context) {
	  !batchingStrategy.isBatchingUpdates ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context whereupdates are not being batched.') : _prodInvariant('125') : void 0;
	  asapCallbackQueue.enqueue(callback, context);
	  asapEnqueued = true;
	}
	
	var ReactUpdatesInjection = {
	  injectReconcileTransaction: function (ReconcileTransaction) {
	    !ReconcileTransaction ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : _prodInvariant('126') : void 0;
	    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
	  },
	
	  injectBatchingStrategy: function (_batchingStrategy) {
	    !_batchingStrategy ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : _prodInvariant('127') : void 0;
	    !(typeof _batchingStrategy.batchedUpdates === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : _prodInvariant('128') : void 0;
	    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : _prodInvariant('129') : void 0;
	    batchingStrategy = _batchingStrategy;
	  }
	};
	
	var ReactUpdates = {
	  /**
	   * React references `ReactReconcileTransaction` using this property in order
	   * to allow dependency injection.
	   *
	   * @internal
	   */
	  ReactReconcileTransaction: null,
	
	  batchedUpdates: batchedUpdates,
	  enqueueUpdate: enqueueUpdate,
	  flushBatchedUpdates: flushBatchedUpdates,
	  injection: ReactUpdatesInjection,
	  asap: asap
	};
	
	module.exports = ReactUpdates;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PooledClass = __webpack_require__(55);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * A specialized pseudo-event module to help keep track of components waiting to
	 * be notified when their DOM representations are available for use.
	 *
	 * This implements `PooledClass`, so you should never need to instantiate this.
	 * Instead, use `CallbackQueue.getPooled()`.
	 *
	 * @class ReactMountReady
	 * @implements PooledClass
	 * @internal
	 */
	
	var CallbackQueue = function () {
	  function CallbackQueue(arg) {
	    _classCallCheck(this, CallbackQueue);
	
	    this._callbacks = null;
	    this._contexts = null;
	    this._arg = arg;
	  }
	
	  /**
	   * Enqueues a callback to be invoked when `notifyAll` is invoked.
	   *
	   * @param {function} callback Invoked when `notifyAll` is invoked.
	   * @param {?object} context Context to call `callback` with.
	   * @internal
	   */
	
	
	  CallbackQueue.prototype.enqueue = function enqueue(callback, context) {
	    this._callbacks = this._callbacks || [];
	    this._callbacks.push(callback);
	    this._contexts = this._contexts || [];
	    this._contexts.push(context);
	  };
	
	  /**
	   * Invokes all enqueued callbacks and clears the queue. This is invoked after
	   * the DOM representation of a component has been created or updated.
	   *
	   * @internal
	   */
	
	
	  CallbackQueue.prototype.notifyAll = function notifyAll() {
	    var callbacks = this._callbacks;
	    var contexts = this._contexts;
	    var arg = this._arg;
	    if (callbacks && contexts) {
	      !(callbacks.length === contexts.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : _prodInvariant('24') : void 0;
	      this._callbacks = null;
	      this._contexts = null;
	      for (var i = 0; i < callbacks.length; i++) {
	        callbacks[i].call(contexts[i], arg);
	      }
	      callbacks.length = 0;
	      contexts.length = 0;
	    }
	  };
	
	  CallbackQueue.prototype.checkpoint = function checkpoint() {
	    return this._callbacks ? this._callbacks.length : 0;
	  };
	
	  CallbackQueue.prototype.rollback = function rollback(len) {
	    if (this._callbacks && this._contexts) {
	      this._callbacks.length = len;
	      this._contexts.length = len;
	    }
	  };
	
	  /**
	   * Resets the internal queue.
	   *
	   * @internal
	   */
	
	
	  CallbackQueue.prototype.reset = function reset() {
	    this._callbacks = null;
	    this._contexts = null;
	  };
	
	  /**
	   * `PooledClass` looks for this.
	   */
	
	
	  CallbackQueue.prototype.destructor = function destructor() {
	    this.reset();
	  };
	
	  return CallbackQueue;
	}();
	
	module.exports = PooledClass.addPoolingTo(CallbackQueue);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var ReactFeatureFlags = {
	  // When true, call console.time() before and .timeEnd() after each top-level
	  // render (both initial renders and updates). Useful when looking at prod-mode
	  // timeline profiles in Chrome, for example.
	  logTopLevelRenders: false
	};
	
	module.exports = ReactFeatureFlags;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactRef = __webpack_require__(65);
	var ReactInstrumentation = __webpack_require__(67);
	
	var warning = __webpack_require__(8);
	
	/**
	 * Helper to call ReactRef.attachRefs with this composite component, split out
	 * to avoid allocations in the transaction mount-ready queue.
	 */
	function attachRefs() {
	  ReactRef.attachRefs(this, this._currentElement);
	}
	
	var ReactReconciler = {
	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?object} the containing host component instance
	   * @param {?object} info about the host container
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function (internalInstance, transaction, hostParent, hostContainerInfo, context, parentDebugID) // 0 in production and for roots
	  {
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onBeforeMountComponent(internalInstance._debugID, internalInstance._currentElement, parentDebugID);
	      }
	    }
	    var markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context, parentDebugID);
	    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
	      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onMountComponent(internalInstance._debugID);
	      }
	    }
	    return markup;
	  },
	
	  /**
	   * Returns a value that can be passed to
	   * ReactComponentEnvironment.replaceNodeWithMarkup.
	   */
	  getHostNode: function (internalInstance) {
	    return internalInstance.getHostNode();
	  },
	
	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function (internalInstance, safely) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onBeforeUnmountComponent(internalInstance._debugID);
	      }
	    }
	    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
	    internalInstance.unmountComponent(safely);
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onUnmountComponent(internalInstance._debugID);
	      }
	    }
	  },
	
	  /**
	   * Update a component using a new element.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactElement} nextElement
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @internal
	   */
	  receiveComponent: function (internalInstance, nextElement, transaction, context) {
	    var prevElement = internalInstance._currentElement;
	
	    if (nextElement === prevElement && context === internalInstance._context) {
	      // Since elements are immutable after the owner is rendered,
	      // we can do a cheap identity compare here to determine if this is a
	      // superfluous reconcile. It's possible for state to be mutable but such
	      // change should trigger an update of the owner which would recreate
	      // the element. We explicitly check for the existence of an owner since
	      // it's possible for an element created outside a composite to be
	      // deeply mutated and reused.
	
	      // TODO: Bailing out early is just a perf optimization right?
	      // TODO: Removing the return statement should affect correctness?
	      return;
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onBeforeUpdateComponent(internalInstance._debugID, nextElement);
	      }
	    }
	
	    var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);
	
	    if (refsChanged) {
	      ReactRef.detachRefs(internalInstance, prevElement);
	    }
	
	    internalInstance.receiveComponent(nextElement, transaction, context);
	
	    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
	      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);
	      }
	    }
	  },
	
	  /**
	   * Flush any dirty changes in a component.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function (internalInstance, transaction, updateBatchNumber) {
	    if (internalInstance._updateBatchNumber !== updateBatchNumber) {
	      // The component's enqueued batch number should always be the current
	      // batch or the following one.
	      process.env.NODE_ENV !== 'production' ? warning(internalInstance._updateBatchNumber == null || internalInstance._updateBatchNumber === updateBatchNumber + 1, 'performUpdateIfNecessary: Unexpected batch number (current %s, ' + 'pending %s)', updateBatchNumber, internalInstance._updateBatchNumber) : void 0;
	      return;
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onBeforeUpdateComponent(internalInstance._debugID, internalInstance._currentElement);
	      }
	    }
	    internalInstance.performUpdateIfNecessary(transaction);
	    if (process.env.NODE_ENV !== 'production') {
	      if (internalInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);
	      }
	    }
	  }
	};
	
	module.exports = ReactReconciler;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var ReactOwner = __webpack_require__(66);
	
	var ReactRef = {};
	
	function attachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(component.getPublicInstance());
	  } else {
	    // Legacy ref
	    ReactOwner.addComponentAsRefTo(component, ref, owner);
	  }
	}
	
	function detachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(null);
	  } else {
	    // Legacy ref
	    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
	  }
	}
	
	ReactRef.attachRefs = function (instance, element) {
	  if (element === null || typeof element !== 'object') {
	    return;
	  }
	  var ref = element.ref;
	  if (ref != null) {
	    attachRef(ref, instance, element._owner);
	  }
	};
	
	ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
	  // If either the owner or a `ref` has changed, make sure the newest owner
	  // has stored a reference to `this`, and the previous owner (if different)
	  // has forgotten the reference to `this`. We use the element instead
	  // of the public this.props because the post processing cannot determine
	  // a ref. The ref conceptually lives on the element.
	
	  // TODO: Should this even be possible? The owner cannot change because
	  // it's forbidden by shouldUpdateReactComponent. The ref can change
	  // if you swap the keys of but not the refs. Reconsider where this check
	  // is made. It probably belongs where the key checking and
	  // instantiateReactComponent is done.
	
	  var prevRef = null;
	  var prevOwner = null;
	  if (prevElement !== null && typeof prevElement === 'object') {
	    prevRef = prevElement.ref;
	    prevOwner = prevElement._owner;
	  }
	
	  var nextRef = null;
	  var nextOwner = null;
	  if (nextElement !== null && typeof nextElement === 'object') {
	    nextRef = nextElement.ref;
	    nextOwner = nextElement._owner;
	  }
	
	  return prevRef !== nextRef ||
	  // If owner changes but we have an unchanged function ref, don't update refs
	  typeof nextRef === 'string' && nextOwner !== prevOwner;
	};
	
	ReactRef.detachRefs = function (instance, element) {
	  if (element === null || typeof element !== 'object') {
	    return;
	  }
	  var ref = element.ref;
	  if (ref != null) {
	    detachRef(ref, instance, element._owner);
	  }
	};
	
	module.exports = ReactRef;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid owner.
	 * @final
	 */
	function isValidOwner(object) {
	  return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
	}
	
	/**
	 * ReactOwners are capable of storing references to owned components.
	 *
	 * All components are capable of //being// referenced by owner components, but
	 * only ReactOwner components are capable of //referencing// owned components.
	 * The named reference is known as a "ref".
	 *
	 * Refs are available when mounted and updated during reconciliation.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return (
	 *         <div onClick={this.handleClick}>
	 *           <CustomComponent ref="custom" />
	 *         </div>
	 *       );
	 *     },
	 *     handleClick: function() {
	 *       this.refs.custom.handleClick();
	 *     },
	 *     componentDidMount: function() {
	 *       this.refs.custom.initialize();
	 *     }
	 *   });
	 *
	 * Refs should rarely be used. When refs are used, they should only be done to
	 * control data that is not handled by React's data flow.
	 *
	 * @class ReactOwner
	 */
	var ReactOwner = {
	  /**
	   * Adds a component by ref to an owner component.
	   *
	   * @param {ReactComponent} component Component to reference.
	   * @param {string} ref Name by which to refer to the component.
	   * @param {ReactOwner} owner Component on which to record the ref.
	   * @final
	   * @internal
	   */
	  addComponentAsRefTo: function (component, ref, owner) {
	    !isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('119') : void 0;
	    owner.attachRef(ref, component);
	  },
	
	  /**
	   * Removes a component by ref from an owner component.
	   *
	   * @param {ReactComponent} component Component to dereference.
	   * @param {string} ref Name of the ref to remove.
	   * @param {ReactOwner} owner Component on which the ref is recorded.
	   * @final
	   * @internal
	   */
	  removeComponentAsRefFrom: function (component, ref, owner) {
	    !isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might be removing a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('120') : void 0;
	    var ownerPublicInstance = owner.getPublicInstance();
	    // Check that `component`'s owner is still alive and that `component` is still the current ref
	    // because we do not want to detach the ref if another component stole it.
	    if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
	      owner.detachRef(ref);
	    }
	  }
	};
	
	module.exports = ReactOwner;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	// Trust the developer to only use ReactInstrumentation with a __DEV__ check
	
	var debugTool = null;
	
	if (process.env.NODE_ENV !== 'production') {
	  var ReactDebugTool = __webpack_require__(68);
	  debugTool = ReactDebugTool;
	}
	
	module.exports = { debugTool: debugTool };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var ReactInvalidSetStateWarningHook = __webpack_require__(69);
	var ReactHostOperationHistoryHook = __webpack_require__(70);
	var ReactComponentTreeHook = __webpack_require__(24);
	var ExecutionEnvironment = __webpack_require__(53);
	
	var performanceNow = __webpack_require__(71);
	var warning = __webpack_require__(8);
	
	var hooks = [];
	var didHookThrowForEvent = {};
	
	function callHook(event, fn, context, arg1, arg2, arg3, arg4, arg5) {
	  try {
	    fn.call(context, arg1, arg2, arg3, arg4, arg5);
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' ? warning(didHookThrowForEvent[event], 'Exception thrown by hook while handling %s: %s', event, e + '\n' + e.stack) : void 0;
	    didHookThrowForEvent[event] = true;
	  }
	}
	
	function emitEvent(event, arg1, arg2, arg3, arg4, arg5) {
	  for (var i = 0; i < hooks.length; i++) {
	    var hook = hooks[i];
	    var fn = hook[event];
	    if (fn) {
	      callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
	    }
	  }
	}
	
	var isProfiling = false;
	var flushHistory = [];
	var lifeCycleTimerStack = [];
	var currentFlushNesting = 0;
	var currentFlushMeasurements = [];
	var currentFlushStartTime = 0;
	var currentTimerDebugID = null;
	var currentTimerStartTime = 0;
	var currentTimerNestedFlushDuration = 0;
	var currentTimerType = null;
	
	var lifeCycleTimerHasWarned = false;
	
	function clearHistory() {
	  ReactComponentTreeHook.purgeUnmountedComponents();
	  ReactHostOperationHistoryHook.clearHistory();
	}
	
	function getTreeSnapshot(registeredIDs) {
	  return registeredIDs.reduce(function (tree, id) {
	    var ownerID = ReactComponentTreeHook.getOwnerID(id);
	    var parentID = ReactComponentTreeHook.getParentID(id);
	    tree[id] = {
	      displayName: ReactComponentTreeHook.getDisplayName(id),
	      text: ReactComponentTreeHook.getText(id),
	      updateCount: ReactComponentTreeHook.getUpdateCount(id),
	      childIDs: ReactComponentTreeHook.getChildIDs(id),
	      // Text nodes don't have owners but this is close enough.
	      ownerID: ownerID || parentID && ReactComponentTreeHook.getOwnerID(parentID) || 0,
	      parentID: parentID
	    };
	    return tree;
	  }, {});
	}
	
	function resetMeasurements() {
	  var previousStartTime = currentFlushStartTime;
	  var previousMeasurements = currentFlushMeasurements;
	  var previousOperations = ReactHostOperationHistoryHook.getHistory();
	
	  if (currentFlushNesting === 0) {
	    currentFlushStartTime = 0;
	    currentFlushMeasurements = [];
	    clearHistory();
	    return;
	  }
	
	  if (previousMeasurements.length || previousOperations.length) {
	    var registeredIDs = ReactComponentTreeHook.getRegisteredIDs();
	    flushHistory.push({
	      duration: performanceNow() - previousStartTime,
	      measurements: previousMeasurements || [],
	      operations: previousOperations || [],
	      treeSnapshot: getTreeSnapshot(registeredIDs)
	    });
	  }
	
	  clearHistory();
	  currentFlushStartTime = performanceNow();
	  currentFlushMeasurements = [];
	}
	
	function checkDebugID(debugID) {
	  var allowRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  if (allowRoot && debugID === 0) {
	    return;
	  }
	  if (!debugID) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDebugTool: debugID may not be empty.') : void 0;
	  }
	}
	
	function beginLifeCycleTimer(debugID, timerType) {
	  if (currentFlushNesting === 0) {
	    return;
	  }
	  if (currentTimerType && !lifeCycleTimerHasWarned) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	    lifeCycleTimerHasWarned = true;
	  }
	  currentTimerStartTime = performanceNow();
	  currentTimerNestedFlushDuration = 0;
	  currentTimerDebugID = debugID;
	  currentTimerType = timerType;
	}
	
	function endLifeCycleTimer(debugID, timerType) {
	  if (currentFlushNesting === 0) {
	    return;
	  }
	  if (currentTimerType !== timerType && !lifeCycleTimerHasWarned) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	    lifeCycleTimerHasWarned = true;
	  }
	  if (isProfiling) {
	    currentFlushMeasurements.push({
	      timerType: timerType,
	      instanceID: debugID,
	      duration: performanceNow() - currentTimerStartTime - currentTimerNestedFlushDuration
	    });
	  }
	  currentTimerStartTime = 0;
	  currentTimerNestedFlushDuration = 0;
	  currentTimerDebugID = null;
	  currentTimerType = null;
	}
	
	function pauseCurrentLifeCycleTimer() {
	  var currentTimer = {
	    startTime: currentTimerStartTime,
	    nestedFlushStartTime: performanceNow(),
	    debugID: currentTimerDebugID,
	    timerType: currentTimerType
	  };
	  lifeCycleTimerStack.push(currentTimer);
	  currentTimerStartTime = 0;
	  currentTimerNestedFlushDuration = 0;
	  currentTimerDebugID = null;
	  currentTimerType = null;
	}
	
	function resumeCurrentLifeCycleTimer() {
	  var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
	      startTime = _lifeCycleTimerStack$.startTime,
	      nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
	      debugID = _lifeCycleTimerStack$.debugID,
	      timerType = _lifeCycleTimerStack$.timerType;
	
	  var nestedFlushDuration = performanceNow() - nestedFlushStartTime;
	  currentTimerStartTime = startTime;
	  currentTimerNestedFlushDuration += nestedFlushDuration;
	  currentTimerDebugID = debugID;
	  currentTimerType = timerType;
	}
	
	var lastMarkTimeStamp = 0;
	var canUsePerformanceMeasure = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';
	
	function shouldMark(debugID) {
	  if (!isProfiling || !canUsePerformanceMeasure) {
	    return false;
	  }
	  var element = ReactComponentTreeHook.getElement(debugID);
	  if (element == null || typeof element !== 'object') {
	    return false;
	  }
	  var isHostElement = typeof element.type === 'string';
	  if (isHostElement) {
	    return false;
	  }
	  return true;
	}
	
	function markBegin(debugID, markType) {
	  if (!shouldMark(debugID)) {
	    return;
	  }
	
	  var markName = debugID + '::' + markType;
	  lastMarkTimeStamp = performanceNow();
	  performance.mark(markName);
	}
	
	function markEnd(debugID, markType) {
	  if (!shouldMark(debugID)) {
	    return;
	  }
	
	  var markName = debugID + '::' + markType;
	  var displayName = ReactComponentTreeHook.getDisplayName(debugID) || 'Unknown';
	
	  // Chrome has an issue of dropping markers recorded too fast:
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=640652
	  // To work around this, we will not report very small measurements.
	  // I determined the magic number by tweaking it back and forth.
	  // 0.05ms was enough to prevent the issue, but I set it to 0.1ms to be safe.
	  // When the bug is fixed, we can `measure()` unconditionally if we want to.
	  var timeStamp = performanceNow();
	  if (timeStamp - lastMarkTimeStamp > 0.1) {
	    var measurementName = displayName + ' [' + markType + ']';
	    performance.measure(measurementName, markName);
	  }
	
	  performance.clearMarks(markName);
	  if (measurementName) {
	    performance.clearMeasures(measurementName);
	  }
	}
	
	var ReactDebugTool = {
	  addHook: function (hook) {
	    hooks.push(hook);
	  },
	  removeHook: function (hook) {
	    for (var i = 0; i < hooks.length; i++) {
	      if (hooks[i] === hook) {
	        hooks.splice(i, 1);
	        i--;
	      }
	    }
	  },
	  isProfiling: function () {
	    return isProfiling;
	  },
	  beginProfiling: function () {
	    if (isProfiling) {
	      return;
	    }
	
	    isProfiling = true;
	    flushHistory.length = 0;
	    resetMeasurements();
	    ReactDebugTool.addHook(ReactHostOperationHistoryHook);
	  },
	  endProfiling: function () {
	    if (!isProfiling) {
	      return;
	    }
	
	    isProfiling = false;
	    resetMeasurements();
	    ReactDebugTool.removeHook(ReactHostOperationHistoryHook);
	  },
	  getFlushHistory: function () {
	    return flushHistory;
	  },
	  onBeginFlush: function () {
	    currentFlushNesting++;
	    resetMeasurements();
	    pauseCurrentLifeCycleTimer();
	    emitEvent('onBeginFlush');
	  },
	  onEndFlush: function () {
	    resetMeasurements();
	    currentFlushNesting--;
	    resumeCurrentLifeCycleTimer();
	    emitEvent('onEndFlush');
	  },
	  onBeginLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
	    markBegin(debugID, timerType);
	    beginLifeCycleTimer(debugID, timerType);
	  },
	  onEndLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    endLifeCycleTimer(debugID, timerType);
	    markEnd(debugID, timerType);
	    emitEvent('onEndLifeCycleTimer', debugID, timerType);
	  },
	  onBeginProcessingChildContext: function () {
	    emitEvent('onBeginProcessingChildContext');
	  },
	  onEndProcessingChildContext: function () {
	    emitEvent('onEndProcessingChildContext');
	  },
	  onHostOperation: function (operation) {
	    checkDebugID(operation.instanceID);
	    emitEvent('onHostOperation', operation);
	  },
	  onSetState: function () {
	    emitEvent('onSetState');
	  },
	  onSetChildren: function (debugID, childDebugIDs) {
	    checkDebugID(debugID);
	    childDebugIDs.forEach(checkDebugID);
	    emitEvent('onSetChildren', debugID, childDebugIDs);
	  },
	  onBeforeMountComponent: function (debugID, element, parentDebugID) {
	    checkDebugID(debugID);
	    checkDebugID(parentDebugID, true);
	    emitEvent('onBeforeMountComponent', debugID, element, parentDebugID);
	    markBegin(debugID, 'mount');
	  },
	  onMountComponent: function (debugID) {
	    checkDebugID(debugID);
	    markEnd(debugID, 'mount');
	    emitEvent('onMountComponent', debugID);
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    checkDebugID(debugID);
	    emitEvent('onBeforeUpdateComponent', debugID, element);
	    markBegin(debugID, 'update');
	  },
	  onUpdateComponent: function (debugID) {
	    checkDebugID(debugID);
	    markEnd(debugID, 'update');
	    emitEvent('onUpdateComponent', debugID);
	  },
	  onBeforeUnmountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onBeforeUnmountComponent', debugID);
	    markBegin(debugID, 'unmount');
	  },
	  onUnmountComponent: function (debugID) {
	    checkDebugID(debugID);
	    markEnd(debugID, 'unmount');
	    emitEvent('onUnmountComponent', debugID);
	  },
	  onTestEvent: function () {
	    emitEvent('onTestEvent');
	  }
	};
	
	// TODO remove these when RN/www gets updated
	ReactDebugTool.addDevtool = ReactDebugTool.addHook;
	ReactDebugTool.removeDevtool = ReactDebugTool.removeHook;
	
	ReactDebugTool.addHook(ReactInvalidSetStateWarningHook);
	ReactDebugTool.addHook(ReactComponentTreeHook);
	var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
	if (/[?&]react_perf\b/.test(url)) {
	  ReactDebugTool.beginProfiling();
	}
	
	module.exports = ReactDebugTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var warning = __webpack_require__(8);
	
	if (process.env.NODE_ENV !== 'production') {
	  var processingChildContext = false;
	
	  var warnInvalidSetState = function () {
	    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
	  };
	}
	
	var ReactInvalidSetStateWarningHook = {
	  onBeginProcessingChildContext: function () {
	    processingChildContext = true;
	  },
	  onEndProcessingChildContext: function () {
	    processingChildContext = false;
	  },
	  onSetState: function () {
	    warnInvalidSetState();
	  }
	};
	
	module.exports = ReactInvalidSetStateWarningHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var history = [];
	
	var ReactHostOperationHistoryHook = {
	  onHostOperation: function (operation) {
	    history.push(operation);
	  },
	  clearHistory: function () {
	    if (ReactHostOperationHistoryHook._preventClearing) {
	      // Should only be used for tests.
	      return;
	    }
	
	    history = [];
	  },
	  getHistory: function () {
	    return history;
	  }
	};
	
	module.exports = ReactHostOperationHistoryHook;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	var performance = __webpack_require__(72);
	
	var performanceNow;
	
	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (performance.now) {
	  performanceNow = function performanceNow() {
	    return performance.now();
	  };
	} else {
	  performanceNow = function performanceNow() {
	    return Date.now();
	  };
	}
	
	module.exports = performanceNow;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(53);
	
	var performance;
	
	if (ExecutionEnvironment.canUseDOM) {
	  performance = window.performance || window.msPerformance || window.webkitPerformance;
	}
	
	module.exports = performance || {};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	var OBSERVED_ERROR = {};
	
	/**
	 * `Transaction` creates a black box that is able to wrap any method such that
	 * certain invariants are maintained before and after the method is invoked
	 * (Even if an exception is thrown while invoking the wrapped method). Whoever
	 * instantiates a transaction can provide enforcers of the invariants at
	 * creation time. The `Transaction` class itself will supply one additional
	 * automatic invariant for you - the invariant that any transaction instance
	 * should not be run while it is already being run. You would typically create a
	 * single instance of a `Transaction` for reuse multiple times, that potentially
	 * is used to wrap several different methods. Wrappers are extremely simple -
	 * they only require implementing two methods.
	 *
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 *
	 * Use cases:
	 * - Preserving the input selection ranges before/after reconciliation.
	 *   Restoring selection even in the event of an unexpected error.
	 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
	 *   while guaranteeing that afterwards, the event system is reactivated.
	 * - Flushing a queue of collected DOM mutations to the main UI thread after a
	 *   reconciliation takes place in a worker thread.
	 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
	 *   content.
	 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
	 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
	 * - (Future use case): Layout calculations before and after DOM updates.
	 *
	 * Transactional plugin API:
	 * - A module that has an `initialize` method that returns any precomputation.
	 * - and a `close` method that accepts the precomputation. `close` is invoked
	 *   when the wrapped process is completed, or has failed.
	 *
	 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
	 * that implement `initialize` and `close`.
	 * @return {Transaction} Single transaction for reuse in thread.
	 *
	 * @class Transaction
	 */
	var TransactionImpl = {
	  /**
	   * Sets up this instance so that it is prepared for collecting metrics. Does
	   * so such that this setup method may be used on an instance that is already
	   * initialized, in a way that does not consume additional memory upon reuse.
	   * That can be useful if you decide to make your subclass of this mixin a
	   * "PooledClass".
	   */
	  reinitializeTransaction: function () {
	    this.transactionWrappers = this.getTransactionWrappers();
	    if (this.wrapperInitData) {
	      this.wrapperInitData.length = 0;
	    } else {
	      this.wrapperInitData = [];
	    }
	    this._isInTransaction = false;
	  },
	
	  _isInTransaction: false,
	
	  /**
	   * @abstract
	   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
	   */
	  getTransactionWrappers: null,
	
	  isInTransaction: function () {
	    return !!this._isInTransaction;
	  },
	
	  /* eslint-disable space-before-function-paren */
	
	  /**
	   * Executes the function within a safety window. Use this for the top level
	   * methods that result in large amounts of computation/mutations that would
	   * need to be safety checked. The optional arguments helps prevent the need
	   * to bind in many cases.
	   *
	   * @param {function} method Member of scope to call.
	   * @param {Object} scope Scope to invoke from.
	   * @param {Object?=} a Argument to pass to the method.
	   * @param {Object?=} b Argument to pass to the method.
	   * @param {Object?=} c Argument to pass to the method.
	   * @param {Object?=} d Argument to pass to the method.
	   * @param {Object?=} e Argument to pass to the method.
	   * @param {Object?=} f Argument to pass to the method.
	   *
	   * @return {*} Return value from `method`.
	   */
	  perform: function (method, scope, a, b, c, d, e, f) {
	    /* eslint-enable space-before-function-paren */
	    !!this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction.') : _prodInvariant('27') : void 0;
	    var errorThrown;
	    var ret;
	    try {
	      this._isInTransaction = true;
	      // Catching errors makes debugging more difficult, so we start with
	      // errorThrown set to true before setting it to false after calling
	      // close -- if it's still set to true in the finally block, it means
	      // one of these calls threw.
	      errorThrown = true;
	      this.initializeAll(0);
	      ret = method.call(scope, a, b, c, d, e, f);
	      errorThrown = false;
	    } finally {
	      try {
	        if (errorThrown) {
	          // If `method` throws, prefer to show that stack trace over any thrown
	          // by invoking `closeAll`.
	          try {
	            this.closeAll(0);
	          } catch (err) {}
	        } else {
	          // Since `method` didn't throw, we don't want to silence the exception
	          // here.
	          this.closeAll(0);
	        }
	      } finally {
	        this._isInTransaction = false;
	      }
	    }
	    return ret;
	  },
	
	  initializeAll: function (startIndex) {
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      try {
	        // Catching errors makes debugging more difficult, so we start with the
	        // OBSERVED_ERROR state before overwriting it with the real return value
	        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
	        // block, it means wrapper.initialize threw.
	        this.wrapperInitData[i] = OBSERVED_ERROR;
	        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
	      } finally {
	        if (this.wrapperInitData[i] === OBSERVED_ERROR) {
	          // The initializer for wrapper i threw an error; initialize the
	          // remaining wrappers but silence any exceptions from them to ensure
	          // that the first error is the one to bubble up.
	          try {
	            this.initializeAll(i + 1);
	          } catch (err) {}
	        }
	      }
	    }
	  },
	
	  /**
	   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
	   * them the respective return values of `this.transactionWrappers.init[i]`
	   * (`close`rs that correspond to initializers that failed will not be
	   * invoked).
	   */
	  closeAll: function (startIndex) {
	    !this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : _prodInvariant('28') : void 0;
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      var initData = this.wrapperInitData[i];
	      var errorThrown;
	      try {
	        // Catching errors makes debugging more difficult, so we start with
	        // errorThrown set to true before setting it to false after calling
	        // close -- if it's still set to true in the finally block, it means
	        // wrapper.close threw.
	        errorThrown = true;
	        if (initData !== OBSERVED_ERROR && wrapper.close) {
	          wrapper.close.call(this, initData);
	        }
	        errorThrown = false;
	      } finally {
	        if (errorThrown) {
	          // The closer for wrapper i threw an error; close the remaining
	          // wrappers but silence any exceptions from them to ensure that the
	          // first error is the one to bubble up.
	          try {
	            this.closeAll(i + 1);
	          } catch (e) {}
	        }
	      }
	    }
	    this.wrapperInitData.length = 0;
	  }
	};
	
	module.exports = TransactionImpl;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactDOMComponentTree = __webpack_require__(39);
	
	function isCheckable(elem) {
	  var type = elem.type;
	  var nodeName = elem.nodeName;
	  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
	}
	
	function getTracker(inst) {
	  return inst._wrapperState.valueTracker;
	}
	
	function attachTracker(inst, tracker) {
	  inst._wrapperState.valueTracker = tracker;
	}
	
	function detachTracker(inst) {
	  delete inst._wrapperState.valueTracker;
	}
	
	function getValueFromNode(node) {
	  var value;
	  if (node) {
	    value = isCheckable(node) ? '' + node.checked : node.value;
	  }
	  return value;
	}
	
	var inputValueTracking = {
	  // exposed for testing
	  _getTrackerFromNode: function (node) {
	    return getTracker(ReactDOMComponentTree.getInstanceFromNode(node));
	  },
	
	
	  track: function (inst) {
	    if (getTracker(inst)) {
	      return;
	    }
	
	    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
	    var valueField = isCheckable(node) ? 'checked' : 'value';
	    var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
	
	    var currentValue = '' + node[valueField];
	
	    // if someone has already defined a value or Safari, then bail
	    // and don't track value will cause over reporting of changes,
	    // but it's better then a hard failure
	    // (needed for certain tests that spyOn input values and Safari)
	    if (node.hasOwnProperty(valueField) || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
	      return;
	    }
	
	    Object.defineProperty(node, valueField, {
	      enumerable: descriptor.enumerable,
	      configurable: true,
	      get: function () {
	        return descriptor.get.call(this);
	      },
	      set: function (value) {
	        currentValue = '' + value;
	        descriptor.set.call(this, value);
	      }
	    });
	
	    attachTracker(inst, {
	      getValue: function () {
	        return currentValue;
	      },
	      setValue: function (value) {
	        currentValue = '' + value;
	      },
	      stopTracking: function () {
	        detachTracker(inst);
	        delete node[valueField];
	      }
	    });
	  },
	
	  updateValueIfChanged: function (inst) {
	    if (!inst) {
	      return false;
	    }
	    var tracker = getTracker(inst);
	
	    if (!tracker) {
	      inputValueTracking.track(inst);
	      return true;
	    }
	
	    var lastValue = tracker.getValue();
	    var nextValue = getValueFromNode(ReactDOMComponentTree.getNodeFromInstance(inst));
	
	    if (nextValue !== lastValue) {
	      tracker.setValue(nextValue);
	      return true;
	    }
	
	    return false;
	  },
	  stopTracking: function (inst) {
	    var tracker = getTracker(inst);
	    if (tracker) {
	      tracker.stopTracking();
	    }
	  }
	};
	
	module.exports = inputValueTracking;

/***/ }),
/* 75 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Gets the target node from a native browser event by accounting for
	 * inconsistencies in browser DOM APIs.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {DOMEventTarget} Target node.
	 */
	
	function getEventTarget(nativeEvent) {
	  var target = nativeEvent.target || nativeEvent.srcElement || window;
	
	  // Normalize SVG <use> element events #4963
	  if (target.correspondingUseElement) {
	    target = target.correspondingUseElement;
	  }
	
	  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
	  // @see http://www.quirksmode.org/js/events_properties.html
	  return target.nodeType === 3 ? target.parentNode : target;
	}
	
	module.exports = getEventTarget;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(53);
	
	var useHasFeature;
	if (ExecutionEnvironment.canUseDOM) {
	  useHasFeature = document.implementation && document.implementation.hasFeature &&
	  // always returns true in newer browsers as per the standard.
	  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	  document.implementation.hasFeature('', '') !== true;
	}
	
	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
	    return false;
	  }
	
	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = eventName in document;
	
	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }
	
	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }
	
	  return isSupported;
	}
	
	module.exports = isEventSupported;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	/**
	 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
	 */
	
	var supportedInputTypes = {
	  color: true,
	  date: true,
	  datetime: true,
	  'datetime-local': true,
	  email: true,
	  month: true,
	  number: true,
	  password: true,
	  range: true,
	  search: true,
	  tel: true,
	  text: true,
	  time: true,
	  url: true,
	  week: true
	};
	
	function isTextInputElement(elem) {
	  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
	
	  if (nodeName === 'input') {
	    return !!supportedInputTypes[elem.type];
	  }
	
	  if (nodeName === 'textarea') {
	    return true;
	  }
	
	  return false;
	}
	
	module.exports = isTextInputElement;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Module that is injectable into `EventPluginHub`, that specifies a
	 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
	 * plugins, without having to package every one of them. This is better than
	 * having plugins be ordered in the same order that they are injected because
	 * that ordering would be influenced by the packaging order.
	 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
	 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
	 */
	
	var DefaultEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];
	
	module.exports = DefaultEventPluginOrder;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var EventPropagators = __webpack_require__(46);
	var ReactDOMComponentTree = __webpack_require__(39);
	var SyntheticMouseEvent = __webpack_require__(80);
	
	var eventTypes = {
	  mouseEnter: {
	    registrationName: 'onMouseEnter',
	    dependencies: ['topMouseOut', 'topMouseOver']
	  },
	  mouseLeave: {
	    registrationName: 'onMouseLeave',
	    dependencies: ['topMouseOut', 'topMouseOver']
	  }
	};
	
	var EnterLeaveEventPlugin = {
	  eventTypes: eventTypes,
	
	  /**
	   * For almost every interaction we care about, there will be both a top-level
	   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
	   * we do not extract duplicate events. However, moving the mouse into the
	   * browser from outside will not fire a `mouseout` event. In this case, we use
	   * the `mouseover` top-level event.
	   */
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    if (topLevelType === 'topMouseOver' && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
	      return null;
	    }
	    if (topLevelType !== 'topMouseOut' && topLevelType !== 'topMouseOver') {
	      // Must not be a mouse in or mouse out - ignoring.
	      return null;
	    }
	
	    var win;
	    if (nativeEventTarget.window === nativeEventTarget) {
	      // `nativeEventTarget` is probably a window object.
	      win = nativeEventTarget;
	    } else {
	      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	      var doc = nativeEventTarget.ownerDocument;
	      if (doc) {
	        win = doc.defaultView || doc.parentWindow;
	      } else {
	        win = window;
	      }
	    }
	
	    var from;
	    var to;
	    if (topLevelType === 'topMouseOut') {
	      from = targetInst;
	      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
	      to = related ? ReactDOMComponentTree.getClosestInstanceFromNode(related) : null;
	    } else {
	      // Moving to a node from outside the window.
	      from = null;
	      to = targetInst;
	    }
	
	    if (from === to) {
	      // Nothing pertains to our managed components.
	      return null;
	    }
	
	    var fromNode = from == null ? win : ReactDOMComponentTree.getNodeFromInstance(from);
	    var toNode = to == null ? win : ReactDOMComponentTree.getNodeFromInstance(to);
	
	    var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, from, nativeEvent, nativeEventTarget);
	    leave.type = 'mouseleave';
	    leave.target = fromNode;
	    leave.relatedTarget = toNode;
	
	    var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, to, nativeEvent, nativeEventTarget);
	    enter.type = 'mouseenter';
	    enter.target = toNode;
	    enter.relatedTarget = fromNode;
	
	    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, from, to);
	
	    return [leave, enter];
	  }
	};
	
	module.exports = EnterLeaveEventPlugin;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticUIEvent = __webpack_require__(81);
	var ViewportMetrics = __webpack_require__(82);
	
	var getEventModifierState = __webpack_require__(83);
	
	/**
	 * @interface MouseEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var MouseEventInterface = {
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  getModifierState: getEventModifierState,
	  button: function (event) {
	    // Webkit, Firefox, IE9+
	    // which:  1 2 3
	    // button: 0 1 2 (standard)
	    var button = event.button;
	    if ('which' in event) {
	      return button;
	    }
	    // IE<9
	    // which:  undefined
	    // button: 0 0 0
	    // button: 1 4 2 (onmouseup)
	    return button === 2 ? 2 : button === 4 ? 1 : 0;
	  },
	  buttons: null,
	  relatedTarget: function (event) {
	    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
	  },
	  // "Proprietary" Interface.
	  pageX: function (event) {
	    return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
	  },
	  pageY: function (event) {
	    return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
	
	module.exports = SyntheticMouseEvent;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticEvent = __webpack_require__(58);
	
	var getEventTarget = __webpack_require__(75);
	
	/**
	 * @interface UIEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var UIEventInterface = {
	  view: function (event) {
	    if (event.view) {
	      return event.view;
	    }
	
	    var target = getEventTarget(event);
	    if (target.window === target) {
	      // target is a window object
	      return target;
	    }
	
	    var doc = target.ownerDocument;
	    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	    if (doc) {
	      return doc.defaultView || doc.parentWindow;
	    } else {
	      return window;
	    }
	  },
	  detail: function (event) {
	    return event.detail || 0;
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */
	function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
	
	module.exports = SyntheticUIEvent;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ViewportMetrics = {
	  currentScrollLeft: 0,
	
	  currentScrollTop: 0,
	
	  refreshScrollValues: function (scrollPosition) {
	    ViewportMetrics.currentScrollLeft = scrollPosition.x;
	    ViewportMetrics.currentScrollTop = scrollPosition.y;
	  }
	};
	
	module.exports = ViewportMetrics;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Translation from modifier key to the associated property in the event.
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
	 */
	
	var modifierKeyToProp = {
	  Alt: 'altKey',
	  Control: 'ctrlKey',
	  Meta: 'metaKey',
	  Shift: 'shiftKey'
	};
	
	// IE8 does not implement getModifierState so we simply map it to the only
	// modifier keys exposed by the event itself, does not support Lock-keys.
	// Currently, all major browsers except Chrome seems to support Lock-keys.
	function modifierStateGetter(keyArg) {
	  var syntheticEvent = this;
	  var nativeEvent = syntheticEvent.nativeEvent;
	  if (nativeEvent.getModifierState) {
	    return nativeEvent.getModifierState(keyArg);
	  }
	  var keyProp = modifierKeyToProp[keyArg];
	  return keyProp ? !!nativeEvent[keyProp] : false;
	}
	
	function getEventModifierState(nativeEvent) {
	  return modifierStateGetter;
	}
	
	module.exports = getEventModifierState;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMProperty = __webpack_require__(41);
	
	var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
	var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
	var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
	var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
	var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
	
	var HTMLDOMPropertyConfig = {
	  isCustomAttribute: RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + DOMProperty.ATTRIBUTE_NAME_CHAR + ']*$')),
	  Properties: {
	    /**
	     * Standard Properties
	     */
	    accept: 0,
	    acceptCharset: 0,
	    accessKey: 0,
	    action: 0,
	    allowFullScreen: HAS_BOOLEAN_VALUE,
	    allowTransparency: 0,
	    alt: 0,
	    // specifies target context for links with `preload` type
	    as: 0,
	    async: HAS_BOOLEAN_VALUE,
	    autoComplete: 0,
	    // autoFocus is polyfilled/normalized by AutoFocusUtils
	    // autoFocus: HAS_BOOLEAN_VALUE,
	    autoPlay: HAS_BOOLEAN_VALUE,
	    capture: HAS_BOOLEAN_VALUE,
	    cellPadding: 0,
	    cellSpacing: 0,
	    charSet: 0,
	    challenge: 0,
	    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    cite: 0,
	    classID: 0,
	    className: 0,
	    cols: HAS_POSITIVE_NUMERIC_VALUE,
	    colSpan: 0,
	    content: 0,
	    contentEditable: 0,
	    contextMenu: 0,
	    controls: HAS_BOOLEAN_VALUE,
	    coords: 0,
	    crossOrigin: 0,
	    data: 0, // For `<object />` acts as `src`.
	    dateTime: 0,
	    'default': HAS_BOOLEAN_VALUE,
	    defer: HAS_BOOLEAN_VALUE,
	    dir: 0,
	    disabled: HAS_BOOLEAN_VALUE,
	    download: HAS_OVERLOADED_BOOLEAN_VALUE,
	    draggable: 0,
	    encType: 0,
	    form: 0,
	    formAction: 0,
	    formEncType: 0,
	    formMethod: 0,
	    formNoValidate: HAS_BOOLEAN_VALUE,
	    formTarget: 0,
	    frameBorder: 0,
	    headers: 0,
	    height: 0,
	    hidden: HAS_BOOLEAN_VALUE,
	    high: 0,
	    href: 0,
	    hrefLang: 0,
	    htmlFor: 0,
	    httpEquiv: 0,
	    icon: 0,
	    id: 0,
	    inputMode: 0,
	    integrity: 0,
	    is: 0,
	    keyParams: 0,
	    keyType: 0,
	    kind: 0,
	    label: 0,
	    lang: 0,
	    list: 0,
	    loop: HAS_BOOLEAN_VALUE,
	    low: 0,
	    manifest: 0,
	    marginHeight: 0,
	    marginWidth: 0,
	    max: 0,
	    maxLength: 0,
	    media: 0,
	    mediaGroup: 0,
	    method: 0,
	    min: 0,
	    minLength: 0,
	    // Caution; `option.selected` is not updated if `select.multiple` is
	    // disabled with `removeAttribute`.
	    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    name: 0,
	    nonce: 0,
	    noValidate: HAS_BOOLEAN_VALUE,
	    open: HAS_BOOLEAN_VALUE,
	    optimum: 0,
	    pattern: 0,
	    placeholder: 0,
	    playsInline: HAS_BOOLEAN_VALUE,
	    poster: 0,
	    preload: 0,
	    profile: 0,
	    radioGroup: 0,
	    readOnly: HAS_BOOLEAN_VALUE,
	    referrerPolicy: 0,
	    rel: 0,
	    required: HAS_BOOLEAN_VALUE,
	    reversed: HAS_BOOLEAN_VALUE,
	    role: 0,
	    rows: HAS_POSITIVE_NUMERIC_VALUE,
	    rowSpan: HAS_NUMERIC_VALUE,
	    sandbox: 0,
	    scope: 0,
	    scoped: HAS_BOOLEAN_VALUE,
	    scrolling: 0,
	    seamless: HAS_BOOLEAN_VALUE,
	    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    shape: 0,
	    size: HAS_POSITIVE_NUMERIC_VALUE,
	    sizes: 0,
	    span: HAS_POSITIVE_NUMERIC_VALUE,
	    spellCheck: 0,
	    src: 0,
	    srcDoc: 0,
	    srcLang: 0,
	    srcSet: 0,
	    start: HAS_NUMERIC_VALUE,
	    step: 0,
	    style: 0,
	    summary: 0,
	    tabIndex: 0,
	    target: 0,
	    title: 0,
	    // Setting .type throws on non-<input> tags
	    type: 0,
	    useMap: 0,
	    value: 0,
	    width: 0,
	    wmode: 0,
	    wrap: 0,
	
	    /**
	     * RDFa Properties
	     */
	    about: 0,
	    datatype: 0,
	    inlist: 0,
	    prefix: 0,
	    // property is also supported for OpenGraph in meta tags.
	    property: 0,
	    resource: 0,
	    'typeof': 0,
	    vocab: 0,
	
	    /**
	     * Non-standard Properties
	     */
	    // autoCapitalize and autoCorrect are supported in Mobile Safari for
	    // keyboard hints.
	    autoCapitalize: 0,
	    autoCorrect: 0,
	    // autoSave allows WebKit/Blink to persist values of input fields on page reloads
	    autoSave: 0,
	    // color is for Safari mask-icon link
	    color: 0,
	    // itemProp, itemScope, itemType are for
	    // Microdata support. See http://schema.org/docs/gs.html
	    itemProp: 0,
	    itemScope: HAS_BOOLEAN_VALUE,
	    itemType: 0,
	    // itemID and itemRef are for Microdata support as well but
	    // only specified in the WHATWG spec document. See
	    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	    itemID: 0,
	    itemRef: 0,
	    // results show looking glass icon and recent searches on input
	    // search fields in WebKit/Blink
	    results: 0,
	    // IE-only attribute that specifies security restrictions on an iframe
	    // as an alternative to the sandbox attribute on IE<10
	    security: 0,
	    // IE-only attribute that controls focus behavior
	    unselectable: 0
	  },
	  DOMAttributeNames: {
	    acceptCharset: 'accept-charset',
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv'
	  },
	  DOMPropertyNames: {},
	  DOMMutationMethods: {
	    value: function (node, value) {
	      if (value == null) {
	        return node.removeAttribute('value');
	      }
	
	      // Number inputs get special treatment due to some edge cases in
	      // Chrome. Let everything else assign the value attribute as normal.
	      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
	      if (node.type !== 'number' || node.hasAttribute('value') === false) {
	        node.setAttribute('value', '' + value);
	      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
	        // Don't assign an attribute if validation reports bad
	        // input. Chrome will clear the value. Additionally, don't
	        // operate on inputs that have focus, otherwise Chrome might
	        // strip off trailing decimal places and cause the user's
	        // cursor position to jump to the beginning of the input.
	        //
	        // In ReactDOMInput, we have an onBlur event that will trigger
	        // this function again when focus is lost.
	        node.setAttribute('value', '' + value);
	      }
	    }
	  }
	};
	
	module.exports = HTMLDOMPropertyConfig;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMChildrenOperations = __webpack_require__(86);
	var ReactDOMIDOperations = __webpack_require__(97);
	
	/**
	 * Abstracts away all functionality of the reconciler that requires knowledge of
	 * the browser context. TODO: These callers should be refactored to avoid the
	 * need for this injection.
	 */
	var ReactComponentBrowserEnvironment = {
	  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
	
	  replaceNodeWithMarkup: DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup
	};
	
	module.exports = ReactComponentBrowserEnvironment;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMLazyTree = __webpack_require__(87);
	var Danger = __webpack_require__(93);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactInstrumentation = __webpack_require__(67);
	
	var createMicrosoftUnsafeLocalFunction = __webpack_require__(90);
	var setInnerHTML = __webpack_require__(89);
	var setTextContent = __webpack_require__(91);
	
	function getNodeAfter(parentNode, node) {
	  // Special case for text components, which return [open, close] comments
	  // from getHostNode.
	  if (Array.isArray(node)) {
	    node = node[1];
	  }
	  return node ? node.nextSibling : parentNode.firstChild;
	}
	
	/**
	 * Inserts `childNode` as a child of `parentNode` at the `index`.
	 *
	 * @param {DOMElement} parentNode Parent node in which to insert.
	 * @param {DOMElement} childNode Child node to insert.
	 * @param {number} index Index at which to insert the child.
	 * @internal
	 */
	var insertChildAt = createMicrosoftUnsafeLocalFunction(function (parentNode, childNode, referenceNode) {
	  // We rely exclusively on `insertBefore(node, null)` instead of also using
	  // `appendChild(node)`. (Using `undefined` is not allowed by all browsers so
	  // we are careful to use `null`.)
	  parentNode.insertBefore(childNode, referenceNode);
	});
	
	function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
	  DOMLazyTree.insertTreeBefore(parentNode, childTree, referenceNode);
	}
	
	function moveChild(parentNode, childNode, referenceNode) {
	  if (Array.isArray(childNode)) {
	    moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
	  } else {
	    insertChildAt(parentNode, childNode, referenceNode);
	  }
	}
	
	function removeChild(parentNode, childNode) {
	  if (Array.isArray(childNode)) {
	    var closingComment = childNode[1];
	    childNode = childNode[0];
	    removeDelimitedText(parentNode, childNode, closingComment);
	    parentNode.removeChild(closingComment);
	  }
	  parentNode.removeChild(childNode);
	}
	
	function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
	  var node = openingComment;
	  while (true) {
	    var nextNode = node.nextSibling;
	    insertChildAt(parentNode, node, referenceNode);
	    if (node === closingComment) {
	      break;
	    }
	    node = nextNode;
	  }
	}
	
	function removeDelimitedText(parentNode, startNode, closingComment) {
	  while (true) {
	    var node = startNode.nextSibling;
	    if (node === closingComment) {
	      // The closing comment is removed by ReactMultiChild.
	      break;
	    } else {
	      parentNode.removeChild(node);
	    }
	  }
	}
	
	function replaceDelimitedText(openingComment, closingComment, stringText) {
	  var parentNode = openingComment.parentNode;
	  var nodeAfterComment = openingComment.nextSibling;
	  if (nodeAfterComment === closingComment) {
	    // There are no text nodes between the opening and closing comments; insert
	    // a new one if stringText isn't empty.
	    if (stringText) {
	      insertChildAt(parentNode, document.createTextNode(stringText), nodeAfterComment);
	    }
	  } else {
	    if (stringText) {
	      // Set the text content of the first node after the opening comment, and
	      // remove all following nodes up until the closing comment.
	      setTextContent(nodeAfterComment, stringText);
	      removeDelimitedText(parentNode, nodeAfterComment, closingComment);
	    } else {
	      removeDelimitedText(parentNode, openingComment, closingComment);
	    }
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onHostOperation({
	      instanceID: ReactDOMComponentTree.getInstanceFromNode(openingComment)._debugID,
	      type: 'replace text',
	      payload: stringText
	    });
	  }
	}
	
	var dangerouslyReplaceNodeWithMarkup = Danger.dangerouslyReplaceNodeWithMarkup;
	if (process.env.NODE_ENV !== 'production') {
	  dangerouslyReplaceNodeWithMarkup = function (oldChild, markup, prevInstance) {
	    Danger.dangerouslyReplaceNodeWithMarkup(oldChild, markup);
	    if (prevInstance._debugID !== 0) {
	      ReactInstrumentation.debugTool.onHostOperation({
	        instanceID: prevInstance._debugID,
	        type: 'replace with',
	        payload: markup.toString()
	      });
	    } else {
	      var nextInstance = ReactDOMComponentTree.getInstanceFromNode(markup.node);
	      if (nextInstance._debugID !== 0) {
	        ReactInstrumentation.debugTool.onHostOperation({
	          instanceID: nextInstance._debugID,
	          type: 'mount',
	          payload: markup.toString()
	        });
	      }
	    }
	  };
	}
	
	/**
	 * Operations for updating with DOM children.
	 */
	var DOMChildrenOperations = {
	  dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup,
	
	  replaceDelimitedText: replaceDelimitedText,
	
	  /**
	   * Updates a component's children by processing a series of updates. The
	   * update configurations are each expected to have a `parentNode` property.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @internal
	   */
	  processUpdates: function (parentNode, updates) {
	    if (process.env.NODE_ENV !== 'production') {
	      var parentNodeDebugID = ReactDOMComponentTree.getInstanceFromNode(parentNode)._debugID;
	    }
	
	    for (var k = 0; k < updates.length; k++) {
	      var update = updates[k];
	      switch (update.type) {
	        case 'INSERT_MARKUP':
	          insertLazyTreeChildAt(parentNode, update.content, getNodeAfter(parentNode, update.afterNode));
	          if (process.env.NODE_ENV !== 'production') {
	            ReactInstrumentation.debugTool.onHostOperation({
	              instanceID: parentNodeDebugID,
	              type: 'insert child',
	              payload: {
	                toIndex: update.toIndex,
	                content: update.content.toString()
	              }
	            });
	          }
	          break;
	        case 'MOVE_EXISTING':
	          moveChild(parentNode, update.fromNode, getNodeAfter(parentNode, update.afterNode));
	          if (process.env.NODE_ENV !== 'production') {
	            ReactInstrumentation.debugTool.onHostOperation({
	              instanceID: parentNodeDebugID,
	              type: 'move child',
	              payload: { fromIndex: update.fromIndex, toIndex: update.toIndex }
	            });
	          }
	          break;
	        case 'SET_MARKUP':
	          setInnerHTML(parentNode, update.content);
	          if (process.env.NODE_ENV !== 'production') {
	            ReactInstrumentation.debugTool.onHostOperation({
	              instanceID: parentNodeDebugID,
	              type: 'replace children',
	              payload: update.content.toString()
	            });
	          }
	          break;
	        case 'TEXT_CONTENT':
	          setTextContent(parentNode, update.content);
	          if (process.env.NODE_ENV !== 'production') {
	            ReactInstrumentation.debugTool.onHostOperation({
	              instanceID: parentNodeDebugID,
	              type: 'replace text',
	              payload: update.content.toString()
	            });
	          }
	          break;
	        case 'REMOVE_NODE':
	          removeChild(parentNode, update.fromNode);
	          if (process.env.NODE_ENV !== 'production') {
	            ReactInstrumentation.debugTool.onHostOperation({
	              instanceID: parentNodeDebugID,
	              type: 'remove child',
	              payload: { fromIndex: update.fromIndex }
	            });
	          }
	          break;
	      }
	    }
	  }
	};
	
	module.exports = DOMChildrenOperations;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMNamespaces = __webpack_require__(88);
	var setInnerHTML = __webpack_require__(89);
	
	var createMicrosoftUnsafeLocalFunction = __webpack_require__(90);
	var setTextContent = __webpack_require__(91);
	
	var ELEMENT_NODE_TYPE = 1;
	var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
	
	/**
	 * In IE (8-11) and Edge, appending nodes with no children is dramatically
	 * faster than appending a full subtree, so we essentially queue up the
	 * .appendChild calls here and apply them so each node is added to its parent
	 * before any children are added.
	 *
	 * In other browsers, doing so is slower or neutral compared to the other order
	 * (in Firefox, twice as slow) so we only do this inversion in IE.
	 *
	 * See https://github.com/spicyj/innerhtml-vs-createelement-vs-clonenode.
	 */
	var enableLazy = typeof document !== 'undefined' && typeof document.documentMode === 'number' || typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && /\bEdge\/\d/.test(navigator.userAgent);
	
	function insertTreeChildren(tree) {
	  if (!enableLazy) {
	    return;
	  }
	  var node = tree.node;
	  var children = tree.children;
	  if (children.length) {
	    for (var i = 0; i < children.length; i++) {
	      insertTreeBefore(node, children[i], null);
	    }
	  } else if (tree.html != null) {
	    setInnerHTML(node, tree.html);
	  } else if (tree.text != null) {
	    setTextContent(node, tree.text);
	  }
	}
	
	var insertTreeBefore = createMicrosoftUnsafeLocalFunction(function (parentNode, tree, referenceNode) {
	  // DocumentFragments aren't actually part of the DOM after insertion so
	  // appending children won't update the DOM. We need to ensure the fragment
	  // is properly populated first, breaking out of our lazy approach for just
	  // this level. Also, some <object> plugins (like Flash Player) will read
	  // <param> nodes immediately upon insertion into the DOM, so <object>
	  // must also be populated prior to insertion into the DOM.
	  if (tree.node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE || tree.node.nodeType === ELEMENT_NODE_TYPE && tree.node.nodeName.toLowerCase() === 'object' && (tree.node.namespaceURI == null || tree.node.namespaceURI === DOMNamespaces.html)) {
	    insertTreeChildren(tree);
	    parentNode.insertBefore(tree.node, referenceNode);
	  } else {
	    parentNode.insertBefore(tree.node, referenceNode);
	    insertTreeChildren(tree);
	  }
	});
	
	function replaceChildWithTree(oldNode, newTree) {
	  oldNode.parentNode.replaceChild(newTree.node, oldNode);
	  insertTreeChildren(newTree);
	}
	
	function queueChild(parentTree, childTree) {
	  if (enableLazy) {
	    parentTree.children.push(childTree);
	  } else {
	    parentTree.node.appendChild(childTree.node);
	  }
	}
	
	function queueHTML(tree, html) {
	  if (enableLazy) {
	    tree.html = html;
	  } else {
	    setInnerHTML(tree.node, html);
	  }
	}
	
	function queueText(tree, text) {
	  if (enableLazy) {
	    tree.text = text;
	  } else {
	    setTextContent(tree.node, text);
	  }
	}
	
	function toString() {
	  return this.node.nodeName;
	}
	
	function DOMLazyTree(node) {
	  return {
	    node: node,
	    children: [],
	    html: null,
	    text: null,
	    toString: toString
	  };
	}
	
	DOMLazyTree.insertTreeBefore = insertTreeBefore;
	DOMLazyTree.replaceChildWithTree = replaceChildWithTree;
	DOMLazyTree.queueChild = queueChild;
	DOMLazyTree.queueHTML = queueHTML;
	DOMLazyTree.queueText = queueText;
	
	module.exports = DOMLazyTree;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMNamespaces = {
	  html: 'http://www.w3.org/1999/xhtml',
	  mathml: 'http://www.w3.org/1998/Math/MathML',
	  svg: 'http://www.w3.org/2000/svg'
	};
	
	module.exports = DOMNamespaces;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(53);
	var DOMNamespaces = __webpack_require__(88);
	
	var WHITESPACE_TEST = /^[ \r\n\t\f]/;
	var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
	
	var createMicrosoftUnsafeLocalFunction = __webpack_require__(90);
	
	// SVG temp container for IE lacking innerHTML
	var reusableSVGContainer;
	
	/**
	 * Set the innerHTML property of a node, ensuring that whitespace is preserved
	 * even in IE8.
	 *
	 * @param {DOMElement} node
	 * @param {string} html
	 * @internal
	 */
	var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
	  // IE does not have innerHTML for SVG nodes, so instead we inject the
	  // new markup in a temp node and then move the child nodes across into
	  // the target node
	  if (node.namespaceURI === DOMNamespaces.svg && !('innerHTML' in node)) {
	    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
	    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
	    var svgNode = reusableSVGContainer.firstChild;
	    while (svgNode.firstChild) {
	      node.appendChild(svgNode.firstChild);
	    }
	  } else {
	    node.innerHTML = html;
	  }
	});
	
	if (ExecutionEnvironment.canUseDOM) {
	  // IE8: When updating a just created node with innerHTML only leading
	  // whitespace is removed. When updating an existing node with innerHTML
	  // whitespace in root TextNodes is also collapsed.
	  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html
	
	  // Feature detection; only IE8 is known to behave improperly like this.
	  var testElement = document.createElement('div');
	  testElement.innerHTML = ' ';
	  if (testElement.innerHTML === '') {
	    setInnerHTML = function (node, html) {
	      // Magic theory: IE8 supposedly differentiates between added and updated
	      // nodes when processing innerHTML, innerHTML on updated nodes suffers
	      // from worse whitespace behavior. Re-adding a node like this triggers
	      // the initial and more favorable whitespace behavior.
	      // TODO: What to do on a detached node?
	      if (node.parentNode) {
	        node.parentNode.replaceChild(node, node);
	      }
	
	      // We also implement a workaround for non-visible tags disappearing into
	      // thin air on IE8, this only happens if there is no visible text
	      // in-front of the non-visible tags. Piggyback on the whitespace fix
	      // and simply check if any non-visible tags appear in the source.
	      if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
	        // Recover leading whitespace by temporarily prepending any character.
	        // \uFEFF has the potential advantage of being zero-width/invisible.
	        // UglifyJS drops U+FEFF chars when parsing, so use String.fromCharCode
	        // in hopes that this is preserved even if "\uFEFF" is transformed to
	        // the actual Unicode character (by Babel, for example).
	        // https://github.com/mishoo/UglifyJS2/blob/v2.4.20/lib/parse.js#L216
	        node.innerHTML = String.fromCharCode(0xfeff) + html;
	
	        // deleteData leaves an empty `TextNode` which offsets the index of all
	        // children. Definitely want to avoid this.
	        var textNode = node.firstChild;
	        if (textNode.data.length === 1) {
	          node.removeChild(textNode);
	        } else {
	          textNode.deleteData(0, 1);
	        }
	      } else {
	        node.innerHTML = html;
	      }
	    };
	  }
	  testElement = null;
	}
	
	module.exports = setInnerHTML;

/***/ }),
/* 90 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	/* globals MSApp */
	
	'use strict';
	
	/**
	 * Create a function which has 'unsafe' privileges (required by windows8 apps)
	 */
	
	var createMicrosoftUnsafeLocalFunction = function (func) {
	  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
	    return function (arg0, arg1, arg2, arg3) {
	      MSApp.execUnsafeLocalFunction(function () {
	        return func(arg0, arg1, arg2, arg3);
	      });
	    };
	  } else {
	    return func;
	  }
	};
	
	module.exports = createMicrosoftUnsafeLocalFunction;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(53);
	var escapeTextContentForBrowser = __webpack_require__(92);
	var setInnerHTML = __webpack_require__(89);
	
	/**
	 * Set the textContent property of a node, ensuring that whitespace is preserved
	 * even in IE8. innerText is a poor substitute for textContent and, among many
	 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
	 * as it should.
	 *
	 * @param {DOMElement} node
	 * @param {string} text
	 * @internal
	 */
	var setTextContent = function (node, text) {
	  if (text) {
	    var firstChild = node.firstChild;
	
	    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
	      firstChild.nodeValue = text;
	      return;
	    }
	  }
	  node.textContent = text;
	};
	
	if (ExecutionEnvironment.canUseDOM) {
	  if (!('textContent' in document.documentElement)) {
	    setTextContent = function (node, text) {
	      if (node.nodeType === 3) {
	        node.nodeValue = text;
	        return;
	      }
	      setInnerHTML(node, escapeTextContentForBrowser(text));
	    };
	  }
	}
	
	module.exports = setTextContent;

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Based on the escape-html library, which is used under the MIT License below:
	 *
	 * Copyright (c) 2012-2013 TJ Holowaychuk
	 * Copyright (c) 2015 Andreas Lubbe
	 * Copyright (c) 2015 Tiancheng "Timothy" Gu
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * 'Software'), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 *
	 */
	
	'use strict';
	
	// code copied and modified from escape-html
	/**
	 * Module variables.
	 * @private
	 */
	
	var matchHtmlRegExp = /["'&<>]/;
	
	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */
	
	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);
	
	  if (!match) {
	    return str;
	  }
	
	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;
	
	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34:
	        // "
	        escape = '&quot;';
	        break;
	      case 38:
	        // &
	        escape = '&amp;';
	        break;
	      case 39:
	        // '
	        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
	        break;
	      case 60:
	        // <
	        escape = '&lt;';
	        break;
	      case 62:
	        // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }
	
	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }
	
	    lastIndex = index + 1;
	    html += escape;
	  }
	
	  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
	}
	// end code copied and modified from escape-html
	
	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextContentForBrowser(text) {
	  if (typeof text === 'boolean' || typeof text === 'number') {
	    // this shortcircuit helps perf for types that we know will never have
	    // special characters, especially given that this function is used often
	    // for numeric dom ids.
	    return '' + text;
	  }
	  return escapeHtml(text);
	}
	
	module.exports = escapeTextContentForBrowser;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var DOMLazyTree = __webpack_require__(87);
	var ExecutionEnvironment = __webpack_require__(53);
	
	var createNodesFromMarkup = __webpack_require__(94);
	var emptyFunction = __webpack_require__(9);
	var invariant = __webpack_require__(12);
	
	var Danger = {
	  /**
	   * Replaces a node with a string of markup at its current position within its
	   * parent. The markup must render into a single root node.
	   *
	   * @param {DOMElement} oldChild Child node to replace.
	   * @param {string} markup Markup to render in place of the child node.
	   * @internal
	   */
	  dangerouslyReplaceNodeWithMarkup: function (oldChild, markup) {
	    !ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use ReactDOMServer.renderToString() for server rendering.') : _prodInvariant('56') : void 0;
	    !markup ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : _prodInvariant('57') : void 0;
	    !(oldChild.nodeName !== 'HTML') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the <html> node. This is because browser quirks make this unreliable and/or slow. If you want to render to the root you must use server rendering. See ReactDOMServer.renderToString().') : _prodInvariant('58') : void 0;
	
	    if (typeof markup === 'string') {
	      var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
	      oldChild.parentNode.replaceChild(newChild, oldChild);
	    } else {
	      DOMLazyTree.replaceChildWithTree(oldChild, markup);
	    }
	  }
	};
	
	module.exports = Danger;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	/*eslint-disable fb-www/unsafe-html*/
	
	var ExecutionEnvironment = __webpack_require__(53);
	
	var createArrayFromMixed = __webpack_require__(95);
	var getMarkupWrap = __webpack_require__(96);
	var invariant = __webpack_require__(12);
	
	/**
	 * Dummy container used to render all markup.
	 */
	var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
	
	/**
	 * Pattern used by `getNodeName`.
	 */
	var nodeNamePattern = /^\s*<(\w+)/;
	
	/**
	 * Extracts the `nodeName` of the first element in a string of markup.
	 *
	 * @param {string} markup String of markup.
	 * @return {?string} Node name of the supplied markup.
	 */
	function getNodeName(markup) {
	  var nodeNameMatch = markup.match(nodeNamePattern);
	  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
	}
	
	/**
	 * Creates an array containing the nodes rendered from the supplied markup. The
	 * optionally supplied `handleScript` function will be invoked once for each
	 * <script> element that is rendered. If no `handleScript` function is supplied,
	 * an exception is thrown if any <script> elements are rendered.
	 *
	 * @param {string} markup A string of valid HTML markup.
	 * @param {?function} handleScript Invoked once for each rendered <script>.
	 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
	 */
	function createNodesFromMarkup(markup, handleScript) {
	  var node = dummyNode;
	  !!!dummyNode ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : void 0;
	  var nodeName = getNodeName(markup);
	
	  var wrap = nodeName && getMarkupWrap(nodeName);
	  if (wrap) {
	    node.innerHTML = wrap[1] + markup + wrap[2];
	
	    var wrapDepth = wrap[0];
	    while (wrapDepth--) {
	      node = node.lastChild;
	    }
	  } else {
	    node.innerHTML = markup;
	  }
	
	  var scripts = node.getElementsByTagName('script');
	  if (scripts.length) {
	    !handleScript ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(false) : void 0;
	    createArrayFromMixed(scripts).forEach(handleScript);
	  }
	
	  var nodes = Array.from(node.childNodes);
	  while (node.lastChild) {
	    node.removeChild(node.lastChild);
	  }
	  return nodes;
	}
	
	module.exports = createNodesFromMarkup;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Convert array-like objects to arrays.
	 *
	 * This API assumes the caller knows the contents of the data type. For less
	 * well defined inputs use createArrayFromMixed.
	 *
	 * @param {object|function|filelist} obj
	 * @return {array}
	 */
	function toArray(obj) {
	  var length = obj.length;
	
	  // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
	  // in old versions of Safari).
	  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : void 0;
	
	  !(typeof length === 'number') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : void 0;
	
	  !(length === 0 || length - 1 in obj) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : void 0;
	
	  !(typeof obj.callee !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'toArray: Object can\'t be `arguments`. Use rest params ' + '(function(...args) {}) or Array.from() instead.') : invariant(false) : void 0;
	
	  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
	  // without method will throw during the slice call and skip straight to the
	  // fallback.
	  if (obj.hasOwnProperty) {
	    try {
	      return Array.prototype.slice.call(obj);
	    } catch (e) {
	      // IE < 9 does not support Array#slice on collections objects
	    }
	  }
	
	  // Fall back to copying key by key. This assumes all keys have a value,
	  // so will not preserve sparsely populated inputs.
	  var ret = Array(length);
	  for (var ii = 0; ii < length; ii++) {
	    ret[ii] = obj[ii];
	  }
	  return ret;
	}
	
	/**
	 * Perform a heuristic test to determine if an object is "array-like".
	 *
	 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
	 *   Joshu replied: "Mu."
	 *
	 * This function determines if its argument has "array nature": it returns
	 * true if the argument is an actual array, an `arguments' object, or an
	 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
	 *
	 * It will return false for other array-like objects like Filelist.
	 *
	 * @param {*} obj
	 * @return {boolean}
	 */
	function hasArrayNature(obj) {
	  return (
	    // not null/false
	    !!obj && (
	    // arrays are objects, NodeLists are functions in Safari
	    typeof obj == 'object' || typeof obj == 'function') &&
	    // quacks like an array
	    'length' in obj &&
	    // not window
	    !('setInterval' in obj) &&
	    // no DOM node should be considered an array-like
	    // a 'select' element has 'length' and 'item' properties on IE8
	    typeof obj.nodeType != 'number' && (
	    // a real array
	    Array.isArray(obj) ||
	    // arguments
	    'callee' in obj ||
	    // HTMLCollection/NodeList
	    'item' in obj)
	  );
	}
	
	/**
	 * Ensure that the argument is an array by wrapping it in an array if it is not.
	 * Creates a copy of the argument if it is already an array.
	 *
	 * This is mostly useful idiomatically:
	 *
	 *   var createArrayFromMixed = require('createArrayFromMixed');
	 *
	 *   function takesOneOrMoreThings(things) {
	 *     things = createArrayFromMixed(things);
	 *     ...
	 *   }
	 *
	 * This allows you to treat `things' as an array, but accept scalars in the API.
	 *
	 * If you need to convert an array-like object, like `arguments`, into an array
	 * use toArray instead.
	 *
	 * @param {*} obj
	 * @return {array}
	 */
	function createArrayFromMixed(obj) {
	  if (!hasArrayNature(obj)) {
	    return [obj];
	  } else if (Array.isArray(obj)) {
	    return obj.slice();
	  } else {
	    return toArray(obj);
	  }
	}
	
	module.exports = createArrayFromMixed;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	/*eslint-disable fb-www/unsafe-html */
	
	var ExecutionEnvironment = __webpack_require__(53);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Dummy container used to detect which wraps are necessary.
	 */
	var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
	
	/**
	 * Some browsers cannot use `innerHTML` to render certain elements standalone,
	 * so we wrap them, render the wrapped nodes, then extract the desired node.
	 *
	 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
	 */
	
	var shouldWrap = {};
	
	var selectWrap = [1, '<select multiple="true">', '</select>'];
	var tableWrap = [1, '<table>', '</table>'];
	var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];
	
	var markupWrap = {
	  '*': [1, '?<div>', '</div>'],
	
	  'area': [1, '<map>', '</map>'],
	  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  'legend': [1, '<fieldset>', '</fieldset>'],
	  'param': [1, '<object>', '</object>'],
	  'tr': [2, '<table><tbody>', '</tbody></table>'],
	
	  'optgroup': selectWrap,
	  'option': selectWrap,
	
	  'caption': tableWrap,
	  'colgroup': tableWrap,
	  'tbody': tableWrap,
	  'tfoot': tableWrap,
	  'thead': tableWrap,
	
	  'td': trWrap,
	  'th': trWrap
	};
	
	// Initialize the SVG elements since we know they'll always need to be wrapped
	// consistently. If they are created inside a <div> they will be initialized in
	// the wrong namespace (and will not display).
	var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
	svgElements.forEach(function (nodeName) {
	  markupWrap[nodeName] = svgWrap;
	  shouldWrap[nodeName] = true;
	});
	
	/**
	 * Gets the markup wrap configuration for the supplied `nodeName`.
	 *
	 * NOTE: This lazily detects which wraps are necessary for the current browser.
	 *
	 * @param {string} nodeName Lowercase `nodeName`.
	 * @return {?array} Markup wrap configuration, if applicable.
	 */
	function getMarkupWrap(nodeName) {
	  !!!dummyNode ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : void 0;
	  if (!markupWrap.hasOwnProperty(nodeName)) {
	    nodeName = '*';
	  }
	  if (!shouldWrap.hasOwnProperty(nodeName)) {
	    if (nodeName === '*') {
	      dummyNode.innerHTML = '<link />';
	    } else {
	      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
	    }
	    shouldWrap[nodeName] = !dummyNode.firstChild;
	  }
	  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
	}
	
	module.exports = getMarkupWrap;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMChildrenOperations = __webpack_require__(86);
	var ReactDOMComponentTree = __webpack_require__(39);
	
	/**
	 * Operations used to process updates to DOM nodes.
	 */
	var ReactDOMIDOperations = {
	  /**
	   * Updates a component's children by processing a series of updates.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @internal
	   */
	  dangerouslyProcessChildrenUpdates: function (parentInst, updates) {
	    var node = ReactDOMComponentTree.getNodeFromInstance(parentInst);
	    DOMChildrenOperations.processUpdates(node, updates);
	  }
	};
	
	module.exports = ReactDOMIDOperations;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	/* global hasOwnProperty:true */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40),
	    _assign = __webpack_require__(4);
	
	var AutoFocusUtils = __webpack_require__(99);
	var CSSPropertyOperations = __webpack_require__(101);
	var DOMLazyTree = __webpack_require__(87);
	var DOMNamespaces = __webpack_require__(88);
	var DOMProperty = __webpack_require__(41);
	var DOMPropertyOperations = __webpack_require__(109);
	var EventPluginHub = __webpack_require__(47);
	var EventPluginRegistry = __webpack_require__(48);
	var ReactBrowserEventEmitter = __webpack_require__(111);
	var ReactDOMComponentFlags = __webpack_require__(42);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactDOMInput = __webpack_require__(114);
	var ReactDOMOption = __webpack_require__(117);
	var ReactDOMSelect = __webpack_require__(118);
	var ReactDOMTextarea = __webpack_require__(119);
	var ReactInstrumentation = __webpack_require__(67);
	var ReactMultiChild = __webpack_require__(120);
	var ReactServerRenderingTransaction = __webpack_require__(139);
	
	var emptyFunction = __webpack_require__(9);
	var escapeTextContentForBrowser = __webpack_require__(92);
	var invariant = __webpack_require__(12);
	var isEventSupported = __webpack_require__(76);
	var shallowEqual = __webpack_require__(129);
	var inputValueTracking = __webpack_require__(74);
	var validateDOMNesting = __webpack_require__(142);
	var warning = __webpack_require__(8);
	
	var Flags = ReactDOMComponentFlags;
	var deleteListener = EventPluginHub.deleteListener;
	var getNode = ReactDOMComponentTree.getNodeFromInstance;
	var listenTo = ReactBrowserEventEmitter.listenTo;
	var registrationNameModules = EventPluginRegistry.registrationNameModules;
	
	// For quickly matching children type, to test if can be treated as content.
	var CONTENT_TYPES = { string: true, number: true };
	
	var STYLE = 'style';
	var HTML = '__html';
	var RESERVED_PROPS = {
	  children: null,
	  dangerouslySetInnerHTML: null,
	  suppressContentEditableWarning: null
	};
	
	// Node type for document fragments (Node.DOCUMENT_FRAGMENT_NODE).
	var DOC_FRAGMENT_TYPE = 11;
	
	function getDeclarationErrorAddendum(internalInstance) {
	  if (internalInstance) {
	    var owner = internalInstance._currentElement._owner || null;
	    if (owner) {
	      var name = owner.getName();
	      if (name) {
	        return ' This DOM node was rendered by `' + name + '`.';
	      }
	    }
	  }
	  return '';
	}
	
	function friendlyStringify(obj) {
	  if (typeof obj === 'object') {
	    if (Array.isArray(obj)) {
	      return '[' + obj.map(friendlyStringify).join(', ') + ']';
	    } else {
	      var pairs = [];
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) {
	          var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
	          pairs.push(keyEscaped + ': ' + friendlyStringify(obj[key]));
	        }
	      }
	      return '{' + pairs.join(', ') + '}';
	    }
	  } else if (typeof obj === 'string') {
	    return JSON.stringify(obj);
	  } else if (typeof obj === 'function') {
	    return '[function object]';
	  }
	  // Differs from JSON.stringify in that undefined because undefined and that
	  // inf and nan don't become null
	  return String(obj);
	}
	
	var styleMutationWarning = {};
	
	function checkAndWarnForMutatedStyle(style1, style2, component) {
	  if (style1 == null || style2 == null) {
	    return;
	  }
	  if (shallowEqual(style1, style2)) {
	    return;
	  }
	
	  var componentName = component._tag;
	  var owner = component._currentElement._owner;
	  var ownerName;
	  if (owner) {
	    ownerName = owner.getName();
	  }
	
	  var hash = ownerName + '|' + componentName;
	
	  if (styleMutationWarning.hasOwnProperty(hash)) {
	    return;
	  }
	
	  styleMutationWarning[hash] = true;
	
	  process.env.NODE_ENV !== 'production' ? warning(false, '`%s` was passed a style object that has previously been mutated. ' + 'Mutating `style` is deprecated. Consider cloning it beforehand. Check ' + 'the `render` %s. Previous style: %s. Mutated style: %s.', componentName, owner ? 'of `' + ownerName + '`' : 'using <' + componentName + '>', friendlyStringify(style1), friendlyStringify(style2)) : void 0;
	}
	
	/**
	 * @param {object} component
	 * @param {?object} props
	 */
	function assertValidProps(component, props) {
	  if (!props) {
	    return;
	  }
	  // Note the use of `==` which checks for null or undefined.
	  if (voidElementTags[component._tag]) {
	    !(props.children == null && props.dangerouslySetInnerHTML == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : _prodInvariant('137', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : void 0;
	  }
	  if (props.dangerouslySetInnerHTML != null) {
	    !(props.children == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : _prodInvariant('60') : void 0;
	    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : _prodInvariant('61') : void 0;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.') : void 0;
	    process.env.NODE_ENV !== 'production' ? warning(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.') : void 0;
	    process.env.NODE_ENV !== 'production' ? warning(props.onFocusIn == null && props.onFocusOut == null, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.') : void 0;
	  }
	  !(props.style == null || typeof props.style === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getDeclarationErrorAddendum(component)) : _prodInvariant('62', getDeclarationErrorAddendum(component)) : void 0;
	}
	
	function enqueuePutListener(inst, registrationName, listener, transaction) {
	  if (transaction instanceof ReactServerRenderingTransaction) {
	    return;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    // IE8 has no API for event capturing and the `onScroll` event doesn't
	    // bubble.
	    process.env.NODE_ENV !== 'production' ? warning(registrationName !== 'onScroll' || isEventSupported('scroll', true), "This browser doesn't support the `onScroll` event") : void 0;
	  }
	  var containerInfo = inst._hostContainerInfo;
	  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
	  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
	  listenTo(registrationName, doc);
	  transaction.getReactMountReady().enqueue(putListener, {
	    inst: inst,
	    registrationName: registrationName,
	    listener: listener
	  });
	}
	
	function putListener() {
	  var listenerToPut = this;
	  EventPluginHub.putListener(listenerToPut.inst, listenerToPut.registrationName, listenerToPut.listener);
	}
	
	function inputPostMount() {
	  var inst = this;
	  ReactDOMInput.postMountWrapper(inst);
	}
	
	function textareaPostMount() {
	  var inst = this;
	  ReactDOMTextarea.postMountWrapper(inst);
	}
	
	function optionPostMount() {
	  var inst = this;
	  ReactDOMOption.postMountWrapper(inst);
	}
	
	var setAndValidateContentChildDev = emptyFunction;
	if (process.env.NODE_ENV !== 'production') {
	  setAndValidateContentChildDev = function (content) {
	    var hasExistingContent = this._contentDebugID != null;
	    var debugID = this._debugID;
	    // This ID represents the inlined child that has no backing instance:
	    var contentDebugID = -debugID;
	
	    if (content == null) {
	      if (hasExistingContent) {
	        ReactInstrumentation.debugTool.onUnmountComponent(this._contentDebugID);
	      }
	      this._contentDebugID = null;
	      return;
	    }
	
	    validateDOMNesting(null, String(content), this, this._ancestorInfo);
	    this._contentDebugID = contentDebugID;
	    if (hasExistingContent) {
	      ReactInstrumentation.debugTool.onBeforeUpdateComponent(contentDebugID, content);
	      ReactInstrumentation.debugTool.onUpdateComponent(contentDebugID);
	    } else {
	      ReactInstrumentation.debugTool.onBeforeMountComponent(contentDebugID, content, debugID);
	      ReactInstrumentation.debugTool.onMountComponent(contentDebugID);
	      ReactInstrumentation.debugTool.onSetChildren(debugID, [contentDebugID]);
	    }
	  };
	}
	
	// There are so many media events, it makes sense to just
	// maintain a list rather than create a `trapBubbledEvent` for each
	var mediaEvents = {
	  topAbort: 'abort',
	  topCanPlay: 'canplay',
	  topCanPlayThrough: 'canplaythrough',
	  topDurationChange: 'durationchange',
	  topEmptied: 'emptied',
	  topEncrypted: 'encrypted',
	  topEnded: 'ended',
	  topError: 'error',
	  topLoadedData: 'loadeddata',
	  topLoadedMetadata: 'loadedmetadata',
	  topLoadStart: 'loadstart',
	  topPause: 'pause',
	  topPlay: 'play',
	  topPlaying: 'playing',
	  topProgress: 'progress',
	  topRateChange: 'ratechange',
	  topSeeked: 'seeked',
	  topSeeking: 'seeking',
	  topStalled: 'stalled',
	  topSuspend: 'suspend',
	  topTimeUpdate: 'timeupdate',
	  topVolumeChange: 'volumechange',
	  topWaiting: 'waiting'
	};
	
	function trackInputValue() {
	  inputValueTracking.track(this);
	}
	
	function trapBubbledEventsLocal() {
	  var inst = this;
	  // If a component renders to null or if another component fatals and causes
	  // the state of the tree to be corrupted, `node` here can be null.
	  !inst._rootNodeID ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Must be mounted to trap events') : _prodInvariant('63') : void 0;
	  var node = getNode(inst);
	  !node ? process.env.NODE_ENV !== 'production' ? invariant(false, 'trapBubbledEvent(...): Requires node to be rendered.') : _prodInvariant('64') : void 0;
	
	  switch (inst._tag) {
	    case 'iframe':
	    case 'object':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topLoad', 'load', node)];
	      break;
	    case 'video':
	    case 'audio':
	      inst._wrapperState.listeners = [];
	      // Create listener for each media event
	      for (var event in mediaEvents) {
	        if (mediaEvents.hasOwnProperty(event)) {
	          inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(event, mediaEvents[event], node));
	        }
	      }
	      break;
	    case 'source':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topError', 'error', node)];
	      break;
	    case 'img':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topError', 'error', node), ReactBrowserEventEmitter.trapBubbledEvent('topLoad', 'load', node)];
	      break;
	    case 'form':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topReset', 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent('topSubmit', 'submit', node)];
	      break;
	    case 'input':
	    case 'select':
	    case 'textarea':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topInvalid', 'invalid', node)];
	      break;
	  }
	}
	
	function postUpdateSelectWrapper() {
	  ReactDOMSelect.postUpdateWrapper(this);
	}
	
	// For HTML, certain tags should omit their close tag. We keep a whitelist for
	// those special-case tags.
	
	var omittedCloseTags = {
	  area: true,
	  base: true,
	  br: true,
	  col: true,
	  embed: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true,
	  wbr: true
	  // NOTE: menuitem's close tag should be omitted, but that causes problems.
	};
	
	var newlineEatingTags = {
	  listing: true,
	  pre: true,
	  textarea: true
	};
	
	// For HTML, certain tags cannot have children. This has the same purpose as
	// `omittedCloseTags` except that `menuitem` should still have its closing tag.
	
	var voidElementTags = _assign({
	  menuitem: true
	}, omittedCloseTags);
	
	// We accept any tag to be rendered but since this gets injected into arbitrary
	// HTML, we want to make sure that it's a safe tag.
	// http://www.w3.org/TR/REC-xml/#NT-Name
	
	var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
	var validatedTagCache = {};
	var hasOwnProperty = {}.hasOwnProperty;
	
	function validateDangerousTag(tag) {
	  if (!hasOwnProperty.call(validatedTagCache, tag)) {
	    !VALID_TAG_REGEX.test(tag) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : _prodInvariant('65', tag) : void 0;
	    validatedTagCache[tag] = true;
	  }
	}
	
	function isCustomComponent(tagName, props) {
	  return tagName.indexOf('-') >= 0 || props.is != null;
	}
	
	var globalIdCounter = 1;
	
	/**
	 * Creates a new React class that is idempotent and capable of containing other
	 * React components. It accepts event listeners and DOM properties that are
	 * valid according to `DOMProperty`.
	 *
	 *  - Event listeners: `onClick`, `onMouseDown`, etc.
	 *  - DOM properties: `className`, `name`, `title`, etc.
	 *
	 * The `style` property functions differently from the DOM API. It accepts an
	 * object mapping of style properties to values.
	 *
	 * @constructor ReactDOMComponent
	 * @extends ReactMultiChild
	 */
	function ReactDOMComponent(element) {
	  var tag = element.type;
	  validateDangerousTag(tag);
	  this._currentElement = element;
	  this._tag = tag.toLowerCase();
	  this._namespaceURI = null;
	  this._renderedChildren = null;
	  this._previousStyle = null;
	  this._previousStyleCopy = null;
	  this._hostNode = null;
	  this._hostParent = null;
	  this._rootNodeID = 0;
	  this._domID = 0;
	  this._hostContainerInfo = null;
	  this._wrapperState = null;
	  this._topLevelWrapper = null;
	  this._flags = 0;
	  if (process.env.NODE_ENV !== 'production') {
	    this._ancestorInfo = null;
	    setAndValidateContentChildDev.call(this, null);
	  }
	}
	
	ReactDOMComponent.displayName = 'ReactDOMComponent';
	
	ReactDOMComponent.Mixin = {
	  /**
	   * Generates root tag markup then recurses. This method has side effects and
	   * is not idempotent.
	   *
	   * @internal
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?ReactDOMComponent} the parent component instance
	   * @param {?object} info about the host container
	   * @param {object} context
	   * @return {string} The computed markup.
	   */
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
	    this._rootNodeID = globalIdCounter++;
	    this._domID = hostContainerInfo._idCounter++;
	    this._hostParent = hostParent;
	    this._hostContainerInfo = hostContainerInfo;
	
	    var props = this._currentElement.props;
	
	    switch (this._tag) {
	      case 'audio':
	      case 'form':
	      case 'iframe':
	      case 'img':
	      case 'link':
	      case 'object':
	      case 'source':
	      case 'video':
	        this._wrapperState = {
	          listeners: null
	        };
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;
	      case 'input':
	        ReactDOMInput.mountWrapper(this, props, hostParent);
	        props = ReactDOMInput.getHostProps(this, props);
	        transaction.getReactMountReady().enqueue(trackInputValue, this);
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;
	      case 'option':
	        ReactDOMOption.mountWrapper(this, props, hostParent);
	        props = ReactDOMOption.getHostProps(this, props);
	        break;
	      case 'select':
	        ReactDOMSelect.mountWrapper(this, props, hostParent);
	        props = ReactDOMSelect.getHostProps(this, props);
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;
	      case 'textarea':
	        ReactDOMTextarea.mountWrapper(this, props, hostParent);
	        props = ReactDOMTextarea.getHostProps(this, props);
	        transaction.getReactMountReady().enqueue(trackInputValue, this);
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;
	    }
	
	    assertValidProps(this, props);
	
	    // We create tags in the namespace of their parent container, except HTML
	    // tags get no namespace.
	    var namespaceURI;
	    var parentTag;
	    if (hostParent != null) {
	      namespaceURI = hostParent._namespaceURI;
	      parentTag = hostParent._tag;
	    } else if (hostContainerInfo._tag) {
	      namespaceURI = hostContainerInfo._namespaceURI;
	      parentTag = hostContainerInfo._tag;
	    }
	    if (namespaceURI == null || namespaceURI === DOMNamespaces.svg && parentTag === 'foreignobject') {
	      namespaceURI = DOMNamespaces.html;
	    }
	    if (namespaceURI === DOMNamespaces.html) {
	      if (this._tag === 'svg') {
	        namespaceURI = DOMNamespaces.svg;
	      } else if (this._tag === 'math') {
	        namespaceURI = DOMNamespaces.mathml;
	      }
	    }
	    this._namespaceURI = namespaceURI;
	
	    if (process.env.NODE_ENV !== 'production') {
	      var parentInfo;
	      if (hostParent != null) {
	        parentInfo = hostParent._ancestorInfo;
	      } else if (hostContainerInfo._tag) {
	        parentInfo = hostContainerInfo._ancestorInfo;
	      }
	      if (parentInfo) {
	        // parentInfo should always be present except for the top-level
	        // component when server rendering
	        validateDOMNesting(this._tag, null, this, parentInfo);
	      }
	      this._ancestorInfo = validateDOMNesting.updatedAncestorInfo(parentInfo, this._tag, this);
	    }
	
	    var mountImage;
	    if (transaction.useCreateElement) {
	      var ownerDocument = hostContainerInfo._ownerDocument;
	      var el;
	      if (namespaceURI === DOMNamespaces.html) {
	        if (this._tag === 'script') {
	          // Create the script via .innerHTML so its "parser-inserted" flag is
	          // set to true and it does not execute
	          var div = ownerDocument.createElement('div');
	          var type = this._currentElement.type;
	          div.innerHTML = '<' + type + '></' + type + '>';
	          el = div.removeChild(div.firstChild);
	        } else if (props.is) {
	          el = ownerDocument.createElement(this._currentElement.type, props.is);
	        } else {
	          // Separate else branch instead of using `props.is || undefined` above becuase of a Firefox bug.
	          // See discussion in https://github.com/facebook/react/pull/6896
	          // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
	          el = ownerDocument.createElement(this._currentElement.type);
	        }
	      } else {
	        el = ownerDocument.createElementNS(namespaceURI, this._currentElement.type);
	      }
	      ReactDOMComponentTree.precacheNode(this, el);
	      this._flags |= Flags.hasCachedChildNodes;
	      if (!this._hostParent) {
	        DOMPropertyOperations.setAttributeForRoot(el);
	      }
	      this._updateDOMProperties(null, props, transaction);
	      var lazyTree = DOMLazyTree(el);
	      this._createInitialChildren(transaction, props, context, lazyTree);
	      mountImage = lazyTree;
	    } else {
	      var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
	      var tagContent = this._createContentMarkup(transaction, props, context);
	      if (!tagContent && omittedCloseTags[this._tag]) {
	        mountImage = tagOpen + '/>';
	      } else {
	        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
	      }
	    }
	
	    switch (this._tag) {
	      case 'input':
	        transaction.getReactMountReady().enqueue(inputPostMount, this);
	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }
	        break;
	      case 'textarea':
	        transaction.getReactMountReady().enqueue(textareaPostMount, this);
	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }
	        break;
	      case 'select':
	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }
	        break;
	      case 'button':
	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }
	        break;
	      case 'option':
	        transaction.getReactMountReady().enqueue(optionPostMount, this);
	        break;
	    }
	
	    return mountImage;
	  },
	
	  /**
	   * Creates markup for the open tag and all attributes.
	   *
	   * This method has side effects because events get registered.
	   *
	   * Iterating over object properties is faster than iterating over arrays.
	   * @see http://jsperf.com/obj-vs-arr-iteration
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {object} props
	   * @return {string} Markup of opening tag.
	   */
	  _createOpenTagMarkupAndPutListeners: function (transaction, props) {
	    var ret = '<' + this._currentElement.type;
	
	    for (var propKey in props) {
	      if (!props.hasOwnProperty(propKey)) {
	        continue;
	      }
	      var propValue = props[propKey];
	      if (propValue == null) {
	        continue;
	      }
	      if (registrationNameModules.hasOwnProperty(propKey)) {
	        if (propValue) {
	          enqueuePutListener(this, propKey, propValue, transaction);
	        }
	      } else {
	        if (propKey === STYLE) {
	          if (propValue) {
	            if (process.env.NODE_ENV !== 'production') {
	              // See `_updateDOMProperties`. style block
	              this._previousStyle = propValue;
	            }
	            propValue = this._previousStyleCopy = _assign({}, props.style);
	          }
	          propValue = CSSPropertyOperations.createMarkupForStyles(propValue, this);
	        }
	        var markup = null;
	        if (this._tag != null && isCustomComponent(this._tag, props)) {
	          if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	            markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
	          }
	        } else {
	          markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
	        }
	        if (markup) {
	          ret += ' ' + markup;
	        }
	      }
	    }
	
	    // For static pages, no need to put React ID and checksum. Saves lots of
	    // bytes.
	    if (transaction.renderToStaticMarkup) {
	      return ret;
	    }
	
	    if (!this._hostParent) {
	      ret += ' ' + DOMPropertyOperations.createMarkupForRoot();
	    }
	    ret += ' ' + DOMPropertyOperations.createMarkupForID(this._domID);
	    return ret;
	  },
	
	  /**
	   * Creates markup for the content between the tags.
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {object} props
	   * @param {object} context
	   * @return {string} Content markup.
	   */
	  _createContentMarkup: function (transaction, props, context) {
	    var ret = '';
	
	    // Intentional use of != to avoid catching zero/false.
	    var innerHTML = props.dangerouslySetInnerHTML;
	    if (innerHTML != null) {
	      if (innerHTML.__html != null) {
	        ret = innerHTML.__html;
	      }
	    } else {
	      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
	      var childrenToUse = contentToUse != null ? null : props.children;
	      if (contentToUse != null) {
	        // TODO: Validate that text is allowed as a child of this node
	        ret = escapeTextContentForBrowser(contentToUse);
	        if (process.env.NODE_ENV !== 'production') {
	          setAndValidateContentChildDev.call(this, contentToUse);
	        }
	      } else if (childrenToUse != null) {
	        var mountImages = this.mountChildren(childrenToUse, transaction, context);
	        ret = mountImages.join('');
	      }
	    }
	    if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
	      // text/html ignores the first character in these tags if it's a newline
	      // Prefer to break application/xml over text/html (for now) by adding
	      // a newline specifically to get eaten by the parser. (Alternately for
	      // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	      // \r is normalized out by HTMLTextAreaElement#value.)
	      // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	      // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	      // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	      // See: Parsing of "textarea" "listing" and "pre" elements
	      //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	      return '\n' + ret;
	    } else {
	      return ret;
	    }
	  },
	
	  _createInitialChildren: function (transaction, props, context, lazyTree) {
	    // Intentional use of != to avoid catching zero/false.
	    var innerHTML = props.dangerouslySetInnerHTML;
	    if (innerHTML != null) {
	      if (innerHTML.__html != null) {
	        DOMLazyTree.queueHTML(lazyTree, innerHTML.__html);
	      }
	    } else {
	      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
	      var childrenToUse = contentToUse != null ? null : props.children;
	      // TODO: Validate that text is allowed as a child of this node
	      if (contentToUse != null) {
	        // Avoid setting textContent when the text is empty. In IE11 setting
	        // textContent on a text area will cause the placeholder to not
	        // show within the textarea until it has been focused and blurred again.
	        // https://github.com/facebook/react/issues/6731#issuecomment-254874553
	        if (contentToUse !== '') {
	          if (process.env.NODE_ENV !== 'production') {
	            setAndValidateContentChildDev.call(this, contentToUse);
	          }
	          DOMLazyTree.queueText(lazyTree, contentToUse);
	        }
	      } else if (childrenToUse != null) {
	        var mountImages = this.mountChildren(childrenToUse, transaction, context);
	        for (var i = 0; i < mountImages.length; i++) {
	          DOMLazyTree.queueChild(lazyTree, mountImages[i]);
	        }
	      }
	    }
	  },
	
	  /**
	   * Receives a next element and updates the component.
	   *
	   * @internal
	   * @param {ReactElement} nextElement
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {object} context
	   */
	  receiveComponent: function (nextElement, transaction, context) {
	    var prevElement = this._currentElement;
	    this._currentElement = nextElement;
	    this.updateComponent(transaction, prevElement, nextElement, context);
	  },
	
	  /**
	   * Updates a DOM component after it has already been allocated and
	   * attached to the DOM. Reconciles the root DOM node, then recurses.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactElement} prevElement
	   * @param {ReactElement} nextElement
	   * @internal
	   * @overridable
	   */
	  updateComponent: function (transaction, prevElement, nextElement, context) {
	    var lastProps = prevElement.props;
	    var nextProps = this._currentElement.props;
	
	    switch (this._tag) {
	      case 'input':
	        lastProps = ReactDOMInput.getHostProps(this, lastProps);
	        nextProps = ReactDOMInput.getHostProps(this, nextProps);
	        break;
	      case 'option':
	        lastProps = ReactDOMOption.getHostProps(this, lastProps);
	        nextProps = ReactDOMOption.getHostProps(this, nextProps);
	        break;
	      case 'select':
	        lastProps = ReactDOMSelect.getHostProps(this, lastProps);
	        nextProps = ReactDOMSelect.getHostProps(this, nextProps);
	        break;
	      case 'textarea':
	        lastProps = ReactDOMTextarea.getHostProps(this, lastProps);
	        nextProps = ReactDOMTextarea.getHostProps(this, nextProps);
	        break;
	    }
	
	    assertValidProps(this, nextProps);
	    this._updateDOMProperties(lastProps, nextProps, transaction);
	    this._updateDOMChildren(lastProps, nextProps, transaction, context);
	
	    switch (this._tag) {
	      case 'input':
	        // Update the wrapper around inputs *after* updating props. This has to
	        // happen after `_updateDOMProperties`. Otherwise HTML5 input validations
	        // raise warnings and prevent the new value from being assigned.
	        ReactDOMInput.updateWrapper(this);
	        break;
	      case 'textarea':
	        ReactDOMTextarea.updateWrapper(this);
	        break;
	      case 'select':
	        // <select> value update needs to occur after <option> children
	        // reconciliation
	        transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
	        break;
	    }
	  },
	
	  /**
	   * Reconciles the properties by detecting differences in property values and
	   * updating the DOM as necessary. This function is probably the single most
	   * critical path for performance optimization.
	   *
	   * TODO: Benchmark whether checking for changed values in memory actually
	   *       improves performance (especially statically positioned elements).
	   * TODO: Benchmark the effects of putting this at the top since 99% of props
	   *       do not change for a given reconciliation.
	   * TODO: Benchmark areas that can be improved with caching.
	   *
	   * @private
	   * @param {object} lastProps
	   * @param {object} nextProps
	   * @param {?DOMElement} node
	   */
	  _updateDOMProperties: function (lastProps, nextProps, transaction) {
	    var propKey;
	    var styleName;
	    var styleUpdates;
	    for (propKey in lastProps) {
	      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        var lastStyle = this._previousStyleCopy;
	        for (styleName in lastStyle) {
	          if (lastStyle.hasOwnProperty(styleName)) {
	            styleUpdates = styleUpdates || {};
	            styleUpdates[styleName] = '';
	          }
	        }
	        this._previousStyleCopy = null;
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        if (lastProps[propKey]) {
	          // Only call deleteListener if there was a listener previously or
	          // else willDeleteListener gets called when there wasn't actually a
	          // listener (e.g., onClick={null})
	          deleteListener(this, propKey);
	        }
	      } else if (isCustomComponent(this._tag, lastProps)) {
	        if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	          DOMPropertyOperations.deleteValueForAttribute(getNode(this), propKey);
	        }
	      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
	        DOMPropertyOperations.deleteValueForProperty(getNode(this), propKey);
	      }
	    }
	    for (propKey in nextProps) {
	      var nextProp = nextProps[propKey];
	      var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps != null ? lastProps[propKey] : undefined;
	      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        if (nextProp) {
	          if (process.env.NODE_ENV !== 'production') {
	            checkAndWarnForMutatedStyle(this._previousStyleCopy, this._previousStyle, this);
	            this._previousStyle = nextProp;
	          }
	          nextProp = this._previousStyleCopy = _assign({}, nextProp);
	        } else {
	          this._previousStyleCopy = null;
	        }
	        if (lastProp) {
	          // Unset styles on `lastProp` but not on `nextProp`.
	          for (styleName in lastProp) {
	            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = '';
	            }
	          }
	          // Update styles that changed since `lastProp`.
	          for (styleName in nextProp) {
	            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = nextProp[styleName];
	            }
	          }
	        } else {
	          // Relies on `updateStylesByID` not mutating `styleUpdates`.
	          styleUpdates = nextProp;
	        }
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        if (nextProp) {
	          enqueuePutListener(this, propKey, nextProp, transaction);
	        } else if (lastProp) {
	          deleteListener(this, propKey);
	        }
	      } else if (isCustomComponent(this._tag, nextProps)) {
	        if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	          DOMPropertyOperations.setValueForAttribute(getNode(this), propKey, nextProp);
	        }
	      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
	        var node = getNode(this);
	        // If we're updating to null or undefined, we should remove the property
	        // from the DOM node instead of inadvertently setting to a string. This
	        // brings us in line with the same behavior we have on initial render.
	        if (nextProp != null) {
	          DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
	        } else {
	          DOMPropertyOperations.deleteValueForProperty(node, propKey);
	        }
	      }
	    }
	    if (styleUpdates) {
	      CSSPropertyOperations.setValueForStyles(getNode(this), styleUpdates, this);
	    }
	  },
	
	  /**
	   * Reconciles the children with the various properties that affect the
	   * children content.
	   *
	   * @param {object} lastProps
	   * @param {object} nextProps
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   */
	  _updateDOMChildren: function (lastProps, nextProps, transaction, context) {
	    var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
	    var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
	
	    var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
	    var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;
	
	    // Note the use of `!=` which checks for null or undefined.
	    var lastChildren = lastContent != null ? null : lastProps.children;
	    var nextChildren = nextContent != null ? null : nextProps.children;
	
	    // If we're switching from children to content/html or vice versa, remove
	    // the old content
	    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
	    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
	    if (lastChildren != null && nextChildren == null) {
	      this.updateChildren(null, transaction, context);
	    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
	      this.updateTextContent('');
	      if (process.env.NODE_ENV !== 'production') {
	        ReactInstrumentation.debugTool.onSetChildren(this._debugID, []);
	      }
	    }
	
	    if (nextContent != null) {
	      if (lastContent !== nextContent) {
	        this.updateTextContent('' + nextContent);
	        if (process.env.NODE_ENV !== 'production') {
	          setAndValidateContentChildDev.call(this, nextContent);
	        }
	      }
	    } else if (nextHtml != null) {
	      if (lastHtml !== nextHtml) {
	        this.updateMarkup('' + nextHtml);
	      }
	      if (process.env.NODE_ENV !== 'production') {
	        ReactInstrumentation.debugTool.onSetChildren(this._debugID, []);
	      }
	    } else if (nextChildren != null) {
	      if (process.env.NODE_ENV !== 'production') {
	        setAndValidateContentChildDev.call(this, null);
	      }
	
	      this.updateChildren(nextChildren, transaction, context);
	    }
	  },
	
	  getHostNode: function () {
	    return getNode(this);
	  },
	
	  /**
	   * Destroys all event registrations for this instance. Does not remove from
	   * the DOM. That must be done by the parent.
	   *
	   * @internal
	   */
	  unmountComponent: function (safely) {
	    switch (this._tag) {
	      case 'audio':
	      case 'form':
	      case 'iframe':
	      case 'img':
	      case 'link':
	      case 'object':
	      case 'source':
	      case 'video':
	        var listeners = this._wrapperState.listeners;
	        if (listeners) {
	          for (var i = 0; i < listeners.length; i++) {
	            listeners[i].remove();
	          }
	        }
	        break;
	      case 'input':
	      case 'textarea':
	        inputValueTracking.stopTracking(this);
	        break;
	      case 'html':
	      case 'head':
	      case 'body':
	        /**
	         * Components like <html> <head> and <body> can't be removed or added
	         * easily in a cross-browser way, however it's valuable to be able to
	         * take advantage of React's reconciliation for styling and <title>
	         * management. So we just document it and throw in dangerous cases.
	         */
	         true ? process.env.NODE_ENV !== 'production' ? invariant(false, '<%s> tried to unmount. Because of cross-browser quirks it is impossible to unmount some top-level components (eg <html>, <head>, and <body>) reliably and efficiently. To fix this, have a single top-level component that never unmounts render these elements.', this._tag) : _prodInvariant('66', this._tag) : void 0;
	        break;
	    }
	
	    this.unmountChildren(safely);
	    ReactDOMComponentTree.uncacheNode(this);
	    EventPluginHub.deleteAllListeners(this);
	    this._rootNodeID = 0;
	    this._domID = 0;
	    this._wrapperState = null;
	
	    if (process.env.NODE_ENV !== 'production') {
	      setAndValidateContentChildDev.call(this, null);
	    }
	  },
	
	  getPublicInstance: function () {
	    return getNode(this);
	  }
	};
	
	_assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
	
	module.exports = ReactDOMComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactDOMComponentTree = __webpack_require__(39);
	
	var focusNode = __webpack_require__(100);
	
	var AutoFocusUtils = {
	  focusDOMComponent: function () {
	    focusNode(ReactDOMComponentTree.getNodeFromInstance(this));
	  }
	};
	
	module.exports = AutoFocusUtils;

/***/ }),
/* 100 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * @param {DOMElement} node input/textarea to focus
	 */
	
	function focusNode(node) {
	  // IE8 can throw "Can't move focus to the control because it is invisible,
	  // not enabled, or of a type that does not accept the focus." for all kinds of
	  // reasons that are too expensive and fragile to test.
	  try {
	    node.focus();
	  } catch (e) {}
	}
	
	module.exports = focusNode;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var CSSProperty = __webpack_require__(102);
	var ExecutionEnvironment = __webpack_require__(53);
	var ReactInstrumentation = __webpack_require__(67);
	
	var camelizeStyleName = __webpack_require__(103);
	var dangerousStyleValue = __webpack_require__(105);
	var hyphenateStyleName = __webpack_require__(106);
	var memoizeStringOnly = __webpack_require__(108);
	var warning = __webpack_require__(8);
	
	var processStyleName = memoizeStringOnly(function (styleName) {
	  return hyphenateStyleName(styleName);
	});
	
	var hasShorthandPropertyBug = false;
	var styleFloatAccessor = 'cssFloat';
	if (ExecutionEnvironment.canUseDOM) {
	  var tempStyle = document.createElement('div').style;
	  try {
	    // IE8 throws "Invalid argument." if resetting shorthand style properties.
	    tempStyle.font = '';
	  } catch (e) {
	    hasShorthandPropertyBug = true;
	  }
	  // IE8 only supports accessing cssFloat (standard) as styleFloat
	  if (document.documentElement.style.cssFloat === undefined) {
	    styleFloatAccessor = 'styleFloat';
	  }
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
	
	  // style values shouldn't contain a semicolon
	  var badStyleValueWithSemicolonPattern = /;\s*$/;
	
	  var warnedStyleNames = {};
	  var warnedStyleValues = {};
	  var warnedForNaNValue = false;
	
	  var warnHyphenatedStyleName = function (name, owner) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }
	
	    warnedStyleNames[name] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), checkRenderMessage(owner)) : void 0;
	  };
	
	  var warnBadVendoredStyleName = function (name, owner) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }
	
	    warnedStyleNames[name] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
	  };
	
	  var warnStyleValueWithSemicolon = function (name, value, owner) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }
	
	    warnedStyleValues[value] = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, "Style property values shouldn't contain a semicolon.%s " + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
	  };
	
	  var warnStyleValueIsNaN = function (name, value, owner) {
	    if (warnedForNaNValue) {
	      return;
	    }
	
	    warnedForNaNValue = true;
	    process.env.NODE_ENV !== 'production' ? warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
	  };
	
	  var checkRenderMessage = function (owner) {
	    if (owner) {
	      var name = owner.getName();
	      if (name) {
	        return ' Check the render method of `' + name + '`.';
	      }
	    }
	    return '';
	  };
	
	  /**
	   * @param {string} name
	   * @param {*} value
	   * @param {ReactDOMComponent} component
	   */
	  var warnValidStyle = function (name, value, component) {
	    var owner;
	    if (component) {
	      owner = component._currentElement._owner;
	    }
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name, owner);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name, owner);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value, owner);
	    }
	
	    if (typeof value === 'number' && isNaN(value)) {
	      warnStyleValueIsNaN(name, value, owner);
	    }
	  };
	}
	
	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {
	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @param {ReactDOMComponent} component
	   * @return {?string}
	   */
	  createMarkupForStyles: function (styles, component) {
	    var serialized = '';
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var isCustomProperty = styleName.indexOf('--') === 0;
	      var styleValue = styles[styleName];
	      if (process.env.NODE_ENV !== 'production') {
	        if (!isCustomProperty) {
	          warnValidStyle(styleName, styleValue, component);
	        }
	      }
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue, component, isCustomProperty) + ';';
	      }
	    }
	    return serialized || null;
	  },
	
	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   * @param {ReactDOMComponent} component
	   */
	  setValueForStyles: function (node, styles, component) {
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onHostOperation({
	        instanceID: component._debugID,
	        type: 'update styles',
	        payload: styles
	      });
	    }
	
	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var isCustomProperty = styleName.indexOf('--') === 0;
	      if (process.env.NODE_ENV !== 'production') {
	        if (!isCustomProperty) {
	          warnValidStyle(styleName, styles[styleName], component);
	        }
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName], component, isCustomProperty);
	      if (styleName === 'float' || styleName === 'cssFloat') {
	        styleName = styleFloatAccessor;
	      }
	      if (isCustomProperty) {
	        style.setProperty(styleName, styleValue);
	      } else if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }
	};
	
	module.exports = CSSPropertyOperations;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 102 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	
	var isUnitlessNumber = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridRowEnd: true,
	  gridRowSpan: true,
	  gridRowStart: true,
	  gridColumn: true,
	  gridColumnEnd: true,
	  gridColumnSpan: true,
	  gridColumnStart: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,
	
	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};
	
	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}
	
	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	
	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});
	
	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundAttachment: true,
	    backgroundColor: true,
	    backgroundImage: true,
	    backgroundPositionX: true,
	    backgroundPositionY: true,
	    backgroundRepeat: true
	  },
	  backgroundPosition: {
	    backgroundPositionX: true,
	    backgroundPositionY: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  },
	  outline: {
	    outlineWidth: true,
	    outlineStyle: true,
	    outlineColor: true
	  }
	};
	
	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};
	
	module.exports = CSSProperty;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	'use strict';
	
	var camelize = __webpack_require__(104);
	
	var msPattern = /^-ms-/;
	
	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}
	
	module.exports = camelizeStyleName;

/***/ }),
/* 104 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	var _hyphenPattern = /-(.)/g;
	
	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}
	
	module.exports = camelize;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var CSSProperty = __webpack_require__(102);
	var warning = __webpack_require__(8);
	
	var isUnitlessNumber = CSSProperty.isUnitlessNumber;
	var styleWarnings = {};
	
	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @param {ReactDOMComponent} component
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value, component, isCustomProperty) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901
	
	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }
	
	  var isNonNumeric = isNaN(value);
	  if (isCustomProperty || isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }
	
	  if (typeof value === 'string') {
	    if (process.env.NODE_ENV !== 'production') {
	      // Allow '0' to pass through without warning. 0 is already special and
	      // doesn't require units, so we don't need to warn about it.
	      if (component && value !== '0') {
	        var owner = component._currentElement._owner;
	        var ownerName = owner ? owner.getName() : null;
	        if (ownerName && !styleWarnings[ownerName]) {
	          styleWarnings[ownerName] = {};
	        }
	        var warned = false;
	        if (ownerName) {
	          var warnings = styleWarnings[ownerName];
	          warned = warnings[name];
	          if (!warned) {
	            warnings[name] = true;
	          }
	        }
	        if (!warned) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
	        }
	      }
	    }
	    value = value.trim();
	  }
	  return value + 'px';
	}
	
	module.exports = dangerousStyleValue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	'use strict';
	
	var hyphenate = __webpack_require__(107);
	
	var msPattern = /^ms-/;
	
	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}
	
	module.exports = hyphenateStyleName;

/***/ }),
/* 107 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	var _uppercasePattern = /([A-Z])/g;
	
	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}
	
	module.exports = hyphenate;

/***/ }),
/* 108 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 * @typechecks static-only
	 */
	
	'use strict';
	
	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 */
	
	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}
	
	module.exports = memoizeStringOnly;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMProperty = __webpack_require__(41);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactInstrumentation = __webpack_require__(67);
	
	var quoteAttributeValueForBrowser = __webpack_require__(110);
	var warning = __webpack_require__(8);
	
	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty.ATTRIBUTE_NAME_CHAR + ']*$');
	var illegalAttributeNameCache = {};
	var validatedAttributeNameCache = {};
	
	function isAttributeNameSafe(attributeName) {
	  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
	    return true;
	  }
	  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
	    return false;
	  }
	  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
	    validatedAttributeNameCache[attributeName] = true;
	    return true;
	  }
	  illegalAttributeNameCache[attributeName] = true;
	  process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : void 0;
	  return false;
	}
	
	function shouldIgnoreValue(propertyInfo, value) {
	  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
	}
	
	/**
	 * Operations for dealing with DOM properties.
	 */
	var DOMPropertyOperations = {
	  /**
	   * Creates markup for the ID property.
	   *
	   * @param {string} id Unescaped ID.
	   * @return {string} Markup string.
	   */
	  createMarkupForID: function (id) {
	    return DOMProperty.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
	  },
	
	  setAttributeForID: function (node, id) {
	    node.setAttribute(DOMProperty.ID_ATTRIBUTE_NAME, id);
	  },
	
	  createMarkupForRoot: function () {
	    return DOMProperty.ROOT_ATTRIBUTE_NAME + '=""';
	  },
	
	  setAttributeForRoot: function (node) {
	    node.setAttribute(DOMProperty.ROOT_ATTRIBUTE_NAME, '');
	  },
	
	  /**
	   * Creates markup for a property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {?string} Markup string, or null if the property was invalid.
	   */
	  createMarkupForProperty: function (name, value) {
	    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
	    if (propertyInfo) {
	      if (shouldIgnoreValue(propertyInfo, value)) {
	        return '';
	      }
	      var attributeName = propertyInfo.attributeName;
	      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
	        return attributeName + '=""';
	      }
	      return attributeName + '=' + quoteAttributeValueForBrowser(value);
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      if (value == null) {
	        return '';
	      }
	      return name + '=' + quoteAttributeValueForBrowser(value);
	    }
	    return null;
	  },
	
	  /**
	   * Creates markup for a custom property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {string} Markup string, or empty string if the property was invalid.
	   */
	  createMarkupForCustomAttribute: function (name, value) {
	    if (!isAttributeNameSafe(name) || value == null) {
	      return '';
	    }
	    return name + '=' + quoteAttributeValueForBrowser(value);
	  },
	
	  /**
	   * Sets the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   * @param {*} value
	   */
	  setValueForProperty: function (node, name, value) {
	    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
	    if (propertyInfo) {
	      var mutationMethod = propertyInfo.mutationMethod;
	      if (mutationMethod) {
	        mutationMethod(node, value);
	      } else if (shouldIgnoreValue(propertyInfo, value)) {
	        this.deleteValueForProperty(node, name);
	        return;
	      } else if (propertyInfo.mustUseProperty) {
	        // Contrary to `setAttribute`, object properties are properly
	        // `toString`ed by IE8/9.
	        node[propertyInfo.propertyName] = value;
	      } else {
	        var attributeName = propertyInfo.attributeName;
	        var namespace = propertyInfo.attributeNamespace;
	        // `setAttribute` with objects becomes only `[object]` in IE8/9,
	        // ('' + value) makes it output the correct toString()-value.
	        if (namespace) {
	          node.setAttributeNS(namespace, attributeName, '' + value);
	        } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
	          node.setAttribute(attributeName, '');
	        } else {
	          node.setAttribute(attributeName, '' + value);
	        }
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      DOMPropertyOperations.setValueForAttribute(node, name, value);
	      return;
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var payload = {};
	      payload[name] = value;
	      ReactInstrumentation.debugTool.onHostOperation({
	        instanceID: ReactDOMComponentTree.getInstanceFromNode(node)._debugID,
	        type: 'update attribute',
	        payload: payload
	      });
	    }
	  },
	
	  setValueForAttribute: function (node, name, value) {
	    if (!isAttributeNameSafe(name)) {
	      return;
	    }
	    if (value == null) {
	      node.removeAttribute(name);
	    } else {
	      node.setAttribute(name, '' + value);
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var payload = {};
	      payload[name] = value;
	      ReactInstrumentation.debugTool.onHostOperation({
	        instanceID: ReactDOMComponentTree.getInstanceFromNode(node)._debugID,
	        type: 'update attribute',
	        payload: payload
	      });
	    }
	  },
	
	  /**
	   * Deletes an attributes from a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	  deleteValueForAttribute: function (node, name) {
	    node.removeAttribute(name);
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onHostOperation({
	        instanceID: ReactDOMComponentTree.getInstanceFromNode(node)._debugID,
	        type: 'remove attribute',
	        payload: name
	      });
	    }
	  },
	
	  /**
	   * Deletes the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	  deleteValueForProperty: function (node, name) {
	    var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
	    if (propertyInfo) {
	      var mutationMethod = propertyInfo.mutationMethod;
	      if (mutationMethod) {
	        mutationMethod(node, undefined);
	      } else if (propertyInfo.mustUseProperty) {
	        var propName = propertyInfo.propertyName;
	        if (propertyInfo.hasBooleanValue) {
	          node[propName] = false;
	        } else {
	          node[propName] = '';
	        }
	      } else {
	        node.removeAttribute(propertyInfo.attributeName);
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      node.removeAttribute(name);
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onHostOperation({
	        instanceID: ReactDOMComponentTree.getInstanceFromNode(node)._debugID,
	        type: 'remove attribute',
	        payload: name
	      });
	    }
	  }
	};
	
	module.exports = DOMPropertyOperations;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var escapeTextContentForBrowser = __webpack_require__(92);
	
	/**
	 * Escapes attribute value to prevent scripting attacks.
	 *
	 * @param {*} value Value to escape.
	 * @return {string} An escaped string.
	 */
	function quoteAttributeValueForBrowser(value) {
	  return '"' + escapeTextContentForBrowser(value) + '"';
	}
	
	module.exports = quoteAttributeValueForBrowser;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var EventPluginRegistry = __webpack_require__(48);
	var ReactEventEmitterMixin = __webpack_require__(112);
	var ViewportMetrics = __webpack_require__(82);
	
	var getVendorPrefixedEventName = __webpack_require__(113);
	var isEventSupported = __webpack_require__(76);
	
	/**
	 * Summary of `ReactBrowserEventEmitter` event handling:
	 *
	 *  - Top-level delegation is used to trap most native browser events. This
	 *    may only occur in the main thread and is the responsibility of
	 *    ReactEventListener, which is injected and can therefore support pluggable
	 *    event sources. This is the only work that occurs in the main thread.
	 *
	 *  - We normalize and de-duplicate events to account for browser quirks. This
	 *    may be done in the worker thread.
	 *
	 *  - Forward these native events (with the associated top-level type used to
	 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
	 *    to extract any synthetic events.
	 *
	 *  - The `EventPluginHub` will then process each event by annotating them with
	 *    "dispatches", a sequence of listeners and IDs that care about that event.
	 *
	 *  - The `EventPluginHub` then dispatches the events.
	 *
	 * Overview of React and the event system:
	 *
	 * +------------+    .
	 * |    DOM     |    .
	 * +------------+    .
	 *       |           .
	 *       v           .
	 * +------------+    .
	 * | ReactEvent |    .
	 * |  Listener  |    .
	 * +------------+    .                         +-----------+
	 *       |           .               +--------+|SimpleEvent|
	 *       |           .               |         |Plugin     |
	 * +-----|------+    .               v         +-----------+
	 * |     |      |    .    +--------------+                    +------------+
	 * |     +-----------.--->|EventPluginHub|                    |    Event   |
	 * |            |    .    |              |     +-----------+  | Propagators|
	 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
	 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
	 * |            |    .    |              |     +-----------+  |  utilities |
	 * |     +-----------.--->|              |                    +------------+
	 * |     |      |    .    +--------------+
	 * +-----|------+    .                ^        +-----------+
	 *       |           .                |        |Enter/Leave|
	 *       +           .                +-------+|Plugin     |
	 * +-------------+   .                         +-----------+
	 * | application |   .
	 * |-------------|   .
	 * |             |   .
	 * |             |   .
	 * +-------------+   .
	 *                   .
	 *    React Core     .  General Purpose Event Plugin System
	 */
	
	var hasEventPageXY;
	var alreadyListeningTo = {};
	var isMonitoringScrollValue = false;
	var reactTopListenersCounter = 0;
	
	// For events like 'submit' which don't consistently bubble (which we trap at a
	// lower node than `document`), binding at `document` would cause duplicate
	// events so we don't include them here
	var topEventMapping = {
	  topAbort: 'abort',
	  topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
	  topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
	  topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
	  topBlur: 'blur',
	  topCanPlay: 'canplay',
	  topCanPlayThrough: 'canplaythrough',
	  topChange: 'change',
	  topClick: 'click',
	  topCompositionEnd: 'compositionend',
	  topCompositionStart: 'compositionstart',
	  topCompositionUpdate: 'compositionupdate',
	  topContextMenu: 'contextmenu',
	  topCopy: 'copy',
	  topCut: 'cut',
	  topDoubleClick: 'dblclick',
	  topDrag: 'drag',
	  topDragEnd: 'dragend',
	  topDragEnter: 'dragenter',
	  topDragExit: 'dragexit',
	  topDragLeave: 'dragleave',
	  topDragOver: 'dragover',
	  topDragStart: 'dragstart',
	  topDrop: 'drop',
	  topDurationChange: 'durationchange',
	  topEmptied: 'emptied',
	  topEncrypted: 'encrypted',
	  topEnded: 'ended',
	  topError: 'error',
	  topFocus: 'focus',
	  topInput: 'input',
	  topKeyDown: 'keydown',
	  topKeyPress: 'keypress',
	  topKeyUp: 'keyup',
	  topLoadedData: 'loadeddata',
	  topLoadedMetadata: 'loadedmetadata',
	  topLoadStart: 'loadstart',
	  topMouseDown: 'mousedown',
	  topMouseMove: 'mousemove',
	  topMouseOut: 'mouseout',
	  topMouseOver: 'mouseover',
	  topMouseUp: 'mouseup',
	  topPaste: 'paste',
	  topPause: 'pause',
	  topPlay: 'play',
	  topPlaying: 'playing',
	  topProgress: 'progress',
	  topRateChange: 'ratechange',
	  topScroll: 'scroll',
	  topSeeked: 'seeked',
	  topSeeking: 'seeking',
	  topSelectionChange: 'selectionchange',
	  topStalled: 'stalled',
	  topSuspend: 'suspend',
	  topTextInput: 'textInput',
	  topTimeUpdate: 'timeupdate',
	  topTouchCancel: 'touchcancel',
	  topTouchEnd: 'touchend',
	  topTouchMove: 'touchmove',
	  topTouchStart: 'touchstart',
	  topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
	  topVolumeChange: 'volumechange',
	  topWaiting: 'waiting',
	  topWheel: 'wheel'
	};
	
	/**
	 * To ensure no conflicts with other potential React instances on the page
	 */
	var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);
	
	function getListeningForDocument(mountAt) {
	  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
	  // directly.
	  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
	    mountAt[topListenersIDKey] = reactTopListenersCounter++;
	    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
	  }
	  return alreadyListeningTo[mountAt[topListenersIDKey]];
	}
	
	/**
	 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
	 * example:
	 *
	 *   EventPluginHub.putListener('myID', 'onClick', myFunction);
	 *
	 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
	 *
	 * @internal
	 */
	var ReactBrowserEventEmitter = _assign({}, ReactEventEmitterMixin, {
	  /**
	   * Injectable event backend
	   */
	  ReactEventListener: null,
	
	  injection: {
	    /**
	     * @param {object} ReactEventListener
	     */
	    injectReactEventListener: function (ReactEventListener) {
	      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
	      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
	    }
	  },
	
	  /**
	   * Sets whether or not any created callbacks should be enabled.
	   *
	   * @param {boolean} enabled True if callbacks should be enabled.
	   */
	  setEnabled: function (enabled) {
	    if (ReactBrowserEventEmitter.ReactEventListener) {
	      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
	    }
	  },
	
	  /**
	   * @return {boolean} True if callbacks are enabled.
	   */
	  isEnabled: function () {
	    return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
	  },
	
	  /**
	   * We listen for bubbled touch events on the document object.
	   *
	   * Firefox v8.01 (and possibly others) exhibited strange behavior when
	   * mounting `onmousemove` events at some node that was not the document
	   * element. The symptoms were that if your mouse is not moving over something
	   * contained within that mount point (for example on the background) the
	   * top-level listeners for `onmousemove` won't be called. However, if you
	   * register the `mousemove` on the document object, then it will of course
	   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
	   * top-level listeners to the document object only, at least for these
	   * movement types of events and possibly all events.
	   *
	   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
	   *
	   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
	   * they bubble to document.
	   *
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {object} contentDocumentHandle Document which owns the container
	   */
	  listenTo: function (registrationName, contentDocumentHandle) {
	    var mountAt = contentDocumentHandle;
	    var isListening = getListeningForDocument(mountAt);
	    var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
	
	    for (var i = 0; i < dependencies.length; i++) {
	      var dependency = dependencies[i];
	      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
	        if (dependency === 'topWheel') {
	          if (isEventSupported('wheel')) {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'wheel', mountAt);
	          } else if (isEventSupported('mousewheel')) {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'mousewheel', mountAt);
	          } else {
	            // Firefox needs to capture a different mouse scroll event.
	            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'DOMMouseScroll', mountAt);
	          }
	        } else if (dependency === 'topScroll') {
	          if (isEventSupported('scroll', true)) {
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topScroll', 'scroll', mountAt);
	          } else {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topScroll', 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
	          }
	        } else if (dependency === 'topFocus' || dependency === 'topBlur') {
	          if (isEventSupported('focus', true)) {
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topFocus', 'focus', mountAt);
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topBlur', 'blur', mountAt);
	          } else if (isEventSupported('focusin')) {
	            // IE has `focusin` and `focusout` events which bubble.
	            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topFocus', 'focusin', mountAt);
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topBlur', 'focusout', mountAt);
	          }
	
	          // to make sure blur and focus event listeners are only attached once
	          isListening.topBlur = true;
	          isListening.topFocus = true;
	        } else if (topEventMapping.hasOwnProperty(dependency)) {
	          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
	        }
	
	        isListening[dependency] = true;
	      }
	    }
	  },
	
	  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
	  },
	
	  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
	  },
	
	  /**
	   * Protect against document.createEvent() returning null
	   * Some popup blocker extensions appear to do this:
	   * https://github.com/facebook/react/issues/6887
	   */
	  supportsEventPageXY: function () {
	    if (!document.createEvent) {
	      return false;
	    }
	    var ev = document.createEvent('MouseEvent');
	    return ev != null && 'pageX' in ev;
	  },
	
	  /**
	   * Listens to window scroll and resize events. We cache scroll values so that
	   * application code can access them without triggering reflows.
	   *
	   * ViewportMetrics is only used by SyntheticMouse/TouchEvent and only when
	   * pageX/pageY isn't supported (legacy browsers).
	   *
	   * NOTE: Scroll events do not bubble.
	   *
	   * @see http://www.quirksmode.org/dom/events/scroll.html
	   */
	  ensureScrollValueMonitoring: function () {
	    if (hasEventPageXY === undefined) {
	      hasEventPageXY = ReactBrowserEventEmitter.supportsEventPageXY();
	    }
	    if (!hasEventPageXY && !isMonitoringScrollValue) {
	      var refresh = ViewportMetrics.refreshScrollValues;
	      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
	      isMonitoringScrollValue = true;
	    }
	  }
	});
	
	module.exports = ReactBrowserEventEmitter;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var EventPluginHub = __webpack_require__(47);
	
	function runEventQueueInBatch(events) {
	  EventPluginHub.enqueueEvents(events);
	  EventPluginHub.processEventQueue(false);
	}
	
	var ReactEventEmitterMixin = {
	  /**
	   * Streams a fired top-level event to `EventPluginHub` where plugins have the
	   * opportunity to create `ReactEvent`s to be dispatched.
	   */
	  handleTopLevel: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var events = EventPluginHub.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
	    runEventQueueInBatch(events);
	  }
	};
	
	module.exports = ReactEventEmitterMixin;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(53);
	
	/**
	 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
	 *
	 * @param {string} styleProp
	 * @param {string} eventName
	 * @returns {object}
	 */
	function makePrefixMap(styleProp, eventName) {
	  var prefixes = {};
	
	  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
	  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
	  prefixes['Moz' + styleProp] = 'moz' + eventName;
	  prefixes['ms' + styleProp] = 'MS' + eventName;
	  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();
	
	  return prefixes;
	}
	
	/**
	 * A list of event names to a configurable list of vendor prefixes.
	 */
	var vendorPrefixes = {
	  animationend: makePrefixMap('Animation', 'AnimationEnd'),
	  animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
	  animationstart: makePrefixMap('Animation', 'AnimationStart'),
	  transitionend: makePrefixMap('Transition', 'TransitionEnd')
	};
	
	/**
	 * Event names that have already been detected and prefixed (if applicable).
	 */
	var prefixedEventNames = {};
	
	/**
	 * Element to check for prefixes on.
	 */
	var style = {};
	
	/**
	 * Bootstrap if a DOM exists.
	 */
	if (ExecutionEnvironment.canUseDOM) {
	  style = document.createElement('div').style;
	
	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are usable, and if not remove them from the map.
	  if (!('AnimationEvent' in window)) {
	    delete vendorPrefixes.animationend.animation;
	    delete vendorPrefixes.animationiteration.animation;
	    delete vendorPrefixes.animationstart.animation;
	  }
	
	  // Same as above
	  if (!('TransitionEvent' in window)) {
	    delete vendorPrefixes.transitionend.transition;
	  }
	}
	
	/**
	 * Attempts to determine the correct vendor prefixed event name.
	 *
	 * @param {string} eventName
	 * @returns {string}
	 */
	function getVendorPrefixedEventName(eventName) {
	  if (prefixedEventNames[eventName]) {
	    return prefixedEventNames[eventName];
	  } else if (!vendorPrefixes[eventName]) {
	    return eventName;
	  }
	
	  var prefixMap = vendorPrefixes[eventName];
	
	  for (var styleProp in prefixMap) {
	    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
	      return prefixedEventNames[eventName] = prefixMap[styleProp];
	    }
	  }
	
	  return '';
	}
	
	module.exports = getVendorPrefixedEventName;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40),
	    _assign = __webpack_require__(4);
	
	var DOMPropertyOperations = __webpack_require__(109);
	var LinkedValueUtils = __webpack_require__(115);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactUpdates = __webpack_require__(61);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	var didWarnValueLink = false;
	var didWarnCheckedLink = false;
	var didWarnValueDefaultValue = false;
	var didWarnCheckedDefaultChecked = false;
	var didWarnControlledToUncontrolled = false;
	var didWarnUncontrolledToControlled = false;
	
	function forceUpdateIfMounted() {
	  if (this._rootNodeID) {
	    // DOM component is still mounted; update
	    ReactDOMInput.updateWrapper(this);
	  }
	}
	
	function isControlled(props) {
	  var usesChecked = props.type === 'checkbox' || props.type === 'radio';
	  return usesChecked ? props.checked != null : props.value != null;
	}
	
	/**
	 * Implements an <input> host component that allows setting these optional
	 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
	 *
	 * If `checked` or `value` are not supplied (or null/undefined), user actions
	 * that affect the checked state or value will trigger updates to the element.
	 *
	 * If they are supplied (and not null/undefined), the rendered element will not
	 * trigger updates to the element. Instead, the props must change in order for
	 * the rendered element to be updated.
	 *
	 * The rendered element will be initialized as unchecked (or `defaultChecked`)
	 * with an empty value (or `defaultValue`).
	 *
	 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
	 */
	var ReactDOMInput = {
	  getHostProps: function (inst, props) {
	    var value = LinkedValueUtils.getValue(props);
	    var checked = LinkedValueUtils.getChecked(props);
	
	    var hostProps = _assign({
	      // Make sure we set .type before any other properties (setting .value
	      // before .type means .value is lost in IE11 and below)
	      type: undefined,
	      // Make sure we set .step before .value (setting .value before .step
	      // means .value is rounded on mount, based upon step precision)
	      step: undefined,
	      // Make sure we set .min & .max before .value (to ensure proper order
	      // in corner cases such as min or max deriving from value, e.g. Issue #7170)
	      min: undefined,
	      max: undefined
	    }, props, {
	      defaultChecked: undefined,
	      defaultValue: undefined,
	      value: value != null ? value : inst._wrapperState.initialValue,
	      checked: checked != null ? checked : inst._wrapperState.initialChecked,
	      onChange: inst._wrapperState.onChange
	    });
	
	    return hostProps;
	  },
	
	  mountWrapper: function (inst, props) {
	    if (process.env.NODE_ENV !== 'production') {
	      LinkedValueUtils.checkPropTypes('input', props, inst._currentElement._owner);
	
	      var owner = inst._currentElement._owner;
	
	      if (props.valueLink !== undefined && !didWarnValueLink) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '`valueLink` prop on `input` is deprecated; set `value` and `onChange` instead.') : void 0;
	        didWarnValueLink = true;
	      }
	      if (props.checkedLink !== undefined && !didWarnCheckedLink) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '`checkedLink` prop on `input` is deprecated; set `value` and `onChange` instead.') : void 0;
	        didWarnCheckedLink = true;
	      }
	      if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
	        didWarnCheckedDefaultChecked = true;
	      }
	      if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
	        didWarnValueDefaultValue = true;
	      }
	    }
	
	    var defaultValue = props.defaultValue;
	    inst._wrapperState = {
	      initialChecked: props.checked != null ? props.checked : props.defaultChecked,
	      initialValue: props.value != null ? props.value : defaultValue,
	      listeners: null,
	      onChange: _handleChange.bind(inst),
	      controlled: isControlled(props)
	    };
	  },
	
	  updateWrapper: function (inst) {
	    var props = inst._currentElement.props;
	
	    if (process.env.NODE_ENV !== 'production') {
	      var controlled = isControlled(props);
	      var owner = inst._currentElement._owner;
	
	      if (!inst._wrapperState.controlled && controlled && !didWarnUncontrolledToControlled) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '%s is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
	        didWarnUncontrolledToControlled = true;
	      }
	      if (inst._wrapperState.controlled && !controlled && !didWarnControlledToUncontrolled) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '%s is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
	        didWarnControlledToUncontrolled = true;
	      }
	    }
	
	    // TODO: Shouldn't this be getChecked(props)?
	    var checked = props.checked;
	    if (checked != null) {
	      DOMPropertyOperations.setValueForProperty(ReactDOMComponentTree.getNodeFromInstance(inst), 'checked', checked || false);
	    }
	
	    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
	    var value = LinkedValueUtils.getValue(props);
	    if (value != null) {
	      if (value === 0 && node.value === '') {
	        node.value = '0';
	        // Note: IE9 reports a number inputs as 'text', so check props instead.
	      } else if (props.type === 'number') {
	        // Simulate `input.valueAsNumber`. IE9 does not support it
	        var valueAsNumber = parseFloat(node.value, 10) || 0;
	
	        if (
	        // eslint-disable-next-line
	        value != valueAsNumber ||
	        // eslint-disable-next-line
	        value == valueAsNumber && node.value != value) {
	          // Cast `value` to a string to ensure the value is set correctly. While
	          // browsers typically do this as necessary, jsdom doesn't.
	          node.value = '' + value;
	        }
	      } else if (node.value !== '' + value) {
	        // Cast `value` to a string to ensure the value is set correctly. While
	        // browsers typically do this as necessary, jsdom doesn't.
	        node.value = '' + value;
	      }
	    } else {
	      if (props.value == null && props.defaultValue != null) {
	        // In Chrome, assigning defaultValue to certain input types triggers input validation.
	        // For number inputs, the display value loses trailing decimal points. For email inputs,
	        // Chrome raises "The specified value <x> is not a valid email address".
	        //
	        // Here we check to see if the defaultValue has actually changed, avoiding these problems
	        // when the user is inputting text
	        //
	        // https://github.com/facebook/react/issues/7253
	        if (node.defaultValue !== '' + props.defaultValue) {
	          node.defaultValue = '' + props.defaultValue;
	        }
	      }
	      if (props.checked == null && props.defaultChecked != null) {
	        node.defaultChecked = !!props.defaultChecked;
	      }
	    }
	  },
	
	  postMountWrapper: function (inst) {
	    var props = inst._currentElement.props;
	
	    // This is in postMount because we need access to the DOM node, which is not
	    // available until after the component has mounted.
	    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
	
	    // Detach value from defaultValue. We won't do anything if we're working on
	    // submit or reset inputs as those values & defaultValues are linked. They
	    // are not resetable nodes so this operation doesn't matter and actually
	    // removes browser-default values (eg "Submit Query") when no value is
	    // provided.
	
	    switch (props.type) {
	      case 'submit':
	      case 'reset':
	        break;
	      case 'color':
	      case 'date':
	      case 'datetime':
	      case 'datetime-local':
	      case 'month':
	      case 'time':
	      case 'week':
	        // This fixes the no-show issue on iOS Safari and Android Chrome:
	        // https://github.com/facebook/react/issues/7233
	        node.value = '';
	        node.value = node.defaultValue;
	        break;
	      default:
	        node.value = node.value;
	        break;
	    }
	
	    // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
	    // this is needed to work around a chrome bug where setting defaultChecked
	    // will sometimes influence the value of checked (even after detachment).
	    // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
	    // We need to temporarily unset name to avoid disrupting radio button groups.
	    var name = node.name;
	    if (name !== '') {
	      node.name = '';
	    }
	    node.defaultChecked = !node.defaultChecked;
	    node.defaultChecked = !node.defaultChecked;
	    if (name !== '') {
	      node.name = name;
	    }
	  }
	};
	
	function _handleChange(event) {
	  var props = this._currentElement.props;
	
	  var returnValue = LinkedValueUtils.executeOnChange(props, event);
	
	  // Here we use asap to wait until all updates have propagated, which
	  // is important when using controlled components within layers:
	  // https://github.com/facebook/react/issues/1698
	  ReactUpdates.asap(forceUpdateIfMounted, this);
	
	  var name = props.name;
	  if (props.type === 'radio' && name != null) {
	    var rootNode = ReactDOMComponentTree.getNodeFromInstance(this);
	    var queryRoot = rootNode;
	
	    while (queryRoot.parentNode) {
	      queryRoot = queryRoot.parentNode;
	    }
	
	    // If `rootNode.form` was non-null, then we could try `form.elements`,
	    // but that sometimes behaves strangely in IE8. We could also try using
	    // `form.getElementsByName`, but that will only return direct children
	    // and won't include inputs that use the HTML5 `form=` attribute. Since
	    // the input might not even be in a form, let's just use the global
	    // `querySelectorAll` to ensure we don't miss anything.
	    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');
	
	    for (var i = 0; i < group.length; i++) {
	      var otherNode = group[i];
	      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
	        continue;
	      }
	      // This will throw if radio buttons rendered by different copies of React
	      // and the same name are rendered into the same form (same as #1939).
	      // That's probably okay; we don't support it just as we don't support
	      // mixing React radio buttons with non-React ones.
	      var otherInstance = ReactDOMComponentTree.getInstanceFromNode(otherNode);
	      !otherInstance ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : _prodInvariant('90') : void 0;
	      // If this is a controlled radio button group, forcing the input that
	      // was previously checked to update will cause it to be come re-checked
	      // as appropriate.
	      ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
	    }
	  }
	
	  return returnValue;
	}
	
	module.exports = ReactDOMInput;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var ReactPropTypesSecret = __webpack_require__(116);
	var propTypesFactory = __webpack_require__(29);
	
	var React = __webpack_require__(2);
	var PropTypes = propTypesFactory(React.isValidElement);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	var hasReadOnlyValue = {
	  button: true,
	  checkbox: true,
	  image: true,
	  hidden: true,
	  radio: true,
	  reset: true,
	  submit: true
	};
	
	function _assertSingleLink(inputProps) {
	  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use checkedLink, you probably don\'t want to use valueLink and vice versa.') : _prodInvariant('87') : void 0;
	}
	function _assertValueLink(inputProps) {
	  _assertSingleLink(inputProps);
	  !(inputProps.value == null && inputProps.onChange == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want to use value or onChange, you probably don\'t want to use valueLink.') : _prodInvariant('88') : void 0;
	}
	
	function _assertCheckedLink(inputProps) {
	  _assertSingleLink(inputProps);
	  !(inputProps.checked == null && inputProps.onChange == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. If you want to use checked or onChange, you probably don\'t want to use checkedLink') : _prodInvariant('89') : void 0;
	}
	
	var propTypes = {
	  value: function (props, propName, componentName) {
	    if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
	      return null;
	    }
	    return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	  },
	  checked: function (props, propName, componentName) {
	    if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
	      return null;
	    }
	    return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	  },
	  onChange: PropTypes.func
	};
	
	var loggedTypeFailures = {};
	function getDeclarationErrorAddendum(owner) {
	  if (owner) {
	    var name = owner.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	/**
	 * Provide a linked `value` attribute for controlled forms. You should not use
	 * this outside of the ReactDOM controlled form components.
	 */
	var LinkedValueUtils = {
	  checkPropTypes: function (tagName, props, owner) {
	    for (var propName in propTypes) {
	      if (propTypes.hasOwnProperty(propName)) {
	        var error = propTypes[propName](props, propName, tagName, 'prop', null, ReactPropTypesSecret);
	      }
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	
	        var addendum = getDeclarationErrorAddendum(owner);
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : void 0;
	      }
	    }
	  },
	
	  /**
	   * @param {object} inputProps Props for form component
	   * @return {*} current value of the input either from value prop or link.
	   */
	  getValue: function (inputProps) {
	    if (inputProps.valueLink) {
	      _assertValueLink(inputProps);
	      return inputProps.valueLink.value;
	    }
	    return inputProps.value;
	  },
	
	  /**
	   * @param {object} inputProps Props for form component
	   * @return {*} current checked status of the input either from checked prop
	   *             or link.
	   */
	  getChecked: function (inputProps) {
	    if (inputProps.checkedLink) {
	      _assertCheckedLink(inputProps);
	      return inputProps.checkedLink.value;
	    }
	    return inputProps.checked;
	  },
	
	  /**
	   * @param {object} inputProps Props for form component
	   * @param {SyntheticEvent} event change event to handle
	   */
	  executeOnChange: function (inputProps, event) {
	    if (inputProps.valueLink) {
	      _assertValueLink(inputProps);
	      return inputProps.valueLink.requestChange(event.target.value);
	    } else if (inputProps.checkedLink) {
	      _assertCheckedLink(inputProps);
	      return inputProps.checkedLink.requestChange(event.target.checked);
	    } else if (inputProps.onChange) {
	      return inputProps.onChange.call(undefined, event);
	    }
	  }
	};
	
	module.exports = LinkedValueUtils;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 116 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var React = __webpack_require__(2);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactDOMSelect = __webpack_require__(118);
	
	var warning = __webpack_require__(8);
	var didWarnInvalidOptionChildren = false;
	
	function flattenChildren(children) {
	  var content = '';
	
	  // Flatten children and warn if they aren't strings or numbers;
	  // invalid types are ignored.
	  React.Children.forEach(children, function (child) {
	    if (child == null) {
	      return;
	    }
	    if (typeof child === 'string' || typeof child === 'number') {
	      content += child;
	    } else if (!didWarnInvalidOptionChildren) {
	      didWarnInvalidOptionChildren = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : void 0;
	    }
	  });
	
	  return content;
	}
	
	/**
	 * Implements an <option> host component that warns when `selected` is set.
	 */
	var ReactDOMOption = {
	  mountWrapper: function (inst, props, hostParent) {
	    // TODO (yungsters): Remove support for `selected` in <option>.
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : void 0;
	    }
	
	    // Look up whether this option is 'selected'
	    var selectValue = null;
	    if (hostParent != null) {
	      var selectParent = hostParent;
	
	      if (selectParent._tag === 'optgroup') {
	        selectParent = selectParent._hostParent;
	      }
	
	      if (selectParent != null && selectParent._tag === 'select') {
	        selectValue = ReactDOMSelect.getSelectValueContext(selectParent);
	      }
	    }
	
	    // If the value is null (e.g., no specified value or after initial mount)
	    // or missing (e.g., for <datalist>), we don't change props.selected
	    var selected = null;
	    if (selectValue != null) {
	      var value;
	      if (props.value != null) {
	        value = props.value + '';
	      } else {
	        value = flattenChildren(props.children);
	      }
	      selected = false;
	      if (Array.isArray(selectValue)) {
	        // multiple
	        for (var i = 0; i < selectValue.length; i++) {
	          if ('' + selectValue[i] === value) {
	            selected = true;
	            break;
	          }
	        }
	      } else {
	        selected = '' + selectValue === value;
	      }
	    }
	
	    inst._wrapperState = { selected: selected };
	  },
	
	  postMountWrapper: function (inst) {
	    // value="" should make a value attribute (#6219)
	    var props = inst._currentElement.props;
	    if (props.value != null) {
	      var node = ReactDOMComponentTree.getNodeFromInstance(inst);
	      node.setAttribute('value', props.value);
	    }
	  },
	
	  getHostProps: function (inst, props) {
	    var hostProps = _assign({ selected: undefined, children: undefined }, props);
	
	    // Read state only from initial mount because <select> updates value
	    // manually; we need the initial state only for server rendering
	    if (inst._wrapperState.selected != null) {
	      hostProps.selected = inst._wrapperState.selected;
	    }
	
	    var content = flattenChildren(props.children);
	
	    if (content) {
	      hostProps.children = content;
	    }
	
	    return hostProps;
	  }
	};
	
	module.exports = ReactDOMOption;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var LinkedValueUtils = __webpack_require__(115);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactUpdates = __webpack_require__(61);
	
	var warning = __webpack_require__(8);
	
	var didWarnValueLink = false;
	var didWarnValueDefaultValue = false;
	
	function updateOptionsIfPendingUpdateAndMounted() {
	  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
	    this._wrapperState.pendingUpdate = false;
	
	    var props = this._currentElement.props;
	    var value = LinkedValueUtils.getValue(props);
	
	    if (value != null) {
	      updateOptions(this, Boolean(props.multiple), value);
	    }
	  }
	}
	
	function getDeclarationErrorAddendum(owner) {
	  if (owner) {
	    var name = owner.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	var valuePropNames = ['value', 'defaultValue'];
	
	/**
	 * Validation function for `value` and `defaultValue`.
	 * @private
	 */
	function checkSelectPropTypes(inst, props) {
	  var owner = inst._currentElement._owner;
	  LinkedValueUtils.checkPropTypes('select', props, owner);
	
	  if (props.valueLink !== undefined && !didWarnValueLink) {
	    process.env.NODE_ENV !== 'production' ? warning(false, '`valueLink` prop on `select` is deprecated; set `value` and `onChange` instead.') : void 0;
	    didWarnValueLink = true;
	  }
	
	  for (var i = 0; i < valuePropNames.length; i++) {
	    var propName = valuePropNames[i];
	    if (props[propName] == null) {
	      continue;
	    }
	    var isArray = Array.isArray(props[propName]);
	    if (props.multiple && !isArray) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum(owner)) : void 0;
	    } else if (!props.multiple && isArray) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum(owner)) : void 0;
	    }
	  }
	}
	
	/**
	 * @param {ReactDOMComponent} inst
	 * @param {boolean} multiple
	 * @param {*} propValue A stringable (with `multiple`, a list of stringables).
	 * @private
	 */
	function updateOptions(inst, multiple, propValue) {
	  var selectedValue, i;
	  var options = ReactDOMComponentTree.getNodeFromInstance(inst).options;
	
	  if (multiple) {
	    selectedValue = {};
	    for (i = 0; i < propValue.length; i++) {
	      selectedValue['' + propValue[i]] = true;
	    }
	    for (i = 0; i < options.length; i++) {
	      var selected = selectedValue.hasOwnProperty(options[i].value);
	      if (options[i].selected !== selected) {
	        options[i].selected = selected;
	      }
	    }
	  } else {
	    // Do not set `select.value` as exact behavior isn't consistent across all
	    // browsers for all cases.
	    selectedValue = '' + propValue;
	    for (i = 0; i < options.length; i++) {
	      if (options[i].value === selectedValue) {
	        options[i].selected = true;
	        return;
	      }
	    }
	    if (options.length) {
	      options[0].selected = true;
	    }
	  }
	}
	
	/**
	 * Implements a <select> host component that allows optionally setting the
	 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
	 * stringable. If `multiple` is true, the prop must be an array of stringables.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that change the
	 * selected option will trigger updates to the rendered options.
	 *
	 * If it is supplied (and not null/undefined), the rendered options will not
	 * update in response to user actions. Instead, the `value` prop must change in
	 * order for the rendered options to update.
	 *
	 * If `defaultValue` is provided, any options with the supplied values will be
	 * selected.
	 */
	var ReactDOMSelect = {
	  getHostProps: function (inst, props) {
	    return _assign({}, props, {
	      onChange: inst._wrapperState.onChange,
	      value: undefined
	    });
	  },
	
	  mountWrapper: function (inst, props) {
	    if (process.env.NODE_ENV !== 'production') {
	      checkSelectPropTypes(inst, props);
	    }
	
	    var value = LinkedValueUtils.getValue(props);
	    inst._wrapperState = {
	      pendingUpdate: false,
	      initialValue: value != null ? value : props.defaultValue,
	      listeners: null,
	      onChange: _handleChange.bind(inst),
	      wasMultiple: Boolean(props.multiple)
	    };
	
	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : void 0;
	      didWarnValueDefaultValue = true;
	    }
	  },
	
	  getSelectValueContext: function (inst) {
	    // ReactDOMOption looks at this initial value so the initial generated
	    // markup has correct `selected` attributes
	    return inst._wrapperState.initialValue;
	  },
	
	  postUpdateWrapper: function (inst) {
	    var props = inst._currentElement.props;
	
	    // After the initial mount, we control selected-ness manually so don't pass
	    // this value down
	    inst._wrapperState.initialValue = undefined;
	
	    var wasMultiple = inst._wrapperState.wasMultiple;
	    inst._wrapperState.wasMultiple = Boolean(props.multiple);
	
	    var value = LinkedValueUtils.getValue(props);
	    if (value != null) {
	      inst._wrapperState.pendingUpdate = false;
	      updateOptions(inst, Boolean(props.multiple), value);
	    } else if (wasMultiple !== Boolean(props.multiple)) {
	      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
	      if (props.defaultValue != null) {
	        updateOptions(inst, Boolean(props.multiple), props.defaultValue);
	      } else {
	        // Revert the select back to its default unselected state.
	        updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
	      }
	    }
	  }
	};
	
	function _handleChange(event) {
	  var props = this._currentElement.props;
	  var returnValue = LinkedValueUtils.executeOnChange(props, event);
	
	  if (this._rootNodeID) {
	    this._wrapperState.pendingUpdate = true;
	  }
	  ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
	  return returnValue;
	}
	
	module.exports = ReactDOMSelect;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40),
	    _assign = __webpack_require__(4);
	
	var LinkedValueUtils = __webpack_require__(115);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactUpdates = __webpack_require__(61);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	var didWarnValueLink = false;
	var didWarnValDefaultVal = false;
	
	function forceUpdateIfMounted() {
	  if (this._rootNodeID) {
	    // DOM component is still mounted; update
	    ReactDOMTextarea.updateWrapper(this);
	  }
	}
	
	/**
	 * Implements a <textarea> host component that allows setting `value`, and
	 * `defaultValue`. This differs from the traditional DOM API because value is
	 * usually set as PCDATA children.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that affect the
	 * value will trigger updates to the element.
	 *
	 * If `value` is supplied (and not null/undefined), the rendered element will
	 * not trigger updates to the element. Instead, the `value` prop must change in
	 * order for the rendered element to be updated.
	 *
	 * The rendered element will be initialized with an empty value, the prop
	 * `defaultValue` if specified, or the children content (deprecated).
	 */
	var ReactDOMTextarea = {
	  getHostProps: function (inst, props) {
	    !(props.dangerouslySetInnerHTML == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : _prodInvariant('91') : void 0;
	
	    // Always set children to the same thing. In IE9, the selection range will
	    // get reset if `textContent` is mutated.  We could add a check in setTextContent
	    // to only set the value if/when the value differs from the node value (which would
	    // completely solve this IE9 bug), but Sebastian+Ben seemed to like this solution.
	    // The value can be a boolean or object so that's why it's forced to be a string.
	    var hostProps = _assign({}, props, {
	      value: undefined,
	      defaultValue: undefined,
	      children: '' + inst._wrapperState.initialValue,
	      onChange: inst._wrapperState.onChange
	    });
	
	    return hostProps;
	  },
	
	  mountWrapper: function (inst, props) {
	    if (process.env.NODE_ENV !== 'production') {
	      LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
	      if (props.valueLink !== undefined && !didWarnValueLink) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '`valueLink` prop on `textarea` is deprecated; set `value` and `onChange` instead.') : void 0;
	        didWarnValueLink = true;
	      }
	      if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : void 0;
	        didWarnValDefaultVal = true;
	      }
	    }
	
	    var value = LinkedValueUtils.getValue(props);
	    var initialValue = value;
	
	    // Only bother fetching default value if we're going to use it
	    if (value == null) {
	      var defaultValue = props.defaultValue;
	      // TODO (yungsters): Remove support for children content in <textarea>.
	      var children = props.children;
	      if (children != null) {
	        if (process.env.NODE_ENV !== 'production') {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : void 0;
	        }
	        !(defaultValue == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : _prodInvariant('92') : void 0;
	        if (Array.isArray(children)) {
	          !(children.length <= 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : _prodInvariant('93') : void 0;
	          children = children[0];
	        }
	
	        defaultValue = '' + children;
	      }
	      if (defaultValue == null) {
	        defaultValue = '';
	      }
	      initialValue = defaultValue;
	    }
	
	    inst._wrapperState = {
	      initialValue: '' + initialValue,
	      listeners: null,
	      onChange: _handleChange.bind(inst)
	    };
	  },
	
	  updateWrapper: function (inst) {
	    var props = inst._currentElement.props;
	
	    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
	    var value = LinkedValueUtils.getValue(props);
	    if (value != null) {
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      var newValue = '' + value;
	
	      // To avoid side effects (such as losing text selection), only set value if changed
	      if (newValue !== node.value) {
	        node.value = newValue;
	      }
	      if (props.defaultValue == null) {
	        node.defaultValue = newValue;
	      }
	    }
	    if (props.defaultValue != null) {
	      node.defaultValue = props.defaultValue;
	    }
	  },
	
	  postMountWrapper: function (inst) {
	    // This is in postMount because we need access to the DOM node, which is not
	    // available until after the component has mounted.
	    var node = ReactDOMComponentTree.getNodeFromInstance(inst);
	    var textContent = node.textContent;
	
	    // Only set node.value if textContent is equal to the expected
	    // initial value. In IE10/IE11 there is a bug where the placeholder attribute
	    // will populate textContent as well.
	    // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
	    if (textContent === inst._wrapperState.initialValue) {
	      node.value = textContent;
	    }
	  }
	};
	
	function _handleChange(event) {
	  var props = this._currentElement.props;
	  var returnValue = LinkedValueUtils.executeOnChange(props, event);
	  ReactUpdates.asap(forceUpdateIfMounted, this);
	  return returnValue;
	}
	
	module.exports = ReactDOMTextarea;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var ReactComponentEnvironment = __webpack_require__(121);
	var ReactInstanceMap = __webpack_require__(122);
	var ReactInstrumentation = __webpack_require__(67);
	
	var ReactCurrentOwner = __webpack_require__(17);
	var ReactReconciler = __webpack_require__(64);
	var ReactChildReconciler = __webpack_require__(123);
	
	var emptyFunction = __webpack_require__(9);
	var flattenChildren = __webpack_require__(138);
	var invariant = __webpack_require__(12);
	
	/**
	 * Make an update for markup to be rendered and inserted at a supplied index.
	 *
	 * @param {string} markup Markup that renders into an element.
	 * @param {number} toIndex Destination index.
	 * @private
	 */
	function makeInsertMarkup(markup, afterNode, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'INSERT_MARKUP',
	    content: markup,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: toIndex,
	    afterNode: afterNode
	  };
	}
	
	/**
	 * Make an update for moving an existing element to another index.
	 *
	 * @param {number} fromIndex Source index of the existing element.
	 * @param {number} toIndex Destination index of the element.
	 * @private
	 */
	function makeMove(child, afterNode, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'MOVE_EXISTING',
	    content: null,
	    fromIndex: child._mountIndex,
	    fromNode: ReactReconciler.getHostNode(child),
	    toIndex: toIndex,
	    afterNode: afterNode
	  };
	}
	
	/**
	 * Make an update for removing an element at an index.
	 *
	 * @param {number} fromIndex Index of the element to remove.
	 * @private
	 */
	function makeRemove(child, node) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'REMOVE_NODE',
	    content: null,
	    fromIndex: child._mountIndex,
	    fromNode: node,
	    toIndex: null,
	    afterNode: null
	  };
	}
	
	/**
	 * Make an update for setting the markup of a node.
	 *
	 * @param {string} markup Markup that renders into an element.
	 * @private
	 */
	function makeSetMarkup(markup) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'SET_MARKUP',
	    content: markup,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: null,
	    afterNode: null
	  };
	}
	
	/**
	 * Make an update for setting the text content.
	 *
	 * @param {string} textContent Text content to set.
	 * @private
	 */
	function makeTextContent(textContent) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'TEXT_CONTENT',
	    content: textContent,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: null,
	    afterNode: null
	  };
	}
	
	/**
	 * Push an update, if any, onto the queue. Creates a new queue if none is
	 * passed and always returns the queue. Mutative.
	 */
	function enqueue(queue, update) {
	  if (update) {
	    queue = queue || [];
	    queue.push(update);
	  }
	  return queue;
	}
	
	/**
	 * Processes any enqueued updates.
	 *
	 * @private
	 */
	function processQueue(inst, updateQueue) {
	  ReactComponentEnvironment.processChildrenUpdates(inst, updateQueue);
	}
	
	var setChildrenForInstrumentation = emptyFunction;
	if (process.env.NODE_ENV !== 'production') {
	  var getDebugID = function (inst) {
	    if (!inst._debugID) {
	      // Check for ART-like instances. TODO: This is silly/gross.
	      var internal;
	      if (internal = ReactInstanceMap.get(inst)) {
	        inst = internal;
	      }
	    }
	    return inst._debugID;
	  };
	  setChildrenForInstrumentation = function (children) {
	    var debugID = getDebugID(this);
	    // TODO: React Native empty components are also multichild.
	    // This means they still get into this method but don't have _debugID.
	    if (debugID !== 0) {
	      ReactInstrumentation.debugTool.onSetChildren(debugID, children ? Object.keys(children).map(function (key) {
	        return children[key]._debugID;
	      }) : []);
	    }
	  };
	}
	
	/**
	 * ReactMultiChild are capable of reconciling multiple children.
	 *
	 * @class ReactMultiChild
	 * @internal
	 */
	var ReactMultiChild = {
	  /**
	   * Provides common functionality for components that must reconcile multiple
	   * children. This is used by `ReactDOMComponent` to mount, update, and
	   * unmount child components.
	   *
	   * @lends {ReactMultiChild.prototype}
	   */
	  Mixin: {
	    _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {
	      if (process.env.NODE_ENV !== 'production') {
	        var selfDebugID = getDebugID(this);
	        if (this._currentElement) {
	          try {
	            ReactCurrentOwner.current = this._currentElement._owner;
	            return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context, selfDebugID);
	          } finally {
	            ReactCurrentOwner.current = null;
	          }
	        }
	      }
	      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
	    },
	
	    _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context) {
	      var nextChildren;
	      var selfDebugID = 0;
	      if (process.env.NODE_ENV !== 'production') {
	        selfDebugID = getDebugID(this);
	        if (this._currentElement) {
	          try {
	            ReactCurrentOwner.current = this._currentElement._owner;
	            nextChildren = flattenChildren(nextNestedChildrenElements, selfDebugID);
	          } finally {
	            ReactCurrentOwner.current = null;
	          }
	          ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
	          return nextChildren;
	        }
	      }
	      nextChildren = flattenChildren(nextNestedChildrenElements, selfDebugID);
	      ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
	      return nextChildren;
	    },
	
	    /**
	     * Generates a "mount image" for each of the supplied children. In the case
	     * of `ReactDOMComponent`, a mount image is a string of markup.
	     *
	     * @param {?object} nestedChildren Nested child maps.
	     * @return {array} An array of mounted representations.
	     * @internal
	     */
	    mountChildren: function (nestedChildren, transaction, context) {
	      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
	      this._renderedChildren = children;
	
	      var mountImages = [];
	      var index = 0;
	      for (var name in children) {
	        if (children.hasOwnProperty(name)) {
	          var child = children[name];
	          var selfDebugID = 0;
	          if (process.env.NODE_ENV !== 'production') {
	            selfDebugID = getDebugID(this);
	          }
	          var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._hostContainerInfo, context, selfDebugID);
	          child._mountIndex = index++;
	          mountImages.push(mountImage);
	        }
	      }
	
	      if (process.env.NODE_ENV !== 'production') {
	        setChildrenForInstrumentation.call(this, children);
	      }
	
	      return mountImages;
	    },
	
	    /**
	     * Replaces any rendered children with a text content string.
	     *
	     * @param {string} nextContent String of content.
	     * @internal
	     */
	    updateTextContent: function (nextContent) {
	      var prevChildren = this._renderedChildren;
	      // Remove any rendered children.
	      ReactChildReconciler.unmountChildren(prevChildren, false);
	      for (var name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name)) {
	           true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
	        }
	      }
	      // Set new text content.
	      var updates = [makeTextContent(nextContent)];
	      processQueue(this, updates);
	    },
	
	    /**
	     * Replaces any rendered children with a markup string.
	     *
	     * @param {string} nextMarkup String of markup.
	     * @internal
	     */
	    updateMarkup: function (nextMarkup) {
	      var prevChildren = this._renderedChildren;
	      // Remove any rendered children.
	      ReactChildReconciler.unmountChildren(prevChildren, false);
	      for (var name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name)) {
	           true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
	        }
	      }
	      var updates = [makeSetMarkup(nextMarkup)];
	      processQueue(this, updates);
	    },
	
	    /**
	     * Updates the rendered children with new children.
	     *
	     * @param {?object} nextNestedChildrenElements Nested child element maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    updateChildren: function (nextNestedChildrenElements, transaction, context) {
	      // Hook used by React ART
	      this._updateChildren(nextNestedChildrenElements, transaction, context);
	    },
	
	    /**
	     * @param {?object} nextNestedChildrenElements Nested child element maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @final
	     * @protected
	     */
	    _updateChildren: function (nextNestedChildrenElements, transaction, context) {
	      var prevChildren = this._renderedChildren;
	      var removedNodes = {};
	      var mountImages = [];
	      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context);
	      if (!nextChildren && !prevChildren) {
	        return;
	      }
	      var updates = null;
	      var name;
	      // `nextIndex` will increment for each child in `nextChildren`, but
	      // `lastIndex` will be the last index visited in `prevChildren`.
	      var nextIndex = 0;
	      var lastIndex = 0;
	      // `nextMountIndex` will increment for each newly mounted child.
	      var nextMountIndex = 0;
	      var lastPlacedNode = null;
	      for (name in nextChildren) {
	        if (!nextChildren.hasOwnProperty(name)) {
	          continue;
	        }
	        var prevChild = prevChildren && prevChildren[name];
	        var nextChild = nextChildren[name];
	        if (prevChild === nextChild) {
	          updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
	          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	          prevChild._mountIndex = nextIndex;
	        } else {
	          if (prevChild) {
	            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
	            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	            // The `removedNodes` loop below will actually remove the child.
	          }
	          // The child must be instantiated before it's mounted.
	          updates = enqueue(updates, this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], lastPlacedNode, nextIndex, transaction, context));
	          nextMountIndex++;
	        }
	        nextIndex++;
	        lastPlacedNode = ReactReconciler.getHostNode(nextChild);
	      }
	      // Remove children that are no longer present.
	      for (name in removedNodes) {
	        if (removedNodes.hasOwnProperty(name)) {
	          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
	        }
	      }
	      if (updates) {
	        processQueue(this, updates);
	      }
	      this._renderedChildren = nextChildren;
	
	      if (process.env.NODE_ENV !== 'production') {
	        setChildrenForInstrumentation.call(this, nextChildren);
	      }
	    },
	
	    /**
	     * Unmounts all rendered children. This should be used to clean up children
	     * when this component is unmounted. It does not actually perform any
	     * backend operations.
	     *
	     * @internal
	     */
	    unmountChildren: function (safely) {
	      var renderedChildren = this._renderedChildren;
	      ReactChildReconciler.unmountChildren(renderedChildren, safely);
	      this._renderedChildren = null;
	    },
	
	    /**
	     * Moves a child component to the supplied index.
	     *
	     * @param {ReactComponent} child Component to move.
	     * @param {number} toIndex Destination index of the element.
	     * @param {number} lastIndex Last index visited of the siblings of `child`.
	     * @protected
	     */
	    moveChild: function (child, afterNode, toIndex, lastIndex) {
	      // If the index of `child` is less than `lastIndex`, then it needs to
	      // be moved. Otherwise, we do not need to move it because a child will be
	      // inserted or moved before `child`.
	      if (child._mountIndex < lastIndex) {
	        return makeMove(child, afterNode, toIndex);
	      }
	    },
	
	    /**
	     * Creates a child component.
	     *
	     * @param {ReactComponent} child Component to create.
	     * @param {string} mountImage Markup to insert.
	     * @protected
	     */
	    createChild: function (child, afterNode, mountImage) {
	      return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
	    },
	
	    /**
	     * Removes a child component.
	     *
	     * @param {ReactComponent} child Child to remove.
	     * @protected
	     */
	    removeChild: function (child, node) {
	      return makeRemove(child, node);
	    },
	
	    /**
	     * Mounts a child with the supplied name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to mount.
	     * @param {string} name Name of the child.
	     * @param {number} index Index at which to insert the child.
	     * @param {ReactReconcileTransaction} transaction
	     * @private
	     */
	    _mountChildAtIndex: function (child, mountImage, afterNode, index, transaction, context) {
	      child._mountIndex = index;
	      return this.createChild(child, afterNode, mountImage);
	    },
	
	    /**
	     * Unmounts a rendered child.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to unmount.
	     * @private
	     */
	    _unmountChild: function (child, node) {
	      var update = this.removeChild(child, node);
	      child._mountIndex = null;
	      return update;
	    }
	  }
	};
	
	module.exports = ReactMultiChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	var injected = false;
	
	var ReactComponentEnvironment = {
	  /**
	   * Optionally injectable hook for swapping out mount images in the middle of
	   * the tree.
	   */
	  replaceNodeWithMarkup: null,
	
	  /**
	   * Optionally injectable hook for processing a queue of child updates. Will
	   * later move into MultiChildComponents.
	   */
	  processChildrenUpdates: null,
	
	  injection: {
	    injectEnvironment: function (environment) {
	      !!injected ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : _prodInvariant('104') : void 0;
	      ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
	      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
	      injected = true;
	    }
	  }
	};
	
	module.exports = ReactComponentEnvironment;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 122 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * `ReactInstanceMap` maintains a mapping from a public facing stateful
	 * instance (key) and the internal representation (value). This allows public
	 * methods to accept the user facing instance as an argument and map them back
	 * to internal methods.
	 */
	
	// TODO: Replace this with ES6: var ReactInstanceMap = new Map();
	
	var ReactInstanceMap = {
	  /**
	   * This API should be called `delete` but we'd have to make sure to always
	   * transform these to strings for IE support. When this transform is fully
	   * supported we can rename it.
	   */
	  remove: function (key) {
	    key._reactInternalInstance = undefined;
	  },
	
	  get: function (key) {
	    return key._reactInternalInstance;
	  },
	
	  has: function (key) {
	    return key._reactInternalInstance !== undefined;
	  },
	
	  set: function (key, value) {
	    key._reactInternalInstance = value;
	  }
	};
	
	module.exports = ReactInstanceMap;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactReconciler = __webpack_require__(64);
	
	var instantiateReactComponent = __webpack_require__(124);
	var KeyEscapeUtils = __webpack_require__(134);
	var shouldUpdateReactComponent = __webpack_require__(130);
	var traverseAllChildren = __webpack_require__(135);
	var warning = __webpack_require__(8);
	
	var ReactComponentTreeHook;
	
	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(24);
	}
	
	function instantiateChild(childInstances, child, name, selfDebugID) {
	  // We found a component instance.
	  var keyUnique = childInstances[name] === undefined;
	  if (process.env.NODE_ENV !== 'production') {
	    if (!ReactComponentTreeHook) {
	      ReactComponentTreeHook = __webpack_require__(24);
	    }
	    if (!keyUnique) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID)) : void 0;
	    }
	  }
	  if (child != null && keyUnique) {
	    childInstances[name] = instantiateReactComponent(child, true);
	  }
	}
	
	/**
	 * ReactChildReconciler provides helpers for initializing or updating a set of
	 * children. Its output is suitable for passing it onto ReactMultiChild which
	 * does diffed reordering and insertion.
	 */
	var ReactChildReconciler = {
	  /**
	   * Generates a "mount image" for each of the supplied children. In the case
	   * of `ReactDOMComponent`, a mount image is a string of markup.
	   *
	   * @param {?object} nestedChildNodes Nested child maps.
	   * @return {?object} A set of child instances.
	   * @internal
	   */
	  instantiateChildren: function (nestedChildNodes, transaction, context, selfDebugID) // 0 in production and for roots
	  {
	    if (nestedChildNodes == null) {
	      return null;
	    }
	    var childInstances = {};
	
	    if (process.env.NODE_ENV !== 'production') {
	      traverseAllChildren(nestedChildNodes, function (childInsts, child, name) {
	        return instantiateChild(childInsts, child, name, selfDebugID);
	      }, childInstances);
	    } else {
	      traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
	    }
	    return childInstances;
	  },
	
	  /**
	   * Updates the rendered children and returns a new set of children.
	   *
	   * @param {?object} prevChildren Previously initialized set of children.
	   * @param {?object} nextChildren Flat child element maps.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @return {?object} A new set of child instances.
	   * @internal
	   */
	  updateChildren: function (prevChildren, nextChildren, mountImages, removedNodes, transaction, hostParent, hostContainerInfo, context, selfDebugID) // 0 in production and for roots
	  {
	    // We currently don't have a way to track moves here but if we use iterators
	    // instead of for..in we can zip the iterators and check if an item has
	    // moved.
	    // TODO: If nothing has changed, return the prevChildren object so that we
	    // can quickly bailout if nothing has changed.
	    if (!nextChildren && !prevChildren) {
	      return;
	    }
	    var name;
	    var prevChild;
	    for (name in nextChildren) {
	      if (!nextChildren.hasOwnProperty(name)) {
	        continue;
	      }
	      prevChild = prevChildren && prevChildren[name];
	      var prevElement = prevChild && prevChild._currentElement;
	      var nextElement = nextChildren[name];
	      if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
	        ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
	        nextChildren[name] = prevChild;
	      } else {
	        if (prevChild) {
	          removedNodes[name] = ReactReconciler.getHostNode(prevChild);
	          ReactReconciler.unmountComponent(prevChild, false);
	        }
	        // The child must be instantiated before it's mounted.
	        var nextChildInstance = instantiateReactComponent(nextElement, true);
	        nextChildren[name] = nextChildInstance;
	        // Creating mount image now ensures refs are resolved in right order
	        // (see https://github.com/facebook/react/pull/7101 for explanation).
	        var nextChildMountImage = ReactReconciler.mountComponent(nextChildInstance, transaction, hostParent, hostContainerInfo, context, selfDebugID);
	        mountImages.push(nextChildMountImage);
	      }
	    }
	    // Unmount children that are no longer present.
	    for (name in prevChildren) {
	      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
	        prevChild = prevChildren[name];
	        removedNodes[name] = ReactReconciler.getHostNode(prevChild);
	        ReactReconciler.unmountComponent(prevChild, false);
	      }
	    }
	  },
	
	  /**
	   * Unmounts all rendered children. This should be used to clean up children
	   * when this component is unmounted.
	   *
	   * @param {?object} renderedChildren Previously initialized set of children.
	   * @internal
	   */
	  unmountChildren: function (renderedChildren, safely) {
	    for (var name in renderedChildren) {
	      if (renderedChildren.hasOwnProperty(name)) {
	        var renderedChild = renderedChildren[name];
	        ReactReconciler.unmountComponent(renderedChild, safely);
	      }
	    }
	  }
	};
	
	module.exports = ReactChildReconciler;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40),
	    _assign = __webpack_require__(4);
	
	var ReactCompositeComponent = __webpack_require__(125);
	var ReactEmptyComponent = __webpack_require__(131);
	var ReactHostComponent = __webpack_require__(132);
	
	var getNextDebugID = __webpack_require__(133);
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	// To avoid a cyclic dependency, we create the final class in this module
	var ReactCompositeComponentWrapper = function (element) {
	  this.construct(element);
	};
	
	function getDeclarationErrorAddendum(owner) {
	  if (owner) {
	    var name = owner.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	/**
	 * Check if the type reference is a known internal type. I.e. not a user
	 * provided composite type.
	 *
	 * @param {function} type
	 * @return {boolean} Returns true if this is a valid internal type.
	 */
	function isInternalComponentType(type) {
	  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
	}
	
	/**
	 * Given a ReactNode, create an instance that will actually be mounted.
	 *
	 * @param {ReactNode} node
	 * @param {boolean} shouldHaveDebugID
	 * @return {object} A new instance of the element's constructor.
	 * @protected
	 */
	function instantiateReactComponent(node, shouldHaveDebugID) {
	  var instance;
	
	  if (node === null || node === false) {
	    instance = ReactEmptyComponent.create(instantiateReactComponent);
	  } else if (typeof node === 'object') {
	    var element = node;
	    var type = element.type;
	    if (typeof type !== 'function' && typeof type !== 'string') {
	      var info = '';
	      if (process.env.NODE_ENV !== 'production') {
	        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	          info += ' You likely forgot to export your component from the file ' + "it's defined in.";
	        }
	      }
	      info += getDeclarationErrorAddendum(element._owner);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info) : _prodInvariant('130', type == null ? type : typeof type, info) : void 0;
	    }
	
	    // Special case string values
	    if (typeof element.type === 'string') {
	      instance = ReactHostComponent.createInternalComponent(element);
	    } else if (isInternalComponentType(element.type)) {
	      // This is temporarily available for custom components that are not string
	      // representations. I.e. ART. Once those are updated to use the string
	      // representation, we can drop this code path.
	      instance = new element.type(element);
	
	      // We renamed this. Allow the old name for compat. :(
	      if (!instance.getHostNode) {
	        instance.getHostNode = instance.getNativeNode;
	      }
	    } else {
	      instance = new ReactCompositeComponentWrapper(element);
	    }
	  } else if (typeof node === 'string' || typeof node === 'number') {
	    instance = ReactHostComponent.createInstanceForText(node);
	  } else {
	     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : _prodInvariant('131', typeof node) : void 0;
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getHostNode === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : void 0;
	  }
	
	  // These two fields are used by the DOM and ART diffing algorithms
	  // respectively. Instead of using expandos on components, we should be
	  // storing the state needed by the diffing algorithms elsewhere.
	  instance._mountIndex = 0;
	  instance._mountImage = null;
	
	  if (process.env.NODE_ENV !== 'production') {
	    instance._debugID = shouldHaveDebugID ? getNextDebugID() : 0;
	  }
	
	  // Internal instances should fully constructed at this point, so they should
	  // not get any new fields added to them at this point.
	  if (process.env.NODE_ENV !== 'production') {
	    if (Object.preventExtensions) {
	      Object.preventExtensions(instance);
	    }
	  }
	
	  return instance;
	}
	
	_assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent, {
	  _instantiateReactComponent: instantiateReactComponent
	});
	
	module.exports = instantiateReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40),
	    _assign = __webpack_require__(4);
	
	var React = __webpack_require__(2);
	var ReactComponentEnvironment = __webpack_require__(121);
	var ReactCurrentOwner = __webpack_require__(17);
	var ReactErrorUtils = __webpack_require__(50);
	var ReactInstanceMap = __webpack_require__(122);
	var ReactInstrumentation = __webpack_require__(67);
	var ReactNodeTypes = __webpack_require__(126);
	var ReactReconciler = __webpack_require__(64);
	
	if (process.env.NODE_ENV !== 'production') {
	  var checkReactTypeSpec = __webpack_require__(127);
	}
	
	var emptyObject = __webpack_require__(11);
	var invariant = __webpack_require__(12);
	var shallowEqual = __webpack_require__(129);
	var shouldUpdateReactComponent = __webpack_require__(130);
	var warning = __webpack_require__(8);
	
	var CompositeTypes = {
	  ImpureClass: 0,
	  PureClass: 1,
	  StatelessFunctional: 2
	};
	
	function StatelessComponent(Component) {}
	StatelessComponent.prototype.render = function () {
	  var Component = ReactInstanceMap.get(this)._currentElement.type;
	  var element = Component(this.props, this.context, this.updater);
	  warnIfInvalidElement(Component, element);
	  return element;
	};
	
	function warnIfInvalidElement(Component, element) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(element === null || element === false || React.isValidElement(element), '%s(...): A valid React element (or null) must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : void 0;
	    process.env.NODE_ENV !== 'production' ? warning(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component') : void 0;
	  }
	}
	
	function shouldConstruct(Component) {
	  return !!(Component.prototype && Component.prototype.isReactComponent);
	}
	
	function isPureComponent(Component) {
	  return !!(Component.prototype && Component.prototype.isPureReactComponent);
	}
	
	// Separated into a function to contain deoptimizations caused by try/finally.
	function measureLifeCyclePerf(fn, debugID, timerType) {
	  if (debugID === 0) {
	    // Top-level wrappers (see ReactMount) and empty components (see
	    // ReactDOMEmptyComponent) are invisible to hooks and devtools.
	    // Both are implementation details that should go away in the future.
	    return fn();
	  }
	
	  ReactInstrumentation.debugTool.onBeginLifeCycleTimer(debugID, timerType);
	  try {
	    return fn();
	  } finally {
	    ReactInstrumentation.debugTool.onEndLifeCycleTimer(debugID, timerType);
	  }
	}
	
	/**
	 * ------------------ The Life-Cycle of a Composite Component ------------------
	 *
	 * - constructor: Initialization of state. The instance is now retained.
	 *   - componentWillMount
	 *   - render
	 *   - [children's constructors]
	 *     - [children's componentWillMount and render]
	 *     - [children's componentDidMount]
	 *     - componentDidMount
	 *
	 *       Update Phases:
	 *       - componentWillReceiveProps (only called if parent updated)
	 *       - shouldComponentUpdate
	 *         - componentWillUpdate
	 *           - render
	 *           - [children's constructors or receive props phases]
	 *         - componentDidUpdate
	 *
	 *     - componentWillUnmount
	 *     - [children's componentWillUnmount]
	 *   - [children destroyed]
	 * - (destroyed): The instance is now blank, released by React and ready for GC.
	 *
	 * -----------------------------------------------------------------------------
	 */
	
	/**
	 * An incrementing ID assigned to each component when it is mounted. This is
	 * used to enforce the order in which `ReactUpdates` updates dirty components.
	 *
	 * @private
	 */
	var nextMountID = 1;
	
	/**
	 * @lends {ReactCompositeComponent.prototype}
	 */
	var ReactCompositeComponent = {
	  /**
	   * Base constructor for all composite component.
	   *
	   * @param {ReactElement} element
	   * @final
	   * @internal
	   */
	  construct: function (element) {
	    this._currentElement = element;
	    this._rootNodeID = 0;
	    this._compositeType = null;
	    this._instance = null;
	    this._hostParent = null;
	    this._hostContainerInfo = null;
	
	    // See ReactUpdateQueue
	    this._updateBatchNumber = null;
	    this._pendingElement = null;
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	
	    this._renderedNodeType = null;
	    this._renderedComponent = null;
	    this._context = null;
	    this._mountOrder = 0;
	    this._topLevelWrapper = null;
	
	    // See ReactUpdates and ReactUpdateQueue.
	    this._pendingCallbacks = null;
	
	    // ComponentWillUnmount shall only be called once
	    this._calledComponentWillUnmount = false;
	
	    if (process.env.NODE_ENV !== 'production') {
	      this._warnedAboutRefsInRender = false;
	    }
	  },
	
	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?object} hostParent
	   * @param {?object} hostContainerInfo
	   * @param {?object} context
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
	    var _this = this;
	
	    this._context = context;
	    this._mountOrder = nextMountID++;
	    this._hostParent = hostParent;
	    this._hostContainerInfo = hostContainerInfo;
	
	    var publicProps = this._currentElement.props;
	    var publicContext = this._processContext(context);
	
	    var Component = this._currentElement.type;
	
	    var updateQueue = transaction.getUpdateQueue();
	
	    // Initialize the public class
	    var doConstruct = shouldConstruct(Component);
	    var inst = this._constructComponent(doConstruct, publicProps, publicContext, updateQueue);
	    var renderedElement;
	
	    // Support functional components
	    if (!doConstruct && (inst == null || inst.render == null)) {
	      renderedElement = inst;
	      warnIfInvalidElement(Component, renderedElement);
	      !(inst === null || inst === false || React.isValidElement(inst)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : _prodInvariant('105', Component.displayName || Component.name || 'Component') : void 0;
	      inst = new StatelessComponent(Component);
	      this._compositeType = CompositeTypes.StatelessFunctional;
	    } else {
	      if (isPureComponent(Component)) {
	        this._compositeType = CompositeTypes.PureClass;
	      } else {
	        this._compositeType = CompositeTypes.ImpureClass;
	      }
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      // This will throw later in _renderValidatedComponent, but add an early
	      // warning now to help debugging
	      if (inst.render == null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', Component.displayName || Component.name || 'Component') : void 0;
	      }
	
	      var propsMutated = inst.props !== publicProps;
	      var componentName = Component.displayName || Component.name || 'Component';
	
	      process.env.NODE_ENV !== 'production' ? warning(inst.props === undefined || !propsMutated, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", componentName, componentName) : void 0;
	    }
	
	    // These should be set up in the constructor, but as a convenience for
	    // simpler class abstractions, we set them up after the fact.
	    inst.props = publicProps;
	    inst.context = publicContext;
	    inst.refs = emptyObject;
	    inst.updater = updateQueue;
	
	    this._instance = inst;
	
	    // Store a reference from the instance back to the internal representation
	    ReactInstanceMap.set(inst, this);
	
	    if (process.env.NODE_ENV !== 'production') {
	      // Since plain JS classes are defined without any special initialization
	      // logic, we can not catch common errors early. Therefore, we have to
	      // catch them here, at initialization time, instead.
	      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved || inst.state, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : void 0;
	    }
	
	    var initialState = inst.state;
	    if (initialState === undefined) {
	      inst.state = initialState = null;
	    }
	    !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : _prodInvariant('106', this.getName() || 'ReactCompositeComponent') : void 0;
	
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	
	    var markup;
	    if (inst.unstable_handleError) {
	      markup = this.performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    } else {
	      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    }
	
	    if (inst.componentDidMount) {
	      if (process.env.NODE_ENV !== 'production') {
	        transaction.getReactMountReady().enqueue(function () {
	          measureLifeCyclePerf(function () {
	            return inst.componentDidMount();
	          }, _this._debugID, 'componentDidMount');
	        });
	      } else {
	        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
	      }
	    }
	
	    return markup;
	  },
	
	  _constructComponent: function (doConstruct, publicProps, publicContext, updateQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      ReactCurrentOwner.current = this;
	      try {
	        return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
	      } finally {
	        ReactCurrentOwner.current = null;
	      }
	    } else {
	      return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
	    }
	  },
	
	  _constructComponentWithoutOwner: function (doConstruct, publicProps, publicContext, updateQueue) {
	    var Component = this._currentElement.type;
	
	    if (doConstruct) {
	      if (process.env.NODE_ENV !== 'production') {
	        return measureLifeCyclePerf(function () {
	          return new Component(publicProps, publicContext, updateQueue);
	        }, this._debugID, 'ctor');
	      } else {
	        return new Component(publicProps, publicContext, updateQueue);
	      }
	    }
	
	    // This can still be an instance in case of factory components
	    // but we'll count this as time spent rendering as the more common case.
	    if (process.env.NODE_ENV !== 'production') {
	      return measureLifeCyclePerf(function () {
	        return Component(publicProps, publicContext, updateQueue);
	      }, this._debugID, 'render');
	    } else {
	      return Component(publicProps, publicContext, updateQueue);
	    }
	  },
	
	  performInitialMountWithErrorHandling: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
	    var markup;
	    var checkpoint = transaction.checkpoint();
	    try {
	      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    } catch (e) {
	      // Roll back to checkpoint, handle error (which may add items to the transaction), and take a new checkpoint
	      transaction.rollback(checkpoint);
	      this._instance.unstable_handleError(e);
	      if (this._pendingStateQueue) {
	        this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
	      }
	      checkpoint = transaction.checkpoint();
	
	      this._renderedComponent.unmountComponent(true);
	      transaction.rollback(checkpoint);
	
	      // Try again - we've informed the component about the error, so they can render an error message this time.
	      // If this throws again, the error will bubble up (and can be caught by a higher error boundary).
	      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    }
	    return markup;
	  },
	
	  performInitialMount: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
	    var inst = this._instance;
	
	    var debugID = 0;
	    if (process.env.NODE_ENV !== 'production') {
	      debugID = this._debugID;
	    }
	
	    if (inst.componentWillMount) {
	      if (process.env.NODE_ENV !== 'production') {
	        measureLifeCyclePerf(function () {
	          return inst.componentWillMount();
	        }, debugID, 'componentWillMount');
	      } else {
	        inst.componentWillMount();
	      }
	      // When mounting, calls to `setState` by `componentWillMount` will set
	      // `this._pendingStateQueue` without triggering a re-render.
	      if (this._pendingStateQueue) {
	        inst.state = this._processPendingState(inst.props, inst.context);
	      }
	    }
	
	    // If not a stateless component, we now render
	    if (renderedElement === undefined) {
	      renderedElement = this._renderValidatedComponent();
	    }
	
	    var nodeType = ReactNodeTypes.getType(renderedElement);
	    this._renderedNodeType = nodeType;
	    var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
	    );
	    this._renderedComponent = child;
	
	    var markup = ReactReconciler.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context), debugID);
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (debugID !== 0) {
	        var childDebugIDs = child._debugID !== 0 ? [child._debugID] : [];
	        ReactInstrumentation.debugTool.onSetChildren(debugID, childDebugIDs);
	      }
	    }
	
	    return markup;
	  },
	
	  getHostNode: function () {
	    return ReactReconciler.getHostNode(this._renderedComponent);
	  },
	
	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function (safely) {
	    if (!this._renderedComponent) {
	      return;
	    }
	
	    var inst = this._instance;
	
	    if (inst.componentWillUnmount && !inst._calledComponentWillUnmount) {
	      inst._calledComponentWillUnmount = true;
	
	      if (safely) {
	        var name = this.getName() + '.componentWillUnmount()';
	        ReactErrorUtils.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          measureLifeCyclePerf(function () {
	            return inst.componentWillUnmount();
	          }, this._debugID, 'componentWillUnmount');
	        } else {
	          inst.componentWillUnmount();
	        }
	      }
	    }
	
	    if (this._renderedComponent) {
	      ReactReconciler.unmountComponent(this._renderedComponent, safely);
	      this._renderedNodeType = null;
	      this._renderedComponent = null;
	      this._instance = null;
	    }
	
	    // Reset pending fields
	    // Even if this component is scheduled for another update in ReactUpdates,
	    // it would still be ignored because these fields are reset.
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	    this._pendingCallbacks = null;
	    this._pendingElement = null;
	
	    // These fields do not really need to be reset since this object is no
	    // longer accessible.
	    this._context = null;
	    this._rootNodeID = 0;
	    this._topLevelWrapper = null;
	
	    // Delete the reference from the instance to this internal representation
	    // which allow the internals to be properly cleaned up even if the user
	    // leaks a reference to the public instance.
	    ReactInstanceMap.remove(inst);
	
	    // Some existing components rely on inst.props even after they've been
	    // destroyed (in event handlers).
	    // TODO: inst.props = null;
	    // TODO: inst.state = null;
	    // TODO: inst.context = null;
	  },
	
	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _maskContext: function (context) {
	    var Component = this._currentElement.type;
	    var contextTypes = Component.contextTypes;
	    if (!contextTypes) {
	      return emptyObject;
	    }
	    var maskedContext = {};
	    for (var contextName in contextTypes) {
	      maskedContext[contextName] = context[contextName];
	    }
	    return maskedContext;
	  },
	
	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`, and asserts that they are valid.
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _processContext: function (context) {
	    var maskedContext = this._maskContext(context);
	    if (process.env.NODE_ENV !== 'production') {
	      var Component = this._currentElement.type;
	      if (Component.contextTypes) {
	        this._checkContextTypes(Component.contextTypes, maskedContext, 'context');
	      }
	    }
	    return maskedContext;
	  },
	
	  /**
	   * @param {object} currentContext
	   * @return {object}
	   * @private
	   */
	  _processChildContext: function (currentContext) {
	    var Component = this._currentElement.type;
	    var inst = this._instance;
	    var childContext;
	
	    if (inst.getChildContext) {
	      if (process.env.NODE_ENV !== 'production') {
	        ReactInstrumentation.debugTool.onBeginProcessingChildContext();
	        try {
	          childContext = inst.getChildContext();
	        } finally {
	          ReactInstrumentation.debugTool.onEndProcessingChildContext();
	        }
	      } else {
	        childContext = inst.getChildContext();
	      }
	    }
	
	    if (childContext) {
	      !(typeof Component.childContextTypes === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', this.getName() || 'ReactCompositeComponent') : _prodInvariant('107', this.getName() || 'ReactCompositeComponent') : void 0;
	      if (process.env.NODE_ENV !== 'production') {
	        this._checkContextTypes(Component.childContextTypes, childContext, 'child context');
	      }
	      for (var name in childContext) {
	        !(name in Component.childContextTypes) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : _prodInvariant('108', this.getName() || 'ReactCompositeComponent', name) : void 0;
	      }
	      return _assign({}, currentContext, childContext);
	    }
	    return currentContext;
	  },
	
	  /**
	   * Assert that the context types are valid
	   *
	   * @param {object} typeSpecs Map of context field to a ReactPropType
	   * @param {object} values Runtime values that need to be type-checked
	   * @param {string} location e.g. "prop", "context", "child context"
	   * @private
	   */
	  _checkContextTypes: function (typeSpecs, values, location) {
	    if (process.env.NODE_ENV !== 'production') {
	      checkReactTypeSpec(typeSpecs, values, location, this.getName(), null, this._debugID);
	    }
	  },
	
	  receiveComponent: function (nextElement, transaction, nextContext) {
	    var prevElement = this._currentElement;
	    var prevContext = this._context;
	
	    this._pendingElement = null;
	
	    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
	  },
	
	  /**
	   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
	   * is set, update the component.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function (transaction) {
	    if (this._pendingElement != null) {
	      ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context);
	    } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
	      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
	    } else {
	      this._updateBatchNumber = null;
	    }
	  },
	
	  /**
	   * Perform an update to a mounted component. The componentWillReceiveProps and
	   * shouldComponentUpdate methods are called, then (assuming the update isn't
	   * skipped) the remaining update lifecycle methods are called and the DOM
	   * representation is updated.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactElement} prevParentElement
	   * @param {ReactElement} nextParentElement
	   * @internal
	   * @overridable
	   */
	  updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
	    var inst = this._instance;
	    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Attempted to update component `%s` that has already been unmounted (or failed to mount).', this.getName() || 'ReactCompositeComponent') : _prodInvariant('136', this.getName() || 'ReactCompositeComponent') : void 0;
	
	    var willReceive = false;
	    var nextContext;
	
	    // Determine if the context has changed or not
	    if (this._context === nextUnmaskedContext) {
	      nextContext = inst.context;
	    } else {
	      nextContext = this._processContext(nextUnmaskedContext);
	      willReceive = true;
	    }
	
	    var prevProps = prevParentElement.props;
	    var nextProps = nextParentElement.props;
	
	    // Not a simple state update but a props update
	    if (prevParentElement !== nextParentElement) {
	      willReceive = true;
	    }
	
	    // An update here will schedule an update but immediately set
	    // _pendingStateQueue which will ensure that any state updates gets
	    // immediately reconciled instead of waiting for the next batch.
	    if (willReceive && inst.componentWillReceiveProps) {
	      if (process.env.NODE_ENV !== 'production') {
	        measureLifeCyclePerf(function () {
	          return inst.componentWillReceiveProps(nextProps, nextContext);
	        }, this._debugID, 'componentWillReceiveProps');
	      } else {
	        inst.componentWillReceiveProps(nextProps, nextContext);
	      }
	    }
	
	    var nextState = this._processPendingState(nextProps, nextContext);
	    var shouldUpdate = true;
	
	    if (!this._pendingForceUpdate) {
	      if (inst.shouldComponentUpdate) {
	        if (process.env.NODE_ENV !== 'production') {
	          shouldUpdate = measureLifeCyclePerf(function () {
	            return inst.shouldComponentUpdate(nextProps, nextState, nextContext);
	          }, this._debugID, 'shouldComponentUpdate');
	        } else {
	          shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
	        }
	      } else {
	        if (this._compositeType === CompositeTypes.PureClass) {
	          shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
	        }
	      }
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : void 0;
	    }
	
	    this._updateBatchNumber = null;
	    if (shouldUpdate) {
	      this._pendingForceUpdate = false;
	      // Will set `this.props`, `this.state` and `this.context`.
	      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
	    } else {
	      // If it's determined that a component should not update, we still want
	      // to set props and state but we shortcut the rest of the update.
	      this._currentElement = nextParentElement;
	      this._context = nextUnmaskedContext;
	      inst.props = nextProps;
	      inst.state = nextState;
	      inst.context = nextContext;
	    }
	  },
	
	  _processPendingState: function (props, context) {
	    var inst = this._instance;
	    var queue = this._pendingStateQueue;
	    var replace = this._pendingReplaceState;
	    this._pendingReplaceState = false;
	    this._pendingStateQueue = null;
	
	    if (!queue) {
	      return inst.state;
	    }
	
	    if (replace && queue.length === 1) {
	      return queue[0];
	    }
	
	    var nextState = _assign({}, replace ? queue[0] : inst.state);
	    for (var i = replace ? 1 : 0; i < queue.length; i++) {
	      var partial = queue[i];
	      _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
	    }
	
	    return nextState;
	  },
	
	  /**
	   * Merges new props and state, notifies delegate methods of update and
	   * performs update.
	   *
	   * @param {ReactElement} nextElement Next element
	   * @param {object} nextProps Next public object to set as properties.
	   * @param {?object} nextState Next object to set as state.
	   * @param {?object} nextContext Next public object to set as context.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {?object} unmaskedContext
	   * @private
	   */
	  _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
	    var _this2 = this;
	
	    var inst = this._instance;
	
	    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
	    var prevProps;
	    var prevState;
	    var prevContext;
	    if (hasComponentDidUpdate) {
	      prevProps = inst.props;
	      prevState = inst.state;
	      prevContext = inst.context;
	    }
	
	    if (inst.componentWillUpdate) {
	      if (process.env.NODE_ENV !== 'production') {
	        measureLifeCyclePerf(function () {
	          return inst.componentWillUpdate(nextProps, nextState, nextContext);
	        }, this._debugID, 'componentWillUpdate');
	      } else {
	        inst.componentWillUpdate(nextProps, nextState, nextContext);
	      }
	    }
	
	    this._currentElement = nextElement;
	    this._context = unmaskedContext;
	    inst.props = nextProps;
	    inst.state = nextState;
	    inst.context = nextContext;
	
	    this._updateRenderedComponent(transaction, unmaskedContext);
	
	    if (hasComponentDidUpdate) {
	      if (process.env.NODE_ENV !== 'production') {
	        transaction.getReactMountReady().enqueue(function () {
	          measureLifeCyclePerf(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), _this2._debugID, 'componentDidUpdate');
	        });
	      } else {
	        transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
	      }
	    }
	  },
	
	  /**
	   * Call the component's `render` method and update the DOM accordingly.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  _updateRenderedComponent: function (transaction, context) {
	    var prevComponentInstance = this._renderedComponent;
	    var prevRenderedElement = prevComponentInstance._currentElement;
	    var nextRenderedElement = this._renderValidatedComponent();
	
	    var debugID = 0;
	    if (process.env.NODE_ENV !== 'production') {
	      debugID = this._debugID;
	    }
	
	    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
	      ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
	    } else {
	      var oldHostNode = ReactReconciler.getHostNode(prevComponentInstance);
	      ReactReconciler.unmountComponent(prevComponentInstance, false);
	
	      var nodeType = ReactNodeTypes.getType(nextRenderedElement);
	      this._renderedNodeType = nodeType;
	      var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
	      );
	      this._renderedComponent = child;
	
	      var nextMarkup = ReactReconciler.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context), debugID);
	
	      if (process.env.NODE_ENV !== 'production') {
	        if (debugID !== 0) {
	          var childDebugIDs = child._debugID !== 0 ? [child._debugID] : [];
	          ReactInstrumentation.debugTool.onSetChildren(debugID, childDebugIDs);
	        }
	      }
	
	      this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance);
	    }
	  },
	
	  /**
	   * Overridden in shallow rendering.
	   *
	   * @protected
	   */
	  _replaceNodeWithMarkup: function (oldHostNode, nextMarkup, prevInstance) {
	    ReactComponentEnvironment.replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance);
	  },
	
	  /**
	   * @protected
	   */
	  _renderValidatedComponentWithoutOwnerOrContext: function () {
	    var inst = this._instance;
	    var renderedElement;
	
	    if (process.env.NODE_ENV !== 'production') {
	      renderedElement = measureLifeCyclePerf(function () {
	        return inst.render();
	      }, this._debugID, 'render');
	    } else {
	      renderedElement = inst.render();
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      // We allow auto-mocks to proceed as if they're returning null.
	      if (renderedElement === undefined && inst.render._isMockFunction) {
	        // This is probably bad practice. Consider warning here and
	        // deprecating this convenience.
	        renderedElement = null;
	      }
	    }
	
	    return renderedElement;
	  },
	
	  /**
	   * @private
	   */
	  _renderValidatedComponent: function () {
	    var renderedElement;
	    if (process.env.NODE_ENV !== 'production' || this._compositeType !== CompositeTypes.StatelessFunctional) {
	      ReactCurrentOwner.current = this;
	      try {
	        renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
	      } finally {
	        ReactCurrentOwner.current = null;
	      }
	    } else {
	      renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
	    }
	    !(
	    // TODO: An `isValidNode` function would probably be more appropriate
	    renderedElement === null || renderedElement === false || React.isValidElement(renderedElement)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.render(): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : _prodInvariant('109', this.getName() || 'ReactCompositeComponent') : void 0;
	
	    return renderedElement;
	  },
	
	  /**
	   * Lazily allocates the refs object and stores `component` as `ref`.
	   *
	   * @param {string} ref Reference name.
	   * @param {component} component Component to store as `ref`.
	   * @final
	   * @private
	   */
	  attachRef: function (ref, component) {
	    var inst = this.getPublicInstance();
	    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : _prodInvariant('110') : void 0;
	    var publicComponentInstance = component.getPublicInstance();
	    if (process.env.NODE_ENV !== 'production') {
	      var componentName = component && component.getName ? component.getName() : 'a component';
	      process.env.NODE_ENV !== 'production' ? warning(publicComponentInstance != null || component._compositeType !== CompositeTypes.StatelessFunctional, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : void 0;
	    }
	    var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
	    refs[ref] = publicComponentInstance;
	  },
	
	  /**
	   * Detaches a reference name.
	   *
	   * @param {string} ref Name to dereference.
	   * @final
	   * @private
	   */
	  detachRef: function (ref) {
	    var refs = this.getPublicInstance().refs;
	    delete refs[ref];
	  },
	
	  /**
	   * Get a text description of the component that can be used to identify it
	   * in error messages.
	   * @return {string} The name or null.
	   * @internal
	   */
	  getName: function () {
	    var type = this._currentElement.type;
	    var constructor = this._instance && this._instance.constructor;
	    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
	  },
	
	  /**
	   * Get the publicly accessible representation of this component - i.e. what
	   * is exposed by refs and returned by render. Can be null for stateless
	   * components.
	   *
	   * @return {ReactComponent} the public component instance.
	   * @internal
	   */
	  getPublicInstance: function () {
	    var inst = this._instance;
	    if (this._compositeType === CompositeTypes.StatelessFunctional) {
	      return null;
	    }
	    return inst;
	  },
	
	  // Stub
	  _instantiateReactComponent: null
	};
	
	module.exports = ReactCompositeComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var React = __webpack_require__(2);
	
	var invariant = __webpack_require__(12);
	
	var ReactNodeTypes = {
	  HOST: 0,
	  COMPOSITE: 1,
	  EMPTY: 2,
	
	  getType: function (node) {
	    if (node === null || node === false) {
	      return ReactNodeTypes.EMPTY;
	    } else if (React.isValidElement(node)) {
	      if (typeof node.type === 'function') {
	        return ReactNodeTypes.COMPOSITE;
	      } else {
	        return ReactNodeTypes.HOST;
	      }
	    }
	     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unexpected node: %s', node) : _prodInvariant('26', node) : void 0;
	  }
	};
	
	module.exports = ReactNodeTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var ReactPropTypeLocationNames = __webpack_require__(128);
	var ReactPropTypesSecret = __webpack_require__(116);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	var ReactComponentTreeHook;
	
	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(24);
	}
	
	var loggedTypeFailures = {};
	
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?object} element The React element that is being type-checked
	 * @param {?number} debugID The React component instance that is being type-checked
	 * @private
	 */
	function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
	  for (var typeSpecName in typeSpecs) {
	    if (typeSpecs.hasOwnProperty(typeSpecName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
	        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	
	        var componentStackInfo = '';
	
	        if (process.env.NODE_ENV !== 'production') {
	          if (!ReactComponentTreeHook) {
	            ReactComponentTreeHook = __webpack_require__(24);
	          }
	          if (debugID !== null) {
	            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
	          } else if (element !== null) {
	            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
	          }
	        }
	
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
	      }
	    }
	  }
	}
	
	module.exports = checkReactTypeSpec;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var ReactPropTypeLocationNames = {};
	
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}
	
	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 129 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * 
	 */
	
	/*eslint-disable no-self-compare */
	
	'use strict';
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Added the nonzero y check to make Flow happy, but it is redundant
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	
	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) {
	    return true;
	  }
	
	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = shallowEqual;

/***/ }),
/* 130 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Given a `prevElement` and `nextElement`, determines if the existing
	 * instance should be updated as opposed to being destroyed or replaced by a new
	 * instance. Both arguments are elements. This ensures that this logic can
	 * operate on stateless trees without any backing instance.
	 *
	 * @param {?object} prevElement
	 * @param {?object} nextElement
	 * @return {boolean} True if the existing instance should be updated.
	 * @protected
	 */
	
	function shouldUpdateReactComponent(prevElement, nextElement) {
	  var prevEmpty = prevElement === null || prevElement === false;
	  var nextEmpty = nextElement === null || nextElement === false;
	  if (prevEmpty || nextEmpty) {
	    return prevEmpty === nextEmpty;
	  }
	
	  var prevType = typeof prevElement;
	  var nextType = typeof nextElement;
	  if (prevType === 'string' || prevType === 'number') {
	    return nextType === 'string' || nextType === 'number';
	  } else {
	    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
	  }
	}
	
	module.exports = shouldUpdateReactComponent;

/***/ }),
/* 131 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var emptyComponentFactory;
	
	var ReactEmptyComponentInjection = {
	  injectEmptyComponentFactory: function (factory) {
	    emptyComponentFactory = factory;
	  }
	};
	
	var ReactEmptyComponent = {
	  create: function (instantiate) {
	    return emptyComponentFactory(instantiate);
	  }
	};
	
	ReactEmptyComponent.injection = ReactEmptyComponentInjection;
	
	module.exports = ReactEmptyComponent;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	var genericComponentClass = null;
	var textComponentClass = null;
	
	var ReactHostComponentInjection = {
	  // This accepts a class that receives the tag string. This is a catch all
	  // that can render any kind of tag.
	  injectGenericComponentClass: function (componentClass) {
	    genericComponentClass = componentClass;
	  },
	  // This accepts a text component class that takes the text string to be
	  // rendered as props.
	  injectTextComponentClass: function (componentClass) {
	    textComponentClass = componentClass;
	  }
	};
	
	/**
	 * Get a host internal component class for a specific tag.
	 *
	 * @param {ReactElement} element The element to create.
	 * @return {function} The internal class constructor function.
	 */
	function createInternalComponent(element) {
	  !genericComponentClass ? process.env.NODE_ENV !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : _prodInvariant('111', element.type) : void 0;
	  return new genericComponentClass(element);
	}
	
	/**
	 * @param {ReactText} text
	 * @return {ReactComponent}
	 */
	function createInstanceForText(text) {
	  return new textComponentClass(text);
	}
	
	/**
	 * @param {ReactComponent} component
	 * @return {boolean}
	 */
	function isTextComponent(component) {
	  return component instanceof textComponentClass;
	}
	
	var ReactHostComponent = {
	  createInternalComponent: createInternalComponent,
	  createInstanceForText: createInstanceForText,
	  isTextComponent: isTextComponent,
	  injection: ReactHostComponentInjection
	};
	
	module.exports = ReactHostComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 133 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var nextDebugID = 1;
	
	function getNextDebugID() {
	  return nextDebugID++;
	}
	
	module.exports = getNextDebugID;

/***/ }),
/* 134 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */
	
	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });
	
	  return '$' + escapedString;
	}
	
	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);
	
	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}
	
	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};
	
	module.exports = KeyEscapeUtils;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var ReactCurrentOwner = __webpack_require__(17);
	var REACT_ELEMENT_TYPE = __webpack_require__(136);
	
	var getIteratorFn = __webpack_require__(137);
	var invariant = __webpack_require__(12);
	var KeyEscapeUtils = __webpack_require__(134);
	var warning = __webpack_require__(8);
	
	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';
	
	/**
	 * This is inlined from ReactElement since this file is shared between
	 * isomorphic and renderers. We could extract this to a
	 *
	 */
	
	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */
	
	var didWarnAboutMaps = false;
	
	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}
	
	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;
	
	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }
	
	  if (children === null || type === 'string' || type === 'number' ||
	  // The following is inlined from ReactElement. This means we can optimize
	  // some checks. React Fiber also inlines this logic for similar purposes.
	  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }
	
	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
	
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          var mapsAsChildrenAddendum = '';
	          if (ReactCurrentOwner.current) {
	            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
	            if (mapsAsChildrenOwnerName) {
	              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
	            }
	          }
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = " It looks like you're using an element created by a different " + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
	    }
	  }
	
	  return subtreeCount;
	}
	
	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }
	
	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}
	
	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 136 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
	
	module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 137 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	/* global Symbol */
	
	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}
	
	module.exports = getIteratorFn;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var KeyEscapeUtils = __webpack_require__(134);
	var traverseAllChildren = __webpack_require__(135);
	var warning = __webpack_require__(8);
	
	var ReactComponentTreeHook;
	
	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(24);
	}
	
	/**
	 * @param {function} traverseContext Context passed through traversal.
	 * @param {?ReactComponent} child React child component.
	 * @param {!string} name String name of key path to child.
	 * @param {number=} selfDebugID Optional debugID of the current internal instance.
	 */
	function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
	  // We found a component instance.
	  if (traverseContext && typeof traverseContext === 'object') {
	    var result = traverseContext;
	    var keyUnique = result[name] === undefined;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!ReactComponentTreeHook) {
	        ReactComponentTreeHook = __webpack_require__(24);
	      }
	      if (!keyUnique) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID)) : void 0;
	      }
	    }
	    if (keyUnique && child != null) {
	      result[name] = child;
	    }
	  }
	}
	
	/**
	 * Flattens children that are typically specified as `props.children`. Any null
	 * children will not be included in the resulting object.
	 * @return {!object} flattened children keyed by name.
	 */
	function flattenChildren(children, selfDebugID) {
	  if (children == null) {
	    return children;
	  }
	  var result = {};
	
	  if (process.env.NODE_ENV !== 'production') {
	    traverseAllChildren(children, function (traverseContext, child, name) {
	      return flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID);
	    }, result);
	  } else {
	    traverseAllChildren(children, flattenSingleChildIntoContext, result);
	  }
	  return result;
	}
	
	module.exports = flattenChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var PooledClass = __webpack_require__(55);
	var Transaction = __webpack_require__(73);
	var ReactInstrumentation = __webpack_require__(67);
	var ReactServerUpdateQueue = __webpack_require__(140);
	
	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [];
	
	if (process.env.NODE_ENV !== 'production') {
	  TRANSACTION_WRAPPERS.push({
	    initialize: ReactInstrumentation.debugTool.onBeginFlush,
	    close: ReactInstrumentation.debugTool.onEndFlush
	  });
	}
	
	var noopCallbackQueue = {
	  enqueue: function () {}
	};
	
	/**
	 * @class ReactServerRenderingTransaction
	 * @param {boolean} renderToStaticMarkup
	 */
	function ReactServerRenderingTransaction(renderToStaticMarkup) {
	  this.reinitializeTransaction();
	  this.renderToStaticMarkup = renderToStaticMarkup;
	  this.useCreateElement = false;
	  this.updateQueue = new ReactServerUpdateQueue(this);
	}
	
	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array} Empty list of operation wrap procedures.
	   */
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS;
	  },
	
	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function () {
	    return noopCallbackQueue;
	  },
	
	  /**
	   * @return {object} The queue to collect React async events.
	   */
	  getUpdateQueue: function () {
	    return this.updateQueue;
	  },
	
	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be reused.
	   */
	  destructor: function () {},
	
	  checkpoint: function () {},
	
	  rollback: function () {}
	};
	
	_assign(ReactServerRenderingTransaction.prototype, Transaction, Mixin);
	
	PooledClass.addPoolingTo(ReactServerRenderingTransaction);
	
	module.exports = ReactServerRenderingTransaction;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ReactUpdateQueue = __webpack_require__(141);
	
	var warning = __webpack_require__(8);
	
	function warnNoop(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    var constructor = publicInstance.constructor;
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
	  }
	}
	
	/**
	 * This is the update queue used for server rendering.
	 * It delegates to ReactUpdateQueue while server rendering is in progress and
	 * switches to ReactNoopUpdateQueue after the transaction has completed.
	 * @class ReactServerUpdateQueue
	 * @param {Transaction} transaction
	 */
	
	var ReactServerUpdateQueue = function () {
	  function ReactServerUpdateQueue(transaction) {
	    _classCallCheck(this, ReactServerUpdateQueue);
	
	    this.transaction = transaction;
	  }
	
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	
	
	  ReactServerUpdateQueue.prototype.isMounted = function isMounted(publicInstance) {
	    return false;
	  };
	
	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	
	
	  ReactServerUpdateQueue.prototype.enqueueCallback = function enqueueCallback(publicInstance, callback, callerName) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue.enqueueCallback(publicInstance, callback, callerName);
	    }
	  };
	
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	
	
	  ReactServerUpdateQueue.prototype.enqueueForceUpdate = function enqueueForceUpdate(publicInstance) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue.enqueueForceUpdate(publicInstance);
	    } else {
	      warnNoop(publicInstance, 'forceUpdate');
	    }
	  };
	
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object|function} completeState Next state.
	   * @internal
	   */
	
	
	  ReactServerUpdateQueue.prototype.enqueueReplaceState = function enqueueReplaceState(publicInstance, completeState) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue.enqueueReplaceState(publicInstance, completeState);
	    } else {
	      warnNoop(publicInstance, 'replaceState');
	    }
	  };
	
	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object|function} partialState Next partial state to be merged with state.
	   * @internal
	   */
	
	
	  ReactServerUpdateQueue.prototype.enqueueSetState = function enqueueSetState(publicInstance, partialState) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue.enqueueSetState(publicInstance, partialState);
	    } else {
	      warnNoop(publicInstance, 'setState');
	    }
	  };
	
	  return ReactServerUpdateQueue;
	}();
	
	module.exports = ReactServerUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var ReactCurrentOwner = __webpack_require__(17);
	var ReactInstanceMap = __webpack_require__(122);
	var ReactInstrumentation = __webpack_require__(67);
	var ReactUpdates = __webpack_require__(61);
	
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	function enqueueUpdate(internalInstance) {
	  ReactUpdates.enqueueUpdate(internalInstance);
	}
	
	function formatUnexpectedArgument(arg) {
	  var type = typeof arg;
	  if (type !== 'object') {
	    return type;
	  }
	  var displayName = arg.constructor && arg.constructor.name || type;
	  var keys = Object.keys(arg);
	  if (keys.length > 0 && keys.length < 20) {
	    return displayName + ' (keys: ' + keys.join(', ') + ')';
	  }
	  return displayName;
	}
	
	function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
	  var internalInstance = ReactInstanceMap.get(publicInstance);
	  if (!internalInstance) {
	    if (process.env.NODE_ENV !== 'production') {
	      var ctor = publicInstance.constructor;
	      // Only warn when we have a callerName. Otherwise we should be silent.
	      // We're probably calling from enqueueCallback. We don't want to warn
	      // there because we already warned for the corresponding lifecycle method.
	      process.env.NODE_ENV !== 'production' ? warning(!callerName, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, ctor && (ctor.displayName || ctor.name) || 'ReactClass') : void 0;
	    }
	    return null;
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition (such as ' + "within `render` or another component's constructor). Render methods " + 'should be a pure function of props and state; constructor ' + 'side-effects are an anti-pattern, but can be moved to ' + '`componentWillMount`.', callerName) : void 0;
	  }
	
	  return internalInstance;
	}
	
	/**
	 * ReactUpdateQueue allows for state updates to be scheduled into a later
	 * reconciliation step.
	 */
	var ReactUpdateQueue = {
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    if (process.env.NODE_ENV !== 'production') {
	      var owner = ReactCurrentOwner.current;
	      if (owner !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : void 0;
	        owner._warnedAboutRefsInRender = true;
	      }
	    }
	    var internalInstance = ReactInstanceMap.get(publicInstance);
	    if (internalInstance) {
	      // During componentWillMount and render this will still be null but after
	      // that will always render to something. At least for now. So we can use
	      // this hack.
	      return !!internalInstance._renderedComponent;
	    } else {
	      return false;
	    }
	  },
	
	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @param {string} callerName Name of the calling function in the public API.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback, callerName) {
	    ReactUpdateQueue.validateCallback(callback, callerName);
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);
	
	    // Previously we would throw an error if we didn't have an internal
	    // instance. Since we want to make it a no-op instead, we mirror the same
	    // behavior we have in other enqueue* methods.
	    // We also need to ignore callbacks in componentWillMount. See
	    // enqueueUpdates.
	    if (!internalInstance) {
	      return null;
	    }
	
	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    }
	    // TODO: The callback here is ignored when setState is called from
	    // componentWillMount. Either fix it or disallow doing so completely in
	    // favor of getInitialState. Alternatively, we can disallow
	    // componentWillMount during server-side rendering.
	    enqueueUpdate(internalInstance);
	  },
	
	  enqueueCallbackInternal: function (internalInstance, callback) {
	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    }
	    enqueueUpdate(internalInstance);
	  },
	
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');
	
	    if (!internalInstance) {
	      return;
	    }
	
	    internalInstance._pendingForceUpdate = true;
	
	    enqueueUpdate(internalInstance);
	  },
	
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState, callback) {
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');
	
	    if (!internalInstance) {
	      return;
	    }
	
	    internalInstance._pendingStateQueue = [completeState];
	    internalInstance._pendingReplaceState = true;
	
	    // Future-proof 15.5
	    if (callback !== undefined && callback !== null) {
	      ReactUpdateQueue.validateCallback(callback, 'replaceState');
	      if (internalInstance._pendingCallbacks) {
	        internalInstance._pendingCallbacks.push(callback);
	      } else {
	        internalInstance._pendingCallbacks = [callback];
	      }
	    }
	
	    enqueueUpdate(internalInstance);
	  },
	
	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onSetState();
	      process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
	    }
	
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
	
	    if (!internalInstance) {
	      return;
	    }
	
	    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
	    queue.push(partialState);
	
	    enqueueUpdate(internalInstance);
	  },
	
	  enqueueElementInternal: function (internalInstance, nextElement, nextContext) {
	    internalInstance._pendingElement = nextElement;
	    // TODO: introduce _pendingContext instead of setting it directly.
	    internalInstance._context = nextContext;
	    enqueueUpdate(internalInstance);
	  },
	
	  validateCallback: function (callback, callerName) {
	    !(!callback || typeof callback === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.', callerName, formatUnexpectedArgument(callback)) : _prodInvariant('122', callerName, formatUnexpectedArgument(callback)) : void 0;
	  }
	};
	
	module.exports = ReactUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var emptyFunction = __webpack_require__(9);
	var warning = __webpack_require__(8);
	
	var validateDOMNesting = emptyFunction;
	
	if (process.env.NODE_ENV !== 'production') {
	  // This validation code was written based on the HTML5 parsing spec:
	  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
	  //
	  // Note: this does not catch all invalid nesting, nor does it try to (as it's
	  // not clear what practical benefit doing so provides); instead, we warn only
	  // for cases where the parser will give a parse tree differing from what React
	  // intended. For example, <b><div></div></b> is invalid but we don't warn
	  // because it still parses correctly; we do warn for other cases like nested
	  // <p> tags where the beginning of the second element implicitly closes the
	  // first, causing a confusing mess.
	
	  // https://html.spec.whatwg.org/multipage/syntax.html#special
	  var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];
	
	  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
	  var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',
	
	  // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
	  // TODO: Distinguish by namespace here -- for <title>, including it here
	  // errs on the side of fewer warnings
	  'foreignObject', 'desc', 'title'];
	
	  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
	  var buttonScopeTags = inScopeTags.concat(['button']);
	
	  // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
	  var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];
	
	  var emptyAncestorInfo = {
	    current: null,
	
	    formTag: null,
	    aTagInScope: null,
	    buttonTagInScope: null,
	    nobrTagInScope: null,
	    pTagInButtonScope: null,
	
	    listItemTagAutoclosing: null,
	    dlItemTagAutoclosing: null
	  };
	
	  var updatedAncestorInfo = function (oldInfo, tag, instance) {
	    var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
	    var info = { tag: tag, instance: instance };
	
	    if (inScopeTags.indexOf(tag) !== -1) {
	      ancestorInfo.aTagInScope = null;
	      ancestorInfo.buttonTagInScope = null;
	      ancestorInfo.nobrTagInScope = null;
	    }
	    if (buttonScopeTags.indexOf(tag) !== -1) {
	      ancestorInfo.pTagInButtonScope = null;
	    }
	
	    // See rules for 'li', 'dd', 'dt' start tags in
	    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
	    if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
	      ancestorInfo.listItemTagAutoclosing = null;
	      ancestorInfo.dlItemTagAutoclosing = null;
	    }
	
	    ancestorInfo.current = info;
	
	    if (tag === 'form') {
	      ancestorInfo.formTag = info;
	    }
	    if (tag === 'a') {
	      ancestorInfo.aTagInScope = info;
	    }
	    if (tag === 'button') {
	      ancestorInfo.buttonTagInScope = info;
	    }
	    if (tag === 'nobr') {
	      ancestorInfo.nobrTagInScope = info;
	    }
	    if (tag === 'p') {
	      ancestorInfo.pTagInButtonScope = info;
	    }
	    if (tag === 'li') {
	      ancestorInfo.listItemTagAutoclosing = info;
	    }
	    if (tag === 'dd' || tag === 'dt') {
	      ancestorInfo.dlItemTagAutoclosing = info;
	    }
	
	    return ancestorInfo;
	  };
	
	  /**
	   * Returns whether
	   */
	  var isTagValidWithParent = function (tag, parentTag) {
	    // First, let's check if we're in an unusual parsing mode...
	    switch (parentTag) {
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
	      case 'select':
	        return tag === 'option' || tag === 'optgroup' || tag === '#text';
	      case 'optgroup':
	        return tag === 'option' || tag === '#text';
	      // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
	      // but
	      case 'option':
	        return tag === '#text';
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
	      // No special behavior since these rules fall back to "in body" mode for
	      // all except special table nodes which cause bad parsing behavior anyway.
	
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
	      case 'tr':
	        return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
	      case 'tbody':
	      case 'thead':
	      case 'tfoot':
	        return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
	      case 'colgroup':
	        return tag === 'col' || tag === 'template';
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
	      case 'table':
	        return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
	      case 'head':
	        return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
	      // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
	      case 'html':
	        return tag === 'head' || tag === 'body';
	      case '#document':
	        return tag === 'html';
	    }
	
	    // Probably in the "in body" parsing mode, so we outlaw only tag combos
	    // where the parsing rules cause implicit opens or closes to be added.
	    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
	    switch (tag) {
	      case 'h1':
	      case 'h2':
	      case 'h3':
	      case 'h4':
	      case 'h5':
	      case 'h6':
	        return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';
	
	      case 'rp':
	      case 'rt':
	        return impliedEndTags.indexOf(parentTag) === -1;
	
	      case 'body':
	      case 'caption':
	      case 'col':
	      case 'colgroup':
	      case 'frame':
	      case 'head':
	      case 'html':
	      case 'tbody':
	      case 'td':
	      case 'tfoot':
	      case 'th':
	      case 'thead':
	      case 'tr':
	        // These tags are only valid with a few parents that have special child
	        // parsing rules -- if we're down here, then none of those matched and
	        // so we allow it only if we don't know what the parent is, as all other
	        // cases are invalid.
	        return parentTag == null;
	    }
	
	    return true;
	  };
	
	  /**
	   * Returns whether
	   */
	  var findInvalidAncestorForTag = function (tag, ancestorInfo) {
	    switch (tag) {
	      case 'address':
	      case 'article':
	      case 'aside':
	      case 'blockquote':
	      case 'center':
	      case 'details':
	      case 'dialog':
	      case 'dir':
	      case 'div':
	      case 'dl':
	      case 'fieldset':
	      case 'figcaption':
	      case 'figure':
	      case 'footer':
	      case 'header':
	      case 'hgroup':
	      case 'main':
	      case 'menu':
	      case 'nav':
	      case 'ol':
	      case 'p':
	      case 'section':
	      case 'summary':
	      case 'ul':
	      case 'pre':
	      case 'listing':
	      case 'table':
	      case 'hr':
	      case 'xmp':
	      case 'h1':
	      case 'h2':
	      case 'h3':
	      case 'h4':
	      case 'h5':
	      case 'h6':
	        return ancestorInfo.pTagInButtonScope;
	
	      case 'form':
	        return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;
	
	      case 'li':
	        return ancestorInfo.listItemTagAutoclosing;
	
	      case 'dd':
	      case 'dt':
	        return ancestorInfo.dlItemTagAutoclosing;
	
	      case 'button':
	        return ancestorInfo.buttonTagInScope;
	
	      case 'a':
	        // Spec says something about storing a list of markers, but it sounds
	        // equivalent to this check.
	        return ancestorInfo.aTagInScope;
	
	      case 'nobr':
	        return ancestorInfo.nobrTagInScope;
	    }
	
	    return null;
	  };
	
	  /**
	   * Given a ReactCompositeComponent instance, return a list of its recursive
	   * owners, starting at the root and ending with the instance itself.
	   */
	  var findOwnerStack = function (instance) {
	    if (!instance) {
	      return [];
	    }
	
	    var stack = [];
	    do {
	      stack.push(instance);
	    } while (instance = instance._currentElement._owner);
	    stack.reverse();
	    return stack;
	  };
	
	  var didWarn = {};
	
	  validateDOMNesting = function (childTag, childText, childInstance, ancestorInfo) {
	    ancestorInfo = ancestorInfo || emptyAncestorInfo;
	    var parentInfo = ancestorInfo.current;
	    var parentTag = parentInfo && parentInfo.tag;
	
	    if (childText != null) {
	      process.env.NODE_ENV !== 'production' ? warning(childTag == null, 'validateDOMNesting: when childText is passed, childTag should be null') : void 0;
	      childTag = '#text';
	    }
	
	    var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
	    var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
	    var problematic = invalidParent || invalidAncestor;
	
	    if (problematic) {
	      var ancestorTag = problematic.tag;
	      var ancestorInstance = problematic.instance;
	
	      var childOwner = childInstance && childInstance._currentElement._owner;
	      var ancestorOwner = ancestorInstance && ancestorInstance._currentElement._owner;
	
	      var childOwners = findOwnerStack(childOwner);
	      var ancestorOwners = findOwnerStack(ancestorOwner);
	
	      var minStackLen = Math.min(childOwners.length, ancestorOwners.length);
	      var i;
	
	      var deepestCommon = -1;
	      for (i = 0; i < minStackLen; i++) {
	        if (childOwners[i] === ancestorOwners[i]) {
	          deepestCommon = i;
	        } else {
	          break;
	        }
	      }
	
	      var UNKNOWN = '(unknown)';
	      var childOwnerNames = childOwners.slice(deepestCommon + 1).map(function (inst) {
	        return inst.getName() || UNKNOWN;
	      });
	      var ancestorOwnerNames = ancestorOwners.slice(deepestCommon + 1).map(function (inst) {
	        return inst.getName() || UNKNOWN;
	      });
	      var ownerInfo = [].concat(
	      // If the parent and child instances have a common owner ancestor, start
	      // with that -- otherwise we just start with the parent's owners.
	      deepestCommon !== -1 ? childOwners[deepestCommon].getName() || UNKNOWN : [], ancestorOwnerNames, ancestorTag,
	      // If we're warning about an invalid (non-parent) ancestry, add '...'
	      invalidAncestor ? ['...'] : [], childOwnerNames, childTag).join(' > ');
	
	      var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + ownerInfo;
	      if (didWarn[warnKey]) {
	        return;
	      }
	      didWarn[warnKey] = true;
	
	      var tagDisplayName = childTag;
	      var whitespaceInfo = '';
	      if (childTag === '#text') {
	        if (/\S/.test(childText)) {
	          tagDisplayName = 'Text nodes';
	        } else {
	          tagDisplayName = 'Whitespace text nodes';
	          whitespaceInfo = " Make sure you don't have any extra whitespace between tags on " + 'each line of your source code.';
	        }
	      } else {
	        tagDisplayName = '<' + childTag + '>';
	      }
	
	      if (invalidParent) {
	        var info = '';
	        if (ancestorTag === 'table' && childTag === 'tr') {
	          info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
	        }
	        process.env.NODE_ENV !== 'production' ? warning(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s ' + 'See %s.%s', tagDisplayName, ancestorTag, whitespaceInfo, ownerInfo, info) : void 0;
	      } else {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>. See %s.', tagDisplayName, ancestorTag, ownerInfo) : void 0;
	      }
	    }
	  };
	
	  validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo;
	
	  // For testing
	  validateDOMNesting.isTagValidInContext = function (tag, ancestorInfo) {
	    ancestorInfo = ancestorInfo || emptyAncestorInfo;
	    var parentInfo = ancestorInfo.current;
	    var parentTag = parentInfo && parentInfo.tag;
	    return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
	  };
	}
	
	module.exports = validateDOMNesting;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var DOMLazyTree = __webpack_require__(87);
	var ReactDOMComponentTree = __webpack_require__(39);
	
	var ReactDOMEmptyComponent = function (instantiate) {
	  // ReactCompositeComponent uses this:
	  this._currentElement = null;
	  // ReactDOMComponentTree uses these:
	  this._hostNode = null;
	  this._hostParent = null;
	  this._hostContainerInfo = null;
	  this._domID = 0;
	};
	_assign(ReactDOMEmptyComponent.prototype, {
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
	    var domID = hostContainerInfo._idCounter++;
	    this._domID = domID;
	    this._hostParent = hostParent;
	    this._hostContainerInfo = hostContainerInfo;
	
	    var nodeValue = ' react-empty: ' + this._domID + ' ';
	    if (transaction.useCreateElement) {
	      var ownerDocument = hostContainerInfo._ownerDocument;
	      var node = ownerDocument.createComment(nodeValue);
	      ReactDOMComponentTree.precacheNode(this, node);
	      return DOMLazyTree(node);
	    } else {
	      if (transaction.renderToStaticMarkup) {
	        // Normally we'd insert a comment node, but since this is a situation
	        // where React won't take over (static pages), we can simply return
	        // nothing.
	        return '';
	      }
	      return '<!--' + nodeValue + '-->';
	    }
	  },
	  receiveComponent: function () {},
	  getHostNode: function () {
	    return ReactDOMComponentTree.getNodeFromInstance(this);
	  },
	  unmountComponent: function () {
	    ReactDOMComponentTree.uncacheNode(this);
	  }
	});
	
	module.exports = ReactDOMEmptyComponent;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var invariant = __webpack_require__(12);
	
	/**
	 * Return the lowest common ancestor of A and B, or null if they are in
	 * different trees.
	 */
	function getLowestCommonAncestor(instA, instB) {
	  !('_hostNode' in instA) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : _prodInvariant('33') : void 0;
	  !('_hostNode' in instB) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : _prodInvariant('33') : void 0;
	
	  var depthA = 0;
	  for (var tempA = instA; tempA; tempA = tempA._hostParent) {
	    depthA++;
	  }
	  var depthB = 0;
	  for (var tempB = instB; tempB; tempB = tempB._hostParent) {
	    depthB++;
	  }
	
	  // If A is deeper, crawl up.
	  while (depthA - depthB > 0) {
	    instA = instA._hostParent;
	    depthA--;
	  }
	
	  // If B is deeper, crawl up.
	  while (depthB - depthA > 0) {
	    instB = instB._hostParent;
	    depthB--;
	  }
	
	  // Walk in lockstep until we find a match.
	  var depth = depthA;
	  while (depth--) {
	    if (instA === instB) {
	      return instA;
	    }
	    instA = instA._hostParent;
	    instB = instB._hostParent;
	  }
	  return null;
	}
	
	/**
	 * Return if A is an ancestor of B.
	 */
	function isAncestor(instA, instB) {
	  !('_hostNode' in instA) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'isAncestor: Invalid argument.') : _prodInvariant('35') : void 0;
	  !('_hostNode' in instB) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'isAncestor: Invalid argument.') : _prodInvariant('35') : void 0;
	
	  while (instB) {
	    if (instB === instA) {
	      return true;
	    }
	    instB = instB._hostParent;
	  }
	  return false;
	}
	
	/**
	 * Return the parent instance of the passed-in instance.
	 */
	function getParentInstance(inst) {
	  !('_hostNode' in inst) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getParentInstance: Invalid argument.') : _prodInvariant('36') : void 0;
	
	  return inst._hostParent;
	}
	
	/**
	 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
	 */
	function traverseTwoPhase(inst, fn, arg) {
	  var path = [];
	  while (inst) {
	    path.push(inst);
	    inst = inst._hostParent;
	  }
	  var i;
	  for (i = path.length; i-- > 0;) {
	    fn(path[i], 'captured', arg);
	  }
	  for (i = 0; i < path.length; i++) {
	    fn(path[i], 'bubbled', arg);
	  }
	}
	
	/**
	 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
	 * should would receive a `mouseEnter` or `mouseLeave` event.
	 *
	 * Does not invoke the callback on the nearest common ancestor because nothing
	 * "entered" or "left" that element.
	 */
	function traverseEnterLeave(from, to, fn, argFrom, argTo) {
	  var common = from && to ? getLowestCommonAncestor(from, to) : null;
	  var pathFrom = [];
	  while (from && from !== common) {
	    pathFrom.push(from);
	    from = from._hostParent;
	  }
	  var pathTo = [];
	  while (to && to !== common) {
	    pathTo.push(to);
	    to = to._hostParent;
	  }
	  var i;
	  for (i = 0; i < pathFrom.length; i++) {
	    fn(pathFrom[i], 'bubbled', argFrom);
	  }
	  for (i = pathTo.length; i-- > 0;) {
	    fn(pathTo[i], 'captured', argTo);
	  }
	}
	
	module.exports = {
	  isAncestor: isAncestor,
	  getLowestCommonAncestor: getLowestCommonAncestor,
	  getParentInstance: getParentInstance,
	  traverseTwoPhase: traverseTwoPhase,
	  traverseEnterLeave: traverseEnterLeave
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40),
	    _assign = __webpack_require__(4);
	
	var DOMChildrenOperations = __webpack_require__(86);
	var DOMLazyTree = __webpack_require__(87);
	var ReactDOMComponentTree = __webpack_require__(39);
	
	var escapeTextContentForBrowser = __webpack_require__(92);
	var invariant = __webpack_require__(12);
	var validateDOMNesting = __webpack_require__(142);
	
	/**
	 * Text nodes violate a couple assumptions that React makes about components:
	 *
	 *  - When mounting text into the DOM, adjacent text nodes are merged.
	 *  - Text nodes cannot be assigned a React root ID.
	 *
	 * This component is used to wrap strings between comment nodes so that they
	 * can undergo the same reconciliation that is applied to elements.
	 *
	 * TODO: Investigate representing React components in the DOM with text nodes.
	 *
	 * @class ReactDOMTextComponent
	 * @extends ReactComponent
	 * @internal
	 */
	var ReactDOMTextComponent = function (text) {
	  // TODO: This is really a ReactText (ReactNode), not a ReactElement
	  this._currentElement = text;
	  this._stringText = '' + text;
	  // ReactDOMComponentTree uses these:
	  this._hostNode = null;
	  this._hostParent = null;
	
	  // Properties
	  this._domID = 0;
	  this._mountIndex = 0;
	  this._closingComment = null;
	  this._commentNodes = null;
	};
	
	_assign(ReactDOMTextComponent.prototype, {
	  /**
	   * Creates the markup for this text node. This node is not intended to have
	   * any features besides containing text content.
	   *
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {string} Markup for this text node.
	   * @internal
	   */
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
	    if (process.env.NODE_ENV !== 'production') {
	      var parentInfo;
	      if (hostParent != null) {
	        parentInfo = hostParent._ancestorInfo;
	      } else if (hostContainerInfo != null) {
	        parentInfo = hostContainerInfo._ancestorInfo;
	      }
	      if (parentInfo) {
	        // parentInfo should always be present except for the top-level
	        // component when server rendering
	        validateDOMNesting(null, this._stringText, this, parentInfo);
	      }
	    }
	
	    var domID = hostContainerInfo._idCounter++;
	    var openingValue = ' react-text: ' + domID + ' ';
	    var closingValue = ' /react-text ';
	    this._domID = domID;
	    this._hostParent = hostParent;
	    if (transaction.useCreateElement) {
	      var ownerDocument = hostContainerInfo._ownerDocument;
	      var openingComment = ownerDocument.createComment(openingValue);
	      var closingComment = ownerDocument.createComment(closingValue);
	      var lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment());
	      DOMLazyTree.queueChild(lazyTree, DOMLazyTree(openingComment));
	      if (this._stringText) {
	        DOMLazyTree.queueChild(lazyTree, DOMLazyTree(ownerDocument.createTextNode(this._stringText)));
	      }
	      DOMLazyTree.queueChild(lazyTree, DOMLazyTree(closingComment));
	      ReactDOMComponentTree.precacheNode(this, openingComment);
	      this._closingComment = closingComment;
	      return lazyTree;
	    } else {
	      var escapedText = escapeTextContentForBrowser(this._stringText);
	
	      if (transaction.renderToStaticMarkup) {
	        // Normally we'd wrap this between comment nodes for the reasons stated
	        // above, but since this is a situation where React won't take over
	        // (static pages), we can simply return the text as it is.
	        return escapedText;
	      }
	
	      return '<!--' + openingValue + '-->' + escapedText + '<!--' + closingValue + '-->';
	    }
	  },
	
	  /**
	   * Updates this component by updating the text content.
	   *
	   * @param {ReactText} nextText The next text content
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  receiveComponent: function (nextText, transaction) {
	    if (nextText !== this._currentElement) {
	      this._currentElement = nextText;
	      var nextStringText = '' + nextText;
	      if (nextStringText !== this._stringText) {
	        // TODO: Save this as pending props and use performUpdateIfNecessary
	        // and/or updateComponent to do the actual update for consistency with
	        // other component types?
	        this._stringText = nextStringText;
	        var commentNodes = this.getHostNode();
	        DOMChildrenOperations.replaceDelimitedText(commentNodes[0], commentNodes[1], nextStringText);
	      }
	    }
	  },
	
	  getHostNode: function () {
	    var hostNode = this._commentNodes;
	    if (hostNode) {
	      return hostNode;
	    }
	    if (!this._closingComment) {
	      var openingComment = ReactDOMComponentTree.getNodeFromInstance(this);
	      var node = openingComment.nextSibling;
	      while (true) {
	        !(node != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Missing closing comment for text component %s', this._domID) : _prodInvariant('67', this._domID) : void 0;
	        if (node.nodeType === 8 && node.nodeValue === ' /react-text ') {
	          this._closingComment = node;
	          break;
	        }
	        node = node.nextSibling;
	      }
	    }
	    hostNode = [this._hostNode, this._closingComment];
	    this._commentNodes = hostNode;
	    return hostNode;
	  },
	
	  unmountComponent: function () {
	    this._closingComment = null;
	    this._commentNodes = null;
	    ReactDOMComponentTree.uncacheNode(this);
	  }
	});
	
	module.exports = ReactDOMTextComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var ReactUpdates = __webpack_require__(61);
	var Transaction = __webpack_require__(73);
	
	var emptyFunction = __webpack_require__(9);
	
	var RESET_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: function () {
	    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
	  }
	};
	
	var FLUSH_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
	};
	
	var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
	
	function ReactDefaultBatchingStrategyTransaction() {
	  this.reinitializeTransaction();
	}
	
	_assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction, {
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS;
	  }
	});
	
	var transaction = new ReactDefaultBatchingStrategyTransaction();
	
	var ReactDefaultBatchingStrategy = {
	  isBatchingUpdates: false,
	
	  /**
	   * Call the provided function in a context within which calls to `setState`
	   * and friends are batched such that components aren't updated unnecessarily.
	   */
	  batchedUpdates: function (callback, a, b, c, d, e) {
	    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
	
	    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
	
	    // The code is written this way to avoid extra allocations
	    if (alreadyBatchingUpdates) {
	      return callback(a, b, c, d, e);
	    } else {
	      return transaction.perform(callback, null, a, b, c, d, e);
	    }
	  }
	};
	
	module.exports = ReactDefaultBatchingStrategy;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var EventListener = __webpack_require__(148);
	var ExecutionEnvironment = __webpack_require__(53);
	var PooledClass = __webpack_require__(55);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactUpdates = __webpack_require__(61);
	
	var getEventTarget = __webpack_require__(75);
	var getUnboundedScrollPosition = __webpack_require__(149);
	
	/**
	 * Find the deepest React component completely containing the root of the
	 * passed-in instance (for use when entire React trees are nested within each
	 * other). If React trees are not nested, returns null.
	 */
	function findParent(inst) {
	  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
	  // traversal, but caching is difficult to do correctly without using a
	  // mutation observer to listen for all DOM changes.
	  while (inst._hostParent) {
	    inst = inst._hostParent;
	  }
	  var rootNode = ReactDOMComponentTree.getNodeFromInstance(inst);
	  var container = rootNode.parentNode;
	  return ReactDOMComponentTree.getClosestInstanceFromNode(container);
	}
	
	// Used to store ancestor hierarchy in top level callback
	function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
	  this.topLevelType = topLevelType;
	  this.nativeEvent = nativeEvent;
	  this.ancestors = [];
	}
	_assign(TopLevelCallbackBookKeeping.prototype, {
	  destructor: function () {
	    this.topLevelType = null;
	    this.nativeEvent = null;
	    this.ancestors.length = 0;
	  }
	});
	PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);
	
	function handleTopLevelImpl(bookKeeping) {
	  var nativeEventTarget = getEventTarget(bookKeeping.nativeEvent);
	  var targetInst = ReactDOMComponentTree.getClosestInstanceFromNode(nativeEventTarget);
	
	  // Loop through the hierarchy, in case there's any nested components.
	  // It's important that we build the array of ancestors before calling any
	  // event handlers, because event handlers can modify the DOM, leading to
	  // inconsistencies with ReactMount's node cache. See #1105.
	  var ancestor = targetInst;
	  do {
	    bookKeeping.ancestors.push(ancestor);
	    ancestor = ancestor && findParent(ancestor);
	  } while (ancestor);
	
	  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
	    targetInst = bookKeeping.ancestors[i];
	    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
	  }
	}
	
	function scrollValueMonitor(cb) {
	  var scrollPosition = getUnboundedScrollPosition(window);
	  cb(scrollPosition);
	}
	
	var ReactEventListener = {
	  _enabled: true,
	  _handleTopLevel: null,
	
	  WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
	
	  setHandleTopLevel: function (handleTopLevel) {
	    ReactEventListener._handleTopLevel = handleTopLevel;
	  },
	
	  setEnabled: function (enabled) {
	    ReactEventListener._enabled = !!enabled;
	  },
	
	  isEnabled: function () {
	    return ReactEventListener._enabled;
	  },
	
	  /**
	   * Traps top-level events by using event bubbling.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} element Element on which to attach listener.
	   * @return {?object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapBubbledEvent: function (topLevelType, handlerBaseName, element) {
	    if (!element) {
	      return null;
	    }
	    return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
	  },
	
	  /**
	   * Traps a top-level event by using event capturing.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} element Element on which to attach listener.
	   * @return {?object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapCapturedEvent: function (topLevelType, handlerBaseName, element) {
	    if (!element) {
	      return null;
	    }
	    return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
	  },
	
	  monitorScrollValue: function (refresh) {
	    var callback = scrollValueMonitor.bind(null, refresh);
	    EventListener.listen(window, 'scroll', callback);
	  },
	
	  dispatchEvent: function (topLevelType, nativeEvent) {
	    if (!ReactEventListener._enabled) {
	      return;
	    }
	
	    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
	    try {
	      // Event queue being processed in the same cycle allows
	      // `preventDefault`.
	      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
	    } finally {
	      TopLevelCallbackBookKeeping.release(bookKeeping);
	    }
	  }
	};
	
	module.exports = ReactEventListener;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	var emptyFunction = __webpack_require__(9);
	
	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },
	
	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function capture(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    } else {
	      if (process.env.NODE_ENV !== 'production') {
	        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
	      }
	      return {
	        remove: emptyFunction
	      };
	    }
	  },
	
	  registerDefault: function registerDefault() {}
	};
	
	module.exports = EventListener;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 149 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	'use strict';
	
	/**
	 * Gets the scroll position of the supplied element or window.
	 *
	 * The return values are unbounded, unlike `getScrollPosition`. This means they
	 * may be negative or exceed the element boundaries (which is possible using
	 * inertial scrolling).
	 *
	 * @param {DOMWindow|DOMElement} scrollable
	 * @return {object} Map with `x` and `y` keys.
	 */
	
	function getUnboundedScrollPosition(scrollable) {
	  if (scrollable.Window && scrollable instanceof scrollable.Window) {
	    return {
	      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
	      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
	    };
	  }
	  return {
	    x: scrollable.scrollLeft,
	    y: scrollable.scrollTop
	  };
	}
	
	module.exports = getUnboundedScrollPosition;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMProperty = __webpack_require__(41);
	var EventPluginHub = __webpack_require__(47);
	var EventPluginUtils = __webpack_require__(49);
	var ReactComponentEnvironment = __webpack_require__(121);
	var ReactEmptyComponent = __webpack_require__(131);
	var ReactBrowserEventEmitter = __webpack_require__(111);
	var ReactHostComponent = __webpack_require__(132);
	var ReactUpdates = __webpack_require__(61);
	
	var ReactInjection = {
	  Component: ReactComponentEnvironment.injection,
	  DOMProperty: DOMProperty.injection,
	  EmptyComponent: ReactEmptyComponent.injection,
	  EventPluginHub: EventPluginHub.injection,
	  EventPluginUtils: EventPluginUtils.injection,
	  EventEmitter: ReactBrowserEventEmitter.injection,
	  HostComponent: ReactHostComponent.injection,
	  Updates: ReactUpdates.injection
	};
	
	module.exports = ReactInjection;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(4);
	
	var CallbackQueue = __webpack_require__(62);
	var PooledClass = __webpack_require__(55);
	var ReactBrowserEventEmitter = __webpack_require__(111);
	var ReactInputSelection = __webpack_require__(152);
	var ReactInstrumentation = __webpack_require__(67);
	var Transaction = __webpack_require__(73);
	var ReactUpdateQueue = __webpack_require__(141);
	
	/**
	 * Ensures that, when possible, the selection range (currently selected text
	 * input) is not disturbed by performing the transaction.
	 */
	var SELECTION_RESTORATION = {
	  /**
	   * @return {Selection} Selection information.
	   */
	  initialize: ReactInputSelection.getSelectionInformation,
	  /**
	   * @param {Selection} sel Selection information returned from `initialize`.
	   */
	  close: ReactInputSelection.restoreSelection
	};
	
	/**
	 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
	 * high level DOM manipulations (like temporarily removing a text input from the
	 * DOM).
	 */
	var EVENT_SUPPRESSION = {
	  /**
	   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
	   * the reconciliation.
	   */
	  initialize: function () {
	    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
	    ReactBrowserEventEmitter.setEnabled(false);
	    return currentlyEnabled;
	  },
	
	  /**
	   * @param {boolean} previouslyEnabled Enabled status of
	   *   `ReactBrowserEventEmitter` before the reconciliation occurred. `close`
	   *   restores the previous value.
	   */
	  close: function (previouslyEnabled) {
	    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
	  }
	};
	
	/**
	 * Provides a queue for collecting `componentDidMount` and
	 * `componentDidUpdate` callbacks during the transaction.
	 */
	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function () {
	    this.reactMountReady.reset();
	  },
	
	  /**
	   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
	   */
	  close: function () {
	    this.reactMountReady.notifyAll();
	  }
	};
	
	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];
	
	if (process.env.NODE_ENV !== 'production') {
	  TRANSACTION_WRAPPERS.push({
	    initialize: ReactInstrumentation.debugTool.onBeginFlush,
	    close: ReactInstrumentation.debugTool.onEndFlush
	  });
	}
	
	/**
	 * Currently:
	 * - The order that these are listed in the transaction is critical:
	 * - Suppresses events.
	 * - Restores selection range.
	 *
	 * Future:
	 * - Restore document/overflow scroll positions that were unintentionally
	 *   modified via DOM insertions above the top viewport boundary.
	 * - Implement/integrate with customized constraint based layout system and keep
	 *   track of which dimensions must be remeasured.
	 *
	 * @class ReactReconcileTransaction
	 */
	function ReactReconcileTransaction(useCreateElement) {
	  this.reinitializeTransaction();
	  // Only server-side rendering really needs this option (see
	  // `ReactServerRendering`), but server-side uses
	  // `ReactServerRenderingTransaction` instead. This option is here so that it's
	  // accessible and defaults to false when `ReactDOMComponent` and
	  // `ReactDOMTextComponent` checks it in `mountComponent`.`
	  this.renderToStaticMarkup = false;
	  this.reactMountReady = CallbackQueue.getPooled(null);
	  this.useCreateElement = useCreateElement;
	}
	
	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array<object>} List of operation wrap procedures.
	   *   TODO: convert to array<TransactionWrapper>
	   */
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS;
	  },
	
	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function () {
	    return this.reactMountReady;
	  },
	
	  /**
	   * @return {object} The queue to collect React async events.
	   */
	  getUpdateQueue: function () {
	    return ReactUpdateQueue;
	  },
	
	  /**
	   * Save current transaction state -- if the return value from this method is
	   * passed to `rollback`, the transaction will be reset to that state.
	   */
	  checkpoint: function () {
	    // reactMountReady is the our only stateful wrapper
	    return this.reactMountReady.checkpoint();
	  },
	
	  rollback: function (checkpoint) {
	    this.reactMountReady.rollback(checkpoint);
	  },
	
	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be reused.
	   */
	  destructor: function () {
	    CallbackQueue.release(this.reactMountReady);
	    this.reactMountReady = null;
	  }
	};
	
	_assign(ReactReconcileTransaction.prototype, Transaction, Mixin);
	
	PooledClass.addPoolingTo(ReactReconcileTransaction);
	
	module.exports = ReactReconcileTransaction;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactDOMSelection = __webpack_require__(153);
	
	var containsNode = __webpack_require__(155);
	var focusNode = __webpack_require__(100);
	var getActiveElement = __webpack_require__(158);
	
	function isInDocument(node) {
	  return containsNode(document.documentElement, node);
	}
	
	/**
	 * @ReactInputSelection: React input selection module. Based on Selection.js,
	 * but modified to be suitable for react and has a couple of bug fixes (doesn't
	 * assume buttons have range selections allowed).
	 * Input selection module for React.
	 */
	var ReactInputSelection = {
	  hasSelectionCapabilities: function (elem) {
	    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
	    return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
	  },
	
	  getSelectionInformation: function () {
	    var focusedElem = getActiveElement();
	    return {
	      focusedElem: focusedElem,
	      selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
	    };
	  },
	
	  /**
	   * @restoreSelection: If any selection information was potentially lost,
	   * restore it. This is useful when performing operations that could remove dom
	   * nodes and place them back in, resulting in focus being lost.
	   */
	  restoreSelection: function (priorSelectionInformation) {
	    var curFocusedElem = getActiveElement();
	    var priorFocusedElem = priorSelectionInformation.focusedElem;
	    var priorSelectionRange = priorSelectionInformation.selectionRange;
	    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
	      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
	        ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
	      }
	      focusNode(priorFocusedElem);
	    }
	  },
	
	  /**
	   * @getSelection: Gets the selection bounds of a focused textarea, input or
	   * contentEditable node.
	   * -@input: Look up selection bounds of this input
	   * -@return {start: selectionStart, end: selectionEnd}
	   */
	  getSelection: function (input) {
	    var selection;
	
	    if ('selectionStart' in input) {
	      // Modern browser with input or textarea.
	      selection = {
	        start: input.selectionStart,
	        end: input.selectionEnd
	      };
	    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
	      // IE8 input.
	      var range = document.selection.createRange();
	      // There can only be one selection per document in IE, so it must
	      // be in our element.
	      if (range.parentElement() === input) {
	        selection = {
	          start: -range.moveStart('character', -input.value.length),
	          end: -range.moveEnd('character', -input.value.length)
	        };
	      }
	    } else {
	      // Content editable or old IE textarea.
	      selection = ReactDOMSelection.getOffsets(input);
	    }
	
	    return selection || { start: 0, end: 0 };
	  },
	
	  /**
	   * @setSelection: Sets the selection bounds of a textarea or input and focuses
	   * the input.
	   * -@input     Set selection bounds of this input or textarea
	   * -@offsets   Object of same form that is returned from get*
	   */
	  setSelection: function (input, offsets) {
	    var start = offsets.start;
	    var end = offsets.end;
	    if (end === undefined) {
	      end = start;
	    }
	
	    if ('selectionStart' in input) {
	      input.selectionStart = start;
	      input.selectionEnd = Math.min(end, input.value.length);
	    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
	      var range = input.createTextRange();
	      range.collapse(true);
	      range.moveStart('character', start);
	      range.moveEnd('character', end - start);
	      range.select();
	    } else {
	      ReactDOMSelection.setOffsets(input, offsets);
	    }
	  }
	};
	
	module.exports = ReactInputSelection;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ExecutionEnvironment = __webpack_require__(53);
	
	var getNodeForCharacterOffset = __webpack_require__(154);
	var getTextContentAccessor = __webpack_require__(56);
	
	/**
	 * While `isCollapsed` is available on the Selection object and `collapsed`
	 * is available on the Range object, IE11 sometimes gets them wrong.
	 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
	 */
	function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
	  return anchorNode === focusNode && anchorOffset === focusOffset;
	}
	
	/**
	 * Get the appropriate anchor and focus node/offset pairs for IE.
	 *
	 * The catch here is that IE's selection API doesn't provide information
	 * about whether the selection is forward or backward, so we have to
	 * behave as though it's always forward.
	 *
	 * IE text differs from modern selection in that it behaves as though
	 * block elements end with a new line. This means character offsets will
	 * differ between the two APIs.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */
	function getIEOffsets(node) {
	  var selection = document.selection;
	  var selectedRange = selection.createRange();
	  var selectedLength = selectedRange.text.length;
	
	  // Duplicate selection so we can move range without breaking user selection.
	  var fromStart = selectedRange.duplicate();
	  fromStart.moveToElementText(node);
	  fromStart.setEndPoint('EndToStart', selectedRange);
	
	  var startOffset = fromStart.text.length;
	  var endOffset = startOffset + selectedLength;
	
	  return {
	    start: startOffset,
	    end: endOffset
	  };
	}
	
	/**
	 * @param {DOMElement} node
	 * @return {?object}
	 */
	function getModernOffsets(node) {
	  var selection = window.getSelection && window.getSelection();
	
	  if (!selection || selection.rangeCount === 0) {
	    return null;
	  }
	
	  var anchorNode = selection.anchorNode;
	  var anchorOffset = selection.anchorOffset;
	  var focusNode = selection.focusNode;
	  var focusOffset = selection.focusOffset;
	
	  var currentRange = selection.getRangeAt(0);
	
	  // In Firefox, range.startContainer and range.endContainer can be "anonymous
	  // divs", e.g. the up/down buttons on an <input type="number">. Anonymous
	  // divs do not seem to expose properties, triggering a "Permission denied
	  // error" if any of its properties are accessed. The only seemingly possible
	  // way to avoid erroring is to access a property that typically works for
	  // non-anonymous divs and catch any error that may otherwise arise. See
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427
	  try {
	    /* eslint-disable no-unused-expressions */
	    currentRange.startContainer.nodeType;
	    currentRange.endContainer.nodeType;
	    /* eslint-enable no-unused-expressions */
	  } catch (e) {
	    return null;
	  }
	
	  // If the node and offset values are the same, the selection is collapsed.
	  // `Selection.isCollapsed` is available natively, but IE sometimes gets
	  // this value wrong.
	  var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
	
	  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
	
	  var tempRange = currentRange.cloneRange();
	  tempRange.selectNodeContents(node);
	  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
	
	  var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);
	
	  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
	  var end = start + rangeLength;
	
	  // Detect whether the selection is backward.
	  var detectionRange = document.createRange();
	  detectionRange.setStart(anchorNode, anchorOffset);
	  detectionRange.setEnd(focusNode, focusOffset);
	  var isBackward = detectionRange.collapsed;
	
	  return {
	    start: isBackward ? end : start,
	    end: isBackward ? start : end
	  };
	}
	
	/**
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setIEOffsets(node, offsets) {
	  var range = document.selection.createRange().duplicate();
	  var start, end;
	
	  if (offsets.end === undefined) {
	    start = offsets.start;
	    end = start;
	  } else if (offsets.start > offsets.end) {
	    start = offsets.end;
	    end = offsets.start;
	  } else {
	    start = offsets.start;
	    end = offsets.end;
	  }
	
	  range.moveToElementText(node);
	  range.moveStart('character', start);
	  range.setEndPoint('EndToStart', range);
	  range.moveEnd('character', end - start);
	  range.select();
	}
	
	/**
	 * In modern non-IE browsers, we can support both forward and backward
	 * selections.
	 *
	 * Note: IE10+ supports the Selection object, but it does not support
	 * the `extend` method, which means that even in modern IE, it's not possible
	 * to programmatically create a backward selection. Thus, for all IE
	 * versions, we use the old IE API to create our selections.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setModernOffsets(node, offsets) {
	  if (!window.getSelection) {
	    return;
	  }
	
	  var selection = window.getSelection();
	  var length = node[getTextContentAccessor()].length;
	  var start = Math.min(offsets.start, length);
	  var end = offsets.end === undefined ? start : Math.min(offsets.end, length);
	
	  // IE 11 uses modern selection, but doesn't support the extend method.
	  // Flip backward selections, so we can set with a single range.
	  if (!selection.extend && start > end) {
	    var temp = end;
	    end = start;
	    start = temp;
	  }
	
	  var startMarker = getNodeForCharacterOffset(node, start);
	  var endMarker = getNodeForCharacterOffset(node, end);
	
	  if (startMarker && endMarker) {
	    var range = document.createRange();
	    range.setStart(startMarker.node, startMarker.offset);
	    selection.removeAllRanges();
	
	    if (start > end) {
	      selection.addRange(range);
	      selection.extend(endMarker.node, endMarker.offset);
	    } else {
	      range.setEnd(endMarker.node, endMarker.offset);
	      selection.addRange(range);
	    }
	  }
	}
	
	var useIEOffsets = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);
	
	var ReactDOMSelection = {
	  /**
	   * @param {DOMElement} node
	   */
	  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
	
	  /**
	   * @param {DOMElement|DOMTextNode} node
	   * @param {object} offsets
	   */
	  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
	};
	
	module.exports = ReactDOMSelection;

/***/ }),
/* 154 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Given any node return the first leaf node without children.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {DOMElement|DOMTextNode}
	 */
	
	function getLeafNode(node) {
	  while (node && node.firstChild) {
	    node = node.firstChild;
	  }
	  return node;
	}
	
	/**
	 * Get the next sibling within a container. This will walk up the
	 * DOM if a node's siblings have been exhausted.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {?DOMElement|DOMTextNode}
	 */
	function getSiblingNode(node) {
	  while (node) {
	    if (node.nextSibling) {
	      return node.nextSibling;
	    }
	    node = node.parentNode;
	  }
	}
	
	/**
	 * Get object describing the nodes which contain characters at offset.
	 *
	 * @param {DOMElement|DOMTextNode} root
	 * @param {number} offset
	 * @return {?object}
	 */
	function getNodeForCharacterOffset(root, offset) {
	  var node = getLeafNode(root);
	  var nodeStart = 0;
	  var nodeEnd = 0;
	
	  while (node) {
	    if (node.nodeType === 3) {
	      nodeEnd = nodeStart + node.textContent.length;
	
	      if (nodeStart <= offset && nodeEnd >= offset) {
	        return {
	          node: node,
	          offset: offset - nodeStart
	        };
	      }
	
	      nodeStart = nodeEnd;
	    }
	
	    node = getLeafNode(getSiblingNode(node));
	  }
	}
	
	module.exports = getNodeForCharacterOffset;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	var isTextNode = __webpack_require__(156);
	
	/*eslint-disable no-bitwise */
	
	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 */
	function containsNode(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode(outerNode)) {
	    return false;
	  } else if (isTextNode(innerNode)) {
	    return containsNode(outerNode, innerNode.parentNode);
	  } else if ('contains' in outerNode) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}
	
	module.exports = containsNode;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	var isNode = __webpack_require__(157);
	
	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode(object) && object.nodeType == 3;
	}
	
	module.exports = isTextNode;

/***/ }),
/* 157 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  var doc = object ? object.ownerDocument || object : document;
	  var defaultView = doc.defaultView || window;
	  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
	}
	
	module.exports = isNode;

/***/ }),
/* 158 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */
	
	/* eslint-disable fb-www/typeof-undefined */
	
	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document or document body is not
	 * yet defined.
	 *
	 * @param {?DOMDocument} doc Defaults to current document.
	 * @return {?DOMElement}
	 */
	function getActiveElement(doc) /*?DOMElement*/{
	  doc = doc || (typeof document !== 'undefined' ? document : undefined);
	  if (typeof doc === 'undefined') {
	    return null;
	  }
	  try {
	    return doc.activeElement || doc.body;
	  } catch (e) {
	    return doc.body;
	  }
	}
	
	module.exports = getActiveElement;

/***/ }),
/* 159 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var NS = {
	  xlink: 'http://www.w3.org/1999/xlink',
	  xml: 'http://www.w3.org/XML/1998/namespace'
	};
	
	// We use attributes for everything SVG so let's avoid some duplication and run
	// code instead.
	// The following are all specified in the HTML config already so we exclude here.
	// - class (as className)
	// - color
	// - height
	// - id
	// - lang
	// - max
	// - media
	// - method
	// - min
	// - name
	// - style
	// - target
	// - type
	// - width
	var ATTRS = {
	  accentHeight: 'accent-height',
	  accumulate: 0,
	  additive: 0,
	  alignmentBaseline: 'alignment-baseline',
	  allowReorder: 'allowReorder',
	  alphabetic: 0,
	  amplitude: 0,
	  arabicForm: 'arabic-form',
	  ascent: 0,
	  attributeName: 'attributeName',
	  attributeType: 'attributeType',
	  autoReverse: 'autoReverse',
	  azimuth: 0,
	  baseFrequency: 'baseFrequency',
	  baseProfile: 'baseProfile',
	  baselineShift: 'baseline-shift',
	  bbox: 0,
	  begin: 0,
	  bias: 0,
	  by: 0,
	  calcMode: 'calcMode',
	  capHeight: 'cap-height',
	  clip: 0,
	  clipPath: 'clip-path',
	  clipRule: 'clip-rule',
	  clipPathUnits: 'clipPathUnits',
	  colorInterpolation: 'color-interpolation',
	  colorInterpolationFilters: 'color-interpolation-filters',
	  colorProfile: 'color-profile',
	  colorRendering: 'color-rendering',
	  contentScriptType: 'contentScriptType',
	  contentStyleType: 'contentStyleType',
	  cursor: 0,
	  cx: 0,
	  cy: 0,
	  d: 0,
	  decelerate: 0,
	  descent: 0,
	  diffuseConstant: 'diffuseConstant',
	  direction: 0,
	  display: 0,
	  divisor: 0,
	  dominantBaseline: 'dominant-baseline',
	  dur: 0,
	  dx: 0,
	  dy: 0,
	  edgeMode: 'edgeMode',
	  elevation: 0,
	  enableBackground: 'enable-background',
	  end: 0,
	  exponent: 0,
	  externalResourcesRequired: 'externalResourcesRequired',
	  fill: 0,
	  fillOpacity: 'fill-opacity',
	  fillRule: 'fill-rule',
	  filter: 0,
	  filterRes: 'filterRes',
	  filterUnits: 'filterUnits',
	  floodColor: 'flood-color',
	  floodOpacity: 'flood-opacity',
	  focusable: 0,
	  fontFamily: 'font-family',
	  fontSize: 'font-size',
	  fontSizeAdjust: 'font-size-adjust',
	  fontStretch: 'font-stretch',
	  fontStyle: 'font-style',
	  fontVariant: 'font-variant',
	  fontWeight: 'font-weight',
	  format: 0,
	  from: 0,
	  fx: 0,
	  fy: 0,
	  g1: 0,
	  g2: 0,
	  glyphName: 'glyph-name',
	  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
	  glyphOrientationVertical: 'glyph-orientation-vertical',
	  glyphRef: 'glyphRef',
	  gradientTransform: 'gradientTransform',
	  gradientUnits: 'gradientUnits',
	  hanging: 0,
	  horizAdvX: 'horiz-adv-x',
	  horizOriginX: 'horiz-origin-x',
	  ideographic: 0,
	  imageRendering: 'image-rendering',
	  'in': 0,
	  in2: 0,
	  intercept: 0,
	  k: 0,
	  k1: 0,
	  k2: 0,
	  k3: 0,
	  k4: 0,
	  kernelMatrix: 'kernelMatrix',
	  kernelUnitLength: 'kernelUnitLength',
	  kerning: 0,
	  keyPoints: 'keyPoints',
	  keySplines: 'keySplines',
	  keyTimes: 'keyTimes',
	  lengthAdjust: 'lengthAdjust',
	  letterSpacing: 'letter-spacing',
	  lightingColor: 'lighting-color',
	  limitingConeAngle: 'limitingConeAngle',
	  local: 0,
	  markerEnd: 'marker-end',
	  markerMid: 'marker-mid',
	  markerStart: 'marker-start',
	  markerHeight: 'markerHeight',
	  markerUnits: 'markerUnits',
	  markerWidth: 'markerWidth',
	  mask: 0,
	  maskContentUnits: 'maskContentUnits',
	  maskUnits: 'maskUnits',
	  mathematical: 0,
	  mode: 0,
	  numOctaves: 'numOctaves',
	  offset: 0,
	  opacity: 0,
	  operator: 0,
	  order: 0,
	  orient: 0,
	  orientation: 0,
	  origin: 0,
	  overflow: 0,
	  overlinePosition: 'overline-position',
	  overlineThickness: 'overline-thickness',
	  paintOrder: 'paint-order',
	  panose1: 'panose-1',
	  pathLength: 'pathLength',
	  patternContentUnits: 'patternContentUnits',
	  patternTransform: 'patternTransform',
	  patternUnits: 'patternUnits',
	  pointerEvents: 'pointer-events',
	  points: 0,
	  pointsAtX: 'pointsAtX',
	  pointsAtY: 'pointsAtY',
	  pointsAtZ: 'pointsAtZ',
	  preserveAlpha: 'preserveAlpha',
	  preserveAspectRatio: 'preserveAspectRatio',
	  primitiveUnits: 'primitiveUnits',
	  r: 0,
	  radius: 0,
	  refX: 'refX',
	  refY: 'refY',
	  renderingIntent: 'rendering-intent',
	  repeatCount: 'repeatCount',
	  repeatDur: 'repeatDur',
	  requiredExtensions: 'requiredExtensions',
	  requiredFeatures: 'requiredFeatures',
	  restart: 0,
	  result: 0,
	  rotate: 0,
	  rx: 0,
	  ry: 0,
	  scale: 0,
	  seed: 0,
	  shapeRendering: 'shape-rendering',
	  slope: 0,
	  spacing: 0,
	  specularConstant: 'specularConstant',
	  specularExponent: 'specularExponent',
	  speed: 0,
	  spreadMethod: 'spreadMethod',
	  startOffset: 'startOffset',
	  stdDeviation: 'stdDeviation',
	  stemh: 0,
	  stemv: 0,
	  stitchTiles: 'stitchTiles',
	  stopColor: 'stop-color',
	  stopOpacity: 'stop-opacity',
	  strikethroughPosition: 'strikethrough-position',
	  strikethroughThickness: 'strikethrough-thickness',
	  string: 0,
	  stroke: 0,
	  strokeDasharray: 'stroke-dasharray',
	  strokeDashoffset: 'stroke-dashoffset',
	  strokeLinecap: 'stroke-linecap',
	  strokeLinejoin: 'stroke-linejoin',
	  strokeMiterlimit: 'stroke-miterlimit',
	  strokeOpacity: 'stroke-opacity',
	  strokeWidth: 'stroke-width',
	  surfaceScale: 'surfaceScale',
	  systemLanguage: 'systemLanguage',
	  tableValues: 'tableValues',
	  targetX: 'targetX',
	  targetY: 'targetY',
	  textAnchor: 'text-anchor',
	  textDecoration: 'text-decoration',
	  textRendering: 'text-rendering',
	  textLength: 'textLength',
	  to: 0,
	  transform: 0,
	  u1: 0,
	  u2: 0,
	  underlinePosition: 'underline-position',
	  underlineThickness: 'underline-thickness',
	  unicode: 0,
	  unicodeBidi: 'unicode-bidi',
	  unicodeRange: 'unicode-range',
	  unitsPerEm: 'units-per-em',
	  vAlphabetic: 'v-alphabetic',
	  vHanging: 'v-hanging',
	  vIdeographic: 'v-ideographic',
	  vMathematical: 'v-mathematical',
	  values: 0,
	  vectorEffect: 'vector-effect',
	  version: 0,
	  vertAdvY: 'vert-adv-y',
	  vertOriginX: 'vert-origin-x',
	  vertOriginY: 'vert-origin-y',
	  viewBox: 'viewBox',
	  viewTarget: 'viewTarget',
	  visibility: 0,
	  widths: 0,
	  wordSpacing: 'word-spacing',
	  writingMode: 'writing-mode',
	  x: 0,
	  xHeight: 'x-height',
	  x1: 0,
	  x2: 0,
	  xChannelSelector: 'xChannelSelector',
	  xlinkActuate: 'xlink:actuate',
	  xlinkArcrole: 'xlink:arcrole',
	  xlinkHref: 'xlink:href',
	  xlinkRole: 'xlink:role',
	  xlinkShow: 'xlink:show',
	  xlinkTitle: 'xlink:title',
	  xlinkType: 'xlink:type',
	  xmlBase: 'xml:base',
	  xmlns: 0,
	  xmlnsXlink: 'xmlns:xlink',
	  xmlLang: 'xml:lang',
	  xmlSpace: 'xml:space',
	  y: 0,
	  y1: 0,
	  y2: 0,
	  yChannelSelector: 'yChannelSelector',
	  z: 0,
	  zoomAndPan: 'zoomAndPan'
	};
	
	var SVGDOMPropertyConfig = {
	  Properties: {},
	  DOMAttributeNamespaces: {
	    xlinkActuate: NS.xlink,
	    xlinkArcrole: NS.xlink,
	    xlinkHref: NS.xlink,
	    xlinkRole: NS.xlink,
	    xlinkShow: NS.xlink,
	    xlinkTitle: NS.xlink,
	    xlinkType: NS.xlink,
	    xmlBase: NS.xml,
	    xmlLang: NS.xml,
	    xmlSpace: NS.xml
	  },
	  DOMAttributeNames: {}
	};
	
	Object.keys(ATTRS).forEach(function (key) {
	  SVGDOMPropertyConfig.Properties[key] = 0;
	  if (ATTRS[key]) {
	    SVGDOMPropertyConfig.DOMAttributeNames[key] = ATTRS[key];
	  }
	});
	
	module.exports = SVGDOMPropertyConfig;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var EventPropagators = __webpack_require__(46);
	var ExecutionEnvironment = __webpack_require__(53);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactInputSelection = __webpack_require__(152);
	var SyntheticEvent = __webpack_require__(58);
	
	var getActiveElement = __webpack_require__(158);
	var isTextInputElement = __webpack_require__(77);
	var shallowEqual = __webpack_require__(129);
	
	var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;
	
	var eventTypes = {
	  select: {
	    phasedRegistrationNames: {
	      bubbled: 'onSelect',
	      captured: 'onSelectCapture'
	    },
	    dependencies: ['topBlur', 'topContextMenu', 'topFocus', 'topKeyDown', 'topKeyUp', 'topMouseDown', 'topMouseUp', 'topSelectionChange']
	  }
	};
	
	var activeElement = null;
	var activeElementInst = null;
	var lastSelection = null;
	var mouseDown = false;
	
	// Track whether a listener exists for this plugin. If none exist, we do
	// not extract events. See #3639.
	var hasListener = false;
	
	/**
	 * Get an object which is a unique representation of the current selection.
	 *
	 * The return value will not be consistent across nodes or browsers, but
	 * two identical selections on the same node will return identical objects.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */
	function getSelection(node) {
	  if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
	    return {
	      start: node.selectionStart,
	      end: node.selectionEnd
	    };
	  } else if (window.getSelection) {
	    var selection = window.getSelection();
	    return {
	      anchorNode: selection.anchorNode,
	      anchorOffset: selection.anchorOffset,
	      focusNode: selection.focusNode,
	      focusOffset: selection.focusOffset
	    };
	  } else if (document.selection) {
	    var range = document.selection.createRange();
	    return {
	      parentElement: range.parentElement(),
	      text: range.text,
	      top: range.boundingTop,
	      left: range.boundingLeft
	    };
	  }
	}
	
	/**
	 * Poll selection to see whether it's changed.
	 *
	 * @param {object} nativeEvent
	 * @return {?SyntheticEvent}
	 */
	function constructSelectEvent(nativeEvent, nativeEventTarget) {
	  // Ensure we have the right element, and that the user is not dragging a
	  // selection (this matches native `select` event behavior). In HTML5, select
	  // fires only on input and textarea thus if there's no focused element we
	  // won't dispatch.
	  if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
	    return null;
	  }
	
	  // Only fire when selection has actually changed.
	  var currentSelection = getSelection(activeElement);
	  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
	    lastSelection = currentSelection;
	
	    var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementInst, nativeEvent, nativeEventTarget);
	
	    syntheticEvent.type = 'select';
	    syntheticEvent.target = activeElement;
	
	    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
	
	    return syntheticEvent;
	  }
	
	  return null;
	}
	
	/**
	 * This plugin creates an `onSelect` event that normalizes select events
	 * across form elements.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - contentEditable
	 *
	 * This differs from native browser implementations in the following ways:
	 * - Fires on contentEditable fields as well as inputs.
	 * - Fires for collapsed selection.
	 * - Fires after user input.
	 */
	var SelectEventPlugin = {
	  eventTypes: eventTypes,
	
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    if (!hasListener) {
	      return null;
	    }
	
	    var targetNode = targetInst ? ReactDOMComponentTree.getNodeFromInstance(targetInst) : window;
	
	    switch (topLevelType) {
	      // Track the input node that has focus.
	      case 'topFocus':
	        if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
	          activeElement = targetNode;
	          activeElementInst = targetInst;
	          lastSelection = null;
	        }
	        break;
	      case 'topBlur':
	        activeElement = null;
	        activeElementInst = null;
	        lastSelection = null;
	        break;
	      // Don't fire the event while the user is dragging. This matches the
	      // semantics of the native select event.
	      case 'topMouseDown':
	        mouseDown = true;
	        break;
	      case 'topContextMenu':
	      case 'topMouseUp':
	        mouseDown = false;
	        return constructSelectEvent(nativeEvent, nativeEventTarget);
	      // Chrome and IE fire non-standard event when selection is changed (and
	      // sometimes when it hasn't). IE's event fires out of order with respect
	      // to key and input events on deletion, so we discard it.
	      //
	      // Firefox doesn't support selectionchange, so check selection status
	      // after each key entry. The selection changes after keydown and before
	      // keyup, but we check on keydown as well in the case of holding down a
	      // key, when multiple keydown events are fired but only one keyup is.
	      // This is also our approach for IE handling, for the reason above.
	      case 'topSelectionChange':
	        if (skipSelectionChangeEvent) {
	          break;
	        }
	      // falls through
	      case 'topKeyDown':
	      case 'topKeyUp':
	        return constructSelectEvent(nativeEvent, nativeEventTarget);
	    }
	
	    return null;
	  },
	
	  didPutListener: function (inst, registrationName, listener) {
	    if (registrationName === 'onSelect') {
	      hasListener = true;
	    }
	  }
	};
	
	module.exports = SelectEventPlugin;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var EventListener = __webpack_require__(148);
	var EventPropagators = __webpack_require__(46);
	var ReactDOMComponentTree = __webpack_require__(39);
	var SyntheticAnimationEvent = __webpack_require__(162);
	var SyntheticClipboardEvent = __webpack_require__(163);
	var SyntheticEvent = __webpack_require__(58);
	var SyntheticFocusEvent = __webpack_require__(164);
	var SyntheticKeyboardEvent = __webpack_require__(165);
	var SyntheticMouseEvent = __webpack_require__(80);
	var SyntheticDragEvent = __webpack_require__(168);
	var SyntheticTouchEvent = __webpack_require__(169);
	var SyntheticTransitionEvent = __webpack_require__(170);
	var SyntheticUIEvent = __webpack_require__(81);
	var SyntheticWheelEvent = __webpack_require__(171);
	
	var emptyFunction = __webpack_require__(9);
	var getEventCharCode = __webpack_require__(166);
	var invariant = __webpack_require__(12);
	
	/**
	 * Turns
	 * ['abort', ...]
	 * into
	 * eventTypes = {
	 *   'abort': {
	 *     phasedRegistrationNames: {
	 *       bubbled: 'onAbort',
	 *       captured: 'onAbortCapture',
	 *     },
	 *     dependencies: ['topAbort'],
	 *   },
	 *   ...
	 * };
	 * topLevelEventsToDispatchConfig = {
	 *   'topAbort': { sameConfig }
	 * };
	 */
	var eventTypes = {};
	var topLevelEventsToDispatchConfig = {};
	['abort', 'animationEnd', 'animationIteration', 'animationStart', 'blur', 'canPlay', 'canPlayThrough', 'click', 'contextMenu', 'copy', 'cut', 'doubleClick', 'drag', 'dragEnd', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'dragStart', 'drop', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'paste', 'pause', 'play', 'playing', 'progress', 'rateChange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeUpdate', 'touchCancel', 'touchEnd', 'touchMove', 'touchStart', 'transitionEnd', 'volumeChange', 'waiting', 'wheel'].forEach(function (event) {
	  var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
	  var onEvent = 'on' + capitalizedEvent;
	  var topEvent = 'top' + capitalizedEvent;
	
	  var type = {
	    phasedRegistrationNames: {
	      bubbled: onEvent,
	      captured: onEvent + 'Capture'
	    },
	    dependencies: [topEvent]
	  };
	  eventTypes[event] = type;
	  topLevelEventsToDispatchConfig[topEvent] = type;
	});
	
	var onClickListeners = {};
	
	function getDictionaryKey(inst) {
	  // Prevents V8 performance issue:
	  // https://github.com/facebook/react/pull/7232
	  return '.' + inst._rootNodeID;
	}
	
	function isInteractive(tag) {
	  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
	}
	
	var SimpleEventPlugin = {
	  eventTypes: eventTypes,
	
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
	    if (!dispatchConfig) {
	      return null;
	    }
	    var EventConstructor;
	    switch (topLevelType) {
	      case 'topAbort':
	      case 'topCanPlay':
	      case 'topCanPlayThrough':
	      case 'topDurationChange':
	      case 'topEmptied':
	      case 'topEncrypted':
	      case 'topEnded':
	      case 'topError':
	      case 'topInput':
	      case 'topInvalid':
	      case 'topLoad':
	      case 'topLoadedData':
	      case 'topLoadedMetadata':
	      case 'topLoadStart':
	      case 'topPause':
	      case 'topPlay':
	      case 'topPlaying':
	      case 'topProgress':
	      case 'topRateChange':
	      case 'topReset':
	      case 'topSeeked':
	      case 'topSeeking':
	      case 'topStalled':
	      case 'topSubmit':
	      case 'topSuspend':
	      case 'topTimeUpdate':
	      case 'topVolumeChange':
	      case 'topWaiting':
	        // HTML Events
	        // @see http://www.w3.org/TR/html5/index.html#events-0
	        EventConstructor = SyntheticEvent;
	        break;
	      case 'topKeyPress':
	        // Firefox creates a keypress event for function keys too. This removes
	        // the unwanted keypress events. Enter is however both printable and
	        // non-printable. One would expect Tab to be as well (but it isn't).
	        if (getEventCharCode(nativeEvent) === 0) {
	          return null;
	        }
	      /* falls through */
	      case 'topKeyDown':
	      case 'topKeyUp':
	        EventConstructor = SyntheticKeyboardEvent;
	        break;
	      case 'topBlur':
	      case 'topFocus':
	        EventConstructor = SyntheticFocusEvent;
	        break;
	      case 'topClick':
	        // Firefox creates a click event on right mouse clicks. This removes the
	        // unwanted click events.
	        if (nativeEvent.button === 2) {
	          return null;
	        }
	      /* falls through */
	      case 'topDoubleClick':
	      case 'topMouseDown':
	      case 'topMouseMove':
	      case 'topMouseUp':
	      // TODO: Disabled elements should not respond to mouse events
	      /* falls through */
	      case 'topMouseOut':
	      case 'topMouseOver':
	      case 'topContextMenu':
	        EventConstructor = SyntheticMouseEvent;
	        break;
	      case 'topDrag':
	      case 'topDragEnd':
	      case 'topDragEnter':
	      case 'topDragExit':
	      case 'topDragLeave':
	      case 'topDragOver':
	      case 'topDragStart':
	      case 'topDrop':
	        EventConstructor = SyntheticDragEvent;
	        break;
	      case 'topTouchCancel':
	      case 'topTouchEnd':
	      case 'topTouchMove':
	      case 'topTouchStart':
	        EventConstructor = SyntheticTouchEvent;
	        break;
	      case 'topAnimationEnd':
	      case 'topAnimationIteration':
	      case 'topAnimationStart':
	        EventConstructor = SyntheticAnimationEvent;
	        break;
	      case 'topTransitionEnd':
	        EventConstructor = SyntheticTransitionEvent;
	        break;
	      case 'topScroll':
	        EventConstructor = SyntheticUIEvent;
	        break;
	      case 'topWheel':
	        EventConstructor = SyntheticWheelEvent;
	        break;
	      case 'topCopy':
	      case 'topCut':
	      case 'topPaste':
	        EventConstructor = SyntheticClipboardEvent;
	        break;
	    }
	    !EventConstructor ? process.env.NODE_ENV !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : _prodInvariant('86', topLevelType) : void 0;
	    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  },
	
	  didPutListener: function (inst, registrationName, listener) {
	    // Mobile Safari does not fire properly bubble click events on
	    // non-interactive elements, which means delegated click listeners do not
	    // fire. The workaround for this bug involves attaching an empty click
	    // listener on the target node.
	    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
	    if (registrationName === 'onClick' && !isInteractive(inst._tag)) {
	      var key = getDictionaryKey(inst);
	      var node = ReactDOMComponentTree.getNodeFromInstance(inst);
	      if (!onClickListeners[key]) {
	        onClickListeners[key] = EventListener.listen(node, 'click', emptyFunction);
	      }
	    }
	  },
	
	  willDeleteListener: function (inst, registrationName) {
	    if (registrationName === 'onClick' && !isInteractive(inst._tag)) {
	      var key = getDictionaryKey(inst);
	      onClickListeners[key].remove();
	      delete onClickListeners[key];
	    }
	  }
	};
	
	module.exports = SimpleEventPlugin;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticEvent = __webpack_require__(58);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
	 */
	var AnimationEventInterface = {
	  animationName: null,
	  elapsedTime: null,
	  pseudoElement: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */
	function SyntheticAnimationEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticEvent.augmentClass(SyntheticAnimationEvent, AnimationEventInterface);
	
	module.exports = SyntheticAnimationEvent;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticEvent = __webpack_require__(58);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/clipboard-apis/
	 */
	var ClipboardEventInterface = {
	  clipboardData: function (event) {
	    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
	
	module.exports = SyntheticClipboardEvent;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticUIEvent = __webpack_require__(81);
	
	/**
	 * @interface FocusEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var FocusEventInterface = {
	  relatedTarget: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
	
	module.exports = SyntheticFocusEvent;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticUIEvent = __webpack_require__(81);
	
	var getEventCharCode = __webpack_require__(166);
	var getEventKey = __webpack_require__(167);
	var getEventModifierState = __webpack_require__(83);
	
	/**
	 * @interface KeyboardEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var KeyboardEventInterface = {
	  key: getEventKey,
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  getModifierState: getEventModifierState,
	  // Legacy Interface
	  charCode: function (event) {
	    // `charCode` is the result of a KeyPress event and represents the value of
	    // the actual printable character.
	
	    // KeyPress is deprecated, but its replacement is not yet final and not
	    // implemented in any major browser. Only KeyPress has charCode.
	    if (event.type === 'keypress') {
	      return getEventCharCode(event);
	    }
	    return 0;
	  },
	  keyCode: function (event) {
	    // `keyCode` is the result of a KeyDown/Up event and represents the value of
	    // physical keyboard key.
	
	    // The actual meaning of the value depends on the users' keyboard layout
	    // which cannot be detected. Assuming that it is a US keyboard layout
	    // provides a surprisingly accurate mapping for US and European users.
	    // Due to this, it is left to the user to implement at this time.
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }
	    return 0;
	  },
	  which: function (event) {
	    // `which` is an alias for either `keyCode` or `charCode` depending on the
	    // type of the event.
	    if (event.type === 'keypress') {
	      return getEventCharCode(event);
	    }
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }
	    return 0;
	  }
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
	
	module.exports = SyntheticKeyboardEvent;

/***/ }),
/* 166 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * `charCode` represents the actual "character code" and is safe to use with
	 * `String.fromCharCode`. As such, only keys that correspond to printable
	 * characters produce a valid `charCode`, the only exception to this is Enter.
	 * The Tab-key is considered non-printable and does not have a `charCode`,
	 * presumably because it does not produce a tab-character in browsers.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {number} Normalized `charCode` property.
	 */
	
	function getEventCharCode(nativeEvent) {
	  var charCode;
	  var keyCode = nativeEvent.keyCode;
	
	  if ('charCode' in nativeEvent) {
	    charCode = nativeEvent.charCode;
	
	    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
	    if (charCode === 0 && keyCode === 13) {
	      charCode = 13;
	    }
	  } else {
	    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
	    charCode = keyCode;
	  }
	
	  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
	  // Must not discard the (non-)printable Enter-key.
	  if (charCode >= 32 || charCode === 13) {
	    return charCode;
	  }
	
	  return 0;
	}
	
	module.exports = getEventCharCode;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var getEventCharCode = __webpack_require__(166);
	
	/**
	 * Normalization of deprecated HTML5 `key` values
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var normalizeKey = {
	  Esc: 'Escape',
	  Spacebar: ' ',
	  Left: 'ArrowLeft',
	  Up: 'ArrowUp',
	  Right: 'ArrowRight',
	  Down: 'ArrowDown',
	  Del: 'Delete',
	  Win: 'OS',
	  Menu: 'ContextMenu',
	  Apps: 'ContextMenu',
	  Scroll: 'ScrollLock',
	  MozPrintableKey: 'Unidentified'
	};
	
	/**
	 * Translation from legacy `keyCode` to HTML5 `key`
	 * Only special keys supported, all others depend on keyboard layout or browser
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var translateToKey = {
	  8: 'Backspace',
	  9: 'Tab',
	  12: 'Clear',
	  13: 'Enter',
	  16: 'Shift',
	  17: 'Control',
	  18: 'Alt',
	  19: 'Pause',
	  20: 'CapsLock',
	  27: 'Escape',
	  32: ' ',
	  33: 'PageUp',
	  34: 'PageDown',
	  35: 'End',
	  36: 'Home',
	  37: 'ArrowLeft',
	  38: 'ArrowUp',
	  39: 'ArrowRight',
	  40: 'ArrowDown',
	  45: 'Insert',
	  46: 'Delete',
	  112: 'F1',
	  113: 'F2',
	  114: 'F3',
	  115: 'F4',
	  116: 'F5',
	  117: 'F6',
	  118: 'F7',
	  119: 'F8',
	  120: 'F9',
	  121: 'F10',
	  122: 'F11',
	  123: 'F12',
	  144: 'NumLock',
	  145: 'ScrollLock',
	  224: 'Meta'
	};
	
	/**
	 * @param {object} nativeEvent Native browser event.
	 * @return {string} Normalized `key` property.
	 */
	function getEventKey(nativeEvent) {
	  if (nativeEvent.key) {
	    // Normalize inconsistent values reported by browsers due to
	    // implementations of a working draft specification.
	
	    // FireFox implements `key` but returns `MozPrintableKey` for all
	    // printable characters (normalized to `Unidentified`), ignore it.
	    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
	    if (key !== 'Unidentified') {
	      return key;
	    }
	  }
	
	  // Browser does not implement `key`, polyfill as much of it as we can.
	  if (nativeEvent.type === 'keypress') {
	    var charCode = getEventCharCode(nativeEvent);
	
	    // The enter-key is technically both printable and non-printable and can
	    // thus be captured by `keypress`, no other non-printable key should.
	    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
	  }
	  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
	    // While user keyboard layout determines the actual meaning of each
	    // `keyCode` value, almost all function keys have a universal value.
	    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
	  }
	  return '';
	}
	
	module.exports = getEventKey;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticMouseEvent = __webpack_require__(80);
	
	/**
	 * @interface DragEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var DragEventInterface = {
	  dataTransfer: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
	
	module.exports = SyntheticDragEvent;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticUIEvent = __webpack_require__(81);
	
	var getEventModifierState = __webpack_require__(83);
	
	/**
	 * @interface TouchEvent
	 * @see http://www.w3.org/TR/touch-events/
	 */
	var TouchEventInterface = {
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null,
	  getModifierState: getEventModifierState
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
	
	module.exports = SyntheticTouchEvent;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticEvent = __webpack_require__(58);
	
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
	 */
	var TransitionEventInterface = {
	  propertyName: null,
	  elapsedTime: null,
	  pseudoElement: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */
	function SyntheticTransitionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticEvent.augmentClass(SyntheticTransitionEvent, TransitionEventInterface);
	
	module.exports = SyntheticTransitionEvent;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var SyntheticMouseEvent = __webpack_require__(80);
	
	/**
	 * @interface WheelEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var WheelEventInterface = {
	  deltaX: function (event) {
	    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
	    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
	  },
	  deltaY: function (event) {
	    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
	    'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
	    'wheelDelta' in event ? -event.wheelDelta : 0;
	  },
	  deltaZ: null,
	
	  // Browsers without "deltaMode" is reporting in raw wheel delta where one
	  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
	  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
	  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
	  deltaMode: null
	};
	
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticMouseEvent}
	 */
	function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}
	
	SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
	
	module.exports = SyntheticWheelEvent;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var DOMLazyTree = __webpack_require__(87);
	var DOMProperty = __webpack_require__(41);
	var React = __webpack_require__(2);
	var ReactBrowserEventEmitter = __webpack_require__(111);
	var ReactCurrentOwner = __webpack_require__(17);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactDOMContainerInfo = __webpack_require__(173);
	var ReactDOMFeatureFlags = __webpack_require__(174);
	var ReactFeatureFlags = __webpack_require__(63);
	var ReactInstanceMap = __webpack_require__(122);
	var ReactInstrumentation = __webpack_require__(67);
	var ReactMarkupChecksum = __webpack_require__(175);
	var ReactReconciler = __webpack_require__(64);
	var ReactUpdateQueue = __webpack_require__(141);
	var ReactUpdates = __webpack_require__(61);
	
	var emptyObject = __webpack_require__(11);
	var instantiateReactComponent = __webpack_require__(124);
	var invariant = __webpack_require__(12);
	var setInnerHTML = __webpack_require__(89);
	var shouldUpdateReactComponent = __webpack_require__(130);
	var warning = __webpack_require__(8);
	
	var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
	var ROOT_ATTR_NAME = DOMProperty.ROOT_ATTRIBUTE_NAME;
	
	var ELEMENT_NODE_TYPE = 1;
	var DOC_NODE_TYPE = 9;
	var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
	
	var instancesByReactRootID = {};
	
	/**
	 * Finds the index of the first character
	 * that's not common between the two given strings.
	 *
	 * @return {number} the index of the character where the strings diverge
	 */
	function firstDifferenceIndex(string1, string2) {
	  var minLen = Math.min(string1.length, string2.length);
	  for (var i = 0; i < minLen; i++) {
	    if (string1.charAt(i) !== string2.charAt(i)) {
	      return i;
	    }
	  }
	  return string1.length === string2.length ? -1 : minLen;
	}
	
	/**
	 * @param {DOMElement|DOMDocument} container DOM element that may contain
	 * a React component
	 * @return {?*} DOM element that may have the reactRoot ID, or null.
	 */
	function getReactRootElementInContainer(container) {
	  if (!container) {
	    return null;
	  }
	
	  if (container.nodeType === DOC_NODE_TYPE) {
	    return container.documentElement;
	  } else {
	    return container.firstChild;
	  }
	}
	
	function internalGetID(node) {
	  // If node is something like a window, document, or text node, none of
	  // which support attributes or a .getAttribute method, gracefully return
	  // the empty string, as if the attribute were missing.
	  return node.getAttribute && node.getAttribute(ATTR_NAME) || '';
	}
	
	/**
	 * Mounts this component and inserts it into the DOM.
	 *
	 * @param {ReactComponent} componentInstance The instance to mount.
	 * @param {DOMElement} container DOM element to mount into.
	 * @param {ReactReconcileTransaction} transaction
	 * @param {boolean} shouldReuseMarkup If true, do not insert markup
	 */
	function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {
	  var markerName;
	  if (ReactFeatureFlags.logTopLevelRenders) {
	    var wrappedElement = wrapperInstance._currentElement.props.child;
	    var type = wrappedElement.type;
	    markerName = 'React mount: ' + (typeof type === 'string' ? type : type.displayName || type.name);
	    console.time(markerName);
	  }
	
	  var markup = ReactReconciler.mountComponent(wrapperInstance, transaction, null, ReactDOMContainerInfo(wrapperInstance, container), context, 0 /* parentDebugID */
	  );
	
	  if (markerName) {
	    console.timeEnd(markerName);
	  }
	
	  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
	  ReactMount._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
	}
	
	/**
	 * Batched mount.
	 *
	 * @param {ReactComponent} componentInstance The instance to mount.
	 * @param {DOMElement} container DOM element to mount into.
	 * @param {boolean} shouldReuseMarkup If true, do not insert markup
	 */
	function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {
	  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(
	  /* useCreateElement */
	  !shouldReuseMarkup && ReactDOMFeatureFlags.useCreateElement);
	  transaction.perform(mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
	  ReactUpdates.ReactReconcileTransaction.release(transaction);
	}
	
	/**
	 * Unmounts a component and removes it from the DOM.
	 *
	 * @param {ReactComponent} instance React component instance.
	 * @param {DOMElement} container DOM element to unmount from.
	 * @final
	 * @internal
	 * @see {ReactMount.unmountComponentAtNode}
	 */
	function unmountComponentFromNode(instance, container, safely) {
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onBeginFlush();
	  }
	  ReactReconciler.unmountComponent(instance, safely);
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onEndFlush();
	  }
	
	  if (container.nodeType === DOC_NODE_TYPE) {
	    container = container.documentElement;
	  }
	
	  // http://jsperf.com/emptying-a-node
	  while (container.lastChild) {
	    container.removeChild(container.lastChild);
	  }
	}
	
	/**
	 * True if the supplied DOM node has a direct React-rendered child that is
	 * not a React root element. Useful for warning in `render`,
	 * `unmountComponentAtNode`, etc.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @return {boolean} True if the DOM element contains a direct child that was
	 * rendered by React but is not a root element.
	 * @internal
	 */
	function hasNonRootReactChild(container) {
	  var rootEl = getReactRootElementInContainer(container);
	  if (rootEl) {
	    var inst = ReactDOMComponentTree.getInstanceFromNode(rootEl);
	    return !!(inst && inst._hostParent);
	  }
	}
	
	/**
	 * True if the supplied DOM node is a React DOM element and
	 * it has been rendered by another copy of React.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @return {boolean} True if the DOM has been rendered by another copy of React
	 * @internal
	 */
	function nodeIsRenderedByOtherInstance(container) {
	  var rootEl = getReactRootElementInContainer(container);
	  return !!(rootEl && isReactNode(rootEl) && !ReactDOMComponentTree.getInstanceFromNode(rootEl));
	}
	
	/**
	 * True if the supplied DOM node is a valid node element.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @return {boolean} True if the DOM is a valid DOM node.
	 * @internal
	 */
	function isValidContainer(node) {
	  return !!(node && (node.nodeType === ELEMENT_NODE_TYPE || node.nodeType === DOC_NODE_TYPE || node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE));
	}
	
	/**
	 * True if the supplied DOM node is a valid React node element.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @return {boolean} True if the DOM is a valid React DOM node.
	 * @internal
	 */
	function isReactNode(node) {
	  return isValidContainer(node) && (node.hasAttribute(ROOT_ATTR_NAME) || node.hasAttribute(ATTR_NAME));
	}
	
	function getHostRootInstanceInContainer(container) {
	  var rootEl = getReactRootElementInContainer(container);
	  var prevHostInstance = rootEl && ReactDOMComponentTree.getInstanceFromNode(rootEl);
	  return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
	}
	
	function getTopLevelWrapperInContainer(container) {
	  var root = getHostRootInstanceInContainer(container);
	  return root ? root._hostContainerInfo._topLevelWrapper : null;
	}
	
	/**
	 * Temporary (?) hack so that we can store all top-level pending updates on
	 * composites instead of having to worry about different types of components
	 * here.
	 */
	var topLevelRootCounter = 1;
	var TopLevelWrapper = function () {
	  this.rootID = topLevelRootCounter++;
	};
	TopLevelWrapper.prototype.isReactComponent = {};
	if (process.env.NODE_ENV !== 'production') {
	  TopLevelWrapper.displayName = 'TopLevelWrapper';
	}
	TopLevelWrapper.prototype.render = function () {
	  return this.props.child;
	};
	TopLevelWrapper.isReactTopLevelWrapper = true;
	
	/**
	 * Mounting is the process of initializing a React component by creating its
	 * representative DOM elements and inserting them into a supplied `container`.
	 * Any prior content inside `container` is destroyed in the process.
	 *
	 *   ReactMount.render(
	 *     component,
	 *     document.getElementById('container')
	 *   );
	 *
	 *   <div id="container">                   <-- Supplied `container`.
	 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
	 *       // ...                                 component.
	 *     </div>
	 *   </div>
	 *
	 * Inside of `container`, the first element rendered is the "reactRoot".
	 */
	var ReactMount = {
	  TopLevelWrapper: TopLevelWrapper,
	
	  /**
	   * Used by devtools. The keys are not important.
	   */
	  _instancesByReactRootID: instancesByReactRootID,
	
	  /**
	   * This is a hook provided to support rendering React components while
	   * ensuring that the apparent scroll position of its `container` does not
	   * change.
	   *
	   * @param {DOMElement} container The `container` being rendered into.
	   * @param {function} renderCallback This must be called once to do the render.
	   */
	  scrollMonitor: function (container, renderCallback) {
	    renderCallback();
	  },
	
	  /**
	   * Take a component that's already mounted into the DOM and replace its props
	   * @param {ReactComponent} prevComponent component instance already in the DOM
	   * @param {ReactElement} nextElement component instance to render
	   * @param {DOMElement} container container to render into
	   * @param {?function} callback function triggered on completion
	   */
	  _updateRootComponent: function (prevComponent, nextElement, nextContext, container, callback) {
	    ReactMount.scrollMonitor(container, function () {
	      ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement, nextContext);
	      if (callback) {
	        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
	      }
	    });
	
	    return prevComponent;
	  },
	
	  /**
	   * Render a new component into the DOM. Hooked by hooks!
	   *
	   * @param {ReactElement} nextElement element to render
	   * @param {DOMElement} container container to render into
	   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
	   * @return {ReactComponent} nextComponent
	   */
	  _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {
	    // Various parts of our code (such as ReactCompositeComponent's
	    // _renderValidatedComponent) assume that calls to render aren't nested;
	    // verify that that's the case.
	    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : void 0;
	
	    !isValidContainer(container) ? process.env.NODE_ENV !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : _prodInvariant('37') : void 0;
	
	    ReactBrowserEventEmitter.ensureScrollValueMonitoring();
	    var componentInstance = instantiateReactComponent(nextElement, false);
	
	    // The initial render is synchronous but any updates that happen during
	    // rendering, in componentWillMount or componentDidMount, will be batched
	    // according to the current batching strategy.
	
	    ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);
	
	    var wrapperID = componentInstance._instance.rootID;
	    instancesByReactRootID[wrapperID] = componentInstance;
	
	    return componentInstance;
	  },
	
	  /**
	   * Renders a React component into the DOM in the supplied `container`.
	   *
	   * If the React component was previously rendered into `container`, this will
	   * perform an update on it and only mutate the DOM as necessary to reflect the
	   * latest React component.
	   *
	   * @param {ReactComponent} parentComponent The conceptual parent of this render tree.
	   * @param {ReactElement} nextElement Component element to render.
	   * @param {DOMElement} container DOM element to render into.
	   * @param {?function} callback function triggered on completion
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
	    !(parentComponent != null && ReactInstanceMap.has(parentComponent)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : _prodInvariant('38') : void 0;
	    return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
	  },
	
	  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
	    ReactUpdateQueue.validateCallback(callback, 'ReactDOM.render');
	    !React.isValidElement(nextElement) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? " Instead of passing a string like 'div', pass " + "React.createElement('div') or <div />." : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : // Check if it quacks like an element
	    nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : _prodInvariant('39', typeof nextElement === 'string' ? " Instead of passing a string like 'div', pass " + "React.createElement('div') or <div />." : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : void 0;
	
	    process.env.NODE_ENV !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : void 0;
	
	    var nextWrappedElement = React.createElement(TopLevelWrapper, {
	      child: nextElement
	    });
	
	    var nextContext;
	    if (parentComponent) {
	      var parentInst = ReactInstanceMap.get(parentComponent);
	      nextContext = parentInst._processChildContext(parentInst._context);
	    } else {
	      nextContext = emptyObject;
	    }
	
	    var prevComponent = getTopLevelWrapperInContainer(container);
	
	    if (prevComponent) {
	      var prevWrappedElement = prevComponent._currentElement;
	      var prevElement = prevWrappedElement.props.child;
	      if (shouldUpdateReactComponent(prevElement, nextElement)) {
	        var publicInst = prevComponent._renderedComponent.getPublicInstance();
	        var updatedCallback = callback && function () {
	          callback.call(publicInst);
	        };
	        ReactMount._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
	        return publicInst;
	      } else {
	        ReactMount.unmountComponentAtNode(container);
	      }
	    }
	
	    var reactRootElement = getReactRootElementInContainer(container);
	    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
	    var containerHasNonRootReactChild = hasNonRootReactChild(container);
	
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!containerHasNonRootReactChild, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;
	
	      if (!containerHasReactMarkup || reactRootElement.nextSibling) {
	        var rootElementSibling = reactRootElement;
	        while (rootElementSibling) {
	          if (internalGetID(rootElementSibling)) {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.') : void 0;
	            break;
	          }
	          rootElementSibling = rootElementSibling.nextSibling;
	        }
	      }
	    }
	
	    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
	    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
	    if (callback) {
	      callback.call(component);
	    }
	    return component;
	  },
	
	  /**
	   * Renders a React component into the DOM in the supplied `container`.
	   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.render
	   *
	   * If the React component was previously rendered into `container`, this will
	   * perform an update on it and only mutate the DOM as necessary to reflect the
	   * latest React component.
	   *
	   * @param {ReactElement} nextElement Component element to render.
	   * @param {DOMElement} container DOM element to render into.
	   * @param {?function} callback function triggered on completion
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  render: function (nextElement, container, callback) {
	    return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
	  },
	
	  /**
	   * Unmounts and destroys the React component rendered in the `container`.
	   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode
	   *
	   * @param {DOMElement} container DOM element containing a React component.
	   * @return {boolean} True if a component was found in and unmounted from
	   *                   `container`
	   */
	  unmountComponentAtNode: function (container) {
	    // Various parts of our code (such as ReactCompositeComponent's
	    // _renderValidatedComponent) assume that calls to render aren't nested;
	    // verify that that's the case. (Strictly speaking, unmounting won't cause a
	    // render but we still don't expect to be in a render call here.)
	    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : void 0;
	
	    !isValidContainer(container) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : _prodInvariant('40') : void 0;
	
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!nodeIsRenderedByOtherInstance(container), "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by another copy of React.') : void 0;
	    }
	
	    var prevComponent = getTopLevelWrapperInContainer(container);
	    if (!prevComponent) {
	      // Check if the node being unmounted was rendered by React, but isn't a
	      // root node.
	      var containerHasNonRootReactChild = hasNonRootReactChild(container);
	
	      // Check if the container itself is a React root node.
	      var isContainerReactRoot = container.nodeType === 1 && container.hasAttribute(ROOT_ATTR_NAME);
	
	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(!containerHasNonRootReactChild, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : void 0;
	      }
	
	      return false;
	    }
	    delete instancesByReactRootID[prevComponent._instance.rootID];
	    ReactUpdates.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);
	    return true;
	  },
	
	  _mountImageIntoNode: function (markup, container, instance, shouldReuseMarkup, transaction) {
	    !isValidContainer(container) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : _prodInvariant('41') : void 0;
	
	    if (shouldReuseMarkup) {
	      var rootElement = getReactRootElementInContainer(container);
	      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
	        ReactDOMComponentTree.precacheNode(instance, rootElement);
	        return;
	      } else {
	        var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
	        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
	
	        var rootMarkup = rootElement.outerHTML;
	        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
	
	        var normalizedMarkup = markup;
	        if (process.env.NODE_ENV !== 'production') {
	          // because rootMarkup is retrieved from the DOM, various normalizations
	          // will have occurred which will not be present in `markup`. Here,
	          // insert markup into a <div> or <iframe> depending on the container
	          // type to perform the same normalizations before comparing.
	          var normalizer;
	          if (container.nodeType === ELEMENT_NODE_TYPE) {
	            normalizer = document.createElement('div');
	            normalizer.innerHTML = markup;
	            normalizedMarkup = normalizer.innerHTML;
	          } else {
	            normalizer = document.createElement('iframe');
	            document.body.appendChild(normalizer);
	            normalizer.contentDocument.write(markup);
	            normalizedMarkup = normalizer.contentDocument.documentElement.outerHTML;
	            document.body.removeChild(normalizer);
	          }
	        }
	
	        var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
	        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
	
	        !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using server rendering but the checksum was invalid. This usually means you rendered a different component type or props on the client from the one on the server, or your render() methods are impure. React cannot handle this case due to cross-browser quirks by rendering at the document root. You should look for environment dependent code in your components and ensure the props are the same client and server side:\n%s', difference) : _prodInvariant('42', difference) : void 0;
	
	        if (process.env.NODE_ENV !== 'production') {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : void 0;
	        }
	      }
	    }
	
	    !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but you didn\'t use server rendering. We can\'t do this without using server rendering due to cross-browser quirks. See ReactDOMServer.renderToString() for server rendering.') : _prodInvariant('43') : void 0;
	
	    if (transaction.useCreateElement) {
	      while (container.lastChild) {
	        container.removeChild(container.lastChild);
	      }
	      DOMLazyTree.insertTreeBefore(container, markup, null);
	    } else {
	      setInnerHTML(container, markup);
	      ReactDOMComponentTree.precacheNode(instance, container.firstChild);
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var hostNode = ReactDOMComponentTree.getInstanceFromNode(container.firstChild);
	      if (hostNode._debugID !== 0) {
	        ReactInstrumentation.debugTool.onHostOperation({
	          instanceID: hostNode._debugID,
	          type: 'mount',
	          payload: markup.toString()
	        });
	      }
	    }
	  }
	};
	
	module.exports = ReactMount;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var validateDOMNesting = __webpack_require__(142);
	
	var DOC_NODE_TYPE = 9;
	
	function ReactDOMContainerInfo(topLevelWrapper, node) {
	  var info = {
	    _topLevelWrapper: topLevelWrapper,
	    _idCounter: 1,
	    _ownerDocument: node ? node.nodeType === DOC_NODE_TYPE ? node : node.ownerDocument : null,
	    _node: node,
	    _tag: node ? node.nodeName.toLowerCase() : null,
	    _namespaceURI: node ? node.namespaceURI : null
	  };
	  if (process.env.NODE_ENV !== 'production') {
	    info._ancestorInfo = node ? validateDOMNesting.updatedAncestorInfo(null, info._tag, null) : null;
	  }
	  return info;
	}
	
	module.exports = ReactDOMContainerInfo;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 174 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactDOMFeatureFlags = {
	  useCreateElement: true,
	  useFiber: false
	};
	
	module.exports = ReactDOMFeatureFlags;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var adler32 = __webpack_require__(176);
	
	var TAG_END = /\/?>/;
	var COMMENT_START = /^<\!\-\-/;
	
	var ReactMarkupChecksum = {
	  CHECKSUM_ATTR_NAME: 'data-react-checksum',
	
	  /**
	   * @param {string} markup Markup string
	   * @return {string} Markup string with checksum attribute attached
	   */
	  addChecksumToMarkup: function (markup) {
	    var checksum = adler32(markup);
	
	    // Add checksum (handle both parent tags, comments and self-closing tags)
	    if (COMMENT_START.test(markup)) {
	      return markup;
	    } else {
	      return markup.replace(TAG_END, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
	    }
	  },
	
	  /**
	   * @param {string} markup to use
	   * @param {DOMElement} element root React element
	   * @returns {boolean} whether or not the markup is the same
	   */
	  canReuseMarkup: function (markup, element) {
	    var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
	    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
	    var markupChecksum = adler32(markup);
	    return markupChecksum === existingChecksum;
	  }
	};
	
	module.exports = ReactMarkupChecksum;

/***/ }),
/* 176 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var MOD = 65521;
	
	// adler32 is not cryptographically strong, and is only used to sanity check that
	// markup generated on the server matches the markup generated on the client.
	// This implementation (a modified version of the SheetJS version) has been optimized
	// for our use case, at the expense of conforming to the adler32 specification
	// for non-ascii inputs.
	function adler32(data) {
	  var a = 1;
	  var b = 0;
	  var i = 0;
	  var l = data.length;
	  var m = l & ~0x3;
	  while (i < m) {
	    var n = Math.min(i + 4096, m);
	    for (; i < n; i += 4) {
	      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
	    }
	    a %= MOD;
	    b %= MOD;
	  }
	  for (; i < l; i++) {
	    b += a += data.charCodeAt(i);
	  }
	  a %= MOD;
	  b %= MOD;
	  return a | b << 16;
	}
	
	module.exports = adler32;

/***/ }),
/* 177 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	module.exports = '15.6.1';

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _prodInvariant = __webpack_require__(40);
	
	var ReactCurrentOwner = __webpack_require__(17);
	var ReactDOMComponentTree = __webpack_require__(39);
	var ReactInstanceMap = __webpack_require__(122);
	
	var getHostComponentFromComposite = __webpack_require__(179);
	var invariant = __webpack_require__(12);
	var warning = __webpack_require__(8);
	
	/**
	 * Returns the DOM node rendered by this element.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
	 *
	 * @param {ReactComponent|DOMElement} componentOrElement
	 * @return {?DOMElement} The root node of this element.
	 */
	function findDOMNode(componentOrElement) {
	  if (process.env.NODE_ENV !== 'production') {
	    var owner = ReactCurrentOwner.current;
	    if (owner !== null) {
	      process.env.NODE_ENV !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : void 0;
	      owner._warnedAboutRefsInRender = true;
	    }
	  }
	  if (componentOrElement == null) {
	    return null;
	  }
	  if (componentOrElement.nodeType === 1) {
	    return componentOrElement;
	  }
	
	  var inst = ReactInstanceMap.get(componentOrElement);
	  if (inst) {
	    inst = getHostComponentFromComposite(inst);
	    return inst ? ReactDOMComponentTree.getNodeFromInstance(inst) : null;
	  }
	
	  if (typeof componentOrElement.render === 'function') {
	     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : _prodInvariant('44') : void 0;
	  } else {
	     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : _prodInvariant('45', Object.keys(componentOrElement)) : void 0;
	  }
	}
	
	module.exports = findDOMNode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactNodeTypes = __webpack_require__(126);
	
	function getHostComponentFromComposite(inst) {
	  var type;
	
	  while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
	    inst = inst._renderedComponent;
	  }
	
	  if (type === ReactNodeTypes.HOST) {
	    return inst._renderedComponent;
	  } else if (type === ReactNodeTypes.EMPTY) {
	    return null;
	  }
	}
	
	module.exports = getHostComponentFromComposite;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactMount = __webpack_require__(172);
	
	module.exports = ReactMount.renderSubtreeIntoContainer;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMProperty = __webpack_require__(41);
	var EventPluginRegistry = __webpack_require__(48);
	var ReactComponentTreeHook = __webpack_require__(24);
	
	var warning = __webpack_require__(8);
	
	if (process.env.NODE_ENV !== 'production') {
	  var reactProps = {
	    children: true,
	    dangerouslySetInnerHTML: true,
	    key: true,
	    ref: true,
	
	    autoFocus: true,
	    defaultValue: true,
	    valueLink: true,
	    defaultChecked: true,
	    checkedLink: true,
	    innerHTML: true,
	    suppressContentEditableWarning: true,
	    onFocusIn: true,
	    onFocusOut: true
	  };
	  var warnedProperties = {};
	
	  var validateProperty = function (tagName, name, debugID) {
	    if (DOMProperty.properties.hasOwnProperty(name) || DOMProperty.isCustomAttribute(name)) {
	      return true;
	    }
	    if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
	      return true;
	    }
	    if (EventPluginRegistry.registrationNameModules.hasOwnProperty(name)) {
	      return true;
	    }
	    warnedProperties[name] = true;
	    var lowerCasedName = name.toLowerCase();
	
	    // data-* attributes should be lowercase; suggest the lowercase version
	    var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;
	
	    var registrationName = EventPluginRegistry.possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? EventPluginRegistry.possibleRegistrationNames[lowerCasedName] : null;
	
	    if (standardName != null) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown DOM property %s. Did you mean %s?%s', name, standardName, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	      return true;
	    } else if (registrationName != null) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown event handler property %s. Did you mean `%s`?%s', name, registrationName, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	      return true;
	    } else {
	      // We were unable to guess which prop the user intended.
	      // It is likely that the user was just blindly spreading/forwarding props
	      // Components should be careful to only render valid props/attributes.
	      // Warning will be invoked in warnUnknownProperties to allow grouping.
	      return false;
	    }
	  };
	}
	
	var warnUnknownProperties = function (debugID, element) {
	  var unknownProps = [];
	  for (var key in element.props) {
	    var isValid = validateProperty(element.type, key, debugID);
	    if (!isValid) {
	      unknownProps.push(key);
	    }
	  }
	
	  var unknownPropString = unknownProps.map(function (prop) {
	    return '`' + prop + '`';
	  }).join(', ');
	
	  if (unknownProps.length === 1) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown prop %s on <%s> tag. Remove this prop from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	  } else if (unknownProps.length > 1) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown props %s on <%s> tag. Remove these props from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	  }
	};
	
	function handleElement(debugID, element) {
	  if (element == null || typeof element.type !== 'string') {
	    return;
	  }
	  if (element.type.indexOf('-') >= 0 || element.props.is) {
	    return;
	  }
	  warnUnknownProperties(debugID, element);
	}
	
	var ReactDOMUnknownPropertyHook = {
	  onBeforeMountComponent: function (debugID, element) {
	    handleElement(debugID, element);
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    handleElement(debugID, element);
	  }
	};
	
	module.exports = ReactDOMUnknownPropertyHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var ReactComponentTreeHook = __webpack_require__(24);
	
	var warning = __webpack_require__(8);
	
	var didWarnValueNull = false;
	
	function handleElement(debugID, element) {
	  if (element == null) {
	    return;
	  }
	  if (element.type !== 'input' && element.type !== 'textarea' && element.type !== 'select') {
	    return;
	  }
	  if (element.props != null && element.props.value === null && !didWarnValueNull) {
	    process.env.NODE_ENV !== 'production' ? warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using the empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	
	    didWarnValueNull = true;
	  }
	}
	
	var ReactDOMNullInputValuePropHook = {
	  onBeforeMountComponent: function (debugID, element) {
	    handleElement(debugID, element);
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    handleElement(debugID, element);
	  }
	};
	
	module.exports = ReactDOMNullInputValuePropHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var DOMProperty = __webpack_require__(41);
	var ReactComponentTreeHook = __webpack_require__(24);
	
	var warning = __webpack_require__(8);
	
	var warnedProperties = {};
	var rARIA = new RegExp('^(aria)-[' + DOMProperty.ATTRIBUTE_NAME_CHAR + ']*$');
	
	function validateProperty(tagName, name, debugID) {
	  if (warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
	    return true;
	  }
	
	  if (rARIA.test(name)) {
	    var lowerCasedName = name.toLowerCase();
	    var standardName = DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;
	
	    // If this is an aria-* attribute, but is not listed in the known DOM
	    // DOM properties, then it is an invalid aria-* attribute.
	    if (standardName == null) {
	      warnedProperties[name] = true;
	      return false;
	    }
	    // aria-* attributes should be lowercase; suggest the lowercase version.
	    if (name !== standardName) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Unknown ARIA attribute %s. Did you mean %s?%s', name, standardName, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	      warnedProperties[name] = true;
	      return true;
	    }
	  }
	
	  return true;
	}
	
	function warnInvalidARIAProps(debugID, element) {
	  var invalidProps = [];
	
	  for (var key in element.props) {
	    var isValid = validateProperty(element.type, key, debugID);
	    if (!isValid) {
	      invalidProps.push(key);
	    }
	  }
	
	  var unknownPropString = invalidProps.map(function (prop) {
	    return '`' + prop + '`';
	  }).join(', ');
	
	  if (invalidProps.length === 1) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	  } else if (invalidProps.length > 1) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, element.type, ReactComponentTreeHook.getStackAddendumByID(debugID)) : void 0;
	  }
	}
	
	function handleElement(debugID, element) {
	  if (element == null || typeof element.type !== 'string') {
	    return;
	  }
	  if (element.type.indexOf('-') >= 0 || element.props.is) {
	    return;
	  }
	
	  warnInvalidARIAProps(debugID, element);
	}
	
	var ReactDOMInvalidARIAHook = {
	  onBeforeMountComponent: function (debugID, element) {
	    if (process.env.NODE_ENV !== 'production') {
	      handleElement(debugID, element);
	    }
	  },
	  onBeforeUpdateComponent: function (debugID, element) {
	    if (process.env.NODE_ENV !== 'production') {
	      handleElement(debugID, element);
	    }
	  }
	};
	
	module.exports = ReactDOMInvalidARIAHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Rect = exports.DragDrop = exports.Orientation = exports.DockLocation = exports.BorderSet = exports.BorderNode = exports.TabSetNode = exports.TabNode = exports.SplitterNode = exports.RowNode = exports.Node = exports.Model = exports.Actions = exports.Layout = undefined;
	
	var _Layout = __webpack_require__(185);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	var _Model = __webpack_require__(209);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _Node = __webpack_require__(197);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _RowNode = __webpack_require__(200);
	
	var _RowNode2 = _interopRequireDefault(_RowNode);
	
	var _SplitterNode = __webpack_require__(201);
	
	var _SplitterNode2 = _interopRequireDefault(_SplitterNode);
	
	var _TabNode = __webpack_require__(198);
	
	var _TabNode2 = _interopRequireDefault(_TabNode);
	
	var _TabSetNode = __webpack_require__(199);
	
	var _TabSetNode2 = _interopRequireDefault(_TabSetNode);
	
	var _BorderNode = __webpack_require__(192);
	
	var _BorderNode2 = _interopRequireDefault(_BorderNode);
	
	var _BorderSet = __webpack_require__(210);
	
	var _BorderSet2 = _interopRequireDefault(_BorderSet);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	var _DragDrop = __webpack_require__(189);
	
	var _DragDrop2 = _interopRequireDefault(_DragDrop);
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Layout = _Layout2.default;
	exports.Actions = _Actions2.default;
	exports.Model = _Model2.default;
	exports.Node = _Node2.default;
	exports.RowNode = _RowNode2.default;
	exports.SplitterNode = _SplitterNode2.default;
	exports.TabNode = _TabNode2.default;
	exports.TabSetNode = _TabSetNode2.default;
	exports.BorderNode = _BorderNode2.default;
	exports.BorderSet = _BorderSet2.default;
	exports.DockLocation = _DockLocation2.default;
	exports.Orientation = _Orientation2.default;
	exports.DragDrop = _DragDrop2.default;
	exports.Rect = _Rect2.default;
	exports.default = {
	    Layout: _Layout2.default,
	    Actions: _Actions2.default,
	    Model: _Model2.default,
	    Node: _Node2.default,
	    RowNode: _RowNode2.default,
	    SplitterNode: _SplitterNode2.default,
	    TabNode: _TabNode2.default,
	    TabSetNode: _TabSetNode2.default,
	    BorderNode: _BorderNode2.default,
	    BorderSet: _BorderSet2.default,
	    DockLocation: _DockLocation2.default,
	    Orientation: _Orientation2.default,
	    DragDrop: _DragDrop2.default,
	    Rect: _Rect2.default
	};

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _propTypes = __webpack_require__(186);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Splitter = __webpack_require__(188);
	
	var _Splitter2 = _interopRequireDefault(_Splitter);
	
	var _Tab = __webpack_require__(203);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _TabSet = __webpack_require__(204);
	
	var _TabSet2 = _interopRequireDefault(_TabSet);
	
	var _BorderTabSet = __webpack_require__(207);
	
	var _BorderTabSet2 = _interopRequireDefault(_BorderTabSet);
	
	var _DragDrop = __webpack_require__(189);
	
	var _DragDrop2 = _interopRequireDefault(_DragDrop);
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	var _TabNode = __webpack_require__(198);
	
	var _TabNode2 = _interopRequireDefault(_TabNode);
	
	var _TabSetNode = __webpack_require__(199);
	
	var _TabSetNode2 = _interopRequireDefault(_TabSetNode);
	
	var _SplitterNode = __webpack_require__(201);
	
	var _SplitterNode2 = _interopRequireDefault(_SplitterNode);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	var _Model = __webpack_require__(209);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * A React component that hosts a multi-tabbed layout
	 */
	var Layout = function (_React$Component) {
	    _inherits(Layout, _React$Component);
	
	    /**
	     * @private
	     */
	    function Layout(props) {
	        _classCallCheck(this, Layout);
	
	        var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));
	
	        _this.model = _this.props.model;
	        _this.rect = new _Rect2.default(0, 0, 0, 0);
	        _this.model.setListener(_this.onModelChange.bind(_this));
	        _this.updateRect = _this.updateRect.bind(_this);
	        _this.tabIds = [];
	        return _this;
	    }
	
	    _createClass(Layout, [{
	        key: "onModelChange",
	        value: function onModelChange() {
	            this.forceUpdate();
	            if (this.props.onModelChange) {
	                this.props.onModelChange(this.model);
	            }
	        }
	    }, {
	        key: "doAction",
	        value: function doAction(action) {
	            if (this.props.onAction !== undefined) {
	                this.props.onAction(action);
	            } else {
	                this.model.doAction(action);
	            }
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(newProps) {
	            if (this.model !== newProps.model) {
	                if (this.model != null) {
	                    this.model.setListener(null); // stop listening to old model
	                }
	                this.model = newProps.model;
	                this.model.setListener(this.onModelChange.bind(this));
	                this.forceUpdate();
	            }
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.updateRect();
	
	            // need to re-render if size changes
	            window.addEventListener("resize", this.updateRect);
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate() {
	            this.updateRect();
	            //console.log("Layout time: " + this.layoutTime + "ms Render time: " + (Date.now() - this.start) + "ms");
	        }
	    }, {
	        key: "updateRect",
	        value: function updateRect() {
	            var domRect = this.refs.self.getBoundingClientRect();
	            var rect = new _Rect2.default(0, 0, domRect.width, domRect.height);
	            if (!rect.equals(this.rect)) {
	                this.rect = rect;
	                this.forceUpdate();
	            }
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            window.removeEventListener("resize", this.updateRect);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            this.start = Date.now();
	            var borderComponents = [];
	            var tabSetComponents = [];
	            var tabComponents = {};
	            var splitterComponents = [];
	
	            this.centerRect = this.model._layout(this.rect);
	
	            this.renderBorder(this.model.getBorderSet(), borderComponents, tabComponents, splitterComponents);
	            this.renderChildren(this.model.getRoot(), tabSetComponents, tabComponents, splitterComponents);
	
	            var nextTopIds = [];
	            var nextTopIdsMap = {};
	
	            // Keep any previous tabs in the same DOM order as before, removing any that have been deleted
	            this.tabIds.forEach(function (t) {
	                if (tabComponents[t]) {
	                    nextTopIds.push(t);
	                    nextTopIdsMap[t] = t;
	                }
	            });
	            this.tabIds = nextTopIds;
	
	            // Add tabs that have been added to the DOM
	            Object.keys(tabComponents).forEach(function (t) {
	                if (!nextTopIdsMap[t]) {
	                    _this2.tabIds.push(t);
	                }
	            });
	
	            this.layoutTime = Date.now() - this.start;
	
	            return _react2.default.createElement(
	                "div",
	                { ref: "self", className: "flexlayout__layout" },
	                tabSetComponents,
	                this.tabIds.map(function (t) {
	                    return tabComponents[t];
	                }),
	                borderComponents,
	                splitterComponents
	            );
	        }
	    }, {
	        key: "renderBorder",
	        value: function renderBorder(borderSet, borderComponents, tabComponents, splitterComponents) {
	            for (var i = 0; i < borderSet.getBorders().length; i++) {
	                var border = borderSet.getBorders()[i];
	                if (border.isShowing()) {
	                    borderComponents.push(_react2.default.createElement(_BorderTabSet2.default, { key: "border_" + border.getLocation().getName(), border: border,
	                        layout: this }));
	                    var drawChildren = border._getDrawChildren();
	                    for (var _i = 0; _i < drawChildren.length; _i++) {
	                        var child = drawChildren[_i];
	
	                        if (child.getType() === _SplitterNode2.default.TYPE) {
	                            splitterComponents.push(_react2.default.createElement(_Splitter2.default, { key: child.getId(), layout: this, node: child }));
	                        } else if (child.getType() === _TabNode2.default.TYPE) {
	                            tabComponents[child.getId()] = _react2.default.createElement(_Tab2.default, {
	                                key: child.getId(),
	                                layout: this,
	                                node: child,
	                                selected: _i == border.getSelected(),
	                                factory: this.props.factory });
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "renderChildren",
	        value: function renderChildren(node, tabSetComponents, tabComponents, splitterComponents) {
	            var drawChildren = node._getDrawChildren();
	
	            for (var i = 0; i < drawChildren.length; i++) {
	                var child = drawChildren[i];
	
	                if (child.getType() === _SplitterNode2.default.TYPE) {
	                    splitterComponents.push(_react2.default.createElement(_Splitter2.default, { key: child.getId(), layout: this, node: child }));
	                } else if (child.getType() === _TabSetNode2.default.TYPE) {
	                    tabSetComponents.push(_react2.default.createElement(_TabSet2.default, { key: child.getId(), layout: this, node: child }));
	                    this.renderChildren(child, tabSetComponents, tabComponents, splitterComponents);
	                } else if (child.getType() === _TabNode2.default.TYPE) {
	                    var selectedTab = child.getParent().getChildren()[child.getParent().getSelected()];
	                    if (selectedTab == null) {
	                        debugger; // this should not happen!
	                    }
	                    tabComponents[child.getId()] = _react2.default.createElement(_Tab2.default, {
	                        key: child.getId(),
	                        layout: this,
	                        node: child,
	                        selected: child === selectedTab,
	                        factory: this.props.factory });
	                } else {
	                    // is row
	                    this.renderChildren(child, tabSetComponents, tabComponents, splitterComponents);
	                }
	            }
	        }
	
	        /**
	         * Adds a new tab to the given tabset
	         * @param tabsetId the id of the tabset where the new tab will be added
	         * @param json the json for the new tab node
	         */
	
	    }, {
	        key: "addTabToTabSet",
	        value: function addTabToTabSet(tabsetId, json) {
	            var tabsetNode = this.model.getNodeById(tabsetId);
	            if (tabsetNode != null) {
	                this.doAction(_Actions2.default.addNode(json, tabsetId, _DockLocation2.default.CENTER, -1));
	            }
	        }
	
	        /**
	         * Adds a new tab to the active tabset (if there is one)
	         * @param json the json for the new tab node
	         */
	
	    }, {
	        key: "addTabToActiveTabSet",
	        value: function addTabToActiveTabSet(json) {
	            var tabsetNode = this.model.getActiveTabset();
	            if (tabsetNode != null) {
	                this.doAction(_Actions2.default.addNode(json, tabsetNode.getId(), _DockLocation2.default.CENTER, -1));
	            }
	        }
	
	        /**
	         * Adds a new tab by dragging a labeled panel to the drop location, dragging starts immediatelly
	         * @param dragText the text to show on the drag panel
	         * @param json the json for the new tab node
	         * @param onDrop a callback to call when the drag is complete
	         */
	
	    }, {
	        key: "addTabWithDragAndDrop",
	        value: function addTabWithDragAndDrop(dragText, json, onDrop) {
	            this.fnNewNodeDropped = onDrop;
	            this.newTabJson = json;
	            this.dragStart(null, dragText, new _TabNode2.default(this.model, json), null, null);
	        }
	
	        /**
	         * Adds a new tab by dragging a labeled panel to the drop location, dragging starts when you
	         * mouse down on the panel
	         *
	         * @param dragText the text to show on the drag panel
	         * @param json the json for the new tab node
	         * @param onDrop a callback to call when the drag is complete
	         */
	
	    }, {
	        key: "addTabWithDragAndDropIndirect",
	        value: function addTabWithDragAndDropIndirect(dragText, json, onDrop) {
	            this.fnNewNodeDropped = onDrop;
	            this.newTabJson = json;
	
	            _DragDrop2.default.instance.addGlass(this.onCancelAdd.bind(this));
	
	            this.dragDivText = dragText;
	            this.dragDiv = document.createElement("div");
	            this.dragDiv.className = "flexlayout__drag_rect";
	            this.dragDiv.innerHTML = this.dragDivText;
	            this.dragDiv.addEventListener("mousedown", this.onDragDivMouseDown.bind(this));
	            this.dragDiv.addEventListener("touchstart", this.onDragDivMouseDown.bind(this));
	
	            var r = new _Rect2.default(10, 10, 150, 50);
	            r.centerInRect(this.rect);
	            this.dragDiv.style.left = r.x + "px";
	            this.dragDiv.style.top = r.y + "px";
	
	            var rootdiv = _reactDom2.default.findDOMNode(this);
	            rootdiv.appendChild(this.dragDiv);
	        }
	    }, {
	        key: "onCancelAdd",
	        value: function onCancelAdd() {
	            var rootdiv = _reactDom2.default.findDOMNode(this);
	            rootdiv.removeChild(this.dragDiv);
	            this.dragDiv = null;
	            if (this.fnNewNodeDropped != null) {
	                this.fnNewNodeDropped();
	                this.fnNewNodeDropped = null;
	            }
	            _DragDrop2.default.instance.hideGlass();
	            this.newTabJson = null;
	        }
	    }, {
	        key: "onCancelDrag",
	        value: function onCancelDrag() {
	            var rootdiv = _reactDom2.default.findDOMNode(this);
	
	            try {
	                rootdiv.removeChild(this.outlineDiv);
	            } catch (e) {}
	
	            try {
	                rootdiv.removeChild(this.dragDiv);
	            } catch (e) {}
	
	            this.dragDiv = null;
	            this.hideEdges(rootdiv);
	            if (this.fnNewNodeDropped != null) {
	                this.fnNewNodeDropped();
	                this.fnNewNodeDropped = null;
	            }
	            _DragDrop2.default.instance.hideGlass();
	            this.newTabJson = null;
	        }
	    }, {
	        key: "onDragDivMouseDown",
	        value: function onDragDivMouseDown(event) {
	            event.preventDefault();
	            this.dragStart(event, this.dragDivText, new _TabNode2.default(this.model, this.newTabJson), true, null, null);
	        }
	    }, {
	        key: "dragStart",
	        value: function dragStart(event, dragDivText, node, allowDrag, onClick, onDoubleClick) {
	            if (this.model.getMaximizedTabset() != null || !allowDrag) {
	                _DragDrop2.default.instance.startDrag(event, null, null, null, null, onClick, onDoubleClick);
	            } else {
	                this.dragNode = node;
	                this.dragDivText = dragDivText;
	                _DragDrop2.default.instance.startDrag(event, this.onDragStart.bind(this), this.onDragMove.bind(this), this.onDragEnd.bind(this), this.onCancelDrag.bind(this), onClick, onDoubleClick);
	            }
	        }
	    }, {
	        key: "onDragStart",
	        value: function onDragStart(event) {
	            this.dropInfo = null;
	            var rootdiv = _reactDom2.default.findDOMNode(this);
	            this.outlineDiv = document.createElement("div");
	            this.outlineDiv.className = "flexlayout__outline_rect";
	            rootdiv.appendChild(this.outlineDiv);
	
	            if (this.dragDiv == null) {
	                this.dragDiv = document.createElement("div");
	                this.dragDiv.className = "flexlayout__drag_rect";
	                this.dragDiv.innerHTML = this.dragDivText;
	                rootdiv.appendChild(this.dragDiv);
	            }
	            // add edge indicators
	            this.showEdges(rootdiv);
	
	            if (this.dragNode != null && this.dragNode.getType() === _TabNode2.default.TYPE && this.dragNode.getTabRect() != null) {
	                this.dragNode.getTabRect().positionElement(this.outlineDiv);
	            }
	            this.firstMove = true;
	
	            return true;
	        }
	    }, {
	        key: "onDragMove",
	        value: function onDragMove(event) {
	            if (this.firstMove === false) {
	                this.outlineDiv.style.transition = "top .3s, left .3s, width .3s, height .3s";
	            }
	            this.firstMove = false;
	            var clientRect = this.refs.self.getBoundingClientRect();
	            var pos = {
	                x: event.clientX - clientRect.left,
	                y: event.clientY - clientRect.top
	            };
	
	            this.dragDiv.style.left = pos.x - this.dragDiv.getBoundingClientRect().width / 2 + "px";
	            this.dragDiv.style.top = pos.y + 5 + "px";
	
	            var dropInfo = this.model._findDropTargetNode(this.dragNode, pos.x, pos.y);
	            if (dropInfo) {
	                this.dropInfo = dropInfo;
	                this.outlineDiv.className = dropInfo.className;
	                dropInfo.rect.positionElement(this.outlineDiv);
	            }
	        }
	    }, {
	        key: "onDragEnd",
	        value: function onDragEnd(event) {
	            var rootdiv = _reactDom2.default.findDOMNode(this);
	            rootdiv.removeChild(this.outlineDiv);
	            rootdiv.removeChild(this.dragDiv);
	            this.dragDiv = null;
	            this.hideEdges(rootdiv);
	            _DragDrop2.default.instance.hideGlass();
	
	            if (this.dropInfo) {
	                if (this.newTabJson != null) {
	                    this.doAction(_Actions2.default.addNode(this.newTabJson, this.dropInfo.node.getId(), this.dropInfo.location, this.dropInfo.index));
	
	                    if (this.fnNewNodeDropped != null) {
	                        this.fnNewNodeDropped();
	                        this.fnNewNodeDropped = null;
	                    }
	                    this.newTabJson = null;
	                } else if (this.dragNode != null) {
	                    this.doAction(_Actions2.default.moveNode(this.dragNode.getId(), this.dropInfo.node.getId(), this.dropInfo.location, this.dropInfo.index));
	                }
	            }
	        }
	    }, {
	        key: "showEdges",
	        value: function showEdges(rootdiv) {
	            if (this.model.isEnableEdgeDock()) {
	                var domRect = rootdiv.getBoundingClientRect();
	                var r = this.centerRect;
	                var size = 100;
	                var length = size + "px";
	                var radius = "50px";
	                var width = "10px";
	
	                this.edgeTopDiv = document.createElement("div");
	                this.edgeTopDiv.className = "flexlayout__edge_rect";
	                this.edgeTopDiv.style.top = r.y + "px";
	                this.edgeTopDiv.style.left = r.x + (r.width - size) / 2 + "px";
	                this.edgeTopDiv.style.width = length;
	                this.edgeTopDiv.style.height = width;
	                this.edgeTopDiv.style.borderBottomLeftRadius = radius;
	                this.edgeTopDiv.style.borderBottomRightRadius = radius;
	
	                this.edgeLeftDiv = document.createElement("div");
	                this.edgeLeftDiv.className = "flexlayout__edge_rect";
	                this.edgeLeftDiv.style.top = r.y + (r.height - size) / 2 + "px";
	                this.edgeLeftDiv.style.left = r.x + "px";
	                this.edgeLeftDiv.style.width = width;
	                this.edgeLeftDiv.style.height = length;
	                this.edgeLeftDiv.style.borderTopRightRadius = radius;
	                this.edgeLeftDiv.style.borderBottomRightRadius = radius;
	
	                this.edgeBottomDiv = document.createElement("div");
	                this.edgeBottomDiv.className = "flexlayout__edge_rect";
	                this.edgeBottomDiv.style.bottom = domRect.height - r.getBottom() + "px";
	                this.edgeBottomDiv.style.left = r.x + (r.width - size) / 2 + "px";
	                this.edgeBottomDiv.style.width = length;
	                this.edgeBottomDiv.style.height = width;
	                this.edgeBottomDiv.style.borderTopLeftRadius = radius;
	                this.edgeBottomDiv.style.borderTopRightRadius = radius;
	
	                this.edgeRightDiv = document.createElement("div");
	                this.edgeRightDiv.className = "flexlayout__edge_rect";
	                this.edgeRightDiv.style.top = r.y + (r.height - size) / 2 + "px";
	                this.edgeRightDiv.style.right = domRect.width - r.getRight() + "px";
	                this.edgeRightDiv.style.width = width;
	                this.edgeRightDiv.style.height = length;
	                this.edgeRightDiv.style.borderTopLeftRadius = radius;
	                this.edgeRightDiv.style.borderBottomLeftRadius = radius;
	
	                rootdiv.appendChild(this.edgeTopDiv);
	                rootdiv.appendChild(this.edgeLeftDiv);
	                rootdiv.appendChild(this.edgeBottomDiv);
	                rootdiv.appendChild(this.edgeRightDiv);
	            }
	        }
	    }, {
	        key: "hideEdges",
	        value: function hideEdges(rootdiv) {
	            if (this.model.isEnableEdgeDock()) {
	                try {
	                    rootdiv.removeChild(this.edgeTopDiv);
	                    rootdiv.removeChild(this.edgeLeftDiv);
	                    rootdiv.removeChild(this.edgeBottomDiv);
	                    rootdiv.removeChild(this.edgeRightDiv);
	                } catch (e) {}
	            }
	        }
	    }, {
	        key: "maximize",
	        value: function maximize(tabsetNode) {
	            this.doAction(_Actions2.default.maximizeToggle(tabsetNode.getId()));
	        }
	    }, {
	        key: "customizeTab",
	        value: function customizeTab(tabNode, renderValues) {
	            if (this.props.onRenderTab) {
	                this.props.onRenderTab(tabNode, renderValues);
	            }
	        }
	    }, {
	        key: "customizeTabSet",
	        value: function customizeTabSet(tabSetNode, renderValues) {
	            if (this.props.onRenderTabSet) {
	                this.props.onRenderTabSet(tabSetNode, renderValues);
	            }
	        }
	    }]);
	
	    return Layout;
	}(_react2.default.Component);
	
	Layout.propTypes = {
	    model: _propTypes2.default.instanceOf(_Model2.default).isRequired,
	    factory: _propTypes2.default.func.isRequired,
	
	    onAction: _propTypes2.default.func,
	
	    onRenderTab: _propTypes2.default.func,
	    onRenderTabSet: _propTypes2.default.func,
	
	    onModelChange: _propTypes2.default.func
	};
	
	exports.default = Layout;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;
	
	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };
	
	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(30)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(187)();
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(9);
	var invariant = __webpack_require__(12);
	var ReactPropTypesSecret = __webpack_require__(31);
	
	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim
	  };
	
	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _DragDrop = __webpack_require__(189);
	
	var _DragDrop2 = _interopRequireDefault(_DragDrop);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	var _BorderNode = __webpack_require__(192);
	
	var _BorderNode2 = _interopRequireDefault(_BorderNode);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Splitter = function (_React$Component) {
	    _inherits(Splitter, _React$Component);
	
	    function Splitter() {
	        _classCallCheck(this, Splitter);
	
	        return _possibleConstructorReturn(this, (Splitter.__proto__ || Object.getPrototypeOf(Splitter)).apply(this, arguments));
	    }
	
	    _createClass(Splitter, [{
	        key: "onMouseDown",
	        value: function onMouseDown(event) {
	            _DragDrop2.default.instance.startDrag(event, this.onDragStart.bind(this), this.onDragMove.bind(this), this.onDragEnd.bind(this), this.onDragCancel.bind(this));
	        }
	    }, {
	        key: "onDragCancel",
	        value: function onDragCancel() {
	            var rootdiv = _reactDom2.default.findDOMNode(this.props.layout);
	            rootdiv.removeChild(this.outlineDiv);
	        }
	    }, {
	        key: "onDragStart",
	        value: function onDragStart(event) {
	            this.pBounds = this.props.node.getParent()._getSplitterBounds(this.props.node);
	            var rootdiv = _reactDom2.default.findDOMNode(this.props.layout);
	            this.outlineDiv = document.createElement("div");
	            this.outlineDiv.style.position = "absolute";
	            this.outlineDiv.className = "flexlayout__splitter_drag";
	            this.outlineDiv.style.cursor = this.props.node.getOrientation() === _Orientation2.default.HORZ ? "ns-resize" : "ew-resize";
	            this.props.node.getRect().positionElement(this.outlineDiv);
	            rootdiv.appendChild(this.outlineDiv);
	            return true;
	        }
	    }, {
	        key: "onDragMove",
	        value: function onDragMove(event) {
	            var clientRect = _reactDom2.default.findDOMNode(this.props.layout).getBoundingClientRect();
	            var pos = {
	                x: event.clientX - clientRect.left,
	                y: event.clientY - clientRect.top
	            };
	
	            if (this.props.node.getOrientation() === _Orientation2.default.HORZ) {
	                this.outlineDiv.style.top = this.getBoundPosition(pos.y - 4) + "px";
	            } else {
	                this.outlineDiv.style.left = this.getBoundPosition(pos.x - 4) + "px";
	            }
	        }
	    }, {
	        key: "onDragEnd",
	        value: function onDragEnd(event) {
	            var node = this.props.node;
	            var value = 0;
	            if (node.getOrientation() === _Orientation2.default.HORZ) {
	                value = this.outlineDiv.offsetTop;
	            } else {
	                value = this.outlineDiv.offsetLeft;
	            }
	
	            if (node.getParent().getType() == _BorderNode2.default.TYPE) {
	                var pos = node.getParent()._calculateSplit(node, value);
	                this.props.layout.doAction(_Actions2.default.adjustBorderSplit(node.getParent().getId(), pos));
	            } else {
	                var splitSpec = node.getParent()._calculateSplit(this.props.node, value);
	                if (splitSpec != null) {
	                    this.props.layout.doAction(_Actions2.default.adjustSplit(splitSpec));
	                }
	            }
	
	            var rootdiv = _reactDom2.default.findDOMNode(this.props.layout);
	            rootdiv.removeChild(this.outlineDiv);
	        }
	    }, {
	        key: "getBoundPosition",
	        value: function getBoundPosition(p) {
	            var rtn = p;
	            if (p < this.pBounds[0]) {
	                rtn = this.pBounds[0];
	            }
	            if (p > this.pBounds[1]) {
	                rtn = this.pBounds[1];
	            }
	
	            return rtn;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var node = this.props.node;
	            var style = node._styleWithPosition({
	                cursor: this.props.node.getOrientation() === _Orientation2.default.HORZ ? "ns-resize" : "ew-resize"
	            });
	
	            return _react2.default.createElement("div", { style: style, onTouchStart: this.onMouseDown.bind(this), onMouseDown: this.onMouseDown.bind(this),
	                className: "flexlayout__splitter" });
	        }
	    }]);
	
	    return Splitter;
	}(_react2.default.Component);
	
	exports.default = Splitter;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DragDrop = function () {
	    function DragDrop() {
	        _classCallCheck(this, DragDrop);
	
	        this.glass = document.createElement("div");
	        this.glass.style.zIndex = 998;
	        this.glass.style.position = "absolute";
	        this.glass.style.backgroundColor = "white";
	        this.glass.style.opacity = ".00"; // may need to be .01 for IE???
	        this.glass.style.filter = "alpha(opacity=01)";
	
	        this.onMouseMove = this.onMouseMove.bind(this);
	        this.onMouseUp = this.onMouseUp.bind(this);
	
	        this.onKeyPress = this.onKeyPress.bind(this);
	
	        this.lastClick = 0;
	        this.clickX = 0;
	        this.clickY = 0;
	    }
	
	    // if you add the glass pane then you should remove it
	
	
	    _createClass(DragDrop, [{
	        key: "addGlass",
	        value: function addGlass(fCancel) {
	            if (!this.glassShowing) {
	                var glassRect = new _Rect2.default(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
	                glassRect.positionElement(this.glass);
	                document.body.appendChild(this.glass);
	                this.glass.tabIndex = -1;
	                this.glass.focus();
	                this.glass.addEventListener("keydown", this.onKeyPress);
	                this.glassShowing = true;
	                this.fDragCancel = fCancel;
	                this.manualGlassManagement = false;
	            } else {
	                // second call to addGlass (via dragstart)
	                this.manualGlassManagement = true;
	            }
	        }
	    }, {
	        key: "hideGlass",
	        value: function hideGlass() {
	            if (this.glassShowing) {
	                document.body.removeChild(this.glass);
	                this.glassShowing = false;
	            }
	        }
	    }, {
	        key: "onKeyPress",
	        value: function onKeyPress(event) {
	            if (this.fDragCancel != null && event.keyCode === 27) {
	                // esc
	                this.hideGlass();
	                document.removeEventListener("mousemove", this.onMouseMove);
	                document.removeEventListener("mouseup", this.onMouseUp);
	                this.dragging = false;
	                this.fDragCancel();
	            }
	        }
	    }, {
	        key: "getLocationEvent",
	        value: function getLocationEvent(event) {
	            var posEvent = event;
	            if (event.touches) {
	                posEvent = event.touches[0];
	            }
	            return posEvent;
	        }
	    }, {
	        key: "getLocationEventEnd",
	        value: function getLocationEventEnd(event) {
	            var posEvent = event;
	            if (event.changedTouches) {
	                posEvent = event.changedTouches[0];
	            }
	            return posEvent;
	        }
	    }, {
	        key: "stopPropagation",
	        value: function stopPropagation(event) {
	            if (event.stopPropagation) {
	                event.stopPropagation();
	            }
	        }
	    }, {
	        key: "preventDefault",
	        value: function preventDefault(event) {
	            if (event.preventDefault) {
	                event.preventDefault();
	            }
	            return event;
	        }
	    }, {
	        key: "startDrag",
	        value: function startDrag(event, fDragStart, fDragMove, fDragEnd, fDragCancel, fClick, fDblClick) {
	            var posEvent = this.getLocationEvent(event);
	            this.addGlass(fDragCancel);
	
	            if (this.dragging) debugger; // should never happen
	
	            if (event != null) {
	                this.startX = posEvent.clientX;
	                this.startY = posEvent.clientY;
	                this.glass.style.cursor = getComputedStyle(event.target).cursor;
	                this.stopPropagation(event);
	                this.preventDefault(event);
	            } else {
	                this.startX = 0;
	                this.startY = 0;
	                this.glass.style.cursor = "default";
	            }
	
	            this.dragging = false;
	            this.fDragStart = fDragStart;
	            this.fDragMove = fDragMove;
	            this.fDragEnd = fDragEnd;
	            this.fDragCancel = fDragCancel;
	            this.fClick = fClick;
	            this.fDblClick = fDblClick;
	
	            document.addEventListener("mouseup", this.onMouseUp);
	            document.addEventListener("mousemove", this.onMouseMove);
	            document.addEventListener("touchend", this.onMouseUp);
	            document.addEventListener("touchmove", this.onMouseMove);
	        }
	    }, {
	        key: "onMouseMove",
	        value: function onMouseMove(event) {
	            var posEvent = this.getLocationEvent(event);
	            this.stopPropagation(event);
	            this.preventDefault(event);
	
	            if (!this.dragging && (Math.abs(this.startX - posEvent.clientX) > 5 || Math.abs(this.startY - posEvent.clientY) > 5)) {
	                this.dragging = true;
	                if (this.fDragStart) {
	                    this.glass.style.cursor = "move";
	                    this.dragging = this.fDragStart({ "clientX": this.startX, "clientY": this.startY });
	                }
	            }
	
	            if (this.dragging) {
	                if (this.fDragMove) {
	                    this.fDragMove(posEvent);
	                }
	            }
	            return false;
	        }
	    }, {
	        key: "onMouseUp",
	        value: function onMouseUp(event) {
	            var posEvent = this.getLocationEventEnd(event);
	
	            this.stopPropagation(event);
	            this.preventDefault(event);
	
	            if (!this.manualGlassManagement) {
	                this.hideGlass();
	            }
	
	            document.removeEventListener("mousemove", this.onMouseMove);
	            document.removeEventListener("mouseup", this.onMouseUp);
	            document.removeEventListener("touchend", this.onMouseUp);
	            document.removeEventListener("touchmove", this.onMouseMove);
	
	            if (this.dragging) {
	                this.dragging = false;
	                if (this.fDragEnd) {
	                    this.fDragEnd(event);
	                }
	                //dump("set dragging = false\n");
	            } else {
	                if (Math.abs(this.startX - posEvent.clientX) <= 5 && Math.abs(this.startY - posEvent.clientY) <= 5) {
	                    var clickTime = new Date().getTime();
	                    // check for double click
	                    if (Math.abs(this.clickX - posEvent.clientX) <= 5 && Math.abs(this.clickY - posEvent.clientY) <= 5) {
	                        if (clickTime - this.lastClick < 500) {
	                            if (this.fDblClick) {
	                                this.fDblClick(event);
	                            }
	                        }
	                    }
	
	                    if (this.fClick) {
	                        this.fClick(event);
	                    }
	                    this.lastClick = clickTime;
	                    this.clickX = posEvent.clientX;
	                    this.clickY = posEvent.clientY;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: "isDragging",
	        value: function isDragging() {
	            return this.dragging;
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            var rtn = "(DragDrop: " + "startX=" + this.startX + ", startY=" + this.startY + ", dragging=" + this.dragging + ")";
	
	            return rtn;
	        }
	    }]);
	
	    return DragDrop;
	}();
	
	DragDrop.instance = new DragDrop();
	
	exports.default = DragDrop;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Rect = function () {
	    function Rect(x, y, width, height) {
	        _classCallCheck(this, Rect);
	
	        this.x = x;
	        this.y = y;
	        this.width = width;
	        this.height = height;
	    }
	
	    _createClass(Rect, [{
	        key: "clone",
	        value: function clone() {
	            return new Rect(this.x, this.y, this.width, this.height);
	        }
	    }, {
	        key: "equals",
	        value: function equals(rect) {
	            if (this.x === rect.x && this.y === rect.y && this.width === rect.width && this.height === rect.height) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: "getBottom",
	        value: function getBottom() {
	            return this.y + this.height;
	        }
	    }, {
	        key: "getRight",
	        value: function getRight() {
	            return this.x + this.width;
	        }
	    }, {
	        key: "positionElement",
	        value: function positionElement(element) {
	            this.styleWithPosition(element.style);
	        }
	    }, {
	        key: "styleWithPosition",
	        value: function styleWithPosition(style) {
	            style.left = this.x + "px";
	            style.top = this.y + "px";
	            style.width = Math.max(0, this.width) + "px"; // need Math.max to prevent -ve, cause error in IE
	            style.height = Math.max(0, this.height) + "px";
	            style.position = "absolute";
	            return style;
	        }
	    }, {
	        key: "contains",
	        value: function contains(x, y) {
	            if (this.x <= x && x <= this.getRight() && this.y <= y && y <= this.getBottom()) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: "centerInRect",
	        value: function centerInRect(outerRect) {
	            this.x = (outerRect.width - this.width) / 2;
	            this.y = (outerRect.height - this.height) / 2;
	        }
	    }, {
	        key: "_getSize",
	        value: function _getSize(orientation) {
	            var prefSize = this.width;
	            if (orientation === _Orientation2.default.VERT) {
	                prefSize = this.height;
	            }
	            return prefSize;
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return "(Rect: x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
	        }
	    }]);
	
	    return Rect;
	}();
	
	exports.default = Rect;

/***/ }),
/* 191 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Orientation = function () {
	    function Orientation() {
	        _classCallCheck(this, Orientation);
	    }
	
	    _createClass(Orientation, null, [{
	        key: "flip",
	        value: function flip(from) {
	            if (from === Orientation.HORZ) {
	                return Orientation.VERT;
	            } else {
	                return Orientation.HORZ;
	            }
	        }
	    }]);
	
	    return Orientation;
	}();
	
	// statics
	
	
	Orientation.HORZ = "horz";
	Orientation.VERT = "vert";
	
	exports.default = Orientation;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _AttributeDefinitions = __webpack_require__(193);
	
	var _AttributeDefinitions2 = _interopRequireDefault(_AttributeDefinitions);
	
	var _Attribute = __webpack_require__(194);
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	var _DropInfo = __webpack_require__(196);
	
	var _DropInfo2 = _interopRequireDefault(_DropInfo);
	
	var _Node2 = __webpack_require__(197);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _TabNode = __webpack_require__(198);
	
	var _TabNode2 = _interopRequireDefault(_TabNode);
	
	var _TabSetNode = __webpack_require__(199);
	
	var _TabSetNode2 = _interopRequireDefault(_TabSetNode);
	
	var _SplitterNode = __webpack_require__(201);
	
	var _SplitterNode2 = _interopRequireDefault(_SplitterNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BorderNode = function (_Node) {
	    _inherits(BorderNode, _Node);
	
	    function BorderNode(location, json, model) {
	        _classCallCheck(this, BorderNode);
	
	        var _this = _possibleConstructorReturn(this, (BorderNode.__proto__ || Object.getPrototypeOf(BorderNode)).call(this, model));
	
	        _this._contentRect = null;
	        _this._tabHeaderRect = null;
	        _this._location = location;
	        _this._drawChildren = [];
	        _this._attributes["id"] = "border_" + location.getName();
	        attributeDefinitions.fromJson(json, _this._attributes);
	        model._addNode(_this);
	        return _this;
	    }
	
	    _createClass(BorderNode, [{
	        key: "getLocation",
	        value: function getLocation() {
	            return this._location;
	        }
	    }, {
	        key: "getTabHeaderRect",
	        value: function getTabHeaderRect() {
	            return this._tabHeaderRect;
	        }
	    }, {
	        key: "getContentRect",
	        value: function getContentRect() {
	            return this._contentRect;
	        }
	    }, {
	        key: "isEnableDrop",
	        value: function isEnableDrop() {
	            return this._getAttr("enableDrop");
	        }
	    }, {
	        key: "getClassNameBorder",
	        value: function getClassNameBorder() {
	            return this._getAttr("className");
	        }
	    }, {
	        key: "getBorderBarSize",
	        value: function getBorderBarSize() {
	            return this._getAttr("barSize");
	        }
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            return this._attributes["size"];
	        }
	    }, {
	        key: "getSelected",
	        value: function getSelected() {
	            return this._attributes["selected"];
	        }
	    }, {
	        key: "getSelectedNode",
	        value: function getSelectedNode() {
	            if (this.getSelected() != -1) {
	                return this._children[this.getSelected()];
	            }
	            return null;
	        }
	    }, {
	        key: "getOrientation",
	        value: function getOrientation() {
	            return this._location.getOrientation();
	        }
	    }, {
	        key: "isMaximized",
	        value: function isMaximized() {
	            return false;
	        }
	    }, {
	        key: "isShowing",
	        value: function isShowing() {
	            return this._attributes["show"];
	        }
	    }, {
	        key: "_setSelected",
	        value: function _setSelected(index) {
	            this._attributes["selected"] = index;
	        }
	    }, {
	        key: "_setSize",
	        value: function _setSize(pos) {
	            this._attributes["size"] = pos;
	        }
	    }, {
	        key: "_updateAttrs",
	        value: function _updateAttrs(json) {
	            attributeDefinitions.update(json, this._attributes);
	        }
	    }, {
	        key: "_getDrawChildren",
	        value: function _getDrawChildren() {
	            return this._drawChildren;
	        }
	    }, {
	        key: "_setAdjustedSize",
	        value: function _setAdjustedSize(size) {
	            this._adjustedSize = size;
	        }
	    }, {
	        key: "_getAdjustedSize",
	        value: function _getAdjustedSize() {
	            return this._adjustedSize;
	        }
	    }, {
	        key: "_layout",
	        value: function _layout(borderRects) {
	            var _this2 = this;
	
	            this._drawChildren = [];
	            var location = this._location;
	
	            var split1 = location.split(borderRects.outer, this.getBorderBarSize()); // split border outer
	            var split2 = location.split(borderRects.inner, this.getBorderBarSize()); // split border inner
	            var split3 = location.split(split2.end, this._adjustedSize + this._model.getSplitterSize()); // split off tab contents
	            var split4 = location.reflect().split(split3.start, this._model.getSplitterSize()); // split contents into content and splitter
	
	            this._tabHeaderRect = split2.start;
	            this._contentRect = split4.end;
	
	            this._children.forEach(function (child, i) {
	                child._layout(_this2._contentRect);
	                child._setVisible(i === _this2.getSelected());
	                _this2._drawChildren.push(child);
	            });
	
	            if (this.getSelected() == -1) {
	                return { outer: split1.end, inner: split2.end };
	            } else {
	                var newSplitter = new _SplitterNode2.default(this._model);
	                newSplitter._parent = this;
	                newSplitter._rect = split4.start;
	                this._drawChildren.push(newSplitter);
	
	                return { outer: split1.end, inner: split3.end };
	            }
	        }
	    }, {
	        key: "_remove",
	        value: function _remove(node) {
	            if (this.getSelected() != -1) {
	                var selectedNode = this._children[this.getSelected()];
	                if (node === selectedNode) {
	                    this._setSelected(-1);
	                    this._removeChild(node);
	                } else {
	                    this._removeChild(node);
	                    for (var i = 0; i < this._children.length; i++) {
	                        if (this._children[i] === selectedNode) {
	                            this._setSelected(i);
	                            break;
	                        }
	                    }
	                }
	            } else {
	                this._removeChild(node);
	            }
	        }
	    }, {
	        key: "_canDrop",
	        value: function _canDrop(dragNode, x, y) {
	            if (dragNode.getType() != _TabNode2.default.TYPE) {
	                return false;
	            }
	
	            var dropInfo = null;
	            var dockLocation = _DockLocation2.default.CENTER;
	
	            if (this._tabHeaderRect.contains(x, y)) {
	                if (this._location._orientation == _Orientation2.default.VERT) {
	                    if (this._children.length > 0) {
	                        var child = this._children[0];
	                        var childRect = child._tabRect;
	                        var childY = childRect.y;
	
	                        var childHeight = childRect.height;
	
	                        var pos = this._tabHeaderRect.x;
	                        var childCenter = 0;
	                        for (var i = 0; i < this._children.length; i++) {
	                            child = this._children[i];
	                            childRect = child._tabRect;
	                            childCenter = childRect.x + childRect.width / 2;
	                            if (x >= pos && x < childCenter) {
	                                var outlineRect = new _Rect2.default(childRect.x - 2, childY, 3, childHeight);
	                                dropInfo = new _DropInfo2.default(this, outlineRect, dockLocation, i, "flexlayout__outline_rect");
	                                break;
	                            }
	                            pos = childCenter;
	                        }
	                        if (dropInfo == null) {
	                            var _outlineRect = new _Rect2.default(childRect.getRight() - 2, childY, 3, childHeight);
	                            dropInfo = new _DropInfo2.default(this, _outlineRect, dockLocation, this._children.length, "flexlayout__outline_rect");
	                        }
	                    } else {
	                        var _outlineRect2 = new _Rect2.default(this._tabHeaderRect.x + 1, this._tabHeaderRect.y + 2, 3, 18);
	                        dropInfo = new _DropInfo2.default(this, _outlineRect2, dockLocation, 0, "flexlayout__outline_rect");
	                    }
	                } else {
	                    if (this._children.length > 0) {
	                        var _child = this._children[0];
	                        var _childRect = _child._tabRect;
	                        var childX = _childRect.x;
	                        var childWidth = _childRect.width;
	
	                        var _pos = this._tabHeaderRect.y;
	                        var _childCenter = 0;
	                        for (var _i = 0; _i < this._children.length; _i++) {
	                            _child = this._children[_i];
	                            _childRect = _child._tabRect;
	                            _childCenter = _childRect.y + _childRect.height / 2;
	                            if (y >= _pos && y < _childCenter) {
	                                var _outlineRect3 = new _Rect2.default(childX, _childRect.y - 2, childWidth, 3);
	                                dropInfo = new _DropInfo2.default(this, _outlineRect3, dockLocation, _i, "flexlayout__outline_rect");
	                                break;
	                            }
	                            _pos = _childCenter;
	                        }
	                        if (dropInfo == null) {
	                            var _outlineRect4 = new _Rect2.default(childX, _childRect.getBottom() - 2, childWidth, 3);
	                            dropInfo = new _DropInfo2.default(this, _outlineRect4, dockLocation, this._children.length, "flexlayout__outline_rect");
	                        }
	                    } else {
	                        var _outlineRect5 = new _Rect2.default(this._tabHeaderRect.x + 2, this._tabHeaderRect.y + 1, 18, 3);
	                        dropInfo = new _DropInfo2.default(this, _outlineRect5, dockLocation, 0, "flexlayout__outline_rect");
	                    }
	                }
	                if (!dragNode._canDockInto(dragNode, dropInfo)) {
	                    return null;
	                }
	            } else if (this.getSelected() != -1 && this._contentRect.contains(x, y)) {
	                var _outlineRect6 = this._contentRect;
	                dropInfo = new _DropInfo2.default(this, _outlineRect6, dockLocation, -1, "flexlayout__outline_rect");
	                if (!dragNode._canDockInto(dragNode, dropInfo)) {
	                    return null;
	                }
	            }
	
	            return dropInfo;
	        }
	    }, {
	        key: "_drop",
	        value: function _drop(dragNode, location, index) {
	            var fromIndex = 0;
	            if (dragNode._parent != null) {
	                fromIndex = dragNode._parent._removeChild(dragNode);
	            }
	
	            // if dropping a tab back to same tabset and moving to forward position then reduce insertion index
	            if (dragNode.getType() === _TabNode2.default.TYPE && dragNode._parent === this && fromIndex < index && index > 0) {
	                index--;
	            }
	
	            // for the tabset/border being removed from set the selected index
	            if (dragNode._parent !== null) {
	                if (dragNode._parent.getType() === _TabSetNode2.default.TYPE) {
	                    dragNode._parent._setSelected(0);
	                } else if (dragNode._parent.getType() === BorderNode.TYPE) {
	                    if (dragNode._parent.getSelected() != -1) {
	                        if (fromIndex === dragNode._parent.getSelected() && dragNode._parent._children.length > 0) {
	                            dragNode._parent._setSelected(0);
	                        } else if (fromIndex < dragNode._parent.getSelected()) {
	                            dragNode._parent._setSelected(dragNode._parent.getSelected() - 1);
	                        } else if (fromIndex > dragNode._parent.getSelected()) {
	                            // leave selected index as is
	                        } else {
	                            dragNode._parent._setSelected(-1);
	                        }
	                    }
	                }
	            }
	
	            // simple_bundled dock to existing tabset
	            var insertPos = index;
	            if (insertPos === -1) {
	                insertPos = this._children.length;
	            }
	
	            if (dragNode.getType() === _TabNode2.default.TYPE) {
	                this._addChild(dragNode, insertPos);
	            }
	
	            if (this.getSelected() !== -1) {
	                // already open
	                this._setSelected(insertPos);
	            }
	
	            this._model._tidy();
	        }
	    }, {
	        key: "_toJson",
	        value: function _toJson() {
	            var json = {};
	            attributeDefinitions.toJson(json, this._attributes);
	            json.location = this._location.getName();
	            json.children = this._children.map(function (child) {
	                return child._toJson();
	            });
	            return json;
	        }
	    }, {
	        key: "_getSplitterBounds",
	        value: function _getSplitterBounds(splitter) {
	            var pBounds = [0, 0];
	            var outerRect = this._model._getOuterInnerRects().outer;
	            var innerRect = this._model._getOuterInnerRects().inner;
	            if (this._location === _DockLocation2.default.TOP) {
	                pBounds[0] = outerRect.y;
	                pBounds[1] = innerRect.getBottom() - splitter.getHeight();
	            } else if (this._location === _DockLocation2.default.LEFT) {
	                pBounds[0] = outerRect.x;
	                pBounds[1] = innerRect.getRight() - splitter.getWidth();
	            } else if (this._location === _DockLocation2.default.BOTTOM) {
	                pBounds[0] = innerRect.y;
	                pBounds[1] = outerRect.getBottom() - splitter.getHeight();
	            } else if (this._location === _DockLocation2.default.RIGHT) {
	                pBounds[0] = innerRect.x;
	                pBounds[1] = outerRect.getRight() - splitter.getWidth();
	            }
	            return pBounds;
	        }
	    }, {
	        key: "_calculateSplit",
	        value: function _calculateSplit(splitter, splitterPos) {
	            var pBounds = this._getSplitterBounds(splitter);
	            if (this._location == _DockLocation2.default.BOTTOM || this._location == _DockLocation2.default.RIGHT) {
	                return Math.max(0, pBounds[1] - splitterPos);
	            } else {
	                return Math.max(0, splitterPos - pBounds[0]);
	            }
	        }
	    }, {
	        key: "_getAttributeDefinitions",
	        value: function _getAttributeDefinitions() {
	            return attributeDefinitions;
	        }
	    }], [{
	        key: "_fromJson",
	        value: function _fromJson(json, model) {
	
	            var location = _DockLocation2.default.getByName(json.location);
	            var border = new BorderNode(location, json, model);
	            if (json.children) {
	                border._children = json.children.map(function (jsonChild) {
	                    var child = _TabNode2.default._fromJson(jsonChild, model);
	                    child._parent = border;
	                    return child;
	                });
	            }
	
	            return border;
	        }
	    }]);
	
	    return BorderNode;
	}(_Node3.default);
	
	BorderNode.TYPE = "border";
	
	var attributeDefinitions = new _AttributeDefinitions2.default();
	attributeDefinitions.add("type", BorderNode.TYPE, true);
	
	attributeDefinitions.add("size", 200);
	attributeDefinitions.add("selected", -1);
	attributeDefinitions.add("show", true).setType(_Attribute2.default.BOOLEAN);
	
	attributeDefinitions.addInherited("barSize", "borderBarSize").setType(_Attribute2.default.INT).setFrom(0);
	attributeDefinitions.addInherited("enableDrop", "borderEnableDrop").setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.addInherited("className", "borderClassName").setType(_Attribute2.default.STRING);
	
	exports.default = BorderNode;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Attribute = __webpack_require__(194);
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AttributeDefinitions = function () {
	    function AttributeDefinitions() {
	        _classCallCheck(this, AttributeDefinitions);
	
	        this.attributes = [];
	        this.nameToAttribute = {};
	    }
	
	    _createClass(AttributeDefinitions, [{
	        key: "addWithAll",
	        value: function addWithAll(name, modelName, defaultValue, alwaysWriteJson) {
	            var attr = new _Attribute2.default(name, modelName, defaultValue, alwaysWriteJson);
	            this.attributes.push(attr);
	            this.nameToAttribute[name] = attr;
	            return attr;
	        }
	    }, {
	        key: "addInherited",
	        value: function addInherited(name, modelName) {
	            return this.addWithAll(name, modelName, undefined, false);
	        }
	    }, {
	        key: "add",
	        value: function add(name, defaultValue, alwaysWriteJson) {
	            return this.addWithAll(name, null, defaultValue, alwaysWriteJson);
	        }
	    }, {
	        key: "getAttributes",
	        value: function getAttributes() {
	            return this.attributes;
	        }
	    }, {
	        key: "getModelName",
	        value: function getModelName(name) {
	            var conversion = this.nameToAttribute[name];
	            if (conversion != null) {
	                return conversion.modelName;
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: "toJson",
	        value: function toJson(jsonObj, obj) {
	            this.attributes.forEach(function (attr) {
	                var fromValue = obj[attr.name];
	                if (attr.alwaysWriteJson || fromValue !== attr.defaultValue) {
	                    jsonObj[attr.name] = fromValue;
	                }
	            });
	        }
	    }, {
	        key: "fromJson",
	        value: function fromJson(jsonObj, obj) {
	            this.attributes.forEach(function (attr) {
	                var fromValue = jsonObj[attr.name];
	                if (fromValue === undefined) {
	                    obj[attr.name] = attr.defaultValue;
	                } else {
	                    obj[attr.name] = fromValue;
	                }
	            });
	        }
	    }, {
	        key: "update",
	        value: function update(jsonObj, obj) {
	            this.attributes.forEach(function (attr) {
	
	                var fromValue = jsonObj[attr.name];
	                if (fromValue !== undefined) {
	                    obj[attr.name] = fromValue;
	                }
	            });
	        }
	    }, {
	        key: "setDefaults",
	        value: function setDefaults(obj) {
	            this.attributes.forEach(function (attr) {
	                obj[attr.name] = attr.defaultValue;
	            });
	        }
	    }]);
	
	    return AttributeDefinitions;
	}();
	
	exports.default = AttributeDefinitions;

/***/ }),
/* 194 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Attribute = function () {
	    function Attribute(name, modelName, defaultValue, alwaysWriteJson) {
	        _classCallCheck(this, Attribute);
	
	        this.name = name;
	        this.modelName = modelName;
	        this.defaultValue = defaultValue;
	        this.alwaysWriteJson = alwaysWriteJson;
	
	        this.type = null;
	        this.values = [];
	        this.from = -99999999;
	        this.to = 99999999;
	    }
	
	    _createClass(Attribute, [{
	        key: "setType",
	        value: function setType(value) {
	            this.type = value;
	            return this;
	        }
	    }, {
	        key: "setValues",
	        value: function setValues() {
	            this.values = Array.from(arguments);
	            return this;
	        }
	    }, {
	        key: "setFrom",
	        value: function setFrom(value) {
	            this.from = value;
	            return this;
	        }
	    }, {
	        key: "setTo",
	        value: function setTo(value) {
	            this.to = value;
	            return this;
	        }
	    }]);
	
	    return Attribute;
	}();
	
	Attribute.ENUM = "Enum";
	Attribute.INT = "Int";
	Attribute.NUMBER = "Number";
	Attribute.STRING = "String";
	Attribute.BOOLEAN = "Boolean";
	Attribute.ID = "Id";
	Attribute.JSON = "Json";
	
	exports.default = Attribute;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var values = {};
	
	var DockLocation = function () {
	    function DockLocation(name, orientation, indexPlus) {
	        _classCallCheck(this, DockLocation);
	
	        this._name = name;
	        this._orientation = orientation;
	        this._indexPlus = indexPlus;
	        values[this._name] = this;
	    }
	
	    _createClass(DockLocation, [{
	        key: "getName",
	        value: function getName() {
	            return this._name;
	        }
	    }, {
	        key: "getOrientation",
	        value: function getOrientation() {
	            return this._orientation;
	        }
	    }, {
	        key: "getDockRect",
	        value: function getDockRect(r) {
	            if (this === DockLocation.TOP) {
	                return new _Rect2.default(r.x, r.y, r.width, r.height / 2);
	            } else if (this === DockLocation.BOTTOM) {
	                return new _Rect2.default(r.x, r.getBottom() - r.height / 2, r.width, r.height / 2);
	            }
	            if (this === DockLocation.LEFT) {
	                return new _Rect2.default(r.x, r.y, r.width / 2, r.height);
	            } else if (this === DockLocation.RIGHT) {
	                return new _Rect2.default(r.getRight() - r.width / 2, r.y, r.width / 2, r.height);
	            } else {
	                return r.clone();
	            }
	        }
	    }, {
	        key: "split",
	        value: function split(rect, size) {
	            if (this === DockLocation.TOP) {
	                var r1 = new _Rect2.default(rect.x, rect.y, rect.width, size);
	                var r2 = new _Rect2.default(rect.x, rect.y + size, rect.width, rect.height - size);
	                return { start: r1, end: r2 };
	            } else if (this === DockLocation.LEFT) {
	                var _r = new _Rect2.default(rect.x, rect.y, size, rect.height);
	                var _r2 = new _Rect2.default(rect.x + size, rect.y, rect.width - size, rect.height);
	                return { start: _r, end: _r2 };
	            }
	            if (this === DockLocation.RIGHT) {
	                var _r3 = new _Rect2.default(rect.getRight() - size, rect.y, size, rect.height);
	                var _r4 = new _Rect2.default(rect.x, rect.y, rect.width - size, rect.height);
	                return { start: _r3, end: _r4 };
	            } else if (this === DockLocation.BOTTOM) {
	                var _r5 = new _Rect2.default(rect.x, rect.getBottom() - size, rect.width, size);
	                var _r6 = new _Rect2.default(rect.x, rect.y, rect.width, rect.height - size);
	                return { start: _r5, end: _r6 };
	            }
	        }
	    }, {
	        key: "reflect",
	        value: function reflect() {
	            if (this === DockLocation.TOP) {
	                return DockLocation.BOTTOM;
	            } else if (this === DockLocation.LEFT) {
	                return DockLocation.RIGHT;
	            }
	            if (this === DockLocation.RIGHT) {
	                return DockLocation.LEFT;
	            } else if (this === DockLocation.BOTTOM) {
	                return DockLocation.TOP;
	            }
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return "(DockLocation: name=" + this._name + ", orientation=" + this._orientation + ")";
	        }
	    }], [{
	        key: "getByName",
	        value: function getByName(name) {
	            return values[name];
	        }
	    }, {
	        key: "getLocation",
	        value: function getLocation(rect, x, y) {
	            if (x < rect.x + rect.width / 4) {
	                return DockLocation.LEFT;
	            } else if (x > rect.getRight() - rect.width / 4) {
	                return DockLocation.RIGHT;
	            } else if (y < rect.y + rect.height / 4) {
	                return DockLocation.TOP;
	            } else if (y > rect.getBottom() - rect.height / 4) {
	                return DockLocation.BOTTOM;
	            } else {
	                return DockLocation.CENTER;
	            }
	        }
	    }]);
	
	    return DockLocation;
	}();
	
	// statics
	
	
	DockLocation.TOP = new DockLocation("top", _Orientation2.default.VERT, 0);
	DockLocation.BOTTOM = new DockLocation("bottom", _Orientation2.default.VERT, 1);
	DockLocation.LEFT = new DockLocation("left", _Orientation2.default.HORZ, 0);
	DockLocation.RIGHT = new DockLocation("right", _Orientation2.default.HORZ, 1);
	DockLocation.CENTER = new DockLocation("center", _Orientation2.default.VERT, 0);
	
	exports.default = DockLocation;

/***/ }),
/* 196 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DropInfo = function DropInfo(node, rect, location, index, className) {
	    _classCallCheck(this, DropInfo);
	
	    this.node = node;
	    this.rect = rect;
	    this.location = location;
	    this.index = index;
	    this.className = className;
	};
	
	exports.default = DropInfo;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Node = function () {
	    function Node(model) {
	        _classCallCheck(this, Node);
	
	        this._model = model;
	        this._attributes = {};
	        this._parent = null;
	        this._children = [];
	        this._fixed = false;
	        this._rect = new _Rect2.default();
	        this._visible = false;
	        this._listeners = {};
	    }
	
	    _createClass(Node, [{
	        key: "getId",
	        value: function getId() {
	            return this._attributes["id"];
	        }
	    }, {
	        key: "getModel",
	        value: function getModel() {
	            return this._model;
	        }
	    }, {
	        key: "getType",
	        value: function getType() {
	            return this._attributes["type"];
	        }
	    }, {
	        key: "getParent",
	        value: function getParent() {
	            return this._parent;
	        }
	    }, {
	        key: "getChildren",
	        value: function getChildren() {
	            return this._children;
	        }
	    }, {
	        key: "getRect",
	        value: function getRect() {
	            return this._rect;
	        }
	    }, {
	        key: "isVisible",
	        value: function isVisible() {
	            return this._visible;
	        }
	    }, {
	        key: "getOrientation",
	        value: function getOrientation() {
	            if (this._parent == null) {
	                return _Orientation2.default.HORZ;
	            } else {
	                return _Orientation2.default.flip(this._parent.getOrientation());
	            }
	        }
	
	        // event can be: resize, visibility, maximize (on tabset), close
	
	    }, {
	        key: "setEventListener",
	        value: function setEventListener(event, callback) {
	            this._listeners[event] = callback;
	        }
	    }, {
	        key: "removeEventListener",
	        value: function removeEventListener(event) {
	            delete this._listeners[event];
	        }
	    }, {
	        key: "_setId",
	        value: function _setId(id) {
	            this._attributes["id"] = id;
	        }
	    }, {
	        key: "_fireEvent",
	        value: function _fireEvent(event, params) {
	            //console.log(this._type, " fireEvent " + event + " " + JSON.stringify(params));
	            if (this._listeners[event] != null) {
	                this._listeners[event](params);
	            }
	        }
	    }, {
	        key: "_getAttr",
	        value: function _getAttr(name) {
	            var val = this._attributes[name];
	
	            if (val === undefined) {
	                var modelName = this._getAttributeDefinitions().getModelName(name);
	                if (modelName != null) {
	                    val = this._model._attributes[modelName];
	                }
	            }
	
	            //console.log(name + "=" + val);
	            return val;
	        }
	    }, {
	        key: "_forEachNode",
	        value: function _forEachNode(fn, level) {
	            fn(this, level);
	            level++;
	            this._children.forEach(function (node) {
	                node._forEachNode(fn, level);
	            });
	        }
	    }, {
	        key: "_getPrefSize",
	        value: function _getPrefSize(orientation) {
	            var prefSize = this.getWidth();
	            if (orientation === _Orientation2.default.VERT) {
	                prefSize = this.getHeight();
	            }
	            return prefSize;
	        }
	    }, {
	        key: "_setVisible",
	        value: function _setVisible(visible) {
	            if (visible != this._visible) {
	                this._fireEvent("visibility", { visible: visible });
	                this._visible = visible;
	            }
	        }
	    }, {
	        key: "_getDrawChildren",
	        value: function _getDrawChildren() {
	            return this._children;
	        }
	    }, {
	        key: "_layout",
	        value: function _layout(rect) {
	            this._rect = rect;
	        }
	    }, {
	        key: "_findDropTargetNode",
	        value: function _findDropTargetNode(dragNode, x, y) {
	            var rtn = null;
	            if (this._rect.contains(x, y)) {
	                rtn = this._canDrop(dragNode, x, y);
	                if (rtn == null) {
	                    if (this._children.length !== 0) {
	                        for (var i = 0; i < this._children.length; i++) {
	                            var child = this._children[i];
	                            rtn = child._findDropTargetNode(dragNode, x, y);
	                            if (rtn != null) {
	                                break;
	                            }
	                        }
	                    }
	                }
	            }
	
	            return rtn;
	        }
	    }, {
	        key: "_canDrop",
	        value: function _canDrop(dragNode, x, y) {
	            return null;
	        }
	    }, {
	        key: "_canDockInto",
	        value: function _canDockInto(dragNode, dropInfo) {
	            if (dropInfo != null) {
	                if (dropInfo.location === _DockLocation2.default.CENTER && dropInfo.node.isEnableDrop() === false) {
	                    return false;
	                }
	
	                // prevent named tabset docking into another tabset, since this would loose the header
	                if (dropInfo.location === _DockLocation2.default.CENTER && dragNode.getType() === "tabset" && dragNode.getName() !== null) {
	                    return false;
	                }
	
	                if (dropInfo.location !== _DockLocation2.default.CENTER && dropInfo.node.isEnableDivide() === false) {
	                    return false;
	                }
	
	                // finally check model callback to check if drop allowed
	                if (this._model._onAllowDrop) {
	                    return this._model._onAllowDrop(dragNode, dropInfo);
	                }
	            }
	            return true;
	        }
	    }, {
	        key: "_removeChild",
	        value: function _removeChild(childNode) {
	            var pos = this._children.indexOf(childNode);
	            if (pos !== -1) {
	                this._children.splice(pos, 1);
	            }
	            this._dirty = true;
	            return pos;
	        }
	    }, {
	        key: "_addChild",
	        value: function _addChild(childNode, pos) {
	            if (pos != undefined) {
	                this._children.splice(pos, 0, childNode);
	            } else {
	                this._children.push(childNode);
	                pos = this._children.length - 1;
	            }
	            childNode._parent = this;
	            this._dirty = true;
	            return pos;
	        }
	    }, {
	        key: "_removeAll",
	        value: function _removeAll() {
	            this._children = [];
	            this._dirty = true;
	        }
	    }, {
	        key: "_styleWithPosition",
	        value: function _styleWithPosition(style) {
	            if (style == undefined) {
	                style = {};
	            }
	            return this._rect.styleWithPosition(style);
	        }
	    }, {
	        key: "isEnableDivide",
	        value: function isEnableDivide() {
	            return true;
	        }
	
	        // implemented by subclasses
	
	    }, {
	        key: "_updateAttrs",
	        value: function _updateAttrs(json) {}
	
	        // implemented by subclasses
	
	    }, {
	        key: "_getAttributeDefinitions",
	        value: function _getAttributeDefinitions() {
	            return null;
	        }
	    }, {
	        key: "_toStringIndented",
	        value: function _toStringIndented(lines, indent) {
	            lines.push(indent + this.getType() + " " + this.getWeight().toFixed(2) + " " + this.getId());
	            indent = indent + "\t";
	            this._children.forEach(function (child) {
	                child._toStringIndented(lines, indent);
	            });
	        }
	    }, {
	        key: "_toAttributeString",
	        value: function _toAttributeString() {
	            return JSON.stringify(this._attributes, null, "\t");
	        }
	    }]);
	
	    return Node;
	}();
	
	exports.default = Node;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Node2 = __webpack_require__(197);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _AttributeDefinitions = __webpack_require__(193);
	
	var _AttributeDefinitions2 = _interopRequireDefault(_AttributeDefinitions);
	
	var _Attribute = __webpack_require__(194);
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TabNode = function (_Node) {
	    _inherits(TabNode, _Node);
	
	    function TabNode(model, json) {
	        _classCallCheck(this, TabNode);
	
	        var _this = _possibleConstructorReturn(this, (TabNode.__proto__ || Object.getPrototypeOf(TabNode)).call(this, model));
	
	        _this._tabRect = null; // rect of the tab rather than the tab contents=
	        _this._extra = {}; // extra data added to node not saved in json
	
	        attributeDefinitions.fromJson(json, _this._attributes);
	        model._addNode(_this);
	        return _this;
	    }
	
	    _createClass(TabNode, [{
	        key: "getTabRect",
	        value: function getTabRect() {
	            return this._tabRect;
	        }
	    }, {
	        key: "setTabRect",
	        value: function setTabRect(rect) {
	            this._tabRect = rect;
	        }
	    }, {
	        key: "getName",
	        value: function getName() {
	            return this._attributes["name"];
	        }
	    }, {
	        key: "getComponent",
	        value: function getComponent() {
	            return this._attributes["component"];
	        }
	    }, {
	        key: "getConfig",
	        value: function getConfig() {
	            return this._attributes["config"];
	        }
	    }, {
	        key: "getExtraData",
	        value: function getExtraData() {
	            return this._extra;
	        }
	    }, {
	        key: "getIcon",
	        value: function getIcon() {
	            return this._attributes["icon"];
	        }
	    }, {
	        key: "isEnableClose",
	        value: function isEnableClose() {
	            return this._getAttr("enableClose");
	        }
	    }, {
	        key: "isEnableDrag",
	        value: function isEnableDrag() {
	            return this._getAttr("enableDrag");
	        }
	    }, {
	        key: "isEnableRename",
	        value: function isEnableRename() {
	            return this._getAttr("enableRename");
	        }
	    }, {
	        key: "getClassName",
	        value: function getClassName() {
	            return this._getAttr("className");
	        }
	    }, {
	        key: "_setName",
	        value: function _setName(name) {
	            this._attributes["name"] = name;
	        }
	    }, {
	        key: "_layout",
	        value: function _layout(rect) {
	            if (!rect.equals(this._rect)) {
	                this._fireEvent("resize", { rect: rect });
	            }
	            this._rect = rect;
	        }
	    }, {
	        key: "_delete",
	        value: function _delete() {
	            this._parent._remove(this);
	            this._fireEvent("close", {});
	        }
	    }, {
	        key: "_toJson",
	        value: function _toJson() {
	            var json = {};
	            attributeDefinitions.toJson(json, this._attributes);
	            return json;
	        }
	    }, {
	        key: "_updateAttrs",
	        value: function _updateAttrs(json) {
	            attributeDefinitions.update(json, this._attributes);
	        }
	    }, {
	        key: "_getAttributeDefinitions",
	        value: function _getAttributeDefinitions() {
	            return attributeDefinitions;
	        }
	    }], [{
	        key: "_fromJson",
	        value: function _fromJson(json, model) {
	            var newLayoutNode = new TabNode(model, json);
	            return newLayoutNode;
	        }
	    }]);
	
	    return TabNode;
	}(_Node3.default);
	
	TabNode.TYPE = "tab";
	
	var attributeDefinitions = new _AttributeDefinitions2.default();
	attributeDefinitions.add("type", TabNode.TYPE, true);
	attributeDefinitions.add("id", null).setType(_Attribute2.default.ID);
	
	attributeDefinitions.add("name", null).setType(_Attribute2.default.STRING);
	attributeDefinitions.add("component", null).setType(_Attribute2.default.STRING);
	attributeDefinitions.add("config", null).setType(_Attribute2.default.JSON);
	
	attributeDefinitions.addInherited("enableClose", "tabEnableClose").setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.addInherited("enableDrag", "tabEnableDrag").setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.addInherited("enableRename", "tabEnableRename").setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.addInherited("className", "tabClassName").setType(_Attribute2.default.STRING);
	attributeDefinitions.addInherited("icon", "tabIcon").setType(_Attribute2.default.STRING);
	
	exports.default = TabNode;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _AttributeDefinitions = __webpack_require__(193);
	
	var _AttributeDefinitions2 = _interopRequireDefault(_AttributeDefinitions);
	
	var _Attribute = __webpack_require__(194);
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	var _DropInfo = __webpack_require__(196);
	
	var _DropInfo2 = _interopRequireDefault(_DropInfo);
	
	var _Node2 = __webpack_require__(197);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _TabNode = __webpack_require__(198);
	
	var _TabNode2 = _interopRequireDefault(_TabNode);
	
	var _RowNode = __webpack_require__(200);
	
	var _RowNode2 = _interopRequireDefault(_RowNode);
	
	var _BorderNode = __webpack_require__(192);
	
	var _BorderNode2 = _interopRequireDefault(_BorderNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TabSetNode = function (_Node) {
	    _inherits(TabSetNode, _Node);
	
	    function TabSetNode(model, json) {
	        _classCallCheck(this, TabSetNode);
	
	        var _this = _possibleConstructorReturn(this, (TabSetNode.__proto__ || Object.getPrototypeOf(TabSetNode)).call(this, model));
	
	        _this._contentRect = null;
	        _this._headerRect = null;
	        _this._tabHeaderRect = null;
	
	        attributeDefinitions.fromJson(json, _this._attributes);
	        model._addNode(_this);
	        return _this;
	    }
	
	    _createClass(TabSetNode, [{
	        key: "getName",
	        value: function getName() {
	            return this._attributes["name"];
	        }
	    }, {
	        key: "getSelected",
	        value: function getSelected() {
	            return this._attributes["selected"];
	        }
	    }, {
	        key: "getSelectedNode",
	        value: function getSelectedNode() {
	            var selected = this.getSelected();
	            if (selected != -1) {
	                return this._children[selected];
	            }
	            return null;
	        }
	    }, {
	        key: "getWeight",
	        value: function getWeight() {
	            return this._attributes["weight"];
	        }
	    }, {
	        key: "getWidth",
	        value: function getWidth() {
	            return this._attributes["width"];
	        }
	    }, {
	        key: "getHeight",
	        value: function getHeight() {
	            return this._attributes["height"];
	        }
	    }, {
	        key: "isMaximized",
	        value: function isMaximized() {
	            return this._model.getMaximizedTabset() === this;
	        }
	    }, {
	        key: "isActive",
	        value: function isActive() {
	            return this._model.getActiveTabset() === this;
	        }
	    }, {
	        key: "isEnableDeleteWhenEmpty",
	        value: function isEnableDeleteWhenEmpty() {
	            return this._getAttr("enableDeleteWhenEmpty");
	        }
	    }, {
	        key: "isEnableClose",
	        value: function isEnableClose() {
	            return this._getAttr("enableClose");
	        }
	    }, {
	        key: "isEnableDrop",
	        value: function isEnableDrop() {
	            return this._getAttr("enableDrop");
	        }
	    }, {
	        key: "isEnableDrag",
	        value: function isEnableDrag() {
	            return this._getAttr("enableDrag");
	        }
	    }, {
	        key: "isEnableDivide",
	        value: function isEnableDivide() {
	            return this._getAttr("enableDivide");
	        }
	    }, {
	        key: "isEnableMaximize",
	        value: function isEnableMaximize() {
	            return this._getAttr("enableMaximize");
	        }
	    }, {
	        key: "isEnableTabStrip",
	        value: function isEnableTabStrip() {
	            return this._getAttr("enableTabStrip");
	        }
	    }, {
	        key: "getClassNameTabStrip",
	        value: function getClassNameTabStrip() {
	            return this._getAttr("classNameTabStrip");
	        }
	    }, {
	        key: "getClassNameHeader",
	        value: function getClassNameHeader() {
	            return this._getAttr("classNameHeader");
	        }
	    }, {
	        key: "getHeaderHeight",
	        value: function getHeaderHeight() {
	            return this._getAttr("headerHeight");
	        }
	    }, {
	        key: "getTabStripHeight",
	        value: function getTabStripHeight() {
	            return this._getAttr("tabStripHeight");
	        }
	    }, {
	        key: "_setWeight",
	        value: function _setWeight(weight) {
	            this._attributes["weight"] = weight;
	        }
	    }, {
	        key: "_setSelected",
	        value: function _setSelected(index) {
	            this._attributes["selected"] = index;
	        }
	    }, {
	        key: "_canDrop",
	        value: function _canDrop(dragNode, x, y) {
	            var dropInfo = null;
	
	            if (dragNode === this) {
	                var dockLocation = _DockLocation2.default.CENTER;
	                var outlineRect = this._tabHeaderRect;
	                dropInfo = new _DropInfo2.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect");
	            } else if (this._contentRect.contains(x, y)) {
	                var _dockLocation = _DockLocation2.default.getLocation(this._contentRect, x, y);
	                var _outlineRect = _dockLocation.getDockRect(this._rect);
	                dropInfo = new _DropInfo2.default(this, _outlineRect, _dockLocation, -1, "flexlayout__outline_rect");
	            } else if (this._children.length > 0 && this._tabHeaderRect != null && this._tabHeaderRect.contains(x, y)) {
	                var child = this._children[0];
	                var r = child._tabRect;
	                var yy = r.y;
	                var h = r.height;
	                var p = this._tabHeaderRect.x;
	                var childCenter = 0;
	                for (var i = 0; i < this._children.length; i++) {
	                    child = this._children[i];
	                    r = child._tabRect;
	                    childCenter = r.x + r.width / 2;
	                    if (x >= p && x < childCenter) {
	                        var _dockLocation2 = _DockLocation2.default.CENTER;
	                        var _outlineRect2 = new _Rect2.default(r.x - 2, yy, 3, h);
	                        dropInfo = new _DropInfo2.default(this, _outlineRect2, _dockLocation2, i, "flexlayout__outline_rect");
	                        break;
	                    }
	                    p = childCenter;
	                }
	                if (dropInfo == null) {
	                    var _dockLocation3 = _DockLocation2.default.CENTER;
	                    var _outlineRect3 = new _Rect2.default(r.getRight() - 2, yy, 3, h);
	                    dropInfo = new _DropInfo2.default(this, _outlineRect3, _dockLocation3, this._children.length, "flexlayout__outline_rect");
	                }
	            }
	
	            if (!dragNode._canDockInto(dragNode, dropInfo)) {
	                return null;
	            }
	
	            return dropInfo;
	        }
	    }, {
	        key: "_layout",
	        value: function _layout(rect) {
	            var _this2 = this;
	
	            if (this.isMaximized()) {
	                rect = this._model._root._rect;
	            }
	            this._rect = rect;
	
	            var showHeader = this.getName() != null;
	            var y = 0;
	            if (showHeader) {
	                this._headerRect = new _Rect2.default(rect.x, rect.y, rect.width, this.getHeaderHeight());
	                y += this.getHeaderHeight();
	            }
	            if (this.isEnableTabStrip()) {
	                this._tabHeaderRect = new _Rect2.default(rect.x, rect.y + y, rect.width, this.getTabStripHeight());
	                y += this.getTabStripHeight();
	            }
	            this._contentRect = new _Rect2.default(rect.x, rect.y + y, rect.width, rect.height - y);
	
	            this._children.forEach(function (child, i) {
	                child._layout(_this2._contentRect);
	                child._setVisible(i === _this2.getSelected());
	            });
	        }
	    }, {
	        key: "_remove",
	        value: function _remove(node) {
	            this._removeChild(node);
	            this._model._tidy();
	            this._setSelected(Math.max(0, this.getSelected() - 1));
	        }
	    }, {
	        key: "_drop",
	        value: function _drop(dragNode, location, index) {
	            var _this3 = this;
	
	            var dockLocation = location;
	
	            if (this === dragNode) {
	                // tabset drop into itself
	                return; // dock back to itself
	            }
	
	            var selectedNode = null;
	            var fromIndex = 0;
	            if (dragNode._parent != null) {
	                selectedNode = dragNode._parent.getSelectedNode;
	                fromIndex = dragNode._parent._removeChild(dragNode);
	            }
	            //console.log("removed child: " + fromIndex);
	
	            // if dropping a tab back to same tabset and moving to forward position then reduce insertion index
	            if (dragNode.getType() === _TabNode2.default.TYPE && dragNode._parent === this && fromIndex < index && index > 0) {
	                index--;
	            }
	
	            // for the tabset/border being removed from set the selected index
	            if (dragNode._parent !== null) {
	                if (dragNode._parent.getType() === TabSetNode.TYPE) {
	                    dragNode._parent._setSelected(0);
	                } else if (dragNode._parent.getType() === _BorderNode2.default.TYPE) {
	                    if (dragNode._parent.getSelected() != -1) {
	                        if (fromIndex === dragNode._parent.getSelected() && dragNode._parent._children.length > 0) {
	                            dragNode._parent._setSelected(0);
	                        } else if (fromIndex < dragNode._parent.getSelected()) {
	                            dragNode._parent._setSelected(dragNode._parent.getSelected() - 1);
	                        } else if (fromIndex > dragNode._parent.getSelected()) {
	                            // leave selected index as is
	                        } else {
	                            dragNode._parent._setSelected(-1);
	                        }
	                    }
	                }
	            }
	
	            // simple_bundled dock to existing tabset
	            if (dockLocation === _DockLocation2.default.CENTER) {
	                var insertPos = index;
	                if (insertPos === -1) {
	                    insertPos = this._children.length;
	                }
	
	                if (dragNode.getType() === _TabNode2.default.TYPE) {
	                    this._addChild(dragNode, insertPos);
	                    this._setSelected(insertPos);
	                    //console.log("added child at : " + insertPos);
	                } else {
	                    dragNode._children.forEach(function (child, i) {
	                        _this3._addChild(child, insertPos);
	                        //console.log("added child at : " + insertPos);
	                        insertPos++;
	                    });
	                }
	                this._model._activeTabSet = this;
	            } else {
	                var tabSet = null;
	                if (dragNode.getType() === _TabNode2.default.TYPE) {
	                    // create new tabset parent
	                    //console.log("create a new tabset");
	                    tabSet = new TabSetNode(this._model, {});
	                    tabSet._addChild(dragNode);
	                    //console.log("added child at end");
	                    dragNode._parent = tabSet;
	                } else {
	                    tabSet = dragNode;
	                }
	
	                var parentRow = this._parent;
	                var pos = parentRow._children.indexOf(this);
	
	                if (parentRow.getOrientation() === dockLocation._orientation) {
	                    tabSet._setWeight(this.getWeight() / 2);
	                    this._setWeight(this.getWeight() / 2);
	                    //console.log("added child 50% size at: " +  pos + dockLocation.indexPlus);
	                    parentRow._addChild(tabSet, pos + dockLocation._indexPlus);
	                } else {
	                    // create a new row to host the new tabset (it will go in the opposite direction)
	                    //console.log("create a new row");
	                    var newRow = new _RowNode2.default(this._model, {});
	                    newRow._setWeight(this.getWeight());
	                    newRow._addChild(this);
	                    this._setWeight(50);
	                    tabSet._setWeight(50);
	                    //console.log("added child 50% size at: " +  dockLocation.indexPlus);
	                    newRow._addChild(tabSet, dockLocation._indexPlus);
	
	                    parentRow._removeChild(this);
	                    parentRow._addChild(newRow, pos);
	                }
	                this._model._activeTabSet = tabSet;
	            }
	            this._model._tidy();
	        }
	    }, {
	        key: "_toJson",
	        value: function _toJson() {
	            var json = {};
	            attributeDefinitions.toJson(json, this._attributes);
	            json.children = this._children.map(function (child) {
	                return child._toJson();
	            });
	
	            if (this.isActive()) {
	                json.active = true;
	            }
	
	            if (this.isMaximized()) {
	                json.maximized = true;
	            }
	
	            return json;
	        }
	    }, {
	        key: "_updateAttrs",
	        value: function _updateAttrs(json) {
	            attributeDefinitions.update(json, this._attributes);
	        }
	    }, {
	        key: "_getAttributeDefinitions",
	        value: function _getAttributeDefinitions() {
	            return attributeDefinitions;
	        }
	    }], [{
	        key: "_fromJson",
	        value: function _fromJson(json, model) {
	            var newLayoutNode = new TabSetNode(model, json);
	
	            if (json.children != undefined) {
	                json.children.forEach(function (jsonChild) {
	                    var child = _TabNode2.default._fromJson(jsonChild, model);
	                    newLayoutNode._addChild(child);
	                });
	            }
	
	            if (json.maximized && json.maximized == true) {
	                model._setMaximizedTabset(newLayoutNode);
	            }
	
	            if (json.active && json.active == true) {
	                model._setActiveTabset(newLayoutNode);
	            }
	
	            return newLayoutNode;
	        }
	    }]);
	
	    return TabSetNode;
	}(_Node3.default);
	
	TabSetNode.TYPE = "tabset";
	
	var attributeDefinitions = new _AttributeDefinitions2.default();
	attributeDefinitions.add("type", TabSetNode.TYPE, true);
	attributeDefinitions.add("id", null).setType(_Attribute2.default.ID);
	
	attributeDefinitions.add("weight", 100);
	attributeDefinitions.add("width", null);
	attributeDefinitions.add("height", null);
	attributeDefinitions.add("selected", 0);
	attributeDefinitions.add("name", null).setType(_Attribute2.default.STRING);
	
	attributeDefinitions.addInherited("enableDeleteWhenEmpty", "tabSetEnableDeleteWhenEmpty");
	attributeDefinitions.addInherited("enableClose", "tabSetEnableClose");
	attributeDefinitions.addInherited("enableDrop", "tabSetEnableDrop");
	attributeDefinitions.addInherited("enableDrag", "tabSetEnableDrag");
	attributeDefinitions.addInherited("enableDivide", "tabSetEnableDivide");
	attributeDefinitions.addInherited("enableMaximize", "tabSetEnableMaximize");
	attributeDefinitions.addInherited("classNameTabStrip", "tabSetClassNameTabStrip");
	attributeDefinitions.addInherited("classNameHeader", "tabSetClassNameHeader");
	attributeDefinitions.addInherited("enableTabStrip", "tabSetEnableTabStrip");
	
	attributeDefinitions.addInherited("headerHeight", "tabSetHeaderHeight");
	attributeDefinitions.addInherited("tabStripHeight", "tabSetTabStripHeight");
	
	exports.default = TabSetNode;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _AttributeDefinitions = __webpack_require__(193);
	
	var _AttributeDefinitions2 = _interopRequireDefault(_AttributeDefinitions);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	var _SplitterNode = __webpack_require__(201);
	
	var _SplitterNode2 = _interopRequireDefault(_SplitterNode);
	
	var _Node2 = __webpack_require__(197);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	var _TabSetNode = __webpack_require__(199);
	
	var _TabSetNode2 = _interopRequireDefault(_TabSetNode);
	
	var _BorderNode = __webpack_require__(192);
	
	var _BorderNode2 = _interopRequireDefault(_BorderNode);
	
	var _DropInfo = __webpack_require__(196);
	
	var _DropInfo2 = _interopRequireDefault(_DropInfo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RowNode = function (_Node) {
	    _inherits(RowNode, _Node);
	
	    function RowNode(model, json) {
	        _classCallCheck(this, RowNode);
	
	        var _this = _possibleConstructorReturn(this, (RowNode.__proto__ || Object.getPrototypeOf(RowNode)).call(this, model));
	
	        _this._dirty = true;
	        _this._drawChildren = [];
	        attributeDefinitions.fromJson(json, _this._attributes);
	        model._addNode(_this);
	        return _this;
	    }
	
	    _createClass(RowNode, [{
	        key: "getWeight",
	        value: function getWeight() {
	            return this._attributes["weight"];
	        }
	    }, {
	        key: "getWidth",
	        value: function getWidth() {
	            return this._attributes["width"];
	        }
	    }, {
	        key: "getHeight",
	        value: function getHeight() {
	            return this._attributes["height"];
	        }
	    }, {
	        key: "_setWeight",
	        value: function _setWeight(weight) {
	            this._attributes["weight"] = weight;
	        }
	    }, {
	        key: "_layout",
	        value: function _layout(rect) {
	            _get(RowNode.prototype.__proto__ || Object.getPrototypeOf(RowNode.prototype), "_layout", this).call(this, rect);
	
	            var pixelSize = this._rect._getSize(this.getOrientation());
	
	            var totalWeight = 0;
	            var fixedPixels = 0;
	            var prefPixels = 0;
	            var numVariable = 0;
	            var totalPrefWeight = 0;
	            var drawChildren = this._getDrawChildren();
	
	            for (var i = 0; i < drawChildren.length; i++) {
	                var child = drawChildren[i];
	                var prefSize = child._getPrefSize(this.getOrientation());
	                if (child._fixed) {
	                    fixedPixels += prefSize;
	                } else {
	                    if (prefSize == null) {
	                        totalWeight += child.getWeight();
	                    } else {
	                        prefPixels += prefSize;
	                        totalPrefWeight += child.getWeight();
	                    }
	                    numVariable++;
	                }
	            }
	
	            var resizePreferred = false;
	            var availablePixels = pixelSize - fixedPixels - prefPixels;
	            if (availablePixels < 0) {
	                availablePixels = pixelSize - fixedPixels;
	                resizePreferred = true;
	                totalWeight += totalPrefWeight;
	            }
	
	            // assign actual pixel sizes
	            var totalSizeGiven = 0;
	            var variableSize = 0;
	            for (var _i = 0; _i < drawChildren.length; _i++) {
	                var _child = drawChildren[_i];
	                var _prefSize = _child._getPrefSize(this.getOrientation());
	                if (_child._fixed) {
	                    _child.tempsize = _prefSize;
	                } else {
	                    if (_prefSize == null || resizePreferred) {
	                        if (totalWeight === 0) {
	                            _child.tempsize = 0;
	                        } else {
	                            _child.tempsize = Math.floor(availablePixels * (_child.getWeight() / totalWeight));
	                        }
	                        variableSize += _child.tempsize;
	                    } else {
	                        _child.tempsize = _prefSize;
	                    }
	                }
	
	                totalSizeGiven += _child.tempsize;
	            }
	
	            // adjust sizes to exactly fit
	            if (variableSize > 0) {
	                while (totalSizeGiven < pixelSize) {
	                    for (var _i2 = 0; _i2 < drawChildren.length; _i2++) {
	                        var _child2 = drawChildren[_i2];
	                        var _prefSize2 = _child2._getPrefSize(this.getOrientation());
	                        if (!_child2._fixed && (_prefSize2 == null || resizePreferred) && totalSizeGiven < pixelSize) {
	                            _child2.tempsize++;
	                            totalSizeGiven++;
	                        }
	                    }
	                }
	            }
	
	            var childOrientation = _Orientation2.default.flip(this.getOrientation());
	
	            // layout children
	            var p = 0;
	            for (var _i3 = 0; _i3 < drawChildren.length; _i3++) {
	                var _child3 = drawChildren[_i3];
	
	                if (this.getOrientation() === _Orientation2.default.HORZ) {
	                    _child3._layout(new _Rect2.default(this._rect.x + p, this._rect.y, _child3.tempsize, this._rect.height));
	                } else {
	                    _child3._layout(new _Rect2.default(this._rect.x, this._rect.y + p, this._rect.width, _child3.tempsize));
	                }
	                p += _child3.tempsize;
	            }
	
	            return true;
	        }
	    }, {
	        key: "_getSplitterBounds",
	        value: function _getSplitterBounds(splitterNode) {
	            var pBounds = [0, 0];
	            var drawChildren = this._getDrawChildren();
	            var p = drawChildren.indexOf(splitterNode);
	            if (this.getOrientation() === _Orientation2.default.HORZ) {
	                pBounds[0] = drawChildren[p - 1]._rect.x;
	                pBounds[1] = drawChildren[p + 1]._rect.getRight() - splitterNode.getWidth();
	            } else {
	                pBounds[0] = drawChildren[p - 1]._rect.y;
	                pBounds[1] = drawChildren[p + 1]._rect.getBottom() - splitterNode.getHeight();
	            }
	            return pBounds;
	        }
	    }, {
	        key: "_calculateSplit",
	        value: function _calculateSplit(splitter, splitterPos) {
	            var rtn = null;
	            var drawChildren = this._getDrawChildren();
	            var p = drawChildren.indexOf(splitter);
	            var pBounds = this._getSplitterBounds(splitter);
	
	            var weightedLength = drawChildren[p - 1].getWeight() + drawChildren[p + 1].getWeight();
	
	            var pixelWidth1 = Math.max(0, splitterPos - pBounds[0]);
	            var pixelWidth2 = Math.max(0, pBounds[1] - splitterPos);
	
	            if (pixelWidth1 + pixelWidth2 > 0) {
	                var weight1 = pixelWidth1 * weightedLength / (pixelWidth1 + pixelWidth2);
	                var weight2 = pixelWidth2 * weightedLength / (pixelWidth1 + pixelWidth2);
	
	                rtn = {
	                    node1: drawChildren[p - 1].getId(), weight1: weight1, pixelWidth1: pixelWidth1,
	                    node2: drawChildren[p + 1].getId(), weight2: weight2, pixelWidth2: pixelWidth2
	                };
	            }
	
	            return rtn;
	        }
	    }, {
	        key: "_getDrawChildren",
	        value: function _getDrawChildren() {
	            if (this._dirty) {
	                this._drawChildren = [];
	
	                for (var i = 0; i < this._children.length; i++) {
	                    var child = this._children[i];
	                    if (i !== 0) {
	                        var newSplitter = new _SplitterNode2.default(this._model);
	                        newSplitter._parent = this;
	                        this._drawChildren.push(newSplitter);
	                    }
	                    this._drawChildren.push(child);
	                }
	                this._dirty = false;
	            }
	
	            return this._drawChildren;
	        }
	    }, {
	        key: "_tidy",
	        value: function _tidy() {
	            //console.log("a", this._model.toString());
	            var i = 0;
	            while (i < this._children.length) {
	                var child = this._children[i];
	                if (child.getType() === RowNode.TYPE) {
	                    child._tidy();
	
	                    if (child._children.length === 0) {
	                        this._removeChild(child);
	                    } else if (child._children.length === 1) {
	                        // hoist child/children up to this level
	                        var subchild = child._children[0];
	                        this._removeChild(child);
	                        if (subchild.getType() === RowNode.TYPE) {
	                            var subChildrenTotal = 0;
	                            for (var j = 0; j < subchild._children.length; j++) {
	                                var subsubChild = subchild._children[j];
	                                subChildrenTotal += subsubChild.getWeight();
	                            }
	                            for (var _j = 0; _j < subchild._children.length; _j++) {
	                                var _subsubChild = subchild._children[_j];
	                                _subsubChild._setWeight(child.getWeight() * _subsubChild.getWeight() / subChildrenTotal);
	                                this._addChild(_subsubChild, i + _j);
	                            }
	                        } else {
	                            subchild._setWeight(child.getWeight());
	                            this._addChild(subchild, i);
	                        }
	                    } else {
	                        i++;
	                    }
	                } else if (child.getType() === _TabSetNode2.default.TYPE && child._children.length === 0) {
	                    if (child.isEnableDeleteWhenEmpty()) {
	                        this._removeChild(child);
	                    } else {
	                        i++;
	                    }
	                } else {
	                    i++;
	                }
	            }
	
	            // add tabset into empty root
	            if (this == this._model.getRoot() && this._children.length == 0) {
	                var _child4 = new _TabSetNode2.default(this._model, { type: "tabset" });
	                this._addChild(_child4);
	            }
	
	            //console.log("b", this._model.toString());
	        }
	    }, {
	        key: "_canDrop",
	        value: function _canDrop(dragNode, x, y) {
	            var yy = y - this._rect.y;
	            var xx = x - this._rect.x;
	            var w = this._rect.width;
	            var h = this._rect.height;
	            var margin = 10; // height of edge rect
	            var half = 50; // half width of edge rect
	            var dropInfo = null;
	
	            if (this._model.isEnableEdgeDock() && this._parent == null) {
	                // _root row
	                if (x < this._rect.x + margin && yy > h / 2 - half && yy < h / 2 + half) {
	                    var dockLocation = _DockLocation2.default.LEFT;
	                    var outlineRect = dockLocation.getDockRect(this._rect);
	                    outlineRect.width = outlineRect.width / 2;
	                    dropInfo = new _DropInfo2.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect_edge");
	                } else if (x > this._rect.getRight() - margin && yy > h / 2 - half && yy < h / 2 + half) {
	                    var _dockLocation = _DockLocation2.default.RIGHT;
	                    var _outlineRect = _dockLocation.getDockRect(this._rect);
	                    _outlineRect.width = _outlineRect.width / 2;
	                    _outlineRect.x += _outlineRect.width;
	                    dropInfo = new _DropInfo2.default(this, _outlineRect, _dockLocation, -1, "flexlayout__outline_rect_edge");
	                } else if (y < this._rect.y + margin && xx > w / 2 - half && xx < w / 2 + half) {
	                    var _dockLocation2 = _DockLocation2.default.TOP;
	                    var _outlineRect2 = _dockLocation2.getDockRect(this._rect);
	                    _outlineRect2.height = _outlineRect2.height / 2;
	                    dropInfo = new _DropInfo2.default(this, _outlineRect2, _dockLocation2, -1, "flexlayout__outline_rect_edge");
	                } else if (y > this._rect.getBottom() - margin && xx > w / 2 - half && xx < w / 2 + half) {
	                    var _dockLocation3 = _DockLocation2.default.BOTTOM;
	                    var _outlineRect3 = _dockLocation3.getDockRect(this._rect);
	                    _outlineRect3.height = _outlineRect3.height / 2;
	                    _outlineRect3.y += _outlineRect3.height;
	                    dropInfo = new _DropInfo2.default(this, _outlineRect3, _dockLocation3, -1, "flexlayout__outline_rect_edge");
	                }
	
	                if (dropInfo != null) {
	                    if (!dragNode._canDockInto(dragNode, dropInfo)) {
	                        return null;
	                    }
	                }
	            }
	
	            return dropInfo;
	        }
	    }, {
	        key: "_drop",
	        value: function _drop(dragNode, location, index) {
	            var dockLocation = location;
	
	            if (dragNode._parent) {
	                dragNode._parent._removeChild(dragNode);
	            }
	
	            if (dragNode._parent !== null && dragNode._parent.getType() === _TabSetNode2.default.TYPE) {
	                dragNode._parent._setSelected(0);
	            }
	
	            if (dragNode._parent !== null && dragNode._parent.getType() === _BorderNode2.default.TYPE) {
	                dragNode._parent._setSelected(-1);
	            }
	
	            var tabSet = null;
	            if (dragNode.getType() === _TabSetNode2.default.TYPE) {
	                tabSet = dragNode;
	            } else {
	                tabSet = new _TabSetNode2.default(this._model, {});
	                tabSet._addChild(dragNode);
	            }
	            var size = this._children.reduce(function (sum, child) {
	                return sum + child.getWeight();
	            }, 0);
	
	            if (size === 0) {
	                size = 100;
	            }
	
	            tabSet._setWeight(size / 3);
	
	            if (dockLocation === _DockLocation2.default.LEFT) {
	                this._addChild(tabSet, 0);
	            } else if (dockLocation === _DockLocation2.default.RIGHT) {
	                this._addChild(tabSet);
	            } else if (dockLocation === _DockLocation2.default.TOP) {
	                var vrow = new RowNode(this._model, {});
	                var hrow = new RowNode(this._model, {});
	                hrow._setWeight(75);
	                tabSet._setWeight(25);
	                this._children.forEach(function (child) {
	                    hrow._addChild(child);
	                });
	                this._removeAll();
	                vrow._addChild(tabSet);
	                vrow._addChild(hrow);
	                this._addChild(vrow);
	            } else if (dockLocation === _DockLocation2.default.BOTTOM) {
	                var _vrow = new RowNode(this._model, {});
	                var _hrow = new RowNode(this._model, {});
	                _hrow._setWeight(75);
	                tabSet._setWeight(25);
	                this._children.forEach(function (child) {
	                    _hrow._addChild(child);
	                });
	                this._removeAll();
	                _vrow._addChild(_hrow);
	                _vrow._addChild(tabSet);
	                this._addChild(_vrow);
	            }
	
	            this._model._activeTabSet = tabSet;
	
	            this._model._tidy();
	        }
	    }, {
	        key: "_toJson",
	        value: function _toJson() {
	            var json = {};
	            attributeDefinitions.toJson(json, this._attributes);
	
	            json.children = [];
	            this._children.forEach(function (child) {
	                json.children.push(child._toJson());
	            });
	
	            return json;
	        }
	    }, {
	        key: "_getAttributeDefinitions",
	        value: function _getAttributeDefinitions() {
	            return attributeDefinitions;
	        }
	    }], [{
	        key: "_fromJson",
	        value: function _fromJson(json, model) {
	            var newLayoutNode = new RowNode(model, json);
	
	            if (json.children != undefined) {
	                for (var i = 0; i < json.children.length; i++) {
	                    var jsonChild = json.children[i];
	                    if (jsonChild.type === _TabSetNode2.default.TYPE) {
	                        var child = _TabSetNode2.default._fromJson(jsonChild, model);
	                        newLayoutNode._addChild(child);
	                    } else {
	                        var _child5 = RowNode._fromJson(jsonChild, model);
	                        newLayoutNode._addChild(_child5);
	                    }
	                }
	            }
	
	            return newLayoutNode;
	        }
	    }]);
	
	    return RowNode;
	}(_Node3.default);
	
	RowNode.TYPE = "row";
	
	var attributeDefinitions = new _AttributeDefinitions2.default();
	attributeDefinitions.add("type", RowNode.TYPE, true);
	attributeDefinitions.add("id", null);
	
	attributeDefinitions.add("weight", 100);
	attributeDefinitions.add("width", null);
	attributeDefinitions.add("height", null);
	
	exports.default = RowNode;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Node2 = __webpack_require__(197);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SplitterNode = function (_Node) {
	    _inherits(SplitterNode, _Node);
	
	    function SplitterNode(model) {
	        _classCallCheck(this, SplitterNode);
	
	        var _this = _possibleConstructorReturn(this, (SplitterNode.__proto__ || Object.getPrototypeOf(SplitterNode)).call(this, model));
	
	        _this._fixed = true;
	        _this._attributes["type"] = SplitterNode.TYPE;
	        model._addNode(_this);
	        return _this;
	    }
	
	    _createClass(SplitterNode, [{
	        key: "getWidth",
	        value: function getWidth() {
	            return this._model.getSplitterSize();
	        }
	    }, {
	        key: "getHeight",
	        value: function getHeight() {
	            return this._model.getSplitterSize();
	        }
	    }]);
	
	    return SplitterNode;
	}(_Node3.default);
	
	SplitterNode.TYPE = "splitter";
	
	exports.default = SplitterNode;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * The Action creator class for FlexLayout model actions
	 */
	var Actions = function () {
	    function Actions() {
	        _classCallCheck(this, Actions);
	    }
	
	    _createClass(Actions, null, [{
	        key: "addNode",
	
	
	        /**
	         * Adds a tab node to the given tabset node
	         * @param json the json for the new tab node e.g {type:"tab", component:"table"}
	         * @param toNodeId the new tab node will be added to the tabset with this node id
	         * @param location the location where the new tab will be added, one of the DockLocation enum values.
	         * @param index for docking to the center this value is the index of the tab, use -1 to add to the end.
	         * @returns {{type: (string|string), json: *, toNode: *, location: (*|string), index: *}}
	         */
	        value: function addNode(json, toNodeId, location, index) {
	            return { type: Actions.ADD_NODE, json: json, toNode: toNodeId, location: location.getName(), index: index };
	        }
	
	        /**
	         * Moves a node (tab or tabset) from one location to another
	         * @param fromNodeId the id of the node to move
	         * @param toNodeId the id of the node to receive the moved node
	         * @param location the location where the moved node will be added, one of the DockLocation enum values.
	         * @param index for docking to the center this value is the index of the tab, use -1 to add to the end.
	         * @returns {{type: (string|string), fromNode: *, toNode: *, location: (*|string), index: *}}
	         */
	
	    }, {
	        key: "moveNode",
	        value: function moveNode(fromNodeId, toNodeId, location, index) {
	            return {
	                type: Actions.MOVE_NODE,
	                fromNode: fromNodeId,
	                toNode: toNodeId,
	                location: location.getName(),
	                index: index
	            };
	        }
	
	        /**
	         * Deletes a tab node from the layout
	         * @param tabNodeId the id of the node to delete
	         * @returns {{type: (string|string), node: *}}
	         */
	
	    }, {
	        key: "deleteTab",
	        value: function deleteTab(tabNodeId) {
	            return { type: Actions.DELETE_TAB, node: tabNodeId };
	        }
	
	        /**
	         * Change the given nodes tab text
	         * @param tabNodeId the id of the node to rename
	         * @param text the test of the tab
	         * @returns {{type: (string|string), node: *, text: *}}
	         */
	
	    }, {
	        key: "renameTab",
	        value: function renameTab(tabNodeId, text) {
	            return { type: Actions.RENAME_TAB, node: tabNodeId, text: text };
	        }
	
	        /**
	         * Selects the given tab in its parent tabset
	         * @param tabNodeId the id of the node to set selected
	         * @returns {{type: (string|string), tabNode: *}}
	         */
	
	    }, {
	        key: "selectTab",
	        value: function selectTab(tabNodeId) {
	            return { type: Actions.SELECT_TAB, tabNode: tabNodeId };
	        }
	
	        /**
	         * Set the given tabset node as the active tabset
	         * @param tabsetNodeId the id of the tabset node to set as active
	         * @returns {{type: (string|string), tabsetNode: *}}
	         */
	
	    }, {
	        key: "setActiveTabset",
	        value: function setActiveTabset(tabsetNodeId) {
	            return { type: Actions.SET_ACTIVE_TABSET, tabsetNode: tabsetNodeId };
	        }
	
	        /**
	         * Adjust the splitter between two tabsets
	         * @example
	         *  Actions.adjustSplit({node1: "1", weight1:30, pixelWidth1:300, node2: "2", weight2:70, pixelWidth2:700});
	         *
	         * @param splitSpec an object the defines the new split between two tabsets, see example below.
	         * @returns {{type: (string|string), node1: *, weight1: *, pixelWidth1: *, node2: *, weight2: *, pixelWidth2: *}}
	         */
	
	    }, {
	        key: "adjustSplit",
	        value: function adjustSplit(splitSpec) {
	            var node1 = splitSpec.node1;
	            var node2 = splitSpec.node2;
	
	            return {
	                type: Actions.ADJUST_SPLIT,
	                node1: node1, weight1: splitSpec.weight1, pixelWidth1: splitSpec.pixelWidth1,
	                node2: node2, weight2: splitSpec.weight2, pixelWidth2: splitSpec.pixelWidth2
	            };
	        }
	    }, {
	        key: "adjustBorderSplit",
	        value: function adjustBorderSplit(nodeId, pos) {
	            return { type: Actions.ADJUST_BORDER_SPLIT, node: nodeId, pos: pos };
	        }
	
	        /**
	         * Maximizes the given tabset
	         * @param tabsetNodeId the id of the tabset to maximize
	         * @returns {{type: (string|string), node: *}}
	         */
	
	    }, {
	        key: "maximizeToggle",
	        value: function maximizeToggle(tabsetNodeId) {
	            return { type: Actions.MAXIMIZE_TOGGLE, node: tabsetNodeId };
	        }
	
	        /**
	         * Updates the global model jsone attributes
	         * @param attributes the json for the model attributes to update (merge into the existing attributes)
	         * @returns {{type: (string|string), json: *}}
	         */
	
	    }, {
	        key: "updateModelAttributes",
	        value: function updateModelAttributes(attributes) {
	            return { type: Actions.UPDATE_MODEL_ATTRIBUTES, json: attributes };
	        }
	
	        /**
	         * Updates the given nodes json attributes
	         * @param nodeId the id of the node to update
	         * @param attributes the json attributes to update (merge with the existing attributes)
	         * @returns {{type: (string|string), node: *, json: *}}
	         */
	
	    }, {
	        key: "updateNodeAttributes",
	        value: function updateNodeAttributes(nodeId, attributes) {
	            return { type: Actions.UPDATE_NODE_ATTRIBUTES, node: nodeId, json: attributes };
	        }
	    }]);
	
	    return Actions;
	}();
	
	Actions.ADD_NODE = "FlexLayout_AddNode";
	Actions.MOVE_NODE = "FlexLayout_MoveNode";
	Actions.DELETE_TAB = "FlexLayout_DeleteTab";
	Actions.RENAME_TAB = "FlexLayout_RenameTab";
	Actions.SELECT_TAB = "FlexLayout_SelectTab";
	Actions.SET_ACTIVE_TABSET = "FlexLayout_SetActiveTabset";
	Actions.ADJUST_SPLIT = "FlexLayout_AdjustSplit";
	Actions.ADJUST_BORDER_SPLIT = "FlexLayout_AdjustBorderSplit";
	Actions.MAXIMIZE_TOGGLE = "FlexLayout_MaximizeToggle";
	Actions.UPDATE_MODEL_ATTRIBUTES = "FlexLayout_UpdateModelAttributes";
	Actions.UPDATE_NODE_ATTRIBUTES = "FlexLayout_UpdateNodeAttributes";
	
	exports.default = Actions;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _TabSetNode = __webpack_require__(199);
	
	var _TabSetNode2 = _interopRequireDefault(_TabSetNode);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tab = function (_React$Component) {
	    _inherits(Tab, _React$Component);
	
	    function Tab(props) {
	        _classCallCheck(this, Tab);
	
	        var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));
	
	        _this.state = { renderComponent: props.selected };
	        return _this;
	    }
	
	    _createClass(Tab, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            //console.log("mount " + this.props.node.getName());
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            //console.log("unmount " + this.props.node.getName());
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(newProps) {
	            if (!this.state.renderComponent && newProps.selected) {
	                // load on demand
	                //console.log("load on demand: " + this.props.node.getName());
	                this.setState({ renderComponent: true });
	            }
	        }
	    }, {
	        key: "onMouseDown",
	        value: function onMouseDown(event) {
	            var parent = this.props.node.getParent();
	            if (parent.getType() == _TabSetNode2.default.TYPE) {
	                if (!parent.isActive()) {
	                    this.props.layout.doAction(_Actions2.default.setActiveTabset(parent.getId()));
	                }
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var node = this.props.node;
	            var style = node._styleWithPosition({
	                display: this.props.selected ? "block" : "none"
	            });
	
	            if (this.props.node.getParent().isMaximized()) {
	                style.zIndex = 100;
	            }
	
	            var child = null;
	            if (this.state.renderComponent) {
	                child = this.props.factory(node);
	            }
	
	            return _react2.default.createElement(
	                "div",
	                { className: "flexlayout__tab",
	                    onMouseDown: this.onMouseDown.bind(this),
	                    onTouchStart: this.onMouseDown.bind(this),
	                    style: style },
	                child
	            );
	        }
	    }]);
	
	    return Tab;
	}(_react2.default.Component);
	
	exports.default = Tab;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _PopupMenu = __webpack_require__(205);
	
	var _PopupMenu2 = _interopRequireDefault(_PopupMenu);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	var _TabButton = __webpack_require__(206);
	
	var _TabButton2 = _interopRequireDefault(_TabButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TabSet = function (_React$Component) {
	    _inherits(TabSet, _React$Component);
	
	    function TabSet(props) {
	        _classCallCheck(this, TabSet);
	
	        var _this = _possibleConstructorReturn(this, (TabSet.__proto__ || Object.getPrototypeOf(TabSet)).call(this, props));
	
	        _this.recalcVisibleTabs = true;
	        _this.showOverflow = false;
	        _this.showToolbar = true;
	        _this.state = { hideTabsAfter: 999 };
	        return _this;
	    }
	
	    _createClass(TabSet, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.updateVisibleTabs();
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate() {
	            this.updateVisibleTabs();
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            this.showToolbar = true;
	            this.showOverflow = false;
	            this.recalcVisibleTabs = true;
	            this.setState({ hideTabsAfter: 999 });
	        }
	    }, {
	        key: "updateVisibleTabs",
	        value: function updateVisibleTabs() {
	            var node = this.props.node;
	
	            if (node.isEnableTabStrip() && this.recalcVisibleTabs) {
	                var toolbarWidth = this.refs.toolbar.getBoundingClientRect().width;
	                var hideTabsAfter = 999;
	                for (var i = 0; i < node.getChildren().length; i++) {
	                    var child = node.getChildren()[i];
	                    if (child.getTabRect().getRight() > node.getRect().getRight() - (20 + toolbarWidth)) {
	                        hideTabsAfter = Math.max(0, i - 1);
	                        //console.log("tabs truncated to:" + hideTabsAfter);
	                        this.showOverflow = node.getChildren().length > 1;
	
	                        if (i === 0) {
	                            this.showToolbar = false;
	                            if (child.getTabRect().getRight() > node.getRect().getRight() - 20) {
	                                this.showOverflow = false;
	                            }
	                        }
	
	                        break;
	                    }
	                }
	                if (this.state.hideTabsAfter !== hideTabsAfter) {
	                    this.setState({ hideTabsAfter: hideTabsAfter });
	                }
	                this.recalcVisibleTabs = false;
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var node = this.props.node;
	            var style = node._styleWithPosition();
	
	            if (this.props.node.isMaximized()) {
	                style.zIndex = 100;
	            }
	
	            var tabs = [];
	            var hiddenTabs = [];
	            if (node.isEnableTabStrip()) {
	                for (var i = 0; i < node.getChildren().length; i++) {
	                    var isSelected = this.props.node.getSelected() === i;
	                    var showTab = this.state.hideTabsAfter >= i;
	
	                    var child = node.getChildren()[i];
	
	                    if (this.state.hideTabsAfter === i && this.props.node.getSelected() > this.state.hideTabsAfter) {
	                        hiddenTabs.push({ name: child.getName(), node: child, index: i });
	                        child = node.getChildren()[this.props.node.getSelected()];
	                        isSelected = true;
	                    } else if (!showTab && !isSelected) {
	                        hiddenTabs.push({ name: child.getName(), node: child, index: i });
	                    }
	                    if (showTab) {
	                        tabs.push(_react2.default.createElement(_TabButton2.default, { layout: this.props.layout,
	                            node: child,
	                            key: child.getId(),
	                            selected: isSelected,
	                            show: showTab,
	                            height: node.getTabStripHeight(),
	                            pos: i }));
	                    }
	                }
	            }
	            //tabs.forEach(c => console.log(c.key));
	
	            var buttons = [];
	
	            // allow customization of header contents and buttons
	            var renderState = { headerContent: node.getName(), buttons: buttons };
	            this.props.layout.customizeTabSet(this.props.node, renderState);
	            var headerContent = renderState.headerContent;
	            buttons = renderState.buttons;
	
	            var toolbar = null;
	            if (this.showToolbar === true) {
	                if (this.props.node.isEnableMaximize()) {
	                    buttons.push(_react2.default.createElement("button", { key: "max",
	                        className: "flexlayout__tab_toolbar_button-" + (node.isMaximized() ? "max" : "min"),
	                        onClick: this.onMaximizeToggle.bind(this) }));
	                }
	                toolbar = _react2.default.createElement(
	                    "div",
	                    { key: "toolbar", ref: "toolbar", className: "flexlayout__tab_toolbar",
	                        onMouseDown: this.onInterceptMouseDown.bind(this) },
	                    buttons
	                );
	            }
	
	            if (this.showOverflow === true) {
	                tabs.push(_react2.default.createElement(
	                    "button",
	                    { key: "overflowbutton", ref: "overflowbutton", className: "flexlayout__tab_button_overflow",
	                        onClick: this.onOverflowClick.bind(this, hiddenTabs),
	                        onMouseDown: this.onInterceptMouseDown.bind(this)
	                    },
	                    hiddenTabs.length
	                ));
	            }
	
	            var showHeader = node.getName() != null;
	            var header = null;
	            var tabStrip = null;
	
	            var tabStripClasses = "flexlayout__tab_header_outer";
	            if (this.props.node.getClassNameTabStrip() != null) {
	                tabStripClasses += " " + this.props.node.getClassNameTabStrip();
	            }
	            if (node.isActive() && !showHeader) {
	                tabStripClasses += " flexlayout__tabset-selected";
	            }
	
	            if (node.isMaximized() && !showHeader) {
	                tabStripClasses += " flexlayout__tabset-maximized";
	            }
	
	            if (showHeader) {
	                var tabHeaderClasses = "flexlayout__tabset_header";
	                if (node.isActive()) {
	                    tabHeaderClasses += " flexlayout__tabset-selected";
	                }
	                if (node.isMaximized()) {
	                    tabHeaderClasses += " flexlayout__tabset-maximized";
	                }
	                if (this.props.node.getClassNameHeader() != null) {
	                    tabHeaderClasses += " " + this.props.node.getClassNameHeader();
	                }
	
	                header = _react2.default.createElement(
	                    "div",
	                    { className: tabHeaderClasses,
	                        style: { height: node.getHeaderHeight() + "px" },
	                        onMouseDown: this.onMouseDown.bind(this),
	                        onTouchStart: this.onMouseDown.bind(this) },
	                    headerContent,
	                    toolbar
	                );
	                tabStrip = _react2.default.createElement(
	                    "div",
	                    { className: tabStripClasses,
	                        style: { height: node.getTabStripHeight() + "px", top: node.getHeaderHeight() + "px" } },
	                    _react2.default.createElement(
	                        "div",
	                        { ref: "header", className: "flexlayout__tab_header_inner" },
	                        tabs
	                    )
	                );
	            } else {
	                tabStrip = _react2.default.createElement(
	                    "div",
	                    { className: tabStripClasses, style: { top: "0px", height: node.getTabStripHeight() + "px" },
	                        onMouseDown: this.onMouseDown.bind(this),
	                        onTouchStart: this.onMouseDown.bind(this) },
	                    _react2.default.createElement(
	                        "div",
	                        { ref: "header", className: "flexlayout__tab_header_inner" },
	                        tabs
	                    ),
	                    toolbar
	                );
	            }
	
	            return _react2.default.createElement(
	                "div",
	                { style: style, className: "flexlayout__tabset" },
	                header,
	                tabStrip
	            );
	        }
	    }, {
	        key: "onOverflowClick",
	        value: function onOverflowClick(hiddenTabs, event) {
	            //console.log("hidden tabs: " + hiddenTabs);
	            var element = this.refs.overflowbutton;
	            _PopupMenu2.default.show(element, hiddenTabs, this.onOverflowItemSelect.bind(this));
	        }
	    }, {
	        key: "onOverflowItemSelect",
	        value: function onOverflowItemSelect(item) {
	            var node = this.props.node;
	            this.props.layout.doAction(_Actions2.default.selectTab(item.node.getId()));
	        }
	    }, {
	        key: "onMouseDown",
	        value: function onMouseDown(event) {
	            var name = this.props.node.getName();
	            if (name == null) {
	                name = "";
	            } else {
	                name = ": " + name;
	            }
	            this.props.layout.doAction(_Actions2.default.setActiveTabset(this.props.node.getId()));
	            this.props.layout.dragStart(event, "Move tabset" + name, this.props.node, this.props.node.isEnableDrag(), null, this.onDoubleClick.bind(this));
	        }
	    }, {
	        key: "onInterceptMouseDown",
	        value: function onInterceptMouseDown(event) {
	            event.stopPropagation();
	        }
	    }, {
	        key: "onMaximizeToggle",
	        value: function onMaximizeToggle() {
	            if (this.props.node.isEnableMaximize()) {
	                this.props.layout.maximize(this.props.node);
	            }
	        }
	    }, {
	        key: "onDoubleClick",
	        value: function onDoubleClick() {
	            if (this.props.node.isEnableMaximize()) {
	                this.props.layout.maximize(this.props.node);
	            }
	        }
	    }]);
	
	    return TabSet;
	}(_react2.default.Component);
	
	exports.default = TabSet;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PopupMenu = function (_React$Component) {
	    _inherits(PopupMenu, _React$Component);
	
	    function PopupMenu(props) {
	        _classCallCheck(this, PopupMenu);
	
	        var _this = _possibleConstructorReturn(this, (PopupMenu.__proto__ || Object.getPrototypeOf(PopupMenu)).call(this, props));
	
	        _this.onDocMouseUp = _this.onDocMouseUp.bind(_this);
	        _this.hidden = false;
	        return _this;
	    }
	
	    _createClass(PopupMenu, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            document.addEventListener("mouseup", this.onDocMouseUp);
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            document.removeEventListener("mouseup", this.onDocMouseUp);
	        }
	    }, {
	        key: "onDocMouseUp",
	        value: function onDocMouseUp(event) {
	            setInterval(function () {
	                this.hide();
	            }.bind(this), 0);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            if (!this.hidden) {
	                this.props.onHide();
	                this.hidden = true;
	            }
	        }
	    }, {
	        key: "onItemClick",
	        value: function onItemClick(item, event) {
	            this.props.onSelect(item);
	            this.hide();
	            event.stopPropagation();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            var items = this.props.items.map(function (item) {
	                return _react2.default.createElement(
	                    "div",
	                    { key: item.index, className: "flexlayout__popup_menu_item",
	                        onClick: _this2.onItemClick.bind(_this2, item) },
	                    item.name
	                );
	            });
	
	            return _react2.default.createElement(
	                "div",
	                { className: "popup_menu" },
	                items
	            );
	        }
	    }], [{
	        key: "show",
	        value: function show(triggerElement, items, onSelect) {
	            var triggerRect = triggerElement.getBoundingClientRect();
	            var docRect = document.body.getBoundingClientRect();
	
	            var elm = document.createElement("div");
	            elm.className = "flexlayout__popup_menu_container";
	            elm.style.right = docRect.right - triggerRect.right + "px";
	            elm.style.top = triggerRect.bottom + "px";
	            document.body.appendChild(elm);
	
	            var onHide = function onHide() {
	                _reactDom2.default.unmountComponentAtNode(elm);
	                document.body.removeChild(elm);
	            };
	
	            _reactDom2.default.render(_react2.default.createElement(PopupMenu, { element: elm, onSelect: onSelect, onHide: onHide, items: items }), elm);
	            this.elm = elm;
	        }
	    }]);
	
	    return PopupMenu;
	}(_react2.default.Component);
	
	exports.default = PopupMenu;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _PopupMenu = __webpack_require__(205);
	
	var _PopupMenu2 = _interopRequireDefault(_PopupMenu);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TabButton = function (_React$Component) {
	    _inherits(TabButton, _React$Component);
	
	    function TabButton(props) {
	        _classCallCheck(this, TabButton);
	
	        var _this = _possibleConstructorReturn(this, (TabButton.__proto__ || Object.getPrototypeOf(TabButton)).call(this, props));
	
	        _this.state = { editing: false };
	        _this.onEndEdit = _this.onEndEdit.bind(_this);
	        return _this;
	    }
	
	    _createClass(TabButton, [{
	        key: "onMouseDown",
	        value: function onMouseDown(event) {
	            this.props.layout.dragStart(event, "Move: " + this.props.node.getName(), this.props.node, this.props.node.isEnableDrag(), this.onClick.bind(this), this.onDoubleClick.bind(this));
	        }
	    }, {
	        key: "onClick",
	        value: function onClick(event) {
	            var node = this.props.node;
	            this.props.layout.doAction(_Actions2.default.selectTab(node.getId()));
	        }
	    }, {
	        key: "onDoubleClick",
	        value: function onDoubleClick(event) {
	            if (this.props.node.isEnableRename()) {
	                this.setState({ editing: true });
	                document.body.addEventListener("mousedown", this.onEndEdit);
	                document.body.addEventListener("touchstart", this.onEndEdit);
	            } else {
	                if (this.props.node._parent.isEnableMaximize()) {
	                    this.props.layout.maximize(this.props.node.getParent());
	                }
	            }
	        }
	    }, {
	        key: "onEndEdit",
	        value: function onEndEdit(event) {
	            if (event.target !== this.refs.contents) {
	                this.setState({ editing: false });
	                document.body.removeEventListener("mousedown", this.onEndEdit);
	                document.body.removeEventListener("touchstart", this.onEndEdit);
	            }
	        }
	    }, {
	        key: "onClose",
	        value: function onClose(event) {
	            var node = this.props.node;
	            this.props.layout.doAction(_Actions2.default.deleteTab(node.getId()));
	        }
	    }, {
	        key: "onCloseMouseDown",
	        value: function onCloseMouseDown(event) {
	            event.stopPropagation();
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.updateRect();
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate() {
	            this.updateRect();
	            if (this.state.editing) {
	                this.refs.contents.select();
	            }
	        }
	    }, {
	        key: "updateRect",
	        value: function updateRect() {
	            // record position of tab in node
	            var clientRect = _reactDom2.default.findDOMNode(this.props.layout).getBoundingClientRect();
	            var r = this.refs.self.getBoundingClientRect();
	            this.props.node.setTabRect(new _Rect2.default(r.left - clientRect.left, r.top - clientRect.top, r.width, r.height));
	            this.contentWidth = this.refs.contents.getBoundingClientRect().width;
	        }
	    }, {
	        key: "onTextBoxMouseDown",
	        value: function onTextBoxMouseDown(event) {
	            //console.log("onTextBoxMouseDown");
	            event.stopPropagation();
	        }
	    }, {
	        key: "onTextBoxKeyPress",
	        value: function onTextBoxKeyPress(event) {
	            //console.log(event, event.keyCode);
	            if (event.keyCode === 27) {
	                // esc
	                this.setState({ editing: false });
	            } else if (event.keyCode === 13) {
	                // enter
	                this.setState({ editing: false });
	                var node = this.props.node;
	
	                this.props.layout.doAction(_Actions2.default.renameTab(node.getId(), event.target.value));
	            }
	        }
	    }, {
	        key: "doRename",
	        value: function doRename(node, newName) {
	            this.props.layout.doAction(_Actions2.default.renameTab(node.getId(), newName));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var classNames = "flexlayout__tab_button";
	            var node = this.props.node;
	
	            if (this.props.selected) {
	                classNames += " flexlayout__tab_button--selected";
	            } else {
	                classNames += " flexlayout__tab_button--unselected";
	            }
	
	            if (this.props.node.getClassName() != null) {
	                classNames += " " + this.props.node.getClassName();
	            }
	
	            var leadingContent = null;
	
	            if (node.getIcon() != null) {
	                leadingContent = _react2.default.createElement("img", { src: node.getIcon() });
	            }
	
	            // allow customization of leading contents (icon) and contents
	            var renderState = { leading: leadingContent, content: node.getName() };
	            this.props.layout.customizeTab(node, renderState);
	
	            var content = _react2.default.createElement(
	                "div",
	                { ref: "contents", className: "flexlayout__tab_button_content" },
	                renderState.content
	            );
	            var leading = _react2.default.createElement(
	                "div",
	                { className: "flexlayout__tab_button_leading" },
	                renderState.leading
	            );
	
	            if (this.state.editing) {
	                var contentStyle = { width: this.contentWidth + "px" };
	                content = _react2.default.createElement("input", { style: contentStyle,
	                    ref: "contents",
	                    className: "flexlayout__tab_button_textbox",
	                    type: "text",
	                    autoFocus: true,
	                    defaultValue: node.getName(),
	                    onKeyDown: this.onTextBoxKeyPress.bind(this),
	                    onMouseDown: this.onTextBoxMouseDown.bind(this),
	                    onTouchStart: this.onTextBoxMouseDown.bind(this)
	                });
	            }
	
	            var closeButton = null;
	            if (this.props.node.isEnableClose()) {
	                closeButton = _react2.default.createElement("div", { className: "flexlayout__tab_button_trailing",
	                    onMouseDown: this.onCloseMouseDown.bind(this),
	                    onClick: this.onClose.bind(this),
	                    onTouchStart: this.onCloseMouseDown.bind(this)
	                });
	            }
	
	            return _react2.default.createElement(
	                "div",
	                { ref: "self",
	                    style: { visibility: this.props.show ? "visible" : "hidden",
	                        height: this.props.height },
	                    className: classNames,
	                    onMouseDown: this.onMouseDown.bind(this),
	                    onTouchStart: this.onMouseDown.bind(this) },
	                leading,
	                content,
	                closeButton
	            );
	        }
	    }]);
	
	    return TabButton;
	}(_react2.default.Component);
	
	exports.default = TabButton;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	var _BorderNode = __webpack_require__(192);
	
	var _BorderNode2 = _interopRequireDefault(_BorderNode);
	
	var _BorderButton = __webpack_require__(208);
	
	var _BorderButton2 = _interopRequireDefault(_BorderButton);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BorderTabSet = function (_React$Component) {
	    _inherits(BorderTabSet, _React$Component);
	
	    function BorderTabSet(props) {
	        _classCallCheck(this, BorderTabSet);
	
	        return _possibleConstructorReturn(this, (BorderTabSet.__proto__ || Object.getPrototypeOf(BorderTabSet)).call(this, props));
	    }
	
	    _createClass(BorderTabSet, [{
	        key: "render",
	        value: function render() {
	            var border = this.props.border;
	            var style = border.getTabHeaderRect().styleWithPosition({});
	            var tabs = [];
	            if (border.getLocation() != _DockLocation2.default.LEFT) {
	                for (var i = 0; i < border.getChildren().length; i++) {
	                    var isSelected = border.getSelected() === i;
	                    var child = border.getChildren()[i];
	                    tabs.push(_react2.default.createElement(_BorderButton2.default, { layout: this.props.layout,
	                        border: border,
	                        node: child,
	                        key: child.getId(),
	                        selected: isSelected,
	                        height: border.getBorderBarSize(),
	                        pos: i }));
	                }
	            } else {
	                for (var _i = border.getChildren().length - 1; _i >= 0; _i--) {
	                    var _isSelected = border.getSelected() === _i;
	                    var _child = border.getChildren()[_i];
	                    tabs.push(_react2.default.createElement(_BorderButton2.default, { layout: this.props.layout,
	                        border: border,
	                        node: _child,
	                        key: _child.getId(),
	                        selected: _isSelected,
	                        height: border.getBorderBarSize(),
	                        pos: _i }));
	                }
	            }
	
	            var borderClasses = "flexlayout__border_" + border.getLocation().getName();
	            if (this.props.border.getClassNameBorder() != null) {
	                borderClasses += " " + this.props.border.getClassNameBorder();
	            }
	
	            // allow customization of tabset right/bottom buttons
	            var buttons = [];
	            var renderState = { buttons: buttons };
	            this.props.layout.customizeTabSet(border, renderState);
	            buttons = renderState.buttons;
	
	            //buttons.push(<button
	            //    key="1"
	            //    className={"flexlayout__tab_toolbar_button-min"}></button>);
	
	            var toolbar = _react2.default.createElement(
	                "div",
	                {
	                    key: "toolbar",
	                    ref: "toolbar",
	                    className: "flexlayout__border_toolbar_" + border.getLocation().getName() },
	                buttons
	            );
	
	            return _react2.default.createElement(
	                "div",
	                {
	                    style: style,
	                    className: borderClasses },
	                _react2.default.createElement(
	                    "div",
	                    { className: "flexlayout__border_inner_" + border.getLocation().getName() },
	                    tabs
	                ),
	                toolbar
	            );
	        }
	    }]);
	
	    return BorderTabSet;
	}(_react2.default.Component);
	
	exports.default = BorderTabSet;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BorderButton = function (_React$Component) {
	    _inherits(BorderButton, _React$Component);
	
	    function BorderButton(props) {
	        _classCallCheck(this, BorderButton);
	
	        return _possibleConstructorReturn(this, (BorderButton.__proto__ || Object.getPrototypeOf(BorderButton)).call(this, props));
	    }
	
	    _createClass(BorderButton, [{
	        key: "onMouseDown",
	        value: function onMouseDown(event) {
	            this.props.layout.dragStart(event, "Move: " + this.props.node.getName(), this.props.node, this.props.node.isEnableDrag(), this.onClick.bind(this), null);
	        }
	    }, {
	        key: "onClick",
	        value: function onClick(event) {
	            var node = this.props.node;
	            this.props.layout.doAction(_Actions2.default.selectTab(node.getId()));
	        }
	    }, {
	        key: "onClose",
	        value: function onClose(event) {
	            var node = this.props.node;
	            this.props.layout.doAction(_Actions2.default.deleteTab(node.getId()));
	        }
	    }, {
	        key: "onCloseMouseDown",
	        value: function onCloseMouseDown(event) {
	            event.stopPropagation();
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.updateRect();
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate() {
	            this.updateRect();
	        }
	    }, {
	        key: "updateRect",
	        value: function updateRect() {
	            // record position of tab in border
	            var clientRect = _reactDom2.default.findDOMNode(this.props.layout).getBoundingClientRect();
	            var r = this.refs.self.getBoundingClientRect();
	            this.props.node.setTabRect(new _Rect2.default(r.left - clientRect.left, r.top - clientRect.top, r.width, r.height));
	            this.contentWidth = this.refs.contents.getBoundingClientRect().width;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var classNames = "flexlayout__border_button flexlayout__border_button_" + this.props.border.getLocation().getName();
	            var node = this.props.node;
	
	            if (this.props.selected) {
	                classNames += " flexlayout__border_button--selected";
	            } else {
	                classNames += " flexlayout__border_button--unselected";
	            }
	
	            if (this.props.node.getClassName() != null) {
	                classNames += " " + this.props.node.getClassName();
	            }
	
	            var leadingContent = null;
	
	            if (node.getIcon() != null) {
	                leadingContent = _react2.default.createElement("img", { src: node.getIcon() });
	            }
	
	            var content = _react2.default.createElement(
	                "div",
	                { ref: "contents", className: "flexlayout__border_button_content" },
	                node.getName()
	            );
	
	            var closeButton = null;
	            if (this.props.node.isEnableClose()) {
	                closeButton = _react2.default.createElement("div", { className: "flexlayout__border_button_trailing",
	                    onMouseDown: this.onCloseMouseDown.bind(this),
	                    onClick: this.onClose.bind(this),
	                    onTouchStart: this.onCloseMouseDown.bind(this)
	                });
	            }
	
	            return _react2.default.createElement(
	                "div",
	                { ref: "self",
	                    style: {},
	                    className: classNames,
	                    onMouseDown: this.onMouseDown.bind(this),
	                    onTouchStart: this.onMouseDown.bind(this) },
	                leadingContent,
	                content,
	                closeButton
	            );
	        }
	    }]);
	
	    return BorderButton;
	}(_react2.default.Component);
	
	exports.default = BorderButton;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _RowNode = __webpack_require__(200);
	
	var _RowNode2 = _interopRequireDefault(_RowNode);
	
	var _Actions = __webpack_require__(202);
	
	var _Actions2 = _interopRequireDefault(_Actions);
	
	var _TabNode = __webpack_require__(198);
	
	var _TabNode2 = _interopRequireDefault(_TabNode);
	
	var _TabSetNode = __webpack_require__(199);
	
	var _TabSetNode2 = _interopRequireDefault(_TabSetNode);
	
	var _BorderSet = __webpack_require__(210);
	
	var _BorderSet2 = _interopRequireDefault(_BorderSet);
	
	var _BorderNode = __webpack_require__(192);
	
	var _BorderNode2 = _interopRequireDefault(_BorderNode);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	var _AttributeDefinitions = __webpack_require__(193);
	
	var _AttributeDefinitions2 = _interopRequireDefault(_AttributeDefinitions);
	
	var _Attribute = __webpack_require__(194);
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class containing the Tree of Nodes used by the FlexLayout component
	 */
	var Model = function () {
	    /**
	     * 'private' constructor. Use the static method Model.fromJson(json) to create a model
	     */
	    function Model() {
	        _classCallCheck(this, Model);
	
	        this._attributes = {};
	        this._idMap = {};
	        this._nextId = 0;
	        this._listener = null;
	        this._root = null;
	        this._borders = new _BorderSet2.default(this);
	        this._onAllowDrop = null;
	        this._maximizedTabSet = null;
	        this._activeTabSet = null;
	    }
	
	    _createClass(Model, [{
	        key: "setListener",
	        value: function setListener(listener) {
	            this._listener = listener;
	        }
	
	        /**
	         * Sets a function to allow/deny dropping a node
	         * @param onAllowDrop function that takes the drag node and DropInfo and returns true if the drop is allowed
	         *
	         * example function:
	         *
	         * allowDrop(dragNode, dropInfo) {
	         *   let dropNode = dropInfo.node;
	         *
	         *   // prevent non-border tabs dropping into borders
	         *   if (dropNode.getType() == "border" && (dragNode.getParent() == null || dragNode.getParent().getType() != "border"))
	         *     return false;
	         *
	         *   // prevent border tabs dropping into main layout
	         *   if (dropNode.getType() != "border" && (dragNode.getParent() != null && dragNode.getParent().getType() == "border"))
	         *     return false;
	         *
	         *   return true;
	         * }
	         */
	
	    }, {
	        key: "setOnAllowDrop",
	        value: function setOnAllowDrop(onAllowDrop) {
	            this._onAllowDrop = onAllowDrop;
	        }
	
	        /**
	         * Get the currently active tabset node
	         * @returns {null|TabSetNode}
	         */
	
	    }, {
	        key: "getActiveTabset",
	        value: function getActiveTabset() {
	            return this._activeTabSet;
	        }
	    }, {
	        key: "_setActiveTabset",
	        value: function _setActiveTabset(tabsetNode) {
	            this._activeTabSet = tabsetNode;
	        }
	
	        /**
	         * Get the currently maximized tabset node
	         * @returns {null|TabSetNode}
	         */
	
	    }, {
	        key: "getMaximizedTabset",
	        value: function getMaximizedTabset() {
	            return this._maximizedTabSet;
	        }
	    }, {
	        key: "_setMaximizedTabset",
	        value: function _setMaximizedTabset(tabsetNode) {
	            this._maximizedTabSet = tabsetNode;
	        }
	
	        /**
	         * Gets the root RowNode of the model
	         * @returns {RowNode}
	         */
	
	    }, {
	        key: "getRoot",
	        value: function getRoot() {
	            return this._root;
	        }
	
	        /**
	         * Gets the
	         * @returns {BorderSet|*}
	         */
	
	    }, {
	        key: "getBorderSet",
	        value: function getBorderSet() {
	            return this._borders;
	        }
	    }, {
	        key: "_getOuterInnerRects",
	        value: function _getOuterInnerRects() {
	            return this._borderRects;
	        }
	
	        /**
	         * Visits all the nodes in the model and calls the given function for each
	         * @param fn a function that takes visited node and a integer level as parameters
	         */
	
	    }, {
	        key: "visitNodes",
	        value: function visitNodes(fn) {
	            this._borders._forEachNode(fn);
	            this._root._forEachNode(fn, 0);
	        }
	
	        /**
	         * Gets a node by its id
	         * @param id the id to find
	         * @returns {null|Node}
	         */
	
	    }, {
	        key: "getNodeById",
	        value: function getNodeById(id) {
	            return this._idMap[id];
	        }
	
	        ///**
	        // * Update the json by performing the given action,
	        // * Actions should be generated via static methods on the Actions class
	        // * @param json the json to update
	        // * @param action the action to perform
	        // * @returns {*} a new json object with the action applied
	        // */
	        //static apply(action, json) {
	        //    console.log(json, action);
	        //
	        //    let model = Model.fromJson(json);
	        //    model.doAction(action);
	        //    return model.toJson();
	        //}
	
	        /**
	         * Update the node tree by performing the given action,
	         * Actions should be generated via static methods on the Actions class
	         * @param action the action to perform
	         */
	
	    }, {
	        key: "doAction",
	        value: function doAction(action) {
	            //console.log(action);
	            switch (action.type) {
	                case _Actions2.default.ADD_NODE:
	                    {
	                        var newNode = new _TabNode2.default(this, action.json);
	                        var toNode = this._idMap[action.toNode];
	                        toNode._drop(newNode, _DockLocation2.default.getByName(action.location), action.index);
	                        break;
	                    }
	                case _Actions2.default.MOVE_NODE:
	                    {
	                        var fromNode = this._idMap[action.fromNode];
	                        var _toNode = this._idMap[action.toNode];
	                        _toNode._drop(fromNode, _DockLocation2.default.getByName(action.location), action.index);
	                        break;
	                    }
	                case _Actions2.default.DELETE_TAB:
	                    {
	                        var node = this._idMap[action.node];
	                        delete this._idMap[action.node];
	                        node._delete();
	                        break;
	                    }
	                case _Actions2.default.RENAME_TAB:
	                    {
	                        var _node = this._idMap[action.node];
	                        _node._setName(action.text);
	                        break;
	                    }
	                case _Actions2.default.SELECT_TAB:
	                    {
	                        var tabNode = this._idMap[action.tabNode];
	                        var parent = tabNode.getParent();
	                        var pos = parent.getChildren().indexOf(tabNode);
	
	                        if (parent.getType() === _BorderNode2.default.TYPE) {
	                            if (parent.getSelected() == pos) {
	                                parent._setSelected(-1);
	                            } else {
	                                parent._setSelected(pos);
	                            }
	                        } else {
	                            if (parent.getSelected() !== pos) {
	                                parent._setSelected(pos);
	                            }
	                            this._activeTabSet = parent;
	                        }
	
	                        break;
	                    }
	                case _Actions2.default.SET_ACTIVE_TABSET:
	                    {
	                        var tabsetNode = this._idMap[action.tabsetNode];
	                        this._activeTabSet = tabsetNode;
	                        break;
	                    }
	                case _Actions2.default.ADJUST_SPLIT:
	                    {
	                        var node1 = this._idMap[action.node1];
	                        var node2 = this._idMap[action.node2];
	
	                        this._adjustSplitSide(node1, action.weight1, action.pixelWidth1);
	                        this._adjustSplitSide(node2, action.weight2, action.pixelWidth2);
	                        break;
	                    }
	                case _Actions2.default.ADJUST_BORDER_SPLIT:
	                    {
	                        var _node2 = this._idMap[action.node];
	                        _node2._setSize(action.pos);
	                        break;
	                    }
	                case _Actions2.default.MAXIMIZE_TOGGLE:
	                    {
	                        var _node3 = this._idMap[action.node];
	                        if (_node3 === this._maximizedTabSet) {
	                            this._maximizedTabSet = null;
	                        } else {
	                            this._maximizedTabSet = _node3;
	                            this._activeTabSet = _node3;
	                        }
	
	                        break;
	                    }
	                case _Actions2.default.UPDATE_MODEL_ATTRIBUTES:
	                    {
	                        this._updateAttrs(action.json);
	                        break;
	                    }
	                case _Actions2.default.UPDATE_NODE_ATTRIBUTES:
	                    {
	                        var _node4 = this._idMap[action.node];
	                        _node4._updateAttrs(action.json);
	                        break;
	                    }
	            }
	
	            this._updateIdMap();
	
	            if (this._listener !== null) {
	                this._listener();
	            }
	        }
	    }, {
	        key: "_updateIdMap",
	        value: function _updateIdMap() {
	            var _this = this;
	
	            // regenerate idMap to stop it building up
	            this._idMap = {};
	            this.visitNodes(function (node) {
	                return _this._idMap[node.getId()] = node;
	            });
	            //console.log(JSON.stringify(Object.keys(this._idMap)));
	        }
	    }, {
	        key: "_adjustSplitSide",
	        value: function _adjustSplitSide(node, weight, pixels) {
	            node._setWeight(weight);
	            if (node.getWidth() != null && node.getOrientation() === _Orientation2.default.VERT) {
	                node._updateAttrs({ width: pixels });
	            } else if (node.getHeight() != null && node.getOrientation() === _Orientation2.default.HORZ) {
	                node._updateAttrs({ height: pixels });
	            }
	        }
	
	        /**
	         * Converts the model to a json object
	         * @returns {*} json object that represents this model
	         */
	
	    }, {
	        key: "toJson",
	        value: function toJson() {
	            var json = { global: {}, layout: {} };
	            attributeDefinitions.toJson(json.global, this._attributes);
	
	            // save state of nodes
	            this.visitNodes(function (node) {
	                node._fireEvent("save", null);
	            });
	
	            json.borders = this._borders._toJson();
	            json.layout = this._root._toJson();
	            return json;
	        }
	
	        /**
	         * Loads the model from the given json object
	         * @param json the json model to load
	         * @returns {Model} a new Model object
	         */
	
	    }, {
	        key: "getSplitterSize",
	        value: function getSplitterSize() {
	            return this._attributes["splitterSize"];
	        }
	    }, {
	        key: "isEnableEdgeDock",
	        value: function isEnableEdgeDock() {
	            return this._attributes["enableEdgeDock"];
	        }
	    }, {
	        key: "_addNode",
	        value: function _addNode(node) {
	            if (node.getId() == null) {
	                node._setId(this._nextUniqueId());
	            } else {
	                if (this._idMap[node.getId()] !== undefined) {
	                    throw "Error: each node must have a unique id, duplicate id: " + node.getId();
	                }
	            }
	
	            if (node.getType() !== "splitter") {
	                this._idMap[node.getId()] = node;
	            }
	        }
	    }, {
	        key: "_layout",
	        value: function _layout(rect) {
	            //let start = Date.now();
	            this._borderRects = this._borders._layout({ outer: rect, inner: rect });
	            this._root._layout(this._borderRects.inner);
	            return this._borderRects.inner;
	            //console.log("layout time: " + (Date.now() - start));
	        }
	    }, {
	        key: "_findDropTargetNode",
	        value: function _findDropTargetNode(dragNode, x, y) {
	            var node = this._root._findDropTargetNode(dragNode, x, y);
	            if (node == null) {
	                node = this._borders._findDropTargetNode(dragNode, x, y);
	            }
	            return node;
	        }
	    }, {
	        key: "_tidy",
	        value: function _tidy() {
	            //console.log("before _tidy", this.toString());
	            this._root._tidy();
	            //console.log("after _tidy", this.toString());
	        }
	    }, {
	        key: "_updateAttrs",
	        value: function _updateAttrs(json) {
	            attributeDefinitions.update(json, this._attributes);
	        }
	    }, {
	        key: "_nextUniqueId",
	        value: function _nextUniqueId() {
	            this._nextId++;
	            while (this._idMap["#" + this._nextId] !== undefined) {
	                this._nextId++;
	            }
	
	            return "#" + this._nextId;
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return JSON.stringify(this.toJson());
	        }
	    }], [{
	        key: "fromJson",
	        value: function fromJson(json) {
	            var model = new Model();
	            attributeDefinitions.fromJson(json.global, model._attributes);
	
	            if (json.borders) {
	                model._borders = _BorderSet2.default._fromJson(json.borders, model);
	            }
	            model._root = _RowNode2.default._fromJson(json.layout, model);
	            model._tidy(); // initial tidy of node tree
	            return model;
	        }
	    }]);
	
	    return Model;
	}();
	
	var attributeDefinitions = new _AttributeDefinitions2.default();
	
	// splitter
	attributeDefinitions.add("splitterSize", 8).setType(_Attribute2.default.INT).setFrom(1);
	attributeDefinitions.add("enableEdgeDock", true).setType(_Attribute2.default.BOOLEAN);
	
	// tab
	attributeDefinitions.add("tabEnableClose", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabEnableDrag", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabEnableRename", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabClassName", null).setType(_Attribute2.default.STRING);
	attributeDefinitions.add("tabIcon", null).setType(_Attribute2.default.STRING);
	
	// tabset
	attributeDefinitions.add("tabSetEnableDeleteWhenEmpty", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabSetEnableClose", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabSetEnableDrop", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabSetEnableDrag", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabSetEnableDivide", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabSetEnableMaximize", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabSetClassNameTabStrip", null).setType(_Attribute2.default.STRING);
	attributeDefinitions.add("tabSetClassNameHeader", null).setType(_Attribute2.default.STRING);
	attributeDefinitions.add("tabSetEnableTabStrip", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("tabSetHeaderHeight", 20).setType(_Attribute2.default.INT).setFrom(0);
	attributeDefinitions.add("tabSetTabStripHeight", 20).setType(_Attribute2.default.INT).setFrom(0);
	
	attributeDefinitions.add("borderBarSize", 25);
	attributeDefinitions.add("borderEnableDrop", true).setType(_Attribute2.default.BOOLEAN);
	attributeDefinitions.add("borderClassName", null).setType(_Attribute2.default.STRING);
	
	exports.default = Model;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rect = __webpack_require__(190);
	
	var _Rect2 = _interopRequireDefault(_Rect);
	
	var _DockLocation = __webpack_require__(195);
	
	var _DockLocation2 = _interopRequireDefault(_DockLocation);
	
	var _BorderNode = __webpack_require__(192);
	
	var _BorderNode2 = _interopRequireDefault(_BorderNode);
	
	var _Orientation = __webpack_require__(191);
	
	var _Orientation2 = _interopRequireDefault(_Orientation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BorderSet = function () {
	    function BorderSet(model) {
	        _classCallCheck(this, BorderSet);
	
	        this._model = model;
	        this._borders = [];
	    }
	
	    _createClass(BorderSet, [{
	        key: "getBorders",
	        value: function getBorders() {
	            return this._borders;
	        }
	    }, {
	        key: "_forEachNode",
	        value: function _forEachNode(fn) {
	            this._borders.forEach(function (borderNode) {
	                fn(borderNode);
	                borderNode._children.forEach(function (node) {
	                    node._forEachNode(fn);
	                });
	            });
	        }
	    }, {
	        key: "_toJson",
	        value: function _toJson() {
	            return this._borders.map(function (borderNode) {
	                return borderNode._toJson();
	            });
	        }
	    }, {
	        key: "_layout",
	        value: function _layout(outerInnerRects) {
	
	            var rect = outerInnerRects.outer;
	            var height = rect.height;
	            var width = rect.width;
	            var sumHeight = 0;
	            var sumWidth = 0;
	            var countHeight = 0;
	            var countWidth = 0;
	            var adjustableHeight = 0;
	            var adjustableWidth = 0;
	
	            var showingBorders = this._borders.filter(function (border) {
	                return border.isShowing();
	            });
	
	            // sum size of borders to see they will fit
	            for (var _i = 0; _i < showingBorders.length; _i++) {
	                var border = showingBorders[_i];
	                if (border.isShowing()) {
	                    border._setAdjustedSize(border.getSize());
	                    var visible = border.getSelected() != -1;
	                    if (border.getLocation().getOrientation() == _Orientation2.default.HORZ) {
	                        sumWidth += border.getBorderBarSize() + this._model.getSplitterSize();
	                        if (visible) {
	                            sumWidth += border.getSize();
	                            adjustableWidth += border.getSize();
	                        }
	                        countWidth++;
	                    } else {
	                        sumHeight += border.getBorderBarSize() + this._model.getSplitterSize();
	                        if (visible) {
	                            sumHeight += border.getSize();
	                            adjustableHeight += border.getSize();
	                        }
	                        countHeight++;
	                    }
	                }
	            }
	
	            // adjust border sizes if too large
	            var i = 0;
	            while (sumWidth > width && adjustableWidth > 0 || sumHeight > height && adjustableHeight > 0) {
	                var _border = showingBorders[i];
	                if (_border.getSelected() != -1) {
	                    //visible
	                    var size = _border._getAdjustedSize();
	                    if (sumWidth > width && adjustableWidth > 0 && _border.getLocation().getOrientation() == _Orientation2.default.HORZ && size > 0) {
	                        _border._setAdjustedSize(size - 1);
	                        sumWidth--;
	                        adjustableWidth--;
	                    } else if (sumHeight > height && adjustableHeight > 0 && _border.getLocation().getOrientation() == _Orientation2.default.VERT && size > 0) {
	                        _border._setAdjustedSize(size - 1);
	                        sumHeight--;
	                        adjustableHeight--;
	                    }
	                }
	                i = (i + 1) % showingBorders.length;
	            }
	
	            showingBorders.forEach(function (border) {
	                outerInnerRects = border._layout(outerInnerRects);
	            });
	            return outerInnerRects;
	        }
	    }, {
	        key: "_findDropTargetNode",
	        value: function _findDropTargetNode(dragNode, x, y) {
	            for (var i = 0; i < this._borders.length; i++) {
	                var border = this._borders[i];
	                if (border.isShowing()) {
	                    var dropInfo = border._canDrop(dragNode, x, y);
	                    if (dropInfo != null) {
	                        return dropInfo;
	                    }
	                }
	            }
	            return null;
	        }
	    }], [{
	        key: "_fromJson",
	        value: function _fromJson(json, model) {
	            var borderSet = new BorderSet(model);
	            borderSet._borders = json.map(function (borderJson) {
	                return _BorderNode2.default._fromJson(borderJson, model);
	            });
	            return borderSet;
	        }
	    }]);
	
	    return BorderSet;
	}();
	
	exports.default = BorderSet;

/***/ }),
/* 211 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    _createClass(Utils, null, [{
	        key: "downloadFile",
	        value: function downloadFile(downloadUrl, onSuccess, onError) {
	            console.log("DownloadFile: " + downloadUrl);
	            if (downloadUrl) {
	                var xhr = new XMLHttpRequest();
	                xhr.open('GET', downloadUrl);
	                xhr.onload = function () {
	                    if (xhr.status == 200) {
	                        onSuccess(xhr.responseText);
	                    } else {
	                        onError(xhr.status + " " + xhr.statusText);
	                    }
	                };
	                xhr.onerror = function (e) {
	                    console.log(e.getMessage, e);
	                    onError(e);
	                };
	                xhr.send();
	            }
	        }
	    }, {
	        key: "getQueryParams",
	        value: function getQueryParams() {
	            var a = window.location.search.substr(1).split('&');
	            if (a == "") return {};
	            var b = {};
	            for (var i = 0; i < a.length; ++i) {
	                var p = a[i].split('=', 2);
	                if (p.length == 1) b[p[0]] = "";else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	            }
	            return b;
	        }
	    }]);
	
	    return Utils;
	}();
	
	exports.default = Utils;

/***/ })
/******/ ]);
//# sourceMappingURL=demo.js.map