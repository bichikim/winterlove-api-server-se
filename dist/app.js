/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, author, main, types, license, scripts, repository, keywords, bugs, homepage, devDependencies, dependencies, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"winter-love-server-se\",\"version\":\"0.0.1\",\"description\":\"A quick way to start hapi server with typescriptp\",\"author\":\"bichi\",\"main\":\"dist/app.js\",\"types\":\"types.ts\",\"license\":\"MIT\",\"scripts\":{\"dev\":\"npm-run-all -p build:dev start:dev\",\"start\":\"pm2 start config/ecosystem.config.js\",\"start:watch\":\"pm2 start config/ecosystem.config.js --watch\",\"start:dev\":\"nodemon dist/app.js\",\"stop\":\"pm2 stop config/ecosystem.config.js\",\"restart\":\"pm2 restart config/ecosystem.config.js\",\"reload\":\"pm2 reload config/ecosystem.config.js\",\"delete\":\"pm2 delete config/ecosystem.config.js\",\"processes\":\"pm2 list\",\"build\":\"babel-node build\",\"build:dev\":\"babel-node build/dev\",\"doc\":\"typedoc -out ./docs ./src --media ./media\",\"deploy\":\"??\",\"test\":\"npm run test:unit\",\"test:unit\":\"mocha-webpack \\\"src/**/*.spec.js\\\" --webpack-config config/webpack.test.config.js --timeout 3000 --recursive --require build/chai.js --watch\",\"test:karma\":\"karma start config/karma.config.js --browsers=ChromeWithoutSecurity --single-run\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/bichikim/my-typescript.git\"},\"keywords\":[\"typescript\"],\"bugs\":{\"url\":\"https://github.com/bichikim/my-typescript/issues\"},\"homepage\":\"https://github.com/bichikim/my-typescript#readme\",\"devDependencies\":{\"@types/chai\":\"^4.1.3\",\"@types/hapi\":\"^17.0.12\",\"@types/inert\":\"^5.1.1\",\"@types/joigoose\":\"^2.0.1\",\"@types/lodash\":\"^4.14.109\",\"@types/lowdb\":\"^1.0.2\",\"@types/minimist\":\"^1.2.0\",\"@types/mocha\":\"^5.2.1\",\"@types/mongoose\":\"^5.0.15\",\"@types/node\":\"^10.3.0\",\"@types/sinon\":\"^5.0.1\",\"@types/vision\":\"^5.3.4\",\"@types/webpack\":\"^4.4.0\",\"@types/webpack-env\":\"^1.13.6\",\"babel-cli\":\"^6.26.0\",\"babel-core\":\"^6.26.3\",\"babel-eslint\":\"^8.2.3\",\"babel-loader\":\"^7.1.4\",\"babel-plugin-lodash\":\"^3.3.2\",\"babel-polyfill\":\"^6.26.0\",\"babel-preset-env\":\"^1.7.0\",\"babel-preset-stage-1\":\"^6.24.1\",\"babel-preset-stage-2\":\"^6.24.1\",\"babel-preset-stage-3\":\"^6.24.1\",\"chai\":\"^4.1.2\",\"codecov\":\"^3.0.2\",\"eslint\":\"^4.19.1\",\"eslint-friendly-formatter\":\"^4.0.1\",\"eslint-loader\":\"^2.0.0\",\"eslint-plugin-html\":\"^4.0.3\",\"eslint-plugin-promise\":\"^3.7.0\",\"eslint-plugin-typescript\":\"^0.12.0\",\"eslint-plugin-vue\":\"^4.5.0\",\"istanbul-instrumenter-loader\":\"^3.0.1\",\"karma\":\"^2.0.2\",\"karma-chai\":\"^0.1.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.2\",\"karma-coveralls\":\"^1.2.1\",\"karma-mocha\":\"^1.3.0\",\"karma-phantomjs-launcher\":\"^1.0.4\",\"karma-remap-coverage\":\"^0.1.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-spec-reporter\":\"0.0.32\",\"karma-webpack\":\"^3.0.0\",\"mocha\":\"^5.2.0\",\"mocha-typescript\":\"^1.1.14\",\"mocha-webpack\":\"^2.0.0-beta.0\",\"nodemon\":\"^1.17.5\",\"npm-run-all\":\"^4.1.3\",\"nps\":\"^5.9.0\",\"sinon\":\"^5.0.10\",\"ts-loader\":\"^4.3.0\",\"ts-node\":\"^6.1.0\",\"tslint\":\"^5.10.0\",\"typedoc\":\"^0.11.1\",\"typescript\":\"^2.8.3\",\"typescript-eslint-parser\":\"^15.0.0\",\"webpack\":\"^4.8.3\",\"webpack-merge\":\"^4.1.2\",\"webpack-node-externals\":\"^1.7.2\"},\"dependencies\":{\"bell\":\"^9.3.1\",\"hapi\":\"^17.5.1\",\"hapi-auth-jwt2\":\"^8.1.0\",\"hapi-swagger\":\"^9.1.1\",\"hapi-webpack-plugin\":\"^3.0.0\",\"inert\":\"^5.1.0\",\"joi\":\"^13.3.0\",\"joigoose\":\"^4.0.0\",\"lodash\":\"^4.17.10\",\"lowdb\":\"^1.0.0\",\"minimist\":\"^1.2.0\",\"mongoose\":\"^5.1.3\",\"pm2\":\"^2.10.4\",\"vision\":\"^5.3.2\"}};\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/server */ \"./src/server.ts\");\n\r\nObject(_server__WEBPACK_IMPORTED_MODULE_0__[\"start\"])().then(function (server) {\r\n    if (false) {}\r\n    console.log(\"Server is running for \" + server.info.address + \":\" + server.info.port + \"\\n\" +\r\n        (\"hapi version: \" + server.version));\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/plugins/controllers-routes/index.ts":
/*!*************************************************!*\
  !*** ./src/plugins/controllers-routes/index.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/capitalize */ \"lodash/capitalize\");\n/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar plugin = {\r\n    name: 'controllersRoutes',\r\n    version: '0.0.1',\r\n    register: function (server, options) {\r\n        if (options === void 0) { options = {}; }\r\n        var _a = options.controllers, controllers = _a === void 0 ? [] : _a, _b = options.routes, routes = _b === void 0 ? [] : _b, _c = options.context, context = _c === void 0 ? {} : _c, _d = options.bindRoutes, bindRoutes = _d === void 0 ? true : _d;\r\n        var controllerInstances = {};\r\n        controllers.forEach(function (Controller) {\r\n            controllerInstances[Controller.name] = new Controller(server, context);\r\n        });\r\n        var handler = function (route, options) {\r\n            if (!options) {\r\n                return;\r\n            }\r\n            var controller = options.controller, method = options.method;\r\n            var controllerName;\r\n            var methodName;\r\n            if (typeof controller === 'string' && typeof method === 'string') {\r\n                controllerName = controller;\r\n                methodName = method;\r\n            }\r\n            else if (typeof options === 'string') {\r\n                var _a = options.split('@'), method_1 = _a[0], controller_1 = _a[1];\r\n                controllerName = controller_1;\r\n                methodName = method_1;\r\n            }\r\n            controllerName = lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(controllerName);\r\n            methodName = lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(methodName);\r\n            var _controller = controllerInstances[controllerName];\r\n            if (!_controller) {\r\n                throw new Error(\"[controllers-routes] cannot find controller. options is \" + options);\r\n            }\r\n            var handle = _controller[methodName];\r\n            return handle.bind(_controller);\r\n        };\r\n        server.decorate('handler', 'controller', handler);\r\n        if (bindRoutes) {\r\n            Object.freeze(context);\r\n            server.bind(context);\r\n        }\r\n        server.route(routes);\r\n    },\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (plugin);\r\n\n\n//# sourceURL=webpack:///./src/plugins/controllers-routes/index.ts?");

