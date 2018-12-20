// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"node_modules/object-assign/index.js":[function(require,module,exports) {
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
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
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
},{}],"node_modules/prop-types/lib/ReactPropTypesSecret.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],"node_modules/prop-types/checkPropTypes.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var printWarning = function () {};

if ("development" !== 'production') {
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

  var loggedTypeFailures = {};

  printWarning = function (text) {
    var message = 'Warning: ' + text;

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
  if ("development" !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}

module.exports = checkPropTypes;
},{"./lib/ReactPropTypesSecret":"node_modules/prop-types/lib/ReactPropTypesSecret.js"}],"node_modules/react/cjs/react.development.js":[function(require,module,exports) {
/** @license React v16.7.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

if ("development" !== "production") {
  (function () {
    'use strict';

    var _assign = require('object-assign');

    var checkPropTypes = require('prop-types/checkPropTypes'); // TODO: this is special because it gets imported during build.


    var ReactVersion = '16.7.0'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }

    var enableHooks = false; // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:
    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.
    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
    // Gather advanced timing metrics for Profiler subtrees.
    // Trace which interactions trigger each commit.
    // Only used in www builds.
    // TODO: true? Here it might just be false.
    // Only used in www builds.
    // Only used in www builds.
    // React Fire: prevent the value and checked attributes from syncing
    // with their related DOM properties
    // These APIs will no longer be "unstable" in the upcoming 16.7 release,
    // Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

    var enableStableConcurrentModeAPIs = false;
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

    var validateFormat = function () {};

    {
      validateFormat = function (format) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      };
    }

    function invariant(condition, format, a, b, c, d, e, f) {
      validateFormat(format);

      if (!condition) {
        var error = void 0;

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
    } // Relying on the `invariant()` implementation lets us
    // preserve the format and params in the www builds.

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

    {
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
          throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    var lowPriorityWarning$1 = lowPriorityWarning;
    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var warningWithoutStack = function () {};

    {
      warningWithoutStack = function (condition, format) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        if (format === undefined) {
          throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (args.length > 8) {
          // Check before the condition to catch violations early.
          throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
        }

        if (condition) {
          return;
        }

        if (typeof console !== 'undefined') {
          var argsWithFormat = args.map(function (item) {
            return '' + item;
          });
          argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
          // breaks IE9: https://github.com/facebook/react/issues/13610

          Function.prototype.apply.call(console.error, console, argsWithFormat);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });
          throw new Error(message);
        } catch (x) {}
      };
    }
    var warningWithoutStack$1 = warningWithoutStack;
    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
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
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function (publicInstance, callback, callerName) {
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
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
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
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function (publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    var emptyObject = {};
    {
      Object.freeze(emptyObject);
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
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

    Component.prototype.setState = function (partialState, callback) {
      !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
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


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function (methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function () {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    /**
     * Convenience component with default shallow equality check for sCU.
     */

    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }
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
      current: null,
      currentDispatcher: null
    };
    var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

    var describeComponentFrame = function (name, source, ownerName) {
      var sourceInfo = '';

      if (source) {
        var path = source.fileName;
        var fileName = path.replace(BEFORE_SLASH_RE, '');
        {
          // In DEV, include code for a common special case:
          // prefer "folder/index.js" instead of just "index.js".
          if (/^index\./.test(fileName)) {
            var match = path.match(BEFORE_SLASH_RE);

            if (match) {
              var pathBeforeSlash = match[1];

              if (pathBeforeSlash) {
                var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
                fileName = folderName + '/' + fileName;
              }
            }
          }
        }
        sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
      } else if (ownerName) {
        sourceInfo = ' (created by ' + ownerName + ')';
      }

      return '\n    in ' + (name || 'Unknown') + sourceInfo;
    };

    var Resolved = 1;

    function refineResolvedLazyComponent(lazyComponent) {
      return lazyComponent._status === Resolved ? lazyComponent._result : null;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var functionName = innerType.displayName || innerType.name || '';
      return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);
    }

    function getComponentName(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case REACT_CONCURRENT_MODE_TYPE:
          return 'ConcurrentMode';

        case REACT_FRAGMENT_TYPE:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case REACT_PROFILER_TYPE:
          return 'Profiler';

        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';

        case REACT_SUSPENSE_TYPE:
          return 'Suspense';
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return 'Context.Consumer';

          case REACT_PROVIDER_TYPE:
            return 'Context.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            return getComponentName(type.type);

          case REACT_LAZY_TYPE:
            {
              var thenable = type;
              var resolvedThenable = refineResolvedLazyComponent(thenable);

              if (resolvedThenable) {
                return getComponentName(resolvedThenable);
              }
            }
        }
      }

      return null;
    }

    var ReactDebugCurrentFrame = {};
    var currentlyValidatingElement = null;

    function setCurrentlyValidatingElement(element) {
      {
        currentlyValidatingElement = element;
      }
    }

    {
      // Stack implementation injected by the current renderer.
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var stack = ''; // Add an extra top frame while an element is being validated

        if (currentlyValidatingElement) {
          var name = getComponentName(currentlyValidatingElement.type);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
        } // Delegate to the injected renderer-specific implementation


        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          stack += impl() || '';
        }

        return stack;
      };
    }
    var ReactSharedInternals = {
      ReactCurrentOwner: ReactCurrentOwner,
      // Used by renderers to avoid bundling object-assign twice in UMD bundles:
      assign: _assign
    };
    {
      _assign(ReactSharedInternals, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }
    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var warning = warningWithoutStack$1;
    {
      warning = function (condition, format) {
        if (condition) {
          return;
        }

        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum(); // eslint-disable-next-line react-internal/warning-and-invariant-args

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
      };
    }
    var warning$1 = warning;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown = void 0;
    var specialPropRefWarningShown = void 0;

    function hasValidRef(config) {
      {
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
      {
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
          warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
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
          warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
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
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName = void 0; // Reserved names are extracted

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
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */


    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;
      var propName = void 0; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


        var defaultProps = void 0;

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
      } // Children can be more than one argument, and those are transferred onto
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
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */


    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
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
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];

    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;

      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
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

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child = void 0;
      var nextName = void 0;
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

        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step = void 0;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
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
      if (typeof component === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
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

      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);

      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
          return c;
        });
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
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

      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
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
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrencount
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children) {
      return traverseAllChildren(children, function () {
        return null;
      }, null);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
     */


    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
        return child;
      });
      return result;
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
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
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        // Used to track how many concurrent renderers this context currently
        // supports within in a single renderer. Such as parallel server rendering.
        _threadCount: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };
      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      var hasWarnedAboutUsingNestedContextConsumers = false;
      var hasWarnedAboutUsingConsumerProvider = false;
      {
        // A separate object, but proxies back to the original context object for
        // backwards compatibility. It has a different $$typeof, so we can properly
        // warn for the incorrect usage of Context as a Consumer.
        var Consumer = {
          $$typeof: REACT_CONTEXT_TYPE,
          _context: context,
          _calculateChangedBits: context._calculateChangedBits
        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

        Object.defineProperties(Consumer, {
          Provider: {
            get: function () {
              if (!hasWarnedAboutUsingConsumerProvider) {
                hasWarnedAboutUsingConsumerProvider = true;
                warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
              }

              return context.Provider;
            },
            set: function (_Provider) {
              context.Provider = _Provider;
            }
          },
          _currentValue: {
            get: function () {
              return context._currentValue;
            },
            set: function (_currentValue) {
              context._currentValue = _currentValue;
            }
          },
          _currentValue2: {
            get: function () {
              return context._currentValue2;
            },
            set: function (_currentValue2) {
              context._currentValue2 = _currentValue2;
            }
          },
          _threadCount: {
            get: function () {
              return context._threadCount;
            },
            set: function (_threadCount) {
              context._threadCount = _threadCount;
            }
          },
          Consumer: {
            get: function () {
              if (!hasWarnedAboutUsingNestedContextConsumers) {
                hasWarnedAboutUsingNestedContextConsumers = true;
                warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
              }

              return context.Consumer;
            }
          }
        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

        context.Consumer = Consumer;
      }
      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }
      return context;
    }

    function lazy(ctor) {
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _ctor: ctor,
        // React uses these fields to store the result.
        _status: -1,
        _result: null
      };
      {
        // In production, this would just set it on the object.
        var defaultProps = void 0;
        var propTypes = void 0;
        Object.defineProperties(lazyType, {
          defaultProps: {
            configurable: true,
            get: function () {
              return defaultProps;
            },
            set: function (newDefaultProps) {
              warning$1(false, 'React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              defaultProps = newDefaultProps; // Match production behavior more closely:

              Object.defineProperty(lazyType, 'defaultProps', {
                enumerable: true
              });
            }
          },
          propTypes: {
            configurable: true,
            get: function () {
              return propTypes;
            },
            set: function (newPropTypes) {
              warning$1(false, 'React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              propTypes = newPropTypes; // Match production behavior more closely:

              Object.defineProperty(lazyType, 'propTypes', {
                enumerable: true
              });
            }
          }
        });
      }
      return lazyType;
    }

    function forwardRef(render) {
      {
        if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
          warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
        } else if (typeof render !== 'function') {
          warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
        } else {
          !( // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
          render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
        }

        if (render != null) {
          !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
        }
      }
      return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
    }

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
    }

    function memo(type, compare) {
      {
        if (!isValidElementType(type)) {
          warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
        }
      }
      return {
        $$typeof: REACT_MEMO_TYPE,
        type: type,
        compare: compare === undefined ? null : compare
      };
    }

    function resolveDispatcher() {
      var dispatcher = ReactCurrentOwner.currentDispatcher;
      !(dispatcher !== null) ? invariant(false, 'Hooks can only be called inside the body of a function component.') : void 0;
      return dispatcher;
    }

    function useContext(Context, observedBits) {
      var dispatcher = resolveDispatcher();
      {
        // TODO: add a more generic warning for invalid values.
        if (Context._context !== undefined) {
          var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
          // and nobody should be using this in existing code.

          if (realContext.Consumer === Context) {
            warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
          } else if (realContext.Provider === Context) {
            warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
          }
        }
      }
      return dispatcher.useContext(Context, observedBits);
    }

    function useState(initialState) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useState(initialState);
    }

    function useReducer(reducer, initialState, initialAction) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useReducer(reducer, initialState, initialAction);
    }

    function useRef(initialValue) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useRef(initialValue);
    }

    function useEffect(create, inputs) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useEffect(create, inputs);
    }

    function useLayoutEffect(create, inputs) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useLayoutEffect(create, inputs);
    }

    function useCallback(callback, inputs) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useCallback(callback, inputs);
    }

    function useMemo(create, inputs) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useMemo(create, inputs);
    }

    function useImperativeMethods(ref, create, inputs) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useImperativeMethods(ref, create, inputs);
    }
    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */


    var propTypesMisspellWarningShown = void 0;
    {
      propTypesMisspellWarningShown = false;
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
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
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
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
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';
      }

      setCurrentlyValidatingElement(element);
      {
        warning$1(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
      }
      setCurrentlyValidatingElement(null);
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

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step = void 0;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
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
      var type = element.type;

      if (type === null || type === undefined || typeof type === 'string') {
        return;
      }

      var name = getComponentName(type);
      var propTypes = void 0;

      if (typeof type === 'function') {
        propTypes = type.propTypes;
      } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      type.$$typeof === REACT_MEMO_TYPE)) {
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        setCurrentlyValidatingElement(element);
        checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
        setCurrentlyValidatingElement(null);
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }

      if (typeof type.getDefaultProps === 'function') {
        !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      setCurrentlyValidatingElement(fragment);
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== 'children' && key !== 'key') {
          warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
          break;
        }
      }

      if (fragment.ref !== null) {
        warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
      }

      setCurrentlyValidatingElement(null);
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString = void 0;

        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type; // Legacy hook: remove it

      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },
      createRef: createRef,
      Component: Component,
      PureComponent: PureComponent,
      createContext: createContext,
      forwardRef: forwardRef,
      lazy: lazy,
      memo: memo,
      Fragment: REACT_FRAGMENT_TYPE,
      StrictMode: REACT_STRICT_MODE_TYPE,
      Suspense: REACT_SUSPENSE_TYPE,
      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,
      version: ReactVersion,
      unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
      unstable_Profiler: REACT_PROFILER_TYPE,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
    }; // Note: some APIs are added with feature flags.
    // Make sure that stable builds for open source
    // don't modify the React object to avoid deopts.
    // Also let's not expose their names in stable builds.

    if (enableStableConcurrentModeAPIs) {
      React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      React.Profiler = REACT_PROFILER_TYPE;
      React.unstable_ConcurrentMode = undefined;
      React.unstable_Profiler = undefined;
    }

    if (enableHooks) {
      React.useCallback = useCallback;
      React.useContext = useContext;
      React.useEffect = useEffect;
      React.useImperativeMethods = useImperativeMethods;
      React.useLayoutEffect = useLayoutEffect;
      React.useMemo = useMemo;
      React.useReducer = useReducer;
      React.useRef = useRef;
      React.useState = useState;
    }

    var React$2 = Object.freeze({
      default: React
    });
    var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.

    var react = React$3.default || React$3;
    module.exports = react;
  })();
}
},{"object-assign":"node_modules/object-assign/index.js","prop-types/checkPropTypes":"node_modules/prop-types/checkPropTypes.js"}],"node_modules/react/index.js":[function(require,module,exports) {
'use strict';

if ("development" === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.development.js":"node_modules/react/cjs/react.development.js"}],"node_modules/react-hot-loader/dist/react-hot-loader.production.min.js":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _interopDefault(t) {
  return t && "object" == _typeof(t) && "default" in t ? t.default : t;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var React = _interopDefault(require("react")),
    classCallCheck = function (t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
},
    inherits = function (t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
},
    possibleConstructorReturn = function (t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
},
    AppContainer = function (t) {
  function e() {
    return classCallCheck(this, e), possibleConstructorReturn(this, t.apply(this, arguments));
  }

  return inherits(e, t), e.prototype.render = function () {
    return React.Children.only(this.props.children);
  }, e;
}(React.Component),
    hot_prod = function () {
  return function (t) {
    return t;
  };
},
    areComponentsEqual = function (t, e) {
  return t === e;
},
    setConfig = function () {},
    cold = function (t) {
  return t;
};

exports.AppContainer = AppContainer, exports.hot = hot_prod, exports.areComponentsEqual = areComponentsEqual, exports.setConfig = setConfig, exports.cold = cold;
},{"react":"node_modules/react/index.js"}],"node_modules/shallowequal/index.js":[function(require,module,exports) {
//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};

},{}],"node_modules/fast-levenshtein/levenshtein.js":[function(require,module,exports) {
var define;
(function() {
  'use strict';
  
  var collator;
  try {
    collator = (typeof Intl !== "undefined" && typeof Intl.Collator !== "undefined") ? Intl.Collator("generic", { sensitivity: "base" }) : null;
  } catch (err){
    console.log("Collator could not be initialized and wouldn't be used");
  }
  // arrays to re-use
  var prevRow = [],
    str2Char = [];
  
  /**
   * Based on the algorithm at http://en.wikipedia.org/wiki/Levenshtein_distance.
   */
  var Levenshtein = {
    /**
     * Calculate levenshtein distance of the two strings.
     *
     * @param str1 String the first string.
     * @param str2 String the second string.
     * @param [options] Additional options.
     * @param [options.useCollator] Use `Intl.Collator` for locale-sensitive string comparison.
     * @return Integer the levenshtein distance (0 and above).
     */
    get: function(str1, str2, options) {
      var useCollator = (options && collator && options.useCollator);
      
      var str1Len = str1.length,
        str2Len = str2.length;
      
      // base cases
      if (str1Len === 0) return str2Len;
      if (str2Len === 0) return str1Len;

      // two rows
      var curCol, nextCol, i, j, tmp;

      // initialise previous row
      for (i=0; i<str2Len; ++i) {
        prevRow[i] = i;
        str2Char[i] = str2.charCodeAt(i);
      }
      prevRow[str2Len] = str2Len;

      var strCmp;
      if (useCollator) {
        // calculate current row distance from previous row using collator
        for (i = 0; i < str1Len; ++i) {
          nextCol = i + 1;

          for (j = 0; j < str2Len; ++j) {
            curCol = nextCol;

            // substution
            strCmp = 0 === collator.compare(str1.charAt(i), String.fromCharCode(str2Char[j]));

            nextCol = prevRow[j] + (strCmp ? 0 : 1);

            // insertion
            tmp = curCol + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }
            // deletion
            tmp = prevRow[j + 1] + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }

            // copy current col value into previous (in preparation for next iteration)
            prevRow[j] = curCol;
          }

          // copy last col value into previous (in preparation for next iteration)
          prevRow[j] = nextCol;
        }
      }
      else {
        // calculate current row distance from previous row without collator
        for (i = 0; i < str1Len; ++i) {
          nextCol = i + 1;

          for (j = 0; j < str2Len; ++j) {
            curCol = nextCol;

            // substution
            strCmp = str1.charCodeAt(i) === str2Char[j];

            nextCol = prevRow[j] + (strCmp ? 0 : 1);

            // insertion
            tmp = curCol + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }
            // deletion
            tmp = prevRow[j + 1] + 1;
            if (nextCol > tmp) {
              nextCol = tmp;
            }

            // copy current col value into previous (in preparation for next iteration)
            prevRow[j] = curCol;
          }

          // copy last col value into previous (in preparation for next iteration)
          prevRow[j] = nextCol;
        }
      }
      return nextCol;
    }

  };

  // amd
  if (typeof define !== "undefined" && define !== null && define.amd) {
    define(function() {
      return Levenshtein;
    });
  }
  // commonjs
  else if (typeof module !== "undefined" && module !== null && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = Levenshtein;
  }
  // web worker
  else if (typeof self !== "undefined" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {
    self.Levenshtein = Levenshtein;
  }
  // browser main thread
  else if (typeof window !== "undefined" && window !== null) {
    window.Levenshtein = Levenshtein;
  }
}());


},{}],"node_modules/prop-types/factoryWithTypeCheckers.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

var checkPropTypes = require('./checkPropTypes');

var printWarning = function () {};

if ("development" !== 'production') {
  printWarning = function (text) {
    var message = 'Warning: ' + text;

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
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function (isValidElement, throwOnDirectAccess) {
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


  var ANONYMOUS = '<<anonymous>>'; // Important!
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
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
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
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if ("development" !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
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
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
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
      "development" !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
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
      "development" !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
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

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
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
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


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
  } // This handles more types than `getPropType`. Only used for error messages.
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
  } // Returns a string that is postfixed to a warning about an invalid type.
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
  } // Returns class name of the object, if any.


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
},{"object-assign":"node_modules/object-assign/index.js","./lib/ReactPropTypesSecret":"node_modules/prop-types/lib/ReactPropTypesSecret.js","./checkPropTypes":"node_modules/prop-types/checkPropTypes.js"}],"node_modules/prop-types/index.js":[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if ("development" !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function (object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }; // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod


  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}
},{"./factoryWithTypeCheckers":"node_modules/prop-types/factoryWithTypeCheckers.js"}],"node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyfill = polyfill;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);

  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  } // Binding "this" is important for shallow renderer support.


  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
} // React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.


componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (typeof Component.getDerivedStateFromProps !== 'function' && typeof prototype.getSnapshotBeforeUpdate !== 'function') {
    return Component;
  } // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.


  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;

  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }

  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }

  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }

  if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
    var componentName = Component.displayName || Component.name;
    var newApiName = typeof Component.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
    throw Error('Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + componentName + ' uses ' + newApiName + ' but also contains the following legacy lifecycles:' + (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') + (foundWillReceivePropsName !== null ? '\n  ' + foundWillReceivePropsName : '') + (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') + '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' + 'https://fb.me/react-async-component-lifecycle-hooks');
  } // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.


  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  } // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.


  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error('Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype');
    }

    prototype.componentWillUpdate = componentWillUpdate;
    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}
},{}],"node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":[function(require,module,exports) {
'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;

},{}],"node_modules/react-hot-loader/dist/react-hot-loader.development.js":[function(require,module,exports) {
'use strict';

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function (obj) { return typeof obj; }; } else { _typeof2 = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && _typeof2(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = require('react');

var React__default = _interopDefault(React);

var shallowEqual = _interopDefault(require('shallowequal'));

var levenshtein = _interopDefault(require('fast-levenshtein'));

var PropTypes = _interopDefault(require('prop-types'));

var defaultPolyfill = require('react-lifecycles-compat');

var defaultPolyfill__default = _interopDefault(defaultPolyfill);

var hoistNonReactStatic = _interopDefault(require('hoist-non-react-statics'));

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof2(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof2(call) === "object" || typeof call === "function") ? call : self;
};
/* eslint-disable no-underscore-dangle */


var isCompositeComponent = function isCompositeComponent(type) {
  return typeof type === 'function';
};

var getComponentDisplayName = function getComponentDisplayName(type) {
  var displayName = type.displayName || type.name;
  return displayName && displayName !== 'ReactComponent' ? displayName : 'Component';
};

var reactLifeCycleMountMethods = ['componentWillMount', 'componentDidMount'];

function isReactClass(Component) {
  return !!(Component.prototype && (React__default.Component.prototype.isPrototypeOf(Component.prototype) || // react 14 support
  Component.prototype.isReactComponent || Component.prototype.componentWillMount || Component.prototype.componentWillUnmount || Component.prototype.componentDidMount || Component.prototype.componentDidUnmount || Component.prototype.render));
}

function isReactClassInstance(Component) {
  return Component && isReactClass({
    prototype: Object.getPrototypeOf(Component)
  });
}

var getInternalInstance = function getInternalInstance(instance) {
  return instance._reactInternalFiber || // React 16
  instance._reactInternalInstance || // React 15
  null;
};

var updateInstance = function updateInstance(instance) {
  var updater = instance.updater,
      forceUpdate = instance.forceUpdate;

  if (typeof forceUpdate === 'function') {
    instance.forceUpdate();
  } else if (updater && typeof updater.enqueueForceUpdate === 'function') {
    updater.enqueueForceUpdate(instance);
  }
};

var isFragmentNode = function isFragmentNode(_ref) {
  var type = _ref.type;
  return React__default.Fragment && type === React__default.Fragment;
};

var ContextType = React__default.createContext ? React__default.createContext() : null;
var ConsumerType = ContextType && ContextType.Consumer.$$typeof;
var ProviderType = ContextType && ContextType.Provider.$$typeof;
var CONTEXT_CURRENT_VALUE = '_currentValue';

var isContextConsumer = function isContextConsumer(_ref2) {
  var type = _ref2.type;
  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.$$typeof === ConsumerType;
};

var isContextProvider = function isContextProvider(_ref3) {
  var type = _ref3.type;
  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.$$typeof === ProviderType;
};

var getContextProvider = function getContextProvider(type) {
  return type && type._context;
};

var generation = 1;

var increment = function increment() {
  return generation++;
};

var get$1 = function get() {
  return generation;
};

var PREFIX = '__reactstandin__';
var PROXY_KEY = PREFIX + 'key';
var GENERATION = PREFIX + 'proxyGeneration';
var REGENERATE_METHOD = PREFIX + 'regenerateByEval';
var UNWRAP_PROXY = PREFIX + 'getCurrent';
var CACHED_RESULT = PREFIX + 'cachedResult';
var PROXY_IS_MOUNTED = PREFIX + 'isMounted';
var configuration = {
  // Log level
  logLevel: 'error',
  // Allows using SFC without changes. leading to some components not updated
  pureSFC: false,
  // Allows SFC to be used, enables "intermediate" components used by Relay, should be disabled for Preact
  allowSFC: true,
  // Hook on babel component register.
  onComponentRegister: false
};
/* eslint-disable no-console */

var logger = {
  debug: function debug() {
    if (['debug'].indexOf(configuration.logLevel) !== -1) {
      var _console;

      (_console = console).debug.apply(_console, arguments);
    }
  },
  log: function log() {
    if (['debug', 'log'].indexOf(configuration.logLevel) !== -1) {
      var _console2;

      (_console2 = console).log.apply(_console2, arguments);
    }
  },
  warn: function warn() {
    if (['debug', 'log', 'warn'].indexOf(configuration.logLevel) !== -1) {
      var _console3;

      (_console3 = console).warn.apply(_console3, arguments);
    }
  },
  error: function error() {
    if (['debug', 'log', 'warn', 'error'].indexOf(configuration.logLevel) !== -1) {
      var _console4;

      (_console4 = console).error.apply(_console4, arguments);
    }
  }
};
/* eslint-disable no-eval, func-names */

function safeReactConstructor(Component, lastInstance) {
  try {
    if (lastInstance) {
      return new Component(lastInstance.props, lastInstance.context);
    }

    return new Component({}, {});
  } catch (e) {// some components, like Redux connect could not be created without proper context
  }

  return null;
}

function isNativeFunction(fn) {
  return typeof fn === 'function' ? fn.toString().indexOf('[native code]') > 0 : false;
}

var identity = function identity(a) {
  return a;
};

var indirectEval = eval;

var doesSupportClasses = function () {
  try {
    indirectEval('class Test {}');
    return true;
  } catch (e) {
    return false;
  }
}();

var ES6ProxyComponentFactory = doesSupportClasses && indirectEval('\n(function(InitialParent, postConstructionAction) {\n  return class ProxyComponent extends InitialParent {\n    constructor(props, context) {\n      super(props, context)\n      postConstructionAction.call(this)\n    }\n  }\n})\n');

var ES5ProxyComponentFactory = function ES5ProxyComponentFactory(InitialParent, postConstructionAction) {
  function ProxyComponent(props, context) {
    InitialParent.call(this, props, context);
    postConstructionAction.call(this);
  }

  ProxyComponent.prototype = Object.create(InitialParent.prototype);
  Object.setPrototypeOf(ProxyComponent, InitialParent);
  return ProxyComponent;
};

var proxyClassCreator = doesSupportClasses ? ES6ProxyComponentFactory : ES5ProxyComponentFactory;

function getOwnKeys(target) {
  return [].concat(Object.getOwnPropertyNames(target), Object.getOwnPropertySymbols(target));
}

function shallowStringsEqual(a, b) {
  for (var key in a) {
    if (String(a[key]) !== String(b[key])) {
      return false;
    }
  }

  return true;
}

function deepPrototypeUpdate(dest, source) {
  var deepDest = Object.getPrototypeOf(dest);
  var deepSrc = Object.getPrototypeOf(source);

  if (deepDest && deepSrc && deepSrc !== deepDest) {
    deepPrototypeUpdate(deepDest, deepSrc);
  }

  if (source.prototype && source.prototype !== dest.prototype) {
    dest.prototype = source.prototype;
  }
}

function safeDefineProperty(target, key, props) {
  try {
    Object.defineProperty(target, key, props);
  } catch (e) {
    logger.warn('Error while wrapping', key, ' -> ', e);
  }
}

var RESERVED_STATICS = ['length', 'displayName', 'name', 'arguments', 'caller', 'prototype', 'toString', 'valueOf', 'isStatelessFunctionalProxy', PROXY_KEY, UNWRAP_PROXY];

function transferStaticProps(ProxyComponent, savedDescriptors, PreviousComponent, NextComponent) {
  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {
    if (RESERVED_STATICS.indexOf(key) !== -1) {
      return;
    }

    var prevDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);
    var savedDescriptor = savedDescriptors[key];

    if (!shallowEqual(prevDescriptor, savedDescriptor)) {
      safeDefineProperty(NextComponent, key, prevDescriptor);
    }
  }); // Copy newly defined static methods and properties

  Object.getOwnPropertyNames(NextComponent).forEach(function (key) {
    if (RESERVED_STATICS.indexOf(key) !== -1) {
      return;
    }

    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(ProxyComponent, key);
    var savedDescriptor = savedDescriptors[key]; // Skip redefined descriptors

    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {
      safeDefineProperty(NextComponent, key, prevDescriptor);
      return;
    }

    if (prevDescriptor && !savedDescriptor) {
      safeDefineProperty(ProxyComponent, key, prevDescriptor);
      return;
    }

    var nextDescriptor = _extends({}, Object.getOwnPropertyDescriptor(NextComponent, key), {
      configurable: true
    });

    savedDescriptors[key] = nextDescriptor;
    safeDefineProperty(ProxyComponent, key, nextDescriptor);
  }); // Remove static methods and properties that are no longer defined

  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {
    if (RESERVED_STATICS.indexOf(key) !== -1) {
      return;
    } // Skip statics that exist on the next class


    if (NextComponent.hasOwnProperty(key)) {
      return;
    } // Skip non-configurable statics


    var proxyDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);

    if (proxyDescriptor && !proxyDescriptor.configurable) {
      return;
    }

    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(PreviousComponent, key);
    var savedDescriptor = savedDescriptors[key]; // Skip redefined descriptors

    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {
      return;
    }

    safeDefineProperty(ProxyComponent, key, {
      value: undefined
    });
  });
  return savedDescriptors;
}

function mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers) {
  var injectedCode = {};

  try {
    var nextInstance = safeReactConstructor(NextComponent, lastInstance);

    try {
      // Bypass babel class inheritance checking
      deepPrototypeUpdate(InitialComponent, NextComponent);
    } catch (e) {// It was ES6 class
    }

    var proxyInstance = safeReactConstructor(ProxyComponent, lastInstance);

    if (!nextInstance || !proxyInstance) {
      return injectedCode;
    }

    var mergedAttrs = _extends({}, proxyInstance, nextInstance);

    var hasRegenerate = proxyInstance[REGENERATE_METHOD];
    var ownKeys = getOwnKeys(Object.getPrototypeOf(ProxyComponent.prototype));
    Object.keys(mergedAttrs).forEach(function (key) {
      if (key.startsWith(PREFIX)) return;
      var nextAttr = nextInstance[key];
      var prevAttr = proxyInstance[key];

      if (nextAttr) {
        if (isNativeFunction(nextAttr) || isNativeFunction(prevAttr)) {
          // this is bound method
          var isSameArity = nextAttr.length === prevAttr.length;
          var existsInPrototype = ownKeys.indexOf(key) >= 0 || ProxyComponent.prototype[key];

          if ((isSameArity || !prevAttr) && existsInPrototype) {
            if (hasRegenerate) {
              injectedCode[key] = 'Object.getPrototypeOf(this)[\'' + key + '\'].bind(this)';
            } else {
              logger.warn('React Hot Loader:,', 'Non-controlled class', ProxyComponent.name, 'contains a new native or bound function ', key, nextAttr, '. Unable to reproduce');
            }
          } else {
            logger.warn('React Hot Loader:', 'Updated class ', ProxyComponent.name, 'contains native or bound function ', key, nextAttr, '. Unable to reproduce, use arrow functions instead.', '(arity: ' + nextAttr.length + '/' + prevAttr.length + ', proto: ' + (existsInPrototype ? 'yes' : 'no'));
          }

          return;
        }

        var nextString = String(nextAttr);
        var injectedBefore = injectedMembers[key];
        var isArrow = nextString.indexOf('=>') >= 0;
        var isFunction = nextString.indexOf('function') >= 0 || isArrow;
        var referToThis = nextString.indexOf('this') >= 0;

        if (nextString !== String(prevAttr) || injectedBefore && nextString !== String(injectedBefore) || isArrow && referToThis) {
          if (!hasRegenerate) {
            if (!isFunction) {
              // just copy prop over
              injectedCode[key] = nextAttr;
            } else {
              logger.warn('React Hot Loader:', ' Updated class ', ProxyComponent.name, 'had different code for', key, nextAttr, '. Unable to reproduce. Regeneration support needed.');
            }
          } else {
            injectedCode[key] = nextAttr;
          }
        }
      }
    });
  } catch (e) {
    logger.warn('React Hot Loader:', e);
  }

  return injectedCode;
}

function checkLifeCycleMethods(ProxyComponent, NextComponent) {
  try {
    var p1 = Object.getPrototypeOf(ProxyComponent.prototype);
    var p2 = NextComponent.prototype;
    reactLifeCycleMountMethods.forEach(function (key) {
      var d1 = Object.getOwnPropertyDescriptor(p1, key) || {
        value: p1[key]
      };
      var d2 = Object.getOwnPropertyDescriptor(p2, key) || {
        value: p2[key]
      };

      if (!shallowStringsEqual(d1, d2)) {
        logger.warn('React Hot Loader:', 'You did update', ProxyComponent.name, 's lifecycle method', key, '. Unable to repeat');
      }
    });
  } catch (e) {// Ignore errors
  }
}

function inject(target, currentGeneration, injectedMembers) {
  if (target[GENERATION] !== currentGeneration) {
    var hasRegenerate = !!target[REGENERATE_METHOD];
    Object.keys(injectedMembers).forEach(function (key) {
      try {
        if (hasRegenerate) {
          var usedThis = String(injectedMembers[key]).match(/_this([\d]+)/gi) || [];
          target[REGENERATE_METHOD](key, '(function REACT_HOT_LOADER_SANDBOX () {\n          var _this  = this; // common babel transpile\n          ' + usedThis.map(function (name) {
            return 'var ' + name + ' = this;';
          }) + '\n\n          return ' + injectedMembers[key] + ';\n          }).call(this)');
        } else {
          target[key] = injectedMembers[key];
        }
      } catch (e) {
        logger.warn('React Hot Loader: Failed to regenerate method ', key, ' of class ', target);
        logger.warn('got error', e);
      }
    });
    target[GENERATION] = currentGeneration;
  }
}

var has = Object.prototype.hasOwnProperty;
var proxies = new WeakMap();

var resetClassProxies = function resetClassProxies() {
  proxies = new WeakMap();
};

var blackListedClassMembers = ['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUnmount', 'hotComponentRender', 'getInitialState', 'getDefaultProps'];
var defaultRenderOptions = {
  componentWillRender: identity,
  componentDidUpdate: function componentDidUpdate(result) {
    return result;
  },
  componentDidRender: function componentDidRender(result) {
    return result;
  }
};

var defineClassMember = function defineClassMember(Class, methodName, methodBody) {
  return safeDefineProperty(Class.prototype, methodName, {
    configurable: true,
    writable: true,
    enumerable: false,
    value: methodBody
  });
};

var defineClassMembers = function defineClassMembers(Class, methods) {
  return Object.keys(methods).forEach(function (methodName) {
    return defineClassMember(Class, methodName, methods[methodName]);
  });
};

var setSFPFlag = function setSFPFlag(component, flag) {
  return safeDefineProperty(component, 'isStatelessFunctionalProxy', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: flag
  });
};

var copyMethodDescriptors = function copyMethodDescriptors(target, source) {
  if (source) {
    // it is possible to use `function-double` to construct an ideal clone, but does not make a sence
    var keys = Object.getOwnPropertyNames(source);
    keys.forEach(function (key) {
      return safeDefineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
    safeDefineProperty(target, 'toString', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: function toString() {
        return String(source);
      }
    });
  }

  return target;
};

function createClassProxy(InitialComponent, proxyKey, options) {
  var renderOptions = _extends({}, defaultRenderOptions, options); // Prevent double wrapping.
  // Given a proxy class, return the existing proxy managing it.


  var existingProxy = proxies.get(InitialComponent);

  if (existingProxy) {
    return existingProxy;
  }

  var CurrentComponent = void 0;
  var savedDescriptors = {};
  var injectedMembers = {};
  var proxyGeneration = 0;
  var classUpdatePostponed = null;
  var instancesCount = 0;
  var isFunctionalComponent = !isReactClass(InitialComponent);
  var lastInstance = null;

  function postConstructionAction() {
    this[GENERATION] = 0;
    lastInstance = this; // is there is an update pending

    if (classUpdatePostponed) {
      var callUpdate = classUpdatePostponed;
      classUpdatePostponed = null;
      callUpdate();
    } // As long we can't override constructor
    // every class shall evolve from a base class


    inject(this, proxyGeneration, injectedMembers);
  }

  function proxiedUpdate() {
    if (this) {
      inject(this, proxyGeneration, injectedMembers);
    }
  }

  function lifeCycleWrapperFactory(wrapperName) {
    var sideEffect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
    return copyMethodDescriptors(function wrappedMethod() {
      proxiedUpdate.call(this);
      sideEffect(this);

      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return !isFunctionalComponent && CurrentComponent.prototype[wrapperName] && CurrentComponent.prototype[wrapperName].apply(this, rest);
    }, InitialComponent.prototype && InitialComponent.prototype[wrapperName]);
  }

  function methodWrapperFactory(wrapperName, realMethod) {
    return copyMethodDescriptors(function wrappedMethod() {
      for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rest[_key2] = arguments[_key2];
      }

      return realMethod.apply(this, rest);
    }, realMethod);
  }

  var fakeBasePrototype = function fakeBasePrototype(Base) {
    return Object.getOwnPropertyNames(Base).filter(function (key) {
      return blackListedClassMembers.indexOf(key) === -1;
    }).filter(function (key) {
      var descriptor = Object.getOwnPropertyDescriptor(Base, key);
      return typeof descriptor.value === 'function';
    }).reduce(function (acc, key) {
      acc[key] = methodWrapperFactory(key, Base[key]);
      return acc;
    }, {});
  };

  var componentDidMount = lifeCycleWrapperFactory('componentDidMount', function (target) {
    target[PROXY_IS_MOUNTED] = true;
    instancesCount++;
  });
  var componentDidUpdate = lifeCycleWrapperFactory('componentDidUpdate', renderOptions.componentDidUpdate);
  var componentWillUnmount = lifeCycleWrapperFactory('componentWillUnmount', function (target) {
    target[PROXY_IS_MOUNTED] = false;
    instancesCount--;
  });

  function hotComponentRender() {
    // repeating subrender call to keep RENDERED_GENERATION up to date
    renderOptions.componentWillRender(this);
    proxiedUpdate.call(this);
    var result = void 0; // We need to use hasOwnProperty here, as the cached result is a React node
    // and can be null or some other falsy value.

    if (has.call(this, CACHED_RESULT)) {
      result = this[CACHED_RESULT];
      delete this[CACHED_RESULT];
    } else if (isFunctionalComponent) {
      result = CurrentComponent(this.props, this.context);
    } else {
      result = (CurrentComponent.prototype.render || this.render).apply(this, // eslint-disable-next-line prefer-rest-params
      arguments);
    }

    return renderOptions.componentDidRender.call(this, result);
  }

  function proxiedRender() {
    renderOptions.componentWillRender(this);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return hotComponentRender.call.apply(hotComponentRender, [this].concat(args));
  }

  var defineProxyMethods = function defineProxyMethods(Proxy) {
    var Base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    defineClassMembers(Proxy, _extends({}, fakeBasePrototype(Base), {
      render: proxiedRender,
      hotComponentRender: hotComponentRender,
      componentDidMount: componentDidMount,
      componentDidUpdate: componentDidUpdate,
      componentWillUnmount: componentWillUnmount
    }));
  };

  var _ProxyFacade = void 0;

  var ProxyComponent = null;
  var proxy = void 0;

  if (!isFunctionalComponent) {
    // Component
    ProxyComponent = proxyClassCreator(InitialComponent, postConstructionAction);
    defineProxyMethods(ProxyComponent, InitialComponent.prototype);
    _ProxyFacade = ProxyComponent;
  } else if (!configuration.allowSFC) {
    // SFC Converted to component. Does not support returning precreated instances from render.
    ProxyComponent = proxyClassCreator(React.Component, postConstructionAction);
    defineProxyMethods(ProxyComponent);
    _ProxyFacade = ProxyComponent;
  } else {
    // SFC
    // This function only gets called for the initial mount. The actual
    // rendered component instance will be the return value.
    // eslint-disable-next-line func-names
    _ProxyFacade = function ProxyFacade(props, context) {
      var result = CurrentComponent(props, context); // simple SFC, could continue to be SFC

      if (configuration.pureSFC) {
        if (!CurrentComponent.contextTypes) {
          if (!_ProxyFacade.isStatelessFunctionalProxy) {
            setSFPFlag(_ProxyFacade, true);
          }

          return renderOptions.componentDidRender(result);
        }
      }

      setSFPFlag(_ProxyFacade, false); // This is a Relay-style container constructor. We can't do the prototype-
      // style wrapping for this as we do elsewhere, so just we just pass it
      // through as-is.

      if (isReactClassInstance(result)) {
        ProxyComponent = null; // Relay lazily sets statics like getDerivedStateFromProps on initial
        // render in lazy construction, so we need to do the same here.

        transferStaticProps(_ProxyFacade, savedDescriptors, null, CurrentComponent);
        return result;
      } // Otherwise, it's a normal functional component. Build the real proxy
      // and use it going forward.


      ProxyComponent = proxyClassCreator(React.Component, postConstructionAction);
      defineProxyMethods(ProxyComponent);
      var determinateResult = new ProxyComponent(props, context); // Cache the initial render result so we don't call the component function
      // a second time for the initial render.

      determinateResult[CACHED_RESULT] = result;
      return determinateResult;
    };
  }

  function get$$1() {
    return _ProxyFacade;
  }

  function getCurrent() {
    return CurrentComponent;
  }

  safeDefineProperty(_ProxyFacade, UNWRAP_PROXY, {
    configurable: false,
    writable: false,
    enumerable: false,
    value: getCurrent
  });
  safeDefineProperty(_ProxyFacade, PROXY_KEY, {
    configurable: false,
    writable: false,
    enumerable: false,
    value: proxyKey
  });
  safeDefineProperty(_ProxyFacade, 'toString', {
    configurable: true,
    writable: false,
    enumerable: false,
    value: function toString() {
      return String(CurrentComponent);
    }
  });

  function update(NextComponent) {
    if (typeof NextComponent !== 'function') {
      throw new Error('Expected a constructor.');
    }

    if (NextComponent === CurrentComponent) {
      return;
    } // Prevent proxy cycles


    var existingProxy = proxies.get(NextComponent);

    if (existingProxy) {
      return;
    }

    isFunctionalComponent = !isReactClass(NextComponent);
    proxies.set(NextComponent, proxy);
    proxyGeneration++; // Save the next constructor so we call it

    var PreviousComponent = CurrentComponent;
    CurrentComponent = NextComponent; // Try to infer displayName

    var displayName = getComponentDisplayName(CurrentComponent);
    safeDefineProperty(_ProxyFacade, 'displayName', {
      configurable: true,
      writable: false,
      enumerable: true,
      value: displayName
    });

    if (ProxyComponent) {
      safeDefineProperty(ProxyComponent, 'name', {
        value: displayName
      });
    }

    savedDescriptors = transferStaticProps(_ProxyFacade, savedDescriptors, PreviousComponent, NextComponent);
    if (isFunctionalComponent || !ProxyComponent) ;else {
      var classHotReplacement = function classHotReplacement() {
        checkLifeCycleMethods(ProxyComponent, NextComponent);
        Object.setPrototypeOf(ProxyComponent.prototype, NextComponent.prototype);
        defineProxyMethods(ProxyComponent, NextComponent.prototype);

        if (proxyGeneration > 1) {
          injectedMembers = mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers);
        }
      }; // Was constructed once


      if (instancesCount > 0) {
        classHotReplacement();
      } else {
        classUpdatePostponed = classHotReplacement;
      }
    }
  }

  update(InitialComponent);

  var dereference = function dereference() {
    proxies.delete(InitialComponent);
    proxies.delete(_ProxyFacade);
    proxies.delete(CurrentComponent);
  };

  proxy = {
    get: get$$1,
    update: update,
    dereference: dereference,
    getCurrent: function getCurrent() {
      return CurrentComponent;
    }
  };
  proxies.set(InitialComponent, proxy);
  proxies.set(_ProxyFacade, proxy);
  safeDefineProperty(proxy, UNWRAP_PROXY, {
    configurable: false,
    writable: false,
    enumerable: false,
    value: getCurrent
  });
  return proxy;
}

var proxiesByID = void 0;
var blackListedProxies = void 0;
var registeredComponents = void 0;
var idsByType = void 0;
var elementCount = 0;
var renderOptions = {};

var generateTypeId = function generateTypeId() {
  return 'auto-' + elementCount++;
};

var getIdByType = function getIdByType(type) {
  return idsByType.get(type);
};

var isProxyType = function isProxyType(type) {
  return type[PROXY_KEY];
};

var getProxyById = function getProxyById(id) {
  return proxiesByID[id];
};

var getProxyByType = function getProxyByType(type) {
  return getProxyById(getIdByType(type));
};

var registerComponent = function registerComponent(type) {
  return registeredComponents.set(type, 1);
};

var isRegisteredComponent = function isRegisteredComponent(type) {
  return registeredComponents.has(type);
};

var setStandInOptions = function setStandInOptions(options) {
  renderOptions = options;
};

var updateProxyById = function updateProxyById(id, type) {
  // Remember the ID.
  idsByType.set(type, id);

  if (!proxiesByID[id]) {
    proxiesByID[id] = createClassProxy(type, id, renderOptions);
  } else {
    proxiesByID[id].update(type);
  }

  return proxiesByID[id];
};

var createProxyForType = function createProxyForType(type) {
  return getProxyByType(type) || updateProxyById(generateTypeId(), type);
};

var isTypeBlacklisted = function isTypeBlacklisted(type) {
  return blackListedProxies.has(type);
};

var blacklistByType = function blacklistByType(type) {
  return blackListedProxies.set(type, true);
};

var resetProxies = function resetProxies() {
  proxiesByID = {};
  idsByType = new WeakMap();
  blackListedProxies = new WeakMap();
  registeredComponents = new WeakMap();
  resetClassProxies();
};

resetProxies();
var tune = {
  allowSFC: false
};

var preactAdapter = function preactAdapter(instance, resolveType) {
  var oldHandler = instance.options.vnode;
  Object.assign(configuration, tune);

  instance.options.vnode = function (vnode) {
    vnode.nodeName = resolveType(vnode.nodeName);

    if (oldHandler) {
      oldHandler(vnode);
    }
  };
};
/* eslint-disable no-use-before-define */


function _resolveType(type) {
  if (!isCompositeComponent(type) || isTypeBlacklisted(type) || isProxyType(type)) return type;
  var proxy = reactHotLoader.disableProxyCreation ? getProxyByType(type) : createProxyForType(type);
  return proxy ? proxy.get() : type;
}

var reactHotLoader = {
  register: function register(type, uniqueLocalName, fileName) {
    if (isCompositeComponent(type) && typeof uniqueLocalName === 'string' && uniqueLocalName && typeof fileName === 'string' && fileName) {
      var id = fileName + '#' + uniqueLocalName;
      var proxy = getProxyById(id);

      if (proxy && proxy.getCurrent() !== type) {
        // component got replaced. Need to reconcile
        increment();

        if (isTypeBlacklisted(type) || isTypeBlacklisted(proxy.getCurrent())) {
          logger.error('React-hot-loader: Cold component', uniqueLocalName, 'at', fileName, 'has been updated');
        }
      }

      if (configuration.onComponentRegister) {
        configuration.onComponentRegister(type, uniqueLocalName, fileName);
      }

      updateProxyById(id, type);
      registerComponent(type);
    }
  },
  reset: function reset() {
    resetProxies();
  },
  preact: function preact(instance) {
    preactAdapter(instance, _resolveType);
  },
  resolveType: function resolveType(type) {
    return _resolveType(type);
  },
  patch: function patch(React$$1) {
    if (!React$$1.createElement.isPatchedByReactHotLoader) {
      var originalCreateElement = React$$1.createElement; // Trick React into rendering a proxy so that
      // its state is preserved when the class changes.
      // This will update the proxy if it's for a known type.

      React$$1.createElement = function (type) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return originalCreateElement.apply(undefined, [_resolveType(type)].concat(args));
      };

      React$$1.createElement.isPatchedByReactHotLoader = true;
    }

    if (!React$$1.createFactory.isPatchedByReactHotLoader) {
      // Patch React.createFactory to use patched createElement
      // because the original implementation uses the internal,
      // unpatched ReactElement.createElement
      React$$1.createFactory = function (type) {
        var factory = React$$1.createElement.bind(null, type);
        factory.type = type;
        return factory;
      };

      React$$1.createFactory.isPatchedByReactHotLoader = true;
    }

    if (!React$$1.Children.only.isPatchedByReactHotLoader) {
      var originalChildrenOnly = React$$1.Children.only; // Use the same trick as React.createElement

      React$$1.Children.only = function (children) {
        return originalChildrenOnly(_extends({}, children, {
          type: _resolveType(children.type)
        }));
      };

      React$$1.Children.only.isPatchedByReactHotLoader = true;
    }

    reactHotLoader.reset();
  },
  disableProxyCreation: false
};
/* eslint-disable no-underscore-dangle */

function pushStack(stack, node) {
  stack.type = node.type;
  stack.children = [];
  stack.instance = typeof node.type === 'function' ? node.stateNode : stack;

  if (!stack.instance) {
    stack.instance = {
      SFC_fake: stack.type,
      props: {},
      render: function render() {
        return stack.type(stack.instance.props);
      }
    };
  }
}

function hydrateFiberStack(node, stack) {
  pushStack(stack, node);

  if (node.child) {
    var child = node.child;

    do {
      var childStack = {};
      hydrateFiberStack(child, childStack);
      stack.children.push(childStack);
      child = child.sibling;
    } while (child);
  }
}
/* eslint-disable no-underscore-dangle */


function pushState(stack, type, instance) {
  stack.type = type;
  stack.children = [];
  stack.instance = instance || stack;

  if (typeof type === 'function' && type.isStatelessFunctionalProxy) {
    // In React 15 SFC is wrapped by component. We have to detect our proxies and change the way it works
    stack.instance = {
      SFC_fake: type,
      props: {},
      render: function render() {
        return type(stack.instance.props);
      }
    };
  }
}

function hydrateLegacyStack(node, stack) {
  if (node._currentElement) {
    pushState(stack, node._currentElement.type, node._instance || stack);
  }

  if (node._renderedComponent) {
    var childStack = {};
    hydrateLegacyStack(node._renderedComponent, childStack);
    stack.children.push(childStack);
  } else if (node._renderedChildren) {
    Object.keys(node._renderedChildren).forEach(function (key) {
      var childStack = {};
      hydrateLegacyStack(node._renderedChildren[key], childStack);
      stack.children.push(childStack);
    });
  }
}
/* eslint-disable no-underscore-dangle */


function getReactStack(instance) {
  var rootNode = getInternalInstance(instance);
  var stack = {};

  if (rootNode) {
    // React stack
    var isFiber = typeof rootNode.tag === 'number';

    if (isFiber) {
      hydrateFiberStack(rootNode, stack);
    } else {
      hydrateLegacyStack(rootNode, stack);
    }
  }

  return stack;
} // some `empty` names, React can autoset display name to...


var UNDEFINED_NAMES = {
  Unknown: true,
  Component: true
};
var renderStack = [];

var stackReport = function stackReport() {
  var rev = renderStack.slice().reverse();
  logger.warn('in', rev[0].name, rev);
};

var emptyMap = new Map();

var stackContext = function stackContext() {
  return (renderStack[renderStack.length - 1] || {}).context || emptyMap;
};

var areNamesEqual = function areNamesEqual(a, b) {
  return a === b || UNDEFINED_NAMES[a] && UNDEFINED_NAMES[b];
};

var shouldUseRenderMethod = function shouldUseRenderMethod(fn) {
  return fn && (isReactClassInstance(fn) || fn.SFC_fake);
};

var isFunctional = function isFunctional(fn) {
  return typeof fn === 'function';
};

var isArray = function isArray(fn) {
  return Array.isArray(fn);
};

var asArray = function asArray(a) {
  return isArray(a) ? a : [a];
};

var getTypeOf = function getTypeOf(type) {
  if (isReactClass(type)) return 'ReactComponent';
  if (isFunctional(type)) return 'StatelessFunctional';
  return 'Fragment'; // ?
};

var filterNullArray = function filterNullArray(a) {
  if (!a) return [];
  return a.filter(function (x) {
    return !!x;
  });
};

var unflatten = function unflatten(a) {
  return a.reduce(function (acc, a) {
    if (Array.isArray(a)) {
      acc.push.apply(acc, unflatten(a));
    } else {
      acc.push(a);
    }

    return acc;
  }, []);
};

var getElementType = function getElementType(child) {
  return child.type[UNWRAP_PROXY] ? child.type[UNWRAP_PROXY]() : child.type;
};

var haveTextSimilarity = function haveTextSimilarity(a, b) {
  return (// equal or slight changed
    a === b || levenshtein.get(a, b) < a.length * 0.2
  );
};

var equalClasses = function equalClasses(a, b) {
  var prototypeA = a.prototype;
  var prototypeB = Object.getPrototypeOf(b.prototype);
  var hits = 0;
  var misses = 0;
  var comparisons = 0;
  Object.getOwnPropertyNames(prototypeA).forEach(function (key) {
    var descriptorA = Object.getOwnPropertyDescriptor(prototypeA, key);
    var valueA = descriptorA && (descriptorA.value || descriptorA.get || descriptorA.set);
    var descriptorB = Object.getOwnPropertyDescriptor(prototypeB, key);
    var valueB = descriptorB && (descriptorB.value || descriptorB.get || descriptorB.set);

    if (typeof valueA === 'function' && key !== 'constructor') {
      comparisons++;

      if (haveTextSimilarity(String(valueA), String(valueB))) {
        hits++;
      } else {
        misses++;

        if (key === 'render') {
          misses++;
        }
      }
    }
  }); // allow to add or remove one function

  return hits > 0 && misses <= 1 || comparisons === 0;
};

var areSwappable = function areSwappable(a, b) {
  // both are registered components and have the same name
  if (getIdByType(b) && getIdByType(a) === getIdByType(b)) {
    return true;
  }

  if (getTypeOf(a) !== getTypeOf(b)) {
    return false;
  }

  if (isReactClass(a)) {
    return areNamesEqual(getComponentDisplayName(a), getComponentDisplayName(b)) && equalClasses(a, b);
  }

  if (isFunctional(a)) {
    var nameA = getComponentDisplayName(a);
    return areNamesEqual(nameA, getComponentDisplayName(b)) && nameA !== 'Component' || haveTextSimilarity(String(a), String(b));
  }

  return false;
};

var render = function render(component) {
  if (!component) {
    return [];
  }

  if (shouldUseRenderMethod(component)) {
    // not calling real render method to prevent call recursion.
    // stateless components does not have hotComponentRender
    return component.hotComponentRender ? component.hotComponentRender() : component.render();
  }

  if (isArray(component)) {
    return component.map(render);
  }

  if (component.children) {
    return component.children;
  }

  return [];
};

