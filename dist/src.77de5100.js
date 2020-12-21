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
})({"images/fly.png":[function(require,module,exports) {
module.exports = "/fly.4fa9170e.png";
},{}],"images/spider.png":[function(require,module,exports) {
module.exports = "/spider.10b05fe0.png";
},{}],"images/*.png":[function(require,module,exports) {
module.exports = {
  "fly": require("./fly.png"),
  "spider": require("./spider.png")
};
},{"./fly.png":"images/fly.png","./spider.png":"images/spider.png"}],"utils/RandomObjectMover.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RandomObjectMover =
/** @class */
function () {
  function RandomObjectMover(obj, speed) {
    if (speed === void 0) {
      speed = 250;
    }

    this.boundEvent = function () {};

    this.currentPosition = {
      x: 0,
      y: 0
    };
    this.isRunning = false;
    this.nextPosition = {
      x: 0,
      y: 0
    };
    this.object = obj;
    this.pixelsPerSecond = speed;
  }

  RandomObjectMover.prototype.calcDelta = function (a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  };

  RandomObjectMover.prototype.generateNewPosition = function () {
    // Get container dimensions minus div size
    var containerSize = this.getContainerDimensions();
    var availableHeight = containerSize.height - this.object.clientHeight;
    var availableWidth = containerSize.width - this.object.clientWidth; // Pick a random place in the space

    var x = Math.floor(Math.random() * availableWidth);
    var y = Math.floor(Math.random() * availableHeight);
    console.log('newPos', {
      oldPos: this.currentPosition,
      newPos: {
        x: x,
        y: y
      }
    });
    return {
      x: x,
      y: y
    };
  }; // TODO: needs a better name
  // window


  RandomObjectMover.prototype.getContainerDimensions = function () {
    return {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth
    };
  }; // TODO: Rotate a parent div of the bug??


  RandomObjectMover.prototype.moveOnce = function () {
    // Pick a new spot on the page
    var next = this.generateNewPosition(); // How far do we have to move?

    var delta = this.calcDelta(this.currentPosition, next); // Speed of this transition, rounded to 2DP

    var speed = Math.round(delta / this.pixelsPerSecond * 100) / 100;
    this.object.style.transition = "transform " + speed + "s linear";
    this.object.style.transform = "translate3d(" + next.x + "px, " + next.y + "px, 0)"; // this.object.style.transform = `rotate(${degree}deg)`;
    // Save this new position ready for the next call.

    this.currentPosition = next;
    this.isRunning = true;
  }; // TODO: give this a better name


  RandomObjectMover.prototype.rotate = function () {
    var _a = this.object.getClientRects()[0],
        top = _a.top,
        left = _a.left,
        width = _a.width,
        height = _a.height;
    var centerX = left + width / 2;
    var centerY = top + height / 2;
    var radians = Math.atan2(this.nextPosition.x - centerX, this.nextPosition.y - centerY); // const degree = radians * (180 / Math.PI) * -1 + 100;

    var degree = radians * (180 / Math.PI); // this.object.style.transition = `transform 0.01s linear`;
    // this.object.style.transform = `rotate(${degree}deg)`;

    console.log('rotating to', degree);
    return degree;
  };

  RandomObjectMover.prototype.setSpeed = function (pxPerSec) {
    this.pixelsPerSecond = pxPerSec;
  };

  RandomObjectMover.prototype.start = function () {
    if (this.isRunning) return; // Make sure our object has the right css set

    this.object.style.willChange = 'transform';
    this.object.style.pointerEvents = 'auto';
    this.boundEvent = this.moveOnce.bind(this); // Bind callback to keep things moving

    this.object.addEventListener('transitionend', this.boundEvent);
    this.moveOnce();
    this.isRunning = true;
  };

  RandomObjectMover.prototype.stop = function () {
    // if (!this.isRunning) return;
    this.object.removeEventListener('transitionend', this.boundEvent); // this.isRunning = false;
  };

  return RandomObjectMover;
}();

exports.default = RandomObjectMover;
},{}],"classes/Bug.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var __png_1 = __importDefault(require("../images/*.png"));

var RandomObjectMover_1 = __importDefault(require("../utils/RandomObjectMover")); // import { isNearEdge } from '../utils';


var Bug =
/** @class */
function () {
  function Bug(_a) {
    var _b = _a.frames,
        frames = _b === void 0 ? 0 : _b,
        _c = _a.height,
        height = _c === void 0 ? 20 : _c,
        _d = _a.maxSpeed,
        maxSpeed = _d === void 0 ? 13 : _d,
        _e = _a.minSpeed,
        minSpeed = _e === void 0 ? 6 : _e,
        _f = _a.sprite,
        sprite = _f === void 0 ? '' : _f,
        _g = _a.walkSpeed,
        walkSpeed = _g === void 0 ? 100 : _g,
        _h = _a.width,
        width = _h === void 0 ? 20 : _h;

    this.setStartTime = function (startTime, timestamp) {
      if (startTime === 0) return timestamp;
      return startTime;
    };

    this.bug = document.createElement('img');
    this.direction = [];
    this.frames = frames;
    this.height = height;
    this.isActive = false;
    this.isAlive = false;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.sprite = sprite;
    this.walkSpeed = walkSpeed;
    this.width = width;
  }

  Bug.prototype.appendBugToDOM = function () {
    document.body.appendChild(this.bug);
  };

  Bug.prototype.assignBugClassName = function () {
    this.bug.className = 'bug';
  };

  Bug.prototype.checkIfOnLastFrame = function (frame) {
    if (frame === this.frames - 1) {
      return 0;
    }

    return frame;
  };

  Bug.prototype.createBugImage = function () {
    this.bug.src = __png_1.default[this.sprite];
  };

  Bug.prototype.createBugStyles = function () {
    Object.assign(this.bug.style, {
      height: this.height + "px",
      left: 0,
      objectFit: 'none',
      objectPosition: '0 0',
      position: 'fixed',
      top: 0,
      width: this.width + "px",
      zIndex: '9999999'
    });
  };

  Bug.prototype.move = function () {
    var move = new RandomObjectMover_1.default(this.bug, 60);
    move.start();
  }; // moves the legs
  // TODO: rename this method


  Bug.prototype.updateBugObjectPosition = function (frame) {
    this.bug.style.objectPosition = "-" + (this.width + this.width * frame) + "px 0";
  };

  Bug.prototype.init = function () {
    this.create();
    this.walk();
    this.move();
  };

  Bug.prototype.create = function () {
    this.assignBugClassName();
    this.createBugImage();
    this.createBugStyles();
    this.appendBugToDOM();
  };

  Bug.prototype.walk = function () {
    var _this = this;

    var startTime = 0;

    var determineProgress = function determineProgress(startTime, timestamp) {
      return (timestamp - startTime) / 1 / _this.walkSpeed;
    };

    var walkCycle = function walkCycle(timestamp, frame) {
      startTime = _this.setStartTime(startTime, timestamp);
      var progress = determineProgress(startTime, timestamp);
      frame = _this.checkIfOnLastFrame(frame);

      if (progress >= 1) {
        _this.updateBugObjectPosition(frame);

        frame++;
        startTime = 0;
      }

      requestAnimationFrame(function (timestamp) {
        return walkCycle(timestamp, frame);
      });
    };

    requestAnimationFrame(function (timestamp) {
      return walkCycle(timestamp, 0);
    });
  };

  return Bug;
}();

exports.default = Bug;
},{"../images/*.png":"images/*.png","../utils/RandomObjectMover":"utils/RandomObjectMover.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Bug_1 = __importDefault(require("./classes/Bug"));

var Spider = new Bug_1.default({
  frames: 7,
  height: 90,
  width: 69,
  sprite: 'spider'
});
Spider.init();
},{"./classes/Bug":"classes/Bug.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54861" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map