/***/ }),

/***/ "./src/plugins/low-db.ts":
/*!*******************************!*\
  !*** ./src/plugins/low-db.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lowdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lowdb */ \"lowdb\");\n/* harmony import */ var lowdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lowdb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lowdb_adapters_FileAsync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lowdb/adapters/FileAsync */ \"lowdb/adapters/FileAsync\");\n/* harmony import */ var lowdb_adapters_FileAsync__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lowdb_adapters_FileAsync__WEBPACK_IMPORTED_MODULE_1__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = y[op[0] & 2 ? \"return\" : op[0] ? \"throw\" : \"next\"]) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [0, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\n\r\nvar plugin = {\r\n    name: 'lowDB',\r\n    version: '0.0.1',\r\n    register: function (server, options) {\r\n        if (options === void 0) { options = {}; }\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var _a, name, adapter, db;\r\n            return __generator(this, function (_b) {\r\n                switch (_b.label) {\r\n                    case 0:\r\n                        _a = options.name, name = _a === void 0 ? './.db/db.json' : _a;\r\n                        adapter = new lowdb_adapters_FileAsync__WEBPACK_IMPORTED_MODULE_1___default.a(name);\r\n                        return [4 /*yield*/, lowdb__WEBPACK_IMPORTED_MODULE_0___default()(adapter)];\r\n                    case 1:\r\n                        db = _b.sent();\r\n                        db.defaults({ docs: [], info: 'unset' }).write();\r\n                        server.expose({\r\n                            db: db,\r\n                        });\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    },\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (plugin);\r\n\n\n//# sourceURL=webpack:///./src/plugins/low-db.ts?");