var NO_CHILDREN = {
  children: []
};

var mapChildren = function mapChildren(children, instances) {
  return {
    children: children.filter(function (c) {
      return c;
    }).map(function (child, index) {
      if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || child.isMerged) {
        return child;
      }

      var instanceLine = instances[index] || {};
      var oldChildren = asArray(instanceLine.children || []);

      if (Array.isArray(child)) {
        return _extends({
          type: null
        }, mapChildren(child, oldChildren));
      }

      var newChildren = asArray(child.props && child.props.children || child.children || []);
      var nextChildren = child.type !== 'function' && oldChildren.length && mapChildren(newChildren, oldChildren);
      return _extends({
        nextProps: child.props,
        isMerged: true
      }, instanceLine, nextChildren || {}, {
        type: child.type
      });
    })
  };
};

var mergeInject = function mergeInject(a, b, instance) {
  if (a && !Array.isArray(a)) {
    return mergeInject([a], b);
  }

  if (b && !Array.isArray(b)) {
    return mergeInject(a, [b]);
  }

  if (!a || !b) {
    return NO_CHILDREN;
  }

  if (a.length === b.length) {
    return mapChildren(a, b);
  } // in some cases (no confidence here) B could contain A except null children
  // in some cases - could not.
  // this depends on React version and the way you build component.


  var nonNullA = filterNullArray(a);

  if (nonNullA.length === b.length) {
    return mapChildren(nonNullA, b);
  }

  var flatA = unflatten(nonNullA);
  var flatB = unflatten(b);

  if (flatA.length === flatB.length) {
    return mapChildren(flatA, flatB);
  }

  if (flatB.length === 0 && flatA.length === 1 && _typeof(flatA[0]) !== 'object') ;else {
    logger.warn('React-hot-loader: unable to merge ', a, 'and children of ', instance);
    stackReport();
  }
  return NO_CHILDREN;
};

var transformFlowNode = function transformFlowNode(flow) {
  return flow.reduce(function (acc, node) {
    if (node && isFragmentNode(node)) {
      if (node.props && node.props.children) {
        return [].concat(acc, filterNullArray(asArray(node.props.children)));
      }

      if (node.children) {
        return [].concat(acc, filterNullArray(asArray(node.children)));
      }
    }

    return [].concat(acc, [node]);
  }, []);
};

var scheduledUpdates = [];
var scheduledUpdate = 0;

var flushScheduledUpdates = function flushScheduledUpdates() {
  var instances = scheduledUpdates;
  scheduledUpdates = [];
  scheduledUpdate = 0;
  instances.forEach(function (instance) {
    return instance[PROXY_IS_MOUNTED] && updateInstance(instance);
  });
};

var unscheduleUpdate = function unscheduleUpdate(instance) {
  scheduledUpdates = scheduledUpdates.filter(function (inst) {
    return inst !== instance;
  });
};

var scheduleInstanceUpdate = function scheduleInstanceUpdate(instance) {
  scheduledUpdates.push(instance);

  if (!scheduledUpdate) {
    scheduledUpdate = setTimeout(flushScheduledUpdates);
  }
};

var hotReplacementRender = function hotReplacementRender(instance, stack) {
  if (isReactClassInstance(instance)) {
    var type = getElementType(stack);
    renderStack.push({
      name: getComponentDisplayName(type),
      type: type,
      props: stack.instance.props,
      context: stackContext()
    });
  }

  var flow = transformFlowNode(filterNullArray(asArray(render(instance))));
  var children = stack.children;
  flow.forEach(function (child, index) {
    var stackChild = children[index];

    var next = function next(instance) {
      // copy over props as long new component may be hidden inside them
      // child does not have all props, as long some of them can be calculated on componentMount.
      var realProps = instance.props;

      var nextProps = _extends({}, realProps, child.nextProps || {}, child.props || {});

      if (isReactClassInstance(instance) && instance.componentWillUpdate) {
        // Force-refresh component (bypass redux renderedComponent)
        instance.componentWillUpdate(_extends({}, realProps), instance.state);
      }

      instance.props = nextProps;
      hotReplacementRender(instance, stackChild);
      instance.props = realProps;
    }; // text node


    if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || !stackChild || !stackChild.instance) {
      if (stackChild && stackChild.children && stackChild.children.length) {
        logger.error('React-hot-loader: reconciliation failed', 'could not dive into [', child, '] while some elements are still present in the tree.');
        stackReport();
      }

      return;
    }

    if (_typeof(child.type) !== _typeof(stackChild.type)) {
      // Portals could generate undefined !== null
      if (child.type && stackChild.type) {
        logger.warn('React-hot-loader: got ', child.type, 'instead of', stackChild.type);
        stackReport();
      }

      return;
    } // React context


    if (isContextConsumer(child)) {
      try {
        next({
          children: (child.props ? child.props.children : child.children[0])(stackContext().get(child.type) || child.type[CONTEXT_CURRENT_VALUE])
        });
      } catch (e) {// do nothing, yet
      }
    } else if (typeof child.type !== 'function') {
      // React
      var childName = child.type ? getComponentDisplayName(child.type) : 'empty';
      var extraContext = stackContext();

      if (isContextProvider(child)) {
        extraContext = new Map(extraContext);
        extraContext.set(getContextProvider(child.type), _extends({}, child.nextProps || {}, child.props || {}).value);
        childName = 'ContextProvider';
      }

      renderStack.push({
        name: childName,
        type: child.type,
        props: stack.instance.props,
        context: extraContext
      });
      next( // move types from render to the instances of hydrated tree
      mergeInject(transformFlowNode(asArray(child.props ? child.props.children : child.children)), stackChild.instance.children, stackChild.instance));
      renderStack.pop();
    } else {
      if (child.type === stackChild.type) {
        next(stackChild.instance);
      } else {
        // unwrap proxy
        var childType = getElementType(child);

        if (!stackChild.type[PROXY_KEY]) {
          if (isTypeBlacklisted(stackChild.type)) {
            logger.warn('React-hot-loader: cold element got updated ', stackChild.type);
            return;
          }
          /* eslint-disable no-console */


          logger.error('React-hot-loader: fatal error caused by ', stackChild.type, ' - no instrumentation found. ', 'Please require react-hot-loader before React. More in troubleshooting.');
          stackReport();
          throw new Error('React-hot-loader: wrong configuration');
        }

        if (isRegisteredComponent(childType) || isRegisteredComponent(stackChild.type)) ;else if (areSwappable(childType, stackChild.type)) {
          // they are both registered, or have equal code/displayname/signature
          // update proxy using internal PROXY_KEY
          updateProxyById(stackChild.type[PROXY_KEY], childType);
          next(stackChild.instance);
        } else {
          logger.warn('React-hot-loader: a ' + getComponentDisplayName(childType) + ' was found where a ' + getComponentDisplayName(stackChild) + ' was expected.\n          ' + childType);
          stackReport();
        }
      }

      scheduleInstanceUpdate(stackChild.instance);
    }
  });

  if (isReactClassInstance(instance)) {
    renderStack.pop();
  }
};

var hotComponentCompare = function hotComponentCompare(oldType, newType) {
  if (oldType === newType) {
    return true;
  }

  if (areSwappable(newType, oldType)) {
    getProxyByType(newType[UNWRAP_PROXY]()).dereference();
    updateProxyById(oldType[PROXY_KEY], newType[UNWRAP_PROXY]());
    updateProxyById(newType[PROXY_KEY], oldType[UNWRAP_PROXY]());
    return true;
  }

  return false;
};

var hotReplacementRender$1 = function (instance, stack) {
  try {
    // disable reconciler to prevent upcoming components from proxying.
    reactHotLoader.disableProxyCreation = true;
    renderStack = [];
    hotReplacementRender(instance, stack);
  } catch (e) {
    logger.warn('React-hot-loader: reconcilation failed due to error', e);
  } finally {
    reactHotLoader.disableProxyCreation = false;
  }
};

var reconcileHotReplacement = function reconcileHotReplacement(ReactInstance) {
  return hotReplacementRender$1(ReactInstance, getReactStack(ReactInstance));
};

var RENDERED_GENERATION = 'REACT_HOT_LOADER_RENDERED_GENERATION';

var renderReconciler = function renderReconciler(target, force) {
  // we are not inside parent reconcilation
  var currentGeneration = get$1();
  var componentGeneration = target[RENDERED_GENERATION];
  target[RENDERED_GENERATION] = currentGeneration;

  if (!reactHotLoader.disableProxyCreation) {
    if ((componentGeneration || force) && componentGeneration !== currentGeneration) {
      reconcileHotReplacement(target);
      return true;
    }
  }

  return false;
};

function asyncReconciledRender(target) {
  renderReconciler(target, false);
}

function proxyWrapper(element) {
  // post wrap on post render
  if (!reactHotLoader.disableProxyCreation) {
    unscheduleUpdate(this);
  }

  if (!element) {
    return element;
  }

  if (Array.isArray(element)) {
    return element.map(proxyWrapper);
  }

  if (typeof element.type === 'function') {
    var proxy = getProxyByType(element.type);

    if (proxy) {
      return _extends({}, element, {
        type: proxy.get()
      });
    }
  }

  return element;
}

setStandInOptions({
  componentWillRender: asyncReconciledRender,
  componentDidRender: proxyWrapper,
  componentDidUpdate: flushScheduledUpdates
});

var AppContainer = function (_React$Component) {
  inherits(AppContainer, _React$Component);

  function AppContainer() {
    var _temp, _this, _ret;

    classCallCheck(this, AppContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      error: null,
      // eslint-disable-next-line react/no-unused-state
      generation: 0
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  AppContainer.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.generation !== get$1()) {
      // Hot reload is happening.
      return {
        error: null,
        generation: get$1()
      };
    }

    return null;
  };

  AppContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(prevProps, prevState) {
    // Don't update the component if the state had an error and still has one.
    // This allows to break an infinite loop of error -> render -> error -> render
    // https://github.com/gaearon/react-hot-loader/issues/696
    if (prevState.error && this.state.error) {
      return false;
    }

    return true;
  };

  AppContainer.prototype.componentDidCatch = function componentDidCatch(error) {
    logger.error(error);
    this.setState({
      error: error
    });
  };

  AppContainer.prototype.render = function render() {
    var error = this.state.error;

    if (this.props.errorReporter && error) {
      return React__default.createElement(this.props.errorReporter, {
        error: error
      });
    }

    return React__default.Children.only(this.props.children);
  };

  return AppContainer;
}(React__default.Component);

AppContainer.propTypes = {
  children: function children(props) {
    if (React__default.Children.count(props.children) !== 1) {
      return new Error('Invalid prop "children" supplied to AppContainer. ' + 'Expected a single React element with your app’s root component, e.g. <App />.');
    }

    return undefined;
  },
  errorReporter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) //  trying first react-lifecycles-compat.polyfill, then trying react-lifecycles-compat, which could be .default

};
var realPolyfill = defaultPolyfill.polyfill || defaultPolyfill__default;
realPolyfill(AppContainer);
var openedModules = {};
var hotModules = {};

var createHotModule = function createHotModule() {
  return {
    instances: [],
    updateTimeout: 0
  };
};

var hotModule = function hotModule(moduleId) {
  if (!hotModules[moduleId]) {
    hotModules[moduleId] = createHotModule();
  }

  return hotModules[moduleId];
};

var isOpened = function isOpened(sourceModule) {
  return sourceModule && !!openedModules[sourceModule.id];
};

var enter = function enter(sourceModule) {
  if (sourceModule && sourceModule.id) {
    openedModules[sourceModule.id] = true;
  } else {
    logger.warn('React-hot-loader: no `module` variable found. Do you shadow system variable?');
  }
};

var leave = function leave(sourceModule) {
  if (sourceModule && sourceModule.id) {
    delete openedModules[sourceModule.id];
  }
};
/* eslint-disable camelcase, no-undef */


var requireIndirect = typeof __webpack_require__ !== 'undefined' ? __webpack_require__ : require;
/* eslint-enable */

var createHoc = function createHoc(SourceComponent, TargetComponent) {
  hoistNonReactStatic(TargetComponent, SourceComponent);
  TargetComponent.displayName = 'HotExported' + getComponentDisplayName(SourceComponent);
  return TargetComponent;
};

var makeHotExport = function makeHotExport(sourceModule) {
  var updateInstances = function updateInstances() {
    var module = hotModule(sourceModule.id);
    clearTimeout(module.updateTimeout);
    module.updateTimeout = setTimeout(function () {
      try {
        requireIndirect(sourceModule.id);
      } catch (e) {// just swallow
      }

      module.instances.forEach(function (inst) {
        return inst.forceUpdate();
      });
    });
  };

  if (sourceModule.hot) {
    // Mark as self-accepted for Webpack
    // Update instances for Parcel
    sourceModule.hot.accept(updateInstances); // Webpack way

    if (sourceModule.hot.addStatusHandler) {
      if (sourceModule.hot.status() === 'idle') {
        sourceModule.hot.addStatusHandler(function (status) {
          if (status === 'apply') {
            updateInstances();
          }
        });
      }
    }
  }
};

