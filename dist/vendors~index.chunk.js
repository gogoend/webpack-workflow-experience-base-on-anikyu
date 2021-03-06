(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _anikyu_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(103);
/* harmony import */ var _polyfill_requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(108);
/* harmony import */ var _polyfill_requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_polyfill_requestAnimationFrame_js__WEBPACK_IMPORTED_MODULE_1__);



// 判断文件是如何引入的，如果是通过模块引入则不在全局暴露Anikyu
// 直接在Webpack配置中改为UMD

/* harmony default export */ __webpack_exports__["default"] = (_anikyu_class_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(104);
/* harmony import */ var _event_doer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(105);
/* harmony import */ var _executor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(106);




function mixEaseFn (obj){
	for(let key in obj){
		_executor_js__WEBPACK_IMPORTED_MODULE_2__["ease"][key] = obj[key];
	}
}

class Anikyu extends _event_doer_js__WEBPACK_IMPORTED_MODULE_1__["default"] {

	constructor (el, queue, config) {
		super();
		this.el = el;
		this.queue = queue;

		let defaultConfig = {
			duration: 2000,
			easeType: 'quadraticInOut',
			manualNext: false
		};
		this.config = Object.assign(JSON.parse(JSON.stringify(defaultConfig)), config);

		this.i = 0;

		this.status = {
			paused: false
		};

		if (!this.queue[0]) {
			return;
		}
		if (!this.config.manualNext) {
			_executor_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(this);
		}

		// this.executor = this.executor.bind(this);

		this.reqAniHandler = null;

	}

	// 动画流程控制
	// 暂停、继续、重播当前
	pause () {
		let { status } = this;

		if (status.paused) return;

		let pausedTime = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["now"])();
		status.passedTime = pausedTime - status.startTime;
		status.paused = true;
	}
	resume () {
		let { status } = this;

		if (!status.paused) return;

		let startTime = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["now"])();
		status.startTime = startTime - status.passedTime;
		status.paused = false;
	}

	replay () {
		let { status, queue, i, resume } = this;

		if (!queue[i]) return;
		if (status.paused) (resume.bind(this))();

		_executor_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(this, i);
	}

	// 跳转到、上一个、下一个
	jump (index, finishCallFlag) {
		let { status, queue, resume } = this;

		if (!queue[index]) return;
		if (status.paused) (resume.bind(this))();

		_executor_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(this, finishCallFlag ? index - 2 : index - 1);

	}
	prev () {
		let { status, queue, i, resume } = this;
		if (!queue[i - 1]) return;

		if (status.paused) (resume.bind(this))();

		this.i--;
		_executor_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(this);
	}
	next () {
		let { status, queue, i, resume } = this;
		if (!queue[i + 1]) return;

		if (status.paused) (resume.bind(this))();

		this.i++;
		_executor_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(this);
	}

	// 废弃
	dispose () {
		let { queue, i, reqAniHandler, el } = this;

		let currentStageIndex = i + 1;
		cancelAnimationFrame(reqAniHandler);
		Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["trigger"])(this, 'dispose', el, {
			stageIndex: i,
			name: queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
		});
	}
}

Object.assign(Anikyu, {
	getStyle: _util_js__WEBPACK_IMPORTED_MODULE_0__["getStyle"], rand: _util_js__WEBPACK_IMPORTED_MODULE_0__["rand"], clamp: _util_js__WEBPACK_IMPORTED_MODULE_0__["clamp"], mixEaseFn
});

/* harmony default export */ __webpack_exports__["default"] = (Anikyu);

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyle", function() { return getStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trigger", function() { return trigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rand", function() { return rand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
// 用于对数值进行钳制
function clamp (value, min, max) {
	return Math.max(min, Math.min(max, value));
}

// 用于获得DOM元素computedStyle
function getStyle (obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle(obj, false)[attr];
	}
}

// 用于手动触发对象的事件
function trigger (obj, type, target,detail) {
	obj.fireEvent( type, {
		type,
		target,
		detail
	});
}

// 用于处理获得时间函数的兼容性，performance.now() 更为精准
function now () {
	if (typeof performance !== 'undefined' && performance.now) {
		return performance.now();
	}
	return Date.now ? Date.now() : (new Date()).getTime();
}

// 产生范围内随机数
function rand (min,max){
	return Math.random() * (max - min) + min;
}



/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let EventDoer = function () {
	this.listeners = {};
};