/***/ }),

/***/ "./src/plugins/pm2-zero-down-time.ts":
/*!*******************************************!*\
  !*** ./src/plugins/pm2-zero-down-time.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\r\n * this idea is from\r\n * @link https://github.com/roylines/hapi-graceful-pm2\r\n */\r\nvar plugin = {\r\n    name: 'pm2ZeroDownTime',\r\n    version: '0.0.1',\r\n    register: function (server, options) {\r\n        process.on('SIGINT', function () {\r\n            server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...');\r\n            server.stop(options).then(function () {\r\n                server.log(['info', 'pm2', 'shutdown'], 'hapi stopped');\r\n                return process.exit(0);\r\n            });\r\n        });\r\n    },\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (plugin);\r\n\n\n//# sourceURL=webpack:///./src/plugins/pm2-zero-down-time.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = y[op[0] & 2 ? \"return\" : op[0] ? \"throw\" : \"next\"]) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [0, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar routers = [\r\n    {\r\n        method: 'GET',\r\n        path: '/info',\r\n        handler: function () {\r\n            return {\r\n                data: this.lowDB.get('info').value(),\r\n            };\r\n        },\r\n    },\r\n    {\r\n        method: 'POST',\r\n        path: '/info',\r\n        handler: function (request) {\r\n            return __awaiter(this, void 0, void 0, function () {\r\n                var data;\r\n                return __generator(this, function (_a) {\r\n                    switch (_a.label) {\r\n                        case 0:\r\n                            data = request.payload.data;\r\n                            return [4 /*yield*/, this.lowDB.set('info', data).write()];\r\n                        case 1:\r\n                            _a.sent();\r\n                            return [2 /*return*/, {\r\n                                    data: this.lowDB.get('info').value(),\r\n                                }];\r\n                    }\r\n                });\r\n            });\r\n        },\r\n    },\r\n    {\r\n        method: 'GET',\r\n        path: '/docs',\r\n        handler: function (request) {\r\n            // eslint-disable-next-line no-magic-numbers\r\n            var _a = request.params, _b = _a.offset, offset = _b === void 0 ? 0 : _b, _c = _a.take, take = _c === void 0 ? 5 : _c;\r\n            var docs = this.lowDB.get('docs').value();\r\n            return {\r\n                data: docs.slice().splice(offset, take),\r\n            };\r\n        },\r\n    },\r\n    {\r\n        method: 'POST',\r\n        path: '/docs',\r\n        handler: function (request) {\r\n            return __awaiter(this, void 0, void 0, function () {\r\n                var _a, title, description, _b, ok;\r\n                return __generator(this, function (_c) {\r\n                    switch (_c.label) {\r\n                        case 0:\r\n                            _a = request.payload, title = _a.title, description = _a.description, _b = _a.ok, ok = _b === void 0 ? false : _b;\r\n                            if (!title || !description) {\r\n                                return [2 /*return*/, { status: 'error' }];\r\n                            }\r\n                            return [4 /*yield*/, this.lowDB.get('docs').push({ title: title, description: description, ok: ok }).write()];\r\n                        case 1:\r\n                            _c.sent();\r\n                            return [2 /*return*/, {\r\n                                    status: 'ok',\r\n                                }];\r\n                    }\r\n                });\r\n            });\r\n        },\r\n    },\r\n    {\r\n        method: 'put',\r\n        path: '/docs',\r\n        handler: function (request) {\r\n            return __awaiter(this, void 0, void 0, function () {\r\n                var _a, index, title, description, ok, status;\r\n                return __generator(this, function (_b) {\r\n                    switch (_b.label) {\r\n                        case 0:\r\n                            _a = request.payload, index = _a.index, title = _a.title, description = _a.description, ok = _a.ok;\r\n                            status = 'error';\r\n                            if (!index || !title || !description) {\r\n                                return [2 /*return*/, { status: status }];\r\n                            }\r\n                            return [4 /*yield*/, this.lowDB.update('docs', function (docs) {\r\n                                    if (!docs[index]) {\r\n                                        return docs;\r\n                                    }\r\n                                    docs[index] = {\r\n                                        title: title, description: description, ok: ok ? ok : docs[index].ok,\r\n                                    };\r\n                                    status = 'ok';\r\n                                    return docs;\r\n                                }).write()];\r\n                        case 1:\r\n                            _b.sent();\r\n                            return [2 /*return*/, {\r\n                                    status: status,\r\n                                }];\r\n                    }\r\n                });\r\n            });\r\n        },\r\n    },\r\n    {\r\n        method: 'patch',\r\n        path: '/docs',\r\n        handler: function (request) {\r\n            return __awaiter(this, void 0, void 0, function () {\r\n                var _a, index, ok, status, _ok;\r\n                return __generator(this, function (_b) {\r\n                    switch (_b.label) {\r\n                        case 0:\r\n                            _a = request.payload, index = _a.index, ok = _a.ok;\r\n                            status = 'error';\r\n                            if (!index || !ok) {\r\n                                return [2 /*return*/, { status: status }];\r\n                            }\r\n                            _ok = ok === 'false' ? false : Boolean(ok);\r\n                            return [4 /*yield*/, this.lowDB.update('docs', function (docs) {\r\n                                    if (!docs[index]) {\r\n                                        return docs;\r\n                                    }\r\n                                    docs[index].ok = _ok;\r\n                                    status = 'ok';\r\n                                    return docs;\r\n                                }).write()];\r\n                        case 1:\r\n                            _b.sent();\r\n                            return [2 /*return*/, {\r\n                                    status: status,\r\n                                }];\r\n                    }\r\n                });\r\n            });\r\n        },\r\n    },\r\n    {\r\n        method: 'delete',\r\n        path: '/docs',\r\n        handler: function (request) {\r\n            return __awaiter(this, void 0, void 0, function () {\r\n                var index, status;\r\n                return __generator(this, function (_a) {\r\n                    switch (_a.label) {\r\n                        case 0:\r\n                            index = request.payload.index;\r\n                            status = 'error';\r\n                            if (!index) {\r\n                                return [2 /*return*/, { status: status }];\r\n                            }\r\n                            return [4 /*yield*/, this.lowDB.update('docs', function (docs) {\r\n                                    if (!docs[index]) {\r\n                                        return docs;\r\n                                    }\r\n                                    docs.splice(index, 1);\r\n                                    status = 'ok';\r\n                                    return docs;\r\n                                }).write()];\r\n                        case 1:\r\n                            _a.sent();\r\n                            return [2 /*return*/, {\r\n                                    status: status,\r\n                                }];\r\n                    }\r\n                });\r\n            });\r\n        },\r\n    },\r\n];\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (routers);\r\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! exports provided: start, stop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"start\", function() { return start; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stop\", function() { return stop; });\n/* harmony import */ var _plugins_controllers_routes___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/plugins/controllers-routes/ */ \"./src/plugins/controllers-routes/index.ts\");\n/* harmony import */ var _plugins_low_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/plugins/low-db */ \"./src/plugins/low-db.ts\");\n/* harmony import */ var _plugins_pm2_zero_down_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/plugins/pm2-zero-down-time */ \"./src/plugins/pm2-zero-down-time.ts\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/routes */ \"./src/routes/index.ts\");\n/* harmony import */ var _util_getArgv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/util/getArgv */ \"./src/util/getArgv.ts\");\n/* harmony import */ var _util_pkg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/util/pkg */ \"./src/util/pkg.ts\");\n/* harmony import */ var hapi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! hapi */ \"hapi\");\n/* harmony import */ var hapi__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(hapi__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var hapi_swagger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! hapi-swagger */ \"hapi-swagger\");\n/* harmony import */ var hapi_swagger__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(hapi_swagger__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var inert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! inert */ \"inert\");\n/* harmony import */ var inert__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(inert__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var vision__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vision */ \"vision\");\n/* harmony import */ var vision__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vision__WEBPACK_IMPORTED_MODULE_9__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = y[op[0] & 2 ? \"return\" : op[0] ? \"throw\" : \"next\"]) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [0, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar SKIP = 2;\r\nfunction register(server, plugin, options) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var _name, name, error_1;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    name = plugin.name;\r\n                    if (name) {\r\n                        _name = name;\r\n                    }\r\n                    else if (plugin.plugin) {\r\n                        if (plugin.plugin.name) {\r\n                            _name = plugin.plugin.name;\r\n                        }\r\n                        else {\r\n                            _name = plugin.plugin.pkg.name;\r\n                        }\r\n                    }\r\n                    else {\r\n                        _name = 'unknown';\r\n                    }\r\n                    _a.label = 1;\r\n                case 1:\r\n                    _a.trys.push([1, 3, , 4]);\r\n                    return [4 /*yield*/, server.register({ plugin: plugin, options: options })];\r\n                case 2:\r\n                    _a.sent();\r\n                    return [3 /*break*/, 4];\r\n                case 3:\r\n                    error_1 = _a.sent();\r\n                    server.log(['error', _name, 'register'], 'server cannot resister');\r\n                    return [3 /*break*/, 4];\r\n                case 4: return [2 /*return*/, server.plugins[_name]];\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction start() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var serverOptions, port, host, server, db, error_2;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    serverOptions = Object(_util_getArgv__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(process.argv.slice(SKIP));\r\n                    port = serverOptions.port, host = serverOptions.host;\r\n                    server = new hapi__WEBPACK_IMPORTED_MODULE_6___default.a.Server({\r\n                        // listener: listener as any,\r\n                        port: port, host: host,\r\n                    });\r\n                    return [4 /*yield*/, register(server, inert__WEBPACK_IMPORTED_MODULE_8___default.a)];\r\n                case 1:\r\n                    _a.sent();\r\n                    return [4 /*yield*/, register(server, vision__WEBPACK_IMPORTED_MODULE_9___default.a)];\r\n                case 2:\r\n                    _a.sent();\r\n                    return [4 /*yield*/, register(server, _plugins_pm2_zero_down_time__WEBPACK_IMPORTED_MODULE_2__[\"default\"])];\r\n                case 3:\r\n                    _a.sent();\r\n                    return [4 /*yield*/, register(server, _plugins_low_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])];\r\n                case 4:\r\n                    db = (_a.sent()).db;\r\n                    return [4 /*yield*/, register(server, _plugins_controllers_routes___WEBPACK_IMPORTED_MODULE_0__[\"default\"], { routes: _routes__WEBPACK_IMPORTED_MODULE_3__[\"default\"], context: { lowDB: db } })];\r\n                case 5:\r\n                    _a.sent();\r\n                    return [4 /*yield*/, register(server, hapi_swagger__WEBPACK_IMPORTED_MODULE_7___default.a, {\r\n                            info: {\r\n                                title: Object(_util_pkg__WEBPACK_IMPORTED_MODULE_5__[\"name\"])(),\r\n                                version: Object(_util_pkg__WEBPACK_IMPORTED_MODULE_5__[\"version\"])(),\r\n                            },\r\n                        })];\r\n                case 6:\r\n                    _a.sent();\r\n                    _a.label = 7;\r\n                case 7:\r\n                    _a.trys.push([7, 9, , 10]);\r\n                    return [4 /*yield*/, server.start()];\r\n                case 8:\r\n                    _a.sent();\r\n                    return [3 /*break*/, 10];\r\n                case 9:\r\n                    error_2 = _a.sent();\r\n                    server.log(['error', 'hapi', 'start'], 'server cannot run');\r\n                    throw error_2;\r\n                case 10: return [2 /*return*/, server];\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction stop(server, options) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, server.stop(options)];\r\n                case 1:\r\n                    _a.sent();\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/server.ts?");

/***/ }),

/***/ "./src/util/getArgv.ts":
/*!*****************************!*\
  !*** ./src/util/getArgv.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getArgv; });\n/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! minimist */ \"minimist\");\n/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(minimist__WEBPACK_IMPORTED_MODULE_0__);\n\r\nfunction number(data, defaultData) {\r\n    var num = Number(data);\r\n    if (Number.isNaN(num)) {\r\n        return defaultData;\r\n    }\r\n    return num;\r\n}\r\nfunction getArgv(_argv) {\r\n    var defaults = {\r\n        port: 8080,\r\n        host: 'localhost',\r\n    };\r\n    var argv = minimist__WEBPACK_IMPORTED_MODULE_0___default()(_argv, {\r\n        alias: {\r\n            r: 'protocol',\r\n            p: 'port',\r\n            h: 'host',\r\n            k: 'key',\r\n            c: 'cert',\r\n        },\r\n    });\r\n    // define option values\r\n    var port = number(argv.port || process.env.port, defaults.port);\r\n    var host = argv.host || process.env.host || defaults.host;\r\n    var cert = argv.cert || process.env.cert;\r\n    var key = argv.key || process.env.key;\r\n    var protocol;\r\n    if (!cert || !key) {\r\n        protocol = 'http';\r\n    }\r\n    else {\r\n        protocol = argv.protocol || process.env.protocol || 'https';\r\n    }\r\n    return {\r\n        port: port, host: host, cert: cert, key: key, protocol: protocol,\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/util/getArgv.ts?");

/***/ }),