var hot = function hot(sourceModule) {
  if (!sourceModule || !sourceModule.id) {
    // this is fatal
    throw new Error('React-hot-loader: `hot` could not find the `id` property in the `module` you have provided');
  }

  var moduleId = sourceModule.id;
  var module = hotModule(moduleId);
  makeHotExport(sourceModule); // TODO: Ensure that all exports from this file are react components.

  return function (WrappedComponent) {
    // register proxy for wrapped component
    reactHotLoader.register(WrappedComponent, getComponentDisplayName(WrappedComponent), 'RHL' + moduleId);
    return createHoc(WrappedComponent, function (_Component) {
      inherits(ExportedComponent, _Component);

      function ExportedComponent() {
        classCallCheck(this, ExportedComponent);
        return possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      ExportedComponent.prototype.componentDidMount = function componentDidMount() {
        module.instances.push(this);
      };

      ExportedComponent.prototype.componentWillUnmount = function componentWillUnmount() {
        var _this2 = this;

        if (isOpened(sourceModule)) {
          var componentName = getComponentDisplayName(WrappedComponent);
          logger.error('React-hot-loader: Detected AppContainer unmount on module \'' + moduleId + '\' update.\n' + ('Did you use "hot(' + componentName + ')" and "ReactDOM.render()" in the same file?\n') + ('"hot(' + componentName + ')" shall only be used as export.\n') + 'Please refer to "Getting Started" (https://github.com/gaearon/react-hot-loader/).');
        }

        module.instances = module.instances.filter(function (a) {
          return a !== _this2;
        });
      };

      ExportedComponent.prototype.render = function render() {
        return React__default.createElement(AppContainer, null, React__default.createElement(WrappedComponent, this.props));
      };

      return ExportedComponent;
    }(React.Component));
  };
};

var getProxyOrType = function getProxyOrType(type) {
  var proxy = getProxyByType(type);
  return proxy ? proxy.get() : type;
};

var areComponentsEqual = function areComponentsEqual(a, b) {
  return getProxyOrType(a) === getProxyOrType(b);
};

var compareOrSwap = function compareOrSwap(oldType, newType) {
  return hotComponentCompare(oldType, newType);
};

var cold = function cold(type) {
  blacklistByType(type);
  return type;
};

var setConfig = function setConfig(config) {
  return Object.assign(configuration, config);
};

reactHotLoader.patch(React__default);
exports.default = reactHotLoader;
exports.AppContainer = AppContainer;
exports.hot = hot;
exports.enterModule = enter;
exports.leaveModule = leave;
exports.areComponentsEqual = areComponentsEqual;
exports.compareOrSwap = compareOrSwap;
exports.cold = cold;
exports.setConfig = setConfig;
},{"react":"node_modules/react/index.js","shallowequal":"node_modules/shallowequal/index.js","fast-levenshtein":"node_modules/fast-levenshtein/levenshtein.js","prop-types":"node_modules/prop-types/index.js","react-lifecycles-compat":"node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js","hoist-non-react-statics":"node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"}],"node_modules/react-hot-loader/index.js":[function(require,module,exports) {
'use strict';

var evalAllowed = false;

try {
  eval('evalAllowed = true');
} catch (e) {} // eval not allowed due to CSP
// RHL needs setPrototypeOf to operate Component inheritance, and eval to patch methods


var platformSupported = !!Object.setPrototypeOf && evalAllowed;

if (!module.hot || "development" === 'production' || !platformSupported) {
  if (module.hot) {
    // we are not in prod mode, but RHL could not be activated
    console.warn('React-Hot-Loaded is not supported in this environment');
  }

  module.exports = require('./dist/react-hot-loader.production.min.js');
} else {
  module.exports = require('./dist/react-hot-loader.development.js');
}
},{"./dist/react-hot-loader.production.min.js":"node_modules/react-hot-loader/dist/react-hot-loader.production.min.js","./dist/react-hot-loader.development.js":"node_modules/react-hot-loader/dist/react-hot-loader.development.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/vendors.js":[function(require,module,exports) {
require("_bundle_loader")(require.resolve("babel-polyfill"));

require("_bundle_loader")(require.resolve('promise-polyfill'));

require("_bundle_loader")(require.resolve('raf/polyfill'));

require("_bundle_loader")(require.resolve('whatwg-fetch'));

require("_bundle_loader")(require.resolve('react-hot-loader'));

require("_bundle_loader")(require.resolve('sweetalert'));

require("_bundle_loader")(require.resolve('react'));

require("_bundle_loader")(require.resolve('react-dom'));
},{"_bundle_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js","babel-polyfill":[["lib.391168ac.js","node_modules/babel-polyfill/lib/index.js"],"lib.391168ac.map","node_modules/babel-polyfill/lib/index.js"],"promise-polyfill":[["src.7aaf042a.js","node_modules/promise-polyfill/src/index.js"],"src.7aaf042a.map","node_modules/promise-polyfill/src/index.js"],"raf/polyfill":[["polyfill.cde8445e.js","node_modules/raf/polyfill.js"],"polyfill.cde8445e.map","node_modules/raf/polyfill.js"],"whatwg-fetch":[["fetch.6e6c81fd.js","node_modules/whatwg-fetch/fetch.js"],"fetch.6e6c81fd.map","node_modules/whatwg-fetch/fetch.js"],"react-hot-loader":[["src.a2b27638.js","src/index.js"],"src.a2b27638.map","src.a2b27638.css","node_modules/react-hot-loader/index.js"],"sweetalert":[["sweetalert.min.0c0104f6.js","node_modules/sweetalert/dist/sweetalert.min.js"],"sweetalert.min.0c0104f6.map","node_modules/sweetalert/dist/sweetalert.min.js"],"react":[["src.a2b27638.js","src/index.js"],"src.a2b27638.map","src.a2b27638.css","node_modules/react/index.js"],"react-dom":[["react-dom.29872971.js","node_modules/react-dom/index.js"],"react-dom.29872971.map","node_modules/react-dom/index.js"]}],"src/Components/helpers/fetch-helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callApi = callApi;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

/**
 * Asynchronous function
 * @param {string} uri - Endpoint being called
 * @param {Object} [options={}] - Request Options Object to set headers, method, body, etc
 * @returns {string|Object} - Resolves data being requested or Rejects Error
 */
function callApi(_x) {
  return _callApi.apply(this, arguments);
}
/**
 * Calls FETCH API and expects Text or JSON response
 * @param {string} uri -  Endpoint being called
 * @param {Object} [options={}] - Options being passed to Fetch API
 * @returns {Object|string} - will return JSON if contentType is json or String if not, and an Error Object if call failes
 */


function _callApi() {
  _callApi = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(uri) {
    var options,
        data,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.prev = 1;
            _context.next = 4;
            return loadData(uri, options);

          case 4:
            data = _context.sent;
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            throw new Error(_context.t0.message);

          case 11:
            return _context.abrupt("return", data);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));
  return _callApi.apply(this, arguments);
}

function loadData(_x2) {
  return _loadData.apply(this, arguments);
}

function _loadData() {
  _loadData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(uri) {
    var options,
        response,
        contentType,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            _context2.next = 3;
            return fetch(uri, options);

          case 3:
            response = _context2.sent;
            contentType = response.headers.get("content-type");

            if (!(response.status >= 200 && response.status < 300)) {
              _context2.next = 13;
              break;
            }

            if (!(contentType && contentType.includes('application/json'))) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", response.json());

          case 10:
            return _context2.abrupt("return", response.text());

          case 11:
            _context2.next = 14;
            break;

          case 13:
            return _context2.abrupt("return", getErrorBody(response, contentType).then(function (body) {
              return Promise.reject(body);
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loadData.apply(this, arguments);
}

function getErrorBody(_x3) {
  return _getErrorBody.apply(this, arguments);
}

function _getErrorBody() {
  _getErrorBody = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(response) {
    var contentType,
        body,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            contentType = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 'text';

            if (!contentType.includes('application/json')) {
              _context3.next = 7;
              break;
            }

            _context3.next = 4;
            return response.json();

          case 4:
            body = _context3.sent;
            _context3.next = 10;
            break;

          case 7:
            _context3.next = 9;
            return response.text();

          case 9:
            body = _context3.sent;

          case 10:
            return _context3.abrupt("return", body);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _getErrorBody.apply(this, arguments);
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(callApi, "callApi", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/helpers/fetch-helpers.js");
  reactHotLoader.register(loadData, "loadData", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/helpers/fetch-helpers.js");
  reactHotLoader.register(getErrorBody, "getErrorBody", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/helpers/fetch-helpers.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js"}],"node_modules/babel-plugin-react-css-modules/dist/browser/getClassName.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_HANDLE_MISSING_STYLENAME_OPTION = 'throw';

var isNamespacedStyleName = function isNamespacedStyleName(styleName) {
  return styleName.indexOf('.') !== -1;
};

var getClassNameForNamespacedStyleName = function getClassNameForNamespacedStyleName(styleName, styleModuleImportMap, handleMissingStyleNameOption) {
  // Note:
  // Do not use the desctructing syntax with Babel.
  // Desctructing adds _slicedToArray helper.
  var styleNameParts = styleName.split('.');
  var importName = styleNameParts[0];
  var moduleName = styleNameParts[1];
  var handleMissingStyleName = handleMissingStyleNameOption || DEFAULT_HANDLE_MISSING_STYLENAME_OPTION;

  if (!moduleName) {
    if (handleMissingStyleName === 'throw') {
      throw new Error('Invalid style name: ' + styleName);
    } else if (handleMissingStyleName === 'warn') {
      // eslint-disable-next-line no-console
      console.warn('Invalid style name: ' + styleName);
    } else {
      return null;
    }
  }

  if (!styleModuleImportMap[importName]) {
    if (handleMissingStyleName === 'throw') {
      throw new Error('CSS module import does not exist: ' + importName);
    } else if (handleMissingStyleName === 'warn') {
      // eslint-disable-next-line no-console
      console.warn('CSS module import does not exist: ' + importName);
    } else {
      return null;
    }
  }

  if (!styleModuleImportMap[importName][moduleName]) {
    if (handleMissingStyleName === 'throw') {
      throw new Error('CSS module does not exist: ' + moduleName);
    } else if (handleMissingStyleName === 'warn') {
      // eslint-disable-next-line no-console
      console.warn('CSS module does not exist: ' + moduleName);
    } else {
      return null;
    }
  }

  return styleModuleImportMap[importName][moduleName];
};

exports.default = function (styleNameValue, styleModuleImportMap, options) {
  var styleModuleImportMapKeys = Object.keys(styleModuleImportMap);
  var handleMissingStyleName = options && options.handleMissingStyleName || DEFAULT_HANDLE_MISSING_STYLENAME_OPTION;
  return styleNameValue.split(' ').filter(function (styleName) {
    return styleName;
  }).map(function (styleName) {
    if (isNamespacedStyleName(styleName)) {
      return getClassNameForNamespacedStyleName(styleName, styleModuleImportMap, handleMissingStyleName);
    }

    if (styleModuleImportMapKeys.length === 0) {
      throw new Error('Cannot use styleName attribute for style name \'' + styleName + '\' without importing at least one stylesheet.');
    }

    if (styleModuleImportMapKeys.length > 1) {
      throw new Error('Cannot use anonymous style name \'' + styleName + '\' with more than one stylesheet import.');
    }

    var styleModuleMap = styleModuleImportMap[styleModuleImportMapKeys[0]];

    if (!styleModuleMap[styleName]) {
      if (handleMissingStyleName === 'throw') {
        throw new Error('Could not resolve the styleName \'' + styleName + '\'.');
      }

      if (handleMissingStyleName === 'warn') {
        // eslint-disable-next-line no-console
        console.warn('Could not resolve the styleName \'' + styleName + '\'.');
      }
    }

    return styleModuleMap[styleName];
  }).filter(function (className) {
    // Remove any styles which could not be found (if handleMissingStyleName === 'ignore')
    return className;
  }).join(' ');
};
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/Components/styles/tabs.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "tab-headers": "tab-headers__1VkgL",
  "tab-headers__submenu": "tab-headers__submenu__171P4",
  "tab-headers__submenu--tertiary": "tab-headers__submenu--tertiary__akazl",
  "tab-headers__header": "tab-headers__header__1rF3m",
  "tab-headers__header--disabled": "tab-headers__header--disabled__FfTSo",
  "tab-headers__header--active": "tab-headers__header--active__3PQn0",
  "tab-body": "tab-body__NBDFj"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/TabHead.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabHead;

var _getClassName2 = _interopRequireDefault(require("babel-plugin-react-css-modules/dist/browser/getClassName"));

var _react = _interopRequireDefault(require("react"));

var _tabs = _interopRequireDefault(require("./styles/tabs.css"));

var _sweetalert = _interopRequireDefault(require("sweetalert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _styleModuleImportMap = {
  "tabs": {
    "tab-headers": "tab-headers__1VkgL",
    "tab-headers__submenu": "tab-headers__submenu__171P4",
    "tab-headers__submenu--tertiary": "tab-headers__submenu--tertiary__akazl",
    "tab-headers__header": "tab-headers__header__1rF3m",
    "tab-headers__header--disabled": "tab-headers__header--disabled__FfTSo",
    "tab-headers__header--active": "tab-headers__header--active__3PQn0",
    "tab-body": "tab-body__NBDFj"
  }
};

if (module.hot) {
  module.hot.accept("./styles/tabs.css", function () {
    require("./styles/tabs.css");
  });
}

function TabHead(props) {
  var content = props.content.split(" ")[0];
  var isActive = content.includes(props.mode); // console.log({isActive, content, mode: props.mode})

  return _react.default.createElement("div", {
    onClick: function onClick(e) {
      e.preventDefault();

      if (props.enabled) {
        props.handleClick(content);
      } else if (props.mode !== "List") {
        clickAlert().then(function (update) {
          props.toggleBtnEnable(update);

          if (update) {
            props.handleClick(content);
          }
        });
      }
    },
    className: (0, _getClassName2.default)("tabs.tab-headers__header".concat(isActive ? " tabs.tab-headers__header--active" : "").concat(props.enabled ? "" : " tabs.tab-headers__header--disabled"), _styleModuleImportMap, {
      "handleMissingStyleName": "warn"
    })
  }, props.content);
}

function clickAlert() {
  return _clickAlert.apply(this, arguments);
}

function _clickAlert() {
  _clickAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var willEdit;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _sweetalert.default)({
              title: "Are you sure?",
              text: 'Leaving this page without saving may result in lost data or a broken form. Are you ready to leave this page with unsaved changes anyway?',
              icon: "warning",
              buttons: true,
              dangerMode: true
            });

          case 2:
            willEdit = _context.sent;

            if (!willEdit) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", true);

          case 7:
            return _context.abrupt("return", false);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _clickAlert.apply(this, arguments);
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TabHead, "TabHead", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/TabHead.js");
  reactHotLoader.register(clickAlert, "clickAlert", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/TabHead.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","babel-plugin-react-css-modules/dist/browser/getClassName":"node_modules/babel-plugin-react-css-modules/dist/browser/getClassName.js","react":"node_modules/react/index.js","./styles/tabs.css":"src/Components/styles/tabs.css","sweetalert":"node_modules/sweetalert/dist/sweetalert.min.js"}],"src/Components/helpers/getDefaultValues.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultValues = getDefaultValues;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

/**
 * Takes in an object and fills with default values or returns existing value
 * @param {Boolean} editMode - only read existing config if in editMode
 * @param {String} type - "fonts, colors, spacing, email, form"
 * @param {Object} config - config file from DB or empty Object
 * @returns {Object} - config filled with defaults if values are missing
 */
function getDefaultValues(editMode, type, config) {
  var defaultValues, errors;

  switch (type.toLowerCase()) {
    case "fonts":
      defaultValues = {
        "--form-font-family": editMode && config.hasOwnProperty("--form-font-family") ? config["--form-font-family"] : "proxima-nova, Arial, sans-serif",
        "--form-font-style": editMode && config.hasOwnProperty("--form-font-style") ? config["--form-font-style"] : "normal",
        "--form-font-weight": editMode && config.hasOwnProperty("--form-font-weight") ? config["--form-font-weight"] : "400",
        "--italic-font-family": editMode && config.hasOwnProperty("--italic-font-family") ? config["--italic-font-family"] : "proxima-nova, Arial, sans-serif",
        "--italic-font-style": editMode && config.hasOwnProperty("--italic-font-style") ? config["--italic-font-style"] : "italic",
        "--italic-font-weight": editMode && config.hasOwnProperty("--italic-font-weight") ? config["--italic-font-weight"] : "400",
        "--semibold-font-family": editMode && config.hasOwnProperty("--semibold-font-family") ? config["--semibold-font-family"] : "proxima-nova, Arial, sans-serif",
        "--semibold-font-style": editMode && config.hasOwnProperty("--semibold-font-style") ? config["--semibold-font-style"] : "normal",
        "--semibold-font-weight": editMode && config.hasOwnProperty("--semibold-font-weight") ? config["--semibold-font-weight"] : "600",
        "--semibold-italic-font-family": editMode && config.hasOwnProperty("--semibold-italic-font-family") ? config["--semibold-italic-font-family"] : "proxima-nova, Arial, sans-serif",
        "--semibold-italic-font-style": editMode && config.hasOwnProperty("--semibold-italic-font-style") ? config["--semibold-italic-font-style"] : "italic",
        "--semibold-italic-font-weight": editMode && config.hasOwnProperty("--semibold-italic-font-weight") ? config["--semibold-italic-font-weight"] : "600",
        "--bold-font-family": editMode && config.hasOwnProperty("--bold-font-family") ? config["--bold-font-family"] : "proxima-nova, Arial, sans-serif",
        "--bold-font-style": editMode && config.hasOwnProperty("--bold-font-style") ? config["--bold-font-style"] : "normal",
        "--bold-font-weight": editMode && config.hasOwnProperty("--bold-font-weight") ? config["--bold-font-weight"] : "700",
        "--bold-italic-font-family": editMode && config.hasOwnProperty("--bold-italic-font-family") ? config["--bold-italic-font-family"] : "proxima-nova, Arial, sans-serif",
        "--bold-italic-font-style": editMode && config.hasOwnProperty("--bold-italic-font-style") ? config["--bold-italic-font-style"] : "italic",
        "--bold-italic-font-weight": editMode && config.hasOwnProperty("--bold-italic-font-weight") ? config["--bold-italic-font-weight"] : "700"
      };
      var keys = config ? Object.keys(config) : [];
      var externalFonts = keys.length ? keys.filter(function (k) {
        return k.includes("externalFont");
      }) : [];
      externalFonts.forEach(function (externalFont) {
        return defaultValues[externalFont] = config[externalFont];
      });
      break;

    case "colors":
      defaultValues = {
        "--primary-color": editMode && config.hasOwnProperty("--primary-color") ? config["--primary-color"] : "#1775BC",
        "--form-bg-color": editMode && config.hasOwnProperty("--form-bg-color") ? config["--form-bg-color"] : '#fff',
        "--form-border-color": editMode && config.hasOwnProperty("--form-border-color") ? config["--form-border-color"] : 'transparent',
        "--form-text-color": editMode && config.hasOwnProperty("--form-text-color") ? config["--form-text-color"] : '#091d44',
        "--panel-bg-color": editMode && config.hasOwnProperty("--panel-bg-color") ? config["--panel-bg-color"] : '#f5f5f5',
        "--panel-border-color": editMode && config.hasOwnProperty("--panel-border-color") ? config["--panel-border-color"] : '#888',
        "--heading-color": editMode && config.hasOwnProperty("--heading-color") ? config["--heading-color"] : "#313131",
        "--label-color": editMode && config.hasOwnProperty("--label-color") ? config["--label-color"] : "#105fa5",
        "--error-color": editMode && config.hasOwnProperty("--error-color") ? config["--error-color"] : "crimson",
        "--input-bg-color": editMode && config.hasOwnProperty("--input-bg-color") ? config["--input-bg-color"] : '#fff',
        "--input-border-color": editMode && config.hasOwnProperty("--input-border-color") ? config["--input-border-color"] : '#ccc',
        "--input-text-color": editMode && config.hasOwnProperty("--input-text-color") ? config["--input-text-color"] : '#091d44',
        "--hover-bg-color": editMode && config.hasOwnProperty("--hover-bg-color") ? config["--hover-bg-color"] : '#fff',
        "--hover-border-color": editMode && config.hasOwnProperty("--hover-border-color") ? config["--hover-border-color"] : '#eb4d97',
        "--focus-box-shadow": editMode && config.hasOwnProperty("--focus-box-shadow") ? config["--focus-box-shadow"] : "rgba(235, 77, 151, .6)",
        "--placeholder-color": editMode && config.hasOwnProperty("--placeholder-color") ? config["--placeholder-color"] : '#7F8C9A',
        "--link-color": editMode && config.hasOwnProperty("--link-color") ? config["--link-color"] : "#1775BC",
        "--link-hover-color": editMode && config.hasOwnProperty("--link-hover-color") ? config["--link-hover-color"] : "#66afe9",
        "--btn-text-color": editMode && config.hasOwnProperty("--btn-text-color") ? config["--btn-text-color"] : '#fff'
      };
      break;

    case "spacing":
      defaultValues = {
        "--form-border-radius": editMode && config.hasOwnProperty("--form-border-radius") ? config["--form-border-radius"] : "20px",
        "--form-border-width": editMode && config.hasOwnProperty("--form-border-width") ? config["--form-border-width"] : '2px',
        "--form-padding": editMode && config.hasOwnProperty("--form-padding") ? config["--form-padding"] : '0',
        "--panel-border-radius": editMode && config.hasOwnProperty("--panel-border-radius") ? config["--panel-border-radius"] : "0",
        "--panel-border-width": editMode && config.hasOwnProperty("--panel-border-width") ? config["--panel-border-width"] : '0',
        "--panel-padding": editMode && config.hasOwnProperty("--panel-padding") ? config["--panel-padding"] : '10px',
        "--panel-space-between": editMode && config.hasOwnProperty("--panel-space-between") ? config["--panel-space-between"] : "20px"
      };
      break;

    case "emails":
      defaultValues = {
        fields: {
          header: editMode && config.hasOwnProperty('header') ? config.header : "<body><table width='553' border='0' align='center' cellpadding='0' cellspacing='5'><tr><td height='43' align='left' valign='top'><img src='http://www.cbn.com/images/CBN-header-email.gif' alt='CBN.com' width='553' height='41' /></td></tr><tr><td align='left' valign='top'>",
          single: editMode && config.hasOwnProperty('single') ? config.single : "<p>Dear #FirstName#,</p><p>Thank you for giving to CBN. It is with the help of friends like you that CBN is able to take  the Gospel to the nations - and people are hearing a message of hope in Jesus  Christ.&nbsp; Every day, through <em>The 700 Club</em>,  CBN News, and other CBN programs, the truth of God's Word is being broadcast to  precious people through satellite, terrestrial television, and cable, as well  as the Internet.</p><p>Thank you for your  help in making all of this possible. May God richly bless you for your  faithfulness to Him.</p><p>In Christ,<br /><img src='http://www.cbn.com/images/PRobertson_signature.jpg' alt='Signature' width='124' height='49' /><br />Pat Robertson<br /></p><p><a href='http://www1.cbn.com/cbn-partners'>Find out more about CBN Ministries</a></p><hr />",
          monthly: editMode && config.hasOwnProperty('monthly') ? config.monthly : "<p>Dear #FirstName#,</p><p>Thank you for giving to CBN. It is with the help of friends like you that CBN is able to take  the Gospel to the nations - and people are hearing a message of hope in Jesus  Christ.&nbsp; Every day, through <em>The 700 Club</em>,  CBN News, and other CBN programs, the truth of God's Word is being broadcast to  precious people through satellite, terrestrial television, and cable, as well  as the Internet.</p><p>Thank you for your  help in making all of this possible. May God richly bless you for your  faithfulness to Him.</p><p>In Christ,<br /><img src='http://www.cbn.com/images/PRobertson_signature.jpg' alt='Signature' width='124' height='49' /><br />Pat Robertson<br /></p><p><a href='http://www1.cbn.com/cbn-partners'>Find out more about CBN Ministries</a></p><hr />",
          product: editMode && config.hasOwnProperty('product') ? config.product : "<p>Dear #FirstName#,</p><p>Thank you for giving to CBN. It is with the help of friends like you that CBN is able to take  the Gospel to the nations - and people are hearing a message of hope in Jesus  Christ.&nbsp; Every day, through <em>The 700 Club</em>,  CBN News, and other CBN programs, the truth of God's Word is being broadcast to  precious people through satellite, terrestrial television, and cable, as well  as the Internet.</p><p>Thank you for your  help in making all of this possible. May God richly bless you for your  faithfulness to Him.</p><p>In Christ,<br /><img src='http://www.cbn.com/images/PRobertson_signature.jpg' alt='Signature' width='124' height='49' /><br />Pat Robertson<br /></p><p><a href='http://www1.cbn.com/cbn-partners'>Find out more about CBN Ministries</a></p><hr />"
        },
        errors: {
          header: '',
          single: '',
          monthly: '',
          product: '',
          formError: ''
        }
      };
      break;

    case "settings":
      defaultValues = {
        fields: {
          thankYouUrl: editMode && config.hasOwnProperty("thankYouUrl") ? config.thankYouUrl : '',
          AddContactYN: editMode && config.hasOwnProperty("AddContactYN") ? config.AddContactYN : "Y",
          ContactSource: editMode && config.hasOwnProperty("ContactSource") ? config.ContactSource : '',
          SectionName: editMode && config.hasOwnProperty("SectionName") ? config.SectionName : '',
          ActivityName: editMode && config.hasOwnProperty("ActivityName") ? config.ActivityName : '',
          MotivationText: editMode && config.hasOwnProperty("MotivationText") ? config.MotivationText : '042712',
          form_status: config.form_status
        },
        errors: {
          thankYouUrl: '',
          AddContactYN: '',
          ContactSource: '',
          SectionName: '',
          ActivityName: '',
          MotivationText: '',
          formError: '',
          form_status: ''
        }
      };
      break;

    case "name/address":
      defaultValues = {
        fields: {
          getMiddleName: editMode && config.hasOwnProperty("getMiddleName") ? config.getMiddleName : false,
          getSuffix: editMode && config.hasOwnProperty("getSuffix") ? config.getSuffix : false,
          getSpouseInfo: editMode && config.hasOwnProperty("getSpouseInfo") ? config.getSpouseInfo : false,
          getPhone: editMode && config.hasOwnProperty("getPhone") ? config.getPhone : true,
          international: editMode && config.hasOwnProperty("international") ? config.international : true,
          shipping: editMode && config.hasOwnProperty("shipping") ? config.shipping : true
        },
        errors: {
          formError: ''
        }
      };
      break;

    case "gifts":
      defaultValues = {
        fields: {
          showGivingArray: editMode && config.hasOwnProperty("showGivingArray") ? config.showGivingArray : true,
          monthlyOption: editMode && config.hasOwnProperty("monthlyOption") ? config.monthlyOption : true,
          singleOption: editMode && config.hasOwnProperty("singleOption") ? config.singleOption : true,
          monthlyAmounts: editMode && config.hasOwnProperty("monthlyAmounts") ? _toConsumableArray(config.monthlyAmounts) : [],
          singleAmounts: editMode && config.hasOwnProperty("singleAmounts") ? _toConsumableArray(config.singleAmounts) : [],
          defaultOption: editMode && config.hasOwnProperty("defaultOption") ? config.defaultOption : "",
          defaultAmount: editMode && config.hasOwnProperty("defaultAmount") ? config.defaultAmount : -1
        },
        errors: {
          showGivingArray: '',
          monthlyOption: '',
          singleOption: '',
          monthlyAmounts: '',
          singleAmounts: '',
          defaultOption: '',
          defaultAmount: ''
        }
      };

      if (editMode) {
        for (var i = 0; i < config.monthlyAmounts.length; i++) {
          defaultValues.fields["monthlyAmt-" + i] = config.monthlyAmounts[i];
          defaultValues.errors["monthlyAmt-" + i] = '';
        }

        for (var j = 0; j < config.singleAmounts.length; j++) {
          defaultValues.fields["singleAmt-" + j] = config.singleAmounts[j];
          defaultValues.errors["singleAmt-" + j] = '';
        }
      }

      break;

    case "products":
      errors = {
        addProducts: '',
        numProducts: '',
        products: [],
        additionalGift: {
          "display": '',
          "additionalGiftMessage": '',
          "DetailDescription": '',
          "DetailCprojMail": '',
          "DetailName": ''
        }
      };

      if (editMode) {
        for (var _i = 0; _i < config.products.length; _i++) {
          errors.products.push({
            productTitle: '',
            productMessage: '',
            productImgUrl: '',
            DetailName: '',
            DetailCprojMail: '',
            DetailCprojCredit: '',
            DetailDescription: '',
            PledgeAmt: ''
          });
        }
      }

      defaultValues = {
        fields: {
          addProducts: editMode && config.hasOwnProperty("numProducts") ? config.numProducts > 0 : false,
          numProducts: editMode && config.hasOwnProperty("products") ? config.products.length : 0,
          products: editMode && config.hasOwnProperty("products") ? _toConsumableArray(config.products) : [],
          "additionalGift": editMode && config.hasOwnProperty("additionalGift") ? _extends({}, config.additionalGift) : {
            "display": false,
            "additionalGiftMessage": "",
            "DetailDescription": "",
            "DetailCprojCredit": "",
            "DetailCprojMail": "",
            "DetailName": ""
          }
        },
        errors: errors
      };
      break;

    case "funds":
      errors = {
        addFunds: '',
        numFunds: '',
        funds: []
      };

      if (editMode) {
        for (var _i2 = 0; _i2 < config.funds.length; _i2++) {
          errors.funds.push({
            fundTitle: '',
            fundDescription: '',
            DetailName: '',
            DetailCprojMail: '',
            DetailCprojCredit: '',
            DetailDescription: ''
          });
        }
      }

      defaultValues = {
        fields: {
          addFunds: editMode && config.hasOwnProperty("numFunds") ? config.numFunds > 0 : false,
          numFunds: editMode && config.hasOwnProperty("funds") ? config.funds.length : 0,
          funds: editMode && config.hasOwnProperty("funds") ? _toConsumableArray(config.funds) : []
        },
        errors: errors
      };
      break;

    case "subscriptions":
      errors = {
        subscriptions: []
      };

      if (editMode) {
        for (var _i3 = 0; _i3 < config.subscriptions.length; _i3++) {
          errors.subscriptions.push({
            key: '',
            value: ''
          });
        }
      }

      defaultValues = {
        fields: {
          subscriptions: editMode && config.hasOwnProperty("subscriptions") ? _toConsumableArray(config.subscriptions) : []
        },
        errors: errors
      };
      break;
  }

  return defaultValues;
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getDefaultValues, "getDefaultValues", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/helpers/getDefaultValues.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js"}],"src/Components/styles/flex.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "-ms-flex": "flex__2SHge",
  "flex": "flex__2SHge",
  "flex-row": "flex-row__M7mg4",
  "flex-center": "flex-center__yyA4g",
  "flex-around": "flex-around___Gjak",
  "flex-between": "flex-between__2MQaD",
  "flex-left": "flex-left__2XM1d",
  "flex-start": "flex-start__2Ga6n",
  "flex-end": "flex-end__Cg2Gv",
  "flex-row-reverse": "flex-row-reverse__3dS2V",
  "flex-axes-center": "flex-axes-center__gx3gz",
  "flex-column": "flex-column__3YwsY",
  "-ms-flex-wrap": "flex-wrap__3nXfa",
  "flex-wrap": "flex-wrap__3nXfa",
  "-ms-flex-positive": "flex-grow__1RrI1",
  "flex-grow": "flex-grow__1RrI1",
  "flex-no-grow": "flex-no-grow__2xRX_",
  "-ms-flex-negative": "flex-shrink__3Yf-r",
  "flex-shrink": "flex-shrink__3Yf-r"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/styles/input.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "form-input": "form-input__Pw4hm",
  "form-group": "form-group__1p2D2",
  "form-group--Title": "form-group--Title__1Kt14",
  "form-group--Firstname": "form-group--Firstname__3aawj",
  "form-group--Lastname": "form-group--Lastname__1pq8z",
  "form-group--State": "form-group--State__2AmVh",
  "form-group--Country": "form-group--Country__FSpCS",
  "form-group--Phone": "form-group--Phone__2yPCA",
  "form-group--Email": "form-group--Email__2kzB7",
  "form-control": "form-control__3koCO",
  "textarea__large": "textarea__large__1hfZD",
  "error": "error__3YGLT",
  "form-group--City": "form-group--City__1iMUI",
  "form-group--Zip": "form-group--Zip__16GDe"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/styles/error.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "error": "error__32APg",
  "amount-error": "amount-error__3Nc_3"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/styles/form.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "form-wrapper": "form-wrapper__2a0fw",
  "fieldset": "fieldset__3xxg-",
  "fieldset__bordered": "fieldset__bordered__3MgwP",
  "form-header": "form-header__34R5N",
  "divider-title": "divider-title__1eXF8",
  "form-header--small": "form-header--small__GmxBS",
  "form-header__subheader": "form-header__subheader__3FWLj",
  "cc-img": "cc-img__1dRYR",
  "line": "line__1moVv",
  "form-row": "form-row__2dOBD",
  "form-btn--wrapper": "form-btn--wrapper__176A4",
  "-ms-flex-wrap": "flex-wrap__1rTS-",
  "flex-wrap": "flex-wrap__1rTS-",
  "form-info": "form-info__3Welr",
  "form-code": "form-code__1MNHp",
  "code-block": "code-block__Yd3XK",
  "form-msg": "form-msg__28n2S",
  "error": "error__1TlOt",
  "amount-error": "amount-error__3oLo2",
  "submit-error": "submit-error__fI5EQ",
  "submit-row": "submit-row__3WlWC",
  "submit-button": "submit-button__23Pfl",
  "form-btn": "form-btn__aTROS",
  "invalid": "invalid__1JtXL",
  "monthly-radio": "monthly-radio__1dy5Z",
  "form-status-radio": "form-status-radio__2wgQK",
  "table": "table__2izRV",
  "table-head": "table-head__3aOby",
  "table-row": "table-row__suM-a",
  "table-row__headers": "table-row__headers__1Gt68",
  "table-row__cells": "table-row__cells__2cY5Z"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/FormButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormButton;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

function FormButton(props) {
  var handleClick = function handleClick(e) {
    e.preventDefault();
    props.handleClick(props.ctx);
  };

  return _react.default.createElement("div", {
    className: "flex__2SHge flex-row__M7mg4 flex-center__yyA4g flex-axes-center__gx3gz form-btn--wrapper__176A4"
  }, _react.default.createElement("button", {
    disabled: props.submitting,
    onClick: handleClick,
    className: "form-btn__aTROS"
  }, props.val));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormButton, "FormButton", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FormButton.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css"}],"src/Components/ListForms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getClassName2 = _interopRequireDefault(require("babel-plugin-react-css-modules/dist/browser/getClassName"));

var _react = _interopRequireWildcard(require("react"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _input = _interopRequireDefault(require("./styles/input.css"));

var _error = _interopRequireDefault(require("./styles/error.css"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _sweetalert = _interopRequireDefault(require("sweetalert"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _styleModuleImportMap = {
  "flex": {
    "flex": "flex__2SHge",
    "flex-row": "flex-row__M7mg4",
    "flex-center": "flex-center__yyA4g",
    "flex-around": "flex-around___Gjak",
    "flex-between": "flex-between__2MQaD",
    "flex-left": "flex-left__2XM1d",
    "flex-start": "flex-start__2Ga6n",
    "flex-end": "flex-end__Cg2Gv",
    "flex-row-reverse": "flex-row-reverse__3dS2V",
    "flex-axes-center": "flex-axes-center__gx3gz",
    "flex-column": "flex-column__3YwsY",
    "flex-wrap": "flex-wrap__3nXfa",
    "flex-grow": "flex-grow__1RrI1",
    "flex-no-grow": "flex-no-grow__2xRX_",
    "flex-shrink": "flex-shrink__3Yf-r"
  },
  "input": {
    "form-input": "form-input__Pw4hm",
    "form-group": "form-group__1p2D2",
    "form-group--Title": "form-group--Title__1Kt14",
    "form-group--Firstname": "form-group--Firstname__3aawj",
    "form-group--Lastname": "form-group--Lastname__1pq8z",
    "form-group--State": "form-group--State__2AmVh",
    "form-group--Country": "form-group--Country__FSpCS",
    "form-group--Phone": "form-group--Phone__2yPCA",
    "form-group--Email": "form-group--Email__2kzB7",
    "form-control": "form-control__3koCO",
    "textarea__large": "textarea__large__1hfZD",
    "error": "error__3YGLT",
    "form-group--City": "form-group--City__1iMUI",
    "form-group--Zip": "form-group--Zip__16GDe"
  },
  "error": {
    "error": "error__32APg",
    "amount-error": "amount-error__3Nc_3"
  },
  "form": {
    "form-wrapper": "form-wrapper__2a0fw",
    "fieldset": "fieldset__3xxg-",
    "fieldset__bordered": "fieldset__bordered__3MgwP",
    "form-header": "form-header__34R5N",
    "divider-title": "divider-title__1eXF8",
    "form-header--small": "form-header--small__GmxBS",
    "form-header__subheader": "form-header__subheader__3FWLj",
    "cc-img": "cc-img__1dRYR",
    "line": "line__1moVv",
    "form-row": "form-row__2dOBD",
    "form-btn--wrapper": "form-btn--wrapper__176A4",
    "flex-wrap": "flex-wrap__1rTS-",
    "form-info": "form-info__3Welr",
    "form-code": "form-code__1MNHp",
    "code-block": "code-block__Yd3XK",
    "form-msg": "form-msg__28n2S",
    "error": "error__1TlOt",
    "amount-error": "amount-error__3oLo2",
    "submit-error": "submit-error__fI5EQ",
    "submit-row": "submit-row__3WlWC",
    "submit-button": "submit-button__23Pfl",
    "form-btn": "form-btn__aTROS",
    "invalid": "invalid__1JtXL",
    "monthly-radio": "monthly-radio__1dy5Z",
    "form-status-radio": "form-status-radio__2wgQK",
    "table": "table__2izRV",
    "table-head": "table-head__3aOby",
    "table-row": "table-row__suM-a",
    "table-row__headers": "table-row__headers__1Gt68",
    "table-row__cells": "table-row__cells__2cY5Z"
  }
};

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/error.css", function () {
    require("./styles/error.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/input.css", function () {
    require("./styles/input.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

var ListForms =
/*#__PURE__*/
function (_Component) {
  _inherits(ListForms, _Component);

  function ListForms(props) {
    var _this;

    _classCallCheck(this, ListForms);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListForms).call(this, props));
    _this.keyField = _react.default.createRef();
    _this.state = {
      submitting: false,
      k: props.k,
      base: props.base,
      list: _toConsumableArray(props.formList),
      inputValue: props.k,
      inputDisabled: props.k != '' ? false : true,
      error: '',
      allowEdit: props.k != '' ? false : true,
      saveMethod: 'POST',
      stored: false
    };
    _this.handleButtonClick = _this.handleButtonClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleEditApiKey = _this.handleEditApiKey.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ListForms, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.tabFunctions.getExistingFormInfo();
    }
  }, {
    key: "handleButtonClick",
    value: function handleButtonClick(ctx) {
      var _this2 = this;

      this.setState({
        submitting: true
      }, function () {
        _this2.props.tabFunctions.toggleBtnEnable(false);

        if (ctx.type == "Edit" && ctx.name == "apiKey") {
          _this2.handleEditApiKey();

          _this2.setState({
            submitting: false
          }, function () {
            return _this2.props.tabFunctions.toggleBtnEnable(true);
          });
        } else if (ctx.type == "Save" && ctx.name == "apiKey") {
          var method = _this2.state.saveMethod;

          _this2.props.tabFunctions.setApiKey(e, _this2.state.inputValue, method).then(function (success) {
            if (success) {
              _this2.setState({
                stored: true,
                inputDisabled: true,
                allowEdit: false,
                submitting: false
              });
            } else {
              _this2.setState({
                error: "Unable to Save",
                submitting: false
              });
            }

            _this2.props.tabFunctions.toggleBtnEnable(true);
          });
        } else {
          _this2.props.tabFunctions.toggleBtnEnable(true);

          _this2.props.tabFunctions.setAdminMode(ctx.type, ctx.val);
        }
      });
    }
  }, {
    key: "handleEditApiKey",
    value: function () {
      var _handleEditApiKey = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var inputDisabled, willEdit;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.state.inputValue && !this.state.allowEdit)) {
                  _context.next = 15;
                  break;
                }

                _context.prev = 1;
                inputDisabled = true;
                _context.next = 5;
                return (0, _sweetalert.default)({
                  title: "Are you sure?",
                  text: 'Changes to this field will overwrite the existing stored value, which you will not be able to recover unless you have stored the value elsewhere.',
                  icon: "warning",
                  buttons: true,
                  dangerMode: true
                });

              case 5:
                willEdit = _context.sent;

                // console.log({willEdit})
                if (willEdit) {
                  inputDisabled = false;
                }

                this.setState({
                  inputDisabled: inputDisabled,
                  allowEdit: inputDisabled ? false : true
                });
                this.keyField.current.focus();
                this.keyField.current.setSelectionRange(0, 1000);
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                console.error({
                  err: _context.t0
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 12]]);
      }));

      return function handleEditApiKey() {
        return _handleEditApiKey.apply(this, arguments);
      };
    }()
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      var target = e.target;
      var inputValue = target.type === 'checkbox' ? target.checked : target.value.trim();
      var error = this.state.error;

      if (/^([0-9A-Fa-f\-])+$/.test(inputValue)) {
        error = '';
      } else {
        error = 'Invalid Characters';
      }

      this.setState({
        inputValue: inputValue,
        error: error
      });
    }
  }, {
    key: "render",
    value: function render() {
      var self = this;
      var tableRows = this.state.list.map(function (el, ind) {
        if (el.id) {
          return _react.default.createElement("tr", {
            key: "list-".concat(ind),
            className: "table-row__suM-a"
          }, _react.default.createElement("td", {
            className: "table-row__cells__2cY5Z"
          }, el.id), _react.default.createElement("td", {
            className: "table-row__cells__2cY5Z"
          }, el.form_name), _react.default.createElement("td", {
            className: "table-row__cells__2cY5Z"
          }, el.form_status), _react.default.createElement("td", {
            className: "table-row__cells__2cY5Z"
          }, _react.default.createElement("div", {
            className: "flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
          }, _react.default.createElement(_FormButton.default, {
            val: "Edit",
            handleClick: self.handleButtonClick,
            ctx: {
              name: "campaign",
              val: el.id,
              type: 'Edit'
            }
          }), _react.default.createElement(_FormButton.default, {
            val: "Delete",
            handleClick: self.handleButtonClick,
            ctx: {
              name: "campaign",
              val: el.id,
              type: 'Delete'
            }
          }))));
        } else return null;
      });
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
        onSubmit: function onSubmit(e) {
          return e.preventDefault();
        }
      }, _react.default.createElement("fieldset", {
        className: "fieldset__3xxg-"
      }, _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement("div", {
        id: "form-field-apiKey",
        className: "form-group__1p2D2 flex-grow__1RrI1"
      }, _react.default.createElement("label", {
        htmlFor: "apiKey"
      }, "ApiKey"), _react.default.createElement("input", {
        id: "apiKey",
        type: "text",
        value: this.state.inputValue,
        disabled: this.state.inputDisabled,
        name: "apiKey",
        required: true,
        onChange: this.handleInputChange,
        placeholder: "API Key assigned by Giving Services",
        onFocus: this.handleEditApiKey,
        "aria-invalid": this.state.error ? true : false,
        ref: this.keyField,
        className: (0, _getClassName2.default)("input.form-control".concat(this.state.error ? " input.error" : "").concat(this.state.stored ? " input.stored" : ""), _styleModuleImportMap, {
          "handleMissingStyleName": "warn"
        })
      }), _react.default.createElement("div", {
        className: "error__32APg"
      }, this.state.error)), _react.default.createElement(_FormButton.default, {
        val: "Update",
        handleClick: this.handleButtonClick,
        ctx: {
          name: "apiKey",
          val: '',
          type: 'Edit'
        },
        submitting: this.state.submitting
      }), this.state.allowEdit && !this.state.error ? _react.default.createElement(_FormButton.default, {
        val: "Save",
        handleClick: this.handleButtonClick,
        ctx: {
          name: 'apiKey',
          val: '',
          type: 'Save'
        },
        submitting: this.state.submitting
      }) : null))), _react.default.createElement("table", {
        className: "table__2izRV"
      }, _react.default.createElement("thead", {
        className: "table-head__3aOby"
      }, _react.default.createElement("tr", {
        className: "table-row__suM-a"
      }, _react.default.createElement("th", {
        className: "table-row__headers__1Gt68"
      }, "ID"), _react.default.createElement("th", {
        className: "table-row__headers__1Gt68"
      }, "Campaign Name"), _react.default.createElement("th", {
        className: "table-row__headers__1Gt68"
      }, "Status"), _react.default.createElement("th", {
        className: "table-row__headers__1Gt68"
      }, "Actions"))), _react.default.createElement("tbody", null, tableRows, _react.default.createElement("tr", {
        className: "table-row__suM-a"
      }, _react.default.createElement("td", {
        colSpan: "4",
        className: "table-row__cells__2cY5Z"
      }, _react.default.createElement("div", {
        className: "flex__2SHge flex-row__M7mg4 flex-center__yyA4g flex-axes-center__gx3gz"
      }, _react.default.createElement(_FormButton.default, {
        val: "Add New Form",
        handleClick: this.handleButtonClick,
        ctx: {
          name: "campaign",
          val: '',
          type: 'Add'
        },
        submitting: this.state.submitting
      })))))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var updateK = state.k !== props.k;
      var updateFormList = JSON.stringify(props.formList) !== JSON.stringify(state.list);

      if (updateK && updateFormList) {
        return {
          k: props.k,
          inputValue: props.k,
          list: _toConsumableArray(props.formList),
          inputDisabled: true,
          allowEdit: false,
          saveMethod: 'PUT'
        };
      } else if (updateK) {
        return {
          k: props.k,
          inputValue: k,
          inputDisabled: true,
          allowEdit: false,
          saveMethod: 'PUT'
        };
      } else if (updateFormList) {
        return {
          list: props.formList
        };
      } else {
        return {};
      }
    }
  }]);

  return ListForms;
}(_react.Component);

exports.default = ListForms;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ListForms, "ListForms", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/ListForms.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","babel-plugin-react-css-modules/dist/browser/getClassName":"node_modules/babel-plugin-react-css-modules/dist/browser/getClassName.js","react":"node_modules/react/index.js","./styles/flex.css":"src/Components/styles/flex.css","./styles/input.css":"src/Components/styles/input.css","./styles/error.css":"src/Components/styles/error.css","./styles/form.css":"src/Components/styles/form.css","./FormButton":"src/Components/FormButton.js","sweetalert":"node_modules/sweetalert/dist/sweetalert.min.js"}],"src/Components/InputGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InputGroup;

var _getClassName2 = _interopRequireDefault(require("babel-plugin-react-css-modules/dist/browser/getClassName"));

var _react = _interopRequireDefault(require("react"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _input = _interopRequireDefault(require("./styles/input.css"));

var _error = _interopRequireDefault(require("./styles/error.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _styleModuleImportMap = {
  "flex": {
    "flex": "flex__2SHge",
    "flex-row": "flex-row__M7mg4",
    "flex-center": "flex-center__yyA4g",
    "flex-around": "flex-around___Gjak",
    "flex-between": "flex-between__2MQaD",
    "flex-left": "flex-left__2XM1d",
    "flex-start": "flex-start__2Ga6n",
    "flex-end": "flex-end__Cg2Gv",
    "flex-row-reverse": "flex-row-reverse__3dS2V",
    "flex-axes-center": "flex-axes-center__gx3gz",
    "flex-column": "flex-column__3YwsY",
    "flex-wrap": "flex-wrap__3nXfa",
    "flex-grow": "flex-grow__1RrI1",
    "flex-no-grow": "flex-no-grow__2xRX_",
    "flex-shrink": "flex-shrink__3Yf-r"
  },
  "input": {
    "form-input": "form-input__Pw4hm",
    "form-group": "form-group__1p2D2",
    "form-group--Title": "form-group--Title__1Kt14",
    "form-group--Firstname": "form-group--Firstname__3aawj",
    "form-group--Lastname": "form-group--Lastname__1pq8z",
    "form-group--State": "form-group--State__2AmVh",
    "form-group--Country": "form-group--Country__FSpCS",
    "form-group--Phone": "form-group--Phone__2yPCA",
    "form-group--Email": "form-group--Email__2kzB7",
    "form-control": "form-control__3koCO",
    "textarea__large": "textarea__large__1hfZD",
    "error": "error__3YGLT",
    "form-group--City": "form-group--City__1iMUI",
    "form-group--Zip": "form-group--Zip__16GDe"
  },
  "error": {
    "error": "error__32APg",
    "amount-error": "amount-error__3Nc_3"
  }
};

if (module.hot) {
  module.hot.accept("./styles/error.css", function () {
    require("./styles/error.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/input.css", function () {
    require("./styles/input.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

function InputGroup(props) {
  return _react.default.createElement("div", {
    id: "form-field-".concat(props.id),
    className: (0, _getClassName2.default)("".concat(props.specialStyle ? props.specialStyle : "", " input.form-group flex.flex-grow"), _styleModuleImportMap, {
      "handleMissingStyleName": "warn"
    })
  }, _react.default.createElement("label", {
    htmlFor: props.id
  }, props.label, _react.default.createElement("span", null, props.required ? '*' : '')), _react.default.createElement("input", {
    type: props.type,
    id: props.id,
    maxLength: props.maxLength,
    name: props.id,
    placeholder: props.placeholder,
    required: props.required,
    value: props.value ? props.value : "",
    onChange: props.handleInputChange,
    "aria-invalid": props.error ? true : false,
    disabled: props.disabled,
    pattern: props.validation ? props.validation : ".*",
    className: (0, _getClassName2.default)("input.form-control".concat(props.error ? " input.error" : ""), _styleModuleImportMap, {
      "handleMissingStyleName": "warn"
    })
  }), _react.default.createElement("div", {
    className: "error__32APg"
  }, props.error));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(InputGroup, "InputGroup", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/InputGroup.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","babel-plugin-react-css-modules/dist/browser/getClassName":"node_modules/babel-plugin-react-css-modules/dist/browser/getClassName.js","react":"node_modules/react/index.js","./styles/flex.css":"src/Components/styles/flex.css","./styles/input.css":"src/Components/styles/input.css","./styles/error.css":"src/Components/styles/error.css"}],"src/Components/AddForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _input = _interopRequireDefault(require("./styles/input.css"));

var _error = _interopRequireDefault(require("./styles/error.css"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _InputGroup = _interopRequireDefault(require("./InputGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/error.css", function () {
    require("./styles/error.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/input.css", function () {
    require("./styles/input.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

var AddForm =
/*#__PURE__*/
function (_Component) {
  _inherits(AddForm, _Component);

  function AddForm(props) {
    var _this;

    _classCallCheck(this, AddForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddForm).call(this, props)); // console.log({props})

    _this.state = {
      submitting: false,
      updated: false,
      saved: false,
      form_name: '',
      created_by: props.user.id,
      error: ''
    };
    _this.handleButtonClick = _this.handleButtonClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AddForm, [{
    key: "handleButtonClick",
    value: function handleButtonClick(ctx) {
      var _this2 = this;

      this.props.tabFunctions.toggleBtnEnable(false);
      this.setState({
        submitting: true
      }, function () {
        _this2.props.tabFunctions.createForm(ctx.val, _this2.state["created_by"]).then(function (id) {
          if (id) {
            _this2.setState({
              saved: true,
              submitting: false
            }, function () {
              _this2.props.tabFunctions.toggleBtnEnable(true);

              _this2.props.tabFunctions.setAdminMode("Edit", id);
            });
          } else {
            _this2.setState({
              error: "Unable to Save"
            });
          }
        }).catch(function (err) {
          return console.error(err);
        });
      });
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      var target = e.target;
      var inputValue = target.type === 'checkbox' ? target.checked : target.value.trim();
      var error = this.state.error;
      var updated = inputValue ? true : false;
      this.setState({
        form_name: inputValue,
        error: error,
        updated: updated
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
        onSubmit: function onSubmit(e) {
          e.preventDefault();

          _this3.handleButtonClick({
            name: "create",
            val: _this3.state.form_name,
            type: 'form_name'
          });
        }
      }, _react.default.createElement("h3", null, "Add New Form"), _react.default.createElement("fieldset", {
        className: "fieldset__3xxg-"
      }, _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "form_name",
        specialStyle: "",
        label: "Campaign Name/URL Slug",
        placeholder: "i.e. Giving, or End-of-Year",
        maxLength: "256",
        required: true,
        value: this.state.form_name,
        handleInputChange: this.handleInputChange,
        error: this.state.error
      }))), _react.default.createElement("fieldset", {
        className: "fieldset__3xxg-"
      }, _react.default.createElement("div", {
        style: {
          maxWidth: "88px"
        }
      }, _react.default.createElement(_FormButton.default, {
        val: "Save",
        handleClick: this.handleButtonClick,
        ctx: {
          name: "create",
          val: this.state.form_name,
          type: 'form_name'
        },
        submitting: this.state.submitting
      })))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return AddForm;
}(_react.Component);

exports.default = AddForm;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AddForm, "AddForm", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/AddForm.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/flex.css":"src/Components/styles/flex.css","./styles/input.css":"src/Components/styles/input.css","./styles/error.css":"src/Components/styles/error.css","./styles/form.css":"src/Components/styles/form.css","./FormButton":"src/Components/FormButton.js","./InputGroup":"src/Components/InputGroup.js"}],"src/Components/SaveButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SaveButton;

var _react = _interopRequireDefault(require("react"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _error = _interopRequireDefault(require("./styles/error.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/error.css", function () {
    require("./styles/error.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

function SaveButton(props) {
  return _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-",
    style: {
      position: "relative"
    }
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "88px"
    }
  }, _react.default.createElement(_FormButton.default, {
    val: "Save",
    handleClick: props.handleClick,
    submitting: props.submitting,
    ctx: props.ctx
  })), _react.default.createElement("div", {
    className: "error__32APg"
  }, props.error), _react.default.createElement("div", {
    className: "form-msg__28n2S",
    style: {
      opacity: props.formMsg ? "1" : "0"
    }
  }, props.formMsg));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SaveButton, "SaveButton", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/SaveButton.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./FormButton":"src/Components/FormButton.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./styles/error.css":"src/Components/styles/error.css"}],"src/Components/styles/checkbox.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "checkbox-input": "checkbox-input__3FXsP"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/Checkbox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Checkbox;

var _react = _interopRequireDefault(require("react"));

var _checkbox = _interopRequireDefault(require("./styles/checkbox.css"));

var _input = _interopRequireDefault(require("./styles/input.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/input.css", function () {
    require("./styles/input.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/checkbox.css", function () {
    require("./styles/checkbox.css");
  });
}

function Checkbox(props) {
  return _react.default.createElement("div", {
    className: "form-group__1p2D2"
  }, _react.default.createElement("input", {
    type: "checkbox",
    className: "checkbox-input__3FXsP",
    id: props.id,
    name: props.id,
    checked: props.checked,
    onChange: props.handleInputChange
  }), _react.default.createElement("label", {
    htmlFor: props.id
  }, props.label));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Checkbox, "Checkbox", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/Checkbox.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/checkbox.css":"src/Components/styles/checkbox.css","./styles/input.css":"src/Components/styles/input.css"}],"src/Components/styles/radio.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "radio-group": "radio-group__11hpj",
  "radio-group__input": "radio-group__input__2RrAr"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/RadioButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RadioButton;

var _react = _interopRequireDefault(require("react"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _radio = _interopRequireDefault(require("./styles/radio.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/radio.css", function () {
    require("./styles/radio.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

function RadioButton(props) {
  return _react.default.createElement("div", {
    id: "".concat(props.id, "-group"),
    className: "flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz radio-group__11hpj"
  }, _react.default.createElement("input", {
    className: "radio-group__input__2RrAr",
    name: props.name,
    id: props.id,
    type: "radio",
    checked: props.checked,
    onChange: props.handleRadioClick,
    disabled: props.disabled === true ? true : false
  }), _react.default.createElement("label", {
    htmlFor: props.id
  }, props.label));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RadioButton, "RadioButton", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/RadioButton.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/flex.css":"src/Components/styles/flex.css","./styles/radio.css":"src/Components/styles/radio.css"}],"src/Components/helpers/getNewObj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewObj = getNewObj;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

/**
 * Receives request for a type of Obj and fills with default values
 * @param {String} type - "fonts, colors, spacing, email, form"
 * @returns {Object} - obj filled with defaults
 */
function getNewObj(type) {
  var newObj;

  switch (type.toLowerCase()) {
    case "funds":
      newObj = {
        fundTitle: '',
        fundDescription: '',
        DetailName: '',
        DetailCprojMail: '',
        DetailCprojCredit: '',
        DetailDescription: ''
      };
      break;

    case "products":
      newObj = {
        productTitle: '',
        productMessage: '',
        productImgUrl: '',
        DetailName: '',
        DetailCprojMail: '',
        DetailCprojCredit: '',
        DetailDescription: '',
        PledgeAmt: ''
      };
      break;

    case "subscriptions":
      newObj = {
        "key": '',
        "value": ''
      };
      break;
  }

  return newObj;
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getNewObj, "getNewObj", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/helpers/getNewObj.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js"}],"src/Components/withFormConfigHandling.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _getNewObj = require("./helpers/getNewObj");

var _sweetalert = _interopRequireDefault(require("sweetalert"));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function clickAlert() {
  return _clickAlert.apply(this, arguments);
}

function _clickAlert() {
  _clickAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var willEdit;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _sweetalert.default)({
              title: "Are you ready for production?",
              text: 'Setting your form to production means you have tested the fields and submission process of your form, verified entire form submission process, and approved final copy for you thank you email and thank you page. Pages in production will submit to the production database.',
              icon: "warning",
              buttons: true,
              dangerMode: true
            });

          case 2:
            willEdit = _context.sent;

            if (!willEdit) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", true);

          case 7:
            return _context.abrupt("return", false);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _clickAlert.apply(this, arguments);
}

var withFormConfigHandling = function withFormConfigHandling(SettingsComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(_class, _Component);

      function _class(props) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props)); // console.log({props: props.defaultValues.fields});

        _this.state = {
          updated: false,
          saved: false,
          initialState: _extends({}, props.defaultValues.fields),
          fields: _extends({}, props.defaultValues.fields),
          errors: _extends({}, props.defaultValues.errors),
          currentForm: props.currentForm
        };
        _this.handleRadioClick = _this.handleRadioClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleButtonClick = _this.handleButtonClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleUnload = _this.handleUnload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(_class, [{
        key: "componentDidMount",
        // don't let users leave page without warning
        value: function componentDidMount() {
          window.addEventListener('beforeunload', this.handleUnload);
        } // remove event listeners on unmount

      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          window.removeEventListener('beforeunload', this.handleUnload);
        }
      }, {
        key: "handleUnload",
        value: function handleUnload(e) {
          // console.log({updated: this.state.updated, saved: this.state.saved})
          if (this.state.updated && !this.state.saved) {
            e.preventDefault();
            e.returnValue = "Are you sure you want to go back?\n You may lose all your changes to this page.";
            return "Are you sure you want to go back?\n You may lose all your changes to this page.";
          }

          return void 0;
        }
      }, {
        key: "handleRadioClick",
        value: function handleRadioClick(e) {
          console.log("click");
          var id = e.target.id;

          var fields = _extends({}, this.state.fields);

          var ids = {
            "new-status": "new",
            "dev-status": "dev",
            "prod-status": "prod",
            "monthlygift": "monthly",
            "singlegift": "single",
            "nullgift": ""
          };

          if (id.includes('gift')) {
            fields.defaultOption = ids[id];
          } else {
            if (id === "prod-status") {
              clickAlert().then(function (update) {
                fields.form_status = update ? ids[id] : fields.form_status;
              });
            } else {
              fields.form_status = ids[id];
            }
          }

          var initialState = JSON.stringify(this.state.initialState);
          var currentState = JSON.stringify(fields);
          this.setState(function () {
            return {
              fields: fields,
              updated: currentState != initialState
            };
          });
        }
      }, {
        key: "handleButtonClick",
        value: function handleButtonClick(ctx) {
          var _this2 = this;

          var fields = _extends({}, this.state.fields),
              errors = _extends({}, this.state.errors);

          var initialState = JSON.stringify(this.state.initialState);
          var name = ctx.name,
              type = ctx.type,
              val = ctx.val;

          if (type === "Add") {
            var newObj;

            switch (name) {
              case "subscriptions":
                // just need a new empty object
                newObj = (0, _getNewObj.getNewObj)(name);
                fields[name].push(_extends({}, newObj));
                errors[name].push(_extends({}, newObj));
                break;

              case "giving":
                //have to update array of amounts as well as add errors and fields
                var amounts = _toConsumableArray(fields["".concat(val, "Amounts")]);

                amounts.push(1);
                amounts.sort(function (a, b) {
                  return a - b;
                });
                var len = amounts.length;

                for (var i = 0; i < len; i++) {
                  fields[val + "Amt-" + i] = amounts[i];
                  errors[val + "Amt-" + i] = '';
                }

                fields["".concat(val, "Amounts")] = _toConsumableArray(amounts);
                break;

              default:
                //have to increase record of num of fields as well as add empty object
                var numFields = "num".concat(name.substring(0, 1).toUpperCase() + name.substring(1));
                fields[numFields] = +fields[numFields] + 1;
                newObj = (0, _getNewObj.getNewObj)(name);
                fields[name].push(_extends({}, newObj));
                errors[name].push(_extends({}, newObj));
                break;
            } // console.log({fields, errors})


            var currentState = JSON.stringify(fields);
            this.setState(function () {
              return {
                fields: fields,
                errors: errors,
                updated: currentState != initialState
              };
            });
          } else if (type === "Remove") {
            if (name !== "subscriptions" && name !== "giving") {
              var _numFields = "num".concat(name.substring(0, 1).toUpperCase() + name.substring(1));

              fields[_numFields] = +fields[_numFields] - 1;
            }

            if (name !== "giving") {
              fields[name] = _toConsumableArray(fields[name].slice(0, val)).concat(_toConsumableArray(fields[name].slice(val + 1)));
              errors[name] = _toConsumableArray(errors[name].slice(0, val)).concat(_toConsumableArray(errors[name].slice(val + 1)));
            } else {
              var _amounts = _toConsumableArray(fields["".concat(val.type, "Amounts")]);

              var newAmts = _toConsumableArray(_amounts.slice(0, val.ind)).concat(_toConsumableArray(_amounts.slice(val.ind + 1)));

              newAmts.sort(function (a, b) {
                return a - b;
              });
              delete fields["".concat(val.type, "Amt-").concat(val.ind)];
              fields["".concat(val.type, "Amounts")] = newAmts;
              var _len = _amounts.length;

              for (var _i = 0; _i < _len; _i++) {
                fields[val.type + "Amt-" + _i] = newAmts[_i];
                errors[val.type + "Amt-" + _i] = '';
              }
            } // console.log({newList: fields[name], newErrors: errors[name]}) 


            var _currentState = JSON.stringify(fields);

            this.setState(function () {
              return {
                fields: fields,
                errors: errors,
                updated: _currentState != initialState
              };
            });
          } else {
            this.setState({
              submitting: true
            }, function () {
              _this2.props.tabFunctions.toggleBtnEnable(false);

              if (_this2.props.displayMode.toLowerCase() === "giving") {
                var fieldKeys = Object.keys(fields);
                var monthlyKeys = fieldKeys.filter(function (el) {
                  return el.includes("monthlyAmt");
                });
                var singleKeys = fieldsKeys.filter(function (el) {
                  return el.includes("singleAmt");
                });
                fields.monthlyAmounts = monthlyKeys.map(function (k) {
                  return fields[k];
                });
                fields.singleAmounts = singleKeys.map(function (k) {
                  return fields[k];
                });
              }

              var config = _extends({}, _this2.props.config, fields);

              _this2.props.tabFunctions.storeConfig(_this2.state.currentForm.id, type, config).then(function (success) {
                // console.log({success})
                _this2.props.tabFunctions.toggleBtnEnable(true);

                _this2.setState({
                  saved: false,
                  updated: false,
                  submitting: false,
                  errors: _extends({}, _this2.props.defaultValues.errors)
                });
              }).catch(function (err) {
                console.error(err);
                errors['formError'] = "Unable to Save";

                _this2.setState({
                  errors: errors,
                  submitting: false
                }, function () {
                  _this2.props.tabFunctions.toggleBtnEnable(true);

                  setTimeout(function () {
                    _this2.setState({
                      saved: false
                    });
                  }, 300);
                });
              });
            });
          }
        }
      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var _this3 = this;

          var target = e.target;
          var value = target.type === 'checkbox' ? target.checked : target.value;
          var name = target.name;

          var fields = _extends({}, this.state.fields),
              errors = _extends({}, this.state.errors);

          var error = '';

          if (name.includes("funds-") || name.includes("products-") || name.includes("subscriptions-")) {
            var field = name.split("-")[0];
            var ind = +name.split("-")[1];
            var setting = name.split("-")[2]; // console.log({field, ind, setting, value})

            fields[field][ind][setting] = value;
            errors[field][ind][setting] = ''; // console.log({fields, fieldUpdated: fields[field][ind][setting]})
          } else if (name === "AddContactYN") {
            fields[name] = value === true ? "Y" : "N";
            errors[name] = error;
          } else if (name.includes("Amt-")) {
            var type = name.split("-")[0].substring(0, name.split("-")[0].length - 3);

            var _ind = +name.split("-")[1];

            var amounts = _toConsumableArray(fields["".concat(type, "Amounts")]);

            amounts[_ind] = value;
            amounts.sort(function (a, b) {
              return a - b;
            });
            fields["".concat(type, "Amounts")] = amounts;
            var len = amounts.length;

            for (var i = 0; i < len; i++) {
              fields[type + "Amt-" + i] = amounts[i];
              errors[type + "Amt-" + i] = '';
            }
          } else if (name.includes("addGift-")) {
            var _field = name.split("-")[1]; // console.log({field, additionalGift:fields.additionalGift})

            fields.additionalGift[_field] = value;
            errors.additionalGift[_field] = error;
          } else {
            errors[name] = error;
            fields[name] = value;
          }

          var updated = JSON.stringify(fields) !== JSON.stringify(this.state.initialState); // console.log({updated, value, initialState: this.state.initialState[name]})

          this.setState({
            fields: fields,
            errors: errors,
            updated: updated
          }, function () {
            return _this3.props.tabFunctions.toggleBtnEnable(updated ? false : true);
          });
        }
      }, {
        key: "handleBlur",
        value: function handleBlur(e) {
          var name = e.target.name;

          var errors = _extends({}, this.state.errors);

          if (this.state.updated && !this.state.saved) {
            errors[name] = "Be Sure to Save Your Changes";
          } else {
            errors[name] = "";
          }

          this.setState({
            errors: errors
          });
        }
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(SettingsComponent, _extends({}, this.props, {
            saved: this.state.saved,
            updated: this.state.updated,
            fields: this.state.fields,
            errors: this.state.errors,
            currentForm: this.state.currentForm,
            handleInputChange: this.handleInputChange,
            handleButtonClick: this.handleButtonClick,
            handleRadioClick: this.handleRadioClick,
            handleBlur: this.handleBlur
          }));
        }
      }, {
        key: "__reactstandin__regenerateByEval",
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
          // @ts-ignore
          this[key] = eval(code);
        }
      }], [{
        key: "name",
        get: function get() {
          return _react.Component.name;
        }
      }]);

      return _class;
    }(_react.Component)
  );
};

var _default = withFormConfigHandling;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(clickAlert, "clickAlert", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/withFormConfigHandling.js");
  reactHotLoader.register(withFormConfigHandling, "withFormConfigHandling", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/withFormConfigHandling.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/withFormConfigHandling.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./helpers/getNewObj":"src/Components/helpers/getNewObj.js","sweetalert":"node_modules/sweetalert/dist/sweetalert.min.js"}],"src/Components/FormSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _InputGroup = _interopRequireDefault(require("./InputGroup"));

var _RadioButton = _interopRequireDefault(require("./RadioButton"));

var _withFormConfigHandling = _interopRequireDefault(require("./withFormConfigHandling"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var FormSettings = function FormSettings(props) {
  var fields = props.fields,
      errors = props.errors;
  var pageLocation = window.location.origin + '/' + props.currentForm.form_name + '/';
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      props.handleButtonClick({
        name: "store",
        val: '',
        type: 'form_setup'
      });
    }
  }, _react.default.createElement("h3", null, "Configure Main Setttings"), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "form_name",
    specialStyle: "",
    label: "Campaign Name",
    value: props.currentForm.form_name,
    disabled: true
  })), _react.default.createElement("p", {
    className: "form-info__3Welr"
  }, "You can now use the Wordpress Shortcode ", _react.default.createElement("code", {
    className: "form-code__1MNHp"
  }, "[cbngivingform form_name=\"", props.currentForm.form_name, "\"]"), " on page. Please be sure to test as a draft before putting into production."), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "thankYouUrl",
    specialStyle: "",
    label: "Thank You Page Url",
    placeholder: "i.e. /thank-you",
    maxLength: "256",
    required: true,
    value: fields.thankYouUrl,
    handleInputChange: props.handleInputChange,
    error: errors.thankYouUrl
  })), _react.default.createElement("p", {
    className: "form-info__3Welr"
  }, "This will be the page where the donor is redirected after a successful donation.")), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "AddContactYN",
    checked: fields.AddContactYN === "Y",
    handleInputChange: props.handleInputChange,
    label: "Add Contact with Transaction?"
  })), fields.AddContactYN === "Y" ? _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "ContactSource",
    specialStyle: "",
    label: "Contact Source",
    placeholder: "i.e. 700Club Donor",
    maxLength: "20",
    required: true,
    value: fields.ContactSource,
    handleInputChange: props.handleInputChange,
    error: errors.ContactSource
  }) : null), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "SectionName",
    specialStyle: "",
    label: "Section Name",
    placeholder: "i.e. 700Club",
    maxLength: "20",
    required: true,
    value: fields.SectionName,
    handleInputChange: props.handleInputChange,
    error: errors.SectionName
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "ActivityName",
    specialStyle: "",
    label: "Activity Name",
    placeholder: "i.e. 700Club_Donation_Activity",
    maxLength: "50",
    required: true,
    value: fields.ActivityName,
    handleInputChange: props.handleInputChange,
    error: errors.ActivityName
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "MotivationText",
    specialStyle: "",
    label: "Motivation Code",
    placeholder: "i.e. 002345",
    maxLength: "6",
    required: true,
    validation: "\\d{6}",
    value: fields.MotivationText,
    handleInputChange: props.handleInputChange,
    error: errors.MotivationText
  }))), _react.default.createElement("fieldset", {
    className: "fieldset__bordered__3MgwP"
  }, _react.default.createElement("h3", null, "Toggle Form Status"), _react.default.createElement("p", {
    className: "form-info__3Welr"
  }, "Forms in Testing Status should already have some Form, Email and Style Settings saved, so that a version of the form will render on the draft page. Please use this setting to test donations to the development version of giving services. Do not put a page in Testing status into production since no transactions will be officially recorded. Forms in Production can be edited, but it is recommended that extreme care be taken before updating a form within production. We recommend reverting the giving page to draft status while changes are made on production forms."), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement("div", {
    className: "flex__2SHge flex-row__M7mg4 flex-between__2MQaD form-status-radio__2wgQK"
  }, _react.default.createElement(_RadioButton.default, {
    id: "new-status",
    name: "status-toggle",
    label: "New",
    checked: fields.form_status === "new",
    handleRadioClick: props.handleRadioClick,
    disabled: fields.form_status !== "new"
  }), _react.default.createElement(_RadioButton.default, {
    id: "dev-status",
    name: "status-toggle",
    label: "Testing",
    checked: fields.form_status === "dev",
    handleRadioClick: props.handleRadioClick
  }), _react.default.createElement(_RadioButton.default, {
    id: "prod-status",
    name: "status-toggle",
    label: "Production",
    checked: fields.form_status === "prod",
    handleRadioClick: props.handleRadioClick
  })))), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "88px"
    }
  }, _react.default.createElement(_SaveButton.default, {
    handleClick: props.handleButtonClick,
    submitting: props.submitting,
    ctx: {
      name: "store",
      val: '',
      type: 'form_setup'
    },
    error: errors.formError,
    formMsg: props.updated && !props.saved ? "Changes require saving" : ''
  })))));
};

var _default = (0, _withFormConfigHandling.default)(FormSettings);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormSettings, "FormSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FormSettings.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FormSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./SaveButton":"src/Components/SaveButton.js","./Checkbox":"src/Components/Checkbox.js","./InputGroup":"src/Components/InputGroup.js","./RadioButton":"src/Components/RadioButton.js","./withFormConfigHandling":"src/Components/withFormConfigHandling.js"}],"src/Components/NameSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _withFormConfigHandling = _interopRequireDefault(require("./withFormConfigHandling"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var NameSettings = function NameSettings(props) {
  var fields = props.fields,
      errors = props.errors;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      props.handleButtonClick({
        name: "store",
        val: '',
        type: 'form_setup'
      });
    }
  }, _react.default.createElement("h3", null, "Configure Name/Address Setttings"), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "getMiddleName",
    checked: fields.getMiddleName,
    handleInputChange: props.handleInputChange,
    label: "Get Donor's Middle Name?"
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "getSuffix",
    checked: fields.getSuffix,
    handleInputChange: props.handleInputChange,
    label: "Get Donor's Suffix Information, i.e. Jr, Sr, etc...?"
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "getSpouseInfo",
    checked: fields.getSpouseInfo,
    handleInputChange: props.handleInputChange,
    label: "Get Donor's Spouse First and Last name?"
  }))), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "getPhone",
    checked: fields.getPhone,
    handleInputChange: props.handleInputChange,
    label: "Ask for Phone Number?"
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "international",
    checked: fields.international,
    handleInputChange: props.handleInputChange,
    label: "Allow International Addresses?"
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "shipping",
    checked: fields.shipping,
    handleInputChange: props.handleInputChange,
    label: "Allow Separate Shipping Addresses?"
  }))), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "88px"
    }
  }, _react.default.createElement(_SaveButton.default, {
    handleClick: props.handleButtonClick,
    submitting: props.submitting,
    ctx: {
      name: "store",
      val: '',
      type: 'form_setup'
    },
    error: errors.formError,
    formMsg: props.updated && !props.saved ? "Changes require saving" : ''
  })))));
};

