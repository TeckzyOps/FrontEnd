webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/navBar.tsx":
/*!*******************************!*\
  !*** ./components/navBar.tsx ***!
  \*******************************/
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);







var _jsxFileName = "D:\\ProjectConf\\FrontEnd\\components\\navBar.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var NavBar = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(NavBar, _React$Component);

  var _super = _createSuper(NavBar);

  function NavBar(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, NavBar);

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

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(NavBar, [{
    key: "render",
    value: function render() {
      console.log(this.state);
      return __jsx("nav", {
        className: "navbar navbar-expand bg-dark navbar-dark",
        role: "navigation",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 13
        }
      }, __jsx("a", {
        className: "navbar-brand",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20,
          columnNumber: 3
        }
      }, "Navbar"), __jsx("button", {
        className: "navbar-toggler navbar-toggler-right indexcity",
        onClick: this.toggleBox,
        type: "button",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 3
        }
      }, "TOGGLE"), __jsx("div", {
        className: this.state.isBoxVisible ? "navbar-collapse right" : "navbar-collapse",
        id: "collapsibleNavbar",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 3
        }
      }, __jsx("ul", {
        className: "navbar-nav",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 3
        }
      }, __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 9
        }
      }, "Link")))));
    }
  }]);

  return NavBar;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (NavBar);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL25hdkJhci50c3giXSwibmFtZXMiOlsiTmF2QmFyIiwicHJvcHMiLCJzZXRTdGF0ZSIsImlzQm94VmlzaWJsZSIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsInRvZ2dsZUJveCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRU1BLE07Ozs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBZ0M7QUFBQTs7QUFBQTs7QUFDNUIsOEJBQU1BLEtBQU47O0FBRDRCLG9OQU9sQixZQUFNO0FBQ2hCLFlBQUtDLFFBQUwsQ0FBZTtBQUFDQyxvQkFBWSxFQUFDLENBQUMsTUFBS0MsS0FBTCxDQUFXRDtBQUExQixPQUFmO0FBQ0QsS0FUNkI7O0FBRTVCLFVBQUtDLEtBQUwsR0FBYTtBQUNYRCxrQkFBWSxFQUFDO0FBREYsS0FBYjtBQUY0QjtBQUs3Qjs7Ozs2QkFPSztBQUNKRSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLRixLQUFqQjtBQUNBLGFBQ0k7QUFBSyxpQkFBUyxFQUFDLDBDQUFmO0FBQTBELFlBQUksRUFBRyxZQUFqRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ1Y7QUFBRyxpQkFBUyxFQUFDLGNBQWI7QUFBNEIsWUFBSSxFQUFDLEdBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBRFUsRUFFVjtBQUFRLGlCQUFTLEVBQUMsK0NBQWxCO0FBQWtFLGVBQU8sRUFBRSxLQUFLRyxTQUFoRjtBQUEyRixZQUFJLEVBQUMsUUFBaEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFGVSxFQU1WO0FBQUssaUJBQVMsRUFBRSxLQUFLSCxLQUFMLENBQVdELFlBQVgsR0FBMEIsdUJBQTFCLEdBQWtELGlCQUFsRTtBQUFxRixVQUFFLEVBQUMsbUJBQXhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDQTtBQUFJLGlCQUFTLEVBQUMsWUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0k7QUFBSSxpQkFBUyxFQUFDLFVBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFO0FBQUcsaUJBQVMsRUFBQyxVQUFiO0FBQXdCLFlBQUksRUFBQyxHQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLENBREosRUFJSTtBQUFJLGlCQUFTLEVBQUMsVUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0U7QUFBRyxpQkFBUyxFQUFDLFVBQWI7QUFBd0IsWUFBSSxFQUFDLEdBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREYsQ0FKSixFQU9JO0FBQUksaUJBQVMsRUFBQyxVQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFHLGlCQUFTLEVBQUMsVUFBYjtBQUF3QixZQUFJLEVBQUMsR0FBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixDQVBKLENBREEsQ0FOVSxDQURKO0FBc0JIOzs7O0VBckNnQkssNENBQUssQ0FBQ0MsUzs7QUF3Q1pULHFFQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3N0YXRpY1xcZGV2ZWxvcG1lbnRcXHBhZ2VzXFxpbmRleC5qcy4yZTJhNjFjNmQ0YTE1ZmIzN2U3MC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwgeyBpc0JveFZpc2libGU6IGJvb2xlYW4gfT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFJlYWRvbmx5PHt9Pil7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICBpc0JveFZpc2libGU6ZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgdG9nZ2xlQm94ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoIHtpc0JveFZpc2libGU6IXRoaXMuc3RhdGUuaXNCb3hWaXNpYmxlfSk7XHJcbiAgICAgIH07XHJcblxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1leHBhbmQgYmctZGFyayBuYXZiYXItZGFya1wiIHJvbGUgPSBcIm5hdmlnYXRpb25cIj5cclxuICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPk5hdmJhcjwvYT5cclxuICA8YnV0dG9uIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyIG5hdmJhci10b2dnbGVyLXJpZ2h0IGluZGV4Y2l0eVwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQm94fSB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICBUT0dHTEVcclxuICAgIHsvKiA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPiAqL31cclxuICA8L2J1dHRvbj5cclxuICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5pc0JveFZpc2libGUgPyBcIm5hdmJhci1jb2xsYXBzZSByaWdodFwiOlwibmF2YmFyLWNvbGxhcHNlXCJ9IGlkPVwiY29sbGFwc2libGVOYXZiYXJcIj5cclxuICA8dWwgY2xhc3NOYW1lPVwibmF2YmFyLW5hdlwiPlxyXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+TGluazwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPkxpbms8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5MaW5rPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICA8L2Rpdj4gIFxyXG48L25hdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZCYXIiXSwic291cmNlUm9vdCI6IiJ9