/***/ "./src/util/pkg.ts":
/*!*************************!*\
  !*** ./src/util/pkg.ts ***!
  \*************************/
/*! exports provided: name, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"name\", function() { return name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"version\", function() { return version; });\n/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/../package.json */ \"./package.json\");\nvar _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/Object.assign({}, _package_json__WEBPACK_IMPORTED_MODULE_0__, {\"default\": _package_json__WEBPACK_IMPORTED_MODULE_0__});\n\r\nfunction name() {\r\n    return _package_json__WEBPACK_IMPORTED_MODULE_0__.name || 'server';\r\n}\r\nfunction version() {\r\n    return _package_json__WEBPACK_IMPORTED_MODULE_0__.version || '0.0.1';\r\n}\r\n\n\n//# sourceURL=webpack:///./src/util/pkg.ts?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/index.ts?");

/***/ }),

/***/ "hapi":
/*!***********************!*\
  !*** external "hapi" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"hapi\");\n\n//# sourceURL=webpack:///external_%22hapi%22?");

/***/ }),

/***/ "hapi-swagger":
/*!*******************************!*\
  !*** external "hapi-swagger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"hapi-swagger\");\n\n//# sourceURL=webpack:///external_%22hapi-swagger%22?");

/***/ }),

/***/ "inert":
/*!************************!*\
  !*** external "inert" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"inert\");\n\n//# sourceURL=webpack:///external_%22inert%22?");

/***/ }),

/***/ "lodash/capitalize":
/*!************************************!*\
  !*** external "lodash/capitalize" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash/capitalize\");\n\n//# sourceURL=webpack:///external_%22lodash/capitalize%22?");

/***/ }),

/***/ "lowdb":
/*!************************!*\
  !*** external "lowdb" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lowdb\");\n\n//# sourceURL=webpack:///external_%22lowdb%22?");

/***/ }),

/***/ "lowdb/adapters/FileAsync":
/*!*******************************************!*\
  !*** external "lowdb/adapters/FileAsync" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lowdb/adapters/FileAsync\");\n\n//# sourceURL=webpack:///external_%22lowdb/adapters/FileAsync%22?");

/***/ }),

/***/ "minimist":
/*!***************************!*\
  !*** external "minimist" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"minimist\");\n\n//# sourceURL=webpack:///external_%22minimist%22?");

/***/ }),

/***/ "vision":
/*!*************************!*\
  !*** external "vision" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vision\");\n\n//# sourceURL=webpack:///external_%22vision%22?");

/***/ })

/******/ });