var _default = (0, _withFormConfigHandling.default)(NameSettings);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(NameSettings, "NameSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/NameSettings.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/NameSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./SaveButton":"src/Components/SaveButton.js","./Checkbox":"src/Components/Checkbox.js","./withFormConfigHandling":"src/Components/withFormConfigHandling.js"}],"src/Components/SelectGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectGroup;

var _getClassName2 = _interopRequireDefault(require("babel-plugin-react-css-modules/dist/browser/getClassName"));

var _react = _interopRequireDefault(require("react"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _input = _interopRequireDefault(require("./styles/input.css"));

var _error = _interopRequireDefault(require("./styles/error.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _styleModuleImportMap = {
  "flex": {
    "flex": "flex__2SHge",
    "flex-row": "flex-row__M7mg4",
    "flex-center": "flex-center__yyA4g",
    "flex-around": "flex-around___Gjak",
    "flex-between": "flex-between__2MQaD",
    "flex-left": "flex-left__2XM1d",
    "flex-start": "flex-start__2Ga6n",
    "flex-end": "flex-end__Cg2Gv",
    "flex-row-reverse": "flex-row-reverse__3dS2V",
    "flex-axes-center": "flex-axes-center__gx3gz",
    "flex-column": "flex-column__3YwsY",
    "flex-wrap": "flex-wrap__3nXfa",
    "flex-grow": "flex-grow__1RrI1",
    "flex-no-grow": "flex-no-grow__2xRX_",
    "flex-shrink": "flex-shrink__3Yf-r"
  },
  "input": {
    "form-input": "form-input__Pw4hm",
    "form-group": "form-group__1p2D2",
    "form-group--Title": "form-group--Title__1Kt14",
    "form-group--Firstname": "form-group--Firstname__3aawj",
    "form-group--Lastname": "form-group--Lastname__1pq8z",
    "form-group--State": "form-group--State__2AmVh",
    "form-group--Country": "form-group--Country__FSpCS",
    "form-group--Phone": "form-group--Phone__2yPCA",
    "form-group--Email": "form-group--Email__2kzB7",
    "form-control": "form-control__3koCO",
    "textarea__large": "textarea__large__1hfZD",
    "error": "error__3YGLT",
    "form-group--City": "form-group--City__1iMUI",
    "form-group--Zip": "form-group--Zip__16GDe"
  },
  "error": {
    "error": "error__32APg",
    "amount-error": "amount-error__3Nc_3"
  }
};

if (module.hot) {
  module.hot.accept("./styles/error.css", function () {
    require("./styles/error.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/input.css", function () {
    require("./styles/input.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

function SelectGroup(props) {
  return _react.default.createElement("div", {
    id: "form-field-".concat(props.id),
    className: (0, _getClassName2.default)("".concat(props.specialStyle ? props.specialStyle : "", " input.form-group flex.flex-grow"), _styleModuleImportMap, {
      "handleMissingStyleName": "warn"
    })
  }, _react.default.createElement("label", {
    htmlFor: props.id
  }, props.label, _react.default.createElement("span", null, props.required ? '*' : '')), _react.default.createElement("select", {
    id: props.id,
    name: props.id,
    required: props.required,
    value: props.value,
    onChange: props.handleInputChange,
    "aria-invalid": props.error ? true : false,
    className: (0, _getClassName2.default)("input.form-control".concat(props.error ? " input.error" : ""), _styleModuleImportMap, {
      "handleMissingStyleName": "warn"
    })
  }, props.options), _react.default.createElement("div", {
    className: "error__32APg"
  }, props.error));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SelectGroup, "SelectGroup", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/SelectGroup.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","babel-plugin-react-css-modules/dist/browser/getClassName":"node_modules/babel-plugin-react-css-modules/dist/browser/getClassName.js","react":"node_modules/react/index.js","./styles/flex.css":"src/Components/styles/flex.css","./styles/input.css":"src/Components/styles/input.css","./styles/error.css":"src/Components/styles/error.css"}],"src/Components/GivingSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _RadioButton = _interopRequireDefault(require("./RadioButton"));

var _InputGroup = _interopRequireDefault(require("./InputGroup"));

var _SelectGroup = _interopRequireDefault(require("./SelectGroup"));

var _withFormConfigHandling = _interopRequireDefault(require("./withFormConfigHandling"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var GivingSettings = function GivingSettings(props) {
  var fields = props.fields,
      errors = props.errors;

  var renderAmtInputs = function renderAmtInputs(type, arr) {
    // console.log({type, arr})
    return arr.map(function (el, ind) {
      return _react.default.createElement("div", {
        key: "".concat(type, "Input-").concat(ind),
        className: "flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz flex-grow__1RrI1"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "".concat(type, "Amt-").concat(ind),
        specialStyle: "",
        label: "Amount ".concat(ind + 1),
        placeholder: "Whole #, no $",
        required: true,
        validation: "[1-9]+\\d*",
        value: fields["".concat(type, "Amt-").concat(ind)],
        handleInputChange: props.handleInputChange,
        error: errors["".concat(type, "Amt-").concat(ind)]
      }), _react.default.createElement("div", null, _react.default.createElement(_FormButton.default, {
        val: "Remove",
        handleClick: props.handleButtonClick,
        ctx: {
          name: "giving",
          val: {
            type: type,
            ind: ind
          },
          type: 'Remove'
        }
      })));
    });
  };

  var renderDefaultSelect = function renderDefaultSelect(option) {
    var amounts = option === "monthly" ? props.fields.monthlyAmounts : props.fields.singleAmounts;
    var options = amounts.map(function (amt, ind) {
      return _react.default.createElement("option", {
        key: "amt-option-".concat(ind),
        value: amt
      }, amt);
    });
    return _react.default.createElement(_SelectGroup.default, {
      id: "DefaultAmount",
      label: "Default Amount",
      specialStyle: "",
      required: false,
      value: fields.defaultAmount,
      error: errors.defaultAmount,
      handleInputChange: props.handleInputChange,
      options: options
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      props.handleButtonClick({
        name: "store",
        val: '',
        type: 'form_setup'
      });
    }
  }, _react.default.createElement("h3", null, "Configure Giving Setttings"), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "showGivingArray",
    checked: fields.showGivingArray,
    handleInputChange: props.handleInputChange,
    label: "Show Giving Array(s)?"
  })), fields.showGivingArray ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "monthlyOption",
    checked: fields.monthlyOption,
    handleInputChange: props.handleInputChange,
    label: "Show Monthly Giving Options?"
  })), fields.monthlyOption ? _react.default.createElement("fieldset", {
    className: "fieldset__bordered__3MgwP"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz flex-wrap__3nXfa"
  }, renderAmtInputs("monthly", fields.monthlyAmounts)), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "170px"
    }
  }, _react.default.createElement(_FormButton.default, {
    val: "Add Setting",
    handleClick: props.handleButtonClick,
    ctx: {
      name: "giving",
      val: 'monthly',
      type: 'Add'
    }
  })))) : null, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "singleOption",
    checked: fields.singleOption,
    handleInputChange: props.handleInputChange,
    label: "Show Single Giving Options"
  })), fields.singleOption ? _react.default.createElement("fieldset", {
    className: "fieldset__bordered__3MgwP"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz flex-wrap__3nXfa"
  }, renderAmtInputs("single", fields.singleAmounts)), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "170px"
    }
  }, _react.default.createElement(_FormButton.default, {
    val: "Add Setting",
    handleClick: props.handleButtonClick,
    ctx: {
      name: "giving",
      val: 'single',
      type: 'Add'
    }
  })))) : null, fields.singleOption && fields.monthlyOption ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h3", null, "Choose Default Option"), _react.default.createElement("p", {
    className: "form-info__3Welr"
  }, "No default option is required."), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement("div", {
    className: "flex__2SHge flex-row__M7mg4 flex-between__2MQaD monthly-radio__1dy5Z"
  }, _react.default.createElement(_RadioButton.default, {
    id: "monthlygift",
    name: "monthly-toggle",
    label: "Monthly Gift",
    checked: fields.defaultOption === "monthly",
    handleRadioClick: props.handleRadioClick
  }), _react.default.createElement(_RadioButton.default, {
    id: "singlegift",
    name: "monthly-toggle",
    label: "Single Gift",
    checked: fields.defaultOption === "single",
    handleRadioClick: props.handleRadioClick
  }), _react.default.createElement(_RadioButton.default, {
    id: "nullgift",
    name: "monthly-toggle",
    label: "No Default Option",
    checked: fields.defaultOption === "",
    handleRadioClick: props.handleRadioClick
  })))) : null, fields.defaultOption !== '' ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h3", null, "Select Default Amount"), _react.default.createElement("p", {
    className: "form-info__3Welr"
  }, "No default Amount is required. However, if the default amount is not found within the default Giving Options, no default will be set."), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, renderDefaultSelect(fields.defaultOption))) : null) : null), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "88px"
    }
  }, _react.default.createElement(_SaveButton.default, {
    handleClick: props.handleButtonClick,
    submitting: props.submitting,
    ctx: {
      name: "store",
      val: '',
      type: 'form_setup'
    },
    error: errors.formError,
    formMsg: props.updated && !props.saved ? "Changes require saving" : ''
  })))));
};

