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
        className: "navbar-collapse",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 3
        }
      }, __jsx("ul", {
        className: "navbar-nav",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 3
        }
      }, __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
        className: "nav-item",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 7
        }
      }, __jsx("a", {
        className: "nav-link",
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 9
        }
      }, "Link")), __jsx("li", {
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
      }, "Link")))), __jsx("div", {
        className: this.state.isBoxVisible ? "right" : "hideIt",
        id: "collapsibleNavbar",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 3
        }
      }, __jsx("div", {
        className: "wrapper",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 3
        }
      }, __jsx("nav", {
        id: "sidebar",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 5
        }
      }, __jsx("div", {
        className: "sidebar-header",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 9
        }
      }, __jsx("h3", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 13
        }
      }, "Custom Sidebar")), __jsx("ul", {
        className: "list-unstyled components",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 9
        }
      }, __jsx("p", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 13
        }
      }, "Dummy Heading"), __jsx("li", {
        className: "active",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#homeSubmenu",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        className: "dropdown-toggle",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 17
        }
      }, "Home"), __jsx("ul", {
        className: "collapse list-unstyled",
        id: "homeSubmenu",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 17
        }
      }, __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 25
        }
      }, "Home 1")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59,
          columnNumber: 25
        }
      }, "Home 2")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 25
        }
      }, "Home 3")))), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 17
        }
      }, "About")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#pageSubmenu",
        "data-toggle": "collapse",
        "aria-expanded": "false",
        className: "dropdown-toggle",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 17
        }
      }, "Pages"), __jsx("ul", {
        className: "collapse list-unstyled",
        id: "pageSubmenu",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 17
        }
      }, __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73,
          columnNumber: 25
        }
      }, "Page 1")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 25
        }
      }, "Page 2")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 21
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 25
        }
      }, "Page 3")))), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 17
        }
      }, "Portfolio")), __jsx("li", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 13
        }
      }, __jsx("a", {
        href: "#",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 17
        }
      }, "Contact")))))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL25hdkJhci50c3giXSwibmFtZXMiOlsiTmF2QmFyIiwicHJvcHMiLCJzZXRTdGF0ZSIsImlzQm94VmlzaWJsZSIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsInRvZ2dsZUJveCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRU1BLE07Ozs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBZ0M7QUFBQTs7QUFBQTs7QUFDNUIsOEJBQU1BLEtBQU47O0FBRDRCLG9OQU9sQixZQUFNO0FBQ2hCLFlBQUtDLFFBQUwsQ0FBZTtBQUFDQyxvQkFBWSxFQUFDLENBQUMsTUFBS0MsS0FBTCxDQUFXRDtBQUExQixPQUFmO0FBQ0QsS0FUNkI7O0FBRTVCLFVBQUtDLEtBQUwsR0FBYTtBQUNYRCxrQkFBWSxFQUFDO0FBREYsS0FBYjtBQUY0QjtBQUs3Qjs7Ozs2QkFPSztBQUNKRSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLRixLQUFqQjtBQUNBLGFBQ0k7QUFBSyxpQkFBUyxFQUFDLDBDQUFmO0FBQTBELFlBQUksRUFBRyxZQUFqRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ1Y7QUFBRyxpQkFBUyxFQUFDLGNBQWI7QUFBNEIsWUFBSSxFQUFDLEdBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBRFUsRUFFVjtBQUFRLGlCQUFTLEVBQUMsK0NBQWxCO0FBQWtFLGVBQU8sRUFBRSxLQUFLRyxTQUFoRjtBQUEyRixZQUFJLEVBQUMsUUFBaEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFGVSxFQVFWO0FBQUssaUJBQVMsRUFBQyxpQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0E7QUFBSSxpQkFBUyxFQUFDLFlBQWQ7QUFBQTtBQUFBO0FBQUE7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QUFTLEVBQUMsaUJBQTlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREosRUFFSTtBQUFJLGlCQUFTLEVBQUMsd0JBQWQ7QUFBdUMsVUFBRSxFQUFDLGFBQTFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0k7QUFBRyxZQUFJLEVBQUMsR0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQURKLENBREosRUFJSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0k7QUFBRyxZQUFJLEVBQUMsR0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQURKLENBSkosRUFPSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0k7QUFBRyxZQUFJLEVBQUMsR0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQURKLENBUEosQ0FGSixDQW5CSixFQWlDSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0k7QUFBRyxZQUFJLEVBQUMsR0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURKLENBakNKLEVBb0NJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDSTtBQUFHLFlBQUksRUFBQyxHQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREosQ0FwQ0osQ0FMSixDQUZGLENBREEsQ0F2QlUsQ0FESjtBQWdGSDs7OztFQS9GZ0JLLDRDQUFLLENBQUNDLFM7O0FBa0daVCxxRUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9zdGF0aWNcXGRldmVsb3BtZW50XFxwYWdlc1xcaW5kZXguanMuNjYzMDY5NDg4NmU2OTQzMmRjMDIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBOYXZCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHsgaXNCb3hWaXNpYmxlOiBib29sZWFuIH0+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBSZWFkb25seTx7fT4pe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgaXNCb3hWaXNpYmxlOmZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgXHJcbiAgICAgIHRvZ2dsZUJveCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKCB7aXNCb3hWaXNpYmxlOiF0aGlzLnN0YXRlLmlzQm94VmlzaWJsZX0pO1xyXG4gICAgICB9O1xyXG5cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZXhwYW5kIGJnLWRhcmsgbmF2YmFyLWRhcmtcIiByb2xlID0gXCJuYXZpZ2F0aW9uXCI+XHJcbiAgPGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiNcIj5OYXZiYXI8L2E+XHJcbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlciBuYXZiYXItdG9nZ2xlci1yaWdodCBpbmRleGNpdHlcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUJveH0gdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgVE9HR0xFXHJcbiAgICB7LyogPHNwYW4gY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXItaWNvblwiPjwvc3Bhbj4gKi99XHJcbiAgPC9idXR0b24+XHJcblxyXG4gIHsvKiBJbmxpbmUgTmF2YmFyICovfVxyXG4gIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWNvbGxhcHNlXCI+XHJcbiAgPHVsIGNsYXNzTmFtZT1cIm5hdmJhci1uYXZcIj5cclxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPkxpbms8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIj5MaW5rPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCI+TGluazwvYT5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbiAgPC9kaXY+IFxyXG5cclxuey8qIEN1c3RvbSBTaWRlIGJhciAqL31cclxuICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5pc0JveFZpc2libGUgPyBcInJpZ2h0XCI6XCJoaWRlSXRcIn0gaWQ9XCJjb2xsYXBzaWJsZU5hdmJhclwiPlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwid3JhcHBlclwiPlxyXG4gICAgXHJcbiAgICA8bmF2IGlkPVwic2lkZWJhclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZWJhci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGgzPkN1c3RvbSBTaWRlYmFyPC9oMz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdW5zdHlsZWQgY29tcG9uZW50c1wiPlxyXG4gICAgICAgICAgICA8cD5EdW1teSBIZWFkaW5nPC9wPlxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI2hvbWVTdWJtZW51XCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGNsYXNzTmFtZT1cImRyb3Bkb3duLXRvZ2dsZVwiPkhvbWU8L2E+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY29sbGFwc2UgbGlzdC11bnN0eWxlZFwiIGlkPVwiaG9tZVN1Ym1lbnVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+SG9tZSAxPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPkhvbWUgMjwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5Ib21lIDM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+QWJvdXQ8L2E+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjcGFnZVN1Ym1lbnVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgY2xhc3NOYW1lPVwiZHJvcGRvd24tdG9nZ2xlXCI+UGFnZXM8L2E+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiY29sbGFwc2UgbGlzdC11bnN0eWxlZFwiIGlkPVwicGFnZVN1Ym1lbnVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+UGFnZSAxPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPlBhZ2UgMjwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5QYWdlIDM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+UG9ydGZvbGlvPC9hPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPkNvbnRhY3Q8L2E+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgIDwvbmF2PlxyXG5cclxuPC9kaXY+XHJcbiAgPC9kaXY+ICBcclxuXHJcblxyXG48L25hdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZCYXIiXSwic291cmNlUm9vdCI6IiJ9