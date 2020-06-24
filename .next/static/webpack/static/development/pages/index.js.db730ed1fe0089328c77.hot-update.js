webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);







var _jsxFileName = "D:\\ProjectConf\\FrontEnd\\pages\\index.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var IndexPage = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(IndexPage, _React$Component);

  var _super = _createSuper(IndexPage);

  function IndexPage(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, IndexPage);

    _this = _super.call(this, props);

    Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "toggleBox", function () {
      _this.setState({
        isBoxVisible: !_this.state.isBoxVisible
      });
    });

    _this.state = {
      isBoxVisible: false
    };
    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(IndexPage, [{
    key: "render",
    value: function render() {
      var isBoxVisible = this.state.isBoxVisible;
      console.log(this.state);
      return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_8__["default"], {
        title: "Home | Next.js + TypeScript Example",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 7
        }
      }, __jsx("nav", {
        className: "navbar navbar-expand bg-dark navbar-dark",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 1
        }
      }, __jsx("a", {
        className: "navbar-brand",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 3
        }
      }, "Navbar"), __jsx("button", {
        className: "navbar-toggler indexcity",
        onClick: this.toggleBox,
        type: "button",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29,
          columnNumber: 3
        }
      }, "TOGGLE"), __jsx("div", {
        className:  true ? "navbar-collapse right" : undefined,
        id: "collapsibleNavbar",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 3
        }
      }, __jsx("ul", {
        className: "nav navbar-nav navbar-right",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 5
        }
      }, __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 9
        }
      }, "Link"))))), __jsx("h1", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 5
        }
      }, "Hello Next.js \uD83D\uDC4B"), __jsx("p", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 5
        }
      }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_7___default.a, {
        href: "/about",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 7
        }
      }, __jsx("a", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 9
        }
      }, "About"))), this.state.isBoxVisible ? __jsx("button", {
        className: "test mr-2 btn-primary btn",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 11
        }
      }, "Primary") : null);
    }
  }]);

  return IndexPage;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC50c3giXSwibmFtZXMiOlsiSW5kZXhQYWdlIiwicHJvcHMiLCJzZXRTdGF0ZSIsImlzQm94VmlzaWJsZSIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsInRvZ2dsZUJveCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztJQUdNQSxTOzs7OztBQUVKLHFCQUFZQyxLQUFaLEVBQWdDO0FBQUE7O0FBQUE7O0FBQzlCLDhCQUFNQSxLQUFOOztBQUQ4QixvTkFPcEIsWUFBTTtBQUNoQixZQUFLQyxRQUFMLENBQWU7QUFBQ0Msb0JBQVksRUFBQyxDQUFDLE1BQUtDLEtBQUwsQ0FBV0Q7QUFBMUIsT0FBZjtBQUNELEtBVCtCOztBQUU5QixVQUFLQyxLQUFMLEdBQWE7QUFDWEQsa0JBQVksRUFBQztBQURGLEtBQWI7QUFGOEI7QUFLL0I7Ozs7NkJBTVE7QUFBQSxVQUNDQSxZQURELEdBQ2tCLEtBQUtDLEtBRHZCLENBQ0NELFlBREQ7QUFFUEUsYUFBTyxDQUFDQyxHQUFSLENBQVksS0FBS0YsS0FBakI7QUFDQSxhQUdFLE1BQUMsMERBQUQ7QUFBUSxhQUFLLEVBQUMscUNBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVOO0FBQUssaUJBQVMsRUFBQywwQ0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0U7QUFBRyxpQkFBUyxFQUFDLGNBQWI7QUFBNEIsWUFBSSxFQUFDLEdBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBREYsRUFFRTtBQUFRLGlCQUFTLEVBQUMsMEJBQWxCO0FBQTZDLGVBQU8sRUFBRSxLQUFLRyxTQUEzRDtBQUFzRSxZQUFJLEVBQUMsUUFBM0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFGRixFQU1FO0FBQUssaUJBQVMsRUFBRSxRQUE0Qyx1QkFBNUMsR0FBb0UsU0FBcEY7QUFBdUcsVUFBRSxFQUFDLG1CQUExRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0U7QUFBSSxpQkFBUyxFQUFDLDZCQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFJLGlCQUFTLEVBQUMsVUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0U7QUFBRyxpQkFBUyxFQUFDLFVBQWI7QUFBd0IsWUFBSSxFQUFDLEdBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREYsQ0FERixFQUlFO0FBQUksaUJBQVMsRUFBQyxVQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFHLGlCQUFTLEVBQUMsVUFBYjtBQUF3QixZQUFJLEVBQUMsR0FBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixDQUpGLEVBT0U7QUFBSSxpQkFBUyxFQUFDLFVBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFO0FBQUcsaUJBQVMsRUFBQyxVQUFiO0FBQXdCLFlBQUksRUFBQyxHQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLENBUEYsQ0FERixDQU5GLENBRk0sRUF3QkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0F4QkUsRUF5QkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFLE1BQUMsZ0RBQUQ7QUFBTSxZQUFJLEVBQUMsUUFBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERixDQURGLENBekJFLEVBOEJELEtBQUtILEtBQUwsQ0FBV0QsWUFBWCxHQUNLO0FBQVEsaUJBQVMsRUFBQywyQkFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFETCxHQUVNLElBaENMLENBSEY7QUF5Q0Q7Ozs7RUF6RHFCSyw0Q0FBSyxDQUFDQyxTOztBQTREZlQsd0VBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svc3RhdGljXFxkZXZlbG9wbWVudFxccGFnZXNcXGluZGV4LmpzLmRiNzMwZWQxZmUwMDg5MzI4Yzc3LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9MYXlvdXQnXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5cclxuY2xhc3MgSW5kZXhQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7IGlzQm94VmlzaWJsZTogYm9vbGVhbiB9PiB7XHJcbiBcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogUmVhZG9ubHk8e30+KXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGlzQm94VmlzaWJsZTpmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUJveCA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoIHtpc0JveFZpc2libGU6IXRoaXMuc3RhdGUuaXNCb3hWaXNpYmxlfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBpc0JveFZpc2libGUgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgXHJcblxyXG4gICAgICA8TGF5b3V0IHRpdGxlPVwiSG9tZSB8IE5leHQuanMgKyBUeXBlU2NyaXB0IEV4YW1wbGVcIj5cclxuXHJcbjxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1leHBhbmQgYmctZGFyayBuYXZiYXItZGFya1wiPlxyXG4gIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+TmF2YmFyPC9hPlxyXG4gIDxidXR0b24gY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXIgaW5kZXhjaXR5XCIgb25DbGljaz17dGhpcy50b2dnbGVCb3h9IHR5cGU9XCJidXR0b25cIj5cclxuICAgIFRPR0dMRVxyXG4gICAgey8qIDxzcGFuIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyLWljb25cIj48L3NwYW4+ICovfVxyXG4gIDwvYnV0dG9uPlxyXG4gIDxkaXYgY2xhc3NOYW1lPXsnbmF2YmFyLWNvbGxhcHNlJyt0aGlzLnN0YXRlLmlzQm94VmlzaWJsZSA/IFwibmF2YmFyLWNvbGxhcHNlIHJpZ2h0XCI6XCJuYXZiYXItY29sbGFwc2VcIn0gaWQ9XCJjb2xsYXBzaWJsZU5hdmJhclwiPlxyXG4gICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodFwiPlxyXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+TGluazwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPkxpbms8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5MaW5rPC9hPlxyXG4gICAgICA8L2xpPiAgICBcclxuICAgIDwvdWw+XHJcbiAgPC9kaXY+ICBcclxuPC9uYXY+XHJcblxyXG5cclxuICAgIDxoMT5IZWxsbyBOZXh0LmpzIPCfkYs8L2gxPlxyXG4gICAgPHA+XHJcbiAgICAgIDxMaW5rIGhyZWY9XCIvYWJvdXRcIj5cclxuICAgICAgICA8YT5BYm91dDwvYT5cclxuICAgICAgPC9MaW5rPlxyXG4gICAgPC9wPlxyXG4gICAge3RoaXMuc3RhdGUuaXNCb3hWaXNpYmxlID9cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidGVzdCBtci0yIGJ0bi1wcmltYXJ5IGJ0blwiPlByaW1hcnk8L2J1dHRvbj4gOlxyXG4gICAgICAgICAgIG51bGxcclxuICAgICAgICB9XHJcbiAgICBcclxuXHJcbiAgPC9MYXlvdXQ+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmRleFBhZ2VcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==