var _default = (0, _withFormConfigHandling.default)(GivingSettings);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GivingSettings, "GivingSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/GivingSettings.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/GivingSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./SaveButton":"src/Components/SaveButton.js","./FormButton":"src/Components/FormButton.js","./Checkbox":"src/Components/Checkbox.js","./RadioButton":"src/Components/RadioButton.js","./InputGroup":"src/Components/InputGroup.js","./SelectGroup":"src/Components/SelectGroup.js","./withFormConfigHandling":"src/Components/withFormConfigHandling.js"}],"src/Components/TextGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextGroup;

var _getClassName2 = _interopRequireDefault(require("babel-plugin-react-css-modules/dist/browser/getClassName"));

var _react = _interopRequireDefault(require("react"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _input = _interopRequireDefault(require("./styles/input.css"));

var _error = _interopRequireDefault(require("./styles/error.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _styleModuleImportMap = {
  "flex": {
    "flex": "flex__2SHge",
    "flex-row": "flex-row__M7mg4",
    "flex-center": "flex-center__yyA4g",
    "flex-around": "flex-around___Gjak",
    "flex-between": "flex-between__2MQaD",
    "flex-left": "flex-left__2XM1d",
    "flex-start": "flex-start__2Ga6n",
    "flex-end": "flex-end__Cg2Gv",
    "flex-row-reverse": "flex-row-reverse__3dS2V",
    "flex-axes-center": "flex-axes-center__gx3gz",
    "flex-column": "flex-column__3YwsY",
    "flex-wrap": "flex-wrap__3nXfa",
    "flex-grow": "flex-grow__1RrI1",
    "flex-no-grow": "flex-no-grow__2xRX_",
    "flex-shrink": "flex-shrink__3Yf-r"
  },
  "input": {
    "form-input": "form-input__Pw4hm",
    "form-group": "form-group__1p2D2",
    "form-group--Title": "form-group--Title__1Kt14",
    "form-group--Firstname": "form-group--Firstname__3aawj",
    "form-group--Lastname": "form-group--Lastname__1pq8z",
    "form-group--State": "form-group--State__2AmVh",
    "form-group--Country": "form-group--Country__FSpCS",
    "form-group--Phone": "form-group--Phone__2yPCA",
    "form-group--Email": "form-group--Email__2kzB7",
    "form-control": "form-control__3koCO",
    "textarea__large": "textarea__large__1hfZD",
    "error": "error__3YGLT",
    "form-group--City": "form-group--City__1iMUI",
    "form-group--Zip": "form-group--Zip__16GDe"
  },
  "error": {
    "error": "error__32APg",
    "amount-error": "amount-error__3Nc_3"
  }
};

if (module.hot) {
  module.hot.accept("./styles/error.css", function () {
    require("./styles/error.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/input.css", function () {
    require("./styles/input.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

function TextGroup(props) {
  return _react.default.createElement("div", {
    id: "form-field-".concat(props.id),
    className: (0, _getClassName2.default)("".concat(props.specialStyle ? props.specialStyle : "", " input.form-group flex.flex-grow"), _styleModuleImportMap, {
      "handleMissingStyleName": "warn"
    })
  }, _react.default.createElement("label", {
    htmlFor: props.id
  }, props.label, _react.default.createElement("span", null, props.required ? '*' : '')), _react.default.createElement("textarea", {
    id: props.id,
    maxLength: props.maxLength,
    name: props.id,
    placeholder: props.placeholder,
    required: props.required,
    onChange: props.handleInputChange,
    value: props.value,
    "aria-invalid": props.error ? true : false,
    onBlur: props.handleBlur,
    className: (0, _getClassName2.default)("input.form-control ".concat(props.email ? "input.textarea__large" : "").concat(props.error ? " input.error" : ""), _styleModuleImportMap, {
      "handleMissingStyleName": "warn"
    })
  }), _react.default.createElement("div", {
    className: "error__32APg"
  }, props.error));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TextGroup, "TextGroup", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/TextGroup.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","babel-plugin-react-css-modules/dist/browser/getClassName":"node_modules/babel-plugin-react-css-modules/dist/browser/getClassName.js","react":"node_modules/react/index.js","./styles/flex.css":"src/Components/styles/flex.css","./styles/input.css":"src/Components/styles/input.css","./styles/error.css":"src/Components/styles/error.css"}],"src/Components/ProductSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _InputGroup = _interopRequireDefault(require("./InputGroup"));

var _TextGroup = _interopRequireDefault(require("./TextGroup"));

var _withFormConfigHandling = _interopRequireDefault(require("./withFormConfigHandling"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var ProductSettings = function ProductSettings(props) {
  var fields = props.fields,
      errors = props.errors;

  var renderProductInputs = function renderProductInputs(num) {
    var arr = Array(num).fill(null);
    return arr.map(function (el, ind) {
      return _react.default.createElement("fieldset", {
        className: "fieldset__bordered__3MgwP",
        key: "productRow-".concat(ind)
      }, _react.default.createElement("h4", null, "Product ", ind + 1), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-wrap__3nXfa"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "products-".concat(ind, "-productTitle"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": Title"),
        maxLength: 120,
        placeholder: "i.e. To Life DVD",
        required: true,
        value: fields.products[ind].productTitle,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].productTitle
      }), _react.default.createElement(_TextGroup.default, {
        id: "products-".concat(ind, "-productMessage"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": Description"),
        maxLength: 512,
        rows: 3,
        placeholder: "Can include html tags, < 320 visible characters",
        required: false,
        value: fields.products[ind].productMessage,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].productMessage
      })), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz flex-wrap__3nXfa"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "products-".concat(ind, "-productImgUrl"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": Product Image URL"),
        maxLength: 256,
        placeholder: "i.e. https://www.cbn.com/giving/special/tolife/assets/images/dvd-img.png",
        required: false,
        value: fields.products[ind].productImgUrl,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].productImgUrl
      }), _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "products-".concat(ind, "-PledgeAmount"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": Pledge Amount"),
        maxLength: 7,
        placeholder: 15,
        required: true,
        value: fields.products[ind].PledgeAmount,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].PledgeAmount
      })), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz flex-wrap__3nXfa"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "products-".concat(ind, "-DetailName"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": Detail Name"),
        maxLength: 4,
        placeholder: "i.e. CC01",
        required: true,
        value: fields.products[ind].DetailName,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].DetailName
      }), _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "products-".concat(ind, "-DetailCprojMail"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": WhiteMail SOL"),
        maxLength: 6,
        placeholder: "i.e. 043251",
        required: true,
        value: fields.products[ind].DetailCprojMail,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].DetailCprojMail
      }), _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "products-".concat(ind, "-DetailCprojCredit"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": Credit SOL"),
        maxLength: 6,
        placeholder: "i.e. 043250",
        required: true,
        value: fields.products[ind].DetailCprojCredit,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].DetailCprojCredit
      }), _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "products-".concat(ind, "-DetailDescription"),
        specialStyle: "",
        label: "Product ".concat(ind + 1, ": SOL Description"),
        maxLength: 32,
        placeholder: "i.e. Orphan's Promise Vietnam, Superbook Translation, etc",
        required: true,
        value: fields.products[ind].DetailDescription,
        handleInputChange: props.handleInputChange,
        error: errors.products[ind].DetailDescription
      })), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement("div", null, _react.default.createElement(_FormButton.default, {
        val: "Remove",
        handleClick: props.handleButtonClick,
        ctx: {
          name: "products",
          val: ind,
          type: 'Remove'
        }
      }))));
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      props.handleButtonClick({
        name: "store",
        val: '',
        type: 'form_setup'
      });
    }
  }, _react.default.createElement("h3", null, "Configure Product Setttings"), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "addProducts",
    checked: fields.addProducts,
    handleInputChange: props.handleInputChange,
    label: "Users can Select Product(s)?"
  })), renderProductInputs(fields.numProducts), fields.addProducts && _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "170px"
    }
  }, _react.default.createElement(_FormButton.default, {
    val: "Add Setting",
    handleClick: props.handleButtonClick,
    ctx: {
      name: "products",
      val: '',
      type: 'Add'
    }
  }))), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "addGift-display",
    checked: fields.additionalGift.display,
    handleInputChange: props.handleInputChange,
    label: "Prompt Donors for a special additional gift?"
  })), fields.additionalGift.display && _react.default.createElement("fieldset", {
    className: "fieldset__bordered__3MgwP"
  }, _react.default.createElement("h4", null, "Additional Gift"), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-wrap__3nXfa"
  }, _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "addGift-DetailName",
    specialStyle: "",
    label: "Additional Gift: Detail Name",
    maxLength: 20,
    placeholder: "i.e. SGOrphansPromise",
    required: true,
    value: fields.additionalGift.DetailName,
    handleInputChange: props.handleInputChange,
    error: errors.additionalGift.DetailName
  }), _react.default.createElement(_TextGroup.default, {
    type: "text",
    id: "addGift-additionalGiftMessage",
    specialStyle: "",
    label: "Message/Appeal for additional gift",
    maxLength: 512,
    rows: 3,
    placeholder: "Please consider a special gift to CBN Ministries",
    required: true,
    value: fields.additionalGift.additionalGiftMessage,
    handleInputChange: props.handleInputChange,
    error: errors.additionalGift.additionalGiftMessage
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-wrap__3nXfa"
  }, _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "addGift-DetailCprojMail",
    specialStyle: "",
    label: "Additional Gift: WhiteMail SOL",
    maxLength: 6,
    placeholder: "i.e. 043251",
    required: true,
    value: fields.additionalGift.DetailCprojMail,
    handleInputChange: props.handleInputChange,
    error: errors.additionalGift.DetailCprojMail
  }), _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "addGift-DetailCprojCredit",
    specialStyle: "",
    label: "Additional Gift: Credit SOL",
    maxLength: 6,
    placeholder: "i.e. 043250",
    required: true,
    value: fields.additionalGift.DetailCprojCredit,
    handleInputChange: props.handleInputChange,
    error: errors.additionalGift.DetailCprojCredit
  }), _react.default.createElement(_InputGroup.default, {
    type: "text",
    id: "addGift-DetailDescription",
    specialStyle: "",
    label: "Additional Gift: SOL Description",
    maxLength: 32,
    placeholder: "i.e. Orphan's Promise Vietnam, Superbook Translation, etc",
    required: true,
    value: fields.additionalGift.DetailDescription,
    handleInputChange: props.handleInputChange,
    error: errors.additionalGift.DetailDescription
  })))), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "88px"
    }
  }, _react.default.createElement(_SaveButton.default, {
    handleClick: props.handleButtonClick,
    submitting: props.submitting,
    ctx: {
      name: "store",
      val: '',
      type: 'form_setup'
    },
    error: errors.formError,
    formMsg: props.updated && !props.saved ? "Changes require saving" : ''
  })))));
};

var _default = (0, _withFormConfigHandling.default)(ProductSettings);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ProductSettings, "ProductSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/ProductSettings.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/ProductSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./FormButton":"src/Components/FormButton.js","./SaveButton":"src/Components/SaveButton.js","./Checkbox":"src/Components/Checkbox.js","./InputGroup":"src/Components/InputGroup.js","./TextGroup":"src/Components/TextGroup.js","./withFormConfigHandling":"src/Components/withFormConfigHandling.js"}],"src/Components/FundSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _InputGroup = _interopRequireDefault(require("./InputGroup"));

var _TextGroup = _interopRequireDefault(require("./TextGroup"));