EventDoer.prototype = Object.assign({},{
	listeners:null,
	addEventListener (type, callback){
		if(!(type in this.listeners)){
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	},
	removeEventListener (type, callback){
		if(!(type in this.listeners)) return;
		let typeHandlers = this.listeners[type];
		for(let i = 0;i < typeHandlers.length;i++){
			if(typeHandlers[i] === callback){
				typeHandlers.splice(i,1);
				return;
			}
		}
	},
	fireEvent (name, detail){
		if(!(name in this.listeners)){
			return true;
		}
		let typeHandlers = this.listeners[name].concat();

		for(let i = 0;i < typeHandlers.length;i++){
			typeHandlers[i].call(this,detail);
		}
	},
	getListeners (name){
		if(name){
			return this.listeners[name];
		}
		return this.listeners;
	}
});

/* harmony default export */ __webpack_exports__["default"] = (EventDoer);


/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ease", function() { return ease; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return executor; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(104);
/* harmony import */ var _easing_funcs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(107);



let ease = Object.assign(_easing_funcs_js__WEBPACK_IMPORTED_MODULE_1__["easingFuncs"])

// 获得动画在当前进度时的变化增量
function getAddedValue (from, to, percent, easeFn, step) {
	return (to - from) * easeFn(percent, step);
}

// 动画执行器，用于在前后一对补间动画阶段之间进行补间
function executor (index) {

	if (!isNaN(parseInt(index))) {
		this.i = index;
	}

	let { el, i, queue, next, status, config, reqAniHandler } = this;

	cancelAnimationFrame(reqAniHandler);

	if (!queue[i] || !queue[i + 1]) {
		return;
	}
	let perviousStatus = queue[i].props,
		finalStatus = queue[i + 1].props;

	let delay = queue[i + 1].delay !== undefined ? queue[i + 1].delay : 0;
	let currentStageIndex = this.i + 1;

	// 确保每一次的初始状态都和前一对象中的属性相等
	// 修复重播当前、跳转到、上一个、下一个函数不正常工作的问题
	for (let key in perviousStatus) {
		el[key] = perviousStatus[key];
	}

	let easeType = queue[i + 1].easeType ? queue[i + 1].easeType : config.easeType;
	let duration = queue[i + 1].duration ? queue[i + 1].duration : config.duration;

	let step = queue[i + 1].step ? queue[i + 1].step : undefined;

	status.startTime = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["now"])() + delay;

	// let totalDelta = {};

	for (let key in finalStatus) {
		if (perviousStatus[key] === undefined) {
			// 当前一个状态不存在时首先尝试向前搜索，直到第0个
			for (var j = i; j >= 0; j--) {
				if (queue[j].props[key] !== undefined) {
					perviousStatus[key] = queue[j].props[key];
					continue;
				}
				// 若到第0个仍然找不到则直接访问原始对象中相关属性
				if (j === 0 && queue[j].props[key] === undefined) {
					if (el[key] !== undefined && !isNaN(parseFloat(el[key]))) {
						perviousStatus[key] = parseFloat(el[key]);
					} else {
						// 若依然访问不到，则直接设置该值为0
						perviousStatus[key] = 0;
					}
				}
			}

		}
		// totalDelta[key] = finalStatus[key] - parseFloat(perviousStatus[key]);

		// console.table ? 
		// 	console.table({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
		// 	:
		// 	console.log({'final':finalStatus[key],'pervious':perviousStatus[key],'delta':totalDelta[key]})
		// ;

	}

	let loop = () => {

		if (!status.paused) {
			// let endTime = status.startTime + duration;
			let currentTime = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["now"])();
			let currentProgress = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["clamp"])((currentTime - status.startTime) / duration, 0, 1);

			let newValue = {}, stageDelta = {}, frameDelta = {};
			for (let key in perviousStatus) {

				let perviousVal = parseFloat(perviousStatus[key]);
				let finalVal = parseFloat(finalStatus[key]);

				newValue[key] = perviousVal + getAddedValue(perviousVal, finalVal, currentProgress, ease[easeType], step); // totalDelta[key] * ease[easeType].call(this, currentProgress, step);

				stageDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (perviousVal === undefined ? 0 : perviousVal);

				frameDelta[key] = (newValue[key] === undefined ? 0 : newValue[key]) - (el[key] === undefined ? 0 : parseFloat(el[key]));
			}

			Object.assign(el, newValue);
			Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["trigger"])(this, 'animate', el, {
				stageIndex: this.i,
				name: queue[currentStageIndex].name ? queue[currentStageIndex].name : '',
				progress: currentProgress,
				// target:el,
				value: newValue,
				stageDelta,
				frameDelta
			});
			// if (queue[i + 1].onAnimating instanceof Function) {
			// 	queue[i + 1].onAnimating(this);
			// }
			if (currentProgress == 1) {
			// clearInterval(timer)
			// cancelAnimationFrame(this.reqAniHandler);
			// 如何执行下一步？

				setTimeout(() => {
				// if (queue[i + 1].onFinished instanceof Function) {
				// 	queue[i + 1].onFinished(this);
				// }
					for (let key in finalStatus) {
						el[key] = finalStatus[key];
					}
					Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["trigger"])(this, 'finish', el, {
						stageIndex: currentStageIndex,
						name: queue[currentStageIndex].name ? queue[currentStageIndex].name : ''
					});
					if (!config.manualNext) {
						next.call(this);
					}
				}, delay);
				// debugger
				return;
			}
		}
		this.reqAniHandler = requestAnimationFrame(loop);
	};
	setTimeout(loop, delay);
	// loop();
}

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easingFuncs", function() { return easingFuncs; });
const easingFuncs = {
	linear: function (k) {
		return k;
	},
	step: function (k, step){
		step = !step ? 10 : Math.ceil(step);
		var s = 1;

		while(k > s * (1 / step)){
			s++;
		}

		return s * (1 / step);
	},
	quadraticIn: function (k) {
		return k * k;
	},
	quadraticOut: function (k) {
		return k * (2 - k);
	},
	quadraticInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k; }
		return -0.5 * (--k * (k - 2) - 1);
	},
	cubicIn: function (k) {
		return k * k * k;
	},
	cubicOut: function (k) {
		return --k * k * k + 1;
	},
	cubicInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k * k; }
		return 0.5 * ((k -= 2) * k * k + 2);
	},
	quarticIn: function (k) {
		return k * k * k * k;
	},
	quarticOut: function (k) {
		return 1 - (--k * k * k * k);
	},
	quarticInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k * k * k; }
		return -0.5 * ((k -= 2) * k * k * k - 2);
	},
	quinticIn: function (k) {
		return k * k * k * k * k;
	},
	quinticOut: function (k) {
		return --k * k * k * k * k + 1;
	},
	quinticInOut: function (k) {
		if ((k *= 2) < 1) { return 0.5 * k * k * k * k * k; }
		return 0.5 * ((k -= 2) * k * k * k * k + 2);
	},
	sinusoidalIn: function (k) {
		return 1 - Math.cos(k * Math.PI / 2);
	},
	sinusoidalOut: function (k) {
		return Math.sin(k * Math.PI / 2);
	},
	sinusoidalInOut: function (k) {
		return 0.5 * (1 - Math.cos(Math.PI * k));
	},
	exponentialIn: function (k) {
		return k === 0 ? 0 : Math.pow(1024, k - 1);
	},
	exponentialOut: function (k) {
		return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
	},
	exponentialInOut: function (k) {
		if (k === 0) {
			return 0;
		}
		if (k === 1) {
			return 1;
		}
		if ((k *= 2) < 1) {
			return 0.5 * Math.pow(1024, k - 1);
		}
		return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
	},
	circularIn: function (k) {
		return 1 - Math.sqrt(1 - k * k);
	},
	circularOut: function (k) {
		return Math.sqrt(1 - (--k * k));
	},
	circularInOut: function (k) {
		if ((k *= 2) < 1) { return -0.5 * (Math.sqrt(1 - k * k) - 1); }
		return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	},
	elasticIn: function (k) {
		var s;
		var a = 0.1;
		var p = 0.4;
		if (k === 0) { return 0; }
		if (k === 1) { return 1; }
		if (!a || a < 1) { a = 1; s = p / 4; }
		else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
		return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	},
	elasticOut: function (k) {
		var s;
		var a = 0.1;
		var p = 0.4;
		if (k === 0) { return 0; }
		if (k === 1) { return 1; }
		if (!a || a < 1) { a = 1; s = p / 4; }
		else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
		return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
	},
	elasticInOut: function (k) {
		var s;
		var a = 0.1;
		var p = 0.4;
		if (k === 0) { return 0; }
		if (k === 1) { return 1; }
		if (!a || a < 1) { a = 1; s = p / 4; }
		else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
		if ((k *= 2) < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		}
		return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

	},

	// 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
	backIn: function (k) {
		var s = 1.70158;
		return k * k * ((s + 1) * k - s);
	},
	backOut: function (k) {
		var s = 1.70158;
		return --k * k * ((s + 1) * k + s) + 1;
	},
	backInOut: function (k) {
		var s = 1.70158 * 1.525;
		if ((k *= 2) < 1) { return 0.5 * (k * k * ((s + 1) * k - s)); }
		return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	},

	// 创建弹跳效果
	bounceIn: function (k) {
		return 1 - easingFuncs.bounceOut(1 - k);
	},
	bounceOut: function (k) {
		if (k < (1 / 2.75)) { return 7.5625 * k * k; }
		else if (k < (2 / 2.75)) { return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75; }
		else if (k < (2.5 / 2.75)) { return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375; }
		else { return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375; }
	},
	bounceInOut: function (k) {
		if (k < 0.5) { return easingFuncs.bounceIn(k * 2) * 0.5; }
		return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
	}
};

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// requestAnimationFrame
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function (window) {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function () {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};
	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
}(typeof window === 'undefined' ? global : window));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ })

}]);