var _withFormConfigHandling = _interopRequireDefault(require("./withFormConfigHandling"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var FundSettings = function FundSettings(props) {
  var fields = props.fields,
      errors = props.errors;

  var renderFundInputs = function renderFundInputs(num) {
    var arr = Array(num).fill(null);
    return arr.map(function (el, ind) {
      return _react.default.createElement("fieldset", {
        key: "fundRow-".concat(ind),
        className: "fieldset__bordered__3MgwP"
      }, _react.default.createElement("h4", null, "Fund ", ind + 1), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz flex-wrap__3nXfa"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "funds-".concat(ind, "-Title"),
        specialStyle: "",
        label: "Fund ".concat(ind + 1, ": Title"),
        maxLength: 120,
        placeholder: "i.e. Wherever Needed Most",
        required: true,
        value: props.fields.funds[ind].fundTitle,
        handleInputChange: props.handleInputChange,
        error: props.errors.funds[ind].fundTitle
      }), _react.default.createElement(_TextGroup.default, {
        id: "funds-".concat(ind, "-FundDescription"),
        specialStyle: "",
        label: "Fund ".concat(ind + 1, ": Description"),
        rows: 3,
        maxLength: 512,
        placeholder: "Can include html tags, < 320 visible characters",
        required: false,
        value: props.fields.funds[ind].fundDescription,
        handleInputChange: props.handleInputChange,
        error: props.errors.funds[ind].fundDescription
      })), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz flex-wrap__3nXfa"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "funds-".concat(ind, "-DetailName"),
        specialStyle: "",
        label: "Fund ".concat(ind + 1, ": Detail Name"),
        maxLength: 32,
        placeholder: "i.e. Superbook, OrphansPromise, 700Club, etc",
        required: true,
        value: props.fields.funds[ind].DetailName,
        handleInputChange: props.handleInputChange,
        error: props.errors.funds[ind].DetailName
      }), _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "funds-".concat(ind, "-DetailCprojMail"),
        specialStyle: "",
        label: "Fund ".concat(ind + 1, ": WhiteMail SOL"),
        maxLength: 6,
        placeholder: "i.e. 043251",
        required: true,
        value: props.fields.funds[ind].DetailCprojMail,
        handleInputChange: props.handleInputChange,
        error: props.errors.funds[ind].DetailCprojMail
      }), _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "funds-".concat(ind, "-DetailCprojCredit"),
        specialStyle: "",
        label: "Fund ".concat(ind + 1, ": Credit SOL"),
        maxLength: 6,
        placeholder: "i.e. 043250",
        required: true,
        value: props.fields.funds[ind].DetailCprojCredit,
        handleInputChange: props.handleInputChange,
        error: props.errors.funds[ind].DetailCprojCredit
      }), _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "funds-".concat(ind, "-DetailDescription"),
        specialStyle: "",
        label: "Fund ".concat(ind + 1, ": SOL Description"),
        maxLength: 32,
        placeholder: "i.e. Orphan's Promise Vietname, Superbook Translation, etc",
        required: true,
        value: props.fields.funds[ind].DetailDescription,
        handleInputChange: props.handleInputChange,
        error: props.errors.funds[ind].DetailDescription
      })), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement("div", null, _react.default.createElement(_FormButton.default, {
        val: "Remove",
        handleClick: props.handleButtonClick,
        ctx: {
          name: "funds",
          val: ind,
          type: 'Remove'
        }
      }))));
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      props.handleButtonClick({
        name: "store",
        val: '',
        type: 'form_setup'
      });
    }
  }, _react.default.createElement("h3", null, "Configure Fund Setttings"), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_Checkbox.default, {
    id: "addFunds",
    checked: fields.addFunds,
    handleInputChange: props.handleInputChange,
    label: "Users can Select Different Funds?"
  })), renderFundInputs(fields.numFunds), fields.addFunds ? _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "170px"
    }
  }, _react.default.createElement(_FormButton.default, {
    val: "Add Setting",
    handleClick: props.handleButtonClick,
    ctx: {
      name: "funds",
      val: '',
      type: 'Add'
    }
  }))) : null), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "88px"
    }
  }, _react.default.createElement(_SaveButton.default, {
    handleClick: props.handleButtonClick,
    submitting: props.submitting,
    ctx: {
      name: "store",
      val: '',
      type: 'form_setup'
    },
    error: errors.formError,
    formMsg: props.updated && !props.saved ? "Changes require saving" : ''
  })))));
};

var _default = (0, _withFormConfigHandling.default)(FundSettings);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FundSettings, "FundSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FundSettings.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FundSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./FormButton":"src/Components/FormButton.js","./SaveButton":"src/Components/SaveButton.js","./Checkbox":"src/Components/Checkbox.js","./InputGroup":"src/Components/InputGroup.js","./TextGroup":"src/Components/TextGroup.js","./withFormConfigHandling":"src/Components/withFormConfigHandling.js"}],"src/Components/SubscriptionSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _InputGroup = _interopRequireDefault(require("./InputGroup"));

var _SelectGroup = _interopRequireDefault(require("./SelectGroup"));

var _withFormConfigHandling = _interopRequireDefault(require("./withFormConfigHandling"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var SubscriptionSettings = function SubscriptionSettings(props) {
  var fields = props.fields,
      errors = props.errors;

  var renderSubInputs = function renderSubInputs(num) {
    var arr = Array(num).fill(null);
    return arr.map(function (el, ind) {
      var subTypes = [{
        val: 'NewsletterSubs',
        label: 'Newsletter Subscribe'
      }, {
        val: 'NewsletterUnSubs',
        label: 'Newsletter Unsubscribe'
      }, {
        val: 'MarketingSubs',
        label: 'Marketing Subscribe'
      }, {
        val: 'MarketingUnSubs',
        label: 'Marketing Unubscribe'
      }];
      var options = subTypes.map(function (subType, sTind) {
        return _react.default.createElement("option", {
          key: "subOption-".concat(ind, "-").concat(sTind),
          value: subType.val
        }, subType.label);
      });
      return _react.default.createElement("fieldset", {
        key: "subInput-".concat(ind),
        className: "fieldset__bordered__3MgwP"
      }, _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement(_SelectGroup.default, {
        label: "Subscription ".concat(ind + 1, ": Type"),
        id: "subscriptions-".concat(ind, "-key"),
        specialStyle: "",
        required: true,
        value: fields.subscriptions[ind]["key"],
        error: errors.subscriptions[ind]["key"],
        handleInputChange: props.handleInputChange,
        options: options
      })), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement(_InputGroup.default, {
        type: "text",
        id: "subscriptions-".concat(ind, "-value"),
        specialStyle: "",
        label: "Subscription ".concat(ind + 1, ": Name"),
        placeholder: "i.e. Welcome, CBN, etc",
        required: true,
        value: fields.subscriptions[ind]["value"],
        handleInputChange: props.handleInputChange,
        error: errors.subscriptions[ind]["value"]
      })), _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement("div", null, _react.default.createElement(_FormButton.default, {
        val: "Remove",
        handleClick: props.handleButtonClick,
        ctx: {
          name: "subscriptions",
          val: ind,
          type: 'Remove'
        }
      }))));
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      props.handleButtonClick({
        name: "store",
        val: '',
        type: 'form_setup'
      });
    }
  }, _react.default.createElement("h3", null, "Configure Subscription Setttings"), renderSubInputs(fields.subscriptions.length), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "170px"
    }
  }, _react.default.createElement(_FormButton.default, {
    val: "Add Setting",
    handleClick: props.handleButtonClick,
    ctx: {
      name: "subscriptions",
      val: '',
      type: 'Add'
    }
  }))), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    style: {
      maxWidth: "88px"
    }
  }, _react.default.createElement(_SaveButton.default, {
    handleClick: props.handleButtonClick,
    submitting: props.submitting,
    ctx: {
      name: "store",
      val: '',
      type: 'form_setup'
    },
    error: errors.formError,
    formMsg: props.updated && !props.saved ? "Changes require saving" : ''
  })))));
};

var _default = (0, _withFormConfigHandling.default)(SubscriptionSettings);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SubscriptionSettings, "SubscriptionSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/SubscriptionSettings.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/SubscriptionSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./FormButton":"src/Components/FormButton.js","./SaveButton":"src/Components/SaveButton.js","./InputGroup":"src/Components/InputGroup.js","./SelectGroup":"src/Components/SelectGroup.js","./withFormConfigHandling":"src/Components/withFormConfigHandling.js"}],"src/Components/EmailSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _TextGroup = _interopRequireDefault(require("./TextGroup"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _withFormConfigHandling = _interopRequireDefault(require("./withFormConfigHandling"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var EmailSettings = function EmailSettings(props) {
  var fields = props.fields,
      errors = props.errors;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      props.handleButtonClick({
        name: "store",
        val: '',
        type: 'email_setup'
      });
    }
  }, _react.default.createElement("h3", null, "Configure Email Setttings"), _react.default.createElement("fieldset", {
    className: "fieldset__3xxg-"
  }, _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_TextGroup.default, {
    id: "header",
    specialStyle: "",
    email: true,
    label: "Email Header",
    maxLength: 65536,
    placeholder: "HTML tags for your Email Header, to be used with every email from props form. To have unique headers, leave props blank and put individual headers in the following textareas.",
    required: false,
    value: fields.header,
    handleInputChange: props.handleInputChange,
    error: errors.header,
    handleBlur: props.handleBlur
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_TextGroup.default, {
    id: "single",
    specialStyle: "",
    email: true,
    label: "Email Body in Response to One-Time Donations",
    maxLength: 65536,
    placeholder: "HTML tags for the main text/images/content of your email response",
    required: false,
    value: fields.single,
    handleInputChange: props.handleInputChange,
    error: errors.single,
    handleBlur: props.handleBlur
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_TextGroup.default, {
    id: "monthly",
    specialStyle: "",
    email: true,
    label: "Email Body in Response to Monthly Donations",
    maxLength: 65536,
    placeholder: "HTML tags for the main text/images/content of your email response",
    required: false,
    value: fields.monthly,
    handleInputChange: props.handleInputChange,
    error: errors.monthly,
    handleBlur: props.handleBlur
  })), _react.default.createElement("div", {
    className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
  }, _react.default.createElement(_TextGroup.default, {
    id: "product",
    specialStyle: "",
    email: true,
    label: "Email Body in Response to Product Orders",
    maxLength: 65536,
    placeholder: "HTML tags for the main text/images/content of your email response",
    required: false,
    value: fields.product,
    handleInputChange: props.handleInputChange,
    error: errors.product,
    handleBlur: props.handleBlur
  }))), _react.default.createElement(_SaveButton.default, {
    handleClick: props.handleButtonClick,
    submitting: props.submitting,
    ctx: {
      name: "store",
      val: '',
      type: 'email_setup'
    },
    error: errors.formError,
    formMsg: props.updated && !props.saved ? "Changes require saving" : ''
  })));
};

var _default = (0, _withFormConfigHandling.default)(EmailSettings);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(EmailSettings, "EmailSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/EmailSettings.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/EmailSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./TextGroup":"src/Components/TextGroup.js","./SaveButton":"src/Components/SaveButton.js","./withFormConfigHandling":"src/Components/withFormConfigHandling.js"}],"src/Components/StyleSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _form = _interopRequireDefault(require("./styles/form.css"));

var _flex = _interopRequireDefault(require("./styles/flex.css"));

var _SaveButton = _interopRequireDefault(require("./SaveButton"));

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _InputGroup = _interopRequireDefault(require("./InputGroup"));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/flex.css", function () {
    require("./styles/flex.css");
  });
}

if (module.hot) {
  module.hot.accept("./styles/form.css", function () {
    require("./styles/form.css");
  });
}

var StyleSettings =
/*#__PURE__*/
function (_Component) {
  _inherits(StyleSettings, _Component);

  function StyleSettings(props) {
    var _this;

    _classCallCheck(this, StyleSettings);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StyleSettings).call(this, props));
    var errors = {
      "formError": props.editMode ? "" : "Above Values Are Not Stored in the DB"
    };

    for (var defaultValue in props.defaultValues) {
      errors[defaultValue] = '';
    }

    _this.state = {
      editMode: props.editMode,
      submitting: false,
      updated: false,
      saved: false,
      initialState: _extends({}, props.defaultValues),
      fields: _extends({}, props.defaultValues),
      currentForm: props.currentForm,
      errors: errors
    };
    _this.handleButtonClick = _this.handleButtonClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderInputs = _this.renderInputs.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUnload = _this.handleUnload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  } // NEED TO HANDLE UPDATES TO STATE OUTSIDE OF THIS COMPONENT SOMEHOW !!!


  _createClass(StyleSettings, [{
    key: "componentDidMount",
    // don't let users leave page without warning
    value: function componentDidMount() {
      window.addEventListener('beforeunload', this.handleUnload);
    } // remove event listeners on unmount

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('beforeunload', this.handleUnload);
    }
  }, {
    key: "handleUnload",
    value: function handleUnload(e) {
      // console.log({updated: this.state.updated, saved: this.state.saved})
      if (this.state.updated && !this.state.saved) {
        e.preventDefault();
        e.returnValue = "Are you sure you want to go back?\n You may lose all your changes to this page.";
        return "Are you sure you want to go back?\n You may lose all your changes to this page.";
      }

      return void 0;
    }
  }, {
    key: "handleButtonClick",
    value: function handleButtonClick(ctx) {
      this.props.tabFunctions.handleStyleButtonClick(ctx, this.state.fields, this.state.errors, this.state.initialState, this.state.currentForm.form_status);
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(e) {
      var target = e.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;

      var fields = _extends({}, this.state.fields);

      var errors = _extends({}, this.state.errors);

      var error = '';
      errors[name] = error;
      fields[name] = value;
      var updated = JSON.stringify(fields) !== JSON.stringify(this.state.initialState);
      this.props.tabFunctions.handleStyleInputChange(fields, errors, updated);
    }
  }, {
    key: "renderInputs",
    value: function renderInputs(fields, errors) {
      var _this2 = this;

      var fieldNames = Object.keys(fields);
      var groups = fieldNames.reduce(function (acc, name) {
        var fieldGroup = name.substring(2).split("-")[0];

        if (!acc[fieldGroup]) {
          acc[fieldGroup] = [name];
        } else {
          acc[fieldGroup].push(name);
        }

        return acc;
      }, {});
      var returnArray = [];

      var _loop = function _loop(group) {
        returnArray.push(groups[group].map(function (field, ind) {
          return _react.default.createElement(_react.default.Fragment, {
            key: "".concat(group, "-").concat(ind)
          }, _react.default.createElement(_InputGroup.default, {
            type: "text",
            id: field,
            specialStyle: "",
            label: field.includes('externalFont') ? field : field.substring(2),
            placeholder: "CSS",
            maxLength: 32,
            required: true,
            value: fields[field],
            handleInputChange: _this2.handleInputChange,
            error: errors[field]
          }), _this2.props.displayMode === "Colors" ? _react.default.createElement("div", {
            style: {
              boxSizing: "border-box",
              border: "1px solid #ccc",
              height: "30px",
              width: "30px",
              marginLeft: "0",
              marginTop: "24px",
              backgroundColor: fields[field]
            }
          }) : field.includes('externalFont') ? _react.default.createElement("div", null, _react.default.createElement(_FormButton.default, {
            val: "Remove",
            handleClick: _this2.handleButtonClick,
            ctx: {
              name: "externalFonts",
              val: field,
              type: 'Remove'
            }
          })) : null);
        }));
      };

      for (var group in groups) {
        _loop(group);
      }

      return returnArray.map(function (arr, i) {
        return _react.default.createElement("fieldset", {
          key: "groups-".concat(i),
          className: "fieldset__bordered__3MgwP",
          style: {
            padding: "20px"
          }
        }, _react.default.createElement("div", {
          className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-left__2XM1d flex-axes-center__gx3gz flex-wrap__3nXfa"
        }, arr));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          fields = _this$state.fields,
          errors = _this$state.errors;
      var title = this.props.displayMode == "Spacing" ? "Spacing" : this.props.displayMode.slice(0, -1);
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("form", {
        onSubmit: function onSubmit(e) {
          e.preventDefault();

          _this3.handleButtonClick({
            name: "store",
            val: '',
            type: 'css_setup'
          });
        }
      }, _react.default.createElement("h3", null, "Configure ", title, " Setttings"), _react.default.createElement("fieldset", {
        className: "fieldset__3xxg-"
      }, this.renderInputs(fields, errors), this.props.displayMode === "Fonts" ? _react.default.createElement("div", {
        className: "form-row__2dOBD flex__2SHge flex-row__M7mg4 flex-axes-center__gx3gz"
      }, _react.default.createElement("div", {
        style: {
          maxWidth: "225px"
        }
      }, _react.default.createElement(_FormButton.default, {
        val: "Add External Font",
        handleClick: this.handleButtonClick,
        ctx: {
          name: "externalFonts",
          val: '',
          type: 'Add'
        }
      }))) : null), _react.default.createElement(_SaveButton.default, {
        handleClick: this.handleButtonClick,
        submitting: this.state.submitting,
        ctx: {
          name: "store",
          val: '',
          type: 'css_setup'
        },
        error: errors.formError,
        formMsg: this.state.updated && !this.state.saved ? "Changes require saving" : ''
      })));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      console.info("Here We Go!");
      var styleSettings = nextProps.styleSettings,
          displayMode = nextProps.displayMode;
      var newSettings = styleSettings ? JSON.stringify(styleSettings) : "";
      var oldSettings = prevState.styleSettings ? JSON.stringify(prevState.styleSettings) : "";
      var errors = styleSettings.errors,
          fields = styleSettings.fields;
      var errKeys = Object.keys(errors);
      var fieldKeys = Object.keys(fields);

      if (displayMode !== prevState.displayMode) {
        var _errors = {
          formError: nextProps.editMode ? "" : "Above Values Are Not Stored in the DB"
        };

        for (var defaultValue in nextProps.defaultValues) {
          _errors[defaultValue] = '';
        }

        var newDefaults = nextProps.defaultValues ? JSON.stringify(nextProps.defaultValues) : "";
        var oldDefaults = prevState.defaultValues ? JSON.stringify(prevState.defaultValues) : "";

        if (oldDefaults !== newDefaults) {
          console.info('New Defaults');
          return {
            editMode: nextProps.editMode,
            submitting: false,
            updated: false,
            saved: false,
            initialState: _extends({}, nextProps.defaultValues),
            fields: _extends({}, nextProps.defaultValues),
            currentForm: nextProps.currentForm,
            styleSettings: nextProps.styleSettings,
            displayMode: nextProps.displayMode,
            errors: _errors
          };
        } else {
          console.info("No New Defaults, Should never get here");
          return null;
        }
      } else if (newSettings !== oldSettings) {
        console.info('New Settings');
        return {
          saved: nextProps.styleSettings.saved,
          updated: nextProps.styleSettings.updated,
          submitting: nextProps.styleSettings.submitting,
          fields: _extends({}, nextProps.styleSettings.fields),
          errors: _extends({}, nextProps.styleSettings.errors),
          styleSettings: nextProps.styleSettings
        };
      } else if (!errKeys.length && !fieldKeys.length) {
        console.info('New Defaults, form saved');
        var _errors2 = {
          formError: ""
        };

        for (var _defaultValue in nextProps.defaultValues) {
          _errors2[_defaultValue] = '';
        }

        return {
          editMode: nextProps.editMode,
          submitting: false,
          updated: false,
          saved: false,
          initialState: _extends({}, nextProps.defaultValues),
          fields: _extends({}, nextProps.defaultValues),
          currentForm: nextProps.currentForm,
          styleSettings: nextProps.styleSettings,
          displayMode: nextProps.displayMode,
          errors: _errors2
        };
      } else {
        console.info("No New Settings and No New Defaults"); // console.log({defaultValues: nextProps.defaultValues})

        return {
          submitting: false
        };
      }
    }
  }]);

  return StyleSettings;
}(_react.Component);

exports.default = StyleSettings;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StyleSettings, "StyleSettings", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/StyleSettings.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/form.css":"src/Components/styles/form.css","./styles/flex.css":"src/Components/styles/flex.css","./SaveButton":"src/Components/SaveButton.js","./FormButton":"src/Components/FormButton.js","./InputGroup":"src/Components/InputGroup.js"}],"src/Components/TabBody.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabBody;

var _react = _interopRequireDefault(require("react"));

var _tabs = _interopRequireDefault(require("./styles/tabs.css"));

var _getDefaultValues = require("./helpers/getDefaultValues");

var _ListForms = _interopRequireDefault(require("./ListForms"));

var _AddForm = _interopRequireDefault(require("./AddForm"));

var _FormSettings = _interopRequireDefault(require("./FormSettings"));

var _NameSettings = _interopRequireDefault(require("./NameSettings"));

var _GivingSettings = _interopRequireDefault(require("./GivingSettings"));

var _ProductSettings = _interopRequireDefault(require("./ProductSettings"));

var _FundSettings = _interopRequireDefault(require("./FundSettings"));

var _SubscriptionSettings = _interopRequireDefault(require("./SubscriptionSettings"));

var _EmailSettings = _interopRequireDefault(require("./EmailSettings"));

var _StyleSettings = _interopRequireDefault(require("./StyleSettings"));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/tabs.css", function () {
    require("./styles/tabs.css");
  });
}

function TabBody(props) {
  var editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new";
  var defaultValues = {};

  function renderBody(props, editMode, defaultValues) {
    // console.log({k, formList, user})
    switch (props.displayMode) {
      case "List":
        var _props$tabData = props.tabData,
            k = _props$tabData.k,
            formList = _props$tabData.formList;
        return _react.default.createElement(_ListForms.default, {
          tabFunctions: props.tabFunctions,
          k: k,
          formList: formList
        });
        break;

      case "Add":
        var user = props.tabData.user;
        return _react.default.createElement(_AddForm.default, {
          tabFunctions: props.tabFunctions,
          user: user
        });
        break;

      case "Settings":
        var config = _extends({}, props.tabData.formConfig, {
          "form_status": props.currentForm.form_status
        });

        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, config);
        return _react.default.createElement(_FormSettings.default, {
          currentForm: props.currentForm,
          displayMode: props.displayMode,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          config: props.tabData.formConfig
        });
        break;

      case "Name/Address":
        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, props.tabData.formConfig);
        return _react.default.createElement(_NameSettings.default, {
          currentForm: props.currentForm,
          displayMode: props.displayMode,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          config: props.tabData.formConfig
        });
        break;

      case "Gifts":
        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, props.tabData.formConfig);
        return _react.default.createElement(_GivingSettings.default, {
          currentForm: props.currentForm,
          displayMode: props.displayMode,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          config: props.tabData.formConfig
        });
        break;

      case "Products":
        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, props.tabData.formConfig);
        return _react.default.createElement(_ProductSettings.default, {
          currentForm: props.currentForm,
          displayMode: props.displayMode,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          config: props.tabData.formConfig
        });
        break;

      case "Funds":
        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, props.tabData.formConfig);
        return _react.default.createElement(_FundSettings.default, {
          currentForm: props.currentForm,
          displayMode: props.displayMode,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          config: props.tabData.formConfig
        });
        break;

      case "Subscriptions":
        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, props.tabData.formConfig);
        return _react.default.createElement(_SubscriptionSettings.default, {
          currentForm: props.currentForm,
          displayMode: props.displayMode,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          config: props.tabData.formConfig
        });
        break;

      case "Emails":
        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, props.tabData.emailConfig);
        return _react.default.createElement(_EmailSettings.default, {
          currentForm: props.currentForm,
          displayMode: props.displayMode,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          config: props.tabData.emailConfig
        });
        break;

      case "Colors":
      case "Fonts":
      case "Spacing":
        defaultValues = (0, _getDefaultValues.getDefaultValues)(editMode, props.displayMode, props.tabData.cssConfig);
        return _react.default.createElement(_StyleSettings.default, {
          styleSettings: props.styleSettings,
          currentForm: props.currentForm,
          tabFunctions: props.tabFunctions,
          defaultValues: defaultValues,
          editMode: editMode,
          config: props.tabData.cssConfig,
          displayMode: props.displayMode
        });
        break;

      default:
        return null;
    }
  }

  return _react.default.createElement("div", {
    className: "tab-body__NBDFj"
  }, renderBody(props, editMode, defaultValues));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TabBody, "TabBody", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/TabBody.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/tabs.css":"src/Components/styles/tabs.css","./helpers/getDefaultValues":"src/Components/helpers/getDefaultValues.js","./ListForms":"src/Components/ListForms.js","./AddForm":"src/Components/AddForm.js","./FormSettings":"src/Components/FormSettings.js","./NameSettings":"src/Components/NameSettings.js","./GivingSettings":"src/Components/GivingSettings.js","./ProductSettings":"src/Components/ProductSettings.js","./FundSettings":"src/Components/FundSettings.js","./SubscriptionSettings":"src/Components/SubscriptionSettings.js","./EmailSettings":"src/Components/EmailSettings.js","./StyleSettings":"src/Components/StyleSettings.js"}],"src/Components/Metatabs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MetaTabs;

var _react = _interopRequireDefault(require("react"));

var _TabHead = _interopRequireDefault(require("./TabHead"));

var _TabBody = _interopRequireDefault(require("./TabBody"));

var _tabs = _interopRequireDefault(require("./styles/tabs.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/tabs.css", function () {
    require("./styles/tabs.css");
  });
}

function MetaTabs(props) {
  // console.log({enabled: props.enabled})
  var k = props.k,
      formList = props.formList,
      getExistingFormInfo = props.getExistingFormInfo,
      adminMode = props.adminMode,
      setAdminMode = props.setAdminMode,
      createForm = props.createForm,
      setApiKey = props.setApiKey,
      enabled = props.enabled,
      toggleBtnEnable = props.toggleBtnEnable,
      user = props.user;
  var tabHeads = ["List Forms", "Add New Form"];
  var tabs = tabHeads.map(function (th, ind) {
    return _react.default.createElement(_TabHead.default, {
      enabled: enabled,
      content: th,
      handleClick: setAdminMode,
      mode: adminMode,
      key: "th-".concat(ind),
      toggleBtnEnable: toggleBtnEnable
    });
  }); // console.log({props, user})

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "tab-headers__1VkgL"
  }, tabs), _react.default.createElement(_TabBody.default, {
    displayMode: adminMode,
    tabFunctions: {
      getExistingFormInfo: getExistingFormInfo,
      setAdminMode: setAdminMode,
      setApiKey: setApiKey,
      toggleBtnEnable: toggleBtnEnable,
      createForm: createForm
    },
    tabData: {
      k: k,
      formList: formList,
      user: user
    }
  }));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MetaTabs, "MetaTabs", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/Metatabs.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./TabHead":"src/Components/TabHead.js","./TabBody":"src/Components/TabBody.js","./styles/tabs.css":"src/Components/styles/tabs.css"}],"src/Components/FormPreview.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fetchHelpers = require("./helpers/fetch-helpers");

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var FormPreview =
/*#__PURE__*/
function (_Component) {
  _inherits(FormPreview, _Component);

  function FormPreview(props) {
    var _this;

    _classCallCheck(this, FormPreview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormPreview).call(this, props));
    _this.state = {
      id: ''
    };
    return _this;
  }

  _createClass(FormPreview, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var options, currentForm, _ref, id;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _extends({}, this.props.options), currentForm = this.props.currentForm;
                options.method = 'POST';
                options.body = JSON.stringify({
                  title: "Preview Page",
                  content: "[cbngivingform form_name='".concat(currentForm.form_name, "']"),
                  type: 'page'
                });
                _context.prev = 3;
                _context.next = 6;
                return (0, _fetchHelpers.callApi)('/wp-json/wp/v2/pages', options);

              case 6:
                _ref = _context.sent;
                id = _ref.id;
                // console.log({id})
                this.setState({
                  id: id
                });
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);
                console.error(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 11]]);
      }));

      return function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      };
    }()
  }, {
    key: "componentWillUnmount",
    value: function () {
      var _componentWillUnmount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var options, id, success;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _extends({}, this.props.options);
                options.method = 'DELETE';
                id = this.state.id;
                _context2.prev = 3;
                _context2.next = 6;
                return (0, _fetchHelpers.callApi)("/wp-json/wp/v2/pages/".concat(id, "?force=true"), options);

              case 6:
                success = _context2.sent;
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                console.error(_context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));

      return function componentWillUnmount() {
        return _componentWillUnmount.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      var id = this.state.id;
      return _react.default.createElement("iframe", {
        src: "/?page_id=".concat(id, "&preview=true"),
        style: {
          width: "100%",
          height: "100vh"
        }
      });
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return FormPreview;
}(_react.Component);

var _default = FormPreview;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormPreview, "FormPreview", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FormPreview.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FormPreview.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./helpers/fetch-helpers":"src/Components/helpers/fetch-helpers.js"}],"src/Components/FormOptionsTabs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormOptionsTabs;

var _react = _interopRequireDefault(require("react"));

var _TabHead = _interopRequireDefault(require("./TabHead"));

var _TabBody = _interopRequireDefault(require("./TabBody"));

var _FormPreview = _interopRequireDefault(require("./FormPreview"));

var _tabs = _interopRequireDefault(require("./styles/tabs.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/tabs.css", function () {
    require("./styles/tabs.css");
  });
}

function FormOptionsTabs(props) {
  var adminMode = props.adminMode,
      viewMode = props.viewMode,
      setViewMode = props.setViewMode,
      formConfig = props.formConfig,
      storeConfig = props.storeConfig,
      emailConfig = props.emailConfig,
      currentForm = props.currentForm,
      enabled = props.enabled,
      toggleBtnEnable = props.toggleBtnEnable,
      options = props.options;
  var subHeads = ["Settings", "Name/Address", "Gifts", "Products", "Funds", "Subscriptions", "Emails", "Style"];

  if (currentForm.form_status !== "new" && viewMode !== "Style") {
    subHeads.push("Preview");
  }

  var tabs = subHeads.map(function (th, ind) {
    return _react.default.createElement(_TabHead.default, {
      enabled: enabled,
      content: th,
      handleClick: setViewMode,
      mode: viewMode,
      key: "sh-".concat(ind),
      toggleBtnEnable: toggleBtnEnable
    });
  });
  return _react.default.createElement(_react.default.Fragment, null, adminMode !== "List" && adminMode !== "Add" ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "tab-headers__submenu__171P4"
  }, tabs), viewMode !== "Style" && viewMode !== "Preview" ? _react.default.createElement(_TabBody.default, {
    currentForm: currentForm,
    adminMode: adminMode,
    displayMode: viewMode,
    tabFunctions: {
      storeConfig: storeConfig,
      toggleBtnEnable: toggleBtnEnable
    },
    tabData: {
      formConfig: formConfig,
      emailConfig: emailConfig
    }
  }) : null, viewMode === "Preview" && currentForm.form_status !== "new" ? _react.default.createElement(_FormPreview.default, {
    currentForm: currentForm,
    options: options
  }) : null) : null);
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormOptionsTabs, "FormOptionsTabs", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/FormOptionsTabs.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./TabHead":"src/Components/TabHead.js","./TabBody":"src/Components/TabBody.js","./FormPreview":"src/Components/FormPreview.js","./styles/tabs.css":"src/Components/styles/tabs.css"}],"src/Components/styles/spinner.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "loading_spinner": "loading_spinner__37U-R",
  "loading_spinner__flames": "loading_spinner__flames__UnrtD",
  "loading_spinner__back": "loading_spinner__back__2ezX6",
  "flamerotate": "flamerotate__3qZFi"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/Spinner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Spinner;

var _react = _interopRequireDefault(require("react"));

var _spinner = _interopRequireDefault(require("./styles/spinner.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/spinner.css", function () {
    require("./styles/spinner.css");
  });
}

function Spinner() {
  return _react.default.createElement("div", {
    className: "loading_spinner__37U-R"
  }, _react.default.createElement("img", {
    className: "loading_spinner__flames__UnrtD",
    src: "//www1.cbn.com/sites/all/themes/cbn_default/images/spinner/cbn-flame-circle.png"
  }), _react.default.createElement("img", {
    className: "loading_spinner__back__2ezX6",
    src: "//www1.cbn.com/sites/all/themes/cbn_default/images/spinner/loader-spinner@3x.png"
  }));
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Spinner, "Spinner", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/Spinner.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./styles/spinner.css":"src/Components/styles/spinner.css"}],"src/Components/styles/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "page-wrapper": "page-wrapper__2t2gj",
  "not-permissible-heading": "not-permissible-heading__zbeGs",
  "hidden": "hidden__23EVj"
};
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/Components/StyleOptionsTabs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StyleOptionsTabs;

var _react = _interopRequireDefault(require("react"));

var _TabHead = _interopRequireDefault(require("./TabHead"));

var _TabBody = _interopRequireDefault(require("./TabBody"));

var _FormPreview = _interopRequireDefault(require("./FormPreview"));

var _tabs = _interopRequireDefault(require("./styles/tabs.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (module.hot) {
  module.hot.accept("./styles/tabs.css", function () {
    require("./styles/tabs.css");
  });
}

function StyleOptionsTabs(props) {
  var options = props.options,
      adminMode = props.adminMode,
      viewMode = props.viewMode,
      styleMode = props.styleMode,
      setStyleMode = props.setStyleMode,
      cssConfig = props.cssConfig,
      storeConfig = props.storeConfig,
      currentForm = props.currentForm,
      enabled = props.enabled,
      toggleBtnEnable = props.toggleBtnEnable,
      handleStyleButtonClick = props.handleStyleButtonClick,
      handleStyleInputChange = props.handleStyleInputChange,
      styleSettings = props.styleSettings;
  var subHeads = ["Colors", "Fonts", "Spacing"];

  if (currentForm.form_status !== "new") {
    subHeads.push("Preview");
  }

  var tabs = subHeads.map(function (th, ind) {
    return _react.default.createElement(_TabHead.default, {
      enabled: enabled,
      content: th,
      handleClick: setStyleMode,
      mode: styleMode,
      key: "sh-".concat(ind),
      toggleBtnEnable: toggleBtnEnable
    });
  });
  return _react.default.createElement(_react.default.Fragment, null, adminMode !== "List" && adminMode !== "Add" && viewMode === "Style" ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "tab-headers__submenu--tertiary__akazl"
  }, tabs), styleMode !== "Preview" ? _react.default.createElement(_TabBody.default, {
    currentForm: currentForm,
    adminMode: adminMode,
    displayMode: styleMode,
    tabFunctions: {
      storeConfig: storeConfig,
      toggleBtnEnable: toggleBtnEnable,
      handleStyleButtonClick: handleStyleButtonClick,
      handleStyleInputChange: handleStyleInputChange
    },
    tabData: {
      cssConfig: cssConfig
    },
    styleSettings: styleSettings
  }) : currentForm.form_status !== "new" ? _react.default.createElement(_FormPreview.default, {
    currentForm: currentForm,
    options: options
  }) : null) : null);
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StyleOptionsTabs, "StyleOptionsTabs", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/StyleOptionsTabs.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./TabHead":"src/Components/TabHead.js","./TabBody":"src/Components/TabBody.js","./FormPreview":"src/Components/FormPreview.js","./styles/tabs.css":"src/Components/styles/tabs.css"}],"src/Components/helpers/getFontInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFontInfo = getFontInfo;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

/**
 * Function that expects to receive a boolean flag plus an object of key/value pairs that represent css variable declarations for font-family
 * @param {Boolean} editMode 
 * @param {String} key - key to search for withing config
 * @param {Object} cssConfig 
 * @returns {Object} - fontInfo.fonts = Array, fontInfo.count = Number
 */
function getFontInfo() {
  var editMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (editMode && key) {
    var fontKeys = Object.keys(config);
    var fontInfo = fontKeys.filter(function (el) {
      return el.includes(key);
    }).reduce(function (acc, font) {
      if (acc.fonts.indexOf(config[font]) < 0) {
        acc.fonts.push(config[font]);
        acc.count++;
      }

      return acc;
    }, {
      fonts: [],
      count: 0
    });
    return fontInfo;
  } else {
    return {
      fonts: [],
      count: 0
    };
  }
}

;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getFontInfo, "getFontInfo", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/helpers/getFontInfo.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js"}],"src/Components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHotLoader = require("react-hot-loader");

var _fetchHelpers = require("./helpers/fetch-helpers");

var _Metatabs = _interopRequireDefault(require("./Metatabs.js"));

var _FormOptionsTabs = _interopRequireDefault(require("./FormOptionsTabs"));

var _Spinner = _interopRequireDefault(require("./Spinner"));

var _main = _interopRequireDefault(require("./styles/main.css"));

var _StyleOptionsTabs = _interopRequireDefault(require("./StyleOptionsTabs"));

var _getFontInfo2 = require("./helpers/getFontInfo");

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

if (module.hot) {
  module.hot.accept("./styles/main.css", function () {
    require("./styles/main.css");
  });
}

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      base: props.mode == 'local' ? 'http://givingwp.dmgdev.cbn.local' : '',
      btnsEnabled: false,
      configured: false,
      permissible: false,
      adminMode: "List",
      currentForm: {
        id: -1,
        form_name: '',
        form_status: ''
      },
      viewMode: "Settings",
      styleMode: "Colors",
      formConfig: {},
      cssConfig: {},
      emailConfig: {},
      user: {},
      k: '',
      formList: [],
      options: {
        credentials: "include",
        method: "GET",
        headers: {
          "X-WP-Nonce": props.wpnonce,
          "Content-Type": 'application/json'
        }
      },
      styleSettings: {
        errors: {},
        fields: {},
        updated: false,
        saved: false,
        submitting: false
      }
    };
    _this.handleAdminMode = _this.handleAdminMode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleViewMode = _this.handleViewMode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleStyleMode = _this.handleStyleMode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getExistingFormInfo = _this.getExistingFormInfo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleAPIErrors = _this.handleAPIErrors.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.storeConfig = _this.storeConfig.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setApiKey = _this.setApiKey.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleBtnEnable = _this.toggleBtnEnable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.createForm = _this.createForm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleStyleButtonClick = _this.handleStyleButtonClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleStyleInputChange = _this.handleStyleInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var profile, primaryRole, isAdmin, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _fetchHelpers.callApi)("".concat(this.state.base, "/wp-json/wp/v2/users/me?context=edit"), this.state.options);

              case 3:
                profile = _context.sent;
                primaryRole = profile.roles && profile.roles.length ? profile.roles[0] : '';
                isAdmin = primaryRole.toLowerCase() === "administrator";
                user = {
                  id: profile.id,
                  username: profile.username,
                  email: profile.email
                };
                this.setState({
                  configured: true,
                  permissible: isAdmin,
                  user: user,
                  btnsEnabled: true
                });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (this.props.mode == 'local') {
                  this.setState({
                    configured: true,
                    permissible: true,
                    btnsEnabled: true,
                    user: {
                      id: 1,
                      username: 'dmg',
                      email: 'wesley.handy@cbn.org'
                    }
                  });
                } else {
                  this.handleAPIErrors(_context.t0);
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      return function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      };
    }()
    /**
     * 
     * @param {String} adminMode - "List, Edit, or Add"
     * @param {Number} id - WPDB ID of form being edited
     */

  }, {
    key: "handleAdminMode",
    value: function handleAdminMode(adminMode) {
      var _this2 = this;

      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      if (adminMode === "Edit") {
        this.setState({
          btnsEnabled: false
        },
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var result, formConfig, cssConfig, emailConfig, form_name, form_status;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return (0, _fetchHelpers.callApi)("".concat(_this2.state.base, "/wp-json/cbngiving/v1/admin/forms/single/").concat(id), _this2.state.options);

                case 3:
                  result = _context2.sent;
                  formConfig = result.formConfig, cssConfig = result.cssConfig, emailConfig = result.emailConfig, form_name = result.form_name, form_status = result.form_status;
                  formConfig = JSON.parse(formConfig), cssConfig = JSON.parse(cssConfig), emailConfig = JSON.parse(emailConfig); // console.log({formConfig, cssConfig, emailConfig})

                  _this2.setState({
                    formConfig: formConfig,
                    cssConfig: cssConfig,
                    emailConfig: emailConfig,
                    currentForm: {
                      id: id,
                      form_name: form_name,
                      form_status: form_status
                    },
                    adminMode: adminMode,
                    btnsEnabled: true
                  });

                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2["catch"](0);

                  _this2.handleAPIErrors(_context2.t0);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 9]]);
        })));
      } else {
        this.setState({
          adminMode: adminMode,
          currentForm: {
            id: -1,
            form_name: '',
            form_status: ''
          },
          formConfig: {},
          cssConfig: {},
          emailConfig: {}
        });
      }
    }
  }, {
    key: "handleViewMode",
    value: function handleViewMode(viewMode) {
      // console.log({viewMode})
      this.setState({
        viewMode: viewMode
      });
    }
  }, {
    key: "handleStyleMode",
    value: function handleStyleMode(styleMode) {
      // console.log({styleMode})
      this.setState({
        styleMode: styleMode
      });
    }
    /**
     * Function to enable or disable buttons
     * @param {Boolean} enableVal 
     */

  }, {
    key: "toggleBtnEnable",
    value: function toggleBtnEnable(enableVal) {
      // console.log({enableVal, priorState: this.state.btnsEnabled})
      this.setState(function (state, props) {
        return {
          btnsEnabled: state.btnsEnabled !== enableVal ? enableVal : state.btnsEnabled
        };
      });
    }
  }, {
    key: "getExistingFormInfo",
    value: function () {
      var _getExistingFormInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var callback, _callback;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _callback = function _ref5() {
                  _callback = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3() {
                    var _ref2, _ref3, k, list;

                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return Promise.all([(0, _fetchHelpers.callApi)("".concat(this.state.base, "/wp-json/cbngiving/v1/admin/forms/api"), this.state.options), (0, _fetchHelpers.callApi)("".concat(this.state.base, "/wp-json/cbngiving/v1/admin/forms/list/all"), this.state.options)]);

                          case 3:
                            _ref2 = _context3.sent;
                            _ref3 = _slicedToArray(_ref2, 2);
                            k = _ref3[0];
                            list = _ref3[1];
                            this.setState({
                              k: k.key,
                              formList: list,
                              btnsEnabled: true
                            });
                            _context3.next = 14;
                            break;

                          case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3["catch"](0);
                            this.handleAPIErrors(_context3.t0);
                            this.setState({
                              btnsEnabled: true
                            });

                          case 14:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this, [[0, 10]]);
                  }));
                  return _callback.apply(this, arguments);
                };

                callback = function _ref4() {
                  return _callback.apply(this, arguments);
                };

                this.setState({
                  btnsEnabled: false
                }, callback);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getExistingFormInfo() {
        return _getExistingFormInfo.apply(this, arguments);
      };
    }()
    /**
     * In response to btn click, accepts form_name and user.id to insert a new form record in WPDB
     * @param {String} form_name - unique string
     * @param {Number} created_by - user.id
     * @returns either integer ID of new form or Boolean False
     */

  }, {
    key: "createForm",
    value: function () {
      var _createForm = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(form_name, created_by) {
        var options, _ref6, completed, id;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                options = _extends({}, this.state.options);
                options.method = "POST";
                options.body = JSON.stringify({
                  form_name: form_name,
                  created_by: created_by
                });
                _context5.next = 6;
                return (0, _fetchHelpers.callApi)("".concat(this.state.base, "/wp-json/cbngiving/v1/admin/forms/single/create"), options);

              case 6:
                _ref6 = _context5.sent;
                completed = _ref6.completed;
                id = _ref6.id;

                if (completed) {
                  this.setState({
                    currentFormId: id
                  });
                }

                return _context5.abrupt("return", id);

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](0);
                this.handleAPIErrors(_context5.t0);
                return _context5.abrupt("return", false);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 13]]);
      }));

      return function createForm(_x, _x2) {
        return _createForm.apply(this, arguments);
      };
    }()
    /**
     * Stores form config into DB and returns true oif complete
     * @param {Number} id - DB id of form
     * @param {String} type - form_setup, css_setup, or email_setup
     * @param {Object} data - entire config object to be updated
     * @param {String} form_status - status of current form
     * @returns {Boolean} true on success
     */

  }, {
    key: "storeConfig",
    value: function () {
      var _storeConfig = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(id, type, data) {
        var options, completed, config;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                options = _extends({}, this.state.options);
                options.method = "PUT";
                options.body = JSON.stringify(_defineProperty({}, type, data));
                _context6.next = 6;
                return (0, _fetchHelpers.callApi)("".concat(this.state.base, "/wp-json/cbngiving/v1/admin/forms/single/").concat(id, "?type=").concat(type), options);

              case 6:
                completed = _context6.sent;

                if (!(completed && type !== "form_status")) {
                  _context6.next = 13;
                  break;
                }

                config = type === "css_setup" ? "cssConfig" : type === "form_setup" ? "formConfig" : "emailConfig";

                if (!(type !== "css_setup")) {
                  _context6.next = 12;
                  break;
                }

                this.setState(_defineProperty({}, config, data));
                return _context6.abrupt("return", true);

              case 12:
                return _context6.abrupt("return", true);

              case 13:
                _context6.next = 19;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](0);
                this.handleAPIErrors(_context6.t0);
                return _context6.abrupt("return", false);

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 15]]);
      }));

      return function storeConfig(_x3, _x4, _x5) {
        return _storeConfig.apply(this, arguments);
      };
    }()
  }, {
    key: "setApiKey",
    value: function () {
      var _setApiKey = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(key, method) {
        var options, completed;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                options = _extends({}, this.state);
                options.method = method;
                options.body = JSON.stringify({
                  api_key: key
                });
                _context7.next = 6;
                return (0, _fetchHelpers.callApi)("".concat(this.state.base, "/wp-json/cbngiving/v1/admin/forms/api"), options);

              case 6:
                completed = _context7.sent;

                if (completed) {
                  this.setState({
                    k: key
                  });
                }

                return _context7.abrupt("return", true);

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](0);

                if (!_context7.t0.message.includes("Duplicate value.")) {
                  _context7.next = 18;
                  break;
                }

                console.error({
                  setApiKeyErr: _context7.t0
                });
                return _context7.abrupt("return", true);

              case 18:
                this.handleAPIErrors(_context7.t0);
                return _context7.abrupt("return", false);

              case 20:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 11]]);
      }));

      return function setApiKey(_x6, _x7) {
        return _setApiKey.apply(this, arguments);
      };
    }()
    /**
     * 
     * @param {Object} fields 
     * @param {Object} errors 
     * @param {boolean} updated 
     */

  }, {
    key: "handleStyleInputChange",
    value: function handleStyleInputChange(fields, errors, updated) {
      var _this3 = this;

      var styleSettings = _extends({}, this.state.styleSettings);

      styleSettings.fields = fields;
      styleSettings.errors = errors;
      styleSettings.updated = updated;
      this.setState({
        styleSettings: styleSettings
      }, function () {
        return _this3.toggleBtnEnable(updated ? false : true);
      });
    }
    /**
     * 
     * @param {Object} ctx 
     * @param {Object} initialState 
     * @param {Object} fields 
     * @param {Object} errors 
     */

  }, {
    key: "handleStyleButtonClick",
    value: function handleStyleButtonClick(ctx, fields, errors, initialState, form_status) {
      var _this4 = this;

      var styleSettings = _extends({}, this.state.styleSettings);

      if (ctx.name === "externalFonts") {
        // console.log({ctx})
        if (ctx.type === "Remove") {
          delete fields[ctx.val];
          delete errors[ctx.val];
        } else {
          var _getFontInfo = (0, _getFontInfo2.getFontInfo)(true, "externalFont", fields),
              count = _getFontInfo.count; //add empty field to setting


          fields["externalFont".concat(count)] = '';
          errors["externalFont".concat(count)] = '';
        } //update styleSettings


        styleSettings.fields = fields;
        styleSettings.errors = errors;
        styleSettings.updated = JSON.stringify(fields) !== JSON.stringify(initialState); // console.log({styleSettings})

        this.setState({
          styleSettings: styleSettings
        });
      } else {
        styleSettings.submitting = true;
        styleSettings.fields = fields;
        styleSettings.errors = errors;
        this.setState({
          styleSettings: styleSettings
        }, function () {
          _this4.toggleBtnEnable(false);

          var currentState = JSON.stringify(fields);
          var defaultValues = JSON.stringify(initialState);

          if (currentState !== defaultValues) {
            var cssConfig = _extends({}, _this4.state.cssConfig, fields);

            _this4.storeConfig(_this4.state.currentForm.id, ctx.type, cssConfig, form_status).then(function (success) {
              console.log({
                success: success
              });

              if (success) {
                //update settings
                styleSettings.submitting = false;
                styleSettings.updated = false;
                styleSettings.saved = true;
                styleSettings.errors = {};
                styleSettings.fields = {};

                _this4.setState({
                  styleSettings: styleSettings,
                  cssConfig: cssConfig
                }, function () {
                  _this4.toggleBtnEnable(true);
                });
              } else {
                errors['formError'] = "Unable to Save";
                styleSettings.submitting = false;
                styleSettings.saved = false;
                styleSettings.errors = errors;

                _this4.setState({
                  styleSettings: styleSettings
                });
              }
            });
          } else {
            styleSettings.submitting = false;

            _this4.setState({
              styleSettings: styleSettings
            }, function () {
              _this4.toggleBtnEnable(true);
            });
          }
        });
      }
    }
  }, {
    key: "handleAPIErrors",
    value: function handleAPIErrors(err) {
      console.error({
        err: err
      });
      alert('There was an error connecting with Wordpress.\nPlease verify that you are still connected to your wordpress installation and logged in.\nIf so, please contact Wesley.Handy@cbn.org with your issues');
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          permissible = _state.permissible,
          configured = _state.configured,
          btnsEnabled = _state.btnsEnabled,
          state = _objectWithoutProperties(_state, ["permissible", "configured", "btnsEnabled"]);

      return _react.default.createElement("div", {
        className: "page-wrapper__2t2gj",
        id: "react-page-top"
      }, configured && permissible ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Metatabs.default, {
        k: state.k,
        formList: state.formList,
        adminMode: state.adminMode,
        enabled: btnsEnabled,
        setAdminMode: this.handleAdminMode,
        getExistingFormInfo: this.getExistingFormInfo,
        setApiKey: this.setApiKey,
        createForm: this.createForm,
        toggleBtnEnable: this.toggleBtnEnable,
        user: state.user
      }), _react.default.createElement(_FormOptionsTabs.default, {
        options: state.options,
        adminMode: state.adminMode,
        viewMode: state.viewMode,
        formConfig: state.formConfig,
        emailConfig: state.emailConfig,
        currentForm: state.currentForm,
        enabled: btnsEnabled,
        setViewMode: this.handleViewMode,
        storeConfig: this.storeConfig,
        toggleBtnEnable: this.toggleBtnEnable
      }), _react.default.createElement(_StyleOptionsTabs.default, {
        options: state.options,
        adminMode: state.adminMode,
        viewMode: state.viewMode,
        styleMode: state.styleMode,
        cssConfig: state.cssConfig,
        currentForm: state.currentForm,
        enabled: btnsEnabled,
        setStyleMode: this.handleStyleMode,
        storeConfig: this.storeConfig,
        toggleBtnEnable: this.toggleBtnEnable,
        handleStyleInputChange: this.handleStyleInputChange,
        handleStyleButtonClick: this.handleStyleButtonClick,
        styleSettings: state.styleSettings
      })) : configured && !permissible ? _react.default.createElement("h1", {
        className: "not-permissible-heading__zbeGs"
      }, "You are not Authorized to View These Settings") : _react.default.createElement(_Spinner.default, null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return App;
}(_react.Component);

var _default = (0, _reactHotLoader.hot)(module)(App);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/App.js");
  reactHotLoader.register(_default, "default", "/Users/wehand/Code/cbngiving-wp-admin-react/src/Components/App.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","react":"node_modules/react/index.js","./helpers/fetch-helpers":"src/Components/helpers/fetch-helpers.js","./Metatabs.js":"src/Components/Metatabs.js","./FormOptionsTabs":"src/Components/FormOptionsTabs.js","./Spinner":"src/Components/Spinner.js","./styles/main.css":"src/Components/styles/main.css","./StyleOptionsTabs":"src/Components/StyleOptionsTabs.js","./helpers/getFontInfo":"src/Components/helpers/getFontInfo.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
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
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
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

  while (len) {
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
}; // v8 likes predictible objects


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

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"src/index.js":[function(require,module,exports) {
var process = require("process");
"use strict";

require("./vendors");

require("babel-polyfill");

var _promisePolyfill = _interopRequireDefault(require("promise-polyfill"));

require("raf/polyfill");

require("whatwg-fetch");

var _react = _interopRequireDefault(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _App = _interopRequireDefault(require("./Components/App"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

if (!window.Promise) {
  window.Promise = _promisePolyfill.default;
}

var mode;

if (process) {
  mode = 'local';
}

var rootEntry = document.getElementById('admin-root');
var wpnonce = rootEntry.dataset.nonce;
ReactDOM.render(_react.default.createElement(_App.default, {
  wpnonce: wpnonce,
  mode: mode
}), rootEntry);
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mode, "mode", "/Users/wehand/Code/cbngiving-wp-admin-react/src/index.js");
  reactHotLoader.register(rootEntry, "rootEntry", "/Users/wehand/Code/cbngiving-wp-admin-react/src/index.js");
  reactHotLoader.register(wpnonce, "wpnonce", "/Users/wehand/Code/cbngiving-wp-admin-react/src/index.js");
  leaveModule(module);
})();

;
},{"react-hot-loader":"node_modules/react-hot-loader/index.js","./vendors":"src/vendors.js","babel-polyfill":"node_modules/babel-polyfill/lib/index.js","promise-polyfill":"node_modules/promise-polyfill/src/index.js","raf/polyfill":"node_modules/raf/polyfill.js","whatwg-fetch":"node_modules/whatwg-fetch/fetch.js","react":"node_modules/react/index.js","react-dom":"node_modules/react-dom/index.js","./Components/App":"src/Components/App.js","process":"../../../../usr/local/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56146" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/css-loader.js":[function(require,module,exports) {
module.exports = function loadCSSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = bundle;

    link.onerror = function (e) {
      link.onerror = link.onload = null;
      reject(e);
    };

    link.onload = function () {
      link.onerror = link.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(link);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));b.register("css",require("../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/css-loader.js"));b.load([["sweetalert.min.0c0104f6.js","node_modules/sweetalert/dist/sweetalert.min.js"],["lib.391168ac.js","node_modules/babel-polyfill/lib/index.js"],["src.7aaf042a.js","node_modules/promise-polyfill/src/index.js"],["polyfill.cde8445e.js","node_modules/raf/polyfill.js"],["fetch.6e6c81fd.js","node_modules/whatwg-fetch/fetch.js"],["react-dom.29872971.js","node_modules/react-dom/index.js"]]).then(function(){require("src/index.js");});
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/src.a2b27638.map